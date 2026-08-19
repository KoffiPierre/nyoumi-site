# Nyoumi Mballa — Site (Next.js / TypeScript / FR-EN)

Site vitrine multi-pages, bilingue (Français / Anglais), construit en **Next.js 14 (App Router) + TypeScript**, avec une couche de contenu entièrement typée et séparée de l'affichage.

**Direction créative : "Plans".** Le site emprunte au vocabulaire du plan technique d'ingénieur — cartouche de dessin, portrait annoté façon figure de brevet, parcours lu comme un journal des révisions, fiche technique pour les domaines d'expertise.

## Démarrage local

```bash
npm install
npm run dev
```

→ http://localhost:3000 (redirige automatiquement vers `/fr`)

```bash
npm run build   # build de production
npm run start   # sert le build de production en local
```

## Déploiement sur Vercel

```bash
npm i -g vercel
vercel deploy --prod
```

Vercel détecte automatiquement Next.js — aucune configuration additionnelle n'est nécessaire.

---

## Bilinguisme FR / EN

Le site utilise le système de routing par segment de locale de Next.js (`app/[locale]/...`), le standard recommandé pour l'i18n en App Router :

- `/fr/...` et `/en/...` sont deux jeux de pages statiques générés au build (14 pages au total : 7 routes × 2 langues).
- `middleware.ts` redirige automatiquement `/` vers `/fr` (ou `/en` si le navigateur du visiteur envoie `Accept-Language: en`).
- Le sélecteur de langue (`components/LocaleSwitcher.tsx`, en haut à droite du header) bascule vers l'équivalent exact de la page courante dans l'autre langue.
- Tout le contenu — données ET textes d'interface — existe en double, typé, dans `/data` et `/lib/dictionary.ts`. Il n'y a aucun texte codé en dur dans un composant.

### Ajouter une troisième langue (ex. arabe)

1. Ajouter `'ar'` à `locales` dans `lib/i18n.ts`.
2. Ajouter la clé `ar: {...}` dans `lib/dictionary.ts` et dans chaque fichier `data/*.ts` (`profileByLocale`, `pillarsByLocale`, etc.).
3. Ajouter `ar: {...}` dans les objets `copy` en tête de chaque `page.tsx`.

TypeScript signalera à la compilation tout endroit où la nouvelle langue manque, grâce aux types `Record<Locale, ...>`.

---

## Architecture

```
nyoumi-site/
├── middleware.ts              → détection/redirection de langue
├── app/
│   ├── globals.css             → tokens de design (couleurs, typo, espacements)
│   └── [locale]/                → TOUTES les routes vivent ici (fr/en)
│       ├── layout.tsx            → vrai layout racine : <html lang>, polices, header/footer
│       ├── page.tsx               → Accueil
│       ├── parcours/page.tsx      → Parcours (journal des révisions)
│       ├── expertise/page.tsx     → Expertise technique
│       ├── formation/page.tsx     → Formation de cadres (Afrique Compétences) — NOUVEAU
│       ├── presse/page.tsx        → Presse & médias
│       ├── ouvrage/page.tsx       → Ouvrage & publications
│       ├── contact/page.tsx       → Contact (formulaire + coordonnées)
│       └── not-found.tsx          → 404 sur mesure, bilingue
│
├── components/                 → chaque composant reçoit `locale` en prop quand il affiche
│   │                              du contenu localisé (voir tableau ci-dessous)
│   ├── SiteHeader.tsx, SiteFooter.tsx, LocaleSwitcher.tsx
│   ├── Hero.tsx                  → cartouche + portrait annoté (éléments signature)
│   ├── TitleBlock.tsx             → cartouche technique réutilisable
│   ├── PillarGrid.tsx, Timeline.tsx, SkillGrid.tsx, PressGrid.tsx, BookFeature.tsx, Sommaire.tsx
│   ├── ContactForm.tsx            → formulaire avec validation (client component)
│   ├── FolioRail.tsx              → index de marge à scroll-spy (accueil)
│   ├── PullQuote.tsx, DimensionDivider.tsx, Folio.tsx
│   └── Section.tsx, SectionHead.tsx, PageHeader.tsx
│
├── data/                    ★ LE CONTENU ÉDITORIAL — tout est ici, dupliqué fr/en
│   ├── profile.ts             → profileByLocale: Record<Locale, Profile>
│   ├── pillars.ts, timeline.ts, skills.ts, press.ts, publications.ts, sommaire.ts
│   └── training.ts             → pays formés, infos Afrique Compétences — NOUVEAU
│
├── lib/
│   ├── i18n.ts                 → locales disponibles, langue par défaut
│   ├── dictionary.ts            → tous les textes d'interface (boutons, libellés, formulaires)
│   └── nav.ts                   → liens de navigation, localisés
│
├── types/content.ts          → interfaces TypeScript (dont `Locale = 'fr' | 'en'`)
└── public/images/             → portrait, photos de formation, couverture du livre, scans presse
```

