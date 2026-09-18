# Nyoumi Mballa — Site (Next.js / TypeScript / FR-EN)

Site vitrine multi-pages, bilingue (Français / Anglais), construit en **Next.js 15 + TypeScript**, avec une couche de contenu entièrement typée et séparée de l'affichage.

## Démarrage local

```bash
npm install
npm run dev
```

→ http://localhost:3000 (redirige automatiquement vers `/fr`)

```bash
npm run build   # build de production — à lancer avant chaque push pour repérer les erreurs
npm run start   # sert le build de production en local
```

## Déploiement sur Vercel

Chaque `git push` sur `main` redéploie automatiquement. Aucune configuration Vercel additionnelle n'est nécessaire.

---

## 🖼️ Comment ajouter ou changer des images

**1. Dépose le fichier image** dans le bon dossier de `public/images/` :
   - Photos de formation → `public/images/formation/`
   - Autres photos (portrait, presse, livre...) → `public/images/`

**2. Note ses dimensions.** Sur Windows : clic droit sur le fichier → Propriétés → onglet Détails → "Dimensions". Tu auras besoin de la largeur et la hauteur en pixels.

**3. Ajoute une entrée dans le fichier de données correspondant** — jamais directement dans une page :

Pour la galerie de la page **Formation**, ouvre `data/formationGallery.ts` et ajoute un bloc à la fin du tableau `formationGallery` :

```ts
{
  id: 'g10',                                    // identifiant unique, jamais utilisé ailleurs
  kind: 'photo',
  src: '/images/formation/formation-10.jpg',    // chemin exact du fichier déposé à l'étape 1
  width: 1080,                                   // largeur réelle en pixels (étape 2)
  height: 1350,                                  // hauteur réelle en pixels (étape 2)
  country: { fr: 'Sénégal', en: 'Senegal' },     // pays affiché en bas de la photo
  caption: { fr: 'Session à Dakar', en: 'Session in Dakar' },
},
```

C'est tout — la photo apparaît automatiquement sur `/formation`, dans les deux langues, avec le pays affiché en permanence en bas de l'image, et s'ouvre en grand au clic.

## 🎬 Comment ajouter une vidéo

**1.** Dépose le fichier `.mp4` dans `public/videos/`.

**2.** Génère une image d'aperçu (une image fixe qui s'affiche avant que la vidéo soit lancée). Le plus simple si tu n'as pas d'outil : ouvre la vidéo, fais une capture d'écran d'un moment qui donne envie de cliquer, et enregistre-la dans `public/images/formation/` (par exemple `formation-video-03-poster.jpg`).

**3.** Ajoute une entrée dans `data/formationGallery.ts`, avec `kind: 'video'` et le champ `poster` :

```ts
{
  id: 'v03',
  kind: 'video',
  src: '/videos/formation-03.mp4',
  poster: '/images/formation/formation-video-03-poster.jpg',
  width: 720,                                    // dimensions de l'image d'aperçu (poster)
  height: 1280,
  country: { fr: 'Gabon', en: 'Gabon' },
  caption: { fr: 'Extrait de la session', en: 'Session excerpt' },
},
```

## 🌍 Comment changer le pays (ou la légende) affiché sous une photo

Ouvre `data/formationGallery.ts`. Chaque photo/vidéo a un bloc `country: { fr: '...', en: '...' }`. Modifie simplement le texte entre guillemets.

**Important — à faire avant la mise en ligne définitive :** plusieurs entrées ont actuellement un pays provisoire marqué **"À confirmer"** (ou "Maroc — à confirmer" pour les 4 premières, qui semblent avoir été prises au bureau de Casablanca). Ce sont des valeurs que j'ai mises en attendant que le client précise le vrai pays de chaque photo — à remplacer avant de publier.

---

## 📰 Les articles de presse ouvrent maintenant une vraie page

Avant, cliquer sur une photo de journal l'ouvrait juste en grand par-dessus la page (une "lightbox"). Maintenant, cliquer **redirige vers une page dédiée** à cet article : `/presse/[nom-de-larticle]`.

Pour modifier le contenu d'un article, tout se passe dans `data/press.ts` — rien à toucher dans le code de la page elle-même. Le champ `slug` détermine l'adresse de la page (ex. `slug: 'un-ingenieur-camerounais-en-ia'` → page accessible à `/fr/presse/un-ingenieur-camerounais-en-ia`).

