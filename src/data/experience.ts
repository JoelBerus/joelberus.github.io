import type { Localized } from './profile';

export interface Role {
  title: Localized;
  company: string;
  /** Extra note after the company name, e.g. a former name. */
  companyNote?: Localized;
  /** ISO year-month, e.g. "2023-07". */
  start: string;
  /** ISO year-month. Omit for a current role. */
  end?: string;
  location: Localized;
  points: Localized[];
}

export interface Education {
  degree: Localized;
  school: string;
  /** ISO year. */
  start: string;
  /** ISO year. Omit while in progress. */
  end?: string;
}

/** Roles, newest first. */
export const roles: Role[] = [
  {
    title: { en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
    company: 'SoFi',
    companyNote: { en: 'formerly Technisys', es: 'antes Technisys' },
    start: '2023-07',
    end: '2026-09',
    location: { en: 'Ecuador (Remote)', es: 'Ecuador (remoto)' },
    points: [
      {
        en: 'Designed and integrated 10+ REST APIs in enterprise banking applications that met financial security standards, with 0 incidents in internal QA audits.',
        es: 'Diseñé e integré más de 10 API REST en aplicaciones bancarias empresariales que cumplían estándares de seguridad financiera, con 0 incidencias en las auditorías internas de QA.',
      },
      {
        en: 'Worked on backend services in Java and Node.js within a cross-functional team, contributing architecture improvements and shortening bug resolution time in code reviews.',
        es: 'Trabajé en servicios de backend en Java y Node.js dentro de un equipo multifuncional; aporté mejoras de arquitectura y acorté el tiempo de resolución de bugs en las revisiones de código.',
      },
      {
        en: 'Used the OpenAI and Claude APIs, GitHub Copilot and Cursor in daily development; Copilot cut time spent on boilerplate by about 20%.',
        es: 'Usé las API de OpenAI y Claude, GitHub Copilot y Cursor en el desarrollo diario; Copilot redujo cerca de un 20 % el tiempo dedicado a código repetitivo.',
      },
      {
        en: 'Made the main flows in banking apps built with React.js and React Native faster: lazy loading and component-level optimization cut load times on critical views.',
        es: 'Aceleré los flujos principales de apps bancarias hechas con React.js y React Native: la carga diferida y la optimización a nivel de componente redujeron los tiempos de carga en las vistas críticas.',
      },
    ],
  },
  {
    title: { en: 'Full Stack Developer', es: 'Desarrollador Full Stack' },
    company: 'Hyper Nova Labs',
    start: '2022-04',
    end: '2023-06',
    location: { en: 'Ecuador (Remote)', es: 'Ecuador (remoto)' },
    points: [
      {
        en: 'Integrated third-party REST APIs and GraphQL queries for payments, product catalogs and user management; critical endpoints kept 99% uptime.',
        es: 'Integré API REST de terceros y consultas GraphQL para pagos, catálogos de productos y gestión de usuarios; los endpoints críticos mantuvieron un 99 % de disponibilidad.',
      },
      {
        en: 'Built a reusable TypeScript component library for enterprise e-commerce platforms, cutting development time for new features by 30%.',
        es: 'Construí una librería de componentes reutilizables en TypeScript para plataformas de e-commerce empresariales, que redujo un 30 % el tiempo de desarrollo de nuevas funcionalidades.',
      },
      {
        en: 'Improved frontend accessibility (WCAG 2.1) and performance, reaching Lighthouse scores above 90 in Performance and Accessibility.',
        es: 'Mejoré la accesibilidad (WCAG 2.1) y el rendimiento del frontend, con puntuaciones de Lighthouse superiores a 90 en Performance y Accessibility.',
      },
      {
        en: 'Took part in sprint planning, estimation and client demos under Agile/Scrum; shipped 3 releases on time over 6 months.',
        es: 'Participé en la planificación de sprints, las estimaciones y las demos con clientes bajo Agile/Scrum; entregamos 3 releases a tiempo en 6 meses.',
      },
    ],
  },
  {
    title: { en: 'Front-End Developer', es: 'Desarrollador Front-End' },
    company: 'La Interfaz',
    start: '2021-07',
    end: '2022-05',
    location: { en: 'Ecuador', es: 'Ecuador' },
    points: [
      {
        en: 'Built and maintained 10+ corporate and e-commerce sites with WordPress/WooCommerce, React.js and Vue.js, turning Figma designs into pixel-accurate pages in about 2 weeks on average.',
        es: 'Desarrollé y mantuve más de 10 sitios corporativos y de e-commerce con WordPress/WooCommerce, React.js y Vue.js, convirtiendo diseños de Figma en páginas fieles al píxel en unas 2 semanas en promedio.',
      },
      {
        en: 'Cut average load time from 3.8s to 2.1s by optimizing assets, adding lazy loading and removing render-blocking resources.',
        es: 'Reduje el tiempo de carga promedio de 3,8 s a 2,1 s optimizando recursos, añadiendo carga diferida y eliminando recursos que bloqueaban el renderizado.',
      },
      {
        en: 'Implemented WCAG 2.1 AA standards, with screen reader support and full keyboard navigation.',
        es: 'Implementé los estándares WCAG 2.1 AA, con soporte para lectores de pantalla y navegación completa por teclado.',
      },
    ],
  },
];

export const education: Education = {
  degree: {
    en: 'B.S. in Software Engineering (in progress)',
    es: 'Ingeniería en Software (en curso)',
  },
  school: 'Universidad de Guayaquil',
  start: '2022',
};
