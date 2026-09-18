/**
 * Formation page gallery — one entry per photo or video.
 *
 * HOW TO EDIT:
 * - `country`: the country shown at the bottom of each item. Fill in the
 *   real country for each photo/video — placeholders below are marked
 *   "À CONFIRMER" / "TO CONFIRM" and must be replaced.
 * - `caption`: the short line shown under the country (optional context).
 * - To add a new photo: drop the file in /public/images/formation/, then
 *   add an entry below with its real width/height (open the image
 *   properties on your computer, or ask to have it resized).
 * - To add a new video: drop the .mp4 in /public/videos/, generate a
 *   poster image (a still frame) into /public/images/formation/, and add
 *   an entry with kind: 'video'.
 */

export interface GalleryItem {
  id: string;
  kind: 'photo' | 'video';
  src: string;
  poster?: string;
  width: number;
  height: number;
  country: { fr: string; en: string };
  caption: { fr: string; en: string };
}

export const formationGallery: GalleryItem[] = [
  {
    id: 'g01',
    kind: 'photo',
    src: '/images/formation/formation-01.jpg',
    width: 1080,
    height: 1069,
    country: { fr: 'Maroc — à confirmer', en: 'Morocco — to confirm' },
    caption: { fr: 'Session de formation', en: 'Training session' },
  },
  {
    id: 'g02',
    kind: 'photo',
    src: '/images/formation/formation-02.jpg',
    width: 1536,
    height: 1409,
    country: { fr: 'Maroc — à confirmer', en: 'Morocco — to confirm' },
    caption: { fr: 'Avec les cadres formés', en: 'With the trained executives' },
  },
  {
    id: 'g03',
    kind: 'photo',
    src: '/images/formation/formation-03.jpg',
    width: 1599,
    height: 1599,
    country: { fr: 'Maroc — à confirmer', en: 'Morocco — to confirm' },
    caption: { fr: 'Animation au paperboard', en: 'Facilitating at the flipchart' },
  },
  {
    id: 'g04',
    kind: 'photo',
    src: '/images/formation/formation-04.jpg',
    width: 1920,
    height: 1920,
    country: { fr: 'Maroc — à confirmer', en: 'Morocco — to confirm' },
    caption: { fr: 'Restitution des ateliers', en: 'Workshop debrief' },
  },
  {
    id: 'g05',
    kind: 'photo',
    src: '/images/formation/formation-05.jpg',
    width: 1064,
    height: 1091,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: "Atelier sur les risques détectés par l'IA", en: 'Workshop on AI-detected risks' },
  },
  {
    id: 'g06',
    kind: 'photo',
    src: '/images/formation/formation-06.jpg',
    width: 1064,
    height: 1081,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: "Atelier sur les risques détectés par l'IA", en: 'Workshop on AI-detected risks' },
  },
  {
    id: 'g07',
    kind: 'photo',
    src: '/images/formation/formation-07.jpg',
    width: 1064,
    height: 1084,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: 'Prise de parole en session', en: 'Speaking during the session' },
  },
  {
    id: 'g08',
    kind: 'photo',
    src: '/images/formation/formation-08.jpg',
    width: 1062,
    height: 1062,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: 'Remise du livre', en: 'Presenting the book' },
  },
  {
    id: 'g09',
    kind: 'photo',
    src: '/images/formation/formation-09.jpg',
    width: 944,
    height: 1264,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: 'Cas pratique en direct', en: 'Live practical exercise' },
  },
  {
    id: 'v01',
    kind: 'video',
    src: '/videos/formation-01.mp4',
    poster: '/images/formation/formation-video-01-poster.jpg',
    width: 720,
    height: 1280,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: 'Préparatifs de session', en: 'Session setup' },
  },
  {
    id: 'v02',
    kind: 'video',
    src: '/videos/formation-02.mp4',
    poster: '/images/formation/formation-video-02-poster.jpg',
    width: 720,
    height: 1280,
    country: { fr: 'À confirmer', en: 'To confirm' },
    caption: { fr: "L'IA sur le cycle de vie du projet", en: 'AI across the project lifecycle' },
  },
];
