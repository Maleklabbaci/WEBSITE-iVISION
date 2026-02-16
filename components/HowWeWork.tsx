import React, { useState, useEffect, useRef } from 'react';
import InfoModal from './InfoModal';

const icons = [
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>
];

interface HowWeWorkProps {
  translations: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string; details: string }[];
    modal: any;
  },
  onQuoteClick: () => void;
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ translations, onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedStep, setSelectedStep] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const steps = translations?.steps || [];
  const words = translations?.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="methodologie" ref={sectionRef} className="py-24 md:py-40 bg-navy scroll-mt-24 border-t border-white/5 overflow-hidden">
      <div className="container">
        <div className={`mb-16 md:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <div className="max-w-4xl">
              <div className="sketch-badge mb-6 md:mb-8">Processus</div>
              <h2 className="text-[clamp(2rem,6vw,8rem)] font-black text-white tracking-tighter leading-[1] md:leading-[0.8] uppercase">
                {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-base md:text-2xl text-brand-gray max-w-sm font-medium leading-tight opacity-70 md:border-l-2 md:border-brand-blue/30 md:pl-8">
              {translations?.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`glass-card p-8 md:p-12 group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'} flex flex-col h-full`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-blue/10 rounded-2xl flex items-center justify-center text-brand-blue mb-8 md:mb-10 group-hover:bg-brand-blue group-hover:text-white transition-all transform group-hover:rotate-6">
                {icons[index]}
              </div>

              <div className="text-[10px] md:text-[11px] font-black text-brand-blue/40 mb-4 uppercase tracking-tight">Protocole 0{index + 1}</div>
              
              <h4 className="text-xl md:text-2xl font-black mb-3 md:mb-4 text-white uppercase tracking-tighter leading-none group-hover:text-brand-blue transition-colors">{step.title}</h4>
              
              <p className="text-brand-blue text-[10px] md:text-[11px] font-black uppercase mb-4 md:mb-6 tracking-tight">{step.description}</p>
              
              <p className="text-brand-gray text-xs md:text-sm leading-relaxed mb-8 md:mb-12 font-medium opacity-60 group-hover:opacity-100">
                {step.details}
              </p>
              
              <button 
                onClick={() => setSelectedStep(index)}
                className="mt-auto flex items-center gap-3 text-[10px] md:text-[11px] font-black uppercase text-brand-blue hover:gap-5 transition-all whitespace-nowrap"
              >
                DÉMARRER
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
              </button>
            </div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={selectedStep !== null} 
        onClose={() => setSelectedStep(null)}
        title={selectedStep !== null ? steps[selectedStep].title : ''}
        description={selectedStep !== null ? steps[selectedStep].description : ''}
        details={selectedStep !== null ? steps[selectedStep].details : ''}
        icon={selectedStep !== null ? icons[selectedStep] : null}
        translations={translations?.modal}
        onCtaClick={onQuoteClick}
      />
    </section>
  );
};

export default HowWeWork;