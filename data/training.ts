import { Locale } from '@/types/content';

export interface TrainingContent {
  countries: string[];
  client: string;
  programTitle: string;
  programDates: string;
  intro: string[];
}

const fr: TrainingContent = {
  countries: ['Sénégal', 'Guinée', 'Tchad', 'Cameroun', 'Maroc', 'Burkina Faso', 'Congo', 'Gabon'],
  client: 'Afrique Compétences',
  programTitle: "Assistance de Direction à l'ère du digital : automatiser, anticiper et gagner en efficacité",
  programDates: 'Du 20 juillet au 1er août',
  intro: [
    "En parallèle de ses activités de recherche et d'ingénierie, Dieudonné Nyoumi Mballa intervient comme formateur des cadres pour Afrique Compétences. Il accompagne des équipes de direction dans l'appropriation de l'intelligence artificielle appliquée à leurs métiers.",
    "Ses sessions ont déjà réuni des cadres venus du Sénégal, de Guinée, du Tchad, du Cameroun, du Maroc, du Burkina Faso, du Congo et du Gabon, une pratique de la formation à l'échelle du continent.",
  ],
};

const en: TrainingContent = {
  countries: ['Senegal', 'Guinea', 'Chad', 'Cameroon', 'Morocco', 'Burkina Faso', 'Congo', 'Gabon'],
  client: 'Afrique Compétences',
  programTitle: 'Executive Assistance in the Digital Age: automating, anticipating and gaining efficiency',
  programDates: 'July 20 to August 1',
  intro: [
    'Alongside his research and engineering work, Dieudonné Nyoumi Mballa serves as an executive trainer for Afrique Compétences, helping management teams put artificial intelligence to work in their own fields.',
    'His sessions have already brought together executives from Senegal, Guinea, Chad, Cameroon, Morocco, Burkina Faso, Congo and Gabon, a training practice spanning the continent.',
  ],
};

export const trainingByLocale: Record<Locale, TrainingContent> = { fr, en };
