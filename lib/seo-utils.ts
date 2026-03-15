export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonical?: string;
}

export const updateSEO = (data: SEOData) => {
  // Title
  document.title = `${data.title} | iVISION Agency`;
  
  // Meta description
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', data.description);
  
  // Keywords
  if (data.keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', data.keywords);
  }
  
  // OG Tags
  updateOGTag('og:title', data.title);
  updateOGTag('og:description', data.description);
  updateOGTag('og:type', data.ogType || 'website');
  if (data.ogImage) updateOGTag('og:image', data.ogImage);
  if (data.canonical) updateOGTag('og:url', data.canonical);
  
  // Twitter Cards
  updateOGTag('twitter:card', 'summary_large_image');
  updateOGTag('twitter:title', data.title);
  updateOGTag('twitter:description', data.description);
  if (data.ogImage) updateOGTag('twitter:image', data.ogImage);
  
  // Canonical
  if (data.canonical) {
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', data.canonical);
  }
};

const updateOGTag = (property: string, content: string) => {
  let tag = document.querySelector(`meta[property="${property}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('property', property);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
};

export const generateBlogSchema = (post: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": post.image,
    "datePublished": post.date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "iVISION Agency",
      "logo": {
        "@type": "ImageObject",
        "url": "https://ivision-agency.com/logo.png"
      }
    }
  };
};

export const generateServiceSchema = (service: any) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": service.title,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": "iVISION Agency"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Algeria"
    }
  };
};
