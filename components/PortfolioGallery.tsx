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
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    name: 'Center Bissan',
    categories: ['Marketing', 'Branding', 'Video', 'Design'],
    description: 'Strategie marketing complete pour centre de bien-etre. Content creation, campagnes Meta Ads et branding visuel.',
    tasks: ['Content Creation', 'Meta Ads', 'Branding', 'Video Production'],
    results: ['+250% ROI', 'Brand Awareness', 'Croissance Social Media'],
    logo: 'https://ibb.co/VWGRsbFJ', // TODO: Remplacer par le lien imgbb
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 2,
    name: 'Lecmo Oud',
    categories: ['Marketing', 'Branding', 'Video', 'Design', 'Web'],
    description: 'Marketing digital complet et creation du site e-commerce pour marque de parfums et oud haut de gamme.',
    tasks: ['Marketing Digital', 'Content Creation', 'Meta Ads', 'Site Web E-commerce'],
    results: ['+120K Interactions', 'Haut Traffic Web', 'E-commerce Live'],
    logo: 'https://www.lecmooud.com/cdn/shop/files/Reverse_the_colors_202602121714.webp?v=1771339523&width=2560',
    website: 'https://www.lecmooud.com',
    color: 'from-amber-500 to-orange-600',
  },
];

const PortfolioGallery: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="portfolio" className="py-20 md:py-28 border-t border-navy/5 dark:border-white/5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="sketch-badge mb-4">Nos realisations</span>
          <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white tracking-tighter mt-6">
            Des vrais <span className="text-brand-blue">resultats</span> pour de vrais clients
          </h2>
          <p className="text-brand-gray mt-4 max-w-xl mx-auto">
            Chaque projet est une collaboration unique. Voici ce que nous avons accompli ensemble.
          </p>
        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {projects.map((project) => (
            <div
              key={project.id}
              className="group glass-card rounded-[2rem] overflow-hidden hover:border-brand-blue/30 transition-all duration-500"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Header with logo */}
              <div className={`relative h-48 bg-gradient-to-br ${project.color} flex items-center justify-center p-8`}>
                {project.logo ? (
                  <img
                    src={project.logo}
                    alt={project.name}
                    className="max-h-24 max-w-[200px] object-contain filter brightness-0 invert drop-shadow-lg"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.parentElement!.querySelector('.fallback-text')?.classList.remove('hidden');
                    }}
                  />
                ) : null}
                <span className={`fallback-text text-white text-4xl font-black tracking-tighter ${project.logo ? 'hidden' : ''}`}>
                  {project.name}
                </span>

                {/* Hover overlay */}
                <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <div className="flex gap-3">
                    {project.results.map((result, i) => (
                      <span key={i} className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-2 rounded-full">
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                {/* Name */}
                <h3 className="text-navy dark:text-white font-black text-2xl tracking-tighter group-hover:text-brand-blue transition-colors">
                  {project.name}
                </h3>

                {/* Description */}
                <p className="text-brand-gray text-sm mt-3 leading-relaxed">
                  {project.description}
                </p>

                {/* Tasks */}
                <div className="flex flex-wrap gap-2 mt-5">
                  {project.tasks.map((task) => (
                    <span
                      key={task}
                      className="text-[9px] font-bold uppercase tracking-wider bg-brand-blue/5 dark:bg-brand-blue/10 text-brand-blue px-3 py-1.5 rounded-lg"
                    >
                      {task}
                    </span>
                  ))}
                </div>

                {/* Results */}
                <div className="mt-6 pt-5 border-t border-navy/5 dark:border-white/5">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-brand-gray mb-3">Resultats</p>
                  <div className="flex flex-wrap gap-3">
                    {project.results.map((result, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        <span className="text-navy dark:text-white font-bold text-sm">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Website link */}
                {project.website && (
                  <a
                    href={project.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-2 text-brand-blue text-sm font-bold hover:gap-3 transition-all duration-300"
                  >
                    Voir le site web
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <p className="text-brand-gray mb-6">Votre projet pourrait etre le prochain.</p>
          <button
            onClick={() => (window.location.hash = '/devis')}
            className="btn-ivision px-8 py-4"
          >
            Demarrer mon projet →
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
