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
  fr: { label: 'NOS RÉALISATIONS', kicker: 'SELECTED DIGITAL WORK', title: ['DES SITES', 'QUI BOUGENT.'], body: 'Des expériences digitales qui donnent une forme claire aux marques et une place forte aux idées.', view: 'Voir le site', quote: 'Parler de mon projet' },
  en: { label: 'OUR WORK', kicker: 'SELECTED DIGITAL WORK', title: ['WEBSITES', 'THAT MOVE.'], body: 'Digital experiences that give brands a clear shape and ideas a stronger place.', view: 'View website', quote: 'Talk about my project' },
  ar: { label: 'أعمالنا', kicker: 'SELECTED DIGITAL WORK', title: ['مواقع', 'تتحرك.'], body: 'تجارب رقمية تمنح العلامات شكلاً واضحاً وأفكاراً أكثر حضوراً.', view: 'فتح الموقع', quote: 'تحدث عن مشروعي' },
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }
const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    projects.forEach(({ media }) => { const image = new Image(); image.decoding = 'async'; image.src = media; });
    trackEvent('view_portfolio', { projects: projects.map((project) => project.name).join(', ') });
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="etudes-de-cas" className={`iv-work-simple ${visible ? 'is-visible' : ''}`}>
      <div className="iv-section-topline"><span>{t.label}</span><span>02 / 07</span></div>
      <div className="iv-work-simple-heading"><div><span className="iv-label">{t.kicker}</span><h2><span>{t.title[0]}</span><span>{t.title[1]}</span></h2></div><div className="iv-work-simple-intro"><p>{t.body}</p><button type="button" className="iv-work-simple-cta" onClick={onQuoteClick}><span>{t.quote}</span><b aria-hidden="true">↗</b></button></div></div>
      <div className="iv-work-simple-grid">
        {projects.map((project, index) => <article key={project.id} className={`iv-work-card ${index === 0 ? 'is-featured' : ''}`}>
          <a href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${t.view}`}><div className="iv-work-card-media"><div className="iv-work-card-bar"><span /><span /><span /><small>WEBSITE</small></div><img src={project.media} alt={`${project.name} — aperçu du site`} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" /></div><div className="iv-work-card-meta"><span>0{project.id} · {project.sector}</span><h3>{project.name}</h3><p>{project.summary}</p><strong>{t.view} <b aria-hidden="true">↗</b></strong></div></a>
        </article>)}
      </div>
    </section>
  );
};

export default PortfolioGallery;
