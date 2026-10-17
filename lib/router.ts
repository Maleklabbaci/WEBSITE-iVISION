// Simple client-side router pour React + Vite
export type Route =
  | { type: 'home' }
  | { type: 'blog' }
  | { type: 'blog-post'; slug: string }
  | { type: 'service'; slug: string }
  | { type: 'quote' }
  | { type: 'centres' };

export const parseRoute = (): Route => {
  const hash = window.location.hash.slice(1) || '/';

  if (hash === '/' || hash === '') return { type: 'home' };
  if (hash === '/blog') return { type: 'blog' };
  if (hash.startsWith('/blog/')) return { type: 'blog-post', slug: hash.replace('/blog/', '') };
  if (hash.startsWith('/services/')) return { type: 'service', slug: hash.replace('/services/', '') };
  if (hash === '/devis') return { type: 'quote' };       // était /quote → now /devis
  if (hash === '/academiq') return { type: 'centres' };  // manquait

  return { type: 'home' };
};

export const navigate = (route: string) => {
  window.location.hash = route;
};

const legacyServicePages: Record<string, string> = {
  'marketing-digital': '/agence-marketing-digital-algerie.html',
  'production-audiovisuelle': '/creation-contenu-algerie.html',
  'creation-site-web': '/creation-site-web-algerie.html',
  'branding-identite-visuelle': '/agence-marketing-digital-algerie.html',
};

export const getLegacyServicePage = (slug: string): string | null => legacyServicePages[slug] || null;

export const getCanonicalUrl = (route: Route): string => {
  const base = 'https://ivision.agency';
  // Les fragments # n'identifient pas une ressource distincte pour les moteurs.
  // Les vues historiques du blog et du devis restent des vues de la racine.
  if (route.type === 'service') return `${base}${getLegacyServicePage(route.slug) || '/'}`;
  return `${base}/`;
};
