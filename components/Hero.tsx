import React, { useEffect, useState } from 'react';

interface HeroProps {
  translations: { badge: string; title: string; subtitle: string; cta: string; secondaryCta: string };
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const [visible, setVisible] = useState(false);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

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
        <img src="/images/agency-hero-growth.jpg" alt="" style={{ transform: `scale(1.04) translate3d(${pointer.x * -0.12}px, ${pointer.y * -0.12}px, 0)` }} />
        <div className="iv-hero-shade" />
      </div>

      <div className="iv-hero-top">
        <div className="iv-hero-meta"><span className="iv-hero-pulse" /><span className="iv-hero-badge">{translations.badge}</span></div>
        <div className="iv-hero-index">IV / 00</div>
      </div>

      <div className="iv-hero-main">
        <div className="iv-hero-title-wrap" style={{ transform: `translate3d(${pointer.x * 0.05}px, ${pointer.y * 0.05}px, 0)` }}>
          <h1><span>CREATIVE</span><span className="iv-hero-title-indent">DIGITAL <b>✦</b></span><span>AGENCY</span></h1>
        </div>

        <div className="iv-hero-middle-copy"><span>WE TURN IDEAS<br />INTO BRANDS<br />PEOPLE CHOOSE.</span></div>

        <div className="iv-hero-footer">
          <div className="iv-hero-copy"><p>{translations.subtitle}</p><div className="iv-hero-actions"><button type="button" onClick={onQuoteClick} className="iv-hero-cta"><span>{translations.cta}</span><b aria-hidden="true">↗</b></button><a href="#services" className="iv-hero-scroll"><span>{translations.secondaryCta}</span><b aria-hidden="true">↓</b></a></div></div>
          <div className="iv-hero-mini-cards" aria-hidden="true"><div className="iv-hero-mini-card iv-hero-mini-card-dark"><strong>50+</strong><span>Projects<br />delivered</span></div><div className="iv-hero-mini-card"><img src="/images/agency-card-portrait.jpg" alt="" /></div><div className="iv-hero-mini-card"><img src="/images/agency-card-product.jpg" alt="" /></div></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
