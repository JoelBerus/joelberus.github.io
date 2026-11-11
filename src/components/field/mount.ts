/**
 * Browser side of the hero background.
 *
 * The Rust crate in `crates/field` runs the simulation; this file only
 * schedules it and draws. Each frame makes one call into WebAssembly
 * (`step`) and then reads the particles straight out of the module's memory.
 */
import init, { FlowField } from '../../wasm/field/field.js';
import wasmUrl from '../../wasm/field/field_bg.wasm?url';

export interface FieldOptions {
  /** Element whose pointer events steer the particles. Defaults to the mount. */
  pointerTarget?: HTMLElement;
  /** Called with the running average duration of `step`, in milliseconds. */
  onStats?: (msPerStep: number) => void;
}

/** Same seed for every visitor: the field is deterministic by design. */
const SEED = 2026;
const MAX_DPR = 2;
/** Layout of one particle in the shared buffer (see `Particle` in sim.rs). */
const X = 0;
const Y = 1;
const PREV_X = 2;
const PREV_Y = 3;
const KIND = 7;

/** Trails lose this share of their opacity per second (as an exponential rate). */
const FADE_RATE = 0.9;
/**
 * The fade is applied a few times per second instead of every frame. A tiny
 * per-frame fade rounds to nothing on an 8-bit canvas and leaves ghost trails
 * that never disappear.
 */
const FADE_INTERVAL = 1 / 12;
/** Steps simulated for the single frame shown under `prefers-reduced-motion`. */
const STATIC_STEPS = 240;
const STATIC_DT = 1 / 60;
const STATS_EVERY = 60;

interface Stroke {
  color: string;
  alpha: number;
}

