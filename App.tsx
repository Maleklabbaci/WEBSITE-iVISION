
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import ScrollToTopButton from './components/ScrollToTopButton';
import VisualShowcase from './components/VisualShowcase';
import HowWeWork from './components/HowWeWork';
import QuoteForm from './components/QuoteForm';
import SplashScreen from './components/SplashScreen';
import LanguageSelector from './components/LanguageSelector';
import GuideOverlay from './components/GuideOverlay';
import { translations, Language } from './lib/translations';

const PolicyModal: React.FC<{ isOpen: boolean; onClose: () => void; type: 'privacy' | 'terms' }> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-fade-in">
      <div className="relative bg-white dark:bg-navy border border-navy/10 dark:border-white/10 p-8 md:p-14 max-w-3xl w-full rounded-[2.5rem] shadow-2xl max-h-[80vh] overflow-y-auto scrollbar-none">
        <button onClick={onClose} className="absolute top-8 right-8 text-navy/40 dark:text-white/40 hover:text-brand-blue transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="space-y-8">
            <h2 className="text-3xl font-black text-navy dark:text-white uppercase tracking-tighter">
                {type === 'privacy' ? 'Politique de Confidentialité' : 'Conditions Générales'}
            </h2>
            
            <div className="space-y-6 text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed">
                {type === 'privacy' ? (
                    <>
                        <p>Chez iVISION Agency, nous accordons une importance primordiale à la protection de vos données personnelles. Cette politique détaille comment nous collectons et utilisons vos informations.</p>
                        <div>
                            <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">1. Collecte des données</h4>
                            <p>Nous collectons les informations que vous nous fournissez via nos formulaires (Nom, Prénom, Téléphone, Type de business) uniquement pour traiter vos demandes de devis.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">2. Utilisation</h4>
                            <p>Vos données sont utilisées exclusivement pour l'audit stratégique et la prise de contact commerciale via WhatsApp ou Email.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">3. Sécurité</h4>
                            <p>Nous mettons en œuvre des mesures de sécurité rigoureuses pour protéger vos données contre tout accès non autorisé.</p>
                        </div>
                    </>
                ) : (
                    <>
                        <p>En utilisant les services d'iVISION Agency, vous acceptez les conditions suivantes :</p>
                        <div>
                            <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">1. Services</h4>
                            <p>iVISION Agency fournit des services de marketing digital, de création de contenu et de développement web haute performance.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">2. Engagement</h4>
                            <p>Toute collaboration fait l'objet d'un contrat spécifique détaillant les objectifs, les délais et les modalités de paiement.</p>
                        </div>
                        <div>
                            <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">3. Propriété</h4>
                            <p>Sauf mention contraire, tous les éléments créés restent la propriété intellectuelle de l'agence jusqu'au paiement intégral de la prestation.</p>
                        </div>
                    </>
                )}
            </div>
            
            <button onClick={onClose} className="btn-ivision w-full py-4 mt-8">Compris</button>
        </div>
      </div>
    </div>
  );
};

const StaticBackground: React.FC = () => (
  <div className="fixed top-0 left-0 w-full h-full z-[-1] transition-colors duration-500 bg-white dark:bg-navy">
    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[60%] h-[50%] bg-brand-blue/10 dark:bg-brand-blue/10 blur-[150px] rounded-full"></div>
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-blue/5 dark:bg-brand-blue/5 blur-[120px] rounded-full"></div>
  </div>
);

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<Language>('fr');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showLangSelector, setShowLangSelector] = useState(true);
  const [showGuide, setShowGuide] = useState(false);
  const [isExitingLangSelector, setIsExitingLangSelector] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'quote'>('home');
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);
  
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
        setShowGuide(false); 
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

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSelectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    setIsExitingLangSelector(true);
    setTimeout(() => {
      setShowLangSelector(false);
      if (window.location.hash !== '#/devis') {
        setShowGuide(true);
      }
    }, 500);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenQuotePage = () => {
    window.location.hash = '/devis';
  };
  
  const t = translations[language] || translations['fr'];

  return (
    <div className="min-h-screen relative font-sans overflow-x-hidden selection:bg-brand-blue selection:text-white">
      <StaticBackground />
      
      {isLoading && <SplashScreen />}

      {!isLoading && (
        <>
          <WhatsAppButton phoneNumber={WHATSAPP_NUMBER} message={t.whatsapp?.message || ""} />
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

      {!isLoading && !showLangSelector && showGuide && currentView === 'home' && (
        <GuideOverlay 
          language={language} 
          onClose={() => setShowGuide(false)} 
        />
      )}

      <PolicyModal isOpen={!!policyType} onClose={() => setPolicyType(null)} type={policyType || 'privacy'} />
      
      <div 
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} ${(showLangSelector || policyType) ? 'filter blur-md' : ''}`}
      >
        <Header 
          translations={t.header} 
          onQuoteClick={handleOpenQuotePage} 
          theme={theme}
          onToggleTheme={toggleTheme}
        />
        
        <main className="flex-grow">
          {currentView === 'home' && (
            <>
              <Hero translations={t.hero} onQuoteClick={handleOpenQuotePage} />
              <Services translations={{...t.services, modal: t.contact?.modal}} onQuoteClick={handleOpenQuotePage} />
              <VisualShowcase translations={t.visualShowcase} />
              <HowWeWork translations={{...t.howWeWork, modal: t.contact?.modal}} onQuoteClick={handleOpenQuotePage} />
              <Testimonials translations={t.testimonials} />
              <FAQ translations={t.faq} />
              {t.contactSection && t.footer?.contact && (
                <Contact translations={{ ...t.contactSection, footerContact: t.footer.contact }} />
              )}
            </>
          )}
          {currentView === 'quote' && (
            <QuoteForm translations={t.contact} />
          )}
        </main>

        <Footer translations={t.footer} onOpenPolicy={(type) => setPolicyType(type)} />
      </div>
    </div>
  );
};

export default App;
