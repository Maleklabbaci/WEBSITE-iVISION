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

  const handleServiceClick = (index: number) => {
    const slug = serviceSlugMap[index];
    if (slug) window.location.hash = `/services/${slug}`;
    else onQuoteClick();
  };

  return (
    <section id="services" ref={sectionRef} className="services-section py-24 md:py-36 border-t border-navy/5 dark:border-white/5 transition-colors duration-500">
      <div className="container">
        <header className={`services-intro transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="sketch-badge mb-5">Expertise</div>
            <h2 className="services-heading text-navy dark:text-white">{words.slice(0, splitIndex).join(' ')}<br /><span>{words.slice(splitIndex).join(' ')}</span></h2>
          </div>
          <p className="services-intro-copy text-brand-gray dark:text-brand-gray/80">{translations.subtitle}</p>
        </header>

        <div className="services-list" role="list">
          {translations.items.map((item, index) => (
            <button
              key={item.title || index}
              type="button"
              role="listitem"
              onClick={() => handleServiceClick(index)}
              className={`service-row ${isVisible ? 'is-visible' : ''}`}
              style={{ transitionDelay: `${index * 70}ms` }}
            >
              <span className="service-row-index">0{index + 1}</span>
              <span className="service-row-title">{item.title}</span>
              <span className="service-row-description">{item.description}</span>
              <span className="service-row-arrow" aria-hidden="true">↗</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
