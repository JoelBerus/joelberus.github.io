import type { Localized } from './profile';

/** A skill name: plain when it reads the same in every locale. */
export type SkillName = string | Localized;

export interface SkillGroup {
  id: string;
  label: Localized;
  items: SkillName[];
  /** Marks the group as something being learned, not a mastered skill. */
  learning?: boolean;
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'frontend',
    label: { en: 'Front-End', es: 'Front-End' },
    items: [
      'React.js',
      'Next.js',
      'React Native',
      'Vue.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'HTML5',
      'CSS3',
      'Redux',
      'TailwindCSS',
    ],
  },
  {
    id: 'backend',
    label: { en: 'Back-End', es: 'Back-End' },
    items: [
      'Node.js',
      'Java',
      'PHP',
      { en: 'REST API design and integration', es: 'Diseño e integración de API REST' },
      'GraphQL',
    ],
  },
  {
    id: 'databases',
    label: { en: 'Databases', es: 'Bases de datos' },
    items: ['PostgreSQL', 'MySQL'],
  },
  {
    id: 'ai',
    label: { en: 'AI & LLMs', es: 'IA y LLM' },
    items: ['OpenAI API', 'Anthropic Claude API', 'GitHub Copilot', 'Cursor'],
  },
  {
    id: 'tools',
    label: { en: 'Testing & Tools', es: 'Testing y herramientas' },
    items: [
      'Jest',
      'Git/GitHub',
      'CI/CD (GitHub Actions, Vercel)',
      'Webpack',
      'Vite',
      'Figma',
      'WordPress',
    ],
  },
  {
    id: 'practices',
    label: { en: 'Practices', es: 'Prácticas' },
    items: [
      'Agile/Scrum',
      { en: 'Code review', es: 'Revisión de código' },
      { en: 'WCAG 2.1 accessibility', es: 'Accesibilidad WCAG 2.1' },
      'Core Web Vitals',
      { en: 'Remote distributed teams', es: 'Equipos remotos distribuidos' },
    ],
  },
  {
    id: 'learning',
    label: { en: 'Learning', es: 'Aprendiendo' },
    items: ['Rust', 'WebAssembly', 'axum', 'SQLite'],
    learning: true,
  },
];
