
import React, { useEffect, useRef } from 'react';

interface HeroProps {
  translations: {
    title: string;
    subtitle: string;
    cta: string;
  }
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const offset = window.scrollY * 0.4;
        imageRef.current.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden bg-brand-dark">
      {/* Background Image with Parallax */}
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        alt="Modern professional workspace focused on business growth and strategy."
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: 'scale(1.1)' }}
        loading="lazy"
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-brand-dark/60 z-1"></div>
      
      {/* Gradient for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-2"></div>

      {/* Decorative Bottom Border/Separator */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-accent/30 to-transparent z-10"></div>

      <div className="relative z-10 p-6">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down" style={{ animationDelay: '200ms' }} dangerouslySetInnerHTML={{ __html: translations.title.replace('sur-mesure', `<span class="text-brand-accent">sur-mesure</span>`).replace('custom', `<span class="text-brand-accent">custom</span>`).replace('مخصصة', `<span class="text-brand-accent">مخصصة</span>`) }}>
        </h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-brand-light animate-fade-in-up" style={{ animationDelay: '400ms' }}>
          {translations.subtitle}
        </p>
        <button 
          onClick={onQuoteClick}
          className="bg-brand-accent text-brand-dark font-bold py-4 px-10 rounded-md text-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 inline-block shadow-lg shadow-brand-accent/20 animate-fade-in-up"
          style={{ animationDelay: '600ms' }}
        >
          {translations.cta}
        </button>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-bounce opacity-70">
        <span className="text-[10px] uppercase tracking-[0.3em] font-bold mb-2 text-brand-accent">Scroll</span>
        <svg className="w-6 h-6 text-brand-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
