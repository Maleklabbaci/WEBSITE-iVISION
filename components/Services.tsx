import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem { title: string; description: string; details: string }
interface ServicesProps { translations: { topline?: string; discover?: string; title: string; subtitle: string; items: ServiceItem[] } }

const serviceLinks = [
  '/publicite-meta-google-ads-algerie.html',
  '/creation-contenu-algerie.html',
  '/creation-site-web-algerie.html',
  '/agence-marketing-digital-algerie.html',
];

const Services: React.FC<ServicesProps> = ({ translations }) => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const items = translations.items || [];

  return (
    <section ref={ref} id="services" className={`iv-services ${visible ? 'is-visible' : ''}`}>
      <div className="iv-section-topline"><span>{translations.topline || 'SERVICES'}</span></div>
      <div className="iv-services-header">
        <h2>{translations.title}</h2>
        <p>{translations.subtitle}</p>
      </div>
      <div className="iv-services-grid iv-reveal-group">
        {items.map((item, index) => (
          <a key={item.title} href={serviceLinks[index] || '/#/devis'} className="iv-service-card">
            <div className="iv-service-card-head"><b aria-hidden="true">↗</b></div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <div className="iv-service-card-footer"><span>{translations.discover || 'Découvrir'}</span></div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Services;
