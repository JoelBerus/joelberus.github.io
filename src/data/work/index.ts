import { drupela } from './drupela';
import { pocketgame } from './pocketgame';
import type { WorkCase, WorkSlug } from './types';

export { workUi } from './ui';
export { pick } from './types';
export type { Localized, WorkCase, WorkShot, WorkSlug, WorkTheme } from './types';

/** Case studies in the order they appear on the home page. */
export const workCases: readonly WorkCase[] = [drupela, pocketgame];

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
