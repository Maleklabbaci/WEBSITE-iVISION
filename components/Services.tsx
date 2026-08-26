import React, { useEffect, useRef, useState } from 'react';

interface ServicesProps {
  translations: { title: string; subtitle: string; items: any[]; modal?: any };
  onQuoteClick: () => void;
}

const serviceSlugMap: Record<number, string> = {
  0: 'marketing-digital',
  1: 'production-audiovisuelle',
  2: 'creation-site-web',
  3: 'marketing-digital',
};

const Services: React.FC<ServicesProps> = ({ translations, onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleServiceClick = (index: number) => {
    const slug = serviceSlugMap[index];
    if (slug) window.location.hash = `/services/${slug}`;
    else onQuoteClick();
  };

  const words = (translations?.title || '').replace('.', '').split(' ');

  return (
    <section ref={ref} id="services" className={`pipam-services ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />Expertise<span className="pipam-section-number">04 / 07</span></div>
      <div className="pipam-services-intro">
        <h2>{words.map((word, index) => <span key={`${word}-${index}`} className={index === words.length - 1 ? 'is-gradient' : ''}>{word}</span>)}</h2>
        <p>{translations.subtitle}</p>
      </div>
      <div className="pipam-services-list" role="list">
        {(translations.items || []).map((item, index) => (
          <button key={item.title || index} type="button" role="listitem" className="pipam-service-row" onClick={() => handleServiceClick(index)} style={{ transitionDelay: `${index * 70}ms` }}>
            <span className="pipam-service-number">0{index + 1}</span>
            <span className="pipam-service-name">{item.title}</span>
            <span className="pipam-service-desc">{item.description}</span>
            <span className="pipam-service-arrow" aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Services;
