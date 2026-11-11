/**
 * English dictionary. This is the source of truth for translation keys:
 * every other locale must provide exactly the same keys (see `Dictionary`).
 */
export const en = {
  'site.role': 'Full Stack Developer',
  'site.tagline': 'Full Stack Developer — TypeScript, React, Node.js · learning Rust',
  'site.description':
    'Portfolio of Joel Bermudez Acosta, full stack developer working with TypeScript, React and Node.js, and learning Rust.',

  'a11y.skip': 'Skip to content',
  'a11y.mainNav': 'Main',
  'a11y.home': 'Joel Bermudez Acosta, home',
  'a11y.langSwitch': 'Language',
  'a11y.external': 'opens in a new tab',

  'nav.work': 'Work',
  'nav.rust': 'Rust',
  'nav.experience': 'Experience',
  'nav.skills': 'Skills',
  'nav.contact': 'Contact',

  'lang.en': 'English',
  'lang.es': 'Spanish',

  'footer.built': 'Built with Astro + Rust/WASM',
  'footer.github': 'GitHub',
  'footer.linkedin': 'LinkedIn',

  'hero.cta.work': 'View work',
  'hero.cta.contact': 'Get in touch',

  'work.label': 'Work',
  'work.title': 'Selected work',
  'rust.label': 'Rust',
  'rust.title': 'Learning Rust in the open',
  'experience.label': 'Experience',
  'experience.title': 'Experience',
  'skills.label': 'Skills',
  'skills.title': 'Skills and tools',
  'projects.label': 'Projects',
  'projects.title': 'More projects',
  'contact.label': 'Contact',
  'contact.title': "Let's talk",

  'common.placeholder': 'Content coming soon.',
  'common.viewProject': 'View project',

  'notFound.title': 'Page not found',
  'notFound.body': 'The page you are looking for does not exist or has moved.',
  'notFound.back': 'Back to home',
} as const;

export type TranslationKey = keyof typeof en;
export type Dictionary = Record<TranslationKey, string>;
