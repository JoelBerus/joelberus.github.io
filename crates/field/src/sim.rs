//! The simulation core: particles advected through a curl-noise flow field.
//!
//! Nothing in this module knows about WebAssembly or the browser, so it runs
//! (and is tested) as ordinary native Rust.
//!
//! Units: positions are CSS pixels, time is seconds, velocity is pixels per
//! second. The caller decides how that maps to device pixels.

#![forbid(unsafe_code)]

use crate::noise;
use crate::rng::Pcg32;

/// Pixels to noise-space. Smaller means larger, lazier swirls.
const NOISE_SCALE: f32 = 1.0 / 260.0;
/// How fast the field itself drifts, in noise units per second.
const TIME_SCALE: f32 = 0.035;
/// Converts the (unitless) curl into pixels per second.
const FLOW_GAIN: f32 = 34.0;
const MAX_SPEED: f32 = 110.0;
/// How quickly a particle's velocity relaxes towards the field, per second.
/// Lower values give the particles more inertia.
const STEER_RATE: f32 = 3.5;

const MIN_LIFETIME: f32 = 3.0;
const MAX_LIFETIME: f32 = 9.0;

const POINTER_RADIUS: f32 = 170.0;
/// Tangential speed added at the pointer position (particles orbit it).
const POINTER_SWIRL: f32 = 70.0;
/// Outward speed added at the pointer position (particles give it room).
const POINTER_PUSH: f32 = 35.0;

/// Longest time step the simulation will integrate at once. A tab that was
/// in the background can report a huge `dt`; clamping keeps that from
/// teleporting every particle off screen.
pub const MAX_DT: f32 = 1.0 / 20.0;

/// Share of particles drawn with each highlight colour. The rest are muted.
const ACCENT_SHARE: f32 = 0.05;
const DATA_SHARE: f32 = 0.05;

/// One particle.
///
/// `#[repr(C)]` fixes the field order and, because every field is an `f32`,
/// there is no padding (both are asserted at compile time below). That is
/// what allows the WebAssembly layer
/// to expose a `&[Particle]` to JavaScript as a flat `Float32Array` with
/// [`Particle::STRIDE`] floats per particle, without copying anything.
#[repr(C)]
#[derive(Debug, Clone, Copy, PartialEq)]
pub struct Particle {
    pub x: f32,
    pub y: f32,
    /// Position before the last step. The renderer draws `prev -> current`.
    /// After a respawn it equals the current position (a zero-length segment).
    pub prev_x: f32,
    pub prev_y: f32,
    pub vx: f32,
    pub vy: f32,
    /// Seconds left before the particle respawns somewhere else.
    pub life: f32,
    /// One of [`Particle::MUTED`], [`Particle::ACCENT`] or [`Particle::DATA`].
    /// Kept as a float so the whole struct is a homogeneous `f32` record.
    pub kind: f32,
}

impl Particle {
    /// Number of `f32` values per particle in the flat buffer.
    pub const STRIDE: usize = 8;

    /// Index of each field inside one particle of the flat buffer. The same
    /// numbers are written in `mount.ts`; the assertions below this `impl`
    /// tie them to the real struct layout.
    pub const X: usize = 0;
    pub const Y: usize = 1;
    pub const PREV_X: usize = 2;
    pub const PREV_Y: usize = 3;
    pub const VX: usize = 4;
    pub const VY: usize = 5;
    pub const LIFE: usize = 6;
    pub const KIND: usize = 7;

    pub const MUTED: f32 = 0.0;
    pub const ACCENT: f32 = 1.0;
    pub const DATA: f32 = 2.0;

    fn spawn(rng: &mut Pcg32, width: f32, height: f32) -> Self {
        let x = rng.range(0.0, width);
        let y = rng.range(0.0, height);
        let life = rng.range(MIN_LIFETIME, MAX_LIFETIME);
        let roll = rng.next_f32();
        let kind = if roll < ACCENT_SHARE {
            Self::ACCENT
        } else if roll < ACCENT_SHARE + DATA_SHARE {
            Self::DATA
        } else {
            Self::MUTED
        };

        Self {
            x,
            y,
            prev_x: x,
            prev_y: y,
            vx: 0.0,
            vy: 0.0,
            life,
            kind,
        }
    }
}

