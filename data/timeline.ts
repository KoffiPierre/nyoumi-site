import { TimelineEntry, Locale } from '@/types/content';

const fr: TimelineEntry[] = [
  {
    id: 'ensam',
    period: '2016 — 2021',
    title: 'Master Spécialisé — Ingénierie des systèmes énergétiques',
    org: 'ENSAM · Casablanca',
    description:
      "Formation en ingénierie des systèmes énergétiques et électriques, complétée par une spécialisation en programmation et génie informatique. Diplômé ingénieur d'État en 2021.",
    tag: 'Formation',
  },
  {
    id: 'enseignement',
    period: '2018 — 2024',
    title: 'Enseignant — Mathématiques & Physique',
    org: "Établissement d'enseignement supérieur, Casablanca",
    description:
      "Enseignement en 1ère et 2ème année universitaire, animation de travaux pratiques, participation à des colloques internationaux pour enrichir sa pratique pédagogique.",
    tag: 'Enseignement',
  },
  {
    id: 'hedera',
    period: '2021 — 2025',
    title: 'Blockchain & Web3 — Formation complète et stage',
    org: 'EDGE Business School × Hedera Hashgraph (Suisse) · Casablanca',
    description:
      "Conception de solutions sur technologies DLT, en particulier Hedera Hashgraph (HCS, HTS, HFS) : déploiement de contrats intelligents, création de tokens et architectures de consensus.",
    tag: 'Blockchain',
  },
  {
    id: 'mfti',
    period: '2022 — 2025',
    title: 'Ingénieur FullStack Blockchain',
    org: 'Mfti · Remote',
    description:
      "Développement d'interfaces React.js / Next.js, conception d'API RESTful sécurisées, intégration de bases relationnelles et non-relationnelles, gestion complète du cycle applicatif.",
    tag: 'Ingénierie',
  },
  {
    id: 'phd',
    period: '2022 — Jan. 2026',
    title: 'Doctorat PhD — Intelligence Artificielle',
    org: 'Université Hassan II de Casablanca',
    description:
      "Thèse sur l'IA appliquée aux systèmes énergétiques intelligents : modélisation, optimisation et simulation de systèmes complexes. Obtenue avec mention très honorable et félicitations du jury.",
    tag: 'Recherche',
  },
  {
    id: 'formateur-cadres',
    period: '2025 — en cours',
    title: 'Formateur des Cadres',
    org: 'Afrique Compétences · Casablanca',
    description:
      "Formation de cadres et équipes de direction venus du Sénégal, de Guinée, du Tchad, du Cameroun, du Maroc, du Burkina Faso, du Congo et du Gabon à l'intelligence artificielle appliquée à leurs secteurs métiers.",
    tag: 'Formation cadres',
  },
  {
    id: 'marocvente',
    period: 'Nov. 2025 — Mai 2026',
    title: 'AI Engineer — Agent conversationnel Speech-to-Speech',
    org: 'MarocVente, Casablanca',
    description:
      "Conception en autonomie d'un agent vocal conçu pour faire gagner du temps aux équipes clients, incluant le fine-tuning du modèle et la rédaction d'un article technique documentant le projet.",
    tag: 'IA',
  },
];

const en: TimelineEntry[] = [
  {
    id: 'ensam',
    period: '2016 — 2021',
    title: 'Specialized Master — Energy Systems Engineering',
    org: 'ENSAM · Casablanca',
    description:
      'Training in energy and electrical systems engineering, complemented by a specialization in programming and computer engineering. Graduated as a State Engineer in 2021.',
    tag: 'Education',
  },
  {
    id: 'enseignement',
    period: '2018 — 2024',
    title: 'Lecturer — Mathematics & Physics',
    org: 'Higher education institution, Casablanca',
    description:
      'Teaching first- and second-year university courses, running lab sessions, and presenting at international conferences to sharpen his teaching practice.',
    tag: 'Teaching',
  },
  {
    id: 'hedera',
    period: '2021 — 2025',
    title: 'Blockchain & Web3 — Full training and internship',
    org: 'EDGE Business School × Hedera Hashgraph (Switzerland) · Casablanca',
    description:
      'Designing solutions on DLT technologies, particularly Hedera Hashgraph (HCS, HTS, HFS): deploying smart contracts, creating tokens and consensus architectures.',
    tag: 'Blockchain',
  },
  {
    id: 'mfti',
    period: '2022 — 2025',
    title: 'FullStack Blockchain Engineer',
    org: 'Mfti · Remote',
    description:
      'Building React.js / Next.js interfaces, designing secure RESTful APIs, integrating relational and non-relational databases, owning the full application lifecycle.',
    tag: 'Engineering',
  },
  {
    id: 'phd',
    period: '2022 — Jan. 2026',
    title: 'PhD — Artificial Intelligence',
    org: 'Hassan II University, Casablanca',
    description:
      'Doctoral research on AI applied to smart energy systems: modeling, optimization and simulation of complex systems. Awarded with highest honors and jury commendation.',
    tag: 'Research',
  },
  {
    id: 'formateur-cadres',
    period: '2025 — present',
    title: 'Executive Trainer',
    org: 'Afrique Compétences · Casablanca',
    description:
      'Training executives and management teams from Senegal, Guinea, Chad, Cameroon, Morocco, Burkina Faso, Congo and Gabon in applying artificial intelligence to their fields.',
    tag: 'Executive training',
  },
  {
    id: 'marocvente',
    period: 'Nov. 2025 — May 2026',
    title: 'AI Engineer — Speech-to-Speech Conversational Agent',
    org: 'MarocVente, Casablanca',
    description:
      'Solo design of a voice agent built to save client teams time, including model fine-tuning and a technical article documenting the project.',
    tag: 'AI',
  },
];

export const timelineByLocale: Record<Locale, TimelineEntry[]> = { fr, en };
