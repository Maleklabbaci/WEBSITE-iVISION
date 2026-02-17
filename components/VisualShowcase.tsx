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
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    label: "VENTES BOOSTÉES",
    stat: "+412% VENTES",
    description: "Déploiement d'une infrastructure publicitaire scalable.",
    gridClass: "lg:col-span-8 lg:row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    label: "CIBLAGE LASER",
    stat: "100% PRÉCISION",
    description: "Ciblage prédictif haute valeur.",
    gridClass: "lg:col-span-4 lg:row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    label: "RENTABILITÉ",
    stat: "7.8x ROAS",
    description: "Optimisation maximale du profit.",
    gridClass: "lg:col-span-4 lg:row-span-1"
  }
];

const VisualCard: React.FC<{ item: ShowcaseItem; index: number; isVisible: boolean }> = ({ item, index, isVisible }) => {
  return (
    <div 
      className={`${item.gridClass} group relative overflow-hidden rounded-[30px] md:rounded-[40px] border border-navy/5 dark:border-white/5 transition-all duration-[1s] ease-out shadow-2xl min-h-[300px] md:min-h-0 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      <img 
        src={`${item.url}?q=80&w=1200&auto=format&fit=crop`}
        alt={item.label}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-[4000ms] group-hover:scale-110 opacity-30 md:opacity-30 group-hover:opacity-50"
      />

      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end bg-gradient-to-t from-navy via-navy/60 to-transparent">
        <div className="space-y-4 md:space-y-6 transform md:translate-y-6 group-hover:translate-y-0 transition-all duration-700 ease-out">
          <div className="inline-block px-4 py-1.5 md:px-6 md:py-2 bg-brand-blue text-white text-[9px] md:text-[11px] font-black uppercase rounded-xl shadow-lg shadow-brand-blue/30">
            {item.stat}
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none break-words">
            {item.label}
          </h3>
          <p className="text-brand-gray text-sm md:text-lg font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 max-w-sm">
            {item.description}
          </p>
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
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const words = translations?.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section ref={sectionRef} id="projets" className="py-24 md:py-40 bg-white dark:bg-navy overflow-hidden relative border-t border-navy/5 dark:border-white/5 transition-colors duration-500">
      <div className="absolute left-0 bottom-0 w-[500px] h-[500px] bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
      
      <div className="container relative z-10">
        <div className={`mb-16 md:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <div className="max-w-4xl">
              <div className="sketch-badge mb-6 md:mb-8">Portefeuille</div>
              <h2 className="text-[clamp(2rem,6vw,8rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.8] uppercase transition-colors duration-500">
                {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-base md:text-2xl text-brand-gray dark:text-brand-gray/80 max-w-sm font-medium leading-tight opacity-70 md:border-l-2 md:border-brand-blue/30 md:pl-8">
              {translations.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:grid-rows-2 gap-4 md:gap-8 lg:min-h-[900px]">
          {showcaseItems.map((item, index) => (
            <VisualCard key={index} item={item} index={index} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;