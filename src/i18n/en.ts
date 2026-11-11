/**
 * English dictionary. This is the source of truth for translation keys:
 * every other locale must provide exactly the same keys (see `Dictionary`).
 */
export const en = {
  'site.role': 'Full Stack Developer',
  'site.description':
    'Joel Bermudez Acosta is a full stack developer in Guayaquil, Ecuador with 5+ years building web and mobile products with React, React Native, TypeScript and Node.js. Open to remote roles.',
  'site.ogAlt': 'Joel Bermudez Acosta — Full Stack Developer. React, React Native, TypeScript, Node.js.',

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

  'work.label': 'Work',
  'work.title': 'Selected work',
  'rust.label': 'Rust',
  'rust.title': 'Learning Rust in the open',
  'experience.label': 'Experience',
  'experience.title': 'Experience',
  'experience.lead':
    '5+ years building banking apps, e-commerce platforms and client sites, mostly on remote teams.',
  'experience.highlights': 'Highlights',
  'experience.education': 'Education',
  'skills.label': 'Skills',
  'skills.title': 'Skills and tools',
  'skills.lead':
    'What I use at work, grouped by area. Strongest in React, React Native, TypeScript and Node.js.',
  'skills.learning.badge': 'In progress',
  'skills.learning.note':
    'Currently learning. Listed here as work in progress, not as production experience.',
  'projects.label': 'Projects',
  'projects.title': 'More projects',
  'projects.lead': 'Products I build on my own time. Both repositories are public.',
  'contact.label': 'Contact',
  'contact.title': "Let's talk",
  'contact.lead':
    "I'm open to remote full-stack roles. If your team builds with React, React Native, TypeScript or Node.js, send me a message.",
  'contact.cta.email': 'Email me',
  'contact.email': 'Email',
  'contact.location': 'Location',
  'contact.languages': 'Languages',

  'common.present': 'Present',

  'notFound.title': 'Page not found',
  'notFound.body': 'The page you are looking for does not exist or has moved.',
  'notFound.back': 'Back to home',
} as const;

export type TranslationKey = keyof typeof en;
export type Dictionary = Record<TranslationKey, string>;
