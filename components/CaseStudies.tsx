import React, { useEffect, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

type CaseStudy = {
  name: string;
  sector: { fr: string; en: string; ar: string };
  summary: { fr: string; en: string; ar: string };
  challenge: { fr: string; en: string; ar: string };
  solution: { fr: string; en: string; ar: string };
  results: string[];
  logo: string;
  website?: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    name: 'Center Bissan',
    sector: { fr: 'Bien-être & services', en: 'Wellness & services', ar: 'العافية والخدمات' },
    summary: { fr: 'Une présence de marque cohérente pour attirer et rassurer les clientes locales.', en: 'A consistent brand presence to attract and reassure local customers.', ar: 'حضور متناسق للعلامة لجذب العملاء المحليين.' },
    challenge: { fr: 'Structurer l’image de marque et rendre l’offre plus visible sur les réseaux sociaux.', en: 'Structure the brand image and make the offer more visible on social media.', ar: 'تنظيم صورة العلامة وزيادة ظهور العرض على الشبكات الاجتماعية.' },
    solution: { fr: 'Création de contenu, branding, production vidéo et campagnes Meta Ads.', en: 'Content creation, branding, video production and Meta Ads campaigns.', ar: 'صناعة المحتوى والهوية البصرية والفيديو وحملات Meta Ads.' },
    results: ['+250% ROI', 'Brand Awareness', 'Croissance Social Media'],
    logo: 'https://i.ibb.co/kVbgDJnn/image.png',
  },
  {
    name: 'Lecmo Oud',
    sector: { fr: 'Parfumerie & e-commerce', en: 'Perfume & e-commerce', ar: 'العطور والتجارة الإلكترونية' },
    summary: { fr: 'Une expérience digitale premium pour une marque de parfums et de oud.', en: 'A premium digital experience for a perfume and oud brand.', ar: 'تجربة رقمية متميزة لعلامة العطور والعود.' },
    challenge: { fr: 'Faire émerger une marque haut de gamme et soutenir son développement e-commerce.', en: 'Build visibility for a premium brand and support its e-commerce growth.', ar: 'إبراز علامة فاخرة ودعم نمو التجارة الإلكترونية.' },
    solution: { fr: 'Stratégie digitale, contenu, Meta Ads et création d’un site e-commerce.', en: 'Digital strategy, content, Meta Ads and e-commerce website creation.', ar: 'استراتيجية رقمية ومحتوى وMeta Ads وإنشاء متجر إلكتروني.' },
    results: ['+120K Interactions', 'E-commerce Live', 'Trafic qualifié'],
    logo: 'https://i.ibb.co/BVTDnpBZ/image.png',
    website: 'https://www.lecmooud.com',
  },
  {
    name: 'White Aura',
    sector: { fr: 'Cosmétiques premium', en: 'Premium cosmetics', ar: 'مستحضرات التجميل الفاخرة' },
    summary: { fr: 'Un site et un parcours de vente conçus pour valoriser une offre beauté premium.', en: 'A website and sales journey designed to elevate a premium beauty offer.', ar: 'موقع ومسار بيع مصمم لتقديم عرض تجميلي فاخر.' },
    challenge: { fr: 'Clarifier l’offre et transformer la présence digitale en parcours de vente.', en: 'Clarify the offer and turn the digital presence into a sales journey.', ar: 'توضيح العرض وتحويل الحضور الرقمي إلى مسار مبيعات.' },
    solution: { fr: 'Création du site, branding et stratégie de conversion.', en: 'Website creation, branding and conversion strategy.', ar: 'إنشاء الموقع والهوية البصرية واستراتيجية التحويل.' },
    results: ['+100% ROI', 'E-commerce Live', 'Croissance Ventes'],
    logo: 'https://i.ibb.co/tTc50H8n/white-aura.png',
    website: 'https://white-aura.vercel.app',
  },
];

const copy = {
  fr: { eyebrow: 'Preuves concrètes', title: 'DES PROJETS QUI', accent: 'FONT GRANDIR.', intro: 'Découvrez comment iVISION transforme une problématique business en dispositif digital mesurable.', details: 'Voir le cas', challenge: 'Le défi', solution: 'Notre intervention', close: 'Fermer', cta: 'Obtenir un devis similaire' },
  en: { eyebrow: 'Real proof', title: 'PROJECTS THAT', accent: 'DRIVE GROWTH.', intro: 'See how iVISION turns a business challenge into a measurable digital system.', details: 'View case', challenge: 'The challenge', solution: 'Our work', close: 'Close', cta: 'Request a similar quote' },
  ar: { eyebrow: 'نتائج حقيقية', title: 'مشاريع', accent: 'تصنع النمو.', intro: 'اكتشف كيف تحول iVISION تحديات الأعمال إلى حلول رقمية قابلة للقياس.', details: 'اكتشف الحالة', challenge: 'التحدي', solution: 'تدخلنا', close: 'إغلاق', cta: 'احصل على عرض مماثل' },
};

