// Simple client-side router pour React + Vite
export type Route =
  | { type: 'home' }
  | { type: 'blog' }
  | { type: 'blog-post'; slug: string }
  | { type: 'service'; slug: string }
  | { type: 'quote'; service?: 'site-web' }
  | { type: 'centres' };

export const parseRoute = (): Route => {
  const hash = window.location.hash.slice(1) || '/';
  const [path, query = ''] = hash.split('?');

  if (path === '/' || path === '') return { type: 'home' };
  if (path === '/blog') return { type: 'blog' };
  if (path.startsWith('/blog/')) return { type: 'blog-post', slug: path.replace('/blog/', '') };
  if (path.startsWith('/services/')) return { type: 'service', slug: path.replace('/services/', '') };
  if (path === '/devis') {
    return new URLSearchParams(query).get('service') === 'site-web'
      ? { type: 'quote', service: 'site-web' }
      : { type: 'quote' };
  }
  if (path === '/academiq') return { type: 'centres' };

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
