import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project { id: number; name: string; sector: string; summary: string; media: string; website: string }
const projects: Project[] = [
  { id: 1, name: 'DC16 X WYN', sector: 'E-commerce · streetwear', summary: 'Une boutique pensée autour du produit et de la culture streetwear.', media: '/images/project-dc16.webp', website: 'https://dc16.shop/' },
  { id: 2, name: 'MoveSmart', sector: 'Immobilier · Dubai', summary: 'Une expérience premium pour présenter les opportunités aux Émirats.', media: '/images/project-movesmart.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 3, name: 'Fidali', sector: 'SaaS · fidélité digitale', summary: 'Un produit digital clair pour transformer la fidélité des commerçants.', media: '/images/project-fidali.webp', website: 'https://fidali.vercel.app/' },
  { id: 4, name: 'White Aura', sector: 'Cosmétiques · e-commerce', summary: 'Une boutique beauté immersive pour une marque premium.', media: '/images/project-white-aura.webp', website: 'https://white-aura.vercel.app/' },
];

const copy = {
  fr: { label: 'NOS RÉALISATIONS', kicker: 'SELECTED DIGITAL WORK', title: ['DES SITES', 'QUI BOUGENT.'], body: 'Quatre univers. Une même exigence : donner aux marques une présence qui se remarque.', view: 'Ouvrir le site', quote: 'Parler de mon projet', scroll: 'SCROLLEZ POUR EXPLORER' },
  en: { label: 'OUR WORK', kicker: 'SELECTED DIGITAL WORK', title: ['WEBSITES', 'THAT MOVE.'], body: 'Four worlds. One standard: giving brands a presence people remember.', view: 'Open website', quote: 'Talk about my project', scroll: 'SCROLL TO EXPLORE' },
  ar: { label: 'أعمالنا', kicker: 'SELECTED DIGITAL WORK', title: ['مواقع', 'تتحرك.'], body: 'أربعة عوالم. هدف واحد: منح العلامات حضوراً لا يُنسى.', view: 'فتح الموقع', quote: 'تحدث عن مشروعي', scroll: 'مرر للاستكشاف' },
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }
const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const lastActive = useRef(0);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    projects.forEach(({ media }) => { const image = new Image(); image.decoding = 'async'; image.src = media; });
    trackEvent('view_portfolio', { projects: projects.map((project) => project.name).join(', ') });
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .08 });
    if (ref.current) observer.observe(ref.current);
    let frame = 0;
    const update = () => {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        const distance = Math.max(1, ref.current.offsetHeight - window.innerHeight);
        const next = clamp(-rect.top / distance, 0, .9999);
        setProgress((current) => Math.abs(current - next) > .004 ? next : current);
        const active = Math.min(projects.length - 1, Math.floor(next * projects.length));
        if (active !== lastActive.current) {
          lastActive.current = active;
          trackEvent('view_project', { project: projects[active].name });
        }
      }
      frame = window.requestAnimationFrame(update);
    };
    frame = window.requestAnimationFrame(update);
    return () => { observer.disconnect(); window.cancelAnimationFrame(frame); };
  }, []);

  const activeIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
  const phase = progress * projects.length;
  const positions = [
    { x: -27, y: 7, r: -7 },
    { x: 23, y: -15, r: 6 },
    { x: 28, y: 22, r: 4 },
    { x: -20, y: -24, r: -5 },
  ];

  return (
    <section ref={ref} id="etudes-de-cas" className={`iv-work-scene ${visible ? 'is-visible' : ''}`}>
      <div className="iv-work-scene-sticky">
        <div className="iv-section-topline"><span>{t.label}</span><span>02 / 07</span></div>
        <div className="iv-work-scene-heading"><div><span className="iv-label">{t.kicker}</span><h2><span>{t.title[0]}</span><span>{t.title[1]}</span></h2></div><div className="iv-work-scene-intro"><p>{t.body}</p><button type="button" className="iv-work-simple-cta" onClick={onQuoteClick}><span>{t.quote}</span><b aria-hidden="true">↗</b></button></div></div>
        <div className="iv-work-canvas" aria-label={t.scroll}>
          <div className="iv-work-canvas-crosshair" aria-hidden="true"><i /><i /><i /><i /></div>
          <div className="iv-work-canvas-label" aria-hidden="true"><span>{t.scroll}</span><b>{String(activeIndex + 1).padStart(2, '0')} / 04</b></div>
          {projects.map((project, index) => {
            const position = positions[index];
            const distance = index - phase + .5;
            const distanceAbs = Math.abs(distance);
            const opacity = clamp(1.08 - distanceAbs * .8, .16, 1);
            const scale = index === activeIndex ? 1 : clamp(.78 + (1 - distanceAbs) * .08, .72, .86);
            const blur = index === activeIndex ? 0 : clamp(distanceAbs * 1.5, 0, 2.5);
            return <a key={project.id} href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${t.view}`} className={`iv-work-float-card ${index === activeIndex ? 'is-active' : ''}`} style={{ '--card-x': `${position.x + Math.sin(phase * .9 + index) * 3}%`, '--card-y': `${position.y + Math.cos(phase * .7 + index) * 2}%`, '--card-rotate': `${position.r + Math.sin(phase + index) * 1.5}deg`, '--card-opacity': opacity, '--card-scale': scale, '--card-blur': `${blur}px`, zIndex: index === activeIndex ? 5 : 4 - index } as React.CSSProperties}>
              <div className="iv-work-float-media"><div className="iv-work-float-bar"><span /><span /><span /><small>WEBSITE</small></div><img src={project.media} alt={`${project.name} — aperçu du site`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></div>
              <div className="iv-work-float-meta"><span>0{project.id} · {project.sector}</span><strong>{project.name}</strong><small>{t.view} <b aria-hidden="true">↗</b></small></div>
            </a>;
          })}
        </div>
        <div className="iv-work-scene-footer"><span>{t.scroll}</span><div className="iv-work-scene-progress"><i style={{ transform: `scaleX(${Math.max(progress, .04)})` }} /></div><span>{String(activeIndex + 1).padStart(2, '0')} / 04</span></div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
