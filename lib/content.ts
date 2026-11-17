/**
 * Content loader — reads the JSON files in /content (edited through the
 * admin space at /admin, or by hand) and returns them ready to display in
 * the requested language.
 *
 * Convention: every translatable field exists twice, `champ` (French,
 * required) and `champ_en` (English, optional). If the English version is
 * left empty, the French text is shown on the English site, so a new
 * activity can be published in French only.
 */
import fs from 'node:fs';
import path from 'node:path';
import { Locale } from '@/types/content';

const CONTENT_DIR = path.join(process.cwd(), 'content');

type Raw = Record<string, unknown>;

function readJson<T = Raw>(file: string): T {
  return JSON.parse(fs.readFileSync(path.join(CONTENT_DIR, file), 'utf8')) as T;
}

function readFolder(folder: string): { slug: string; data: Raw }[] {
  const dir = path.join(CONTENT_DIR, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.json'))
    .map((f) => ({ slug: f.replace(/\.json$/, ''), data: readJson(path.join(folder, f)) }));
}

/** Picks `key_en` on the English site when it is filled, otherwise `key`. */
function t(obj: Raw | undefined, key: string, locale: Locale): string {
  if (!obj) return '';
  const fr = obj[key];
  const en = obj[`${key}_en`];
  if (locale === 'en' && typeof en === 'string' && en.trim()) return en.trim();
  return typeof fr === 'string' ? fr.trim() : '';
}

function str(v: unknown): string {
  return typeof v === 'string' ? v.trim() : '';
}

function list(v: unknown): Raw[] {
  return Array.isArray(v) ? (v.filter((x) => x && typeof x === 'object') as Raw[]) : [];
}

function toDate(v: unknown): string {
  // Decap may store a full ISO timestamp; keep the YYYY-MM-DD part.
  const s = str(v);
  return /^\d{4}-\d{2}-\d{2}/.test(s) ? s.slice(0, 10) : '';
}

export function formatMonth(date: string, locale: Locale): string {
  if (!date) return '';
  const d = new Date(`${date}T12:00:00Z`);
  const s = d.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { month: 'long', year: 'numeric', timeZone: 'UTC' });
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatDay(date: string, locale: Locale): string {
  if (!date) return '';
  const d = new Date(`${date}T12:00:00Z`);
  return d.toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

/* ------------------------------------------------------------------ */
/* Profile & settings                                                  */
/* ------------------------------------------------------------------ */

export interface SiteProfile {
  name: string;
  title: string;
  shortTitle: string;
  role: string;
  lede: string;
  portrait: string;
  location: string;
  origin: string;
  doctorate: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  languages: string;
  stats: { value: string; label: string }[];
  references: string[];
}

export function getProfile(locale: Locale): SiteProfile {
  const p = readJson('reglages/profil.json');
  return {
    name: str(p.nom),
    title: t(p, 'titre', locale),
    shortTitle: t(p, 'titre_court', locale) || t(p, 'titre', locale),
    role: t(p, 'role', locale),
    lede: t(p, 'accroche', locale),
    portrait: str(p.portrait) || '/images/portrait.jpg',
    location: t(p, 'ville', locale),
    origin: t(p, 'origine', locale),
    doctorate: t(p, 'doctorat', locale),
    email: str(p.email),
    phone: str(p.telephone).replace(/\s/g, ''),
    phoneDisplay: str(p.telephone_affiche) || str(p.telephone),
    address: t(p, 'adresse', locale),
    languages: t(p, 'langues', locale),
    stats: list(p.chiffres).map((c) => ({ value: str(c.valeur), label: t(c, 'libelle', locale) })),
    references: (Array.isArray(p.references) ? p.references : [])
      .map((r) => (typeof r === 'string' ? r : str((r as Raw)?.nom)))
      .filter(Boolean),
  };
}

export interface SocialLink {
  network: string;
  label: string;
  url: string;
}

export function getSocialLinks(): SocialLink[] {
  const s = readJson('reglages/reseaux.json');
  return list(s.liens)
    .map((l) => ({ network: str(l.reseau) || 'autre', label: str(l.libelle) || str(l.reseau), url: str(l.url) }))
    .filter((l) => l.url);
}

export interface CareerStep {
  id: string;
  period: string;
  title: string;
  org: string;
  description: string;
  tag: string;
}

export function getCareer(locale: Locale): CareerStep[] {
  const s = readJson('reglages/parcours.json');
  return list(s.etapes).map((e, i) => ({
    id: `step-${i}`,
    period: t(e, 'periode', locale),
    title: t(e, 'titre', locale),
    org: t(e, 'organisation', locale),
    description: t(e, 'description', locale),
    tag: t(e, 'etiquette', locale),
  }));
}

/* ------------------------------------------------------------------ */
/* Activities (formations, conférences, rencontres, distinctions)      */
/* ------------------------------------------------------------------ */

export const activityCategories = ['formation', 'conference', 'rencontre', 'distinction', 'autre'] as const;
export type ActivityCategory = (typeof activityCategories)[number];

export const categoryLabels: Record<Locale, Record<ActivityCategory, string>> = {
  fr: { formation: 'Formation', conference: 'Conférence', rencontre: 'Rencontre', distinction: 'Distinction', autre: 'Actualité' },
  en: { formation: 'Training', conference: 'Conference', rencontre: 'Meeting', distinction: 'Distinction', autre: 'News' },
};

export interface MediaPhoto {
  src: string;
  caption: string;
}

export interface MediaVideo {
  src: string;
  youtubeId: string;
  poster: string;
  caption: string;
}

export interface Activity {
  slug: string;
  title: string;
  date: string;
  period: string;
  category: ActivityCategory;
  location: string;
  partner: string;
  summary: string;
  body: string;
  cover: string;
  photos: MediaPhoto[];
  videos: MediaVideo[];
  featured: boolean;
}

export function youtubeId(url: string): string {
  if (!url) return '';
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|live\/))([\w-]{11})/);
  return m ? m[1] : '';
}