### Le contenu ne vit nulle part ailleurs que dans `/data` et `/lib/dictionary.ts`

| Tu veux changer... | Tu modifies... |
|---|---|
| Le texte d'intro, l'email, le téléphone | `data/profile.ts` (les deux clés `fr` et `en`) |
| Une étape du parcours | `data/timeline.ts` |
| Une compétence | `data/skills.ts` |
| Un article de presse | `data/press.ts` |
| Le livre / les publications | `data/publications.ts` |
| Les pays formés / infos Afrique Compétences | `data/training.ts` |
| Un bouton, un libellé d'interface | `lib/dictionary.ts` |
| Un lien de navigation | `lib/nav.ts` |
| Les couleurs, la typo | `app/globals.css` (variables `:root`) |

TypeScript prévient à la compilation si une langue manque quelque part (`Record<Locale, ...>` impose les deux clés `fr` et `en`).

---

## Les éléments signature ("Plans")

**`TitleBlock`** — le cartouche de dessin technique, repris dans le hero, le footer et la fiche du livre : Projet / Dessiné par / Date / Échelle / Feuille, rempli avec les vraies infos.

**Portrait annoté** — dans le hero, le portrait est légendé comme une figure de brevet, avec des rappels numérotés pointant vers ses faits clés (doctorat, ingénieur d'État, blockchain, formateur de cadres).

**`Timeline` → journal des révisions** — le parcours se lit comme l'historique de modifications d'un plan technique (REV. A, B, C...).

**`PillarGrid` → fiche technique** — les domaines d'expertise en tableau de spécifications (§01, §02...).

**`PressGrid` → annexes** — les articles de presse avec tampon "PJ" (pièce jointe).

**`FolioRail`** — index de marge à gauche (desktop large, ≥1480px) qui suit le scroll et affiche "01/06", "02/06"...

## Nouvelle page : Formation de cadres

`/formation` présente l'activité de formateur pour Afrique Compétences : introduction, cartouche programme (client, thème, dates), liste des huit pays représentés (Sénégal, Guinée, Tchad, Cameroun, Maroc, Burkina Faso, Congo, Gabon), et une galerie de deux photos de session.

## Formulaire de contact

`components/ContactForm.tsx` valide les champs puis ouvre un `mailto:` pré-rempli — un filet fonctionnel, pas la solution finale. Pour un vrai envoi serveur sur Vercel :

```bash
npm install resend
```

```ts
// app/api/contact/route.ts
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();
  await resend.emails.send({
    from: 'contact@tondomaine.com',
    to: 'youmi.dieu95@gmail.com',
    subject: subject || `Contact — ${name}`,
    replyTo: email,
    text: message,
  });
  return Response.json({ ok: true });
}
```

## Ce qui est déjà géré

- **TypeScript strict** de bout en bout, y compris la cohérence fr/en (`Record<Locale, ...>`).
- **Bilingue** : 14 pages statiques générées au build, redirection automatique, sélecteur de langue qui préserve la page courante.
- **Responsive complet**, FolioRail masqué sous 1480px.
- **Accessibilité** : focus visible, `prefers-reduced-motion` respecté.
- **SEO par page et par langue** : chaque route exporte ses propres `metadata` selon la locale.
- **Performance** : `next/image`, CSS Modules, build 100% statique.

## Suggestions pour la suite (non incluses)

- Favicon + image Open Graph (1200×630), déclinée fr/en.
- Branchement réel du formulaire de contact (voir ci-dessus).
- `hreflang` avancé / sitemap.xml multilingue si le référencement international devient prioritaire.
