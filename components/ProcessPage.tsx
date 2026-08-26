import React from 'react';
import type { Language } from '../lib/translations';

type Step = { title: string; description: string; details: string };

type ProcessPageProps = {
  language: Language;
  translations: { title: string; subtitle: string; steps: Step[] };
  stepSlug?: string;
  onQuoteClick: () => void;
};

const copy = {
  fr: { back: 'Retour à la méthode', eyebrow: 'Étape du processus', included: 'Ce que nous faisons', next: 'Parler à un expert' },
  en: { back: 'Back to our method', eyebrow: 'Process step', included: 'What we do', next: 'Talk to an expert' },
  ar: { back: 'العودة إلى طريقتنا', eyebrow: 'خطوة من العملية', included: 'ما نقوم به', next: 'تحدث مع خبير' },
};

const ProcessPage: React.FC<ProcessPageProps> = ({ language, translations, stepSlug, onQuoteClick }) => {
  const t = copy[language];
  const stepIndex = Math.min(Math.max(Number(stepSlug || 1) - 1, 0), Math.max(translations.steps.length - 1, 0));
  const step = translations.steps[stepIndex];

  return (
    <main className="min-h-screen pt-32 md:pt-44 pb-24">
      <section className="container">
        <a href="#/methode" className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-brand-gray hover:text-brand-blue transition-colors">← {t.back}</a>
        <div className="mt-12 max-w-4xl">
          <div className="sketch-badge mb-6">{t.eyebrow} 0{stepIndex + 1}</div>
          <h1 className="text-[clamp(2.5rem,7vw,7rem)] font-black text-navy dark:text-white tracking-tighter leading-[0.88] uppercase">
            {step.title}
            <br />
            <span className="text-brand-blue">{step.description}</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl text-brand-gray dark:text-brand-gray/80 leading-relaxed">{translations.subtitle}</p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="glass-card p-7 md:p-12">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-4">{t.included}</p>
            <p className="text-xl md:text-2xl text-navy dark:text-white leading-relaxed font-bold">{step.details}</p>
          </article>
          <aside className="rounded-[2rem] bg-brand-blue p-7 md:p-10 text-white shadow-[0_24px_60px_rgba(36,87,255,0.2)]">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/65 mb-4">iVISION</p>
            <p className="text-lg leading-relaxed text-white/90">{language === 'fr' ? 'Chaque étape est pilotée pour transformer votre objectif en action mesurable.' : language === 'en' ? 'Every step is managed to turn your goal into measurable action.' : 'ندير كل خطوة لتحويل هدفك إلى إجراء قابل للقياس.'}</p>
            <button type="button" onClick={onQuoteClick} className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-xs font-black uppercase tracking-widest text-brand-blue hover:bg-white/90 transition-colors">{t.next} <span aria-hidden="true">→</span></button>
          </aside>
        </div>

        <nav aria-label={t.eyebrow} className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {translations.steps.map((item, index) => (
            <a key={item.title} href={`#/methode/${index + 1}`} className={`rounded-2xl border p-5 transition-all ${index === stepIndex ? 'border-brand-blue bg-brand-blue/10' : 'border-navy/10 dark:border-white/10 hover:border-brand-blue/50'}`}>
              <span className="text-[10px] font-black tracking-widest text-brand-blue">0{index + 1}</span>
              <span className="mt-2 block text-sm font-black uppercase text-navy dark:text-white">{item.title}</span>
            </a>
          ))}
        </nav>
      </section>
    </main>
  );
};

export default ProcessPage;
