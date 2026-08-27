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
  fr: { label: 'NOS RÉALISATIONS', kicker: 'SELECTED DIGITAL WORK', title: ['DES SITES', 'QUI BOUGENT.'], body: 'Quatre univers. Une même exigence : donner aux marques une présence qui se remarque.', view: 'Ouvrir le site', quote: 'Parler de mon projet', scroll: 'NOS SITES' },
  en: { label: 'OUR WORK', kicker: 'SELECTED DIGITAL WORK', title: ['WEBSITES', 'THAT MOVE.'], body: 'Four worlds. One standard: giving brands a presence people remember.', view: 'Open website', quote: 'Talk about my project', scroll: 'OUR SITES' },
  ar: { label: 'أعمالنا', kicker: 'SELECTED DIGITAL WORK', title: ['مواقع', 'تتحرك.'], body: 'أربعة عوالم. هدف واحد: منح العلامات حضوراً لا يُنسى.', view: 'فتح الموقع', quote: 'تحدث عن مشروعي', scroll: 'مواقعنا' },
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    projects.forEach(({ media }) => { const image = new Image(); image.decoding = 'async'; image.src = media; });
    trackEvent('view_portfolio', { projects: projects.map((project) => project.name).join(', ') });
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="etudes-de-cas" className={`iv-work-scene ${visible ? 'is-visible' : ''}`}>
      <div className="iv-work-scene-sticky">
        <div className="iv-section-topline"><span>{t.label}</span><span>02 / 07</span></div>
        <div className="iv-work-scene-heading"><div><span className="iv-label">{t.kicker}</span><h2><span>{t.title[0]}</span><span>{t.title[1]}</span></h2></div><div className="iv-work-scene-intro"><p>{t.body}</p><button type="button" className="iv-work-simple-cta" onClick={onQuoteClick}><span>{t.quote}</span><b aria-hidden="true">↗</b></button></div></div>
        <div className="iv-work-fixed-grid" aria-label={t.scroll}>
          {projects.map((project) => <a key={project.id} href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${t.view}`} className="iv-work-fixed-card" onClick={() => trackEvent('view_project', { project: project.name })}>
            <div className="iv-work-float-media"><div className="iv-work-float-bar"><span /><span /><span /><small>WEBSITE</small></div><img src={project.media} alt={`${project.name} — aperçu du site`} loading={project.id === 1 ? 'eager' : 'lazy'} decoding="async" /></div>
            <div className="iv-work-float-meta"><span>0{project.id} · {project.sector}</span><strong>{project.name}</strong><small>{t.view} <b aria-hidden="true">↗</b></small></div>
          </a>)}
        </div>
        <div className="iv-work-scene-footer"><span>{t.scroll}</span><div className="iv-work-scene-progress"><i /></div><span>04 / 04</span></div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
