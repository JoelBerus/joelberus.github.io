/** Site-wide constants shared by the layout and the page sections. */
export const site = {
  name: 'Joel Bermudez Acosta',
  shortName: 'JB',
  github: 'https://github.com/JoelBerus',
  linkedin: 'https://www.linkedin.com/in/joel-bermudez-acosta/',
  themeColor: '#0b0e11',
} as const;

/**
 * Ids of the home page sections, in render order. This list is the single
 * source of truth for the order: `Home.astro` renders the sections in it and
 * the numbered labels ("01 / EXPERIENCE") are derived from it.
 */
export const sectionIds = [
  'hero',
  'experience',
  'work',
  'skills',
  'projects',
  'rust',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Two-digit label number of a section: its position after the hero. */
export function sectionNumber(id: SectionId): string {
  return String(sectionIds.indexOf(id)).padStart(2, '0');
}

/**
 * Sections exposed in the header anchor nav, in page order. `rust` is left
 * out on purpose: it stays reachable at `#rust`, but it is not a headline.
 */
export const navSections = [
  'experience',
  'work',
  'skills',
  'projects',
  'contact',
] as const satisfies readonly SectionId[];

/** Downloadable CV, one PDF per locale, written by `scripts/build-cv.mjs`. */
export const cvPath = {
  en: 'cv/joel-bermudez-acosta-cv-en.pdf',
  es: 'cv/joel-bermudez-acosta-cv-es.pdf',
} as const;