// The layout contract with JavaScript, checked at compile time. The renderer
// (`src/components/field/mount.ts`) reads the buffer as a `Float32Array` and
// hard-codes these indices, so moving, adding or retyping a field has to fail
// the build here instead of making JavaScript silently read garbage.
const _: () = {
    use core::mem::offset_of;
    const F32: usize = size_of::<f32>();

    assert!(size_of::<Particle>() == Particle::STRIDE * F32);
    assert!(align_of::<Particle>() == align_of::<f32>());

    assert!(offset_of!(Particle, x) == Particle::X * F32);
    assert!(offset_of!(Particle, y) == Particle::Y * F32);
    assert!(offset_of!(Particle, prev_x) == Particle::PREV_X * F32);
    assert!(offset_of!(Particle, prev_y) == Particle::PREV_Y * F32);
    assert!(offset_of!(Particle, vx) == Particle::VX * F32);
    assert!(offset_of!(Particle, vy) == Particle::VY * F32);
    assert!(offset_of!(Particle, life) == Particle::LIFE * F32);
    assert!(offset_of!(Particle, kind) == Particle::KIND * F32);
};

#[derive(Debug, Clone, Copy, PartialEq)]
struct Pointer {
    x: f32,
    y: f32,
}

/// The whole simulation state.
///
/// `Field` owns its particle buffer for its entire lifetime. `step`,
/// `set_pointer` and `resize` mutate particles in place and never allocate;
/// only `new` and `set_count` touch the allocator.
#[derive(Debug, Clone, PartialEq)]
pub struct Field {
    width: f32,
    height: f32,
    time: f32,
    seed: u32,
    rng: Pcg32,
    /// `None` while the pointer is outside the field.
    pointer: Option<Pointer>,
    particles: Vec<Particle>,
}

impl Field {
    /// Creates a field of `width` x `height` pixels with `count` particles.
    ///
    /// Two fields created with the same arguments and driven with the same
    /// sequence of calls hold identical particles, compared with exact float
    /// equality. That is tested for one build on one platform; nothing here
    /// checks that a native build and a WebAssembly build agree with each
    /// other.
    pub fn new(width: f32, height: f32, count: usize, seed: u32) -> Self {
        let mut field = Self {
            width: sanitize_size(width),
            height: sanitize_size(height),
            time: 0.0,
            seed,
            rng: Pcg32::new(u64::from(seed)),
            pointer: None,
            particles: Vec::with_capacity(count),
        };
        field.set_count(count);
        field
    }

    /// Advances the simulation by `dt` seconds (clamped to [`MAX_DT`]).
    ///
    /// Non-positive or NaN steps are ignored.
    pub fn step(&mut self, dt: f32) {
        if dt.is_nan() || dt <= 0.0 {
            return;
        }
        let dt = dt.min(MAX_DT);
        self.time += dt;

        // Destructuring borrows each field separately. Without it, looping
        // over `self.particles` mutably while also using `self.rng` mutably
        // would look like two mutable borrows of `self` to a helper method.
        let Self {
            width,
            height,
            time,
            seed,
            rng,
            pointer,
            particles,
        } = self;
        let (width, height) = (*width, *height);
        let z = *time * TIME_SCALE;
        // Fraction of the gap to the target velocity closed during this step.
        let steer = (STEER_RATE * dt).min(1.0);

        for p in particles.iter_mut() {
            let (cx, cy) = noise::curl(p.x * NOISE_SCALE, p.y * NOISE_SCALE, z, *seed);
            let mut target_x = cx * FLOW_GAIN;
            let mut target_y = cy * FLOW_GAIN;

            if let Some(pointer) = pointer {
                let (push_x, push_y) = pointer_influence(pointer, p.x, p.y);
                target_x += push_x;
                target_y += push_y;
            }

            p.vx += (target_x - p.vx) * steer;
            p.vy += (target_y - p.vy) * steer;
            let speed_sq = p.vx * p.vx + p.vy * p.vy;
            if speed_sq > MAX_SPEED * MAX_SPEED {
                let scale = MAX_SPEED / speed_sq.sqrt();
                p.vx *= scale;
                p.vy *= scale;
            }

            p.prev_x = p.x;
            p.prev_y = p.y;
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= dt;

            let inside = (0.0..=width).contains(&p.x) && (0.0..=height).contains(&p.y);
            if p.life <= 0.0 || !inside {
                // Respawning draws from the field's own generator, in particle
                // order, so it is as reproducible as everything else.
                *p = Particle::spawn(rng, width, height);
            }
        }
    }

    /// Moves the pointer to `(x, y)`, or removes it when `active` is false.
    pub fn set_pointer(&mut self, x: f32, y: f32, active: bool) {
        self.pointer = if active && x.is_finite() && y.is_finite() {
            Some(Pointer { x, y })
        } else {
            None
        };
    }

