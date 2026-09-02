import { SkillGroup, Locale } from '@/types/content';

const fr: SkillGroup[] = [
  {
    id: 'ia-data',
    eyebrow: 'IA & Data',
    title: 'Intelligence artificielle',
    items: [
      'Machine Learning (supervisé, non-supervisé, RL)',
      'Deep Learning (CNN, RNN, Transformers)',
      'Modèles génératifs',
      'Graph Neural Networks',
      'Agents Speech-to-Speech',
    ],
  },
  {
    id: 'energie',
    eyebrow: 'Énergie & Optimisation',
    title: 'Systèmes énergétiques',
    items: [
      'Optimisation convexe, stochastique, MILP',
      'Systèmes solaires, éoliens, stockage',
      'Marchés & dispatching énergétique',
      'Résilience des réseaux',
    ],
  },
  {
    id: 'blockchain',
    eyebrow: 'Blockchain & Web3',
    title: 'Distributed ledger',
    items: [
      'Hedera Hashgraph (HCS, HTS, HFS)',
      'Smart contracts & Solidity',
      'Hardhat, dApps, portefeuilles Web3',
      'Tokenisation & gouvernance réseau',
    ],
  },
  {
    id: 'dev',
    eyebrow: 'Développement',
    title: 'Ingénierie logicielle',
    items: [
      'React, Next.js, React Native',
      'Node.js (Express, NestJS)',
      'Python · PostgreSQL · MongoDB',
      'JavaScript / TypeScript',
    ],
  },
];

const en: SkillGroup[] = [
  {
    id: 'ia-data',
    eyebrow: 'AI & Data',
    title: 'Artificial intelligence',
    items: [
      'Machine Learning (supervised, unsupervised, RL)',
      'Deep Learning (CNN, RNN, Transformers)',
      'Generative models',
      'Graph Neural Networks',
      'Speech-to-Speech agents',
    ],
  },
  {
    id: 'energie',
    eyebrow: 'Energy & Optimization',
    title: 'Energy systems',
    items: [
      'Convex, stochastic, MILP optimization',
      'Solar, wind, storage systems',
      'Energy markets & dispatch',
      'Grid resilience',
    ],
  },
  {
    id: 'blockchain',
    eyebrow: 'Blockchain & Web3',
    title: 'Distributed ledger',
    items: [
      'Hedera Hashgraph (HCS, HTS, HFS)',
      'Smart contracts & Solidity',
      'Hardhat, dApps, Web3 wallets',
      'Tokenization & network governance',
    ],
  },
  {
    id: 'dev',
    eyebrow: 'Development',
    title: 'Software engineering',
    items: [
      'React, Next.js, React Native',
      'Node.js (Express, NestJS)',
      'Python · PostgreSQL · MongoDB',
      'JavaScript / TypeScript',
    ],
  },
];

export const skillGroupsByLocale: Record<Locale, SkillGroup[]> = { fr, en };
