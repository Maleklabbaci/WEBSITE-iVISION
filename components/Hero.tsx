
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
        // Décalage de l'image à 40% de la vitesse du scroll pour l'effet parallaxe
        const offset = window.scrollY * 0.4;
        // On conserve le scale(1.1) pour éviter les bords noirs et on ajoute la translation
        imageRef.current.style.transform = `translateY(${offset}px) scale(1.1)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="accueil" className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden bg-brand-dark">
      {/* Background Image with Parallax Ref */}
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1974&auto=format&fit=crop"
        alt="A team of professionals collaborating on a digital project."
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-100 ease-out will-change-transform"
        style={{ transform: 'scale(1.1)' }}
        loading="lazy"
      />
      
      {/* Overlay for readability */}
      <div className="absolute inset-0 bg-brand-dark/60 z-1"></div>
      
      {/* Gradient for smooth transition to the page content */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent z-2"></div>


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
    </section>
  );
};

export default Hero;
