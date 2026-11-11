/**
 * Size of the built WebAssembly module, for display.
 * `size.json` is written by scripts/build-wasm.mjs from the real artifact.
 */
import size from '../../wasm/field/size.json';

const toKb = (bytes: number): string => (bytes / 1000).toFixed(1);

export const wasmSize = {
  gzipKb: toKb(size.gzipBytes),
  rawKb: toKb(size.rawBytes),
} as const;
