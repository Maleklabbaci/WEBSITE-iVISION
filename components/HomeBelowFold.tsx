import React from 'react';
import PortfolioGallery from './PortfolioGallery';
import Services from './Services';
import ImpactStrip from './ImpactStrip';
import FAQ from './FAQ';
import HowWeWork from './HowWeWork';
import Contact from './Contact';
import QuickQuote from './QuickQuote';
import type { Language } from '../lib/translations';

type HomeBelowFoldProps = {
  language: Language;
  translations: any;
  onQuoteClick: () => void;
};

const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({ language, translations, onQuoteClick }) => {
  return (
    <div className="below-fold-content">
      <PortfolioGallery language={language} onQuoteClick={onQuoteClick} />
      <Services translations={{ ...translations.services, modal: translations.contact?.modal }} onQuoteClick={onQuoteClick} />
      <QuickQuote language={language} onFullQuoteClick={onQuoteClick} />
      <ImpactStrip language={language} />
      <HowWeWork
        translations={{ ...translations.howWeWork, modal: translations.contact?.modal }}
        onQuoteClick={onQuoteClick}
      />
      {translations.faq?.faqs && <FAQ translations={translations.faq} />}
      {translations.contactSection && translations.footer?.contact && (
        <Contact translations={{ ...translations.contactSection, footerContact: translations.footer.contact }} />
      )}
    </div>
  );
};

export default HomeBelowFold;
