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
  {
    id: 1,
    name: 'Center Bissan',
    sector: 'Bien-être & services',
    summary: 'Une présence de marque cohérente pour attirer et rassurer les clientes locales.',
    description: 'Stratégie marketing complète pour centre de bien-être : création de contenu, campagnes Meta Ads et branding visuel.',
    tasks: ['Création de contenu', 'Meta Ads', 'Branding', 'Production vidéo'],
    results: ['+250% ROI', 'Brand Awareness', 'Croissance Social Media'],
    logo: 'https://i.ibb.co/kVbgDJnn/image.png',
  },
  {
    id: 2,
    name: 'Lecmo Oud',
    sector: 'Parfumerie & e-commerce',
    summary: 'Une expérience digitale premium pour une marque de parfums et de oud.',
    description: 'Marketing digital complet et création du site e-commerce pour une marque de parfums et de oud haut de gamme.',
    tasks: ['Stratégie digitale', 'Création de contenu', 'Meta Ads', 'Site e-commerce'],
    results: ['+120K Interactions', 'E-commerce Live', 'Trafic qualifié'],
    logo: 'https://i.ibb.co/BVTDnpBZ/image.png',
    website: 'https://www.lecmooud.com',
  },
  {
    id: 3,
    name: 'White Aura',
    sector: 'Cosmétiques premium',
    summary: 'Un site et un parcours de vente conçus pour valoriser une offre beauté premium.',
    description: 'Création du site web et stratégie de vente complète pour une marque de cosmétiques premium.',
    tasks: ['Site web', 'Stratégie de vente', 'Branding', 'Marketing digital'],
    results: ['+100% ROI', 'E-commerce Live', 'Croissance ventes'],
    logo: 'https://i.ibb.co/tTc50H8n/white-aura.png',
    website: 'https://white-aura.vercel.app',
  },
  {
    id: 5,
    name: 'MOVESMART',
    sector: 'Immobilier & plateforme digitale',
    summary: 'Une identité claire et une plateforme digitale pensée pour un marché international.',
    description: 'Branding complet et construction d’une plateforme digitale de A à Z pour une marque immobilière à Dubai.',
    tasks: ['Branding complet', 'Plateforme digitale', 'UI/UX Design', 'Développement'],
    results: ['Plateforme live', 'Branding premium', 'Marché Dubai'],
    logo: 'https://i.ibb.co/60PJ8PVw/aass.png',
    website: 'https://movesmart-ecru.vercel.app/',
  },
  {
    id: 4,
    name: 'FIDALI',
    sector: 'Branding & plateforme digitale',
    summary: 'Une identité visuelle forte et une plateforme prête à accompagner le lancement.',
    description: 'Branding complet et construction d’une plateforme digitale de A à Z : identité visuelle, UI/UX et développement.',
    tasks: ['Branding complet', 'Plateforme digitale', 'UI/UX Design', 'Développement'],
    results: ['Plateforme live', 'Branding premium', 'Lancement imminent'],
    logo: 'https://i.ibb.co/7xtLynLz/logo-white.png',
    website: 'https://fidali.vercel.app',
  },
];

interface PortfolioGalleryProps {
  language: Language;
  onQuoteClick: () => void;
}

