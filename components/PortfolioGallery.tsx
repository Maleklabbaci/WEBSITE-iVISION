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
  website?: string;
}

const projects: Project[] = [
  { id: 1, name: 'Center Bissan', sector: 'Bien-être & services', summary: 'Une présence de marque cohérente pour attirer et rassurer les clientes locales.', description: 'Stratégie marketing complète pour centre de bien-être : création de contenu, campagnes Meta Ads et branding visuel.', tasks: ['Création de contenu', 'Meta Ads', 'Branding', 'Production vidéo'], results: ['+250% ROI', 'Brand Awareness', 'Croissance Social Media'], logo: 'https://i.ibb.co/kVbgDJnn/image.png' },
  { id: 2, name: 'Lecmo Oud', sector: 'Parfumerie & e-commerce', summary: 'Une expérience digitale premium pour une marque de parfums et de oud.', description: 'Marketing digital complet et création du site e-commerce pour une marque de parfums et de oud haut de gamme.', tasks: ['Stratégie digitale', 'Création de contenu', 'Meta Ads', 'Site e-commerce'], results: ['+120K Interactions', 'E-commerce Live', 'Trafic qualifié'], logo: 'https://i.ibb.co/BVTDnpBZ/image.png', website: 'https://www.lecmooud.com' },
  { id: 3, name: 'White Aura', sector: 'Cosmétiques premium', summary: 'Un site et un parcours de vente conçus pour valoriser une offre beauté premium.', description: 'Création du site web et stratégie de vente complète pour une marque de cosmétiques premium.', tasks: ['Site web', 'Stratégie de vente', 'Branding', 'Marketing digital'], results: ['+100% ROI', 'E-commerce Live', 'Croissance ventes'], logo: 'https://i.ibb.co/tTc50H8n/white-aura.png', website: 'https://white-aura.vercel.app' },
  { id: 5, name: 'MOVESMART', sector: 'Immobilier & plateforme digitale', summary: 'Une identité claire et une plateforme digitale pensée pour un marché international.', description: 'Branding complet et construction d’une plateforme digitale de A à Z pour une marque immobilière à Dubai.', tasks: ['Branding complet', 'Plateforme digitale', 'UI/UX Design', 'Développement'], results: ['Plateforme live', 'Branding premium', 'Marché Dubai'], logo: 'https://i.ibb.co/60PJ8PVw/aass.png', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 4, name: 'FIDALI', sector: 'Branding & plateforme digitale', summary: 'Une identité visuelle forte et une plateforme prête à accompagner le lancement.', description: 'Branding complet et construction d’une plateforme digitale de A à Z : identité visuelle, UI/UX et développement.', tasks: ['Branding complet', 'Plateforme digitale', 'UI/UX Design', 'Développement'], results: ['Plateforme live', 'Branding premium', 'Lancement imminent'], logo: 'https://i.ibb.co/7xtLynLz/logo-white.png', website: 'https://fidali.vercel.app' },
];

interface PortfolioGalleryProps { language: Language; onQuoteClick: () => void; }

