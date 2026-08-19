/**
 * Content model for the site.
 *
 * Everything editorial (profile, timeline, skills, press, publications)
 * lives in /data as typed constants, keyed by locale ('fr' | 'en') — never
 * hardcoded in components or pages. To edit the content, edit /data only;
 * the UI reads from here via getDictionary(locale).
 */

export type Locale = 'fr' | 'en';

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  role: string;
  lede: string;
  location: string;
  origin: string;
  doctorate: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  address: string;
  languages: string[];
}

export interface Pillar {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
}

export interface TimelineEntry {
  id: string;
  period: string;
  title: string;
  org: string;
  description: string;
  tag?: string;
}

export interface SkillGroup {
  id: string;
  eyebrow: string;
  title: string;
  items: string[];
}

export interface PressEntry {
  id: string;
  tag: string;
  title: string;
  description: string;
  outlet: string;
  issue: string;
  date: string;
  image: string;
  slug: string;
}

export interface Publication {
  id: string;
  kind: string;
  title: string;
  author: string;
  description: string[];
}

export interface SommaireEntry {
  index: string;
  href: string;
  title: string;
  teaser: string;
}

export interface TrainingCountry {
  name: string;
}
