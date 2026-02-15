
import React, { useState, useEffect, useRef } from 'react';

interface ShowcaseItem {
  url: string;
  label: string;
  stat: string;
  description: string;
  gridClass: string;
}

const showcaseItems: ShowcaseItem[] = [
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    label: "Growth Strategy",
    stat: "+124% ROI",
    description: "Analyse prédictive et scaling de revenus e-commerce.",
    gridClass: "md:col-span-8 md:row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1493612276216-ee3925520721",
    label: "Content Production",
    stat: "High CTR",
    description: "Création de visuels percutants pour les réseaux sociaux.",
    gridClass: "md:col-span-4 md:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1553877522-43269d4ea984",
    label: "Agency Workflow",
    stat: "Efficience",
    description: "Gestion de projet agile et reporting en temps réel.",
    gridClass: "md:col-span-4 md:row-span-1"
  }
];

const VisualCard: React.FC<{ item: ShowcaseItem; index: number; isVisible: boolean }> = ({ item, index, isVisible }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div 
      className={`${item.gridClass} group relative overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-dark/40 transition-all duration-[1200ms] ease-out ${isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-12 scale-95'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <img 
        src={`${item.url}?q=80&w=1200&auto=format&fit=crop`}
        alt={item.label}
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110 ${isLoaded ? 'opacity-40 blur-0' : 'opacity-0 blur-lg'}`}
      />

      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-brand-dark via-transparent to-transparent">
        <div className="max-w-xs space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-accent/20 border border-brand-accent/30 backdrop-blur-md">
            <span className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></span>
            <span className="text-[9px] font-black text-white uppercase tracking-[0.2em]">{item.stat}</span>
          </div>
          
          <div>
            <h3 className="text-2xl md:text-3xl font-black text-white uppercase tracking-tighter mb-2">{item.label}</h3>
            <p className="text-brand-gray text-sm font-medium leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {item.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface VisualShowcaseProps {
  translations: {
    title: string;
    subtitle: string;
  }
}

const VisualShowcase: React.FC<VisualShowcaseProps> = ({ translations }) => {
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-brand-dark overflow-hidden scroll-mt-24">
      <div className="container px-6">
        <div className={`text-center mb-16 md:mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-black text-brand-light mb-6 uppercase tracking-tighter">
            {translations.title}
          </h2>
          <p className="text-brand-gray text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-80">
            {translations.subtitle}
          </p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-10 rounded-full shadow-[0_0_20px_rgba(56,189,248,0.4)]"></div>
        </div>

        <div className="flex flex-col md:grid md:grid-cols-12 md:grid-rows-2 gap-5 md:gap-8 min-h-[600px] md:h-[750px]">
          {showcaseItems.map((item, index) => (
            <VisualCard key={index} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
