/**
 * Build-time endpoint that writes the one-page CV as a PDF, one per locale:
 * `/cv/joel-bermudez-acosta-cv-en.pdf` and `...-es.pdf`.
 *
 * The content comes from `src/data/cv.ts`, which reads the same data modules
 * as the pages. The PDF is real text in a single column with embedded fonts
 * (Geist, as static WOFF files) and standard section headings, so it stays
 * readable for applicant tracking systems.
 */
import { createRequire } from 'node:module';
import type { APIRoute, GetStaticPaths } from 'astro';
import PDFDocument from 'pdfkit';
import { buildCv, cvHeadings, type CvData } from '../../data/cv';
import { locales, type Locale } from '../../i18n';

const require = createRequire(import.meta.url);
const font = (weight: 400 | 500 | 600) =>
  require.resolve(`@fontsource/geist/files/geist-latin-${weight}-normal.woff`);

const PAGE = { width: 595.28, height: 841.89 }; // A4, in points
const MARGIN = { x: 42, top: 38, bottom: 34 };
const INK = '#14181c';
const MUTED = '#4a545e';
const RULE = '#c9d0d6';

export const getStaticPaths = (() =>
  locales.map((locale) => ({
    params: { file: buildCv(locale, 'https://example.invalid').fileName },
    props: { locale },
  }))) satisfies GetStaticPaths;

/**
 * Lays the CV out at the given type scale. Returns the PDF bytes and whether
 * everything fitted on the first page.
 */
function render(cv: CvData, scale: number): Promise<{ bytes: Buffer; fits: boolean }> {
  const doc = new PDFDocument({
    size: [PAGE.width, PAGE.height],
    margins: { top: MARGIN.top, bottom: MARGIN.bottom, left: MARGIN.x, right: MARGIN.x },
    lang: cv.locale,
    pdfVersion: '1.7',
    info: {
      Title: cv.documentTitle,
      Author: cv.name,
      Subject: cv.role,
      Creator: 'joelberus.github.io',
    },
  });
  doc.registerFont('regular', font(400));
  doc.registerFont('medium', font(500));
  doc.registerFont('bold', font(600));

  let pages = 1;
  doc.on('pageAdded', () => (pages += 1));

  const chunks: Buffer[] = [];
  doc.on('data', (chunk: Buffer) => chunks.push(chunk));
  const done = new Promise<void>((resolve) => doc.on('end', resolve));

  const width = PAGE.width - 2 * MARGIN.x;
  const body = 8.9 * scale;
  const text = (
    value: string,
    fontName: 'regular' | 'medium' | 'bold',
    size: number,
    color = INK,
    options: PDFKit.Mixins.TextOptions = {},
  ) => doc.font(fontName).fontSize(size).fillColor(color).text(value, { width, lineGap: 1.1 * scale, ...options });

  const heading = (label: string) => {
    doc.y += 7 * scale;
    // No letter-spacing: spaced capitals come out of text extractors as "S U M M A R Y".
    text(label.toUpperCase(), 'bold', 8.4 * scale, INK);
    const y = doc.y + 1.5;
    doc.moveTo(MARGIN.x, y).lineTo(MARGIN.x + width, y).lineWidth(0.6).strokeColor(RULE).stroke();
    doc.y = y + 4.5 * scale;
  };

  // ---- Header
  text(cv.name, 'bold', 20 * scale);
  text(`${cv.role} · ${cv.location}`, 'medium', 10.2 * scale, MUTED);
  doc.y += 2 * scale;
  doc.font('regular').fontSize(body).fillColor(INK);
  cv.contacts.forEach((contact, index) => {
    const last = index === cv.contacts.length - 1;
    doc.text(contact.text, { link: contact.href, continued: true, width, underline: false });
    // The separator is not part of the link; the last call closes the line.
    doc.text(last ? ' ' : '  |  ', { link: null, continued: !last, width });
  });

  // ---- Summary
  heading(cvHeadings.summary[cv.locale]);
  text(cv.summary, 'regular', body);

  // ---- Experience
  heading(cvHeadings.experience[cv.locale]);
  cv.roles.forEach((role, index) => {
    if (index > 0) doc.y += 4.5 * scale;
    text(role.heading, 'bold', body + 0.6);
    text(role.meta, 'regular', body - 0.3, MUTED);
    doc.y += 1.5 * scale;
    for (const point of role.points) {
      const y = doc.y;
      doc.font('regular').fontSize(body).fillColor(INK).text('•', MARGIN.x + 1, y, { width: 8, lineBreak: false });
      doc.text(point, MARGIN.x + 10, y, { width: width - 10, lineGap: 1.1 * scale });
      doc.x = MARGIN.x;
      doc.y += 0.8 * scale;
    }
  });

  // ---- Skills
  heading(cvHeadings.skills[cv.locale]);
  for (const group of cv.skills) {
    doc.font('bold').fontSize(body).fillColor(INK).text(`${group.label}: `, { continued: true, width, lineGap: 1.1 * scale });
    doc.font('regular').text(group.items, { width, lineGap: 1.1 * scale });
  }

  // ---- Projects
  heading(cvHeadings.projects[cv.locale]);
  for (const project of cv.projects) {
    doc.font('bold').fontSize(body).fillColor(INK).text(`${project.name}: `, { continued: true, width, lineGap: 1.1 * scale });
    doc.font('regular').text(project.text, { width, lineGap: 1.1 * scale });
    doc.y += 0.8 * scale;
  }

  // ---- Education and languages
  heading(cvHeadings.education[cv.locale]);
  text(cv.education, 'regular', body);
  heading(cvHeadings.languages[cv.locale]);
  text(cv.languages, 'regular', body);

  const fits = pages === 1 && doc.y <= PAGE.height - MARGIN.bottom;
  doc.end();
  return done.then(() => ({ bytes: Buffer.concat(chunks), fits }));
}

export const GET: APIRoute = async ({ props, site }) => {
  const locale = props.locale as Locale;
  const cv = buildCv(locale, (site ?? new URL('https://joelberus.github.io')).href);

  // Shrink the type slightly until the CV fits on one page.
  for (let scale = 1.06; scale >= 0.8; scale -= 0.02) {
    const { bytes, fits } = await render(cv, scale);
    if (fits) {
      return new Response(new Uint8Array(bytes), { headers: { 'Content-Type': 'application/pdf' } });
    }
  }
  throw new Error(`The ${locale} CV does not fit on one page; shorten the content.`);
};