const CaseStudies: React.FC<{ language: Language; onQuoteClick: () => void }> = ({ language, onQuoteClick }) => {
  const [selected, setSelected] = useState<CaseStudy | null>(null);
  const t = copy[language];
  const text = (value: CaseStudy[keyof CaseStudy]) => (typeof value === 'object' && value !== null && 'fr' in value ? value[language] : '');

  useEffect(() => {
    if (!selected) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelected(null);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selected]);

  return (
    <section id="etudes-de-cas" className="py-24 md:py-36 border-t border-navy/5 dark:border-white/5">
      <div className="container">
        <div className="max-w-3xl mb-14 md:mb-20">
          <div className="sketch-badge mb-6">{t.eyebrow}</div>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.88] text-navy dark:text-white uppercase">{t.title}<br /><span className="text-brand-blue">{t.accent}</span></h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-brand-gray dark:text-brand-gray/80 leading-relaxed">{t.intro}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CASE_STUDIES.map((study) => (
            <article key={study.name} className="group rounded-[2rem] border border-navy/10 dark:border-white/10 bg-white/60 dark:bg-white/[0.03] overflow-hidden hover:-translate-y-2 hover:border-brand-blue/50 transition-all duration-500">
              <div className="h-48 flex items-center justify-center p-10 bg-navy/[0.03] dark:bg-white/[0.03]">
                <img loading="lazy" decoding="async" src={study.logo} alt={`${study.name} logo`} className="max-h-24 max-w-[75%] object-contain logo-white group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-7">
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-blue mb-3">{text(study.sector)}</p>
                <h3 className="text-2xl font-black text-navy dark:text-white tracking-tight mb-3">{study.name}</h3>
                <p className="text-brand-gray dark:text-brand-gray/80 leading-relaxed mb-6">{text(study.summary)}</p>
                <div className="flex flex-wrap gap-2 mb-7">
                  {study.results.map(result => <span key={result} className="px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue text-[10px] font-black">{result}</span>)}
                </div>
                <button type="button" onClick={() => { setSelected(study); trackEvent('view_case_study', { case_name: study.name }); }} className="text-xs font-black uppercase tracking-[0.18em] text-navy dark:text-white hover:text-brand-blue transition-colors">
                  {t.details} <span aria-hidden="true">→</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 z-[150] bg-navy/80 backdrop-blur-md p-5 md:p-10 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="case-study-title" onClick={() => setSelected(null)}>
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-[2rem] bg-white dark:bg-[#081126] border border-navy/10 dark:border-white/10 p-7 md:p-12 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start justify-between gap-6 mb-8">
              <div>
                <p className="text-[10px] font-black tracking-[0.2em] uppercase text-brand-blue mb-3">{text(selected.sector)}</p>
                <h3 id="case-study-title" className="text-3xl md:text-5xl font-black text-navy dark:text-white tracking-tighter">{selected.name}</h3>
              </div>
              <button type="button" aria-label={t.close} onClick={() => setSelected(null)} className="w-10 h-10 rounded-full border border-navy/10 dark:border-white/10 text-navy dark:text-white">×</button>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-brand-blue/5 border border-brand-blue/15"><p className="text-[10px] uppercase font-black tracking-widest text-brand-blue mb-3">{t.challenge}</p><p className="text-navy dark:text-white/90 leading-relaxed">{text(selected.challenge)}</p></div>
              <div className="p-6 rounded-2xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10"><p className="text-[10px] uppercase font-black tracking-widest text-brand-blue mb-3">{t.solution}</p><p className="text-navy dark:text-white/90 leading-relaxed">{text(selected.solution)}</p></div>
            </div>
            <div className="flex flex-wrap gap-3 mb-9">{selected.results.map(result => <span key={result} className="px-4 py-2 rounded-xl bg-brand-blue text-white text-xs font-black">{result}</span>)}</div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button type="button" onClick={() => { trackEvent('case_study_quote_click', { case_name: selected.name }); setSelected(null); onQuoteClick(); }} className="btn-ivision flex-1">{t.cta}</button>
              {selected.website && <a href={selected.website} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center rounded-2xl border border-navy/10 dark:border-white/10 px-6 py-4 text-xs font-black uppercase tracking-widest text-navy dark:text-white">Voir le site</a>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CaseStudies;
