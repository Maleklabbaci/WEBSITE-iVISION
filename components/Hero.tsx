
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  translations: {
    badge: string;
    title: string;
    subtitle: string;
    cta: string;
    secondaryCta: string;
  }
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollPos, setScrollPos] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollPos(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Nettoyage de la logique de highlight pour éviter les mélanges de langues
  const formatTitle = (title: string) => {
    return title
      .replace('sur-mesure', '<span class="text-brand-accent">sur-mesure</span>')
      .replace('custom', '<span class="text-brand-accent">custom</span>')
      .replace('مخصصة', '<span class="text-brand-accent">مخصصة</span>');
  };

  return (
    <section 
      id="accueil" 
      ref={sectionRef}
      className="relative min-h-[80vh] md:min-h-[90vh] flex items-center justify-center text-white text-center overflow-hidden bg-brand-dark"
    >
      {/* Background Montage - Balanced Opacity */}
      <div className="absolute inset-0 z-0 opacity-[0.15] grid grid-cols-2 grid-rows-2 gap-0 scale-105">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1500"
          alt=""
          className="w-full h-full object-cover grayscale"
          style={{ transform: `translateY(${scrollPos * 0.05}px)` }}
        />
        <img
          src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1500"
          alt=""
          className="w-full h-full object-cover"
          style={{ transform: `translateY(${scrollPos * -0.03}px)` }}
        />
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1500"
          alt=""
          className="w-full h-full object-cover grayscale"
          style={{ transform: `translateY(${scrollPos * 0.04}px)` }}
        />
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1500"
          alt=""
          className="w-full h-full object-cover saturate-0"
          style={{ transform: `translateY(${scrollPos * -0.06}px)` }}
        />
      </div>
      
      {/* Visual Overlays */}
      <div className="absolute inset-0 bg-brand-dark/40 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/10 via-brand-dark/60 to-brand-dark z-[2]"></div>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-brand-dark to-transparent z-[3]"></div>

      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className={`inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-brand-accent/5 border border-brand-accent/20 text-brand-accent text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            {translations.badge}
          </div>

          <div className={`relative p-8 md:p-14 lg:p-20 rounded-[2.5rem] md:rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-[30px] transition-all duration-[1200ms] ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'}`}>
            <h1 
              className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 md:mb-10 tracking-tight transition-all duration-[1500ms] ease-out leading-[1.3] md:leading-[1.2]`}
              style={{ transitionDelay: '200ms' }}
              dangerouslySetInnerHTML={{ __html: formatTitle(translations.title) }}
            >
            </h1>

            <p className={`text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-12 md:mb-16 text-brand-gray/80 font-medium leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
              {translations.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-5 md:gap-10 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
              <button 
                onClick={onQuoteClick}
                className="w-full sm:w-auto group relative bg-brand-accent text-brand-dark font-black py-4 px-12 rounded-xl text-[11px] md:text-[12px] transition-all duration-500 transform hover:scale-105 shadow-[0_15px_35px_rgba(56,189,248,0.2)] uppercase tracking-widest border border-white/10"
              >
                <span className="relative z-10">{translations.cta}</span>
                <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              
              <a href="#process" className="text-[10px] md:text-[11px] font-black uppercase tracking-widest text-white/70 hover:text-brand-accent transition-all flex items-center gap-3 border-b border-white/5 pb-1 hover:border-brand-accent group">
                {translations.secondaryCta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
