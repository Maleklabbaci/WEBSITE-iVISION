import React, { useEffect, useRef, useState } from 'react';

interface HowWeWorkProps {
  translations: { title: string; subtitle: string; steps: { title: string; description: string; details: string }[] };
  onQuoteClick: () => void;
}

const HowWeWork: React.FC<HowWeWorkProps> = ({ translations, onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const words = translations.title.replace('.', '').split(' ');

  return (
    <section ref={ref} id="methodologie" className={`pipam-method ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />Processus<span className="pipam-section-number">06 / 07</span></div>
      <div className="pipam-method-heading"><h2>{words.map((word, index) => <span key={`${word}-${index}`} className={index === words.length - 1 ? 'is-gradient' : ''}>{word}</span>)}</h2><p>{translations.subtitle}</p></div>
      <div className="pipam-method-list" role="list">
        {translations.steps.map((step, index) => <article key={step.title} className="pipam-method-row" style={{ transitionDelay: `${index * 70}ms` }} role="listitem"><span className="pipam-method-index">0{index + 1}</span><div><h3>{step.title}</h3><p>{step.description}</p></div><span className="pipam-method-arrow" aria-hidden="true">↗</span></article>)}
      </div>
      <button type="button" onClick={onQuoteClick} className="pipam-round-cta pipam-method-cta"><span>{translations.title.includes('SUIVEZ') ? 'Demander un audit' : 'Start a project'}</span><span aria-hidden="true">↗</span></button>
    </section>
  );
};

export default HowWeWork;
