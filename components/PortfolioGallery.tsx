import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project {
  id: number;
  name: string;
  sector: string;
  summary: string;
  description: string;
  tasks: string[];
  results: string[];
  logo: string;
  media: string;
  website?: string;
}

const projects: Project[] = [
  { id: 1, name: 'Center Bissan', sector: 'Bien-être & services', summary: 'Une présence de marque cohérente pour attirer et rassurer les clientes locales.', description: 'Contenu, campagnes Meta Ads et branding visuel pour faire émerger la marque localement.', tasks: ['Contenu', 'Meta Ads', 'Branding'], results: ['+250% ROI', 'Croissance sociale'], logo: 'https://i.ibb.co/kVbgDJnn/image.png', media: '/images/ivision-hero-editorial.webp' },
  { id: 2, name: 'Lecmo Oud', sector: 'Parfumerie & e-commerce', summary: 'Une expérience digitale premium pour une marque de parfums et de oud haut de gamme.', description: 'Stratégie digitale, création de contenu et parcours e-commerce pensé pour la conversion.', tasks: ['Stratégie', 'E-commerce', 'Ads'], results: ['+120K interactions', 'Trafic qualifié'], logo: 'https://i.ibb.co/BVTDnpBZ/image.png', media: '/images/ivision-project-fashion.webp', website: 'https://www.lecmooud.com' },
  { id: 3, name: 'White Aura', sector: 'Cosmétiques premium', summary: 'Un site et un parcours de vente conçus pour valoriser une offre beauté premium.', description: 'Un écosystème de marque qui relie image, expérience et vente en ligne.', tasks: ['Site web', 'Branding', 'Growth'], results: ['+100% ROI', 'E-commerce live'], logo: 'https://i.ibb.co/tTc50H8n/white-aura.png', media: '/images/ivision-project-fashion.webp', website: 'https://white-aura.vercel.app' },
  { id: 4, name: 'MOVESMART', sector: 'Immobilier & plateforme digitale', summary: 'Une identité claire et une plateforme digitale pensée pour un marché international.', description: 'Branding, UI/UX et plateforme digitale pour installer une nouvelle mobilité immobilière.', tasks: ['Branding', 'UI/UX', 'Plateforme'], results: ['Plateforme live', 'Marché Dubai'], logo: 'https://i.ibb.co/60PJ8PVw/aass.png', media: '/images/ivision-project-mobility.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 5, name: 'FIDALI', sector: 'Branding & plateforme digitale', summary: 'Une identité visuelle forte et une plateforme prête à accompagner le lancement.', description: 'De l’identité au produit digital, un socle clair pour transformer une ambition en lancement.', tasks: ['Identité', 'Produit digital', 'Développement'], results: ['Plateforme live', 'Lancement prêt'], logo: 'https://i.ibb.co/7xtLynLz/logo-white.png', media: '/images/ivision-orbit.webp', website: 'https://fidali.vercel.app' },
];

const labels = {
  fr: { eyebrow: 'NOS RÉALISATIONS', title: 'BÂTIR DES', accent: 'MARQUES QUI AVANCENT.', work: 'Notre travail', results: 'Résultats', view: 'Voir le projet', quote: 'Parler de mon projet', counter: '/ 05' },
  en: { eyebrow: 'OUR WORK', title: 'BUILDING', accent: 'BRANDS THAT MOVE.', work: 'Our work', results: 'Results', view: 'View project', quote: 'Talk about my project', counter: '/ 05' },
  ar: { eyebrow: 'أعمالنا', title: 'نبني', accent: 'علامات تتقدم.', work: 'عملنا', results: 'النتائج', view: 'زيارة المشروع', quote: 'تحدث عن مشروعي', counter: '/ 05' },
};

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void }

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = labels[language];
  const [selectedId, setSelectedId] = useState(1);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const selected = projects.find((project) => project.id === selectedId) || projects[0];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const selectProject = (project: Project) => {
    setSelectedId(project.id);
    trackEvent('view_case_study', { case_name: project.name });
  };

  return (
    <section ref={ref} id="etudes-de-cas" className={`pipam-work ${visible ? 'is-visible' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.eyebrow}<span className="pipam-section-number">03 / 07</span></div>
      <div className="pipam-work-title"><h2><span>{t.title}</span><span className="is-gradient">{t.accent}</span></h2></div>
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
    </section>
  );
};

export default PortfolioGallery;
