import lockupOnWine from '../../assets/work/drupela/drupela-lockup-sobre-vino.svg';
import shotHours from '../../assets/work/drupela/turnos-horas.png';
import shotOwnerToday from '../../assets/work/drupela/turnos-hoy-movil.png';
import shotMyWeek from '../../assets/work/drupela/turnos-mi-semana.png';
import shotClock from '../../assets/work/drupela/turnos-reloj.png';
import shotWeek from '../../assets/work/drupela/turnos-semana.png';
import type { WorkCase } from './types';

/**
 * Drupela case study. Brand colors come from the product's brand guide:
 * wine #50182D, chili #D4322B (#E03E36 on dark), cream #FFFDF9, rose tint #F6E9ED.
 * Chili is only used for solid marks, never for text.
 */
export const drupela: WorkCase = {
  slug: 'drupela',
  name: 'Drupela',
  theme: {
    heroBg: '#50182D',
    heroText: '#FFFDF9',
    heroMuted: '#EBDCE0',
    heroLine: 'rgb(255 253 249 / 0.22)',
    heroButtonBg: '#FFFDF9',
    heroButtonBgHover: '#F6E9ED',
    heroButtonText: '#50182D',
    accent: '#F6E9ED',
    accentHover: '#FFFDF9',
    accentInk: '#50182D',
    mark: '#E03E36',
    cardBg: '#50182D',
    cardText: '#FFFDF9',
    bandBg: '#50182D',
    bandText: '#FFFDF9',
    bandMuted: '#EBDCE0',
    displayFont: "'Quicksand', var(--font-sans)",
    displayWeight: 700,
  },
  logo: { image: lockupOnWine, width: 704, height: 230 },

  cardEyebrow: {
    en: 'SaaS · Founder and sole engineer',
    es: 'SaaS · Fundador y único ingeniero',
  },
  cardSummary: {
    en: "A modular system for restaurants and cafés in Ecuador that joins the venue's own operations with a diner app where only people who actually paid can rate each dish.",
    es: 'Un sistema modular para restaurantes y cafeterías de Ecuador que une la operación del local con una app para comensales donde solo quien pagó puede evaluar cada plato.',
  },
  cardTags: ['TypeScript', 'Fastify', 'PostgreSQL', 'React', 'PWA'],

  metaDescription: {
    en: 'Case study: Drupela, a modular SaaS for restaurants and cafés in Ecuador. TypeScript monorepo, Fastify, PostgreSQL with row-level security and 2,000+ automated tests.',
    es: 'Caso: Drupela, un SaaS modular para restaurantes y cafeterías de Ecuador. Monorepo en TypeScript, Fastify, PostgreSQL con seguridad a nivel de fila y más de 2.000 pruebas automatizadas.',
  },
  pitch: {
    en: 'A modular SaaS that joins how a restaurant runs with the diners who come back.',
    es: 'Un SaaS modular que une la operación de un restaurante con los comensales que vuelven.',
  },
  meta: [
    {
      label: { en: 'Role', es: 'Rol' },
      value: {
        en: 'Founder and sole engineer: product, architecture, code and brand.',
        es: 'Fundador y único ingeniero: producto, arquitectura, código y marca.',
      },
    },
    {
      label: { en: 'Status', es: 'Estado' },
      value: {
        en: 'Landing live. The product is in pilot validation, not yet in production.',
        es: 'Landing publicada. El producto está en validación piloto y aún no está en producción.',
      },
    },
    {
      label: { en: 'For', es: 'Para' },
      value: {
        en: 'Restaurants, cafés and small food businesses in Ecuador.',
        es: 'Restaurantes, cafeterías y pequeños negocios de comida en Ecuador.',
      },
    },
  ],
  links: [
    {
      label: { en: 'Visit drupela.com', es: 'Visitar drupela.com' },
      href: 'https://drupela.com',
      external: true,
    },
  ],
  heroShots: [
    {
      image: shotWeek,
      kind: 'wide',
      alt: {
        en: 'Drupela Turnos owner panel showing the weekly shift schedule.',
        es: 'Panel de Drupela Turnos con el horario semanal de turnos.',
      },
    },
    {
      image: shotMyWeek,
      kind: 'phone',
      alt: {
        en: "The Mi turno app on a phone showing an employee's shift for today.",
        es: 'La app Mi turno en un teléfono con el turno de hoy de una persona del equipo.',
      },
    },
  ],

  overview: {
    title: {
      en: "The venue's own system, joined to its diners",
      es: 'El sistema del local, unido a sus comensales',
    },
    paragraphs: {
      en: [
        'Drupela is a modular SaaS for restaurants, cafés and small food businesses in Ecuador. It is one base product, sold with more or fewer modules depending on what each business needs.',
        "On one side is the venue's own system: till, kitchen, costs, suppliers, finance and electronic invoicing for SRI, Ecuador's tax authority. On the other is a diner app where only someone who actually paid can rate each dish, collect stamps and redeem coupons.",
        'The first module is Turnos, staff shift scheduling with a time clock. The landing is live at drupela.com; the product itself is in pilot validation and is not in production yet.',
      ],
      es: [
        'Drupela es un SaaS modular para restaurantes, cafeterías y pequeños negocios de comida en Ecuador. Es un solo producto base, que se vende con más o menos módulos según lo que necesita cada negocio.',
        'De un lado está el sistema propio del local: caja, cocina, costos, proveedores, finanzas y facturación electrónica para el SRI, la autoridad tributaria de Ecuador. Del otro, una app para comensales donde solo quien de verdad pagó puede evaluar cada plato, juntar sellos y canjear cupones.',
        'El primer módulo es Turnos: horarios del personal con reloj de asistencia. La landing está publicada en drupela.com; el producto está en validación piloto y todavía no está en producción.',
      ],
    },
    points: [
      {
        title: { en: 'For the venue', es: 'Para el local' },
        body: {
          en: 'Till, kitchen, costs, suppliers, finance and electronic invoicing for SRI in one system.',
          es: 'Caja, cocina, costos, proveedores, finanzas y facturación electrónica para el SRI en un solo sistema.',
        },
      },
      {
        title: { en: 'For the diner', es: 'Para el comensal' },
        body: {
          en: 'Ratings per dish from people who actually paid, plus stamps and coupons.',
          es: 'Evaluaciones por plato de quienes de verdad pagaron, además de sellos y cupones.',
        },
      },
      {
        title: { en: 'Modular', es: 'Modular' },
        body: {
          en: 'One base product. Each business takes the modules it needs.',
          es: 'Un solo producto base. Cada negocio toma los módulos que necesita.',
        },
      },
      {
        title: { en: 'First module: Turnos', es: 'Primer módulo: Turnos' },
        body: {
          en: 'Staff shift scheduling with a time clock.',
          es: 'Horarios del personal con reloj de asistencia.',
        },
      },
    ],
  },

  engineering: {
    title: {
      en: 'One contract, one write path',
      es: 'Un contrato, un solo camino de escritura',
    },
    lead: {
      en: 'A TypeScript monorepo where the guarantees live in the API contract, the database and the tests: every change takes the same pipeline, and tenants are isolated with row-level security.',
      es: 'Un monorepo en TypeScript donde las garantías viven en el contrato de la API, en la base de datos y en las pruebas: todo cambio pasa por el mismo pipeline y los tenants se aíslan con seguridad a nivel de fila.',
    },
    layers: [
      {
        label: { en: 'Clients', es: 'Clientes' },
        nodes: [
          {
            title: { en: 'Owner panel', es: 'Panel del dueño' },
            detail: { en: 'Vite + React', es: 'Vite + React' },
          },
          {
            title: 'Mi turno',
            detail: {
              en: 'PWA with an offline-capable time clock',
              es: 'PWA con reloj de asistencia que funciona sin conexión',
            },
          },
          {
            title: 'Landing',
            detail: {
              en: 'ES/EN routing, passes axe WCAG 2.1 AA',
              es: 'Rutas ES/EN, pasa axe WCAG 2.1 AA',
            },
          },
        ],
      },
      {
        label: { en: 'API', es: 'API' },
        nodes: [
          {
            title: 'Fastify',
            detail: { en: 'OpenAPI contract', es: 'Contrato OpenAPI' },
          },
          {
            title: { en: 'Mutation pipeline', es: 'Pipeline de mutaciones' },
            detail: {
              en: 'One path, three permission levels: write, financial, sensitive',
              es: 'Un solo camino y tres niveles de permiso: escritura, financiero y sensible',
            },
          },
          {
            title: { en: 'Login', es: 'Inicio de sesión' },
            detail: { en: 'TOTP and passkeys', es: 'TOTP y passkeys' },
          },
        ],
      },
      {
        label: { en: 'Data', es: 'Datos' },
        highlight: true,
        nodes: [
          {
            title: 'PostgreSQL 16',
            detail: {
              en: 'Migrations and row-level security for multi-tenancy',
              es: 'Migraciones y seguridad a nivel de fila para el multi-tenant',
            },
          },
          {
            title: { en: 'Transactional outbox', es: 'Outbox transaccional' },
            detail: {
              en: 'Outgoing messages queued with the change that causes them',
              es: 'Los mensajes salientes se encolan junto con el cambio que los origina',
            },
          },
        ],
      },
      {
        label: { en: 'Worker', es: 'Worker' },
        nodes: [
          {
            title: 'pg-boss',
            detail: {
              en: 'Delivers email, WhatsApp, SMS and push',
              es: 'Entrega correo, WhatsApp, SMS y push',
            },
          },
        ],
      },
    ],
    metrics: [
      {
        value: { en: '2,000+', es: '2.000+' },
        caption: { en: 'automated tests', es: 'pruebas automatizadas' },
      },
      {
        value: '3',
        caption: {
          en: 'permission levels in the mutation pipeline',
          es: 'niveles de permiso en el pipeline de mutaciones',
        },
      },
      {
        value: '4',
        caption: {
          en: 'notification channels: email, WhatsApp, SMS and push',
          es: 'canales de notificación: correo, WhatsApp, SMS y push',
        },
      },
      {
        value: 'AA',
        caption: {
          en: 'WCAG 2.1 on the landing, checked with axe',
          es: 'WCAG 2.1 en la landing, verificado con axe',
        },
      },
    ],
    facts: [
      {
        title: { en: 'Monorepo', es: 'Monorepo' },
        body: {
          en: 'A pnpm and Turborepo monorepo, written in TypeScript on Node.',
          es: 'Un monorepo con pnpm y Turborepo, escrito en TypeScript sobre Node.',
        },
      },
      {
        title: { en: 'Multi-tenancy in the database', es: 'Multi-tenant en la base de datos' },
        body: {
          en: 'PostgreSQL 16 with migrations and row-level security, tested against real Postgres.',
          es: 'PostgreSQL 16 con migraciones y seguridad a nivel de fila, probado contra un Postgres real.',
        },
      },
      {
        title: { en: 'A single mutation pipeline', es: 'Un único pipeline de mutaciones' },
        body: {
          en: 'Every change takes the same path, with permission levels for write, financial and sensitive operations.',
          es: 'Todo cambio pasa por el mismo camino, con niveles de permiso para operaciones de escritura, financieras y sensibles.',
        },
      },
      {
        title: { en: 'Outbox and worker', es: 'Outbox y worker' },
        body: {
          en: 'A transactional outbox and a pg-boss worker handle email, WhatsApp, SMS and push.',
          es: 'Un outbox transaccional y un worker con pg-boss se encargan del correo, WhatsApp, SMS y push.',
        },
      },
      {
        title: { en: 'Security', es: 'Seguridad' },
        body: {
          en: 'TOTP and passkey login, container images signed with cosign, a Content Security Policy and Cloudflare Turnstile.',
          es: 'Inicio de sesión con TOTP y passkeys, imágenes de contenedor firmadas con cosign, Content Security Policy y Cloudflare Turnstile.',
        },
      },
      {
        title: { en: 'Tests and CI', es: 'Pruebas y CI' },
        body: {
          en: 'More than 2,000 automated tests, with CI on GitHub Actions.',
          es: 'Más de 2.000 pruebas automatizadas, con CI en GitHub Actions.',
        },
      },
    ],
  },

  gallery: {
    title: { en: 'Turnos, the first module', es: 'Turnos, el primer módulo' },
    lead: {
      en: "Real screens of the product running with synthetic data in a test environment. The banner at the top is that environment's own notice, and the interface is in Spanish.",
      es: 'Pantallas reales del producto con datos sintéticos en un entorno de prueba. El aviso superior es el del propio entorno.',
    },
    shots: [
      {
        image: shotWeek,
        kind: 'wide',
        alt: {
          en: 'Owner panel, Week view: a published schedule with eight people grouped by bar, kitchen and floor, each day marked as an opening shift, a closing shift or a day off.',
          es: 'Panel del dueño, vista Semana: un horario publicado con ocho personas agrupadas en barra, cocina y salón; cada día indica turno de apertura, de cierre o libre.',
        },
        caption: {
          en: 'Owner panel: the published week, grouped by area.',
          es: 'Panel del dueño: la semana publicada, agrupada por área.',
        },
      },
      {
        image: shotHours,
        kind: 'wide',
        alt: {
          en: 'Owner panel, Hours view: a closed pay period listing planned and worked hours, late arrivals and absences per person, with buttons to download Excel and CSV.',
          es: 'Panel del dueño, vista Horas: una quincena cerrada con horas previstas y trabajadas, atrasos y faltas por persona, y botones para descargar Excel y CSV.',
        },
        caption: {
          en: 'Hours per person for a closed pay period, ready to export.',
          es: 'Horas por persona de una quincena cerrada, listas para exportar.',
        },
      },
      {
        image: shotMyWeek,
        kind: 'phone',
        alt: {
          en: "Mi turno on a phone: today's shift with a clock-out button and the rest of the week below.",
          es: 'Mi turno en un teléfono: el turno de hoy con el botón para marcar la salida y, debajo, el resto de la semana.',
        },
        caption: {
          en: "Mi turno: an employee's shift today and their week.",
          es: 'Mi turno: el turno de hoy y la semana de una persona del equipo.',
        },
      },
      {
        image: shotClock,
        kind: 'phone',
        alt: {
          en: 'Staff time clock on a phone: the current time, the box for the QR code (shown here as a placeholder icon instead of a real code) and a button to clock in with a PIN.',
          es: 'Reloj del personal en un teléfono: la hora, el recuadro del código QR (aquí con un icono en lugar de un código real) y un botón para marcar con PIN.',
        },
        caption: {
          en: 'Time clock: a rotating QR code, or a PIN. The code is replaced by a placeholder in this capture.',
          es: 'Reloj de asistencia: un QR que rota, o un PIN. En esta captura el código está reemplazado por un marcador.',
        },
      },
      {
        image: shotOwnerToday,
        kind: 'phone',
        alt: {
          en: "Owner's Today view on a phone: how many people are at the venue, late arrivals and who works today.",
          es: 'Vista Hoy del dueño en un teléfono: cuántas personas están en el local, atrasos y quién trabaja hoy.',
        },
        caption: {
          en: "The owner's day at a glance.",
          es: 'El día del dueño de un vistazo.',
        },
      },
    ],
  },

  stack: [
    {
      label: { en: 'Language and tooling', es: 'Lenguaje y herramientas' },
      items: ['TypeScript', 'Node.js', 'pnpm', 'Turborepo', 'GitHub Actions'],
    },
    {
      label: { en: 'Backend', es: 'Backend' },
      items: ['Fastify', 'OpenAPI', 'PostgreSQL 16', 'Row-level security', 'pg-boss'],
    },
    {
      label: { en: 'Frontend', es: 'Frontend' },
      items: ['React', 'Vite', 'PWA', 'axe'],
    },
    {
      label: { en: 'Security', es: 'Seguridad' },
      items: ['TOTP', 'Passkeys', 'cosign', 'CSP', 'Cloudflare Turnstile'],
    },
  ],
};