    /// Changes the field size, scaling every particle to the new bounds.
    ///
    /// Scaling (rather than respawning) keeps every particle at the same
    /// relative position and does not consume random numbers, so a resize
    /// does not reshuffle the scene.
    pub fn resize(&mut self, width: f32, height: f32) {
        let width = sanitize_size(width);
        let height = sanitize_size(height);
        let scale_x = width / self.width;
        let scale_y = height / self.height;

        // `min` absorbs the last-bit rounding error of the multiply.
        //
        // `f32::clamp` would read better, but it panics when `min > max` and
        // its panic message formats both floats. While trying
        // `opt-level = "z"`, that one call pulled the float-to-string code
        // into the .wasm and more than doubled it (45 kB instead of 20 kB).
        for p in &mut self.particles {
            p.x = (p.x * scale_x).min(width);
            p.y = (p.y * scale_y).min(height);
            p.prev_x = (p.prev_x * scale_x).min(width);
            p.prev_y = (p.prev_y * scale_y).min(height);
        }

        self.width = width;
        self.height = height;
    }

    /// Grows or shrinks the particle buffer.
    ///
    /// This is the only method besides `new` that may reallocate. Any pointer
    /// previously obtained from [`Field::particles`] must be considered stale
    /// afterwards.
    pub fn set_count(&mut self, count: usize) {
        let Self {
            width,
            height,
            rng,
            particles,
            ..
        } = self;
        particles.resize_with(count, || Particle::spawn(rng, *width, *height));
    }

    /// The particles, in a stable order.
    pub fn particles(&self) -> &[Particle] {
        &self.particles
    }

    pub fn count(&self) -> usize {
        self.particles.len()
    }

    pub fn width(&self) -> f32 {
        self.width
    }

    pub fn height(&self) -> f32 {
        self.height
    }

    /// Simulated seconds since creation.
    pub fn time(&self) -> f32 {
        self.time
    }
}

/// Velocity added to a particle at `(x, y)` by the pointer: a swirl around it
/// plus a gentle push away, both fading smoothly to zero at `POINTER_RADIUS`.
fn pointer_influence(pointer: &Pointer, x: f32, y: f32) -> (f32, f32) {
    let dx = x - pointer.x;
    let dy = y - pointer.y;
    let dist_sq = dx * dx + dy * dy;
    // The lower bound avoids dividing by ~0 for a particle under the pointer.
    if !(1e-6..POINTER_RADIUS * POINTER_RADIUS).contains(&dist_sq) {
        return (0.0, 0.0);
    }

    let dist = dist_sq.sqrt();
    let (unit_x, unit_y) = (dx / dist, dy / dist);
    let reach = 1.0 - dist_sq / (POINTER_RADIUS * POINTER_RADIUS);
    let falloff = reach * reach;

    (
        (unit_x * POINTER_PUSH - unit_y * POINTER_SWIRL) * falloff,
        (unit_y * POINTER_PUSH + unit_x * POINTER_SWIRL) * falloff,
    )
}

