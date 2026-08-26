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
  fr: { label: 'NOS RÉALISATIONS', building: 'BÂTIR', words: ['DES CAMPAGNES', 'DES MARQUES', 'DU CONTENU', 'DES SITES'], ending: 'AVEC 100% DE PASSION ET UN IMPACT AUDACIEUX.', view: 'Ouvrir le site', quote: 'Parler de mon projet', scrollHint: 'SCROLLEZ POUR EXPLORER' },
  en: { label: 'OUR WORK', building: 'BUILDING', words: ['CAMPAIGNS', 'BRANDS', 'CONTENT', 'WEBSITES'], ending: 'WITH 100% PASSION & BOLD IMPACT.', view: 'Open the site', quote: 'Talk about my project', scrollHint: 'SCROLL TO EXPLORE' },
  ar: { label: 'أعمالنا', building: 'نبني', words: ['حملات', 'علامات', 'محتوى', 'مواقع'], ending: 'بشغف وتأثير جريء.', view: 'فتح الموقع', quote: 'تحدث عن مشروعي', scrollHint: 'مرر للاستكشاف' }
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }
const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const activeIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
  const selected = projects[activeIndex];

  useEffect(() => {
    projects.forEach((project) => { const image = new Image(); image.src = project.media; });
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!visible) return;
    let frame = 0;
    const update = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const scrollable = Math.max(ref.current.offsetHeight - window.innerHeight, 1);
      const next = Math.min(0.9999, Math.max(0, -rect.top / scrollable));
      setProgress(next);
      frame = 0;
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) window.cancelAnimationFrame(frame); };
  }, [visible]);
  useEffect(() => { trackEvent('view_case_study', { case_name: selected.name }); }, [selected.name]);

  return (
    <section ref={ref} id="etudes-de-cas" className={`pipam-work-scroll ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-work-sticky">
        <div className="pipam-section-meta"><span className="pipam-pulse" />{t.label}<span className="pipam-section-number">02 / 07</span></div>
        <div className="pipam-work-scroll-head"><h2><span>{t.building}</span><span className="pipam-changing-word" key={selected.id}>{t.words[activeIndex]}</span></h2><p>{t.ending}</p></div>
        <div className="pipam-work-scroll-stage">
          <div className="pipam-work-scroll-copy"><span>{selected.sector}</span><h3 key={selected.id}>{selected.name}</h3><p>{selected.summary}</p><div className="pipam-work-results">{selected.results.map((result) => <strong key={result}>{result}</strong>)}</div><div className="pipam-project-actions"><button type="button" className="pipam-text-link" onClick={onQuoteClick}><span>{t.quote}</span><span aria-hidden="true">↗</span></button><a className="pipam-text-link" href={selected.website} target="_blank" rel="noopener noreferrer"><span>{t.view}</span><span aria-hidden="true">↗</span></a></div></div>
          <a className="pipam-website-frame" key={selected.id} href={selected.website} target="_blank" rel="noopener noreferrer" aria-label={`${selected.name} — ouvrir le site`}><div className="pipam-website-frame-bar"><span /><span /><span /><small>WEBSITE</small></div><img src={selected.media} alt={`${selected.name} — aperçu du site`} loading="lazy" decoding="async" /></a>
        </div>
        <div className="pipam-work-scroll-footer"><span>{t.scrollHint}</span><div className="pipam-scroll-progress"><i style={{ transform: `scaleX(${Math.max(.08, progress)})` }} /></div><span>0{activeIndex + 1} / 0{projects.length}</span></div>
      </div>
      <div className="pipam-work-scroll-steps" aria-label="Projets iVISION">{projects.map((project) => <div key={project.id} className={`pipam-work-step ${selected.id === project.id ? 'is-active' : ''}`} aria-label={project.name} />)}</div>
    </section>
  );
};
export default PortfolioGallery;
