import React, { useEffect, useState } from 'react';

interface HeroProps {
  translations: { badge: string; title: string; subtitle: string; cta: string; secondaryCta: string };
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 80);
    const onMove = (event: MouseEvent) => {
      if (window.innerWidth < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setPointer({ x: (event.clientX / window.innerWidth - 0.5) * 10, y: (event.clientY / window.innerHeight - 0.5) * 6 });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('mousemove', onMove); };
  }, []);

  const titleWords = translations.title.split(' ');
  const firstLine = titleWords.slice(0, Math.ceil(titleWords.length / 2)).join(' ');
  const secondLine = titleWords.slice(Math.ceil(titleWords.length / 2)).join(' ');

  return (
    <section id="accueil" className={`pipam-hero ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-hero-media" aria-hidden="true" style={{ transform: `scale(1.04) translate3d(${pointer.x * -0.18}px, ${pointer.y * -0.18}px, 0)` }}>
        <img src="/images/ivision-hero-editorial.webp" alt="" fetchPriority="high" decoding="async" />
        <div className="pipam-hero-shade" />
      </div>
      <div className="pipam-hero-topline"><span className="pipam-pulse" />{translations.badge}<span>iV / 00</span></div>
      <div className="pipam-hero-title-wrap" style={{ transform: `translate3d(${pointer.x * 0.08}px, ${pointer.y * 0.08}px, 0)` }}>
        <h1><span>{firstLine}</span><span className="is-gradient">{secondLine}</span></h1>
      </div>
      <div className="pipam-hero-bottom">
        <p>{translations.subtitle}</p>
        <div className="pipam-hero-actions">
          <button type="button" onClick={onQuoteClick} className="pipam-round-cta"><span>{translations.cta}</span><span aria-hidden="true">↗</span></button>
          <a href="#about" className="pipam-scroll-link"><span>{translations.secondaryCta}</span><span aria-hidden="true">↓</span></a>
        </div>
      </div>
      <div className="pipam-hero-index" aria-hidden="true">01 <span>/ 07</span></div>
    </section>
  );
};

export default Hero;
