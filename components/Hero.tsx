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
    const onMove = (e: MouseEvent) => {
      if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setPointer({ x: (e.clientX / window.innerWidth - 0.5) * 15, y: (e.clientY / window.innerHeight - 0.5) * 10 });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  const words = translations.title.split(' ');
  const firstLine = words.slice(0, Math.ceil(words.length / 2)).join(' ');
  const secondLine = words.slice(Math.ceil(words.length / 2)).join(' ');

  return (
    <section id="accueil" className={`iv-hero ${visible ? 'is-visible' : ''}`}>
      <div className="iv-hero-bg" aria-hidden="true">
        <div className="iv-hero-texture" style={{ transform: `translate3d(${pointer.x * -0.2}px, ${pointer.y * -0.2}px, 0)` }} />
        <div className="iv-hero-glow" style={{ transform: `translate3d(${pointer.x * 0.1}px, ${pointer.y * 0.1}px, 0)` }} />
      </div>

      <div className="iv-hero-top">
        <div className="iv-hero-meta">
          <span className="iv-hero-pulse" />
          <span className="iv-hero-badge">{translations.badge}</span>
        </div>
        <div className="iv-hero-index">IV / 00</div>
      </div>

      <div className="iv-hero-main">
        <div className="iv-hero-title-wrap" style={{ transform: `translate3d(${pointer.x * 0.08}px, ${pointer.y * 0.08}px, 0)` }}>
          <h1>
            <span className="iv-hero-line-1">{firstLine}</span>
            <span className="iv-hero-line-2">{secondLine}</span>
          </h1>
        </div>

        <div className="iv-hero-footer">
          <div className="iv-hero-copy">
            <p>{translations.subtitle}</p>
            <div className="iv-hero-actions">
              <button type="button" onClick={onQuoteClick} className="iv-hero-cta">
                <span>{translations.cta}</span>
                <b aria-hidden="true">↗</b>
              </button>
              <a href="#about" className="iv-hero-scroll">
                <span>{translations.secondaryCta}</span>
                <b aria-hidden="true">↓</b>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
