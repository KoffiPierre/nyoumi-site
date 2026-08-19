import { Pillar, Locale } from '@/types/content';

const fr: Pillar[] = [
  {
    id: 'energie',
    eyebrow: 'Systèmes énergétiques',
    title: "IA appliquée à l'énergie",
    description:
      "Modélisation, optimisation et simulation de systèmes énergétiques intelligents — réseaux, prévision et intégration des énergies renouvelables, au cœur de sa thèse à l'Université Hassan II de Casablanca.",
  },
  {
    id: 'blockchain',
    eyebrow: 'Distributed Ledger',
    title: 'Blockchain & Web3',
    description:
      "Conception de solutions sur Hedera Hashgraph, contrats intelligents et applications décentralisées — de la tokenisation à l'architecture fullstack, jusqu'à l'agent conversationnel développé seul pour MarocVente.",
  },
  {
    id: 'formation-cadres',
    eyebrow: 'Afrique Compétences',
    title: 'Formateur de cadres',
    description:
      "Formateur pour Afrique Compétences, il a formé des équipes de direction venues du Sénégal, de Guinée, du Tchad, du Cameroun, du Maroc, du Burkina Faso, du Congo et du Gabon à l'intelligence artificielle appliquée à leurs métiers.",
  },
  {
    id: 'transmission',
    eyebrow: 'Transmission académique',
    title: 'Enseignement & écriture',
    description:
      "Enseignant de mathématiques et de physique pendant six ans, auteur d'un ouvrage sur l'intelligence artificielle, il conçoit la transmission du savoir comme un prolongement naturel de la recherche.",
  },
];

const en: Pillar[] = [
  {
    id: 'energie',
    eyebrow: 'Energy systems',
    title: 'AI applied to energy',
    description:
      "Modeling, optimization and simulation of smart energy systems — grids, forecasting and renewable energy integration, at the core of his doctoral research at Hassan II University, Casablanca.",
  },
  {
    id: 'blockchain',
    eyebrow: 'Distributed ledger',
    title: 'Blockchain & Web3',
    description:
      'Building solutions on Hedera Hashgraph, smart contracts and decentralized applications — from tokenization to fullstack architecture, up to the conversational agent he built solo for MarocVente.',
  },
  {
    id: 'formation-cadres',
    eyebrow: 'Afrique Compétences',
    title: 'Executive trainer',
    description:
      'As a trainer for Afrique Compétences, he has trained management teams from Senegal, Guinea, Chad, Cameroon, Morocco, Burkina Faso, Congo and Gabon in applying artificial intelligence to their fields.',
  },
  {
    id: 'transmission',
    eyebrow: 'Academic transmission',
    title: 'Teaching & writing',
    description:
      'A mathematics and physics teacher for six years and author of a book on artificial intelligence, he sees knowledge transfer as a natural extension of research.',
  },
];

export const pillarsByLocale: Record<Locale, Pillar[]> = { fr, en };
