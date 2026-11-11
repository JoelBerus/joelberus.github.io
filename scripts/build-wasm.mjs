// Builds crates/field to WebAssembly with wasm-pack and writes it, together
// with a small size report, to src/wasm/field (git-ignored build output).
//
// Runs before `dev`, `build` and `check`, so it is designed to be cheap:
// when the output is newer than every Rust source file it does nothing.
// Pass --force to rebuild anyway.
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const crateDir = join(root, 'crates/field');
const outDir = join(root, 'src/wasm/field');
const wasmFile = join(outDir, 'field_bg.wasm');
const sizeFile = join(outDir, 'size.json');
const force = process.argv.includes('--force');

const log = (message) => console.log(`[build:wasm] ${message}`);

/** Every file that should trigger a rebuild when it changes. */
function sourceFiles() {
  const files = [fileURLToPath(import.meta.url)];
  for (const name of ['Cargo.toml', 'Cargo.lock']) {
    const file = join(crateDir, name);
    if (existsSync(file)) files.push(file);
  }
  const walk = (dir) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      const path = join(dir, entry.name);
      if (entry.isDirectory()) walk(path);
      else files.push(path);
    }
  };
  walk(join(crateDir, 'src'));
  return files;
}

function isFresh() {
  const outputs = [wasmFile, join(outDir, 'field.js'), join(outDir, 'field.d.ts'), sizeFile];
  if (!outputs.every((file) => existsSync(file))) return false;
  const builtAt = Math.min(...outputs.map((file) => statSync(file).mtimeMs));
  return sourceFiles().every((file) => statSync(file).mtimeMs <= builtAt);
}

/** The numbers shown on the site come from the real artifact, not from a constant. */
function writeSizeReport() {
  const wasm = readFileSync(wasmFile);
  const report = {
    rawBytes: wasm.byteLength,
    gzipBytes: gzipSync(wasm, { level: 9 }).byteLength,
  };
  writeFileSync(sizeFile, `${JSON.stringify(report, null, 2)}\n`);
  const kb = (bytes) => `${(bytes / 1000).toFixed(1)} kB`;
  log(`${relative(root, wasmFile)}: ${kb(report.rawBytes)} raw, ${kb(report.gzipBytes)} gzip`);
}

if (!force && isFresh()) {
  log('up to date, skipping (use --force to rebuild).');
  process.exit(0);
}

const args = [
  'build',
  crateDir,
  '--target',
  'web',
  '--release',
  '--no-pack', // only the .wasm, the JS glue and its .d.ts; no npm package files
  '--out-dir',
  outDir,
  '--out-name',
  'field',
];

log(`wasm-pack ${args.map((arg) => (arg.startsWith(root) ? relative(root, arg) : arg)).join(' ')}`);
// `cargo install` puts binaries in ~/.cargo/bin, which is not on PATH with
// every Rust setup (Homebrew's rustup, for one), so try it as a fallback.
const cargoBin = join(process.env.CARGO_HOME ?? join(homedir(), '.cargo'), 'bin');
const exe = process.platform === 'win32' ? 'wasm-pack.exe' : 'wasm-pack';
let result = spawnSync('wasm-pack', args, { cwd: root, stdio: 'inherit' });
if (result.error?.code === 'ENOENT' && existsSync(join(cargoBin, exe))) {
  result = spawnSync(join(cargoBin, exe), args, { cwd: root, stdio: 'inherit' });
}

if (result.error) {
  console.error(`[build:wasm] could not run wasm-pack: ${result.error.message}`);
  console.error(
    '[build:wasm] install Rust (https://rustup.rs), then:\n' +
      '  rustup target add wasm32-unknown-unknown\n' +
      '  cargo install wasm-pack',
  );
  process.exit(1);
}
if (result.status !== 0) process.exit(result.status ?? 1);

writeSizeReport();
