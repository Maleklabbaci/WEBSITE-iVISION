
import React, { useState, useEffect, useRef } from 'react';

// Icons
const IconStrategy = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IconTeam = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconBudget = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const IconExcellence = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;

const stepIcons = [<IconStrategy />, <IconTeam />, <IconBudget />, <IconExcellence />];

interface HowWeWorkProps {
  translations: {
    title: string;
    subtitle: string;
    steps: { title: string; description: string }[];
  }
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ translations }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-24 bg-transparent text-brand-light scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-4">{translations.title}</h2>
          <p className="text-lg text-brand-gray max-w-2xl mx-auto font-medium leading-relaxed">
            {translations.subtitle}
          </p>
          <div className="w-20 h-1 bg-brand-accent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {translations.steps.map((step, index) => (
            <div 
              key={index}
              className={`group bg-brand-dark/40 border border-brand-border p-8 rounded-[2.5rem] transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-brand-accent/40 hover:-translate-y-2 hover:bg-brand-dark/60 hover:shadow-2xl hover:shadow-brand-accent/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent mb-6 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
                {stepIcons[index]}
              </div>
              <h3 className="text-xl font-black text-brand-light mb-4 uppercase tracking-tight">{step.title}</h3>
              <p className="text-brand-gray text-[14px] leading-relaxed font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to action subtle below */}
        <div className={`mt-20 text-center transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionDelay: '800ms' }}>
          <div className="inline-block p-1 rounded-3xl bg-gradient-to-r from-brand-accent/20 via-brand-accent/50 to-brand-accent/20">
             <div className="bg-brand-dark px-10 py-6 rounded-[1.4rem] border border-white/5">
                <p className="text-brand-gray text-xs font-bold uppercase tracking-[0.3em]">Chaque projet commence par un diagnostic gratuit</p>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowWeWork;
