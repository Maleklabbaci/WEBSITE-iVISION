
import React, { useEffect, useRef, useState } from 'react';

interface HeroProps {
  translations: {
    title: string;
    subtitle: string;
    cta: string;
  }
  onQuoteClick: () => void;
}

const DraggableFloatingCard: React.FC<{ 
  children: React.ReactNode, 
  className: string, 
  delay: string,
  isVisible: boolean
}> = ({ children, className, delay, isVisible }) => {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialOffset = useRef({ x: 0, y: 0 });

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialOffset.current = { ...offset };
    if (cardRef.current) cardRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setOffset({
      x: initialOffset.current.x + dx,
      y: initialOffset.current.y + dy
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    if (cardRef.current) cardRef.current.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={`absolute hidden lg:flex items-center gap-4 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-5 rounded-[2rem] shadow-2xl select-none cursor-grab active:cursor-grabbing z-30 transition-all duration-[1000ms] ${className} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ 
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        transition: isDragging ? 'transform 0.05s linear, opacity 1s ease' : 'transform 0.6s cubic-bezier(0.18, 0.89, 0.32, 1.28), opacity 1s ease',
        animation: isDragging ? 'none' : `float 4s ease-in-out infinite`,
        animationDelay: delay,
        touchAction: 'none',
        boxShadow: isDragging ? '0 20px 50px rgba(56,189,248,0.2)' : '0 10px 30px rgba(0,0,0,0.3)'
      }}
    >
      {children}
    </div>
  );
};

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
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(10px, -15px); }
        }
      `}</style>

      {/* Background Image with Parallax */}
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        alt="Modern professional workspace"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-out will-change-transform opacity-30"
        style={{ transform: 'scale(1.15)' }}
        loading="lazy"
      />
      
      {/* Dynamic Overlays */}
      <div className="absolute inset-0 bg-brand-dark/40 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-transparent to-brand-dark z-[2]"></div>

      {/* Decorative Light Blobs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-accent/10 blur-[150px] rounded-full z-[1] animate-pulse"></div>

      <div className="container relative z-10 px-6">
        <div className="max-w-5xl mx-auto">
          
          {/* Tagline Badge */}
          <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand-accent/10 border border-brand-accent/20 text-brand-accent text-[10px] font-black uppercase tracking-[0.3em] mb-10 transition-all duration-1000 ${isVisible ? 'animate-fade-in-down opacity-100' : 'opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            E-commerce Growth Partner
          </div>

          {/* Glassmorphism Card Wrapper */}
          <div className={`relative p-8 md:p-20 rounded-[4rem] bg-white/[0.01] border border-white/5 backdrop-blur-md shadow-2xl transition-all duration-[1200ms] ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
            <h1 
              className={`text-4xl md:text-7xl font-black leading-[1.1] mb-10 tracking-tighter transition-all duration-1000 ${isVisible ? 'animate-blur-in opacity-100' : 'opacity-0 translate-y-4'}`}
              style={{ animationDelay: '200ms' }} 
              dangerouslySetInnerHTML={{ 
                __html: translations.title
                  .replace('sur-mesure', `<span class="text-brand-accent">sur-mesure</span>`)
                  .replace('custom', `<span class="text-brand-accent">custom</span>`)
                  .replace('مخصصة', `<span class="text-brand-accent">مخصصة</span>`) 
              }}
            >
            </h1>

            <p className={`text-xl md:text-2xl max-w-2xl mx-auto mb-14 text-brand-gray font-medium leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              {translations.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <button 
                onClick={onQuoteClick}
                className="group relative bg-brand-accent text-brand-dark font-black py-5 px-14 rounded-2xl text-lg transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(56,189,248,0.2)] hover:shadow-brand-accent/40"
              >
                <span className="relative z-10 uppercase tracking-widest">{translations.cta}</span>
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              
              <a href="#portfolio" className="text-xs font-black uppercase tracking-widest text-brand-light hover:text-brand-accent transition-all flex items-center gap-3 border-b border-white/10 pb-1 hover:border-brand-accent">
                Voir nos travaux
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Draggable Stat Cards - LTR */}
          <DraggableFloatingCard isVisible={isVisible} className="top-[10%] left-[2%] ltr:flex rtl:hidden" delay="0s">
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-brand-light">+350%</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-widest">ROI Publicitaire</div>
            </div>
          </DraggableFloatingCard>

          <DraggableFloatingCard isVisible={isVisible} className="bottom-[15%] right-[2%] ltr:flex rtl:hidden" delay="1s">
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-brand-light">24/7</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-widest">Support Client</div>
            </div>
          </DraggableFloatingCard>

          {/* Draggable Stat Cards - RTL (Arabic) */}
          <DraggableFloatingCard isVisible={isVisible} className="top-[10%] right-[2%] rtl:flex ltr:hidden" delay="0s">
             <div className="text-right">
              <div className="text-2xl font-black text-brand-light">+350%</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-widest">عائد الاستثمار</div>
            </div>
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
          </DraggableFloatingCard>

          <DraggableFloatingCard isVisible={isVisible} className="bottom-[15%] left-[2%] rtl:flex ltr:hidden" delay="1s">
            <div className="text-right">
              <div className="text-2xl font-black text-brand-light">نمو</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-widest">مستمر للمبيعات</div>
            </div>
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent shadow-inner">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
            </div>
          </DraggableFloatingCard>

        </div>
      </div>

      {/* Scroll Down Indicator - Hidden on mobile to prevent overlap with links */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center opacity-40 hover:opacity-100 transition-opacity">
        <span className="text-[9px] uppercase font-black tracking-[0.5em] mb-4 text-brand-accent">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand-accent to-transparent"></div>
      </div>
    </section>
  );
};

export default Hero;
