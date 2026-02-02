
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

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      id="accueil" 
      className="relative min-h-screen flex items-center justify-center bg-brand-dark pt-20 overflow-hidden"
    >
      {/* Decorative Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/10 rounded-full blur-[120px] animate-slow-float"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-brand-accent/5 rounded-full blur-[100px] animate-slow-float" style={{ animationDelay: '2s' }}></div>

      <div className="container relative z-10 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className={`inline-block mb-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-brand-accent/80 border-b border-brand-accent/20 pb-2">
              {translations.badge}
            </span>
          </div>

          <h1 
            className={`text-4xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] mb-8 tracking-tighter transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
            style={{ transitionDelay: '200ms' }}
            dangerouslySetInnerHTML={{ 
              __html: translations.title
                .replace('sur-mesure', `<span class="text-brand-accent font-black italic">sur-mesure</span>`)
                .replace('custom', `<span class="text-brand-accent font-black italic">custom</span>`)
                .replace('مخصصة', `<span class="text-brand-accent font-black italic">مخصصة</span>`) 
            }}
          />

          <p className={`text-lg md:text-xl text-brand-gray max-w-2xl mx-auto mb-12 font-light leading-relaxed transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '400ms' }}>
            {translations.subtitle}
          </p>

          <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '600ms' }}>
            <button 
              onClick={onQuoteClick}
              className="bg-white text-brand-dark font-bold py-5 px-14 rounded-full text-[12px] uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 shadow-2xl hover:shadow-white/10"
            >
              {translations.cta}
            </button>
            
            <a href="#portfolio" className="text-[11px] font-bold uppercase tracking-[0.3em] text-white/60 hover:text-white transition-all">
              {translations.secondaryCta}
            </a>
          </div>
        </div>
      </div>

      {/* Background visual - very subtle grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
    </section>
  );
};

export default Hero;
