import { Profile, Locale } from '@/types/content';

const fr: Profile = {
  name: 'Dieudonné Nyoumi Mballa',
  firstName: 'Dieudonné',
  lastName: 'Nyoumi Mballa',
  title: 'Docteur PhD en IA & Formateur de Cadres',
  role: "Ingénieur et chercheur : IA appliquée aux systèmes énergétiques, Blockchain & Web3, formateur de cadres",
  lede: "Je conçois des systèmes intelligents, agents conversationnels, réseaux énergétiques optimisés et infrastructures décentralisées, et je forme des cadres venus de toute l'Afrique aux usages professionnels de l'intelligence artificielle.",
  location: 'Casablanca, Maroc',
  origin: 'Cameroun',
  doctorate: 'Univ. Hassan II, 2026',
  email: 'youmi.dieu95@gmail.com',
  phone: '+212766331322',
  phoneDisplay: '+212 766-331322',
  address: 'Sidi Maârouf, Casablanca, Maroc',
  languages: ['Français', 'Anglais'],
};

const en: Profile = {
  name: 'Dieudonné Nyoumi Mballa',
  firstName: 'Dieudonné',
  lastName: 'Nyoumi Mballa',
  title: 'PhD in AI & Executive Trainer',
  role: 'Engineer and researcher: AI applied to energy systems, Blockchain & Web3, executive trainer',
  lede: 'I design intelligent systems, conversational agents, optimized energy grids and decentralized infrastructure, and I train executives from across Africa in the professional applications of artificial intelligence.',
  location: 'Casablanca, Morocco',
  origin: 'Cameroon',
  doctorate: 'Hassan II Univ., 2026',
  email: 'youmi.dieu95@gmail.com',
  phone: '+212766331322',
  phoneDisplay: '+212 766-331322',
  address: 'Sidi Maarouf, Casablanca, Morocco',
  languages: ['French', 'English'],
};

export const profileByLocale: Record<Locale, Profile> = { fr, en };
