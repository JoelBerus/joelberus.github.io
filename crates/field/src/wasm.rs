//! The JavaScript boundary.
//!
//! This is everything the browser can see. It adds no behaviour of its own:
//! each method forwards to [`Field`], and the particle data is shared rather
//! than copied.
//!
//! ## How the zero-copy view works
//!
//! A WebAssembly module has one linear memory, which JavaScript sees as an
//! `ArrayBuffer`. The particle `Vec` lives somewhere inside it. Instead of
//! serialising particles on every frame, [`FlowField::particles_ptr`] returns
//! the byte offset of the first particle and JavaScript wraps that region:
//!
//! ```js
//! new Float32Array(wasm.memory.buffer, field.particlesPtr(), field.particlesLen())
//! ```
//!
//! Rust keeps ownership; JavaScript only reads. The view has to be recreated
//! when the buffer may have moved (after `setCount`) or when the memory grew
//! (which detaches the old `ArrayBuffer`).

use wasm_bindgen::prelude::*;

use crate::sim::{Field, Particle};

/// Upper bound on the particle count accepted from JavaScript, so a bad
/// argument cannot ask for gigabytes of memory.
const MAX_PARTICLES: u32 = 20_000;

#[wasm_bindgen]
pub struct FlowField {
    inner: Field,
}

#[wasm_bindgen]
impl FlowField {
    #[wasm_bindgen(constructor)]
    pub fn new(width: f32, height: f32, count: u32, seed: u32) -> FlowField {
        FlowField {
            inner: Field::new(width, height, clamp_count(count), seed),
        }
    }

    /// Advances the simulation by `dt` seconds.
    pub fn step(&mut self, dt: f32) {
        self.inner.step(dt);
    }

    #[wasm_bindgen(js_name = setPointer)]
    pub fn set_pointer(&mut self, x: f32, y: f32, active: bool) {
        self.inner.set_pointer(x, y, active);
    }

    pub fn resize(&mut self, width: f32, height: f32) {
        self.inner.resize(width, height);
    }

    /// Changes the number of particles. Invalidates earlier particle views.
    #[wasm_bindgen(js_name = setCount)]
    pub fn set_count(&mut self, count: u32) {
        self.inner.set_count(clamp_count(count));
    }

    pub fn count(&self) -> u32 {
        self.inner.count() as u32
    }

    /// Offset of the particle buffer inside the module's linear memory.
    ///
    /// Creating a raw pointer is safe; only dereferencing one is not, and
    /// Rust never dereferences this one. That is why this crate needs no
    /// `unsafe` block of its own.
    #[wasm_bindgen(js_name = particlesPtr)]
    pub fn particles_ptr(&self) -> *const f32 {
        self.inner.particles().as_ptr().cast::<f32>()
    }

    /// Length of the particle buffer in `f32` values (`count * stride`).
    #[wasm_bindgen(js_name = particlesLen)]
    pub fn particles_len(&self) -> u32 {
        (self.inner.count() * Particle::STRIDE) as u32
    }

    /// Number of `f32` values per particle:
    /// `[x, y, prev_x, prev_y, vx, vy, life, kind]`.
    pub fn stride() -> u32 {
        Particle::STRIDE as u32
    }
}

fn clamp_count(count: u32) -> usize {
    count.min(MAX_PARTICLES) as usize
}

#[cfg(test)]
mod tests {
    use super::*;

    /// What a `Float32Array` over the exposed region has to cover: exactly
    /// the particle slice, start to end.
    fn assert_view_covers_the_particles(field: &FlowField) {
        let particles = field.inner.particles();
        let range = particles.as_ptr_range();
        assert_eq!(field.particles_ptr(), range.start.cast::<f32>());
        assert_eq!(
            field.particles_len(),
            field.count() * FlowField::stride(),
            "length is count * stride"
        );
        let bytes = field.particles_len() as usize * size_of::<f32>();
        assert_eq!(range.end as usize - range.start as usize, bytes);
    }

    #[test]
    fn buffer_view_matches_the_particles() {
        let field = FlowField::new(300.0, 200.0, 64, 1);
        assert_eq!(field.count(), 64);
        assert_eq!(FlowField::stride(), 8);
        assert_eq!(field.particles_len(), 64 * 8);
        assert_view_covers_the_particles(&field);
    }

    #[test]
    fn pointer_is_stable_across_step_resize_and_pointer_moves() {
        let mut field = FlowField::new(300.0, 200.0, 64, 1);
        let ptr = field.particles_ptr();
        let len = field.particles_len();

        for i in 0..600 {
            field.step(1.0 / 60.0);
            if i % 50 == 0 {
                field.resize(200.0 + i as f32, 900.0 - i as f32);
                field.set_pointer(i as f32, 10.0, i % 100 == 0);
            }
            // JavaScript keeps its view across all of these calls.
            assert_eq!(field.particles_ptr(), ptr);
            assert_eq!(field.particles_len(), len);
        }
        assert_view_covers_the_particles(&field);
    }

    /// `set_count` is the one call after which JavaScript must rebuild its
    /// view. Whether the buffer really moves is up to the allocator, so the
    /// test does not assert that it does. It asserts the contract instead:
    /// read again after `set_count`, the pointer and length describe the live
    /// buffer, whatever happened to the old one.
    #[test]
    fn pointer_and_length_are_valid_again_after_set_count() {
        let mut field = FlowField::new(300.0, 200.0, 64, 1);
        let old_len = field.particles_len();

        for count in [4_000, 64, 0, 1, MAX_PARTICLES, 300] {
            field.set_count(count);
            assert_eq!(field.count(), count);
            assert_view_covers_the_particles(&field);
            field.step(1.0 / 60.0);
            assert_view_covers_the_particles(&field);
        }
        // The length changed even if the address happened not to, so a view
        // built before `set_count` is wrong either way.
        assert_ne!(field.particles_len(), old_len);
    }

    #[test]
    fn layout_indices_match_the_documented_order() {
        // [x, y, prev_x, prev_y, vx, vy, life, kind], as read by mount.ts.
        assert_eq!(
            [
                Particle::X,
                Particle::Y,
                Particle::PREV_X,
                Particle::PREV_Y,
                Particle::VX,
                Particle::VY,
                Particle::LIFE,
                Particle::KIND
            ],
            [0, 1, 2, 3, 4, 5, 6, 7]
        );
    }

    #[test]
    fn count_is_clamped() {
        let mut field = FlowField::new(300.0, 200.0, u32::MAX, 1);
        assert_eq!(field.count(), MAX_PARTICLES);
        field.set_count(u32::MAX);
        assert_eq!(field.count(), MAX_PARTICLES);
    }
}
