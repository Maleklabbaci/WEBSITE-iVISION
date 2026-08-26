import React from 'react';
import PortfolioGallery from './PortfolioGallery';
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
      <QuickQuote language={language} onFullQuoteClick={onQuoteClick} />
      <HowWeWork
        translations={{ ...translations.howWeWork, modal: translations.contact?.modal }}
        onQuoteClick={onQuoteClick}
      />
      {translations.contactSection && translations.footer?.contact && (
        <Contact translations={{ ...translations.contactSection, footerContact: translations.footer.contact }} />
      )}
    </div>
  );
};

export default HomeBelowFold;
