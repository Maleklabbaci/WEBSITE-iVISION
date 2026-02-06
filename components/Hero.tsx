
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
    setOffset({ x: 0, y: 0 });
    if (cardRef.current) cardRef.current.releasePointerCapture(e.pointerId);
  };

  return (
    <div 
      ref={cardRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      className={`absolute hidden lg:flex items-center gap-3 bg-brand-dark/80 backdrop-blur-3xl border border-white/10 p-4 rounded-2xl shadow-2xl select-none cursor-grab active:cursor-grabbing z-30 transition-all duration-[1000ms] ${className} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ 
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        transition: isDragging ? 'transform 0.05s linear, opacity 1s ease' : 'transform 2.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
        animation: isDragging ? 'none' : `float 6s ease-in-out infinite`,
        animationDelay: delay,
        touchAction: 'none',
      }}
    >
      {children}
    </div>
  );
};

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

  return (
    <section 
      id="accueil" 
      ref={sectionRef}
      className="relative min-h-[75vh] md:min-h-[80vh] flex items-center justify-center text-white text-center overflow-hidden bg-brand-dark"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, -15px); }
        }
      `}</style>

      {/* Background Montage - Multi-images Growth Theme */}
      <div className="absolute inset-0 z-0 opacity-[0.18] grid grid-cols-2 grid-rows-2 gap-4 scale-110">
        <img
          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200"
          alt="Growth Chart"
          className="w-full h-full object-cover transition-transform duration-[3s] ease-out"
          style={{ transform: `translateY(${scrollPos * 0.1}px)` }}
        />
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200"
          alt="Dashboard"
          className="w-full h-full object-cover transition-transform duration-[4s] ease-out"
          style={{ transform: `translateY(${scrollPos * -0.05}px)` }}
        />
        <img
          src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?q=80&w=1200"
          alt="E-commerce Sales"
          className="w-full h-full object-cover transition-transform duration-[3.5s] ease-out"
          style={{ transform: `translateY(${scrollPos * 0.08}px)` }}
        />
        <img
          src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200"
          alt="Marketing Team"
          className="w-full h-full object-cover transition-transform duration-[5s] ease-out"
          style={{ transform: `translateY(${scrollPos * -0.12}px)` }}
        />
      </div>
      
      {/* Dense overlays to fill space and lead eye */}
      <div className="absolute inset-0 bg-brand-dark/50 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark via-brand-dark/20 to-brand-dark z-[2]"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-transparent to-brand-dark z-[2]"></div>

      <div className="container relative z-10 px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/10 border border-brand-accent/30 text-brand-accent text-[10px] font-black uppercase tracking-[0.4em] mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-down opacity-100' : 'opacity-0'}`}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-accent"></span>
            </span>
            {translations.badge}
          </div>

          <div className={`relative p-8 md:p-14 rounded-[4rem] bg-white/[0.04] border border-white/10 backdrop-blur-3xl shadow-2xl transition-all duration-[1200ms] ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
            <h1 
              className={`text-4xl md:text-6xl lg:text-7xl font-black leading-[1.05] mb-8 tracking-tighter transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              style={{ transitionDelay: '200ms' }} 
              dangerouslySetInnerHTML={{ 
                __html: translations.title
                  .replace('sur-mesure', `<span class="text-brand-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">sur-mesure</span>`)
                  .replace('custom', `<span class="text-brand-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">custom</span>`)
                  .replace('مخصصة', `<span class="text-brand-accent drop-shadow-[0_0_15px_rgba(56,189,248,0.4)]">مخصصة</span>`) 
              }}
            >
            </h1>

            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-12 text-brand-gray font-semibold leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              {translations.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <button 
                onClick={onQuoteClick}
                className="group relative bg-brand-accent text-brand-dark font-black py-5 px-14 rounded-2xl text-[12px] transition-all duration-300 transform hover:scale-105 shadow-[0_0_40px_rgba(56,189,248,0.35)] hover:shadow-brand-accent/50"
              >
                <span className="relative z-10 uppercase tracking-[0.25em]">{translations.cta}</span>
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              
              <a href="#process" className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-light hover:text-brand-accent transition-all flex items-center gap-4 border-b-2 border-white/10 pb-2 hover:border-brand-accent group">
                {translations.secondaryCta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Draggable Cards - Better positioned to fill "vide" */}
          <DraggableFloatingCard isVisible={isVisible} className="top-[0%] left-[-15%] ltr:flex rtl:hidden" delay="0s">
            <div className="bg-brand-accent/20 p-3 rounded-xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-brand-light leading-none">+350%</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.3em] mt-2">CROISSANCE ROI</div>
            </div>
          </DraggableFloatingCard>

          <DraggableFloatingCard isVisible={isVisible} className="bottom-[0%] right-[-15%] ltr:flex rtl:hidden" delay="1.2s">
            <div className="bg-brand-accent/20 p-3 rounded-xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-brand-light leading-none">24/7</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.3em] mt-2">SUPPORT DÉDIÉ</div>
            </div>
          </DraggableFloatingCard>

          {/* Arabic RTL Positioning */}
          <DraggableFloatingCard isVisible={isVisible} className="top-[0%] right-[-15%] rtl:flex ltr:hidden" delay="0s">
            <div className="text-right">
              <div className="text-2xl font-black text-brand-light leading-none">+350%</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.3em] mt-2">عائد الاستثمار</div>
            </div>
            <div className="bg-brand-accent/20 p-3 rounded-xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </DraggableFloatingCard>

          <DraggableFloatingCard isVisible={isVisible} className="bottom-[0%] left-[-15%] rtl:flex ltr:hidden" delay="1.2s">
            <div className="text-right">
              <div className="text-2xl font-black text-brand-light leading-none">دعم</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.3em] mt-2">متواصل 24/7</div>
            </div>
            <div className="bg-brand-accent/20 p-3 rounded-xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </DraggableFloatingCard>

        </div>
      </div>
    </section>
  );
};

export default Hero;
