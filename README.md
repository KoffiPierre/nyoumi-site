# Nyoumi Mballa — Site (Next.js / TypeScript / FR-EN)

Site vitrine multi-pages, bilingue (Français / Anglais), construit en **Next.js 14 (App Router) + TypeScript**, avec une couche de contenu entièrement typée et séparée de l'affichage.

**Direction créative : sobre et classique.** Typographie sérieuse (Source Serif 4 + Inter), palette neutre avec un seul accent (vert profond), mise en page simple et lisible. Aucune métaphore visuelle appuyée (pas de "fiche technique", pas de jargon d'ingénieur) — le site se concentre sur le contenu et la crédibilité professionnelle.

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

Toutes les dépendances sont épinglées en version exacte dans `package.json` (pas de `^`) pour éviter tout conflit de résolution au déploiement.

---

## Bilinguisme FR / EN

Le site utilise le système de routing par segment de locale de Next.js (`app/[locale]/...`) :

- `/fr/...` et `/en/...` sont deux jeux de pages statiques générés au build (17 pages au total).
- `middleware.ts` redirige automatiquement `/` vers `/fr` (ou `/en` selon la langue du navigateur).
- Le sélecteur de langue (`components/LocaleSwitcher.tsx`, header) bascule vers l'équivalent exact de la page courante.
- Tout le contenu existe en double, typé, dans `/data` et `/lib/dictionary.ts`.

---

## Architecture

```
nyoumi-site/
├── middleware.ts              → détection/redirection de langue
├── app/
│   ├── globals.css             → tokens de design (couleurs, typo, espacements)
│   └── [locale]/                → toutes les routes (fr/en)
│       ├── layout.tsx            → layout racine : <html lang>, polices, header/footer
│       ├── page.tsx               → Accueil
│       ├── parcours/page.tsx      → Parcours (timeline verticale)
│       ├── expertise/page.tsx     → Expertise technique
│       ├── formation/page.tsx     → Formation de cadres (Afrique Compétences)
│       ├── presse/page.tsx        → Presse & médias
│       ├── ouvrage/page.tsx       → Ouvrage & publications
│       ├── contact/page.tsx       → Contact (formulaire + coordonnées)
│       └── not-found.tsx          → 404 sur mesure, bilingue
│
├── components/
│   ├── SiteHeader.tsx, SiteFooter.tsx, LocaleSwitcher.tsx
│   ├── Hero.tsx                  → nom, accroche, portrait, deux boutons
│   ├── Lightbox.tsx               → clic pour agrandir une image (presse, formation)
│   ├── PillarGrid.tsx, Timeline.tsx, SkillGrid.tsx, PressGrid.tsx, BookFeature.tsx
│   ├── ContactForm.tsx            → formulaire avec validation (client component)
│   ├── PullQuote.tsx              → citation en exergue
│   └── Section.tsx, SectionHead.tsx, PageHeader.tsx
│
├── data/                    ★ LE CONTENU ÉDITORIAL — tout est ici, dupliqué fr/en
│   ├── profile.ts, pillars.ts, timeline.ts, skills.ts, press.ts, publications.ts
│   └── training.ts             → pays formés, infos Afrique Compétences
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

## Cliquer pour agrandir (Lightbox)

Les vignettes de presse (`/presse`) et les photos de formation (`/formation`) s'ouvrent en plein écran, en pleine résolution, au clic — via `components/Lightbox.tsx`. Fermeture au clic extérieur ou à la touche Échap.

## Formulaire de contact

`components/ContactForm.tsx` valide les champs puis ouvre un `mailto:` pré-rempli. Pour un vrai envoi serveur sur Vercel :

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
    subject: subject || `Message de ${name}`,
    replyTo: email,
    text: message,
  });
  return Response.json({ ok: true });
}
```

Puis remplacer le `window.location.href = mailto:...` dans `ContactForm.tsx` par un `fetch('/api/contact', ...)`.

## Ce qui est déjà géré

- **TypeScript strict** de bout en bout, y compris la cohérence fr/en (`Record<Locale, ...>`).
- **Bilingue** : 17 pages statiques générées au build, redirection automatique, sélecteur de langue qui préserve la page courante.
- **Responsive complet**.
- **Accessibilité** : focus visible, `prefers-reduced-motion` respecté.
- **SEO par page et par langue** : chaque route exporte ses propres `metadata`.
- **Performance** : `next/image`, CSS Modules, build 100% statique.

## Suggestions pour la suite (non incluses)

- Favicon + image Open Graph (1200×630), déclinée fr/en.
- Branchement réel du formulaire de contact (voir ci-dessus).
- D'autres photos si le client souhaite enrichir davantage certaines pages.
