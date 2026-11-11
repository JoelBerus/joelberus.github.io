import type { ImageMetadata } from 'astro';
import type { Locale } from '../../i18n';

/** A value written once per site locale. */
export type Localized<T> = Record<Locale, T>;

export type WorkSlug = 'drupela' | 'asistente-hogar' | 'pocketgame';

/**
 * A chip in a card or in the stack list. Plain strings render as neutral
 * tags; the object form carries a localized label and a highlighted variant.
 */
export type WorkTag = string | { label: Localized<string>; variant: 'accent' | 'data' };

/** Marks a project where AI is part of the product or of how it is built. */
export const AI_TAG: WorkTag = { label: { en: 'AI', es: 'IA' }, variant: 'data' };

export function tagLabel(tag: WorkTag, locale: Locale): string {
  return typeof tag === 'string' ? tag : tag.label[locale];
}

export function tagVariant(tag: WorkTag): 'default' | 'accent' | 'data' {
  return typeof tag === 'string' ? 'default' : tag.variant;
}

/**
 * Product identity applied on top of the portfolio shell.
 * `hero*` colors paint the hero band; `accent*` colors replace the oxide
 * accent in the rest of the case page (which keeps the dark portfolio surface).
 */
export interface WorkTheme {
  heroBg: string;
  heroText: string;
  heroMuted: string;
  heroLine: string;
  /** Solid button inside the hero. */
  heroButtonBg: string;
  heroButtonBgHover: string;
  heroButtonText: string;
  /** Accent used for text and controls on the dark page surface (AA on #0b0e11). */
  accent: string;
  accentHover: string;
  accentInk: string;
  /** Non-text marks: dots, rules, hover borders (3:1 is enough). */
  mark: string;
  /** Media area of the home card. */
  cardBg: string;
  cardText: string;
  /** Highlighted layer of the architecture diagram. */
  bandBg: string;
  bandText: string;
  bandMuted: string;
  /** Font stack for the hero headline. */
  displayFont: string;
  displayWeight: number;
}

export interface WorkLink {
  label: Localized<string>;
  href: string;
  /** Opens in a new tab. */
  external?: boolean;
  /** Path inside this site that is not localized (e.g. a static landing). */
  sitePath?: boolean;
}

export interface WorkShot {
  image: ImageMetadata;
  /** `wide` is a desktop capture, `phone` a portrait mobile capture. */
  kind: 'wide' | 'phone';
  alt: Localized<string>;
  caption: Localized<string>;
}

export interface WorkCase {
  slug: WorkSlug;
  name: string;
  /** Home section the case is listed in; the back link of the case page returns there. */
  listedIn: 'work' | 'projects';
  theme: WorkTheme;
  /** Logo shown in the hero and on the home card. Empty `text` hides the wordmark text. */
  logo: { image: ImageMetadata; width: number; height: number; text?: string };

  // ---- Home card ----
  cardEyebrow: Localized<string>;
  cardSummary: Localized<string>;
  cardTags: WorkTag[];

  // ---- Case page ----
  metaDescription: Localized<string>;
  pitch: Localized<string>;
  meta: { label: Localized<string>; value: Localized<string> }[];
  links: WorkLink[];
  /** Also used as the media of the home card. One wide + one phone, or two phones. */
  heroShots: { image: ImageMetadata; kind: 'wide' | 'phone'; alt: Localized<string> }[];

  overview: {
    title: Localized<string>;
    paragraphs: Localized<string[]>;
    points: { title: Localized<string>; body: Localized<string> }[];
  };

  engineering: {
    title: Localized<string>;
    lead: Localized<string>;
    /** Diagram-like stack, top to bottom. */
    layers: {
      label: Localized<string>;
      /** Paints the layer with the product band colors. */
      highlight?: boolean;
      nodes: { title: string | Localized<string>; detail: Localized<string> }[];
    }[];
    metrics: { value: string | Localized<string>; unit?: string; caption: Localized<string> }[];
    facts: { title: Localized<string>; body: Localized<string> }[];
  };

  gallery: {
    title: Localized<string>;
    lead: Localized<string>;
    shots: WorkShot[];
  };

  stack: { label: Localized<string>; items: WorkTag[] }[];

  /** Small print at the end of the page (e.g. trademark notice). */
  note?: Localized<string>;
}

/** Resolves a value that may be shared by every locale or written per locale. */
export function pick<T extends string>(value: T | Localized<T>, locale: Locale): T {
  return typeof value === 'string' ? value : value[locale];
}
