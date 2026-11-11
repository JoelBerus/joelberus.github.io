/**
 * Copy for the hero and for the Rust section, in both locales.
 * `es` is typed against `en`, so a missing or extra key fails type-checking.
 */
import type { Locale } from '../i18n';
import { ASSISTANT_DESCRIPTOR, ASSISTANT_NAME } from './work/asistente-hogar';

export const FIELD_SOURCE_URL = 'https://github.com/JoelBerus/joelberus.github.io/tree/main/crates/field';

const en = {
  hero: {
    tagline: 'Full Stack Developer — React, React Native, TypeScript, Node.js',
    support:
      '5+ years building web and mobile apps for banking and e-commerce, most recently at SoFi (formerly Technisys). I also design and ship my own products.',
    facts: ['Guayaquil, Ecuador · Remote', 'English B2 · Spanish native', 'Open to full-stack roles'],
    ctaExperience: 'See experience',
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
            'In a given build, the same seed and the same inputs give the same particles. The random generator (PCG32) and the value noise are written by hand, without the rand crate.',
        },
        {
          term: 'Tested',
          detail:
            'The core has no WebAssembly types, so cargo test runs it natively: determinism, respawning, bounds, resizing, pointer influence, and PCG32 against its reference output.',
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
      eyebrow: 'In progress · private repository',
      title: `${ASSISTANT_NAME}: ${ASSISTANT_DESCRIPTOR.en}`,
      body: 'My way of learning Rust beyond a single crate: data modelling, error handling and async HTTP.',
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
          detail: 'Tasks, routines, an AI chat and an encrypted private memory for each person.',
        },
      ],
      link: 'Read the case',
      tags: ['Rust', 'SQLite', 'axum'],
    },
    honesty:
      'I am not a Rust expert. What I can show today is ownership and borrowing in a small real program, a tested core, and a clean boundary with JavaScript.',
  },
};

type Copy = typeof en;

const es: Copy = {
  hero: {
    tagline: 'Desarrollador Full Stack — React, React Native, TypeScript, Node.js',
    support:
      'Más de 5 años creando aplicaciones web y móviles para banca y comercio electrónico, los últimos en SoFi (antes Technisys). También diseño y lanzo mis propios productos.',
    facts: ['Guayaquil, Ecuador · Remoto', 'Inglés B2 · Español nativo', 'Disponible para puestos full stack'],
    ctaExperience: 'Ver experiencia',
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
            'En una misma compilación, la misma semilla y las mismas entradas producen las mismas partículas. El generador aleatorio (PCG32) y el ruido están escritos a mano, sin el crate rand.',
        },
        {
          term: 'Con pruebas',
          detail:
            'El núcleo no usa tipos de WebAssembly, así que cargo test lo ejecuta de forma nativa: determinismo, reaparición, límites, redimensionado, influencia del puntero y PCG32 contra su salida de referencia.',
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
      eyebrow: 'En desarrollo · repositorio privado',
      title: `${ASSISTANT_NAME}: ${ASSISTANT_DESCRIPTOR.es}`,
      body: 'Mi forma de aprender Rust más allá de un solo crate: modelado de datos, manejo de errores y HTTP asíncrono.',
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
          detail: 'Tareas, rutinas, un chat con IA y una memoria privada cifrada para cada persona.',
        },
      ],
      link: 'Ver el caso',
      tags: ['Rust', 'SQLite', 'axum'],
    },
    honesty:
      'No soy experto en Rust. Lo que puedo mostrar hoy es ownership y borrowing en un programa real y pequeño, un núcleo con pruebas y una frontera limpia con JavaScript.',
  },
};

export const rustContent: Record<Locale, Copy> = { en, es };
