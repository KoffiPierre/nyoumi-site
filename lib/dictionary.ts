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
      viewCareer: 'Voir le parcours',
      contactMe: 'Me contacter',
      metaLocation: 'Basé à',
      metaDoctorate: 'Doctorat',
      metaOrigin: 'Origine',
    },
    press: {
      readFull: "Lire l'article complet",
      close: 'Fermer',
    },
    footer: {
      rights: 'Tous droits réservés.',
    },
    notFound: {
      kicker: 'Page introuvable',
      title: "Cette page n'existe pas.",
      lede: "La page demandée n'existe pas ou a été déplacée.",
      back: "Retour à l'accueil",
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
      subjectFallback: 'Message de',
    },
    book: {
      author: 'Auteur',
      language: 'Langue',
      languageValue: 'Anglais',
    },
    formation: {
      countriesLabel: 'Pays représentés',
      client: 'Partenaire',
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
      viewCareer: 'View career',
      contactMe: 'Contact me',
      metaLocation: 'Based in',
      metaDoctorate: 'Doctorate',
      metaOrigin: 'Origin',
    },
    press: {
      readFull: 'Read the full article',
      close: 'Close',
    },
    footer: {
      rights: 'All rights reserved.',
    },
    notFound: {
      kicker: 'Page not found',
      title: "This page doesn't exist.",
      lede: 'The requested page does not exist or has been moved.',
      back: 'Back to home',
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
      subjectFallback: 'Message from',
    },
    book: {
      author: 'Author',
      language: 'Language',
      languageValue: 'English',
    },
    formation: {
      countriesLabel: 'Countries represented',
      client: 'Partner',
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