function toActivity(slug: string, a: Raw, locale: Locale): Activity {
  const cat = str(a.categorie) as ActivityCategory;
  const photos = list(a.photos)
    .map((p) => ({ src: str(p.image), caption: t(p, 'legende', locale) }))
    .filter((p) => p.src);
  const videos = list(a.videos)
    .map((v) => ({ src: str(v.fichier), youtubeId: youtubeId(str(v.youtube)), poster: str(v.apercu), caption: t(v, 'legende', locale) }))
    .filter((v) => v.src || v.youtubeId);
  return {
    slug,
    title: t(a, 'titre', locale),
    date: toDate(a.date),
    period: t(a, 'periode', locale),
    category: activityCategories.includes(cat) ? cat : 'autre',
    location: t(a, 'lieu', locale),
    partner: str(a.partenaire),
    summary: t(a, 'resume', locale),
    body: t(a, 'texte', locale),
    cover: str(a.couverture) || photos[0]?.src || videos[0]?.poster || '',
    photos,
    videos,
    featured: a.a_la_une === true,
  };
}

export function getActivities(locale: Locale): Activity[] {
  return readFolder('activites')
    .filter(({ data }) => data.brouillon !== true)
    .map(({ slug, data }) => toActivity(slug, data, locale))
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getActivity(slug: string, locale: Locale): Activity | undefined {
  return getActivities(locale).find((a) => a.slug === slug);
}

/** Featured activities first (most recent first), then the rest. */
export function getHomeActivities(locale: Locale, count: number): Activity[] {
  const all = getActivities(locale);
  const featured = all.filter((a) => a.featured);
  const rest = all.filter((a) => !a.featured);
  return [...featured, ...rest].slice(0, count);
}

/* ------------------------------------------------------------------ */
/* Press                                                               */
/* ------------------------------------------------------------------ */

export interface PressArticle {
  slug: string;
  title: string;
  tag: string;
  outlet: string;
  issue: string;
  date: string;
  summary: string;
  image: string;
  link: string;
}

export function getPress(locale: Locale): PressArticle[] {
  return readFolder('presse')
    .map(({ slug, data: p }) => ({
      slug,
      title: t(p, 'titre', locale),
      tag: t(p, 'rubrique', locale),
      outlet: str(p.media),
      issue: t(p, 'numero', locale),
      date: toDate(p.date),
      summary: t(p, 'resume', locale),
      image: str(p.image),
      link: str(p.lien),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}

/* ------------------------------------------------------------------ */
/* Publications (articles & réflexions)                                */
/* ------------------------------------------------------------------ */

export interface Post {
  slug: string;
  title: string;
  date: string;
  summary: string;
  body: string;
  image: string;
}

export function getPosts(locale: Locale): Post[] {
  return readFolder('publications')
    .filter(({ data }) => data.brouillon !== true)
    .map(({ slug, data: p }) => ({
      slug,
      title: t(p, 'titre', locale),
      date: toDate(p.date),
      summary: t(p, 'resume', locale),
      body: t(p, 'texte', locale),
      image: str(p.image),
    }))
    .sort((a, b) => b.date.localeCompare(a.date));
}
