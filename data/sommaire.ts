import { SommaireEntry, Locale } from '@/types/content';

const fr: SommaireEntry[] = [
  {
    index: '01',
    href: '/parcours',
    title: 'Parcours',
    teaser: "Du Cameroun au Maroc — enseignement, ingénierie blockchain et doctorat menés de front.",
  },
  {
    index: '02',
    href: '/expertise',
    title: 'Expertise',
    teaser: 'IA, systèmes énergétiques, blockchain et développement fullstack, du modèle à la production.',
  },
  {
    index: '03',
    href: '/formation',
    title: 'Formation de cadres',
    teaser: 'Des équipes de direction formées dans huit pays africains à l’usage professionnel de l’IA.',
  },
  {
    index: '04',
    href: '/presse',
    title: 'Presse',
    teaser: "Deux portraits dans DT News 237 — parcours académique et innovation numérique.",
  },
  {
    index: '05',
    href: '/ouvrage',
    title: 'Ouvrage',
    teaser: "Un livre sur l'intelligence artificielle, pensé depuis l'Afrique.",
  },
  {
    index: '06',
    href: '/contact',
    title: 'Contact',
    teaser: 'Pour une collaboration, une intervention ou une prise de parole.',
  },
];

const en: SommaireEntry[] = [
  {
    index: '01',
    href: '/parcours',
    title: 'Career',
    teaser: 'From Cameroon to Morocco — teaching, blockchain engineering and a PhD pursued in parallel.',
  },
  {
    index: '02',
    href: '/expertise',
    title: 'Expertise',
    teaser: 'AI, energy systems, blockchain and fullstack development, from model to production.',
  },
  {
    index: '03',
    href: '/formation',
    title: 'Executive Training',
    teaser: 'Management teams trained across eight African countries in the professional use of AI.',
  },
  {
    index: '04',
    href: '/presse',
    title: 'Press',
    teaser: 'Two profiles in DT News 237 — academic career and digital innovation.',
  },
  {
    index: '05',
    href: '/ouvrage',
    title: 'Book',
    teaser: 'A book on artificial intelligence, thought from Africa.',
  },
  {
    index: '06',
    href: '/contact',
    title: 'Contact',
    teaser: 'For a collaboration, a speaking engagement, or a talk.',
  },
];

export const sommaireByLocale: Record<Locale, SommaireEntry[]> = { fr, en };
