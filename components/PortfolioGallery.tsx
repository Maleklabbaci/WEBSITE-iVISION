import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project {
  id: number;
  name: string;
  sector: string;
  summary: string;
  results: string[];
  media: string;
  website: string;
}

const projects: Project[] = [
  { id: 1, name: 'DC16 X WYN', sector: 'E-commerce · streetwear', summary: 'Une boutique minimaliste et radicale pensée autour du produit et de la collection.', results: ['Boutique e-commerce', 'Collection live'], media: '/images/project-dc16.webp', website: 'https://dc16.shop/' },
  { id: 2, name: 'MoveSmart', sector: 'Immobilier · Dubai', summary: 'Une expérience premium pour présenter les opportunités, la résidence et la création d’entreprise aux Émirats.', results: ['Hero immersif', 'Parcours conseil'], media: '/images/project-movesmart.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 3, name: 'Fidali', sector: 'SaaS · fidélité digitale', summary: 'Un produit SaaS clair qui transforme les cartes papier en programme de fidélité digital.', results: ['Produit SaaS', 'Onboarding digital'], media: '/images/project-fidali.webp', website: 'https://fidali.vercel.app/' },
  { id: 4, name: 'White Aura', sector: 'Cosmétiques · e-commerce', summary: 'Une boutique beauté immersive qui met en scène la nature, les produits et l’histoire de la marque.', results: ['Boutique premium', '58 wilayas livrées'], media: '/images/project-white-aura.webp', website: 'https://white-aura.vercel.app/' },
];

const copy = {
  fr: { label: 'NOS RÉALISATIONS', kicker: 'SCROLL STORY / 04 PROJETS', building: 'BÂTIR', words: ['DES CAMPAGNES', 'DES MARQUES', 'DU CONTENU', 'DES SITES'], ending: 'AVEC 100% DE PASSION ET UN IMPACT AUDACIEUX.', view: 'Ouvrir le site', quote: 'Parler de mon projet', scrollHint: 'SCROLLEZ POUR EXPLORER', website: 'WEBSITE' },
  en: { label: 'OUR WORK', kicker: 'SCROLL STORY / 04 PROJECTS', building: 'BUILDING', words: ['CAMPAIGNS', 'BRANDS', 'CONTENT', 'WEBSITES'], ending: 'WITH 100% PASSION & BOLD IMPACT.', view: 'Open the site', quote: 'Talk about my project', scrollHint: 'SCROLL TO EXPLORE', website: 'WEBSITE' },
  ar: { label: 'أعمالنا', kicker: 'قصة التمرير / ٠٤ مشاريع', building: 'نبني', words: ['حملات', 'علامات', 'محتوى', 'مواقع'], ending: 'بشغف وتأثير جريء.', view: 'فتح الموقع', quote: 'تحدث عن مشروعي', scrollHint: 'مرر للاستكشاف', website: 'WEBSITE' },
};

interface PortfolioGalleryProps {
  language: Language;
  onQuoteClick: () => void;
}

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = copy[language];
  const sectionRef = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const activeIndex = Math.min(projects.length - 1, Math.floor(progress * projects.length));
  const selected = projects[activeIndex];

  useEffect(() => {
    projects.forEach(({ media }) => {
      const image = new Image();
      image.decoding = 'async';
      image.src = media;
    });
  }, []);

  useEffect(() => {
    let frame = 0;
    const updateProgress = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const distance = Math.max(sectionRef.current.offsetHeight - window.innerHeight, 1);
      setProgress(Math.min(0.9999, Math.max(0, -rect.top / distance)));
      frame = 0;
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateProgress);
    };
    updateProgress();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    trackEvent('view_case_study', { case_name: selected.name });
  }, [selected.name]);

  return (
    <section ref={sectionRef} id="etudes-de-cas" className="iv-work-scroll" aria-label={t.label}>
      <div className="iv-work-sticky">
        <div className="iv-work-topline">
          <span className="iv-work-status"><i aria-hidden="true" />{t.label}</span>
          <span className="iv-work-kicker">{t.kicker}</span>
          <span className="iv-work-section-number">02 / 07</span>
        </div>

        <div className="iv-work-heading">
          <h2>
            <span>{t.building}</span>
            <span key={selected.id} className="iv-work-changing-word">{t.words[activeIndex]}</span>
          </h2>
          <p>{t.ending}</p>
        </div>

        <div className="iv-work-stage">
          <div className="iv-work-copy" key={selected.id}>
            <div className="iv-work-project-index"><span>0{selected.id}</span><b /> <span>0{projects.length}</span></div>
            <span className="iv-work-sector">{selected.sector}</span>
            <h3>{selected.name}</h3>
            <p>{selected.summary}</p>
            <div className="iv-work-results" aria-label="Résultats du projet">
              {selected.results.map((result) => <span key={result}>{result}</span>)}
            </div>
            <div className="iv-work-actions">
              <button type="button" onClick={onQuoteClick} className="iv-work-link"><span>{t.quote}</span><b aria-hidden="true">↗</b></button>
              <a href={selected.website} target="_blank" rel="noopener noreferrer" className="iv-work-link"><span>{t.view}</span><b aria-hidden="true">↗</b></a>
            </div>
          </div>

          <a href={selected.website} target="_blank" rel="noopener noreferrer" className="iv-work-frame" aria-label={`${selected.name} — ${t.view}`}>
            <div className="iv-work-frame-bar"><span /><span /><span /><small>{t.website}</small></div>
            <div className="iv-work-frame-image">
              <img key={selected.id} src={selected.media} alt={`${selected.name} — aperçu du site`} decoding="async" />
              <span className="iv-work-frame-caption">{selected.name}</span>
            </div>
          </a>
        </div>

        <div className="iv-work-bottomline">
          <span>{t.scrollHint}</span>
          <div className="iv-work-progress" aria-hidden="true"><i style={{ transform: `scaleX(${Math.max(0.06, progress)})` }} /></div>
          <div className="iv-work-dots" aria-hidden="true">{projects.map((project) => <i key={project.id} className={selected.id === project.id ? 'is-active' : ''} />)}</div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
