/**
 * Content of the downloadable CV. Everything that also appears on the site is
 * read from the same data modules, so the CV and the pages cannot disagree;
 * only the section headings and the few CV-only labels live here.
 */
import { cvPath, site } from '../config/site';
import { t, type Locale } from '../i18n';
import { education, roles } from './experience';
import { profile, type Localized } from './profile';
import { rustContent } from './rust';
import { skillGroups } from './skills';
import { tagLabel, workCases } from './work';

export const cvHeadings = {
  summary: { en: 'Summary', es: 'Resumen' },
  experience: { en: 'Experience', es: 'Experiencia' },
  skills: { en: 'Skills', es: 'Habilidades' },
  projects: { en: 'Projects', es: 'Proyectos' },
  education: { en: 'Education', es: 'Formación' },
  languages: { en: 'Languages', es: 'Idiomas' },
} as const satisfies Record<string, Localized>;

const labels = {
  present: { en: 'Present', es: 'Actualidad' },
  learning: { en: 'Currently learning', es: 'Aprendiendo ahora' },
  learningProject: { en: 'learning project', es: 'proyecto de aprendizaje' },
  title: { en: 'CV', es: 'CV' },
} as const satisfies Record<string, Localized>;

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x". */
const displayUrl = (url: string): string => url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');

function monthFormatter(locale: Locale) {
  const format = new Intl.DateTimeFormat(locale, { month: 'short', year: 'numeric', timeZone: 'UTC' });
  return (iso: string): string => {
    const text = format.format(new Date(`${iso}-01T00:00:00Z`)).replace('.', '');
    return text.charAt(0).toUpperCase() + text.slice(1);
  };
}

export interface CvData {
  locale: Locale;
  fileName: string;
  documentTitle: string;
  name: string;
  role: string;
  location: string;
  contacts: { text: string; href: string }[];
  summary: string;
  roles: { heading: string; meta: string; points: string[] }[];
  skills: { label: string; items: string }[];
  projects: { name: string; text: string }[];
  education: string;
  languages: string;
}

export function buildCv(locale: Locale, siteUrl: string): CvData {
  const month = monthFormatter(locale);

  return {
    locale,
    fileName: cvPath[locale].split('/').pop()!,
    documentTitle: `${site.name} — ${t(locale, 'site.role')} — ${labels.title[locale]}`,
    name: site.name,
    role: t(locale, 'site.role'),
    location: profile.location[locale],
    contacts: [
      { text: profile.email, href: `mailto:${profile.email}` },
      { text: displayUrl(site.linkedin), href: site.linkedin },
      { text: displayUrl(site.github), href: site.github },
      { text: displayUrl(siteUrl), href: siteUrl },
    ],
    summary: rustContent[locale].hero.support,
    roles: roles.map((role) => ({
      heading: `${role.title[locale]} — ${role.company}${role.companyNote ? ` (${role.companyNote[locale]})` : ''}`,
      meta: `${month(role.start)} – ${role.end ? month(role.end) : labels.present[locale]} · ${role.location[locale]}`,
      points: role.points.map((point) => point[locale]),
    })),
    skills: skillGroups.map((group) => ({
      label: group.learning ? labels.learning[locale] : group.label[locale],
      items: group.items.map((item) => (typeof item === 'string' ? item : item[locale])).join(', '),
    })),
    projects: workCases.map((work) => {
      const tags = work.cardTags.map((tag) => tagLabel(tag, locale)).join(', ');
      const isLearning = work.cardTags.includes('Rust');
      return {
        name: work.name,
        text: `${work.pitch[locale]} (${isLearning ? `${labels.learningProject[locale]}: ` : ''}${tags})`,
      };
    }),
    education: `${education.degree[locale]} — ${education.school}, ${education.start} – ${education.end ?? labels.present[locale]}`,
    languages: profile.languages
      .map((language) => `${language.name[locale]} (${language.level[locale]})`)
      .join(' · '),
  };
}
