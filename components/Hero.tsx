import React, { useEffect, useRef, useState } from 'react';
import type { Language } from '../lib/translations';

interface HeroProps {
  translations: { badge: string; title: string; subtitle: string; middleCopy: string; cta: string; secondaryCta: string };
  onQuoteClick: () => void;
  language?: Language;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick, language = 'fr' }) => {
  const [lineOne, lineTwo, lineThree, location] = translations.title.split('|');
  const [visible, setVisible] = useState(false);
  const backgroundRef = useRef<HTMLImageElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const signature = language === 'ar'
    ? { aria: 'خبرات iVISION', items: ['استراتيجية', 'محتوى', 'تجارب ويب'] }
    : { aria: 'Expertises iVISION', items: ['STRATEGY', 'CONTENT', 'WEB EXPERIENCES'] };

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 100);
    let frame = 0;
    const onMove = (event: MouseEvent) => {
      if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const x = (event.clientX / window.innerWidth - 0.5) * 12;
      const y = (event.clientY / window.innerHeight - 0.5) * 8;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (backgroundRef.current) backgroundRef.current.style.transform = `scale(1.04) translate3d(${x * -0.12}px, ${y * -0.12}px, 0)`;
        if (titleRef.current) titleRef.current.style.transform = `translate3d(${x * 0.05}px, ${y * 0.05}px, 0)`;
      });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.clearTimeout(timer); cancelAnimationFrame(frame); window.removeEventListener('mousemove', onMove); };
  }, []);

  return (
    <section id="accueil" className={`iv-hero ${visible ? 'is-visible' : ''}`}>
      <div className="iv-hero-bg" aria-hidden="true">
        <img ref={backgroundRef} src="/images/agency-hero-growth.webp" srcSet="/images/agency-hero-growth-960.webp 960w, /images/agency-hero-growth-1600.webp 1600w, /images/agency-hero-growth.webp 2560w" sizes="100vw" width={2560} height={1440} fetchPriority="high" alt="" style={{ transform: 'scale(1.04)' }} />
        <div className="iv-hero-shade" />
      </div>

      <div className="iv-hero-top">
        <div className="iv-hero-meta"><span className="iv-hero-pulse" /><span className="iv-hero-badge">{translations.badge}</span></div>
      </div>

      <div className="iv-hero-main">
        <div ref={titleRef} className="iv-hero-title-wrap">
          <h1 aria-label={translations.title.replaceAll('|', ' ')}><span>{lineOne} </span><span className="iv-hero-title-indent">{language === 'ar' ? lineTwo : lineTwo.toLowerCase()} <b aria-hidden="true">✦</b></span><span>{lineThree} </span><span className="iv-hero-location">{location}</span></h1>
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
