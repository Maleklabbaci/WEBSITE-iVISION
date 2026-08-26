import React, { useEffect, useRef, useState } from 'react';

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
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.12 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const words = translations?.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="methodologie" ref={sectionRef} className="method-section py-24 md:py-36 border-t border-white/10 transition-colors duration-500 overflow-hidden">
      <div className="container">
        <header className={`method-intro transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div><div className="method-kicker"><span /> Processus</div><h2>{words.slice(0, splitIndex).join(' ')}<br /><span>{words.slice(splitIndex).join(' ')}</span></h2></div>
          <p>{translations?.subtitle}</p>
        </header>

        <div className="method-list" role="list">
          {(translations?.steps || []).map((step, index) => (
            <article key={index} className={`method-row ${isVisible ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 70}ms` }} role="listitem">
              <span className="method-row-index">0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
              <span className="method-row-arrow" aria-hidden="true">↗</span>
            </article>
          ))}
        </div>

        <button type="button" onClick={onQuoteClick} className="btn-ivision method-cta">Demander un audit <span aria-hidden="true">→</span></button>
      </div>
    </section>
  );
};

export default HowWeWork;
