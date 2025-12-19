import React, { useState, useEffect, useRef } from 'react';

interface Study {
  tabTitle: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: string;
}

interface CaseStudiesProps {
  translations: {
    title: string;
    subtitle: string;
    studies: Study[];
  };
}

const IconCheck = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>;
const IconUser = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;


const CaseStudies: React.FC<CaseStudiesProps> = ({ translations }) => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [contentKey, setContentKey] = useState(0);
  
  const activeStudy = translations.studies[activeTab];

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
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
    setContentKey(prev => prev + 1); // Re-trigger animation
  };

  return (
    <section id="case-studies" ref={sectionRef} className="py-20 bg-transparent text-brand-light">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          {translations.title && <h2 className="text-3xl md:text-4xl font-bold">{translations.title}</h2>}
          <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto">{translations.subtitle}</p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4"></div>
        </div>
        
        <div className={`max-w-4xl mx-auto ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
          {/* Tabs */}
          <div className="flex flex-col sm:flex-row border-b border-brand-border mb-8">
            {translations.studies.map((study, index) => (
              <button
                key={index}
                onClick={() => handleTabClick(index)}
                className={`flex-1 py-3 px-2 sm:px-4 text-center font-semibold transition-colors duration-300 ${
                  activeTab === index 
                    ? 'text-brand-accent border-b-2 border-brand-accent' 
                    : 'text-brand-gray hover:text-brand-light'
                }`}
              >
                {study.tabTitle}
              </button>
            ))}
          </div>

          {/* Content */}
          <div key={contentKey} className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-fade-in-up">
            <div className="bg-brand-dark/50 border border-brand-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-brand-accent mb-3">The Challenge</h3>
              <p className="text-brand-gray">{activeStudy.challenge}</p>
            </div>
            <div className="bg-brand-dark/50 border border-brand-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-brand-accent mb-3">Our Solution</h3>
              <p className="text-brand-gray">{activeStudy.solution}</p>
            </div>
            <div className="md:col-span-2 bg-brand-dark/50 border border-brand-border p-6 rounded-lg">
              <h3 className="text-xl font-bold text-brand-accent mb-4">Tangible Results</h3>
              <ul className="space-y-3">
                {activeStudy.results.map((result, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <IconCheck />
                    <span className="text-brand-light">{result}</span>
                  </li>
                ))}
              </ul>
            </div>
             <div className="md:col-span-2 bg-brand-dark/50 border border-brand-border p-6 rounded-lg">
              <div className="flex items-start gap-4">
                <IconUser />
                <div>
                    <h3 className="text-xl font-bold text-brand-accent mb-3">Client Testimonial</h3>
                    <blockquote className="text-brand-gray italic">"{activeStudy.testimonial}"</blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;