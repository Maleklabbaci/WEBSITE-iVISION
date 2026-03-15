// Simple client-side router pour React + Vite
export type Route = 
  | { type: 'home' }
  | { type: 'blog' }
  | { type: 'blog-post'; slug: string }
  | { type: 'service'; slug: string }
  | { type: 'quote' };

export const parseRoute = (): Route => {
  const hash = window.location.hash.slice(1) || '/';
  
  if (hash === '/' || hash === '') return { type: 'home' };
  if (hash === '/blog') return { type: 'blog' };
  if (hash.startsWith('/blog/')) return { type: 'blog-post', slug: hash.replace('/blog/', '') };
  if (hash.startsWith('/services/')) return { type: 'service', slug: hash.replace('/services/', '') };
  if (hash === '/quote') return { type: 'quote' };
  
  return { type: 'home' };
};

export const navigate = (route: string) => {
  window.location.hash = route;
};

export const getCanonicalUrl = (route: Route): string => {
  const base = 'https://ivision-agency.com';
  
  switch (route.type) {
    case 'home': return base;
    case 'blog': return `${base}/blog`;
    case 'blog-post': return `${base}/blog/${route.slug}`;
    case 'service': return `${base}/services/${route.slug}`;
    case 'quote': return `${base}/quote`;
    default: return base;
  }
};
