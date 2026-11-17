# Dieudonné Nyoumi Mballa — site officiel

Site bilingue (français / anglais) en **Next.js 15 + TypeScript**, déployé sur **Vercel**, avec un **espace d'administration** (`/admin`) qui permet à Dieudonné de publier lui-même ses activités, photos, vidéos, articles et articles de presse.

- 👉 **Guide pour Dieudonné** (sans code) : [`GUIDE-ADMINISTRATION.md`](./GUIDE-ADMINISTRATION.md)
- 👉 Ce README : pour la personne qui maintient le site (installation, configuration, architecture).

## Démarrage local

```bash
npm install
npm run dev        # http://localhost:3000 → redirige vers /fr
npm run build      # à lancer avant chaque push
```

## Organisation des pages

| Page | Contenu |
|---|---|
| `/` Accueil | Présentation, chiffres clés, institutions, activités à la une, expertise, parcours, ouvrage et presse |
| `/parcours` | Frise chronologique |
| `/expertise` | Domaines et compétences |
| `/activites` | Toutes les activités (filtrables : formations, conférences, rencontres, distinctions) |
| `/activites/[slug]` | Une activité : récit, galerie photo avec visionneuse, vidéos |
| `/publications` | L'ouvrage, l'article technique, et les articles publiés depuis l'admin |
| `/presse`, `/presse/[slug]` | Articles de presse |
| `/contact` | Coordonnées + formulaire (ouvre la messagerie) |

Les anciennes adresses `/formation` et `/ouvrage` redirigent automatiquement vers `/activites` et `/publications#ouvrage`.

## Où est le contenu ?

```
content/                    ★ modifiable depuis /admin (fichiers JSON)
├── activites/*.json        une activité = un fichier (photos, vidéos, textes)
├── publications/*.json     articles & réflexions
├── presse/*.json           articles de presse
└── reglages/
    ├── profil.json         nom, titres, présentation, portrait, coordonnées, chiffres clés, institutions
    ├── parcours.json       étapes de la frise
    └── reseaux.json        réseaux sociaux

data/                       contenu stable, modifiable dans le code uniquement
├── pillars.ts              4 domaines d'expertise
├── skills.ts               compétences détaillées
└── publications.ts         l'ouvrage + l'article technique

public/uploads/             photos envoyées depuis l'admin (et photos des activités)
public/videos/              vidéos .mp4 (compressées en H.264, lecture progressive)
public/admin/               l'application d'administration (Decap CMS) + config.yml
```

Chaque texte traduisible existe en deux champs : `champ` (français, obligatoire) et `champ_en` (anglais, facultatif). Si l'anglais est vide, le français s'affiche sur la version anglaise. La lecture des fichiers est centralisée dans `lib/content.ts`.

---

## ⚙️ Mise en service de l'espace d'administration (à faire une seule fois)

L'admin est [Decap CMS](https://decapcms.org) : chaque « Publier » crée un commit sur la branche `main` de ce dépôt GitHub, et Vercel redéploie le site automatiquement (1 à 2 minutes). Pas de base de données, pas d'abonnement.

### 1. Créer une « OAuth App » GitHub

Sur GitHub : **Settings → Developer settings → OAuth Apps → New OAuth App** (depuis le compte propriétaire du dépôt).

- **Application name** : `Site Dieudonné — Admin`
- **Homepage URL** : `https://VOTRE-DOMAINE`
- **Authorization callback URL** : `https://VOTRE-DOMAINE/api/decap/callback`

Notez le **Client ID**, puis générez un **Client secret**.

> Si le site est accessible sur plusieurs domaines (ex. `xxx.vercel.app` et un nom de domaine), utilisez le domaine principal ; l'admin doit être ouvert depuis ce domaine.

### 2. Ajouter les variables sur Vercel

Projet Vercel → **Settings → Environment Variables** (environnement *Production*) :

| Nom | Valeur |
|---|---|
| `DECAP_GITHUB_CLIENT_ID` | le Client ID |
| `DECAP_GITHUB_CLIENT_SECRET` | le Client secret |
| `NEXT_PUBLIC_SITE_URL` | `https://VOTRE-DOMAINE` (utilisé pour les aperçus de partage) |

Puis **redéployez** (Deployments → … → Redeploy).

### 3. Donner l'accès à Dieudonné

1. Dieudonné crée un compte gratuit sur github.com.
2. Dépôt GitHub → **Settings → Collaborators → Add people** → son identifiant, rôle **Write**.
3. Il accepte l'invitation reçue par email, puis se connecte sur `https://VOTRE-DOMAINE/admin`.

### Le dépôt ou la branche changent ?

Modifiez `repo` et `branch` dans `public/admin/index.html`.

### Tester l'admin en local (sans GitHub)

```bash
npm run build && npm run start
```

```bash
npx decap-server
```

Puis ouvrez http://localhost:3000/admin : en local, l'admin lit et écrit directement les fichiers du dossier (`local_backend`).

---

## Ajouter un réseau social non prévu

Les icônes disponibles (LinkedIn, Facebook, Instagram, YouTube, X, TikTok, WhatsApp, site web) sont dans `components/SocialLinks.tsx`. Pour un autre réseau, ajoutez son icône là, et l'option correspondante dans `public/admin/config.yml` (collection `reglages`, fichier `reseaux`).

## Vidéos lourdes

GitHub limite la taille des fichiers : au-delà d'environ 20 Mo, préférez YouTube (champ « Lien YouTube »). Pour compresser une vidéo avant de l'ajouter au dépôt :

```bash
ffmpeg -i entree.mp4 -vf scale=-2:960 -c:v libx264 -crf 28 -preset slow -c:a aac -b:a 96k -movflags +faststart sortie.mp4
```

## Design

Tokens dans `app/globals.css` : bleu nuit (`--ink`), ivoire (`--paper`), or (`--gold` sur fond clair, `--gold-bright` sur fond sombre). Typographies : Fraunces (titres) et Inter (texte). Responsive, `prefers-reduced-motion` respecté, focus visibles.
