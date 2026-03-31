import React from 'react';

const packs = [
  {
    name: 'ESSENTIEL',
    subtitle: 'Pour bien démarrer',
    price: '40 000 DA',
    period: 'tout inclus / mois',
    features: [
      '4 Reels professionnels',
      '8 Designs graphiques',
      'Gestion publicités Meta',
      'Rapport mensuel',
      'Support WhatsApp',
    ],
    highlight: false,
    cta: 'Choisir ce pack',
  },
  {
    name: 'AVANCÉ',
    subtitle: 'Croissance accélérée',
    price: '60 000 DA',
    period: 'tout inclus / mois',
    features: [
      '6 Reels professionnels',
      '12 Designs graphiques',
      'Gestion publicités Meta',
      'Stratégie de contenu',
      'Rapport bi-mensuel',
      'Support prioritaire',
    ],
    highlight: false,
    cta: 'Choisir ce pack',
  },
  {
    name: 'PRO',
    subtitle: 'Le plus populaire ⭐',
    price: '100 000 DA',
    period: 'tout inclus / mois',
    features: [
      '8 Reels professionnels',
      '20 Designs graphiques',
      'Meta + Instagram Ads',
      'Stratégie avancée',
      'Rapports hebdomadaires',
      'Account manager dédié',
    ],
    highlight: true,
    cta: 'Choisir ce pack',
  },
  {
    name: 'SCALE',
    subtitle: 'Dominez votre marché',
    price: '150 000 DA',
    period: 'tout inclus / mois',
    features: [
      '12 Reels professionnels',
      '30 Designs graphiques',
      'Meta + TikTok + Instagram',
      'Stratégie full funnel',
      'Rapports en temps réel',
      'Account manager VIP',
    ],
    highlight: false,
    cta: 'Choisir ce pack',
  },
];

const TrainingCenterLanding: React.FC = () => {
  const handleSelectPack = (packName: string) => {
    // Go directly to quote, skip secteur step (step 2), pre-fill pack + business
    window.location.hash = `/devis?pack=${encodeURIComponent(packName)}&business=Centre%20de%20Formation`;
  };

  return (
    <div className="min-h-screen bg-white dark:bg-navy transition-colors duration-500">

      {/* ===== HERO ===== */}
      <section className="pt-40 pb-20 px-6 text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[400px] bg-brand-blue/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="container max-w-4xl relative z-10">
          <span className="inline-block text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-6 px-4 py-2 bg-brand-blue/10 rounded-full">
            Offre Spéciale — Centres de Formation & Crèches
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-navy dark:text-white uppercase tracking-tighter leading-none mb-6">
            Remplissez vos<br />
            <span className="text-brand-blue">sessions.</span>
          </h1>
          <p className="text-brand-gray dark:text-brand-gray/80 text-lg font-medium leading-relaxed max-w-2xl mx-auto opacity-70">
            Des campagnes digitales conçues spécialement pour les centres de formation, crèches et espaces éducatifs en Algérie. Résultats mesurables dès le premier mois.
          </p>
        </div>
      </section>

      {/* ===== PACKS ===== */}
      <section className="pb-32 px-6">
        <div className="container max-w-6xl">

          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-navy dark:text-white uppercase tracking-tighter mb-3">
              Choisissez votre pack
            </h2>
            <p className="text-brand-gray text-sm font-medium opacity-60">
              Budget publicitaire inclus — aucun frais caché
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack) => (
              <div
                key={pack.name}
                className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 group ${
                  pack.highlight
                    ? 'ring-2 ring-brand-blue shadow-2xl shadow-brand-blue/20 scale-[1.02]'
                    : 'ring-1 ring-navy/10 dark:ring-white/10 hover:ring-brand-blue/50 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Top band */}
                <div className={`px-6 py-6 ${pack.highlight ? 'bg-brand-blue' : 'bg-navy/5 dark:bg-white/5'}`}>
                  {pack.highlight && (
                    <span className="block text-[9px] font-black uppercase tracking-[0.25em] text-white/70 mb-2">
                      ⭐ Recommandé
                    </span>
                  )}
                  <h3 className={`text-lg font-black uppercase tracking-tighter ${pack.highlight ? 'text-white' : 'text-navy dark:text-white'}`}>
                    {pack.name}
                  </h3>
                  <p className={`text-[11px] font-medium mt-1 ${pack.highlight ? 'text-white/70' : 'text-brand-gray opacity-70'}`}>
                    {pack.subtitle}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-grow px-6 py-6 bg-white dark:bg-navy/50">
                  {/* Price */}
                  <div className="mb-6">
                    <span className="block text-3xl font-black text-navy dark:text-white tracking-tighter">
                      {pack.price}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">
                      {pack.period}
                    </span>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-navy/5 dark:bg-white/10 mb-6" />

                  {/* Features */}
                  <ul className="flex flex-col gap-3 flex-grow mb-8">
                    {pack.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${pack.highlight ? 'bg-brand-blue' : 'bg-navy/10 dark:bg-white/10'}`}>
                          <svg className={`w-2.5 h-2.5 ${pack.highlight ? 'text-white' : 'text-brand-blue'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-xs font-medium text-brand-gray dark:text-brand-gray/80 leading-relaxed">
                          {feat}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={() => handleSelectPack(pack.name)}
                    className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                      pack.highlight
                        ? 'bg-brand-blue text-white hover:brightness-110 shadow-lg shadow-brand-blue/30'
                        : 'bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-brand-blue hover:text-white border border-navy/10 dark:border-white/10 hover:border-brand-blue'
                    }`}
                  >
                    {pack.cta}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Note */}
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-gray/40 mt-10">
            ✦ Frais de déplacement en dehors de la wilaya non inclus — définis selon votre localisation
          </p>

        </div>
      </section>

      {/* ===== SOCIAL PROOF ===== */}
      <section className="py-20 px-6 bg-navy/3 dark:bg-white/3 border-t border-navy/5 dark:border-white/5">
        <div className="container max-w-4xl text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-8">
            Résultats prouvés
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { stat: '+300%', label: 'Visibilité en ligne' },
              { stat: '30j', label: 'Premiers résultats' },
              { stat: '100%', label: 'Clients satisfaits' },
            ].map(({ stat, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <span className="text-5xl font-black text-navy dark:text-white tracking-tighter">{stat}</span>
                <span className="text-[11px] font-bold uppercase tracking-widest text-brand-gray/50">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default TrainingCenterLanding;