function readToken(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

/** Fewer particles on small screens and on modest devices. */
function particleCount(width: number, height: number): number {
  const byArea = (width * height) / 1100;
  const modest = (navigator.hardwareConcurrency ?? 8) <= 4 || matchMedia('(pointer: coarse)').matches;
  const count = Math.round(byArea * (modest ? 0.6 : 1));
  return Math.max(200, Math.min(1400, count));
}

function context2d(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('2D canvas is not available');
  return ctx;
}

/**
 * Loads the WebAssembly module and starts the field inside `mount`.
 * Rejects if the module cannot be loaded; the caller keeps the CSS fallback.
 */
export async function mountField(mount: HTMLElement, options: FieldOptions = {}): Promise<void> {
  const canvas = document.createElement('canvas');
  const ctx = context2d(canvas);

  const wasm = await init({ module_or_path: wasmUrl });
  const stride = FlowField.stride();

  // Indexed by the particle's `kind`: 0 muted, 1 accent, 2 data.
  const strokes: Stroke[] = [
    { color: readToken('--color-text-subtle', '#7b8691'), alpha: 0.45 },
    { color: readToken('--color-accent', '#ff7a45'), alpha: 0.85 },
    { color: readToken('--color-data', '#5ad1e6'), alpha: 0.7 },
  ];

  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const pointerTarget = options.pointerTarget ?? mount;

  let width = Math.max(1, mount.clientWidth);
  let height = Math.max(1, mount.clientHeight);
  let dpr = 1;
  const field = new FlowField(width, height, particleCount(width, height), SEED);

  // A view into WebAssembly memory, not a copy. It goes stale when the
  // particle buffer is reallocated (setCount) or when the memory grows, which
  // replaces `memory.buffer` with a new ArrayBuffer.
  let particles = new Float32Array(0);
  let viewStale = true;
  function particleView(): Float32Array {
    if (viewStale || particles.buffer !== wasm.memory.buffer) {
      particles = new Float32Array(wasm.memory.buffer, field.particlesPtr(), field.particlesLen());
      viewStale = false;
    }
    return particles;
  }

  let stepMsTotal = 0;
  let stepCount = 0;
  function timedStep(dt: number): void {
    const before = performance.now();
    field.step(dt);
    stepMsTotal += performance.now() - before;
    stepCount += 1;
  }
  function reportStats(): void {
    if (stepCount > 0) options.onStats?.(stepMsTotal / stepCount);
  }

  let sinceFade = 0;
  function draw(dt: number): void {
    sinceFade += dt;
    if (sinceFade >= FADE_INTERVAL) {
      // Erase a share of what is already there, keeping the canvas transparent.
      ctx.globalCompositeOperation = 'destination-out';
      ctx.globalAlpha = 1 - Math.exp(-FADE_RATE * sinceFade);
      ctx.fillRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'source-over';
      sinceFade = 0;
    }

    const data = particleView();
    // One path per colour, so the whole frame is three stroke() calls.
    for (let kind = 0; kind < strokes.length; kind += 1) {
      const stroke = strokes[kind];
      ctx.beginPath();
      for (let i = 0; i < data.length; i += stride) {
        if (data[i + KIND] !== kind) continue;
        ctx.moveTo(data[i + PREV_X], data[i + PREV_Y]);
        ctx.lineTo(data[i + X], data[i + Y]);
      }
      ctx.globalAlpha = stroke.alpha;
      ctx.strokeStyle = stroke.color;
      ctx.stroke();
    }
  }

  /** The reduced-motion picture: the same simulation, advanced once and left still. */
  function drawStaticFrame(): void {
    ctx.clearRect(0, 0, width, height);
    sinceFade = 0;
    field.setPointer(0, 0, false);
    for (let i = 0; i < STATIC_STEPS; i += 1) {
      timedStep(STATIC_DT);
      draw(STATIC_DT);
    }
    reportStats();
  }

  let onScreen = true;
  let frameId = 0;
  let lastTime = 0;

  function frame(now: number): void {
    frameId = 0;
    if (!shouldAnimate()) return;
    // The crate clamps large steps as well; this keeps the fade in step with it.
    const dt = Math.min((now - lastTime) / 1000, 0.05);
    lastTime = now;
    timedStep(dt);
    draw(dt);
    if (stepCount % STATS_EVERY === 0) reportStats();
    frameId = requestAnimationFrame(frame);
  }

  function shouldAnimate(): boolean {
    return onScreen && !document.hidden && !reducedMotion.matches;
  }

  /** Starts or stops the loop to match visibility and motion preferences. */
  function sync(): void {
    if (shouldAnimate()) {
      if (frameId === 0) {
        lastTime = performance.now();
        frameId = requestAnimationFrame(frame);
      }
    } else if (frameId !== 0) {
      cancelAnimationFrame(frameId);
      frameId = 0;
    }
  }

  function resize(): void {
    width = Math.max(1, mount.clientWidth);
    height = Math.max(1, mount.clientHeight);
    dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
    // Setting the size clears the canvas and resets its transform.
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineWidth = 1;
    ctx.lineCap = 'round';

    field.resize(width, height);
    const count = particleCount(width, height);
    if (count !== field.count()) {
      field.setCount(count);
      viewStale = true;
    }
    if (reducedMotion.matches) drawStaticFrame();
  }

  function onPointerMove(event: PointerEvent): void {
    const rect = canvas.getBoundingClientRect();
    field.setPointer(event.clientX - rect.left, event.clientY - rect.top, true);
  }
  function onPointerGone(): void {
    field.setPointer(0, 0, false);
  }

  mount.append(canvas);
  resize();

  // Observed after the first manual resize; the initial callback is a no-op
  // because the size has not changed.
  new ResizeObserver(() => {
    if (mount.clientWidth !== width || mount.clientHeight !== height) resize();
  }).observe(mount);

  new IntersectionObserver((entries) => {
    onScreen = entries.some((entry) => entry.isIntersecting);
    sync();
  }).observe(mount);

  document.addEventListener('visibilitychange', sync);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) drawStaticFrame();
    sync();
  });

  pointerTarget.addEventListener('pointermove', onPointerMove, { passive: true });
  pointerTarget.addEventListener('pointerdown', onPointerMove, { passive: true });
  pointerTarget.addEventListener('pointerleave', onPointerGone, { passive: true });
  pointerTarget.addEventListener('pointercancel', onPointerGone, { passive: true });
  pointerTarget.addEventListener(
    'pointerup',
    (event) => {
      // A finger that lifts is gone; a mouse stays where it is.
      if (event.pointerType !== 'mouse') onPointerGone();
    },
    { passive: true },
  );

  mount.dataset.fieldReady = 'true';
  sync();
}
