import { en, type Dictionary, type TranslationKey } from './en';
import { es } from './es';

export type { Dictionary, TranslationKey };

export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

const dictionaries: Record<Locale, Dictionary> = { en, es };

/** Open Graph locale codes for each site locale. Spanish targets Ecuador. */
export const ogLocales: Record<Locale, string> = { en: 'en_US', es: 'es_EC' };

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/** Narrows `Astro.currentLocale` (string | undefined) to a known locale. */
export function resolveLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : defaultLocale;
}

/** Translates a key for the given locale, falling back to English. */
export function t(locale: Locale, key: TranslationKey): string {
  return dictionaries[locale][key] ?? en[key];
}

/**
 * Returns a translator bound to a locale:
 * `const tr = useTranslations(locale); tr('nav.work')`.
 */
export function useTranslations(locale: Locale) {
  return (key: TranslationKey): string => t(locale, key);
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Removes the configured base and any locale prefix: `/es/work/x/` -> `/work/x/`. */
export function stripLocale(pathname: string): string {
  let path = pathname;
  if (base && path.startsWith(base)) path = path.slice(base.length);
  if (!path.startsWith('/')) path = `/${path}`;
  const [, first, ...rest] = path.split('/');
  if (isLocale(first)) return `/${rest.join('/')}`;
  return path;
}

/**
 * Builds a site-relative URL for a locale-agnostic path.
 * `localizePath('/work/x/', 'es')` -> `/es/work/x/`; the default locale has no prefix.
 * Hashes are preserved: `localizePath('/#work', 'es')` -> `/es/#work`.
 */
export function localizePath(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const prefix = locale === defaultLocale ? '' : `/${locale}`;
  return `${base}${prefix}${normalized}`;
}

/** URL of the current page in another locale: `/es/work/x/` + `en` -> `/work/x/`. */
export function getAlternatePath(pathname: string, target: Locale): string {
  return localizePath(stripLocale(pathname), target);
}

/** The locale a visitor switches to from the given one. */
export function getAlternateLocale(locale: Locale): Locale {
  return locale === 'en' ? 'es' : 'en';
}
