import React, { lazy, Suspense, useEffect, useState } from 'react';
import PortfolioGallery from './PortfolioGallery';
import HowWeWork from './HowWeWork';
import Contact from './Contact';
import type { Language } from '../lib/translations';

const ServiceComparator = lazy(() => import('./ServiceComparator'));
const QuickQuote = lazy(() => import('./QuickQuote'));
const BudgetCalculator = lazy(() => import('./BudgetCalculator'));
const Testimonials = lazy(() => import('./Testimonials'));
const FAQ = lazy(() => import('./FAQ'));

type HomeBelowFoldProps = {
  language: Language;
  translations: any;
  onQuoteClick: () => void;
};

const copy = {
  fr: {
    explore: 'Explorer nos outils et nos preuves',
    exploreHint: 'Comparateur, rentabilité, témoignages et réponses aux questions fréquentes.',
  },
  en: {
    explore: 'Explore our tools and proof',
    exploreHint: 'Service comparison, break-even calculator, testimonials and frequent questions.',
  },
  ar: {
    explore: 'اكتشف أدواتنا وأدلتنا',
    exploreHint: 'مقارنة الخدمات وحساب التعادل وشهادات العملاء والأسئلة الشائعة.',
  },
};

const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({ language, translations, onQuoteClick }) => {
  const [toolsOpen, setToolsOpen] = useState(false);
  const t = copy[language];

  useEffect(() => {
    const openTargetedSection = () => {
      const target = window.location.hash.replace(/^#/, '');
      if (!['comparateur', 'faq'].includes(target)) return;
      setToolsOpen(true);
      window.setTimeout(() => {
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    openTargetedSection();
    window.addEventListener('hashchange', openTargetedSection);
    return () => window.removeEventListener('hashchange', openTargetedSection);
  }, []);

  return (
    <div className="below-fold-content">
      <PortfolioGallery language={language} onQuoteClick={onQuoteClick} />
      <Suspense fallback={null}>
        <QuickQuote language={language} onFullQuoteClick={onQuoteClick} />

        <HowWeWork
          translations={{ ...translations.howWeWork, modal: translations.contact?.modal }}
          onQuoteClick={onQuoteClick}
        />

        <details
          id="outils-et-preuves"
          open={toolsOpen}
          onToggle={(event) => setToolsOpen(event.currentTarget.open)}
          className="border-y border-navy/10 dark:border-white/10 bg-navy/[0.025] dark:bg-white/[0.02]"
        >
          <summary className="container flex cursor-pointer list-none items-center justify-between gap-6 py-7 md:py-9 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-inset">
            <span>
              <span className="block text-sm font-black uppercase tracking-[0.18em] text-navy dark:text-white">{t.explore}</span>
              <span className="mt-2 block text-sm text-brand-gray dark:text-brand-gray/80">{t.exploreHint}</span>
            </span>
            <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-brand-blue/30 text-2xl font-light text-brand-blue transition-transform duration-200 ${toolsOpen ? 'rotate-45' : ''}`}>+</span>
          </summary>

          {toolsOpen && (
            <div className="border-t border-navy/10 dark:border-white/10">
              <ServiceComparator language={language} onQuoteClick={onQuoteClick} />
              <BudgetCalculator language={language} />
              <Testimonials translations={translations.testimonials} />
              <FAQ translations={translations.faq} />
            </div>
          )}
        </details>
      </Suspense>

      {translations.contactSection && translations.footer?.contact && (
        <Contact translations={{ ...translations.contactSection, footerContact: translations.footer.contact }} />
      )}
    </div>
  );
};

export default HomeBelowFold;
