import type { Locale } from '../i18n';

/** A string available in every site locale. */
export type Localized = Record<Locale, string>;

export interface Highlight {
  value: string;
  unit?: string;
  caption: Localized;
  tone?: 'default' | 'accent' | 'data';
}

export interface SpokenLanguage {
  /** BCP 47 code, used in structured data. */
  code: string;
  name: Localized;
  level: Localized;
}

/** Personal facts shared by the contact section and the structured data. */
export const profile = {
  email: 'joelbermudezacosta@gmail.com',
  city: 'Guayaquil',
  countryCode: 'EC',
  location: {
    en: 'Guayaquil, Ecuador · Remote',
    es: 'Guayaquil, Ecuador · Remoto',
  } satisfies Localized,
  languages: [
    {
      code: 'es',
      name: { en: 'Spanish', es: 'Español' },
      level: { en: 'native', es: 'nativo' },
    },
    {
      code: 'en',
      name: { en: 'English', es: 'Inglés' },
      level: { en: 'B2, professional', es: 'B2, profesional' },
    },
  ] satisfies SpokenLanguage[],
  /** Topics for the schema.org `knowsAbout` property. */
  knowsAbout: ['React', 'React Native', 'TypeScript', 'Node.js', 'Java', 'PHP', 'REST APIs', 'GraphQL'],
} as const;

/** Numbers taken from the roles in `experience.ts`, shown above the timeline. */
export const highlights: Highlight[] = [
  {
    value: '5+',
    caption: {
      en: 'years of professional experience',
      es: 'años de experiencia profesional',
    },
    tone: 'accent',
  },
  {
    value: '10+',
    caption: {
      en: 'REST APIs designed and integrated in banking apps',
      es: 'API REST diseñadas e integradas en apps bancarias',
    },
  },
  {
    value: '30',
    unit: '%',
    caption: {
      en: 'less development time for new features with a shared component library',
      es: 'menos tiempo de desarrollo de funcionalidades con una librería de componentes',
    },
  },
  {
    value: '99',
    unit: '%',
    caption: {
      en: 'uptime on critical payment and catalog endpoints',
      es: 'de disponibilidad en endpoints críticos de pagos y catálogo',
    },
    tone: 'data',
  },
];
