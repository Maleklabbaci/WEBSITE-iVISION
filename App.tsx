
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ClientLogos from './components/ClientLogos';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import VisualShowcase from './components/VisualShowcase';
import HowWeWork from './components/HowWeWork';
import QuoteForm from './components/QuoteForm';
import TestimonialForm from './components/TestimonialForm';
import SplashScreen from './components/SplashScreen';
import LanguageSelector from './components/LanguageSelector';
import { translations, Language } from './lib/translations';

const StaticBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-brand-dark">
    <div 
      className="absolute inset-0 z-0" 
      style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(56, 189, 248, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(56, 189, 248, 0.05) 0%, transparent 50%)',
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
  const [currentView, setCurrentView] = useState<'home' | 'quote' | 'testimonial'>('home');
  
  const WHATSAPP_NUMBER = "213563839404";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1600);
    return () => clearTimeout(timer);
  }, []);

  // Handle Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === '#/devis') {
        setCurrentView('quote');
        window.scrollTo(0, 0);
      } else if (hash === '#/avis') {
        setCurrentView('testimonial');
        window.scrollTo(0, 0);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => window.removeEventListener('hashchange', handleHashChange);
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
        // If we are not on the home page, navigating home should work via hash
        if (currentView !== 'home') {
            window.location.hash = anchor.hash.replace('#', '');
            return;
        }

        const element = document.querySelector(anchor.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          });
          window.history.pushState(null, '', anchor.hash);
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, [currentView]);

  const handleSelectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setIsExitingLangSelector(true);
    setTimeout(() => {
      setShowLangSelector(false);
    }, 600);
  };

  const handleOpenQuotePage = () => {
    window.location.hash = '/devis';
  };
  
  const t = translations[language] || translations['fr'];

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden">
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
          key="lang-selector-overlay" 
          className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/40 backdrop-blur-xl transition-all duration-700 ${isExitingLangSelector ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        >
            <div className={`transition-all duration-500 transform ${isExitingLangSelector ? 'scale-110 blur-lg' : 'scale-100 blur-0'}`}>
                <LanguageSelector onSelectLanguage={handleSelectLanguage} />
            </div>
        </div>
      )}
      
      <div 
        key="main-content" 
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-1000 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} ${showLangSelector ? 'filter blur-md' : 'filter blur-0'}`}
      >
        <Header translations={t.header} onQuoteClick={handleOpenQuotePage} />
        
        <main className="flex-grow pt-24">
          {currentView === 'home' && (
            <>
              <Hero translations={t.hero} onQuoteClick={handleOpenQuotePage} />
              <ClientLogos translations={t.clientLogos} />
              <Services translations={t.services} />
              <VisualShowcase translations={t.visualShowcase} />
              <HowWeWork translations={t.howWeWork} />
              <Testimonials translations={t.testimonials} />
              <FAQ translations={t.faq} />
            </>
          )}
          {currentView === 'quote' && (
            <QuoteForm translations={t.contact} />
          )}
          {currentView === 'testimonial' && (
            <TestimonialForm translations={t.testimonials.form} />
          )}
        </main>

        <Footer translations={t.footer} />
      </div>
    </div>
  );
};

export default App;
