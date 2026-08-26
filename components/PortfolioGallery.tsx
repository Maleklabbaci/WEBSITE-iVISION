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
    projects.forEach(({ media }) => { const image = new Image(); image.decoding = 'async'; image.src = media; });
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
    <section ref={ref} id="etudes-de-cas" className={`iv-work-scroll ${visible ? 'is-visible' : ''}`}>
      <div className="iv-work-sticky">
        <div className="iv-section-topline"><span>{t.label}</span><span>02 / 07</span></div>
        <div className="iv-work-heading"><h2><span>{t.building}</span><span className="iv-work-changing-word" key={selected.id}>{t.words[activeIndex]}</span></h2><p>{t.ending}</p></div>
        <div className="iv-work-stage">
          <div className="iv-work-copy"><div className="iv-work-project-index"><span>0{selected.id}</span><b /><span>0{projects.length}</span></div><span className="iv-work-sector">{selected.sector}</span><h3 key={selected.id}>{selected.name}</h3><p>{selected.summary}</p><div className="iv-work-results">{selected.results.map((result) => <span key={result}>{result}</span>)}</div><div className="iv-work-actions"><button type="button" className="iv-work-link" onClick={onQuoteClick}><span>{t.quote}</span><b aria-hidden="true">↗</b></button><a className="iv-work-link" href={selected.website} target="_blank" rel="noopener noreferrer"><span>{t.view}</span><b aria-hidden="true">↗</b></a></div></div>
          <a className="iv-work-frame" key={selected.id} href={selected.website} target="_blank" rel="noopener noreferrer" aria-label={`${selected.name} — ouvrir le site`}><div className="iv-work-frame-bar"><span /><span /><span /><small>WEBSITE</small></div><div className="iv-work-frame-image"><img src={selected.media} alt={`${selected.name} — aperçu du site`} loading="eager" decoding="async" /><span className="iv-work-frame-caption">{selected.name}</span></div></a>
        </div>
        <div className="iv-work-bottomline"><span>{t.scrollHint}</span><div className="iv-work-progress"><i style={{ transform: `scaleX(${Math.max(.08, progress)})` }} /></div><div className="iv-work-dots">{projects.map((project) => <i key={project.id} className={project.id === selected.id ? 'is-active' : ''} />)}</div></div>
      </div>
    </section>
  );
};
export default PortfolioGallery;
