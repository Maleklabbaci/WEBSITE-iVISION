import React, { useState, useEffect, useRef } from 'react';

const icons = [
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m1 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
  <svg className="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>,
];

interface HowWeWorkProps {
  translations: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string; details: string }[];
  };
  onQuoteClick: () => void;
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ translations, onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(false);
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
    <section id="methodologie" ref={sectionRef} className="method-section py-20 md:py-28 bg-white/0 dark:bg-transparent transition-colors duration-500 border-t border-navy/5 dark:border-white/5 overflow-hidden">
      <div className="container">
        <div className={`mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
            <div className="max-w-3xl">
              <div className="sketch-badge mb-5">Processus</div>
              <h2 className="text-[clamp(2rem,6vw,6rem)] font-black text-navy dark:text-white tracking-tighter leading-[0.9] uppercase">
                {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-base md:text-xl text-brand-gray dark:text-brand-gray/80 max-w-sm font-medium leading-tight md:border-l-2 md:border-brand-blue/30 md:pl-6">{translations?.subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {steps.map((step, index) => (
            <article
              key={index}
              className={`glass-card p-6 md:p-8 group transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} flex flex-col min-h-[210px] hover:border-brand-blue/30`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <div className="w-11 h-11 bg-brand-blue/10 rounded-xl flex items-center justify-center text-brand-blue mb-6 group-hover:bg-brand-blue group-hover:text-white transition-all">{icons[index]}</div>
              <div className="text-[10px] font-black text-brand-blue/60 mb-3 uppercase tracking-widest">0{index + 1}</div>
              <h3 className="text-lg font-black text-navy dark:text-white uppercase tracking-tight leading-tight mb-2">{step.title}</h3>
              <p className="text-brand-gray dark:text-brand-gray/80 text-sm leading-relaxed font-medium">{step.description}</p>
            </article>
          ))}
        </div>

        <button type="button" onClick={onQuoteClick} className="btn-ivision mt-10 px-7 py-4">Demander un audit <span aria-hidden="true">→</span></button>
      </div>
    </section>
  );
};

export default HowWeWork;
