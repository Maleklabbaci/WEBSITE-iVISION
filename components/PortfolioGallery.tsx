import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project { id: number; name: string; sector: string; summary: string; tasks: string[]; results: string[]; media: string; website?: string }

const projects: Project[] = [
  { id: 1, name: 'Center Bissan', sector: 'Bien-être & services', summary: 'Une présence de marque cohérente pour attirer et rassurer les clientes locales.', tasks: ['Contenu', 'Meta Ads', 'Branding'], results: ['+250% ROI', 'Croissance sociale'], media: '/images/ivision-hero-editorial.webp' },
  { id: 2, name: 'Lecmo Oud', sector: 'Parfumerie & e-commerce', summary: 'Une expérience digitale premium pour une marque de parfums et de oud haut de gamme.', tasks: ['Stratégie', 'E-commerce', 'Ads'], results: ['+120K interactions', 'Trafic qualifié'], media: '/images/ivision-project-fashion.webp', website: 'https://www.lecmooud.com' },
  { id: 3, name: 'White Aura', sector: 'Cosmétiques premium', summary: 'Un site et un parcours de vente conçus pour valoriser une offre beauté premium.', tasks: ['Site web', 'Branding', 'Growth'], results: ['+100% ROI', 'E-commerce live'], media: '/images/ivision-project-fashion.webp', website: 'https://white-aura.vercel.app' },
  { id: 4, name: 'MOVESMART', sector: 'Immobilier & plateforme digitale', summary: 'Une identité claire et une plateforme digitale pensée pour un marché international.', tasks: ['Branding', 'UI/UX', 'Plateforme'], results: ['Plateforme live', 'Marché Dubai'], media: '/images/ivision-project-mobility.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 5, name: 'FIDALI', sector: 'Branding & plateforme digitale', summary: 'Une identité visuelle forte et une plateforme prête à accompagner le lancement.', tasks: ['Identité', 'Produit digital', 'Développement'], results: ['Plateforme live', 'Lancement prêt'], media: '/images/ivision-orbit.webp', website: 'https://fidali.vercel.app' },
];

const labels = {
  fr: { eyebrow: 'NOTRE TRAVAIL', title: 'BÂTIR DES', words: ['MARQUES', 'CONTENUS', 'CAMPAGNES', 'SITES', 'COMMUNAUTÉS'], work: 'Projets sélectionnés', quote: 'Parler de mon projet', view: 'Voir le projet', clients: 'Des marques qui nous font confiance' },
  en: { eyebrow: 'OUR WORK', title: 'BUILDING', words: ['BRANDS', 'CONTENT', 'CAMPAIGNS', 'WEBSITES', 'COMMUNITIES'], work: 'Selected projects', quote: 'Talk about my project', view: 'View project', clients: 'Brands that trust us' },
  ar: { eyebrow: 'أعمالنا', title: 'نبني', words: ['علامات', 'محتوى', 'حملات', 'مواقع', 'مجتمعات'], work: 'مشاريع مختارة', quote: 'تحدث عن مشروعي', view: 'زيارة المشروع', clients: 'علامات تثق بنا' },
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = labels[language];
  const [selectedId, setSelectedId] = useState(1);
  const [wordIndex, setWordIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const selected = projects.find((project) => project.id === selectedId) || projects[0];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setInterval(() => setWordIndex((current) => (current + 1) % t.words.length), 1900);
    return () => window.clearInterval(timer);
  }, [visible, t.words.length]);

  const selectProject = (project: Project) => {
    setSelectedId(project.id);
    trackEvent('view_case_study', { case_name: project.name });
  };

  return (
    <section ref={ref} id="etudes-de-cas" className={`pipam-work ${visible ? 'is-visible' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.eyebrow}<span className="pipam-section-number">03 / 07</span></div>
      <div className="pipam-work-title"><h2><span>{t.title}</span><span className="is-gradient pipam-changing-word" aria-live="polite" key={t.words[wordIndex]}>{t.words[wordIndex]}</span></h2></div>
      <div className="pipam-work-stage">
        <div className="pipam-work-orbit" aria-hidden="true"><img src="/images/ivision-orbit.webp" alt="" loading="lazy" decoding="async" /></div>
        <div className="pipam-project-visual"><img key={selected.media} src={selected.media} alt={`${selected.name} — aperçu de projet`} loading="lazy" decoding="async" /><span className="pipam-project-stamp">iV / {String(selected.id).padStart(2, '0')}</span></div>
        <div className="pipam-project-info">
          <p className="pipam-project-sector">{selected.sector}</p>
          <h3>{selected.name}</h3>
          <p className="pipam-project-summary">{selected.summary}</p>
          <div className="pipam-project-results">{selected.results.map((result) => <span key={result}>{result}</span>)}</div>
          <div className="pipam-project-actions">
            <button type="button" onClick={() => { trackEvent('case_study_quote_click', { case_name: selected.name }); onQuoteClick(); }} className="pipam-text-link"><span>{t.quote}</span><span aria-hidden="true">↗</span></button>
            {selected.website && <a className="pipam-text-link" href={selected.website} target="_blank" rel="noopener noreferrer"><span>{t.view}</span><span aria-hidden="true">↗</span></a>}
          </div>
        </div>
      </div>
      <div className="pipam-project-nav" role="tablist" aria-label={t.work}>
        {projects.map((project) => <button key={project.id} type="button" role="tab" aria-selected={selected.id === project.id} onClick={() => selectProject(project)} className={selected.id === project.id ? 'is-active' : ''}><span>{String(project.id).padStart(2, '0')}</span><strong>{project.name}</strong><i aria-hidden="true">↗</i></button>)}
      </div>
      <div className="pipam-client-ticker" aria-label={t.clients}><span>{t.clients}</span><div className="pipam-client-track">{[...projects, ...projects].map((project, index) => <strong key={`${project.name}-${index}`}>{project.name}</strong>)}</div></div>
    </section>
  );
};

export default PortfolioGallery;
