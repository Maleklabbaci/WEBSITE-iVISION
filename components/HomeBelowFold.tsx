import React, { lazy, Suspense } from 'react';
import PortfolioGallery from './PortfolioGallery';
import VisualShowcase from './VisualShowcase';
import HowWeWork from './HowWeWork';
import Testimonials from './Testimonials';
import FAQ from './FAQ';
import Contact from './Contact';
import type { Language } from '../lib/translations';

const CaseStudies = lazy(() => import('./CaseStudies'));
const ServiceComparator = lazy(() => import('./ServiceComparator'));
const QuickQuote = lazy(() => import('./QuickQuote'));
const BudgetCalculator = lazy(() => import('./BudgetCalculator'));


type HomeBelowFoldProps = {
  language: Language;
  translations: any;
  onQuoteClick: () => void;
};

const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({ language, translations, onQuoteClick }) => (
  <div className="below-fold-content">
    <PortfolioGallery language={language} />
    <Suspense fallback={null}>
      <CaseStudies language={language} onQuoteClick={onQuoteClick} />
      <ServiceComparator language={language} onQuoteClick={onQuoteClick} />
      <QuickQuote language={language} onFullQuoteClick={onQuoteClick} />
      <BudgetCalculator language={language} />
    </Suspense>
    <VisualShowcase translations={translations.visualShowcase} />
    <HowWeWork translations={{ ...translations.howWeWork, modal: translations.contact?.modal }} onQuoteClick={onQuoteClick} />
    <Testimonials translations={translations.testimonials} />
    <FAQ translations={translations.faq} />
    {translations.contactSection && translations.footer?.contact && (
      <Contact translations={{ ...translations.contactSection, footerContact: translations.footer.contact }} />
    )}
  </div>
);

export default HomeBelowFold;
