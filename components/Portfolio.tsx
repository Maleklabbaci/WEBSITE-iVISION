import React, { useState, useEffect, useRef } from 'react';

interface Stat {
  value: string;
  label: string;
}

interface Project {
  client: string;
  title: string;
  image: string;
  results: Stat[];
  cta: string;
}

interface PortfolioProps {
  translations: {
    title: string;
    subtitle: string;
    projects: Project[];
  },
  onQuoteClick: () => void;
}

// Icons for stats
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconTarget = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconImpressions = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;

const getIconForLabel = (label: string) => {
  const lowerLabel = label.toLowerCase();
  if (lowerLabel.includes('roi') || lowerLabel.includes('conversion') || lowerLabel.includes('traffic') || lowerLabel.includes('trafic')) return <IconTrendingUp />;
  if (lowerLabel.includes('impressions') || lowerLabel.includes('organique')) return <IconImpressions />;
  if (lowerLabel.includes('ranking') || lowerLabel.includes('tendance') || lowerLabel.includes('classement')) return <IconTrophy />;
  return <IconTarget />;
};


interface ProjectCardProps {
  project: Project;
  isVisible: boolean;
  index: number;
  onCtaClick: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, isVisible, index, onCtaClick }) => (
    <div 
        className={`group bg-brand-dark/50 border border-brand-border rounded-lg overflow-hidden transition-all duration-300 hover:border-brand-accent hover:-translate-y-2 hover:bg-brand-dark/60 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 150}ms` }}
    >
        <div className="relative h-48">
            <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-4 left-4">
                <h3 className="text-xl font-bold text-brand-light">{project.client}</h3>
                <p className="text-brand-gray text-sm">{project.title}</p>
            </div>
        </div>
        <div className="p-6">
            <div className="grid grid-cols-2 gap-4 mb-6">
                {project.results.map((stat, i) => (
                    <div key={i} className="bg-brand-dark/40 border border-brand-border/50 rounded-md p-3 flex flex-col items-center justify-center text-center transition-all duration-300 group-hover:border-brand-accent/30 group-hover:bg-brand-dark/20">
                        <div className="flex items-center">
                            {getIconForLabel(stat.label)}
                            <span className="text-2xl font-bold text-brand-light">{stat.value}</span>
                        </div>
                        <p className="text-xs text-brand-gray mt-1">{stat.label}</p>
                    </div>
                ))}
            </div>
            <button onClick={onCtaClick} className="w-full text-center text-brand-accent font-semibold py-2 px-4 rounded-md hover:bg-brand-accent/10 transition-all duration-300 flex items-center justify-center group/cta">
                <span>{project.cta}</span>
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
        </div>
    </div>
);


const Portfolio: React.FC<PortfolioProps> = ({ translations, onQuoteClick }) => {
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
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="portfolio" ref={sectionRef} className="py-20 bg-transparent text-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{translations.title}</h2>
          <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto">{translations.subtitle}</p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {translations.projects.map((project, index) => (
                <ProjectCard 
                    key={index} 
                    project={project} 
                    isVisible={isVisible} 
                    index={index}
                    onCtaClick={onQuoteClick}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;