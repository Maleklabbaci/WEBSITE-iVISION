import React, { useState } from 'react';

interface Project {
  id: number;
  name: string;
  categories: string[];
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
    categories: ['Marketing', 'Branding', 'Video', 'Design'],
    description: 'Strategie marketing complete pour centre de bien-etre. Content creation, campagnes Meta Ads et branding visuel.',
    tasks: ['Content Creation', 'Meta Ads', 'Branding', 'Video Production'],
    results: ['+250% ROI', 'Brand Awareness', 'Croissance Social Media'],
    logo: 'https://i.ibb.co/kVbgDJnn/image.png',
  },
  {
    id: 2,
    name: 'Lecmo Oud',
    categories: ['Marketing', 'Branding', 'Video', 'Design', 'Web'],
    description: 'Marketing digital complet et creation du site e-commerce pour marque de parfums et oud haut de gamme.',
    tasks: ['Marketing Digital', 'Content Creation', 'Meta Ads', 'Site Web E-commerce'],
    results: ['+120K Interactions', 'Haut Traffic Web', 'E-commerce Live'],
    logo: 'https://i.ibb.co/Q7Qtkb81/image.png',
    website: 'https://www.lecmooud.com',
  },
];

const PortfolioGallery: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scrollLogos = [...projects, ...projects, ...projects, ...projects, ...projects, ...projects];

  return (
    <>
      <section id="portfolio" className="py-20 md:py-28 border-t border-navy/5 dark:border-white/5">
        <div className="container mb-12 text-center">
          <span className="sketch-badge mb-4">Portfolio</span>
          <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white tracking-tighter mt-6">
            Ils nous font <span className="text-brand-blue">confiance</span>
          </h2>
          <p className="text-brand-gray mt-4">
            Cliquez sur un logo pour voir le projet
          </p>
        </div>

        {/* ===== BANDE DE LOGOS ===== */}
        <div style={{ overflow: 'hidden', position: 'relative' }}>
          {/* Gradient gauche */}
          <div style={{
            position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to right, var(--bg-color, #050A1F), transparent)',
            zIndex: 10, pointerEvents: 'none'
          }} className="from-white dark:from-navy bg-gradient-to-r from-white dark:from-navy to-transparent"></div>
          
          {/* Gradient droite */}
          <div style={{
            position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
            background: 'linear-gradient(to left, var(--bg-color, #050A1F), transparent)',
            zIndex: 10, pointerEvents: 'none'
          }} className="bg-gradient-to-l from-white dark:from-navy to-transparent"></div>

          <div className="logo-scroll-band" style={{ display: 'flex', alignItems: 'center', whiteSpace: 'nowrap' }}>
            {scrollLogos.map((project, i) => (
              <div
                key={`logo-${i}`}
                onClick={() => setSelectedProject(project)}
                className="cursor-pointer group"
                style={{
                  flexShrink: 0,
                  padding: '20px 40px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={project.logo}
                  alt={project.name}
                  style={{
                    filter: 'brightness(0) invert(1)',
                    height: '60px',
                    width: 'auto',
                    maxWidth: 'none',
                    display: 'block',
                  }}
                  className="opacity-40 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MODAL PROJET ===== */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 bg-black/70 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative bg-white dark:bg-navy border border-navy/10 dark:border-white/10 w-full max-w-2xl rounded-[2rem] shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header avec logo */}
            <div className="bg-brand-blue p-8 md:p-12 flex items-center justify-center relative">
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <img
                src={selectedProject.logo}
                alt={selectedProject.name}
                style={{
                  filter: 'brightness(0) invert(1)',
                  height: '80px',
                  width: 'auto',
                  maxWidth: '90%',
                  display: 'block',
                }}
              />
            </div>

            {/* Content */}
            <div className="p-6 md:p-10">
              <h3 className="text-2xl md:text-3xl font-black text-navy dark:text-white tracking-tighter">
                {selectedProject.name}
              </h3>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedProject.categories.map((cat) => (
                  <span
                    key={cat}
                    className="text-[9px] font-bold uppercase tracking-widest bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-full"
                  >
                    {cat}
                  </span>
                ))}
              </div>

              <p className="text-brand-gray dark:text-brand-gray/80 mt-5 leading-relaxed">
                {selectedProject.description}
              </p>

              <div className="mt-6">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-3">Ce qu on a fait</p>
                <div className="grid grid-cols-2 gap-2">
                  {selectedProject.tasks.map((task) => (
                    <div key={task} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-brand-blue rounded-full flex-shrink-0"></span>
                      <span className="text-navy dark:text-white text-sm font-medium">{task}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-navy/5 dark:border-white/5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-3">Resultats</p>
                <div className="flex flex-wrap gap-3">
                  {selectedProject.results.map((result) => (
                    <div key={result} className="bg-green-500/10 text-green-600 dark:text-green-400 font-bold text-sm px-4 py-2 rounded-xl">
                      {result}
                    </div>
                  ))}
                </div>
              </div>

              {selectedProject.website && (
                <a
                  href={selectedProject.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-brand-blue font-bold hover:gap-3 transition-all duration-300"
                >
                  Voir le site web
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              )}

              <button
                onClick={() => {
                  setSelectedProject(null);
                  window.location.hash = '/devis';
                }}
                className="btn-ivision w-full py-4 mt-8"
              >
                Je veux le meme resultat →
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PortfolioGallery;
