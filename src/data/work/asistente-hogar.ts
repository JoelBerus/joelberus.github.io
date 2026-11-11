import shotChat from '../../assets/work/asistente-hogar/chat-phone.webp';
import shotDevice from '../../assets/work/asistente-hogar/device-phone.webp';
import shotFloorPlan from '../../assets/work/asistente-hogar/floor-plan-desktop.webp';
import shotHomeDesktop from '../../assets/work/asistente-hogar/home-desktop.webp';
import shotHomePhone from '../../assets/work/asistente-hogar/home-phone.webp';
import icon from '../../assets/work/asistente-hogar/icon.svg';
import { AI_TAG, type WorkCase } from './types';

/**
 * Public name of the project. Change it here and every card, page title,
 * link and sentence that names the project follows.
 */
export const ASSISTANT_NAME = 'Asistente Hogar';

/** Short descriptor that goes after the name, e.g. "<name>: <descriptor>". */
export const ASSISTANT_DESCRIPTOR = {
  en: 'a private home assistant for the family, written in Rust',
  es: 'un asistente privado para la casa y la familia, escrito en Rust',
} as const;

/**
 * Case study of the home assistant. Its own identity, apart from the site's
 * oxide accent and from Drupela's wine: deep teal with a warm sand accent.
 * Every screenshot comes from a local build seeded with an invented household
 * and simulated devices; nothing from a real home is shown or described.
 */
