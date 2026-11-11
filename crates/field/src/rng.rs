//! A small seeded pseudo-random number generator (PCG32, XSH-RR variant).
//!
//! Written by hand instead of pulling in the `rand` crate: the simulation only
//! needs uniform floats, and owning the generator makes the determinism
//! guarantee ("same seed, same particles") easy to reason about.
//!
//! Reference: M. E. O'Neill, "PCG: A Family of Simple Fast Space-Efficient
//! Statistically Good Algorithms for Random Number Generation" (2014).

#![forbid(unsafe_code)]

const MULTIPLIER: u64 = 6_364_136_223_846_793_005;
/// Stream selector. Any odd number works; this is the PCG reference default.
const INCREMENT: u64 = 1_442_695_040_888_963_407;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Pcg32 {
    state: u64,
}

impl Pcg32 {
    pub fn new(seed: u64) -> Self {
        // Standard PCG seeding: advance once, mix the seed in, advance again,
        // so that nearby seeds do not produce nearby first outputs.
        let mut rng = Self { state: 0 };
        rng.next_u32();
        rng.state = rng.state.wrapping_add(seed);
        rng.next_u32();
        rng
    }

    pub fn next_u32(&mut self) -> u32 {
        let old = self.state;
        // Integer overflow is the algorithm here, hence the explicit
        // `wrapping_*` calls (plain `*` would panic in debug builds).
        self.state = old.wrapping_mul(MULTIPLIER).wrapping_add(INCREMENT);
        let xorshifted = (((old >> 18) ^ old) >> 27) as u32;
        let rotation = (old >> 59) as u32;
        xorshifted.rotate_right(rotation)
    }

    /// Uniform float in `[0, 1)`.
    pub fn next_f32(&mut self) -> f32 {
        // An f32 has 24 bits of mantissa, so only the top 24 bits are used.
        // Using all 32 could round up to exactly 1.0.
        (self.next_u32() >> 8) as f32 / (1u32 << 24) as f32
    }

    /// Uniform float in `[min, max)`.
    pub fn range(&mut self, min: f32, max: f32) -> f32 {
        min + (max - min) * self.next_f32()
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn same_seed_gives_same_sequence() {
        let mut a = Pcg32::new(42);
        let mut b = Pcg32::new(42);
        for _ in 0..1_000 {
            assert_eq!(a.next_u32(), b.next_u32());
        }
    }

    #[test]
    fn different_seeds_diverge() {
        let mut a = Pcg32::new(1);
        let mut b = Pcg32::new(2);
        let same = (0..100).filter(|_| a.next_u32() == b.next_u32()).count();
        assert!(same < 5);
    }

    #[test]
    fn floats_stay_in_unit_interval() {
        let mut rng = Pcg32::new(7);
        for _ in 0..100_000 {
            let value = rng.next_f32();
            assert!((0.0..1.0).contains(&value), "{value} is outside [0, 1)");
        }
    }

    #[test]
    fn floats_are_roughly_uniform() {
        let mut rng = Pcg32::new(9);
        let samples = 100_000;
        let mean = (0..samples).map(|_| rng.next_f32() as f64).sum::<f64>() / samples as f64;
        assert!((mean - 0.5).abs() < 0.01, "mean was {mean}");
    }
}
