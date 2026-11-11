# Portfolio

Personal developer portfolio of Joel Bermudez Acosta. Static, bilingual
(English at `/`, Spanish at `/es/`) and deployed to GitHub Pages.

## Stack

- [Astro 5](https://astro.build) with TypeScript (strict), static output
- Hand-written CSS with design tokens (no UI framework, no Tailwind)
- Geist and Geist Mono, self-hosted through Fontsource
- Rust compiled to WebAssembly for the hero canvas (`crates/field`)
- GitHub Actions for build and deploy

## Requirements

- Node 22+ and pnpm 9
- Rust stable with the `wasm32-unknown-unknown` target, and `wasm-pack`

```sh
rustup target add wasm32-unknown-unknown
cargo install wasm-pack
```

The Rust toolchain is not optional: `dev`, `build` and `check` all start by
compiling `crates/field` to WebAssembly (`scripts/build-wasm.mjs`). The step is
skipped when the output in `src/wasm/field` is newer than the Rust sources.

## Commands

| Command               | What it does                                                    |
| --------------------- | --------------------------------------------------------------- |
| `pnpm install`        | Install dependencies                                            |
| `pnpm dev`            | Build the WASM module if needed, then start the dev server at `localhost:4321` |
| `pnpm build`          | Build the WASM module if needed, then the site into `dist/`     |
| `pnpm preview`        | Serve the production build locally                              |
| `pnpm run check`      | Build the WASM module if needed, then type-check `.astro` and `.ts` files |
| `pnpm run build:wasm` | Build `crates/field` into `src/wasm/field` (`-- --force` to rebuild) |
| `pnpm run test:rust`  | Run the unit tests of `crates/field` natively (`cargo test`)    |

## Structure

```
LICENSE                        MIT, code only (see License below)
.github/workflows/deploy.yml   Test the crate, build (WASM + Astro), deploy to GitHub Pages
crates/field/                  Rust crate behind the hero canvas (see its README)
public/                        Static files: favicon, robots.txt, og.png
public/pocketgame/             Standalone static landing of PocketGame, served at /pocketgame/
scripts/build-wasm.mjs         Guarded wasm-pack build, also writes the size report
src/
  assets/work/                 Logos, fonts and screenshots of the case studies
  components/                  Section, Tag, Button, Metric, ProjectCard
  components/field/            Loads the WASM module and draws it on a canvas
  components/home/             One file per home page section
  components/pages/Home.astro  Home page shared by both locales
  components/work/             WorkCard, Shot and the CaseStudy page
  config/site.ts               Name, links, section ids
  data/                        Typed content: profile, experience, skills, projects, rust
  data/work/                   One file per case study (drupela, pocketgame) and their types
  i18n/                        en.ts, es.ts and helpers (t, localizePath, ...)
  layouts/Base.astro           Head, header, footer
  pages/                       index, work/<slug> and their twins under es/, 404
  styles/                      tokens.css (design tokens), global.css
  wasm/field/                  wasm-pack output (git-ignored, rebuilt on demand)
```

## Deployment

`.github/workflows/deploy.yml` builds and publishes the site on every push to
`main` (it can also be run by hand from the Actions tab).

One-time setup: in the repository on GitHub, open **Settings → Pages** and set
**Build and deployment → Source** to **GitHub Actions**. Until that is done the
workflow stops at its "Configure Pages" step, because there is no Pages site to
deploy to.

The workflow has no workflow-level permissions. The `build` job only reads the
repository and the Pages settings; the `deploy` job alone gets `pages: write`
and `id-token: write`.

`/pocketgame/` is a plain static folder, so Astro does not know about it. It is
listed by hand under `customPages` in `astro.config.mjs` to appear in the
sitemap.

## Adding a translated page

Create the page under `src/pages/` and its twin under `src/pages/es/` with the
same path, and render the same component with `locale="en"` / `locale="es"`.
`Base.astro` derives the canonical URL, the `hreflang` alternates and the
language switch target from the current path. Add interface strings to
`src/i18n/en.ts` first; `es.ts` fails type-checking until it has the same keys.
Longer copy lives in `src/data/`, with both locales side by side.

## License

The source code of this repository (the Astro site, its components and styles,
the build scripts and the `crates/field` Rust crate) is released under the
[MIT License](LICENSE).

**Not covered by the MIT license, all rights reserved:** the content of the
site, meaning its texts, images, screenshots, logos and the brand assets of
Drupela and PocketGame. That includes everything under `src/assets/work/` and
`public/pocketgame/`. Do not reuse them without written permission.

The bundled fonts keep their own licenses: Quicksand
(`src/assets/work/drupela/fonts/OFL-Quicksand.txt`) and Manrope
(`public/pocketgame/assets/fonts/OFL.txt`) are distributed under the SIL Open
Font License 1.1.
