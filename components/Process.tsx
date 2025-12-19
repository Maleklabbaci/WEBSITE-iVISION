
import React, { useState, useEffect, useRef } from 'react';

const IconCompass = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>;
const IconPencil = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>;
const IconRocketLaunch = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>;
const IconChartPie = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>;

const icons = [<IconCompass />, <IconPencil />, <IconRocketLaunch />, <IconChartPie />];

interface Step {
  step: string;
  title: string;
  description: string;
}

interface ProcessStepProps {
  step: Step;
  index: number;
  isVisible: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ step, index, isVisible }) => (
    <div 
        className={`group relative bg-brand-dark/50 border border-brand-border p-8 rounded-lg transition-all duration-300 hover:border-brand-accent hover:-translate-y-2 hover:bg-brand-dark/60 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 150}ms` }}
    >
        <div className="absolute top-4 ltr:right-4 rtl:left-4 text-5xl font-extrabold text-brand-border/50 group-hover:text-brand-accent/30 transition-colors duration-300 z-0">
            {step.step}
        </div>
        <div className="relative z-10">
            <div className="text-brand-accent mb-4 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
                {icons[index]}
            </div>
            <h3 className="text-xl font-bold text-brand-light mb-2">{step.title}</h3>
            <p className="text-brand-gray">{step.description}</p>
        </div>
    </div>
);

interface ProcessProps {
  translations: {
    title: string;
    subtitle: string;
    steps: Step[];
  }
}

const Process: React.FC<ProcessProps> = ({ translations }) => {
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
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-20 bg-transparent scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-light">{translations.title}</h2>
          <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto">{translations.subtitle}</p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {translations.steps.map((step, index) => (
                <ProcessStep key={index} step={step} index={index} isVisible={isVisible} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
