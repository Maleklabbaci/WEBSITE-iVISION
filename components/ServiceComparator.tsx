import React, { useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

type ServiceOption = {
  id: string;
  name: { fr: string; en: string; ar: string };
  goal: { fr: string; en: string; ar: string };
  forWho: { fr: string; en: string; ar: string };
  deliverables: { fr: string; en: string; ar: string }[];
};

const SERVICES: ServiceOption[] = [
  { id: 'ads', name: { fr: 'Meta & Google Ads', en: 'Meta & Google Ads', ar: 'Meta و Google Ads' }, goal: { fr: 'Générer des demandes et des ventes.', en: 'Generate leads and sales.', ar: 'توليد الطلبات والمبيعات.' }, forWho: { fr: 'Entreprises avec une offre déjà prête.', en: 'Businesses with a ready-to-sell offer.', ar: 'الشركات التي تملك عرضاً جاهزاً.' }, deliverables: [{ fr: 'Stratégie d’acquisition', en: 'Acquisition strategy', ar: 'استراتيجية الاستحواذ' }, { fr: 'Créatifs publicitaires', en: 'Ad creatives', ar: 'إبداعات إعلانية' }, { fr: 'Pilotage des campagnes', en: 'Campaign management', ar: 'إدارة الحملات' }] },
  { id: 'web', name: { fr: 'Site web & e-commerce', en: 'Website & e-commerce', ar: 'موقع ومتجر إلكتروني' }, goal: { fr: 'Transformer les visites en opportunités.', en: 'Turn visits into opportunities.', ar: 'تحويل الزيارات إلى فرص.' }, forWho: { fr: 'Marques qui veulent une présence professionnelle.', en: 'Brands seeking a professional presence.', ar: 'العلامات التي تريد حضوراً احترافياً.' }, deliverables: [{ fr: 'UX orientée conversion', en: 'Conversion-focused UX', ar: 'تجربة مستخدم موجهة للتحويل' }, { fr: 'Développement responsive', en: 'Responsive development', ar: 'تطوير متجاوب' }, { fr: 'SEO technique de base', en: 'Technical SEO foundation', ar: 'أساسيات SEO التقنية' }] },
  { id: 'content', name: { fr: 'Contenu & branding', en: 'Content & branding', ar: 'المحتوى والهوية' }, goal: { fr: 'Attirer l’attention et construire la confiance.', en: 'Capture attention and build trust.', ar: 'جذب الانتباه وبناء الثقة.' }, forWho: { fr: 'Marques qui doivent clarifier leur image.', en: 'Brands that need a clearer image.', ar: 'العلامات التي تحتاج صورة أوضح.' }, deliverables: [{ fr: 'Direction créative', en: 'Creative direction', ar: 'التوجيه الإبداعي' }, { fr: 'Reels et visuels', en: 'Reels and visuals', ar: 'ريلز وتصاميم' }, { fr: 'Calendrier de contenu', en: 'Content calendar', ar: 'خطة المحتوى' }] },
  { id: 'training', name: { fr: 'Formation & accompagnement', en: 'Training & support', ar: 'التكوين والمرافقة' }, goal: { fr: 'Faire monter votre équipe en compétence.', en: 'Build your team’s capabilities.', ar: 'تطوير مهارات فريقك.' }, forWho: { fr: 'Équipes qui veulent devenir autonomes.', en: 'Teams seeking more autonomy.', ar: 'الفرق التي تريد الاستقلالية.' }, deliverables: [{ fr: 'Audit de départ', en: 'Starting audit', ar: 'تدقيق أولي' }, { fr: 'Sessions pratiques', en: 'Practical sessions', ar: 'جلسات تطبيقية' }, { fr: 'Plan d’action', en: 'Action plan', ar: 'خطة عمل' }] },
];

const copy = {
  fr: { eyebrow: 'Choisir le bon levier', title: 'QUEL SERVICE', accent: 'VOUS CONVIENT ?', intro: 'Répondez à votre objectif principal et identifiez le meilleur point de départ.', goal: 'Objectif', forWho: 'Idéal pour', included: 'Ce qui est inclus', quote: 'Parler à un expert' },
  en: { eyebrow: 'Choose the right lever', title: 'WHICH SERVICE', accent: 'FITS YOU?', intro: 'Start with your main goal and identify the right first step.', goal: 'Goal', forWho: 'Best for', included: 'What is included', quote: 'Talk to an expert' },
  ar: { eyebrow: 'اختر الحل المناسب', title: 'ما هي الخدمة', accent: 'المناسبة لك؟', intro: 'ابدأ بهدفك الرئيسي واكتشف نقطة الانطلاق المناسبة.', goal: 'الهدف', forWho: 'مناسبة لـ', included: 'ما تتضمنه', quote: 'تحدث مع خبير' },
};

const ServiceComparator: React.FC<{ language: Language; onQuoteClick: () => void }> = ({ language, onQuoteClick }) => {
  const [activeId, setActiveId] = useState(SERVICES[0].id);
  const active = SERVICES.find(service => service.id === activeId) || SERVICES[0];
  const t = copy[language];
  const text = (value: { fr: string; en: string; ar: string }) => value[language];

  return (
    <section id="comparateur" className="py-24 md:py-36 bg-navy/[0.03] dark:bg-white/[0.02] border-y border-navy/5 dark:border-white/5">
      <div className="container">
        <div className="max-w-3xl mb-12">
          <div className="sketch-badge mb-6">{t.eyebrow}</div>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.88] text-navy dark:text-white uppercase">{t.title}<br /><span className="text-brand-blue">{t.accent}</span></h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-brand-gray dark:text-brand-gray/80 leading-relaxed">{t.intro}</p>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none" role="tablist" aria-label={t.title}>
          {SERVICES.map(service => (
            <button key={service.id} type="button" role="tab" aria-selected={activeId === service.id} onClick={() => { setActiveId(service.id); trackEvent('service_comparison_view', { service: service.id }); }} className={`shrink-0 rounded-full px-5 py-3 text-[10px] font-black uppercase tracking-widest border transition-all ${activeId === service.id ? 'bg-brand-blue text-white border-brand-blue' : 'border-navy/10 dark:border-white/10 text-navy dark:text-white hover:border-brand-blue/50'}`}>
              {text(service.name)}
            </button>
          ))}
        </div>
        <div className="mt-6 grid md:grid-cols-3 gap-5" role="tabpanel">
          <div className="p-7 rounded-[2rem] bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10"><p className="text-[10px] uppercase font-black tracking-widest text-brand-blue mb-4">{t.goal}</p><p className="text-xl font-black text-navy dark:text-white leading-tight">{text(active.goal)}</p></div>
          <div className="p-7 rounded-[2rem] bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10"><p className="text-[10px] uppercase font-black tracking-widest text-brand-blue mb-4">{t.forWho}</p><p className="text-xl font-black text-navy dark:text-white leading-tight">{text(active.forWho)}</p></div>
          <div className="p-7 rounded-[2rem] bg-brand-blue text-white"><p className="text-[10px] uppercase font-black tracking-widest text-white/70 mb-4">{t.included}</p><ul className="space-y-3">{active.deliverables.map(item => <li key={item.fr} className="flex gap-2 font-bold"><span aria-hidden="true">✓</span>{text(item)}</li>)}</ul></div>
        </div>
        <button type="button" onClick={() => { trackEvent('service_comparison_quote_click', { service: active.id }); onQuoteClick(); }} className="btn-ivision mt-8">{t.quote} <span aria-hidden="true">→</span></button>
      </div>
    </section>
  );
};

export default ServiceComparator;
