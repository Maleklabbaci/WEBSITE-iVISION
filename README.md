# Vitrine iVISION

Le site public iVISION est l'application React/Vite à la racine du dépôt (`App.tsx`, `components/`, `index.html`). Le build pré-rend l'accueil dans `dist/index.html` (via `scripts/prerender-home.mjs`) ; le navigateur l'hydrate ensuite. Les quatre pages de service en Algérie sont servies en HTML sans JavaScript depuis `public/` : `/agence-marketing-digital-algerie.html`, `/creation-contenu-algerie.html`, `/publicite-meta-google-ads-algerie.html` et `/creation-site-web-algerie.html`. Un guide de décision informatif est accessible à `/choisir-seo-google-ads-meta-algerie.html` : il distingue SEO, Google Ads et Meta Ads sans promettre de classement. Leurs styles communs sont dans `public/seo/landing.css`.

Deux pages distinctes complètent les offres : `/portfolio-sites-web-algerie.html` présente actuellement treize sites avec captures, dont le site d'iVISION identifié comme **projet interne** ; trois sites déjà présents ont reçu une nouvelle capture, sans doublon. Les deux derniers ajouts (Cabinet Noura et Clinique El Chifa) sont des sites santé livrés par l'agence, avec captures et adresses de visite confirmées. Les liens de visite ne figurent que lorsqu'une adresse est connue ; ceux de JawebFlow, eFOLIO et Sawtify restent à confirmer. L'accueil continue de montrer une sélection de quatre sites et n'a pas besoin de reprendre chaque carte du portfolio. Pour ajouter un autre site : si disponible, optimiser sa capture en WebP dans `public/images/`, créer une carte dans la page portfolio, un lien dans la navigation des projets et une entrée `ItemList` dans le JSON-LD ; ne renseigner d'URL externe qu'après confirmation. Lorsqu'une adresse en attente est confirmée, remplacer son message d'attente par un lien de visite et mettre à jour l'entrée `ItemList` ainsi que la liste des URL attendues dans le test. Les tests dans `scripts/check-seo.mjs` vérifient les cartes, les images, la liste structurée et les liens, sans figer le nombre de futurs projets.

`/portfolio-social-media-algerie.html` est une **préparation** qui attend les créations explicitement autorisées par l'utilisateur. Cette page porte `noindex,follow` et n'est pas dans le sitemap tant que la galerie n'a pas de projets réels validés ; ne pas publier de visuels privés de Drive par défaut, ni inventer des campagnes, chiffres ou clients. L'ancien `components/Portfolio.tsx` contient des chiffres non vérifiés et n'est pas utilisé sur ces pages. Lors de l'ajout de créations validées, mettre à jour la galerie, la description, le titre, le test SEO et le sitemap, puis retirer `noindex` après revue.

Les numéros de contact sont centralisés dans `lib/config.ts` (`PHONE_NUMBERS`) : le premier est le numéro WhatsApp principal et sert à tous les liens `wa.me`, les deux sont affichés dans les blocs contact et les pieds de page (React et pages HTML statiques). Pour changer un numéro, modifier ce fichier puis rechercher l'ancien format dans `public/`.

Le parcours « sites web » relie l'accueil et le portfolio à la page d'offre puis à `/#/devis?service=site-web` : ce formulaire de projet est distinct du devis de pack mensuel, et propose aussi un contact par e-mail ou WhatsApp. Les notes internes de benchmark et de pilotage SEO ne sont **ni publiées sur le site, ni intégrées au dépôt public**.

```bash
npm ci --ignore-scripts
npm run dev:site       # développement de la vitrine
npm run validate:site  # TypeScript, build Vite et vérification SEO
npm run preview -- --host 0.0.0.0
```

Le workflow GitHub Pages utilise `validate:site` sur `main` ; une branche de travail ou un PR ne déploie pas le domaine public. **Pour publier sur `ivision.agency`, fusionner la PR contenant les sources : le workflow construit puis déploie `dist/`. Ne pas extraire un ZIP de fichiers construits à la racine du dépôt GitHub.** Ces fichiers (`assets/`, pages HTML et `sitemap.xml` à la racine) ne remplacent ni `npm ci` ni le code source ; ils peuvent créer des conflits avec `index.html`. Le ZIP de fichiers construits est réservé à un autre hébergement statique où l'on dépose directement des fichiers web.

Les fichiers `src/`, `tts/` et `server.ts` concernent Sawtify et ne sont pas nécessaires au build de la vitrine iVISION. Les anciens articles du blog et certaines anciennes fiches à fragment contiennent des affirmations non vérifiées : ne pas les ajouter au sitemap sans revue éditoriale.

---

# Sawtify

## Présentation

Sawtify est une plateforme algérienne de synthèse vocale (Text-to-Speech) nouvelle génération, pensée pour transformer instantanément du texte en voix naturelle et expressive. Conçue pour répondre aux besoins du marché local, elle propose un système de paiement à l'usage (Pay-as-you-go) intégrant les moyens de paiement algériens CIB et Edahabia.

## Pourquoi Sawtify

- **Rapidité** : génération de voix quasi instantanée, sans configuration complexe.
- **Qualité naturelle** : des voix expressives, proches d'une élocution humaine, adaptées à différents contextes d'usage.
- **Accessibilité locale** : paiement simple et sécurisé via CIB et Edahabia, sans besoin de carte internationale.
- **Simplicité d'utilisation** : une interface claire, pensée pour être utilisée sans compétence technique.

## À qui s'adresse Sawtify

- Créateurs de contenu et influenceurs souhaitant produire des voix off rapidement.
- Entreprises et agences ayant besoin de contenus audio pour leurs publicités ou réseaux sociaux.
- Enseignants et formateurs souhaitant vocaliser des supports pédagogiques.
- Toute personne ou structure ayant besoin de convertir du texte en voix, sans matériel ni compétence en enregistrement audio.

## Fonctionnement

1. L'utilisateur crée un compte sur la plateforme.
2. Il saisit ou colle le texte à transformer en voix.
3. Il choisit la voix souhaitée.
4. La génération se fait en quelques secondes.
5. L'audio est disponible en écoute et en téléchargement.

Le système fonctionne sur un modèle de crédits : chaque utilisateur dispose d'un solde qu'il peut recharger selon ses besoins, sans abonnement obligatoire.

## Accès temporaire à Agent IA

Pendant le développement, l'accès à l'espace Agent et à ses API est protégé par un code vérifié par le serveur. Configure `AGENT_ACCESS_CODE` et un `AGENT_ACCESS_SECRET` aléatoire d'au moins 32 caractères dans les variables d'environnement **du serveur uniquement**. Ne place pas ces valeurs dans Supabase, dans une variable `VITE_*`, ni dans le dépôt. Si `AGENT_ACCESS_SECRET` est absent, le serveur utilise `SUPABASE_SERVICE_ROLE_KEY`, mais un secret dédié est préférable.

Le jeton de session expire après 12 heures. Le portail informatif `/agent-ai` reste public. Pour retirer le code partagé plus tard, configure `AGENT_ACCESS_GATE_ENABLED=false` côté serveur. Le schéma de paiement Agent est fourni dans `supabase/agent_sawtify_pricing.sql` et doit être appliqué séparément dans Supabase.

## Contact

Pour toute question, démonstration ou partenariat concernant Sawtify, n'hésitez pas à nous contacter directement.
