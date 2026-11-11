/**
 * Copy for the hero and for the Rust section, in both locales.
 * `es` is typed against `en`, so a missing or extra key fails type-checking.
 */
import type { Locale } from '../i18n';

export const FIELD_SOURCE_URL = 'https://github.com/JoelBerus/joelberus.github.io/tree/main/crates/field';

const en = {
  hero: {
    tagline: 'Full Stack Developer — TypeScript, React, Node.js · learning Rust',
    support:
      '5+ years building web and mobile apps for banking and e-commerce. I also design and ship my own products.',
    ctaWork: 'See work',
    ctaContact: 'Contact',
    chipLabel: 'Rust → WebAssembly',
    chipSizeTitle: 'Size of the .wasm module, gzip-compressed',
    chipStepUnit: 'ms/step',
    chipStepTitle: 'Average time of one simulation step, measured in your browser',
    chipSource: 'source',
    chipSourceLabel: 'source of the Rust crate behind this background, on GitHub',
  },
  rust: {
    lead: 'I write TypeScript for a living. Rust is what I am learning now, and I would rather show working code than list it as a skill. These are the two things I am building with it.',
    crate: {
      eyebrow: 'Running on this page',
      title: 'field: the background of this site',
      body: 'The particles behind the hero are a small Rust crate compiled to WebAssembly. Rust runs the simulation: a curl-noise flow field, a pointer force and particle respawning. JavaScript only draws the result on a 2D canvas.',
      facts: [
        {
          term: 'Deterministic',
          detail:
            'Same seed and same inputs give bit-identical particles. The random generator (PCG32) and the value noise are written by hand, without the rand crate.',
        },
        {
          term: 'Tested',
          detail:
            'The core has no WebAssembly types, so cargo test runs it natively: determinism, bounds, resizing and pointer influence.',
        },
        {
          term: 'No per-frame allocation',
          detail:
            'Rust owns one particle buffer for the whole session. JavaScript reads it in place through a Float32Array view of the module memory. Nothing is copied.',
        },
        {
          term: 'Small',
          detail: '{gzip} kB gzipped ({raw} kB raw). One dependency: wasm-bindgen.',
        },
      ],
      link: 'Read the source',
      tags: ['Rust', 'WebAssembly', 'wasm-bindgen', 'Canvas 2D'],
    },
    assistant: {
      eyebrow: 'In progress · not public yet',
      title: 'asistente-hogar: a home assistant core',
      body: 'A backend for my own household, and my way of learning Rust beyond a single crate: data modelling, error handling and async HTTP.',
      facts: [
        {
          term: 'Core',
          detail: 'Rust and SQLite, with per-person permissions and an audit trail of what changed and who changed it.',
        },
        {
          term: 'API',
          detail: 'An HTTP API built with axum, serving a web UI that can be installed on a phone.',
        },
        {
          term: 'Scope',
          detail: 'Tasks and routines for the people living in the house.',
        },
      ],
      note: 'The repository is private while the core takes shape.',
      tags: ['Rust', 'SQLite', 'axum'],
    },
    honesty:
      'I am not a Rust expert. What I can show today is ownership and borrowing in a small real program, a tested core, and a clean boundary with JavaScript.',
  },
};

type Copy = typeof en;

const es: Copy = {
  hero: {
    tagline: 'Desarrollador Full Stack — TypeScript, React, Node.js · aprendiendo Rust',
    support:
      'Más de 5 años creando aplicaciones web y móviles para banca y comercio electrónico. También diseño y lanzo mis propios productos.',
    ctaWork: 'Ver trabajo',
    ctaContact: 'Contacto',
    chipLabel: 'Rust → WebAssembly',
    chipSizeTitle: 'Tamaño del módulo .wasm comprimido con gzip',
    chipStepUnit: 'ms/paso',
    chipStepTitle: 'Tiempo medio de un paso de la simulación, medido en tu navegador',
    chipSource: 'código',
    chipSourceLabel: 'código del crate de Rust que dibuja este fondo, en GitHub',
  },
  rust: {
    lead: 'Trabajo con TypeScript. Rust es lo que estoy aprendiendo ahora, y prefiero mostrar código que funciona antes que ponerlo en una lista de habilidades. Estas son las dos cosas que estoy construyendo con él.',
    crate: {
      eyebrow: 'Funcionando en esta página',
      title: 'field: el fondo de este sitio',
      body: 'Las partículas detrás del encabezado son un crate pequeño de Rust compilado a WebAssembly. Rust ejecuta la simulación: un campo de flujo con ruido curl, la fuerza del puntero y la reaparición de partículas. JavaScript solo dibuja el resultado en un canvas 2D.',
      facts: [
        {
          term: 'Determinista',
          detail:
            'La misma semilla y las mismas entradas producen partículas idénticas bit a bit. El generador aleatorio (PCG32) y el ruido están escritos a mano, sin el crate rand.',
        },
        {
          term: 'Con pruebas',
          detail:
            'El núcleo no usa tipos de WebAssembly, así que cargo test lo ejecuta de forma nativa: determinismo, límites, redimensionado e influencia del puntero.',
        },
        {
          term: 'Sin asignar memoria por fotograma',
          detail:
            'Rust es dueño de un único búfer de partículas durante toda la sesión. JavaScript lo lee en su sitio con una vista Float32Array de la memoria del módulo. No se copia nada.',
        },
        {
          term: 'Pequeño',
          detail: '{gzip} kB con gzip ({raw} kB sin comprimir). Una dependencia: wasm-bindgen.',
        },
      ],
      link: 'Ver el código',
      tags: ['Rust', 'WebAssembly', 'wasm-bindgen', 'Canvas 2D'],
    },
    assistant: {
      eyebrow: 'En desarrollo · todavía no es público',
      title: 'asistente-hogar: el núcleo de un asistente para el hogar',
      body: 'Un backend para mi propia casa, y mi forma de aprender Rust más allá de un solo crate: modelado de datos, manejo de errores y HTTP asíncrono.',
      facts: [
        {
          term: 'Núcleo',
          detail:
            'Rust y SQLite, con permisos por persona y un registro de auditoría de qué cambió y quién lo cambió.',
        },
        {
          term: 'API',
          detail: 'Una API HTTP hecha con axum, que sirve una interfaz web instalable en el teléfono.',
        },
        {
          term: 'Alcance',
          detail: 'Tareas y rutinas para las personas que viven en la casa.',
        },
      ],
      note: 'El repositorio es privado mientras el núcleo toma forma.',
      tags: ['Rust', 'SQLite', 'axum'],
    },
    honesty:
      'No soy experto en Rust. Lo que puedo mostrar hoy es ownership y borrowing en un programa real y pequeño, un núcleo con pruebas y una frontera limpia con JavaScript.',
  },
};

export const rustContent: Record<Locale, Copy> = { en, es };
