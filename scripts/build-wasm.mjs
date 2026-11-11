// Builds the Rust/WASM crate used by the hero canvas.
// Skips gracefully when the crate has not been added yet so that
// `pnpm run build:wasm && pnpm build` works at every stage of the project.
import { existsSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const crateDir = resolve(root, 'crates/field');

if (!existsSync(resolve(crateDir, 'Cargo.toml'))) {
  console.log('[build:wasm] crates/field not found - skipping WASM build.');
  process.exit(0);
}

const args = [
  'build',
  'crates/field',
  '--target',
  'web',
  '--release',
  '--out-dir',
  '../../src/wasm/field',
];

console.log(`[build:wasm] wasm-pack ${args.join(' ')}`);
const result = spawnSync('wasm-pack', args, { cwd: root, stdio: 'inherit' });

if (result.error) {
  console.error(`[build:wasm] could not run wasm-pack: ${result.error.message}`);
  console.error('[build:wasm] install it from https://rustwasm.github.io/wasm-pack/');
  process.exit(1);
}
process.exit(result.status ?? 1);
