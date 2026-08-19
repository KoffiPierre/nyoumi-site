import { Locale } from '@/types/content';

export const dictionary = {
  fr: {
    nav: {
      home: 'Accueil',
      parcours: 'Parcours',
      expertise: 'Expertise',
      formation: 'Formation',
      presse: 'Presse',
      ouvrage: 'Ouvrage',
      contact: 'Contact',
    },
    hero: {
      tag: 'Dossier technique — Profil professionnel',
      rev: 'RÉV.',
      viewCareer: 'Voir le parcours',
      contactMe: 'Me contacter',
      figCaption: 'FIG. 1 — SUJET',
      scale: 'ÉCH. 1:1',
      calloutPhd: 'Doctorat PhD',
      calloutPhdDetail: 'Univ. Hassan II, Casablanca (2026)',
      calloutEngineer: "Ingénieur d'État",
      calloutEngineerDetail: 'ENSAM Casablanca (2021)',
      calloutBlockchain: 'Blockchain & Web3',
      calloutBlockchainDetail: 'Hedera Hashgraph',
      calloutTrainer: 'Formateur de cadres',
      calloutTrainerDetail: 'Afrique Compétences · 8 pays',
      tbProject: 'Projet',
      tbProjectValue: 'Profil professionnel — Site personnel',
      tbDrawnBy: 'Dessiné par',
      tbDate: 'Date',
      tbScale: 'Échelle',
      tbSheet: 'Feuille',
    },
    titleblock: {
      contact: 'Contact',
      phone: 'Téléphone',
      location: 'Localisation',
      languages: 'Langues',
    },
    spec: {
      ref: 'Réf.',
      parameter: 'Paramètre',
      description: 'Description',
    },
    revlog: {
      rev: 'Rév.',
      period: 'Période',
      title: 'Intitulé',
      org: 'Organisme',
    },
    press: {
      pj: 'PJ',
      annex: 'ANNEXE',
    },
    note: {
      tag: 'NOTE',
      quote:
        "L'Afrique peut non seulement adopter les innovations mondiales, mais aussi produire ses propres solutions technologiques, capables d'accompagner durablement son développement.",
    },
    dim: {
      pillars: 'Trois axes de travail',
    },
    sommaire: {
      num: 'N°',
      sheet: 'Feuille',
      description: 'Description',
    },
    footer: {
      sitemapLabel: 'Plan du site',
      tagline: 'Concept — dessiné comme un plan technique',
      rights: 'Tous droits réservés.',
    },
    notFound: {
      kicker: 'ERREUR 404 — HORS PLAN',
      title: 'Feuille introuvable dans le dossier.',
      lede: "La page demandée n'existe pas ou a été déplacée.",
      back: 'Retour au plan 001',
    },
    contactForm: {
      name: 'Nom',
      email: 'Email',
      subject: 'Sujet',
      message: 'Message',
      send: 'Envoyer le message',
      sent: 'Client email ouvert ✓',
      errorName: 'Votre nom est requis.',
      errorEmail: 'Adresse email invalide.',
      errorMessage: 'Un message est requis.',
    },
    book: {
      type: 'Type',
      author: 'Auteur',
      language: 'Langue',
      languageValue: 'Anglais',
    },
    formation: {
      countriesLabel: 'Pays formés',
      client: 'Client',
      program: 'Programme',
      dates: 'Dates',
    },
    langSwitch: 'EN',
  },
  en: {
    nav: {
      home: 'Home',
      parcours: 'Career',
      expertise: 'Expertise',
      formation: 'Training',
      presse: 'Press',
      ouvrage: 'Book',
      contact: 'Contact',
    },
    hero: {
      tag: 'Technical file — Professional profile',
      rev: 'REV.',
      viewCareer: 'View career',
      contactMe: 'Contact me',
      figCaption: 'FIG. 1 — SUBJECT',
      scale: 'SCALE 1:1',
      calloutPhd: 'PhD',
      calloutPhdDetail: 'Hassan II Univ., Casablanca (2026)',
      calloutEngineer: 'State Engineer',
      calloutEngineerDetail: 'ENSAM Casablanca (2021)',
      calloutBlockchain: 'Blockchain & Web3',
      calloutBlockchainDetail: 'Hedera Hashgraph',
      calloutTrainer: 'Executive trainer',
      calloutTrainerDetail: 'Afrique Compétences · 8 countries',
      tbProject: 'Project',
      tbProjectValue: 'Professional profile — Personal site',
      tbDrawnBy: 'Drawn by',
      tbDate: 'Date',
      tbScale: 'Scale',
      tbSheet: 'Sheet',
    },
    titleblock: {
      contact: 'Contact',
      phone: 'Phone',
      location: 'Location',
      languages: 'Languages',
    },
    spec: {
      ref: 'Ref.',
      parameter: 'Parameter',
      description: 'Description',
    },
    revlog: {
      rev: 'Rev.',
      period: 'Period',
      title: 'Title',
      org: 'Organization',
    },
    press: {
      pj: 'ATT',
      annex: 'ANNEX',
    },
    note: {
      tag: 'NOTE',
      quote:
        'Africa can not only adopt global innovations, but also produce its own technological solutions, capable of sustaining its development over the long run.',
    },
    dim: {
      pillars: 'Three areas of work',
    },
    sommaire: {
      num: 'No.',
      sheet: 'Sheet',
      description: 'Description',
    },
    footer: {
      sitemapLabel: 'Sitemap',
      tagline: 'Concept — drawn as a technical plan',
      rights: 'All rights reserved.',
    },
    notFound: {
      kicker: '404 ERROR — OFF THE PLAN',
      title: 'Sheet not found in the file.',
      lede: 'The requested page does not exist or has been moved.',
      back: 'Back to sheet 001',
    },
    contactForm: {
      name: 'Name',
      email: 'Email',
      subject: 'Subject',
      message: 'Message',
      send: 'Send message',
      sent: 'Email client opened ✓',
      errorName: 'Your name is required.',
      errorEmail: 'Invalid email address.',
      errorMessage: 'A message is required.',
    },
    book: {
      type: 'Type',
      author: 'Author',
      language: 'Language',
      languageValue: 'English',
    },
    formation: {
      countriesLabel: 'Countries trained',
      client: 'Client',
      program: 'Program',
      dates: 'Dates',
    },
    langSwitch: 'FR',
  },
} as const;

export function getDictionary(locale: Locale) {
  return dictionary[locale];
}

export type Dictionary = typeof dictionary.fr;
