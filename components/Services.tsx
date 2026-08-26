import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem { title: string; description: string; details: string }
interface ServicesProps { translations: { title: string; subtitle: string; items: ServiceItem[] }; onQuoteClick: () => void }

const serviceSlugMap: Record<number, string> = { 0: 'marketing-digital', 1: 'production-audiovisuelle', 2: 'creation-site-web', 3: 'marketing-digital' };

const Services: React.FC<ServicesProps> = ({ translations, onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = translations.items || [];
  const openService = (index: number) => {
    const slug = serviceSlugMap[index];
    if (slug) window.location.hash = `/services/${slug}`;
    else onQuoteClick();
  };

  return (
    <section ref={ref} id="services" className={`iv-services ${visible ? 'is-visible' : ''}`}>
      <div className="iv-section-topline"><span>SERVICES / 04</span><span>04 / 07</span></div>
      <div className="iv-services-header">
        <h2>{translations.title}</h2>
        <p>{translations.subtitle}</p>
      </div>
      <div className="iv-services-grid">
        {items.map((item, index) => (
          <button key={item.title} type="button" className="iv-service-card" onClick={() => openService(index)}>
            <div className="iv-service-card-head">
              <span className="iv-service-number">0{index + 1}</span>
              <b aria-hidden="true">↗</b>
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="iv-service-card-footer"><span>Découvrir</span></div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default Services;
