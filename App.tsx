
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import WhatsAppPromoPopup from './components/WhatsAppPromoPopup';
import LanguageSelector from './components/LanguageSelector';
import { translations, Language } from './lib/translations';
import QuoteForm from './components/QuoteForm';
import SplashScreen from './components/SplashScreen';
import ScrollToTopButton from './components/ScrollToTopButton';
import Process from './components/Process';
import VisualShowcase from './components/VisualShowcase';

const StaticBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-brand-dark">
    <div 
      className="absolute inset-0 z-0" 
      style={{
        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(56, 189, 248, 0.1) 0%, transparent 40%), radial-gradient(circle at 75% 75%, rgba(56, 189, 248, 0.1) 0%, transparent 40%)',
        backgroundSize: '100% 100%',
      }}
    ></div>
  </div>
);


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('fr');
  const [showLangSelector, setShowLangSelector] = useState(true);
  const [isExitingLangSelector, setIsExitingLangSelector] = useState(false);
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);
  const [isPromoVisible, setIsPromoVisible] = useState(false);
  const [hasShownPromo, setHasShownPromo] = useState(false);
  
  const WHATSAPP_NUMBER = "213697660969";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  // Global Smooth Scroll Handler for Anchor Links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        const element = document.querySelector(anchor.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          // Update URL without jump
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Lazy Scroll Promo Trigger
  useEffect(() => {
    if (showLangSelector || hasShownPromo || isLoading) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      
      // Trigger when user has scrolled 20% of the page
      if (scrollY > (docHeight - windowHeight) * 0.2) {
        setIsPromoVisible(true);
        setHasShownPromo(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showLangSelector, hasShownPromo, isLoading]);

  const handleSelectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setIsExitingLangSelector(true);
    
    // Smooth exit animation before hiding the overlay
    setTimeout(() => {
      setShowLangSelector(false);
    }, 600);
  };

  const handleOpenQuoteForm = () => setIsQuoteFormOpen(true);
  const handleCloseQuoteForm = () => setIsQuoteFormOpen(false);
  const handleClosePromo = () => setIsPromoVisible(false);
  
  const t = translations[language] || translations['fr'];

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden">
      <StaticBackground />
      
      {isLoading && <SplashScreen />}

      {/* Floating Buttons */}
      {!isLoading && (
        <>
          <WhatsAppPromoPopup 
            isVisible={isPromoVisible}
            onClose={handleClosePromo}
            title={t.whatsapp.promoTitle}
            message={t.whatsapp.promo} 
            btnLabel={t.whatsapp.promoBtn}
            phoneNumber={WHATSAPP_NUMBER} 
            whatsappMessage={t.whatsapp.message} 
          />
          <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} message={t.whatsapp.message} />
          <ScrollToTopButton />
        </>
      )}

      {/* Language Popup Overlay */}
      {!isLoading && showLangSelector && (
        <div 
          key="lang-selector-overlay" 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-xl transition-all duration-700 ${isExitingLangSelector ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className={`transition-all duration-500 transform ${isExitingLangSelector ? 'scale-110 blur-lg' : 'scale-100 blur-0'}`}>
                <LanguageSelector onSelectLanguage={handleSelectLanguage} />
            </div>
        </div>
      )}
      
      {/* Main Content */}
      <div 
        key="main-content" 
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-1000 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${showLangSelector || isPromoVisible ? 'filter blur-md' : 'filter blur-0'}`}
      >
        <Header translations={t.header} onQuoteClick={handleOpenQuoteForm} />
        <main className="flex-grow">
          <Hero translations={t.hero} onQuoteClick={handleOpenQuoteForm} />
          <ClientLogos translations={t.clientLogos} />
          <Services translations={t.services} />
          <VisualShowcase translations={t.visualShowcase} />
          <Process translations={t.process} />
          <Portfolio translations={t.portfolio} onQuoteClick={handleOpenQuoteForm} />
          <Testimonials translations={t.testimonials} />
          <FAQ translations={t.faq} />
        </main>
        <Footer translations={t.footer} />
      </div>

      {isQuoteFormOpen && (
        <QuoteForm translations={t.contact} onClose={handleCloseQuoteForm} />
      )}
    </div>
  );
};

export default App;
