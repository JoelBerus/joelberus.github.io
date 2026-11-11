//! A deterministic particle flow field.
//!
//! The crate is split in two layers:
//!
//! * [`sim`], [`noise`] and [`rng`] are plain Rust with no WebAssembly types.
//!   They compile and are unit-tested natively with `cargo test`.
//! * [`wasm`] is a thin `wasm-bindgen` wrapper that hands JavaScript a
//!   pointer into the particle buffer, so the page can draw without copying.
//!
//! Rendering is deliberately not done here: JavaScript owns the canvas, Rust
//! owns the simulation state.

pub mod noise;
pub mod rng;
pub mod sim;
pub mod wasm;

pub use sim::{Field, Particle};
