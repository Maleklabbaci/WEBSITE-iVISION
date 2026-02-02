
import React, { useState, useEffect, useRef } from 'react';

interface Project {
  client: string;
  title: string;
  image: string;
  results: { value: string; label: string }[];
  cta: string;
}

interface PortfolioProps {
  translations: { title: string; subtitle: string; projects: Project[] };
  onQuoteClick: () => void;
}

const Portfolio: React.FC<PortfolioProps> = ({ translations, onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-32 bg-transparent">
      <div className="container">
        <div className={`text-center mb-24 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 tracking-tight uppercase">{translations.title}</h2>
          <p className="text-brand-gray font-light text-lg max-w-xl mx-auto">{translations.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {translations.projects.map((project, index) => (
            <div 
              key={index} 
              className={`group transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 shadow-2xl transition-transform duration-700 group-hover:scale-[1.02]">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-brand-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                   <button onClick={onQuoteClick} className="bg-white text-brand-dark font-bold px-8 py-3 rounded-full text-[10px] uppercase tracking-widest">
                      {project.cta}
                   </button>
                </div>
              </div>
              <h3 className="text-xl font-bold mb-2">{project.client}</h3>
              <p className="text-brand-gray text-sm font-light uppercase tracking-widest">{project.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