const labels = {
  fr: {
    eyebrow: 'Portfolio & études de cas',
    title: 'LES MARQUES QUI ONT CHOISI',
    accent: 'DE VOIR PLUS GRAND.',
    intro: 'Cliquez sur un logo pour découvrir le projet, notre intervention et les résultats obtenus.',
    choose: 'Choisir un projet',
    selected: 'Étude de cas sélectionnée',
    work: 'Notre intervention',
    results: 'Résultats clés',
    website: 'Voir le site',
    quote: 'Obtenir un devis similaire',
    assets: 'Voir toutes nos réalisations',
    designs: 'Designs',
    videos: 'Vidéos & créatifs',
    ads: 'Résultats publicitaires',
  },
  en: {
    eyebrow: 'Portfolio & case studies',
    title: 'BRANDS THAT CHOSE TO',
    accent: 'THINK BIGGER.',
    intro: 'Click a logo to discover the project, our work and the results delivered.',
    choose: 'Choose a project',
    selected: 'Selected case study',
    work: 'Our work',
    results: 'Key results',
    website: 'Visit website',
    quote: 'Request a similar quote',
    assets: 'See all our work',
    designs: 'Designs',
    videos: 'Videos & creatives',
    ads: 'Ad results',
  },
  ar: {
    eyebrow: 'أعمالنا ودراسات الحالة',
    title: 'علامات اختارت أن',
    accent: 'ترى أبعد.',
    intro: 'اضغط على الشعار لاكتشاف المشروع وتدخلنا والنتائج المحققة.',
    choose: 'اختر مشروعاً',
    selected: 'دراسة الحالة المختارة',
    work: 'تدخلنا',
    results: 'أهم النتائج',
    website: 'زيارة الموقع',
    quote: 'احصل على عرض مماثل',
    assets: 'شاهد كل أعمالنا',
    designs: 'التصاميم',
    videos: 'الفيديوهات والإبداعات',
    ads: 'نتائج الإعلانات',
  },
};

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language, onQuoteClick }) => {
  const isRTL = language === 'ar';
  const t = labels[language];
  const [selectedId, setSelectedId] = useState(projects[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const selectedProject = projects.find(project => project.id === selectedId) ?? projects[0];

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const selectProject = (project: Project) => {
    setSelectedId(project.id);
    trackEvent('view_case_study', { case_name: project.name });
  };

  return (
    <section id="etudes-de-cas" ref={sectionRef} className="py-24 md:py-40 border-t border-navy/5 dark:border-white/5 transition-colors duration-500">
      <div className="container">
        <div className={`max-w-4xl mb-12 md:mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="sketch-badge mb-6 md:mb-8">{t.eyebrow}</div>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black text-navy dark:text-white tracking-tighter leading-[0.88] uppercase">
            {t.title}<br />
            <span className="text-brand-blue">{t.accent}</span>
          </h2>
          <p className="mt-7 max-w-2xl text-lg md:text-xl text-brand-gray dark:text-brand-gray/80 leading-relaxed">{t.intro}</p>
        </div>

        <div className={`overflow-hidden rounded-[2rem] border border-navy/10 dark:border-white/10 bg-white/80 dark:bg-white/[0.035] shadow-[0_24px_80px_rgba(11,27,58,0.10)] dark:shadow-2xl transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="grid lg:grid-cols-[0.78fr_1.22fr]">
            <div className="p-5 md:p-8 border-b lg:border-b-0 lg:border-r border-navy/10 dark:border-white/10 bg-navy/[0.025] dark:bg-white/[0.02]">
              <div className="flex items-center justify-between gap-4 mb-5">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gray">{t.choose}</p>
                <span className="text-[10px] font-bold text-brand-blue">{projects.length.toString().padStart(2, '0')} clients</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3">
                {projects.map(project => {
                  const isSelected = project.id === selectedProject.id;
                  return (
                    <button
                      key={project.id}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => selectProject(project)}
                      className={`group min-h-28 rounded-2xl border p-3 text-left transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#081126] ${isSelected ? 'border-brand-blue bg-brand-blue/10 shadow-[0_12px_28px_rgba(36,87,255,0.14)]' : 'border-navy/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.03] hover:-translate-y-1 hover:border-brand-blue/45'}`}
                    >
                      <span className={`flex h-14 items-center justify-center rounded-xl transition-colors ${isSelected ? 'bg-white dark:bg-white/10' : 'bg-navy/[0.035] dark:bg-white/[0.04]'}`}>
                        <img loading="lazy" decoding="async" src={project.logo} alt={project.name} className={`logo-white max-h-10 max-w-[82%] object-contain transition-all duration-200 ${isSelected ? 'opacity-100' : 'opacity-55 group-hover:opacity-100'}`} />
                      </span>
                      <span className={`mt-3 block text-[10px] font-black uppercase tracking-wider ${isSelected ? 'text-brand-blue' : 'text-navy dark:text-white'}`}>{project.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-6 md:p-10 lg:p-12 bg-gradient-to-br from-brand-blue/[0.08] via-white/70 to-white dark:from-brand-blue/[0.16] dark:via-[#081126] dark:to-[#0B1B3A]">
              <div className="flex flex-wrap items-start justify-between gap-5 mb-8">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-3">{t.selected} · {selectedProject.sector}</p>
                  <h3 className="text-3xl md:text-5xl font-black text-navy dark:text-white tracking-tighter uppercase">{selectedProject.name}</h3>
                </div>
                <div className="flex h-16 w-24 items-center justify-center rounded-2xl bg-white/80 dark:bg-white/10 p-3 shadow-sm">
                  <img src={selectedProject.logo} alt={`${selectedProject.name} logo`} className="logo-white max-h-11 max-w-full object-contain" />
                </div>
              </div>

              <p className="max-w-2xl text-base md:text-lg text-navy/75 dark:text-white/75 leading-relaxed">{selectedProject.summary}</p>

              <div className="mt-8 grid gap-7 md:grid-cols-2">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gray mb-3">{t.work}</p>
                  <p className="text-sm md:text-base text-navy dark:text-white/90 leading-relaxed mb-4">{selectedProject.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tasks.map(task => <span key={task} className="rounded-full border border-navy/10 dark:border-white/10 bg-white/65 dark:bg-white/[0.06] px-3 py-1.5 text-[10px] font-bold text-navy dark:text-white/85">{task}</span>)}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gray mb-3">{t.results}</p>
                  <div className="grid gap-2">
                    {selectedProject.results.map(result => <div key={result} className="rounded-xl bg-brand-blue px-4 py-3 text-sm font-black text-white shadow-[0_8px_20px_rgba(36,87,255,0.18)]">{result}</div>)}
                  </div>
                </div>
              </div>

              <div className="mt-9 flex flex-col sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => {
                    trackEvent('case_study_quote_click', { case_name: selectedProject.name });
                    onQuoteClick();
                  }}
                  className="btn-ivision flex-1"
                >
                  {t.quote}
                  <span aria-hidden="true">→</span>
                </button>
                {selectedProject.website && <a href={selectedProject.website} target="_blank" rel="noopener noreferrer" className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-navy/15 dark:border-white/15 px-6 py-4 text-xs font-black uppercase tracking-widest text-navy dark:text-white hover:border-brand-blue hover:text-brand-blue transition-colors">{t.website}<span aria-hidden="true">↗</span></a>}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-4 border-t border-navy/10 dark:border-white/10 p-5 md:flex-row md:items-center md:justify-between md:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-navy dark:text-white">{t.assets}</p>
            <div className="flex flex-wrap gap-2">
              <a href="https://drive.google.com/drive/folders/1Jw6feJMIECj1sXn6qFQ16GZatV6-zpgI?usp=drive_link" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-navy/10 dark:border-white/10 px-3 py-2 text-xs font-bold text-navy dark:text-white hover:border-brand-blue hover:text-brand-blue transition-colors">🎨 {t.designs}</a>
              <a href="https://drive.google.com/drive/folders/1ohDO3lGcqElZ4WL08tF5zd_YbBrhW6bv?usp=drive_link" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-navy/10 dark:border-white/10 px-3 py-2 text-xs font-bold text-navy dark:text-white hover:border-brand-blue hover:text-brand-blue transition-colors">🎬 {t.videos}</a>
              <a href="https://drive.google.com/drive/folders/16tiNLtOd6wnNFEqWkvNf-MxSHNpnlq8_?usp=drive_link" target="_blank" rel="noopener noreferrer" className="rounded-xl border border-navy/10 dark:border-white/10 px-3 py-2 text-xs font-bold text-navy dark:text-white hover:border-brand-blue hover:text-brand-blue transition-colors">📊 {t.ads}</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
