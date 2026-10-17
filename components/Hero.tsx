import React, { useEffect, useState } from 'react';
import type { Language } from '../lib/translations';

interface HeroProps {
  translations: { badge: string; title: string; subtitle: string; middleCopy: string; cta: string; secondaryCta: string };
  onQuoteClick: () => void;
  language?: Language;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick, language = 'fr' }) => {
  const [lineOne, lineTwo, lineThree, location] = translations.title.split('|');
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  const signature = language === 'ar'
    ? { aria: 'خبرات iVISION', items: ['استراتيجية', 'محتوى', 'تجارب ويب'] }
    : { aria: 'Expertises iVISION', items: ['STRATEGY', 'CONTENT', 'WEB EXPERIENCES'] };

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 100);
    const onMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 12, y: (event.clientY / window.innerHeight - 0.5) * 8 });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section id="accueil" className={`iv-hero ${visible ? 'is-visible' : ''}`}>
      <div className="iv-hero-bg" aria-hidden="true">
        <img src="/images/agency-hero-growth.webp" alt="" style={{ transform: `scale(1.04) translate3d(${pointer.x * -0.12}px, ${pointer.y * -0.12}px, 0)` }} />
        <div className="iv-hero-shade" />
      </div>

      <div className="iv-hero-top">
        <div className="iv-hero-meta"><span className="iv-hero-pulse" /><span className="iv-hero-badge">{translations.badge}</span></div>
      </div>

      <div className="iv-hero-main">
        <div className="iv-hero-title-wrap" style={{ transform: `translate3d(${pointer.x * 0.05}px, ${pointer.y * 0.05}px, 0)` }}>
          <h1 aria-label={translations.title.replaceAll('|', ' ')}><span>{lineOne} </span><span className="iv-hero-title-indent">{lineTwo} <b aria-hidden="true">✦</b></span><span>{lineThree} </span><span className="iv-hero-location">{location}</span></h1>
        </div>

        <div className="iv-hero-middle-copy"><span>{translations.middleCopy}</span></div>

        <div className="iv-hero-footer">
          <div className="iv-hero-copy"><p>{translations.subtitle}</p><div className="iv-hero-actions"><button type="button" onClick={onQuoteClick} className="iv-hero-cta"><span>{translations.cta}</span><b aria-hidden="true">↗</b></button><a href="#services" className="iv-hero-scroll"><span>{translations.secondaryCta}</span><b aria-hidden="true">↓</b></a></div></div>
          <div className="iv-hero-signature" aria-label={signature.aria}><span>{signature.items[0]}</span><i aria-hidden="true" /><span>{signature.items[1]}</span><i aria-hidden="true" /><span>{signature.items[2]}</span></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
