import React, { useState, useEffect, useRef } from 'react';

interface FooterProps {
    translations: {
        tagline: string;
        links: string[];
        copyright: string;
    }
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
  const year = new Date().getFullYear();
  const staticLinks = ['accueil', 'services', 'process', 'portfolio'];
  const footerRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );

    const currentRef = footerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <footer ref={footerRef} className={`bg-brand-dark border-t border-brand-border text-brand-gray ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <div className="mb-6 md:mb-0">
             <a href="#accueil" aria-label="iVISION Home" className="text-2xl font-bold tracking-tight text-brand-light mb-2 inline-block">
                i<span className="text-brand-accent">V</span>ISION
              </a>
             <p className="max-w-xs mt-2 text-sm">{translations.tagline}</p>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 mb-6 md:mb-0">
            {translations.links.map((link, index) => (
              <a key={link} href={`#${staticLinks[index]}`} className="hover:text-brand-accent transition-colors">{link}</a>
            ))}
          </div>
        </div>
        <div className="border-t border-brand-border mt-8 pt-6 text-center text-sm">
          <p>&copy; {year} {translations.copyright}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;