import React, { useEffect, useRef, useState } from 'react';

interface ServiceItem { title: string; description: string }
interface ServicesProps { translations: { title: string; subtitle: string; items: ServiceItem[]; modal?: any }; onQuoteClick: () => void }

const serviceSlugMap: Record<number, string> = { 0: 'marketing-digital', 1: 'production-audiovisuelle', 2: 'creation-site-web', 3: 'marketing-digital' };
const serviceMedia = ['/images/ivision-hero-editorial.webp', '/images/ivision-project-fashion.webp', '/images/ivision-orbit.webp', '/images/ivision-project-mobility.webp'];

const Services: React.FC<ServicesProps> = ({ translations, onQuoteClick }) => {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const items = translations.items || [];
  const words = (translations.title || '').replace('.', '').split(' ');
  const activate = (index: number) => setActive(index);
  const openService = (index: number) => {
    const slug = serviceSlugMap[index];
    if (slug) window.location.hash = `/services/${slug}`;
    else onQuoteClick();
  };

  return (
    <section ref={ref} id="services" className={`pipam-services ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />Services<span className="pipam-section-number">04 / 07</span></div>
      <div className="pipam-services-header"><h2><span>FULL-</span><span className="is-gradient">SERVICE</span><span>DIGITAL POWERHOUSE</span></h2></div>
      <div className="pipam-services-feature">
        <div className="pipam-service-feature-image"><img key={serviceMedia[active]} src={serviceMedia[active]} alt="" loading="lazy" decoding="async" /></div>
        <div className="pipam-service-feature-copy"><span className="pipam-service-feature-number">0{active + 1}</span><h3>{items[active]?.title || words.join(' ')}</h3><p>{items[active]?.description || translations.subtitle}</p><button type="button" className="pipam-text-link" onClick={() => openService(active)}><span>Découvrir le service</span><span aria-hidden="true">↗</span></button></div>
      </div>
      <div className="pipam-services-slider" role="list" aria-label="Services iVISION">{items.map((item, index) => <button key={`${item.title}-${index}`} type="button" role="listitem" className={`pipam-service-slide ${active === index ? 'is-active' : ''}`} onMouseEnter={() => activate(index)} onFocus={() => activate(index)} onClick={() => openService(index)}><span className="pipam-service-number">0{index + 1}</span><span className="pipam-service-name">{item.title}</span><span className="pipam-service-arrow" aria-hidden="true">↗</span></button>)}</div>
    </section>
  );
};

export default Services;
