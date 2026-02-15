
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
  const [isVisible, setIsVisible] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const formatTitle = (title: string) => {
    return title
      .replace('sur-mesure', '<span class="text-brand-accent">sur-mesure</span>')
      .replace('custom', '<span class="text-brand-accent">custom</span>')
      .replace('مخصصة', '<span class="text-brand-accent">مخصصة</span>');
  };

  // Content & Growth themed images
  const bgImages = [
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop", // Data/Growth
    "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1000&auto=format&fit=crop", // Agency/Team
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop", // Content/Social
    "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=1000&auto=format&fit=crop"  // Performance
  ];

  return (
    <section 
      id="accueil" 
      className="relative min-h-[90vh] md:min-h-screen flex items-center justify-center text-white text-center bg-brand-dark overflow-hidden"
    >
      {/* Dynamic Background Montage */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 grid grid-cols-2 grid-rows-2 opacity-20 grayscale hover:grayscale-0 transition-all duration-1000"
          style={{ 
            transform: `translateY(${scrollY * 0.1}px) scale(1.1)`,
          }}
        >
          {bgImages.map((img, i) => (
            <div key={i} className="relative w-full h-full overflow-hidden border border-white/5">
              <img 
                src={img} 
                alt="" 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-brand-dark/60 backdrop-blur-[2px] z-[1]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-transparent to-brand-dark z-[2]"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark z-[2]"></div>
      </div>

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto">
          
          <div className={`inline-flex items-center gap-3 px-5 py-2 rounded-full border border-brand-accent/20 bg-brand-accent/5 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            {translations.badge}
          </div>

          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black mb-10 tracking-tighter leading-[1.05] transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            dangerouslySetInnerHTML={{ __html: formatTitle(translations.title) }}
          />

          <p className={`text-lg md:text-2xl max-w-2xl mx-auto mb-16 text-brand-gray/90 font-medium leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {translations.subtitle}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <button 
              onClick={onQuoteClick}
              className="w-full sm:w-auto group relative overflow-hidden bg-brand-accent text-brand-dark font-black py-5 px-14 rounded-2xl text-[13px] transition-all hover:scale-105 active:scale-95 uppercase tracking-widest shadow-[0_20px_40px_rgba(56,189,248,0.25)]"
            >
              <span className="relative z-10">{translations.cta}</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
            </button>
            
            <a href="#process" className="text-[11px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-brand-accent transition-all flex items-center gap-3 group">
              {translations.secondaryCta}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block opacity-30">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white rounded-full"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
