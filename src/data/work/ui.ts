import type { Localized } from './types';

/** Shared labels of the work section and the case pages. */
export const workUi = {
  sectionLead: {
    en: 'Two products I designed and built end to end: a SaaS for small food businesses and a handheld emulator with native apps.',
    es: 'Dos productos que diseñé y construí de principio a fin: un SaaS para pequeños negocios de comida y un emulador de consolas portátiles con apps nativas.',
  },
  viewCase: { en: 'Read the case', es: 'Ver el caso' },
  back: { en: 'Selected work', es: 'Trabajo seleccionado' },
  overviewLabel: { en: 'Overview', es: 'Resumen' },
  engineeringLabel: { en: 'Engineering', es: 'Ingeniería' },
  galleryLabel: { en: 'Screens', es: 'Pantallas' },
  stackLabel: { en: 'Stack', es: 'Stack' },
  stackTitle: { en: 'Built with', es: 'Hecho con' },
  architectureLabel: { en: 'Architecture, top to bottom', es: 'Arquitectura, de arriba abajo' },
  metricsLabel: { en: 'Key numbers', es: 'Cifras clave' },
  next: { en: 'Next project', es: 'Siguiente proyecto' },
} as const satisfies Record<string, Localized<string>>;
