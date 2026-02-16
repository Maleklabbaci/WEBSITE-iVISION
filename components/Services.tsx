import React, { useState, useEffect, useRef } from 'react';

interface ServicesProps {
  translations: { title: string; subtitle: string; items: any[]; modal: any; },
  onQuoteClick: () => void;
}

const Services: React.FC<ServicesProps> = ({ translations, onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const words = translations?.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="services" ref={sectionRef} className="py-24 md:py-40 bg-navy relative border-t border-white/5 overflow-hidden">
      <div className="container">
        <div className={`mb-16 md:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <div className="max-w-4xl">
              <div className="sketch-badge mb-6 md:mb-8">Expertise</div>
              <h2 className="text-[clamp(2rem,6vw,8rem)] font-black text-white tracking-tighter leading-[1] md:leading-[0.8] uppercase">
                {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-base md:text-2xl text-brand-gray max-w-sm font-medium leading-tight opacity-70 md:border-l-2 md:border-brand-blue/30 md:pl-8">
              {translations.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {translations.items.map((item, i) => (
            <div key={i} className="group glass-card p-8 md:p-12 hover:border-brand-blue/30 transition-all duration-500 flex flex-col h-full">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-8 md:mb-10 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-white uppercase tracking-tighter leading-none group-hover:text-brand-blue transition-colors">{item.title}</h4>
              <p className="text-brand-blue text-[10px] md:text-[11px] font-black uppercase mb-4 md:mb-6 tracking-tight">{item.description}</p>
              <p className="text-brand-gray text-xs md:text-sm leading-relaxed mb-8 md:mb-12 font-medium opacity-60 group-hover:opacity-100">
                {item.details}
              </p>
              <button 
                onClick={onQuoteClick} 
                className="mt-auto flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase text-brand-blue hover:gap-5 transition-all"
              >
                DÉMARRER
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;