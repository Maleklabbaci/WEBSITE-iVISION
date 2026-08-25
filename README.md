# iVISION Agency

Site officiel de **iVISION Agency**, agence de marketing digital, web, branding et publicité en Algérie.

Site en production : [https://ivision.agency/](https://ivision.agency/)

## Stack technique

Le site est une application front-end construite avec React, TypeScript et Vite. Le routage interne est géré par un routeur léger basé sur le hash afin de rester compatible avec un hébergement statique comme GitHub Pages. Le déploiement GitHub Pages est automatisé par GitHub Actions.

Le chat IA utilise une route serveur `/api/chat` compatible avec Vercel. La clé Gemini est consommée exclusivement côté serveur et n’est jamais injectée dans le bundle public du navigateur.

## Installation locale

Prérequis : Node.js 20 ou supérieur et npm.

```bash
npm install
npm run dev
```

Le serveur de développement est disponible par défaut à l’adresse [http://localhost:3000](http://localhost:3000).

## Vérifications avant publication

```bash
npm run typecheck
npm run build
```

`npm run typecheck` vérifie le code TypeScript sans générer de fichiers. `npm run build` génère la version de production dans `dist/`.

## Configuration du chat IA

Copiez `.env.example` vers `.env.local` pour le développement local :

```bash
cp .env.example .env.local
```

Renseignez ensuite une clé Gemini dans `GEMINI_API_KEY`. Cette variable est utilisée uniquement par `api/chat.ts`. **Ne placez jamais cette clé dans du code client, dans `vite.config.ts` ou dans un fichier versionné.**

Pour le déploiement Vercel, ajoutez `GEMINI_API_KEY` dans les variables d’environnement du projet. Vous pouvez également définir `GEMINI_MODEL` ; à défaut, le modèle `gemini-2.5-flash` est utilisé.

Sur un hébergement strictement statique, le site reste fonctionnel, mais le chat IA affiche un message d’indisponibilité tant qu’aucune route `/api/chat` n’est disponible.

## Formulaires et contacts

Les demandes de devis sont envoyées par WhatsApp. Le numéro de contact centralisé se trouve dans `lib/config.ts`. Les liens de contact doivent être testés avant chaque mise en production, notamment sur mobile.

## Déploiement GitHub Pages

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`. Le workflow installe les dépendances avec `npm ci`, exécute le contrôle TypeScript, construit l’application et publie le contenu de `dist/` sur GitHub Pages.

Le domaine canonique et les métadonnées SEO utilisent le domaine officiel `ivision.agency`. Si le domaine change, mettez à jour `index.html`, `lib/router.ts` et les pages qui définissent un canonical dynamique.

## Structure principale

```text
App.tsx                    Shell de l’application et routage
components/                Sections et pages React réutilisables
data/                      Données des services et articles
lib/config.ts              Paramètres de contact centralisés
lib/router.ts              Routage hash et URLs canoniques
lib/seo-utils.ts           Métadonnées SEO et données structurées
api/chat.ts                Route serveur Gemini compatible Vercel
public/                    Fichiers statiques légers
.github/workflows/         Automatisation de déploiement
```

## Sécurité

Les secrets doivent rester dans les variables d’environnement du fournisseur d’hébergement. Les données envoyées au chat sont limitées côté serveur en nombre de messages et en longueur. Pour une utilisation à fort trafic, ajoutez une limitation de débit par IP ou utilisez un fournisseur de protection applicative.
