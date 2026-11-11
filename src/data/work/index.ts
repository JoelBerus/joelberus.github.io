import { asistenteHogar } from './asistente-hogar';
import { drupela } from './drupela';
import { pocketgame } from './pocketgame';
import type { WorkCase, WorkSlug } from './types';

export { workUi } from './ui';
export { AI_TAG, pick, tagLabel, tagVariant } from './types';
export type { Localized, WorkCase, WorkShot, WorkSlug, WorkTag, WorkTheme } from './types';

/** Every case study, in the order the "next project" links cycle through them. */
export const workCases: readonly WorkCase[] = [drupela, asistenteHogar, pocketgame];

/** Cases shown as large cards in the home "Selected work" section, in order. */
export const featuredWork: readonly WorkCase[] = workCases.filter((item) => item.listedIn === 'work');

export function getWorkCase(slug: WorkSlug): WorkCase {
  const found = workCases.find((item) => item.slug === slug);
  if (!found) throw new Error(`Unknown work case: ${slug}`);
  return found;
}

/** The case that follows the given one, wrapping around. */
export function getNextWorkCase(slug: WorkSlug): WorkCase {
  const index = workCases.findIndex((item) => item.slug === slug);
  return workCases[(index + 1) % workCases.length]!;
}

/** Locale-agnostic path of a case page, to be passed to `localizePath`. */
export function workPath(slug: WorkSlug): string {
  return `/work/${slug}/`;
}