Pour ajouter un troisième article de presse : copie un bloc existant dans `data/press.ts` (dans les deux tableaux `fr` et `en`), donne-lui un nouveau `slug`, dépose l'image du journal dans `public/images/`, et remplis les autres champs. La page à cette adresse se génère automatiquement.

---

## 📱 Comment ajouter ou modifier les réseaux sociaux

Tout se passe dans **un seul fichier : `data/social.ts`**.

**Pour changer un lien existant**, remplace simplement l'URL :

```ts
{
  id: 'linkedin',
  label: 'LinkedIn',
  url: 'https://www.linkedin.com/in/...',   // ← remplace ce lien
},
```

**Pour ajouter Instagram** (ou un autre réseau), ajoute un bloc au tableau :

```ts
{ id: 'instagram', label: 'Instagram', url: 'https://www.instagram.com/tonpseudo/' },
```

L'icône Instagram existe déjà dans `components/SocialLinks.tsx` (elle attend juste qu'une entrée `id: 'instagram'` apparaisse dans `data/social.ts`). Pour tout autre réseau (X/Twitter, YouTube...), il faut aussi ajouter son icône dans ce fichier — demande-le-moi si besoin.

**Pour supprimer un lien**, supprime simplement son bloc du tableau.

Les icônes apparaissent automatiquement dans le pied de page, sur toutes les pages, dans les deux langues.

---

## Architecture générale

```
nyoumi-site/
├── middleware.ts              → détection/redirection de langue (fr/en)
├── app/
│   ├── globals.css             → tokens de design (couleurs, typo, espacements)
│   └── [locale]/                → toutes les routes (fr/en)
│       ├── layout.tsx
│       ├── page.tsx               → Accueil
│       ├── parcours/page.tsx
│       ├── expertise/page.tsx
│       ├── formation/page.tsx     → galerie photos + vidéos
│       ├── presse/page.tsx        → liste des articles
│       ├── presse/[slug]/page.tsx → page dédiée par article — NOUVEAU
│       ├── ouvrage/page.tsx
│       ├── contact/page.tsx
│       └── not-found.tsx
│
├── components/
│   ├── SiteHeader.tsx, SiteFooter.tsx, LocaleSwitcher.tsx
│   ├── SocialLinks.tsx           → icônes réseaux sociaux — NOUVEAU
│   ├── Lightbox.tsx               → agrandissement au clic (photos ET vidéos)
│   ├── Hero.tsx, PillarGrid.tsx, Timeline.tsx, SkillGrid.tsx, PressGrid.tsx, BookFeature.tsx
│   ├── ContactForm.tsx, PullQuote.tsx, Section.tsx, SectionHead.tsx, PageHeader.tsx
│   └── Reveal.tsx
│
├── data/                    ★ LE CONTENU — tout est ici, rien en dur dans le code
│   ├── profile.ts, pillars.ts, timeline.ts, skills.ts, publications.ts
│   ├── press.ts                  → articles de presse (avec `slug` pour la page dédiée)
│   ├── training.ts                → infos générales Afrique Compétences
│   ├── formationGallery.ts        → galerie photos/vidéos de formation — NOUVEAU
│   └── social.ts                  → liens réseaux sociaux — NOUVEAU
│
├── lib/
│   ├── i18n.ts, dictionary.ts, nav.ts
│
├── types/content.ts
└── public/
    ├── images/                    → portrait, presse, livre...
    │   └── formation/              → photos de formation
    └── videos/                     → vidéos de formation — NOUVEAU
```

## Ce qui est déjà géré

- **TypeScript strict**, cohérence fr/en garantie à la compilation.
- **0 vulnérabilité** (`npm audit`) — dépendances à jour et verrouillées.
- **Bilingue**, **responsive**, **accessible** (focus visible, `prefers-reduced-motion`).
- **SEO** : `metadata` par page et par langue, y compris pour chaque article de presse.

## Formulaire de contact

`components/ContactForm.tsx` ouvre un `mailto:` pré-rempli. Pour un vrai envoi serveur, voir la section correspondante dans l'historique du projet ou demande-le-moi.

## Suggestions pour la suite

- Confirmer le vrai pays pour chaque photo/vidéo de formation (voir section dédiée ci-dessus).
- Ajouter le lien Instagram dans `data/social.ts` dès qu'il est disponible.
- Favicon + image Open Graph (1200×630), déclinée fr/en.
