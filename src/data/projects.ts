import type { Localized } from './profile';

export interface SideProject {
  name: string;
  kind: Localized;
  summary: Localized;
  tags: string[];
  /** Public repository URL. */
  href: string;
  /** Any CSS color for the card accent. */
  accent: string;
}

/** Public side projects shown in the "More projects" section. */
export const sideProjects: SideProject[] = [
  {
    name: 'market-brief',
    kind: { en: 'Agent Skill', es: 'Agent Skill' },
    summary: {
      en: 'An Agent Skill that writes a daily plain-language note on the stocks you hold. It uses only the Python standard library, outputs an HTML page or an email, and works with Claude, Codex, Cursor, Gemini CLI and Copilot.',
      es: 'Una Agent Skill que redacta cada día una nota en lenguaje sencillo sobre las acciones que tienes. Usa solo la librería estándar de Python, genera una página HTML o un correo y funciona con Claude, Codex, Cursor, Gemini CLI y Copilot.',
    },
    tags: ['Python', 'Agent Skill', 'HTML'],
    href: 'https://github.com/JoelBerus/market-brief',
    accent: 'var(--color-data)',
  },
  {
    name: 'Artic',
    kind: { en: 'Visual editor · AI-first IDE', es: 'Editor visual · IDE AI-first' },
    summary: {
      en: 'A Figma-style visual editor and AI-first IDE that runs your real React app live and writes design changes back to the source code. Built as a pnpm monorepo.',
      es: 'Un editor visual al estilo de Figma e IDE AI-first que ejecuta tu app React real en vivo y escribe los cambios de diseño de vuelta en el código fuente. Organizado como monorepo de pnpm.',
    },
    tags: ['React', 'pnpm monorepo'],
    href: 'https://github.com/JoelBerus/Artic',
    accent: 'var(--color-accent)',
  },
];
