//! Value noise and the curl of it.
//!
//! Value noise assigns a pseudo-random number to every point of an integer
//! lattice and interpolates smoothly in between. It is the simplest coherent
//! noise there is, which makes it a good one to implement from scratch.
//!
//! The flow field is the *curl* of that scalar noise rather than "noise mapped
//! to an angle". A curl field has zero divergence, so particles neither pile
//! up in sinks nor leave holes behind: the density stays even without any
//! extra bookkeeping.

#![forbid(unsafe_code)]

/// Hashes a lattice point to a float in `[0, 1)`.
///
/// The mixing steps are the 32-bit finalizer from MurmurHash3. It is not
/// cryptographic; it only has to look uncorrelated between neighbours.
fn lattice(x: i32, y: i32, z: i32, seed: u32) -> f32 {
    let mut h = seed;
    h ^= (x as u32).wrapping_mul(0x9E37_79B1);
    h = h.rotate_left(13);
    h ^= (y as u32).wrapping_mul(0x85EB_CA77);
    h = h.rotate_left(13);
    h ^= (z as u32).wrapping_mul(0xC2B2_AE3D);

    h ^= h >> 16;
    h = h.wrapping_mul(0x85EB_CA6B);
    h ^= h >> 13;
    h = h.wrapping_mul(0xC2B2_AE35);
    h ^= h >> 16;

    (h >> 8) as f32 / (1u32 << 24) as f32
}

/// Quintic fade `6t^5 - 15t^4 + 10t^3` (Perlin's "smootherstep").
///
/// Its first and second derivatives are zero at 0 and 1, so the noise has no
/// visible creases at cell borders. That matters here because the flow is
/// built from the derivative of the noise.
fn fade(t: f32) -> f32 {
    t * t * t * (t * (t * 6.0 - 15.0) + 10.0)
}

fn lerp(a: f32, b: f32, t: f32) -> f32 {
    a + (b - a) * t
}

/// Smooth 3D value noise in `[0, 1)`.
///
/// `x` and `y` are space; `z` is used as time so the field can drift slowly.
pub fn value(x: f32, y: f32, z: f32, seed: u32) -> f32 {
    let (x0, y0, z0) = (x.floor(), y.floor(), z.floor());
    let (tx, ty, tz) = (fade(x - x0), fade(y - y0), fade(z - z0));
    let (ix, iy, iz) = (x0 as i32, y0 as i32, z0 as i32);

    // Bilinear interpolation on one z-slice of the lattice cell.
    let slice = |iz: i32| {
        let bottom = lerp(
            lattice(ix, iy, iz, seed),
            lattice(ix.wrapping_add(1), iy, iz, seed),
            tx,
        );
        let top = lerp(
            lattice(ix, iy.wrapping_add(1), iz, seed),
            lattice(ix.wrapping_add(1), iy.wrapping_add(1), iz, seed),
            tx,
        );
        lerp(bottom, top, ty)
    };

    lerp(slice(iz), slice(iz.wrapping_add(1)), tz)
}

/// 2D curl of the noise at `(x, y)` for time slice `z`.
///
/// For a scalar potential `n`, the curl is `(dn/dy, -dn/dx)`: the gradient
/// rotated by 90 degrees. The derivatives are estimated with central
/// differences, which costs four noise samples and keeps the code obvious.
pub fn curl(x: f32, y: f32, z: f32, seed: u32) -> (f32, f32) {
    const EPSILON: f32 = 0.01;
    let dn_dx = (value(x + EPSILON, y, z, seed) - value(x - EPSILON, y, z, seed)) / (2.0 * EPSILON);
    let dn_dy = (value(x, y + EPSILON, z, seed) - value(x, y - EPSILON, z, seed)) / (2.0 * EPSILON);
    (dn_dy, -dn_dx)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn value_is_deterministic_and_bounded() {
        for i in 0..2_000 {
            let (x, y, z) = (i as f32 * 0.137 - 90.0, i as f32 * 0.071, i as f32 * 0.013);
            let n = value(x, y, z, 3);
            assert_eq!(n, value(x, y, z, 3));
            assert!((0.0..1.0).contains(&n), "{n} is outside [0, 1)");
        }
    }

    #[test]
    fn value_matches_the_lattice_at_integer_points() {
        assert_eq!(value(4.0, -2.0, 7.0, 11), lattice(4, -2, 7, 11));
    }

    #[test]
    fn value_is_continuous_across_cell_borders() {
        let before = value(2.999, 0.4, 0.2, 5);
        let after = value(3.001, 0.4, 0.2, 5);
        assert!((before - after).abs() < 1e-3);
    }

    #[test]
    fn seed_changes_the_field() {
        let differing = (0..100)
            .filter(|&i| {
                let p = i as f32 * 0.31;
                value(p, p * 0.5, 0.0, 1) != value(p, p * 0.5, 0.0, 2)
            })
            .count();
        assert!(differing > 90);
    }

    #[test]
    fn curl_is_finite() {
        for i in 0..500 {
            let p = i as f32 * 0.173;
            let (cx, cy) = curl(p, 10.0 - p, p * 0.1, 8);
            assert!(cx.is_finite() && cy.is_finite());
        }
    }
}
