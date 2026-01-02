
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
    <footer ref={footerRef} className={`bg-brand-dark border-t border-brand-border text-brand-gray py-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12">
          <div className="flex flex-col gap-4">
             <a href="#accueil" aria-label="iVISION Home" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-brand-accent text-brand-dark rounded-2xl flex items-center justify-center font-black text-2xl">
                  iV
                </div>
                <div className="flex flex-col -space-y-1">
                  <span className="text-2xl font-black tracking-tighter text-brand-light">
                    iVISION
                  </span>
                  <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand-accent opacity-80">
                    Agency
                  </span>
                </div>
              </a>
             <p className="max-w-xs text-sm leading-relaxed text-brand-gray/80">
               {translations.tagline}
             </p>
          </div>
          
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-x-12 gap-y-4">
            {translations.links.map((link, index) => (
              <a 
                key={link} 
                href={`#${staticLinks[index]}`} 
                className="text-xs font-black uppercase tracking-widest hover:text-brand-accent transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
        
        <div className="border-t border-brand-border mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-brand-gray/40">
          <p>&copy; {year} {translations.copyright}</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-brand-accent transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
