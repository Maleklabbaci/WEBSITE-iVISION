import React, { useEffect, useState } from 'react';

interface HeroProps {
  translations: { badge: string; title: string; subtitle: string; cta: string; secondaryCta: string; };
  onQuoteClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMove = (event: MouseEvent) => {
      if (window.innerWidth <= 900 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      setTilt({
        x: (event.clientX / window.innerWidth - 0.5) * 3,
        y: (event.clientY / window.innerHeight - 0.5) * 3,
      });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const words = translations.title.split(' ');
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="accueil" className="hero-section relative min-h-[92vh] overflow-hidden flex items-center">
      <div className="hero-media" aria-hidden="true">
        <img src="/images/ivision-hero-team.webp" alt="" fetchPriority="high" decoding="async" />
        <div className="hero-media-overlay" />
      </div>

      <div className="container relative z-10 w-full" style={{ transform: `translate3d(${tilt.x * 0.35}px, ${tilt.y * 0.35}px, 0)` }}>
        <div className="hero-grid">
          <div className={`hero-copy transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
            <div className="hero-kicker"><span className="hero-kicker-dot" />{translations.badge}</div>
            <h1 className="hero-title">
              {words.slice(0, splitIndex).join(' ')} <br />
              <span>{words.slice(splitIndex).join(' ')}</span>
            </h1>
            <p className="hero-subtitle">{translations.subtitle}</p>

            <div className="hero-actions">
              <button onClick={onQuoteClick} className="btn-ivision group">
                <span>{translations.cta}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              <a href="#etudes-de-cas" onClick={(event) => { event.preventDefault(); document.getElementById('etudes-de-cas')?.scrollIntoView({ behavior: 'smooth' }); }} className="hero-secondary-link">
                <span>{translations.secondaryCta}</span>
                <span aria-hidden="true">↓</span>
              </a>
            </div>

            <div className="hero-proof">
              <div className="hero-avatar-stack" aria-hidden="true">
                <span>iV</span><span>+</span><span>5</span>
              </div>
              <div>
                <strong>200+</strong>
                <small>marques accompagnées</small>
              </div>
            </div>
          </div>

          <div className={`hero-aside transition-all duration-1000 delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="hero-stat-card">
              <span className="hero-stat-value">98%</span>
              <span className="hero-stat-label">satisfaction client</span>
            </div>
            <div className="hero-analytics-card">
              <img src="/images/ivision-hero-analytics.webp" alt="Tableau de bord de performance marketing" loading="eager" decoding="async" />
              <div className="hero-analytics-caption"><span className="hero-kicker-dot" /> pilotage en temps réel</div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-hint" aria-hidden="true"><span /> scroll pour découvrir</div>
    </section>
  );
};

export default Hero;
