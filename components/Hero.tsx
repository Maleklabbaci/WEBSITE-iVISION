
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  translations: {
    title: string;
    subtitle: string;
    cta: string;
  }
  onQuoteClick: () => void;
}

const FloatingCard: React.FC<{ children: React.ReactNode, className: string, delay: string }> = ({ children, className, delay }) => (
  <div 
    className={`absolute hidden lg:flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl ${className}`}
    style={{ 
      animationDelay: delay, 
      animationDuration: '3s', 
      animationIterationCount: 'infinite', 
      animationTimingFunction: 'ease-in-out', 
      animationName: 'float' 
    }}
  >
    {children}
  </div>
);

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const imageRef = useRef<HTMLImageElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (imageRef.current) {
        const offset = window.scrollY * 0.4;
        imageRef.current.style.transform = `translateY(${offset}px) scale(1.15)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // We don't unobserve here if we want it to potentially re-animate, 
          // but for hero, once is usually better for UX.
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

  return (
    <section 
      id="accueil" 
      ref={sectionRef}
      className="relative min-h-[110vh] flex items-center justify-center text-white text-center overflow-hidden bg-brand-dark"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); }
          50% { transform: translateY(-20px) translateX(10px); }
        }
      `}</style>

      {/* Background Image with Parallax */}
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        alt="Modern professional workspace"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-out will-change-transform opacity-40"
        style={{ transform: 'scale(1.15)' }}
        loading="lazy"
      />
      
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-brand-dark/40 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark z-[2]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/60 via-transparent to-brand-dark/60 z-[2]"></div>

      {/* Decorative Light Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-accent/20 blur-[120px] rounded-full z-[1] animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full z-[1] animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Tagline Badge */}
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-down opacity-100' : 'opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            E-commerce Growth Partner
          </div>

          {/* Glassmorphism Card Wrapper */}
          <div className={`relative p-8 md:p-16 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-sm shadow-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <h1 
              className={`text-4xl md:text-7xl font-black leading-[1.1] mb-8 tracking-tighter transition-all duration-1000 ${isVisible ? 'animate-fade-in-down opacity-100' : 'opacity-0'}`}
              style={{ animationDelay: '200ms' }} 
              dangerouslySetInnerHTML={{ 
                __html: translations.title
                  .replace('sur-mesure', `<span class="text-brand-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">sur-mesure</span>`)
                  .replace('custom', `<span class="text-brand-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">custom</span>`)
                  .replace('مخصصة', `<span class="text-brand-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.5)]">مخصصة</span>`) 
              }}
            >
            </h1>

            <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-12 text-brand-gray font-medium leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              {translations.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <button 
                onClick={onQuoteClick}
                className="group relative bg-brand-accent text-brand-dark font-black py-5 px-12 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(56,189,248,0.3)] hover:shadow-brand-accent/50"
              >
                <span className="relative z-10">{translations.cta}</span>
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              
              <a href="#portfolio" className="text-sm font-bold uppercase tracking-widest text-brand-light hover:text-brand-accent transition-colors flex items-center gap-2">
                Voir nos travaux
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Floating Elements */}
          <FloatingCard className={`top-[15%] left-[5%] ltr:flex rtl:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`} delay="0s">
            <div className="bg-brand-accent/20 p-2 rounded-lg text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="text-left">
              <div className="text-xl font-black">+350%</div>
              <div className="text-[10px] uppercase font-bold text-brand-gray tracking-tighter">ROI Publicitaire</div>
            </div>
          </FloatingCard>

          <FloatingCard className={`bottom-[20%] right-[2%] ltr:flex rtl:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`} delay="1s">
            <div className="bg-brand-accent/20 p-2 rounded-lg text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
            <div className="text-left">
              <div className="text-xl font-black">24/7</div>
              <div className="text-[10px] uppercase font-bold text-brand-gray tracking-tighter">Support Client</div>
            </div>
          </FloatingCard>

          {/* Arabic Floating elements (mirrored) */}
          <FloatingCard className={`top-[15%] right-[5%] rtl:flex ltr:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`} delay="0s">
             <div className="text-right">
              <div className="text-xl font-black">+350%</div>
              <div className="text-[10px] uppercase font-bold text-brand-gray tracking-tighter">عائد الاستثمار</div>
            </div>
            <div className="bg-brand-accent/20 p-2 rounded-lg text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
          </FloatingCard>

          <FloatingCard className={`bottom-[20%] left-[2%] rtl:flex ltr:hidden ${isVisible ? 'opacity-100' : 'opacity-0'}`} delay="1s">
            <div className="text-right">
              <div className="text-xl font-black">نمو</div>
              <div className="text-[10px] uppercase font-bold text-brand-gray tracking-tighter">مستمر للمبيعات</div>
            </div>
            <div className="bg-brand-accent/20 p-2 rounded-lg text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </div>
          </FloatingCard>

        </div>
      </div>

      {/* Scroll Down Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase font-black tracking-[0.5em] mb-4 text-brand-accent">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
