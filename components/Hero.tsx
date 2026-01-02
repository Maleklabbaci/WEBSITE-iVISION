
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
      className={`absolute hidden lg:flex items-center gap-4 bg-brand-dark/40 backdrop-blur-3xl border border-white/10 p-4 rounded-3xl shadow-2xl select-none cursor-grab active:cursor-grabbing z-30 transition-all duration-[1000ms] ${className} ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}
      style={{ 
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) ${isDragging ? 'scale(1.05)' : 'scale(1)'}`,
        transition: isDragging ? 'transform 0.05s linear, opacity 1s ease' : 'transform 2.5s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
        animation: isDragging ? 'none' : `float 6s ease-in-out infinite`,
        animationDelay: delay,
        touchAction: 'none',
        boxShadow: isDragging ? '0 25px 60px rgba(56,189,248,0.25)' : '0 15px 40px rgba(0,0,0,0.5)'
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
        const offsetVal = window.scrollY * 0.3;
        imageRef.current.style.transform = `translateY(${offsetVal}px) scale(1.1)`;
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
      className="relative min-h-[100vh] flex items-center justify-center text-white text-center overflow-hidden bg-brand-dark"
    >
      <style>{`
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(5px, -15px); }
        }
      `}</style>

      {/* Background Image with Parallax */}
      <img
        ref={imageRef}
        src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
        alt="Workspace"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-1000 ease-out will-change-transform opacity-[0.2]"
        style={{ transform: 'scale(1.1)' }}
        loading="lazy"
      />
      
      <div className="absolute inset-0 bg-brand-dark/40 z-[1]"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/95 via-transparent to-brand-dark z-[2]"></div>

      <div className="container relative z-10 px-6 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent/5 border border-brand-accent/10 text-brand-accent text-[9px] font-black uppercase tracking-[0.3em] mb-8 transition-all duration-1000 ${isVisible ? 'animate-fade-in-down opacity-100' : 'opacity-0'}`}>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-accent"></span>
            </span>
            {translations.badge}
          </div>

          <div className={`relative p-8 md:p-14 rounded-[3.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-md shadow-2xl transition-all duration-[1200ms] ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10'}`}>
            <h1 
              className={`text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] mb-8 tracking-tighter transition-all duration-[1500ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'}`}
              style={{ transitionDelay: '200ms' }} 
              dangerouslySetInnerHTML={{ 
                __html: translations.title
                  .replace('sur-mesure', `<span class="text-brand-accent">sur-mesure</span>`)
                  .replace('custom', `<span class="text-brand-accent">custom</span>`)
                  .replace('مخصصة', `<span class="text-brand-accent">مخصصة</span>`) 
              }}
            >
            </h1>

            <p className={`text-lg md:text-xl max-w-xl mx-auto mb-12 text-brand-gray font-medium leading-relaxed transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '400ms' }}>
              {translations.subtitle}
            </p>

            <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 md:gap-10 transition-all duration-1000 ${isVisible ? 'animate-fade-in-up opacity-100' : 'opacity-0'}`} style={{ animationDelay: '600ms' }}>
              <button 
                onClick={onQuoteClick}
                className="group relative bg-brand-accent text-brand-dark font-black py-4 px-12 rounded-2xl text-sm transition-all duration-300 transform hover:scale-105 shadow-[0_0_30px_rgba(56,189,248,0.2)] hover:shadow-brand-accent/40"
              >
                <span className="relative z-10 uppercase tracking-widest">{translations.cta}</span>
                <div className="absolute inset-0 bg-white rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
              </button>
              
              <a href="#portfolio" className="text-[10px] font-black uppercase tracking-widest text-brand-light hover:text-brand-accent transition-all flex items-center gap-3 border-b border-white/10 pb-1 hover:border-brand-accent">
                {translations.secondaryCta}
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>

          {/* Draggable Cards - Adjusted positioning to avoid Header and central box collisions */}
          <DraggableFloatingCard isVisible={isVisible} className="top-[18%] left-[2%] ltr:flex rtl:hidden" delay="0s">
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-brand-light leading-none">+350%</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.2em] mt-1.5">ROI Digital</div>
            </div>
          </DraggableFloatingCard>

          <DraggableFloatingCard isVisible={isVisible} className="bottom-[18%] right-[2%] ltr:flex rtl:hidden" delay="1s">
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-2xl font-black text-brand-light leading-none">24/7</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.2em] mt-1.5">Support Expert</div>
            </div>
          </DraggableFloatingCard>

          {/* Draggable Cards - RTL versions adjusted similarly */}
          <DraggableFloatingCard isVisible={isVisible} className="top-[18%] right-[2%] rtl:flex ltr:hidden" delay="0s">
             <div className="text-right">
              <div className="text-2xl font-black text-brand-light leading-none">+350%</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.2em] mt-1.5">عائد الاستثمار</div>
            </div>
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
          </DraggableFloatingCard>

          <DraggableFloatingCard isVisible={isVisible} className="bottom-[18%] left-[2%] rtl:flex ltr:hidden" delay="1s">
            <div className="text-right">
              <div className="text-2xl font-black text-brand-light leading-none">24/7</div>
              <div className="text-[9px] uppercase font-black text-brand-gray tracking-[0.2em] mt-1.5">دعم متواصل</div>
            </div>
            <div className="bg-brand-accent/20 p-3 rounded-2xl text-brand-accent">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
