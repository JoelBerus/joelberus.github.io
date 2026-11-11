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

    #[test]
    fn buffer_view_matches_the_particles() {
        let field = FlowField::new(300.0, 200.0, 64, 1);
        assert_eq!(field.count(), 64);
        assert_eq!(field.particles_len(), 64 * FlowField::stride());
        assert_eq!(
            field.particles_ptr(),
            field.inner.particles().as_ptr().cast::<f32>()
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
