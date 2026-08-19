import { Publication, Locale } from '@/types/content';

const fr: Publication[] = [
  {
    id: 'ouvrage-ia',
    kind: 'Ouvrage',
    title: 'The Ambivalence of Our Attitude Toward New Technology — Artificial Intelligence',
    author: 'Dieudonné Nyoumi Mballa',
    description: [
      "Un essai qui explore les paradoxes d'une époque où l'intelligence artificielle s'impose à la fois comme moteur d'innovation et source d'inquiétude. À travers une approche multidisciplinaire, l'ouvrage examine comment cette technologie transforme le travail, l'éducation, les identités et les valeurs, pour une réflexion critique et accessible sur notre rapport aux machines.",
      "Fondateur de PRIVATE COMPLEX INSTITUTE EDUCATION (PCIE) et développeur certifié Hedera Hashgraph, l'auteur y défend une conviction forgée par treize années d'enseignement des mathématiques, de la physique et des sciences de l'ingénieur : l'IA n'est pas une fatalité, mais un outil à maîtriser pour qu'elle serve l'humain plutôt que l'inverse.",
    ],
  },
  {
    id: 'article-technique',
    kind: 'Article technique',
    title: "Concevoir un agent Speech-to-Speech en conditions réelles",
    author: 'Dieudonné Nyoumi Mballa',
    description: [
      "Rédigé à la suite du développement en autonomie de l'agent conversationnel pour MarocVente, cet article technique documente les choix d'architecture, le fine-tuning du modèle et les arbitrages rencontrés sur un projet mené seul, du prototype à la mise en production.",
    ],
  },
];

const en: Publication[] = [
  {
    id: 'ouvrage-ia',
    kind: 'Book',
    title: 'The Ambivalence of Our Attitude Toward New Technology — Artificial Intelligence',
    author: 'Dieudonné Nyoumi Mballa',
    description: [
      'An essay exploring the paradoxes of an era in which artificial intelligence stands as both a driver of innovation and a source of concern. Through a multidisciplinary lens, the book examines how the technology is reshaping work, education, identity and values, offering a critical yet accessible reflection on our relationship with machines.',
      'Founder of PRIVATE COMPLEX INSTITUTE EDUCATION (PCIE) and a certified Hedera Hashgraph developer, the author writes from thirteen years of teaching mathematics, physics and engineering sciences, with a clear conviction: AI is not a fatality, but a tool to be mastered so that it serves people rather than the other way around.',
    ],
  },
  {
    id: 'article-technique',
    kind: 'Technical article',
    title: 'Building a Speech-to-Speech Agent Under Real Conditions',
    author: 'Dieudonné Nyoumi Mballa',
    description: [
      "Written after independently developing the conversational agent for MarocVente, this technical article documents the architecture choices, model fine-tuning and trade-offs made on a solo project, from prototype to production.",
    ],
  },
];

export const publicationsByLocale: Record<Locale, Publication[]> = { fr, en };