const labels = {
  fr: { eyebrow: 'Portfolio & études de cas', title: 'DES PROJETS QUI', accent: 'FONT AVANCER.', intro: 'Des stratégies pensées pour être belles, utiles et mesurables.', choose: 'Projets sélectionnés', selected: 'Projet sélectionné', work: 'Notre intervention', results: 'Résultats clés', website: 'Voir le projet', quote: 'Parler de mon projet', assets: 'Explorer nos réalisations', designs: 'Designs', videos: 'Vidéos & créatifs', ads: 'Résultats publicitaires' },
  en: { eyebrow: 'Portfolio & case studies', title: 'WORK THAT', accent: 'MOVES BRANDS.', intro: 'Strategies designed to look sharp, work hard and deliver measurable growth.', choose: 'Selected projects', selected: 'Selected project', work: 'Our intervention', results: 'Key results', website: 'View project', quote: 'Talk about my project', assets: 'Explore our work', designs: 'Designs', videos: 'Videos & creatives', ads: 'Ad results' },
  ar: { eyebrow: 'أعمالنا ودراسات الحالة', title: 'مشاريع', accent: 'تحرك العلامات.', intro: 'استراتيجيات جميلة ومفيدة وقابلة للقياس.', choose: 'مشاريع مختارة', selected: 'المشروع المختار', work: 'تدخلنا', results: 'أهم النتائج', website: 'زيارة المشروع', quote: 'تحدث عن مشروعي', assets: 'استكشف أعمالنا', designs: 'التصاميم', videos: 'الفيديوهات والإبداعات', ads: 'نتائج الإعلانات' },
};

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const t = labels[language];
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const selectedProject = projects.find(project => project.id === selectedId) ?? projects[0];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const selectProject = (project: Project) => {
    setSelectedId(project.id);
    trackEvent('view_case_study', { case_name: project.name });
  };

  return (
    <section id="etudes-de-cas" ref={sectionRef} dir={language === 'ar' ? 'rtl' : 'ltr'} className="portfolio-section py-24 md:py-36 border-t border-navy/5 dark:border-white/5 transition-colors duration-500">
      <div className="container">
        <header className={`portfolio-intro transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div>
            <div className="sketch-badge mb-5">{t.eyebrow}</div>
            <h2 className="portfolio-heading text-navy dark:text-white">{t.title}<br /><span>{t.accent}</span></h2>
          </div>
          <p className="portfolio-intro-copy text-brand-gray dark:text-brand-gray/80">{t.intro}</p>
        </header>

        <div className={`portfolio-case transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <aside className="portfolio-index">
            <div className="portfolio-index-head"><span>{t.choose}</span><strong>0{projects.length}</strong></div>
            <div className="portfolio-tabs" role="tablist" aria-label={t.choose}>
              {projects.map((project, index) => {
                const active = project.id === selectedId;
                return (
                  <button key={project.id} type="button" role="tab" aria-selected={active} aria-label={`${t.choose}: ${project.name}`} onClick={() => selectProject(project)} className={`portfolio-tab ${active ? 'is-active' : ''}`}>
                    <span className="portfolio-tab-index">0{index + 1}</span>
                    <span className="portfolio-tab-name">{project.name}</span>
                    <span className="portfolio-tab-arrow" aria-hidden="true">↗</span>
                  </button>
                );
              })}
            </div>
            <p className="portfolio-index-note">Chaque projet commence par une question claire et se termine par un résultat lisible.</p>
          </aside>

          <article className="portfolio-case-content" aria-live="polite">
            <div className="portfolio-case-topline"><span><i className="portfolio-live-dot" />{t.selected}</span><span>0{selectedProject.id} / 05</span></div>
            <div className="portfolio-case-brand">
              <div className="portfolio-logo-frame"><img src={selectedProject.logo} alt={`${selectedProject.name} logo`} /></div>
              <div><p className="portfolio-case-sector">{selectedProject.sector}</p><h3>{selectedProject.name}</h3></div>
            </div>
            <p className="portfolio-case-summary">{selectedProject.summary}</p>

            <div className="portfolio-case-grid">
              <div><p className="portfolio-label">{t.work}</p><p className="portfolio-description">{selectedProject.description}</p><div className="portfolio-tags">{selectedProject.tasks.map(task => <span key={task}>{task}</span>)}</div></div>
              <div><p className="portfolio-label">{t.results}</p><div className="portfolio-results">{selectedProject.results.map(result => <div key={result}>{result}</div>)}</div></div>
            </div>

            <div className="portfolio-case-actions">
              <button type="button" onClick={() => { trackEvent('case_study_quote_click', { case_name: selectedProject.name }); onQuoteClick(); }} className="btn-ivision">{t.quote}<span aria-hidden="true">→</span></button>
              {selectedProject.website && <a href={selectedProject.website} target="_blank" rel="noopener noreferrer" className="portfolio-outline-link">{t.website}<span aria-hidden="true">↗</span></a>}
            </div>
          </article>
        </div>

        <div className="portfolio-assets"><span>{t.assets}</span><div><a href="https://drive.google.com/drive/folders/1Jw6feJMIECj1sX6qFQ16GZatV6-zpgI?usp=drive_link" target="_blank" rel="noopener noreferrer">{t.designs}</a><a href="https://drive.google.com/drive/folders/1ohDO3lGcqElZ4WL08tF5zd_YbBrhW6bv?usp=drive_link" target="_blank" rel="noopener noreferrer">{t.videos}</a><a href="https://drive.google.com/drive/folders/16tiNLtOd6wnNFEqWkvNf-MxSHNpnlq8_?usp=drive_link" target="_blank" rel="noopener noreferrer">{t.ads}</a></div></div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
