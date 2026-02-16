
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import VisualShowcase from './components/VisualShowcase';
import HowWeWork from './components/HowWeWork';
import QuoteForm from './components/QuoteForm';
import SplashScreen from './components/SplashScreen';
import LanguageSelector from './components/LanguageSelector';
import { translations, Language } from './lib/translations';

const StaticBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-brand-bg">
    {/* Subtle blue glow top center */}
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-brand-accent/10 blur-[150px] rounded-full"></div>
    {/* Subtle glow bottom right */}
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-accent/5 blur-[120px] rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('fr');
  const [showLangSelector, setShowLangSelector] = useState(true);
  const [isExitingLangSelector, setIsExitingLangSelector] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'quote'>('home');
  
  const WHATSAPP_NUMBER = "213563839404";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/devis') {
        setCurrentView('quote');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  const handleSelectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setIsExitingLangSelector(true);
    setTimeout(() => {
      setShowLangSelector(false);
    }, 500);
  };

  const handleOpenQuotePage = () => {
    window.location.hash = '/devis';
  };
  
  const t = translations[language] || translations['fr'];

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-brand-accent selection:text-white">
      <StaticBackground />
      
      {isLoading && <SplashScreen />}

      {!isLoading && (
        <>
          <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} message={t.whatsapp.message} />
          <ScrollToTopButton />
        </>
      )}

      {!isLoading && showLangSelector && (
        <div 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md transition-all duration-500 ${isExitingLangSelector ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className={`transition-all duration-500 transform ${isExitingLangSelector ? 'scale-110 blur-lg' : 'scale-100 blur-0'}`}>
                <LanguageSelector onSelectLanguage={handleSelectLanguage} />
            </div>
        </div>
      )}
      
      <div 
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} ${showLangSelector ? 'filter blur-md' : ''}`}
      >
        <Header translations={t.header} onQuoteClick={handleOpenQuotePage} />
        
        <main className="flex-grow">
          {currentView === 'home' && (
            <>
              <Hero translations={t.hero} onQuoteClick={handleOpenQuotePage} />
              <Services translations={{...t.services, modal: t.contact.modal}} onQuoteClick={handleOpenQuotePage} />
              <VisualShowcase translations={t.visualShowcase} />
              <HowWeWork translations={{...t.howWeWork, modal: t.contact.modal}} onQuoteClick={handleOpenQuotePage} />
              <Testimonials translations={t.testimonials} />
              <FAQ translations={t.faq} />
            </>
          )}
          {currentView === 'quote' && (
            <QuoteForm translations={t.contact} />
          )}
        </main>

        <Footer translations={t.footer} />
      </div>
    </div>
  );
};

export default App;