export const asistenteHogar: WorkCase = {
  slug: 'asistente-hogar',
  name: ASSISTANT_NAME,
  listedIn: 'work',
  theme: {
    heroBg: '#0f2f2e',
    heroText: '#f6f1e7',
    heroMuted: '#bcd0c9',
    heroLine: 'rgb(246 241 231 / 0.2)',
    heroButtonBg: '#f1e2c4',
    heroButtonBgHover: '#f8eedb',
    heroButtonText: '#0f2f2e',
    accent: '#8fd6c2',
    accentHover: '#b4e6d8',
    accentInk: '#0b2423',
    mark: '#e3b56f',
    cardBg: '#12403d',
    cardText: '#f6f1e7',
    bandBg: '#12403d',
    bandText: '#f6f1e7',
    bandMuted: '#c3d6cf',
    displayFont: 'var(--font-sans)',
    displayWeight: 600,
  },
  logo: { image: icon, width: 48, height: 48, text: ASSISTANT_NAME },

  cardEyebrow: {
    en: 'Personal project · In progress',
    es: 'Proyecto personal · En desarrollo',
  },
  cardSummary: {
    en: 'A private assistant for a family home: per-person permissions, an AI chat that can only do what the signed-in person may do, tasks, routines and an encrypted private memory. It is the project I am learning Rust with.',
    es: 'Un asistente privado para la casa de una familia: permisos por persona, un chat con IA que solo puede hacer lo que la persona en sesión tiene permitido, tareas, rutinas y una memoria privada cifrada. Es el proyecto con el que estoy aprendiendo Rust.',
  },
  cardTags: [AI_TAG, 'Rust', 'SQLite', 'axum', 'PWA'],

  metaDescription: {
    en: `Case study: ${ASSISTANT_NAME}, ${ASSISTANT_DESCRIPTOR.en}. A SQLite core with per-person permissions and an audit log, an axum HTTP API, an installable web UI and an AI chat with tool calling.`,
    es: `Caso: ${ASSISTANT_NAME}, ${ASSISTANT_DESCRIPTOR.es}. Un núcleo sobre SQLite con permisos por persona y registro de auditoría, una API HTTP con axum, una interfaz web instalable y un chat con IA que usa herramientas.`,
  },
  pitch: {
    en: 'A private home assistant where even the AI needs permission.',
    es: 'Un asistente privado para la casa donde hasta la IA necesita permiso.',
  },
  meta: [
    {
      label: { en: 'Role', es: 'Rol' },
      value: {
        en: 'Designed and built by me. It is my project for learning Rust seriously; I am not a Rust expert.',
        es: 'Diseñado y construido por mí. Es mi proyecto para aprender Rust en serio; no soy experto en Rust.',
      },
    },
    {
      label: { en: 'Status', es: 'Estado' },
      value: {
        en: 'In progress. It runs locally with simulated devices and is not deployed yet.',
        es: 'En desarrollo. Funciona en local con equipos simulados y todavía no está desplegado.',
      },
    },
    {
      label: { en: 'Source', es: 'Código' },
      value: {
        en: 'Private repository, no public link.',
        es: 'Repositorio privado, sin enlace público.',
      },
    },
  ],
  links: [],
  heroShots: [
    {
      image: shotHomeDesktop,
      kind: 'wide',
      alt: {
        en: `${ASSISTANT_NAME} home screen on a desktop, with rooms and device cards from an invented household.`,
        es: `Pantalla de inicio de ${ASSISTANT_NAME} en escritorio, con habitaciones y tarjetas de equipos de una casa inventada.`,
      },
    },
    {
      image: shotHomePhone,
      kind: 'phone',
      alt: {
        en: `${ASSISTANT_NAME} home screen on a phone.`,
        es: `Pantalla de inicio de ${ASSISTANT_NAME} en un teléfono.`,
      },
    },
  ],

  overview: {
    title: {
      en: 'One household, different permissions for each person',
      es: 'Una casa, permisos distintos para cada persona',
    },
    paragraphs: {
      en: [
        `${ASSISTANT_NAME} is ${ASSISTANT_DESCRIPTOR.en}. Each person signs in with their own account and sees only the rooms and devices they are allowed to see; for each device a person can have no access, view it, or control it.`,
        'From the web UI a person can turn devices on and off, set a temperature, brightness or colour, keep personal and shared tasks, define routines, and talk to an AI chat that acts with their permissions and nothing more.',
        'I chose Rust for it on purpose, to learn the language on something larger than a single crate. It is a work in progress: the core, the API, the chat, tasks, routines and memory run locally and are covered by tests, while accounts and sessions and the new interface are still being reworked, and it has not been deployed.',
      ],
      es: [
        `${ASSISTANT_NAME} es ${ASSISTANT_DESCRIPTOR.es}. Cada persona entra con su propia cuenta y ve solo las habitaciones y los equipos que tiene permitido ver; sobre cada equipo una persona puede no tener acceso, verlo o manejarlo.`,
        'Desde la interfaz web una persona puede encender y apagar equipos, fijar una temperatura, un brillo o un color, llevar tareas personales y compartidas, definir rutinas y conversar con un chat de IA que actúa con sus permisos y nada más.',
        'Elegí Rust a propósito, para aprender el lenguaje con algo más grande que un solo crate. Es un trabajo en curso: el núcleo, la API, el chat, las tareas, las rutinas y la memoria funcionan en local y tienen pruebas, mientras que las cuentas y sesiones y la interfaz nueva se siguen rehaciendo, y aún no está desplegado.',
      ],
    },
    points: [
      {
        title: { en: 'Permissions per person', es: 'Permisos por persona' },
        body: {
          en: 'Three levels per device: hidden, view or control. The server checks them, never the client.',
          es: 'Tres niveles por equipo: oculto, ver o manejar. Los comprueba el servidor, nunca el cliente.',
        },
      },
      {
        title: { en: 'AI chat with tools', es: 'Chat con IA y herramientas' },
        body: {
          en: 'The model proposes actions through tool calls; each one runs as the signed-in person.',
          es: 'El modelo propone acciones mediante llamadas a herramientas; cada una se ejecuta como la persona en sesión.',
        },
      },
      {
        title: { en: 'Tasks and routines', es: 'Tareas y rutinas' },
        body: {
          en: 'Personal and shared tasks with repetition, and routines made of steps with an optional schedule.',
          es: 'Tareas personales y compartidas con repetición, y rutinas hechas de pasos con horario opcional.',
        },
      },
      {
        title: { en: 'Private memory', es: 'Memoria privada' },
        body: {
          en: 'Notes the assistant keeps for one person, encrypted at rest and readable only through that person.',
          es: 'Notas que el asistente guarda para una persona, cifradas en reposo y legibles solo a través de esa persona.',
        },
      },
    ],
  },

  engineering: {
    title: {
      en: 'One function decides what is allowed',
      es: 'Una sola función decide qué está permitido',
    },
    lead: {
      en: 'A single Rust crate. The floor plan, the chat, routines and the HTTP API all reach devices through one core function that checks permissions and writes the audit log before a connector is called.',
      es: 'Un solo crate de Rust. El plano, el chat, las rutinas y la API HTTP llegan a los equipos por una única función del núcleo, que comprueba permisos y escribe la auditoría antes de llamar a un conector.',
    },
    layers: [
      {
        label: { en: 'Clients', es: 'Clientes' },
        nodes: [
          {
            title: { en: 'Web UI', es: 'Interfaz web' },
            detail: {
              en: 'Plain HTML, CSS and JavaScript with a web manifest and a service worker, so it can be installed on a phone',
              es: 'HTML, CSS y JavaScript sin framework, con manifiesto web y service worker para instalarla en el teléfono',
            },
          },
          {
            title: { en: 'AI chat', es: 'Chat con IA' },
            detail: {
              en: 'The conversation lives in the browser; the server does not store it',
              es: 'La conversación vive en el navegador; el servidor no la guarda',
            },
          },
        ],
      },
      {
        label: { en: 'HTTP API', es: 'API HTTP' },
        nodes: [
          {
            title: 'axum + tokio',
            detail: {
              en: 'Translates HTTP only; no permission logic lives here',
              es: 'Solo traduce HTTP; aquí no hay lógica de permisos',
            },
          },
          {
            title: { en: 'Accounts', es: 'Cuentas' },
            detail: {
              en: 'Argon2id password hashes, cookie sessions stored as SHA-256 digests, a sign-in attempt limit',
              es: 'Claves con Argon2id, sesiones por cookie guardadas como resumen SHA-256 y límite de intentos de entrada',
            },
          },
          {
            title: { en: 'Idempotent orders', es: 'Órdenes idempotentes' },
            detail: {
              en: 'A repeated request with the same key returns the stored result instead of acting twice',
              es: 'Una petición repetida con la misma clave devuelve el resultado guardado en vez de actuar dos veces',
            },
          },
        ],
      },
      {
        label: { en: 'Core', es: 'Núcleo' },
        highlight: true,
        nodes: [
          {
            title: { en: 'Permission check', es: 'Comprobación de permisos' },
            detail: {
              en: 'Every action from any origin goes through one function',
              es: 'Toda acción, venga de donde venga, pasa por una función',
            },
          },
          {
            title: 'SQLite',
            detail: {
              en: 'rusqlite, bundled; schema migrations tracked with PRAGMA user_version',
              es: 'rusqlite, incluido en el binario; migraciones de esquema con PRAGMA user_version',
            },
          },
          {
            title: { en: 'Audit log', es: 'Auditoría' },
            detail: {
              en: 'Who or what asked, which device, which action and the result',
              es: 'Quién o qué lo pidió, qué equipo, qué acción y el resultado',
            },
          },
          {
            title: { en: 'Encrypted memory', es: 'Memoria cifrada' },
            detail: {
              en: 'XChaCha20-Poly1305, bound to the person; the key is kept outside the database',
              es: 'XChaCha20-Poly1305, ligada a la persona; la clave se guarda fuera de la base',
            },
          },
        ],
      },
      {
        label: { en: 'Connectors', es: 'Conectores' },
        nodes: [
          {
            title: { en: 'Connector trait', es: 'Trait Conector' },
            detail: {
              en: 'Each device family implements it and declares what it can do',
              es: 'Cada familia de equipos lo implementa y declara qué sabe hacer',
            },
          },
          {
            title: { en: 'Simulator', es: 'Simulador' },
            detail: {
              en: 'In-memory devices for development and tests; the UI labels them as simulated',
              es: 'Equipos en memoria para desarrollar y probar; la interfaz los marca como simulados',
            },
          },
          {
            title: { en: 'Local protocols', es: 'Protocolos locales' },
            detail: {
              en: 'First connectors that speak to devices over the local network, written by hand',
              es: 'Primeros conectores que hablan con los equipos por la red local, escritos a mano',
            },
          },
        ],
      },
    ],
    metrics: [
      {
        value: '120+',
        caption: {
          en: 'Rust tests on the integration branch, run offline',
          es: 'pruebas de Rust en la rama de integración, sin red',
        },
      },
      {
        value: '3',
        caption: {
          en: 'permission levels per person and device',
          es: 'niveles de permiso por persona y equipo',
        },
      },
      {
        value: '10',
        caption: {
          en: 'tools the AI model can call',
          es: 'herramientas que el modelo de IA puede llamar',
        },
      },
      {
        value: '0',
        caption: {
          en: 'conversations stored on the server',
          es: 'conversaciones guardadas en el servidor',
        },
      },
    ],
    facts: [
      {
        title: { en: 'Permissions on the server', es: 'Permisos en el servidor' },
        body: {
          en: 'The model only proposes. A tool call runs through the same core function as a tap in the UI, with the identity of the session, so no prompt can widen what a person may do.',
          es: 'El modelo solo propone. Una llamada a herramienta pasa por la misma función del núcleo que un toque en la interfaz, con la identidad de la sesión, así que ningún prompt amplía lo que una persona puede hacer.',
        },
      },
      {
        title: { en: 'What the AI part is', es: 'Qué es la parte de IA' },
        body: {
          en: 'A chat with tool calling against an OpenAI-compatible chat API, behind a small Rust trait so the provider can be swapped (OpenRouter by default). The key is read from the environment; without one the chat is off and everything else works.',
          es: 'Un chat con llamadas a herramientas contra una API de chat compatible con OpenAI, detrás de un trait pequeño de Rust para poder cambiar de proveedor (OpenRouter por defecto). La clave se lee del entorno; sin ella el chat queda apagado y lo demás funciona.',
        },
      },
      {
        title: { en: 'What leaves the house', es: 'Qué sale de la casa' },
        body: {
          en: 'The provider receives the instructions, the devices that person can see and the messages. It never receives the name of the person or devices hidden from them. Tool rounds per message are capped to stop loops.',
          es: 'El proveedor recibe las instrucciones, los equipos que esa persona puede ver y los mensajes. Nunca recibe el nombre de la persona ni equipos que tiene ocultos. Las rondas de herramientas por mensaje tienen un tope para cortar bucles.',
        },
      },
      {
        title: { en: 'Private memory, honest limit', es: 'Memoria privada, con su límite' },
        body: {
          en: 'Memory has one read path, the person it belongs to; there is no administrator route. A copy of the database alone reveals nothing. Whoever holds both the database and the key can still read it.',
          es: 'La memoria tiene una sola vía de lectura, la de su dueño; no hay ruta de administración. Una copia de la base sola no revela nada. Quien tenga a la vez la base y la clave sí puede leerla.',
        },
      },
      {
        title: { en: 'Manual changes pause routines', es: 'Un cambio manual pausa las rutinas' },
        body: {
          en: 'When someone changes a device by hand, routines stop touching that device until it is reactivated. Each routine step shows what would happen now: ready, paused or not permitted.',
          es: 'Cuando alguien cambia un equipo a mano, las rutinas dejan de tocarlo hasta que se reactiva. Cada paso de una rutina muestra qué pasaría ahora: listo, en pausa o sin permiso.',
        },
      },
      {
        title: { en: 'Done and not done', es: 'Hecho y por hacer' },
        body: {
          en: 'Done and tested locally: core, API, chat, tasks, routines, memory and the simulator. In progress: accounts and sessions, the new interface, and the connectors, some of which have only been tested against simulated devices. Not done: deployment.',
          es: 'Hecho y probado en local: núcleo, API, chat, tareas, rutinas, memoria y simulador. En curso: cuentas y sesiones, la interfaz nueva y los conectores, algunos probados solo contra equipos simulados. Sin hacer: el despliegue.',
        },
      },
    ],
  },

  gallery: {
    title: { en: 'The interface, with an invented household', es: 'La interfaz, con una casa inventada' },
    lead: {
      en: 'Real screens from a local build. The household, the people and the devices are invented demo data, every device is simulated, and the interface is in Spanish.',
      es: 'Pantallas reales de una compilación local. La casa, las personas y los equipos son datos de ejemplo inventados y todos los equipos son simulados.',
    },
    shots: [
      {
        image: shotHomeDesktop,
        kind: 'wide',
        alt: {
          en: 'Home screen on a desktop: a count of devices confirmed on, room cards with illustrations and a grid of device cards, each labelled as simulated.',
          es: 'Pantalla de inicio en escritorio: un contador de equipos encendidos confirmados, tarjetas de habitaciones con ilustraciones y una cuadrícula de tarjetas de equipos, cada una marcada como simulada.',
        },
        caption: {
          en: 'The new interface: rooms and the devices this person can see.',
          es: 'La interfaz nueva: habitaciones y los equipos que esta persona puede ver.',
        },
      },
      {
        image: shotFloorPlan,
        kind: 'wide',
        alt: {
          en: 'First interface: a floor plan drawn from four invented rooms with device icons, some lit, and a list of devices by room below.',
          es: 'Primera interfaz: un plano dibujado a partir de cuatro habitaciones inventadas con iconos de equipos, algunos encendidos, y debajo la lista de equipos por habitación.',
        },
        caption: {
          en: 'The first interface: an interactive floor plan drawn from the stored rooms.',
          es: 'La primera interfaz: un plano interactivo dibujado a partir de las habitaciones guardadas.',
        },
      },
      {
        image: shotHomePhone,
        kind: 'phone',
        alt: {
          en: 'Home screen on a phone: greeting, devices on, a row of room cards and a bottom navigation bar.',
          es: 'Pantalla de inicio en un teléfono: saludo, equipos encendidos, una fila de tarjetas de habitaciones y una barra de navegación inferior.',
        },
        caption: {
          en: 'Home on a phone.',
          es: 'Inicio en el teléfono.',
        },
      },
      {
        image: shotDevice,
        kind: 'phone',
        alt: {
          en: 'Device sheet for an air conditioner on a phone: on, target temperature 24 degrees, a note that routines are paused after a manual change, and a notice that the device is simulated.',
          es: 'Hoja de un aire acondicionado en un teléfono: encendido, temperatura deseada de 24 grados, una nota de que las rutinas están en pausa tras un cambio manual y un aviso de que el equipo es simulado.',
        },
        caption: {
          en: 'A device sheet. It says when the answer comes from the simulator.',
          es: 'La hoja de un equipo. Avisa cuando la respuesta viene del simulador.',
        },
      },
      {
        image: shotChat,
        kind: 'phone',
        alt: {
          en: 'Assistant chat screen on a phone, empty, with a text field and a note that the conversation is not stored on the server.',
          es: 'Pantalla del chat del asistente en un teléfono, vacía, con un campo de texto y una nota de que la conversación no se guarda en el servidor.',
        },
        caption: {
          en: 'The chat, before a conversation. This build ran without a model key, so no reply is shown.',
          es: 'El chat, antes de una conversación. Esta compilación corrió sin clave de modelo, así que no se muestra ninguna respuesta.',
        },
      },
    ],
  },

  stack: [
    {
      label: { en: 'Language and runtime', es: 'Lenguaje y runtime' },
      items: ['Rust (edition 2024)', 'tokio', 'serde'],
    },
    {
      label: { en: 'Server and data', es: 'Servidor y datos' },
      items: ['axum', 'SQLite', 'rusqlite'],
    },
    {
      label: { en: 'AI', es: 'IA' },
      items: [AI_TAG, 'Tool calling', 'OpenAI-compatible API', 'OpenRouter', 'reqwest'],
    },
    {
      label: { en: 'Security', es: 'Seguridad' },
      items: ['Argon2id', 'XChaCha20-Poly1305', 'SHA-256', 'Content Security Policy'],
    },
    {
      label: { en: 'Web UI', es: 'Interfaz web' },
      items: ['HTML', 'CSS', 'JavaScript', 'PWA', 'Playwright'],
    },
  ],

  note: {
    en: 'This page describes capabilities only. It does not include data from any real household: no people, rooms, devices or network details.',
    es: 'Esta página describe solo capacidades. No incluye datos de ninguna casa real: ni personas, ni habitaciones, ni equipos, ni detalles de red.',
  },
};
