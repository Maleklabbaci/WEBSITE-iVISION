# iVISION Agency — Site vitrine

Site vitrine officiel de **iVISION Agency**, agence de marketing digital en Algérie. Le projet présente les services, les réalisations, les résultats, les études de cas, le blog et les parcours de contact.

Le site est une application frontend React + TypeScript + Vite déployée sur GitHub Pages avec un domaine personnalisé. Les formulaires de devis et de formation transmettent les demandes à Formspark ; aucune clé serveur ou API backend n’est nécessaire pour le fonctionnement du site vitrine.

## Stack

- React 19
- TypeScript 5
- Vite 6
- Tailwind CSS compilé localement avec PostCSS
- GitHub Pages et GitHub Actions
- Formspark pour la réception des formulaires

## Installation locale

Pré-requis : Node.js 22 ou version plus récente et npm.

```bash
npm ci
npm run dev
```

Le serveur de développement est disponible par défaut sur `http://localhost:5173`.

## Commandes disponibles

```bash
npm run dev        # lancer le serveur local
npm run typecheck  # vérifier TypeScript
npm run build      # produire la version de production
npm run validate   # typecheck puis build
npm run preview    # prévisualiser le build
npm audit --omit=dev
```

## Formulaires et données

Les formulaires principaux utilisent l’identifiant Formspark configuré dans `lib/config.ts`. Les données collectées servent uniquement à répondre aux demandes commerciales et sont envoyées au prestataire Formspark. Le site contient un consentement explicite et un champ honeypot anti-spam. Ne saisissez jamais de mot de passe ou de donnée bancaire dans les formulaires.

Avant une utilisation commerciale à grande échelle, vérifiez les conditions de Formspark, la durée de conservation des données, les notifications reçues par l’équipe et la politique de confidentialité affichée sur le site.

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`. Le workflow installe les dépendances avec `npm ci`, exécute `npm run validate`, construit l’application et publie `dist/` sur GitHub Pages.

Le domaine officiel est : [https://ivision.agency/](https://ivision.agency/).

Les enregistrements DNS du domaine doivent rester configurés pour GitHub Pages. Le fichier `public/robots.txt` et le sitemap `public/sitemap.xml` déclarent le domaine canonique.

## Structure principale

```text
App.tsx                         Shell, routage hash et pages
components/                     Sections, pages, formulaires et interactions
data/                           Données des services et articles
lib/config.ts                   Identifiants publics et coordonnées partagées
lib/router.ts                   Helpers de routage et URLs canoniques
public/                         Favicon, robots.txt et sitemap.xml
styles.css                      Tailwind compilé et règles d’accessibilité
index.html                      SEO, données structurées et styles globaux
.github/workflows/deploy.yml    Validation et déploiement GitHub Pages
```

## SEO

Le site utilise `https://ivision.agency/` comme domaine canonique, fournit un `robots.txt` et un sitemap. Les pages internes utilisent actuellement un routage hash (`#/blog`, `#/services/...`) afin de rester compatibles avec l’hébergement statique GitHub Pages.

Après une modification importante du site, vérifiez la propriété `ivision.agency` dans Google Search Console et envoyez le sitemap `https://ivision.agency/sitemap.xml`.

## Licence et contenu

Le contenu, la marque, les visuels propriétaires et les données clients appartiennent à iVISION Agency ou à leurs détenteurs respectifs. Vérifiez les droits des images externes utilisées dans le portfolio, le blog et les témoignages avant toute redistribution.
