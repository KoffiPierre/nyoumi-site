import { PressEntry, Locale } from '@/types/content';

const fr: PressEntry[] = [
  {
    id: 'parcours',
    slug: 'un-ingenieur-camerounais-en-ia',
    tag: 'Parcours académique',
    title: 'Un ingénieur camerounais en intelligence artificielle',
    description:
      "Portrait retraçant sa formation entre le Cameroun et le Maroc, son parcours d'ingénieur puis de docteur, et son engagement constant pour la transmission du savoir.",
    outlet: 'DT News 237',
    issue: 'N°200',
    date: '3 juin 2026',
    image: '/images/presse-parcours.jpg',
  },
  {
    id: 'innovation',
    slug: 'ia-conversationnelle-innovante',
    tag: 'Innovation numérique',
    title: 'Un Camerounais développe une IA conversationnelle innovante',
    description:
      "Présentation de son agent conversationnel capable d'interagir en temps réel, conçu pour s'adapter aux besoins des entreprises, administrations et organisations africaines.",
    outlet: 'DT News 237',
    issue: 'N°205',
    date: '10 juin 2026',
    image: '/images/presse-innovation.jpg',
  },
];

const en: PressEntry[] = [
  {
    id: 'parcours',
    slug: 'un-ingenieur-camerounais-en-ia',
    tag: 'Academic profile',
    title: 'A Cameroonian engineer in artificial intelligence',
    description:
      'A profile tracing his education between Cameroon and Morocco, his path from engineer to PhD, and his ongoing commitment to sharing knowledge.',
    outlet: 'DT News 237',
    issue: 'No. 200',
    date: 'June 3, 2026',
    image: '/images/presse-parcours.jpg',
  },
  {
    id: 'innovation',
    slug: 'ia-conversationnelle-innovante',
    tag: 'Digital innovation',
    title: 'A Cameroonian develops an innovative conversational AI',
    description:
      'An overview of his real-time conversational agent, designed to adapt to the needs of African businesses, administrations and organizations.',
    outlet: 'DT News 237',
    issue: 'No. 205',
    date: 'June 10, 2026',
    image: '/images/presse-innovation.jpg',
  },
];

export const pressByLocale: Record<Locale, PressEntry[]> = { fr, en };
