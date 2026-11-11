/** Site-wide constants shared by the layout and the page sections. */
export const site = {
  name: 'Joel Bermudez Acosta',
  shortName: 'JB',
  github: 'https://github.com/JoelBerus',
  linkedin: 'https://www.linkedin.com/in/joel-bermudez-acosta/',
  themeColor: '#0b0e11',
} as const;

/**
 * Ids of the home page sections, in render order.
 * The header nav links to a subset of these (see `navSections`).
 */
export const sectionIds = [
  'hero',
  'work',
  'rust',
  'experience',
  'skills',
  'projects',
  'contact',
] as const;

export type SectionId = (typeof sectionIds)[number];

/** Sections exposed in the header anchor nav, in order. */
export const navSections = [
  'work',
  'rust',
  'experience',
  'skills',
  'contact',
] as const satisfies readonly SectionId[];