/// Sizes come from the DOM, where zero (hidden element) and NaN can happen.
fn sanitize_size(value: f32) -> f32 {
    if value.is_finite() {
        value.max(1.0)
    } else {
        1.0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const DT: f32 = 1.0 / 60.0;

    fn run(field: &mut Field, steps: usize) {
        for _ in 0..steps {
            field.step(DT);
        }
    }

    fn assert_in_bounds(field: &Field) {
        for (i, p) in field.particles().iter().enumerate() {
            for (name, value, max) in [
                ("x", p.x, field.width()),
                ("y", p.y, field.height()),
                ("prev_x", p.prev_x, field.width()),
                ("prev_y", p.prev_y, field.height()),
            ] {
                assert!(
                    (0.0..=max).contains(&value),
                    "particle {i}: {name} = {value} is outside 0..={max}"
                );
            }
            assert!(p.vx.is_finite() && p.vy.is_finite());
            assert!(p.life > 0.0 && p.life <= MAX_LIFETIME);
        }
    }

    #[test]
    fn same_seed_gives_identical_state() {
        let mut a = Field::new(800.0, 600.0, 500, 7);
        let mut b = Field::new(800.0, 600.0, 500, 7);
        assert_eq!(a, b);

        run(&mut a, 600);
        run(&mut b, 600);

        // Exact float equality on purpose: within one build, the same calls
        // must give the same floats, not merely close ones.
        assert_eq!(a.particles(), b.particles());
        assert_eq!(a, b);
    }

    #[test]
    fn different_seeds_give_different_state() {
        let a = Field::new(800.0, 600.0, 200, 1);
        let b = Field::new(800.0, 600.0, 200, 2);
        assert_ne!(a.particles(), b.particles());
    }

    #[test]
    fn particles_stay_in_bounds() {
        let mut field = Field::new(640.0, 360.0, 800, 3);
        field.set_pointer(320.0, 180.0, true);
        // 30 simulated seconds: every particle respawns several times.
        for _ in 0..1_800 {
            field.step(DT);
            assert_in_bounds(&field);
        }
    }

    #[test]
    fn particles_actually_move() {
        let mut field = Field::new(640.0, 360.0, 300, 4);
        let start = field.particles().to_vec();
        run(&mut field, 120);

        let moved = start
            .iter()
            .zip(field.particles())
            .filter(|(before, after)| before.x != after.x || before.y != after.y)
            .count();
        assert!(moved > 290, "only {moved} of 300 particles moved");
    }

    /// Steps once and returns the indices of the particles that respawned.
    ///
    /// `life` only ever decreases while a particle is alive, so a `life` that
    /// went up is a respawn and nothing else.
    fn step_and_find_respawns(field: &mut Field) -> Vec<usize> {
        let lives: Vec<f32> = field.particles().iter().map(|p| p.life).collect();
        field.step(DT);
        field
            .particles()
            .iter()
            .zip(lives)
            .enumerate()
            .filter(|(_, (p, life_before))| p.life > *life_before)
            .map(|(i, _)| i)
            .collect()
    }

    #[test]
    fn particles_respawn_when_their_life_runs_out() {
        const COUNT: usize = 300;
        let mut field = Field::new(640.0, 360.0, COUNT, 4);
        let mut respawns = vec![0u32; COUNT];
        let mut fresh_checked = 0;

        // A little longer than the longest possible life.
        let steps = (MAX_LIFETIME / DT) as usize + 10;
        for _ in 0..steps {
            let lives_before: Vec<f32> = field.particles().iter().map(|p| p.life).collect();
            for i in step_and_find_respawns(&mut field) {
                respawns[i] += 1;

                // A respawned particle is a fresh one: at rest, with a full
                // life, and with a zero-length segment so that the renderer
                // does not draw a line across the screen.
                let p = field.particles()[i];
                assert_eq!((p.prev_x, p.prev_y), (p.x, p.y));
                assert_eq!((p.vx, p.vy), (0.0, 0.0));
                assert!((MIN_LIFETIME..MAX_LIFETIME).contains(&p.life));
                fresh_checked += 1;
            }
            // Nobody outlives its life: whoever was about to expire is new.
            for (p, life_before) in field.particles().iter().zip(lives_before) {
                assert!(life_before - DT > 0.0 || p.life >= MIN_LIFETIME);
            }
        }

        assert!(fresh_checked > 0);
        assert!(
            respawns.iter().all(|&n| n >= 1),
            "every particle respawns within MAX_LIFETIME"
        );
        // Lives last between 3 and 9 seconds, so about 1.5 respawns each.
        let total: u32 = respawns.iter().sum();
        assert!(
            (COUNT as u32..COUNT as u32 * 4).contains(&total),
            "{total} respawns"
        );
        assert_eq!(field.count(), COUNT);
    }

    #[test]
    fn particles_respawn_when_they_leave_the_field() {
        // A small field with the pointer in the middle pushing outwards. The
        // run is shorter than the minimum life (3 s), so no particle can
        // expire: every respawn seen here is a particle that left the field.
        let mut field = Field::new(40.0, 40.0, 200, 12);
        field.set_pointer(20.0, 20.0, true);
        let mut exits = 0;
        for _ in 0..(MIN_LIFETIME / DT) as usize - 10 {
            exits += step_and_find_respawns(&mut field).len();
            assert_in_bounds(&field);
        }
        assert!(exits > 200, "only {exits} particles left the field");
    }

    #[test]
    fn respawns_are_deterministic() {
        let mut a = Field::new(640.0, 360.0, 300, 4);
        let mut b = Field::new(640.0, 360.0, 300, 4);
        let mut other_seed = Field::new(640.0, 360.0, 300, 5);
        let (mut log_a, mut log_b, mut log_other) = (Vec::new(), Vec::new(), Vec::new());

        for step in 0..(MAX_LIFETIME / DT) as usize {
            log_a.extend(
                step_and_find_respawns(&mut a)
                    .into_iter()
                    .map(|i| (step, i)),
            );
            log_b.extend(
                step_and_find_respawns(&mut b)
                    .into_iter()
                    .map(|i| (step, i)),
            );
            log_other.extend(
                step_and_find_respawns(&mut other_seed)
                    .into_iter()
                    .map(|i| (step, i)),
            );
        }

        assert!(log_a.len() >= 300);
        // Same particles respawn on the same steps, at the same places.
        assert_eq!(log_a, log_b);
        assert_eq!(a, b);
        assert_ne!(log_a, log_other);
    }

    #[test]
    fn resize_keeps_invariants() {
        let mut field = Field::new(1200.0, 700.0, 400, 5);
        run(&mut field, 200);
        let buffer_before = field.particles().as_ptr();

        for (width, height) in [(320.0, 568.0), (2560.0, 1440.0), (1.0, 1.0), (900.0, 500.0)] {
            field.resize(width, height);
            assert_eq!(field.width(), width);
            assert_eq!(field.height(), height);
            assert_eq!(field.count(), 400);
            assert_in_bounds(&field);

            run(&mut field, 60);
            assert_in_bounds(&field);
        }

        // Resizing and stepping reuse the same allocation.
        assert_eq!(field.particles().as_ptr(), buffer_before);
    }

    #[test]
    fn resize_tolerates_degenerate_sizes() {
        let mut field = Field::new(0.0, f32::NAN, 50, 6);
        assert_eq!((field.width(), field.height()), (1.0, 1.0));
        field.resize(-10.0, f32::INFINITY);
        assert_eq!((field.width(), field.height()), (1.0, 1.0));
        run(&mut field, 30);
        assert_in_bounds(&field);
    }

    #[test]
    fn set_count_grows_and_shrinks() {
        let mut field = Field::new(500.0, 500.0, 100, 8);
        let first_hundred = field.particles().to_vec();

        field.set_count(250);
        assert_eq!(field.count(), 250);
        // Existing particles are untouched by growing.
        assert_eq!(&field.particles()[..100], first_hundred.as_slice());
        assert_in_bounds(&field);

        field.set_count(10);
        assert_eq!(field.count(), 10);
        assert_eq!(field.particles(), &first_hundred[..10]);

        field.set_count(0);
        field.step(DT);
        assert_eq!(field.count(), 0);
    }

    #[test]
    fn pointer_changes_trajectories() {
        let mut baseline = Field::new(800.0, 600.0, 500, 9);
        let mut inactive = baseline.clone();
        let mut active = baseline.clone();

        inactive.set_pointer(400.0, 300.0, false);
        active.set_pointer(400.0, 300.0, true);

        run(&mut baseline, 30);
        run(&mut inactive, 30);
        run(&mut active, 30);

        assert_eq!(baseline.particles(), inactive.particles());
        assert_ne!(baseline.particles(), active.particles());

        // Only particles that were near the pointer are affected; far ones
        // follow exactly the same path.
        let far_unchanged = baseline
            .particles()
            .iter()
            .zip(active.particles())
            .filter(|(b, _)| (b.x - 400.0).hypot(b.y - 300.0) > POINTER_RADIUS * 2.0)
            .all(|(b, a)| b == a);
        assert!(far_unchanged);
    }

    #[test]
    fn pointer_influence_is_local_and_finite() {
        let pointer = Pointer { x: 100.0, y: 100.0 };
        assert_eq!(pointer_influence(&pointer, 100.0, 100.0), (0.0, 0.0));
        assert_eq!(
            pointer_influence(&pointer, 100.0 + POINTER_RADIUS, 100.0),
            (0.0, 0.0)
        );

        let (px, py) = pointer_influence(&pointer, 130.0, 100.0);
        assert!(px > 0.0, "pushes away from the pointer");
        assert!(py > 0.0, "and swirls around it");
        assert!(px.hypot(py) <= POINTER_PUSH.hypot(POINTER_SWIRL));
    }

    #[test]
    fn invalid_steps_are_ignored_and_large_ones_clamped() {
        let mut field = Field::new(400.0, 300.0, 50, 10);
        let before = field.clone();

        field.step(0.0);
        field.step(-1.0);
        field.step(f32::NAN);
        assert_eq!(field, before);

        field.step(10.0);
        assert_eq!(field.time(), MAX_DT);
        assert_in_bounds(&field);
    }

    #[test]
    fn highlight_kinds_are_a_small_minority() {
        let field = Field::new(1000.0, 1000.0, 10_000, 11);
        let highlighted = field
            .particles()
            .iter()
            .filter(|p| p.kind != Particle::MUTED)
            .count();
        assert!(
            (700..1_300).contains(&highlighted),
            "{highlighted} highlighted"
        );
        assert!(
            field
                .particles()
                .iter()
                .all(|p| { [Particle::MUTED, Particle::ACCENT, Particle::DATA].contains(&p.kind) })
        );
    }
}
