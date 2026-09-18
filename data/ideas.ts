import { IdeaPost, Locale } from '@/types/content';

/**
 * HOW TO ADD A NEW PUBLICATION:
 * Copy one block below (in both the `fr` and `en` arrays), give it a new
 * unique `id` and `slug`, and fill in `title`, `date`, `excerpt` (shown in
 * the list) and `body` (one array entry per paragraph, shown on the
 * dedicated page). The page at /publications/<slug> is generated
 * automatically — nothing else to touch.
 */

const fr: IdeaPost[] = [
  {
    id: 'bienvenue',
    slug: 'bienvenue',
    title: 'Bienvenue sur mes publications',
    date: '2026',
    excerpt:
      "Cet espace accueillera mes réflexions sur l'intelligence artificielle, les systèmes énergétiques et la formation, au fil de mes travaux.",
    body: [
      "Cet espace accueillera mes réflexions sur l'intelligence artificielle, les systèmes énergétiques et la formation des cadres, à mesure que mes travaux avancent.",
      "Chaque publication sera courte et concrète : une idée, un retour d'expérience, ou une observation tirée du terrain, plutôt qu'un article académique.",
      "Revenez régulièrement pour découvrir les prochaines.",
    ],
  },
];

const en: IdeaPost[] = [
  {
    id: 'bienvenue',
    slug: 'bienvenue',
    title: 'Welcome to my publications',
    date: '2026',
    excerpt:
      'This space will host my reflections on artificial intelligence, energy systems and executive training, as my work progresses.',
    body: [
      'This space will host my reflections on artificial intelligence, energy systems and executive training, as my work progresses.',
      "Each publication will be short and concrete: an idea, a lesson learned, or a field observation, rather than an academic article.",
      'Check back regularly for new ones.',
    ],
  },
];

export const ideasByLocale: Record<Locale, IdeaPost[]> = { fr, en };
