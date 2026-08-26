import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project { id: number; name: string; sector: string; summary: string; results: string[]; media: string; website?: string }
const projects: Project[] = [
  { id: 1, name: 'Center Bissan', sector: 'Bien-être & services', summary: 'Une présence de marque cohérente pour attirer et rassurer les clientes locales.', results: ['+250% ROI', 'Croissance sociale'], media: '/images/ivision-hero-editorial.webp' },
  { id: 2, name: 'Lecmo Oud', sector: 'Parfumerie & e-commerce', summary: 'Une expérience digitale premium pour une marque de parfums et de oud.', results: ['+120K interactions', 'Trafic qualifié'], media: '/images/ivision-project-lecmo.webp' },
  { id: 3, name: 'White Aura', sector: 'Cosmétiques premium', summary: 'Un parcours de vente conçu pour valoriser une offre beauté premium.', results: ['+100% ROI', 'E-commerce live'], media: '/images/ivision-project-white-aura.webp' },
  { id: 4, name: 'MOVESMART', sector: 'Immobilier & plateforme digitale', summary: 'Une plateforme digitale pensée pour un marché international.', results: ['Plateforme live', 'Marché Dubai'], media: '/images/ivision-project-mobility.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 5, name: 'FIDALI', sector: 'Branding & plateforme digitale', summary: 'Une identité visuelle forte prête à accompagner le lancement.', results: ['Plateforme live', 'Lancement prêt'], media: '/images/ivision-project-fidali.webp' }
];
const copy = {
  fr: { label: 'NOS RÉALISATIONS', building: 'BÂTIR', words: ['DES CAMPAGNES', 'DES MARQUES', 'DU CONTENU', 'DES SITES', 'DES COMMUNAUTÉS'], ending: 'AVEC 100% DE PASSION ET UN IMPACT AUDACIEUX.', view: 'Voir le projet', quote: 'Parler de mon projet' },
  en: { label: 'OUR WORK', building: 'BUILDING', words: ['CAMPAIGNS', 'BRANDS', 'CONTENT', 'WEBSITES', 'COMMUNITIES'], ending: 'WITH 100% PASSION & BOLD IMPACT.', view: 'View project', quote: 'Talk about my project' },
  ar: { label: 'أعمالنا', building: 'نبني', words: ['حملات', 'علامات', 'محتوى', 'مواقع', 'مجتمعات'], ending: 'بشغف وتأثير جريء.', view: 'مشاهدة المشروع', quote: 'تحدث عن مشروعي' }
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
        <div className="pipam-work-feature-copy"><span>{selected.sector}</span><h3>{selected.name}</h3><p>{selected.summary}</p><div className="pipam-work-results">{selected.results.map((result) => <strong key={result}>{result}</strong>)}</div><div className="pipam-project-actions"><button type="button" className="pipam-text-link" onClick={onQuoteClick}><span>{t.quote}</span><span aria-hidden="true">↗</span></button>{selected.website && <a className="pipam-text-link" href={selected.website} target="_blank" rel="noopener noreferrer"><span>{t.view}</span><span aria-hidden="true">↗</span></a>}</div></div>
        <div className="pipam-work-feature-media"><img src={selected.media} alt={`${selected.name} — aperçu`} loading="lazy" decoding="async" /></div>
      </div>
      <div className="pipam-work-project-list">{projects.map((project) => <button key={project.id} type="button" className={activeId === project.id ? 'is-active' : ''} onClick={() => selectProject(project)}><span>0{project.id}</span><strong>{project.name}</strong><i aria-hidden="true">↗</i></button>)}</div>
      <div className="pipam-client-ticker"><span>ILS NOUS FONT CONFIANCE</span><div className="pipam-client-track" aria-hidden="true">{['CENTER BISSAN', 'LECMO OUD', 'WHITE AURA', 'MOVESMART', 'FIDALI', 'CENTER BISSAN', 'LECMO OUD', 'WHITE AURA'].map((name, index) => <strong key={`${name}-${index}`}>{name}</strong>)}</div></div>
    </section>
  );
};
export default PortfolioGallery;
