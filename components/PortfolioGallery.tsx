import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project { id: number; name: string; sector: string; summary: string; results: string[]; media: string; website: string }
const projects: Project[] = [
  { id: 1, name: 'DC16 X WYN', sector: 'E-commerce · streetwear', summary: 'Une boutique minimaliste et radicale pour une collection streetwear pensée autour du produit.', results: ['Boutique e-commerce', 'Collection live'], media: '/images/project-dc16.webp', website: 'https://dc16.shop/' },
  { id: 2, name: 'MoveSmart', sector: 'Immobilier · Dubai', summary: 'Une expérience premium pour présenter les opportunités immobilières, la création d’entreprise et la résidence aux Émirats.', results: ['Hero immersif', 'Parcours conseil'], media: '/images/project-movesmart.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 3, name: 'Fidali', sector: 'SaaS · fidélité digitale', summary: 'Un produit SaaS clair qui transforme les cartes papier en programme de fidélité digital pour les commerçants algériens.', results: ['Produit SaaS', 'Onboarding digital'], media: '/images/project-fidali.webp', website: 'https://fidali.vercel.app/' },
  { id: 4, name: 'White Aura', sector: 'Cosmétiques · e-commerce', summary: 'Une boutique beauté immersive qui met en scène la nature, les produits et l’histoire de la marque.', results: ['Boutique premium', '58 wilayas livrées'], media: '/images/project-white-aura.webp', website: 'https://white-aura.vercel.app/' }
];
const copy = {
  fr: { label: 'NOS RÉALISATIONS', building: 'BÂTIR', words: ['DES CAMPAGNES', 'DES MARQUES', 'DU CONTENU', 'DES SITES'], ending: 'AVEC 100% DE PASSION ET UN IMPACT AUDACIEUX.', view: 'Ouvrir le site', quote: 'Parler de mon projet' },
  en: { label: 'OUR WORK', building: 'BUILDING', words: ['CAMPAIGNS', 'BRANDS', 'CONTENT', 'WEBSITES'], ending: 'WITH 100% PASSION & BOLD IMPACT.', view: 'Open the site', quote: 'Talk about my project' },
  ar: { label: 'أعمالنا', building: 'نبني', words: ['حملات', 'علامات', 'محتوى', 'مواقع'], ending: 'بشغف وتأثير جريء.', view: 'فتح الموقع', quote: 'تحدث عن مشروعي' }
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }
const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = copy[language];
  const [wordIndex, setWordIndex] = useState(0);
  const [activeId, setActiveId] = useState(1);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const selected = projects.find((project) => project.id === activeId) || projects[0];
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    const timer = window.setInterval(() => setWordIndex((value) => (value + 1) % t.words.length), 2200);
    return () => window.clearInterval(timer);
  }, [visible, t.words.length]);
  const selectProject = (project: Project) => { setActiveId(project.id); trackEvent('view_case_study', { case_name: project.name }); };
  return (
    <section ref={ref} id="etudes-de-cas" className={`pipam-work-scene ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.label}<span className="pipam-section-number">02 / 07</span></div>
      <div className="pipam-work-copy"><h2><span>{t.building}</span><span className="pipam-changing-word" key={t.words[wordIndex]}>{t.words[wordIndex]}</span></h2><p>{t.ending}</p></div>
      <div className="pipam-work-feature">
        <div className="pipam-work-feature-copy"><span>{selected.sector}</span><h3>{selected.name}</h3><p>{selected.summary}</p><div className="pipam-work-results">{selected.results.map((result) => <strong key={result}>{result}</strong>)}</div><div className="pipam-project-actions"><button type="button" className="pipam-text-link" onClick={onQuoteClick}><span>{t.quote}</span><span aria-hidden="true">↗</span></button><a className="pipam-text-link" href={selected.website} target="_blank" rel="noopener noreferrer"><span>{t.view}</span><span aria-hidden="true">↗</span></a></div></div>
        <a className="pipam-work-feature-media" href={selected.website} target="_blank" rel="noopener noreferrer" aria-label={`${selected.name} — ouvrir le site`}><img src={selected.media} alt={`${selected.name} — aperçu`} loading="lazy" decoding="async" /></a>
      </div>
      <div className="pipam-work-project-list">{projects.map((project) => <button key={project.id} type="button" className={activeId === project.id ? 'is-active' : ''} onClick={() => selectProject(project)}><span>0{project.id}</span><strong>{project.name}</strong><i aria-hidden="true">↗</i></button>)}</div>
      <div className="pipam-client-ticker"><span>ILS NOUS FONT CONFIANCE</span><div className="pipam-client-track" aria-hidden="true">{projects.concat(projects).map((project, index) => <strong key={`${project.name}-${index}`}>{project.name}</strong>)}</div></div>
    </section>
  );
};
export default PortfolioGallery;
