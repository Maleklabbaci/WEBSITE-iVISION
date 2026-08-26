import React, { useEffect, useState } from 'react';

interface HeroProps { translations: { badge: string; title: string; subtitle: string; cta: string; secondaryCta: string }; onQuoteClick: () => void }

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 80);
    const onMove = (event: MouseEvent) => {
      if (window.innerWidth < 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setPointer({ x: (event.clientX / window.innerWidth - .5) * 12, y: (event.clientY / window.innerHeight - .5) * 8 });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => { window.clearTimeout(timer); window.removeEventListener('mousemove', onMove); };
  }, []);

  const words = translations.title.split(' ');
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');

  return (
    <section id="accueil" className={`pipam-hero ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-hero-media" aria-hidden="true" style={{ transform: `translate3d(${pointer.x * -.14}px, ${pointer.y * -.14}px, 0)` }}>
        <img src="/images/ivision-hero-editorial.webp" alt="" fetchPriority="high" decoding="async" />
        <div className="pipam-hero-aurora" />
        <div className="pipam-hero-orb" />
        <div className="pipam-hero-shade" />
      </div>
      <div className="pipam-hero-topline"><span className="pipam-pulse" />{translations.badge}<span>iV / 00</span></div>
      <div className="pipam-hero-content">
        <div className="pipam-hero-title-wrap" style={{ transform: `translate3d(${pointer.x * .06}px, ${pointer.y * .06}px, 0)` }}>
          <h1><span>{firstLine}</span><span className="is-gradient">{secondLine}</span></h1>
        </div>
        <div className="pipam-hero-bottom"><p>{translations.subtitle}</p><div className="pipam-hero-actions"><button type="button" onClick={onQuoteClick} className="pipam-hero-inline-cta">{translations.cta}<span aria-hidden="true">↗</span></button><a href="#about" className="pipam-scroll-link"><span>{translations.secondaryCta || '(Scroll down)'}</span><span aria-hidden="true">↓</span></a></div></div>
      </div>
      <div className="pipam-hero-index" aria-hidden="true">01 <span>/ 07</span></div>
    </section>
  );
};

export default Hero;
