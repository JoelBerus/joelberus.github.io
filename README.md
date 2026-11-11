# Portfolio

Personal developer portfolio of Joel Bermudez Acosta. Static, bilingual
(English at `/`, Spanish at `/es/`) and deployed to GitHub Pages.

## Stack

- [Astro 5](https://astro.build) with TypeScript (strict), static output
- Hand-written CSS with design tokens (no UI framework, no Tailwind)
- Geist and Geist Mono, self-hosted through Fontsource
- Rust compiled to WebAssembly for the hero canvas (`crates/field`)
- GitHub Actions for build and deploy

## Commands

Requires Node 22+ and pnpm 9. The WASM build also needs Rust stable with the
`wasm32-unknown-unknown` target and `wasm-pack`.

| Command               | What it does                                             |
| --------------------- | -------------------------------------------------------- |
| `pnpm install`        | Install dependencies                                     |
| `pnpm dev`            | Start the dev server at `localhost:4321`                 |
| `pnpm run build:wasm` | Build `crates/field` into `src/wasm/field` (skipped if the crate is missing) |
| `pnpm build`          | Build the site into `dist/`                              |
| `pnpm preview`        | Serve the production build locally                       |
| `pnpm run check`      | Type-check `.astro` and `.ts` files                      |

## Structure

```
.github/workflows/deploy.yml   Build (WASM + Astro) and deploy to GitHub Pages
crates/field/                  Rust crate for the hero canvas (WASM)
public/                        Static files (favicon, robots.txt)
scripts/build-wasm.mjs         Guarded wasm-pack build
src/
  components/                  Section, Tag, Button, Metric, ProjectCard
  components/home/             One file per home page section
  components/pages/Home.astro  Home page shared by both locales
  config/site.ts               Name, links, section ids
  i18n/                        en.ts, es.ts and helpers (t, localizePath, ...)
  layouts/Base.astro           Head, header, footer
  pages/                       index.astro, es/index.astro, 404.astro
  styles/                      tokens.css (design tokens), global.css
```

## Adding a translated page

Create the page under `src/pages/` and its twin under `src/pages/es/` with the
same path, and render the same component with `locale="en"` / `locale="es"`.
`Base.astro` derives the canonical URL, the `hreflang` alternates and the
language switch target from the current path. Add strings to `src/i18n/en.ts`
first; `es.ts` fails type-checking until it has the same keys.
