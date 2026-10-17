import React, { useState, useEffect, Suspense, lazy } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import AboutVisual from './components/AboutVisual';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import MobileConversionBar from './components/MobileConversionBar';
import ScrollToTopButton from './components/ScrollToTopButton';
import QuoteForm from './components/QuoteForm';
import WebProjectQuoteForm from './components/WebProjectQuoteForm';
import TrainingCenterLanding from './components/TrainingCenterLanding';
import LanguageSelector from './components/LanguageSelector';
import GuideOverlay from './components/GuideOverlay';
import { translations, Language } from './lib/translations';
import { getLegacyServicePage, parseRoute } from './lib/router';
import { updateSEO } from './lib/seo-utils';
import { initReveal } from './lib/reveal';

// ===== LAZY LOADING (Performance) =====
const BlogList = lazy(() => import('./components/BlogList'));
const BlogPostPage = lazy(() => import('./components/BlogPostPage'));
const ServicePage = lazy(() => import('./components/ServicePage'));
const HomeBelowFold = lazy(() => import('./components/HomeBelowFold'));

// ===== PAGE LOADER =====
const PageLoader: React.FC<{ language?: Language }> = ({ language = 'fr' }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-brand-blue/20 border-t-brand-blue rounded-full animate-spin"></div>
      <p className="text-brand-gray text-sm font-medium uppercase tracking-widest">
        {language === 'ar' ? 'جارٍ التحميل...' : 'Chargement...'}
      </p>
    </div>
  </div>
);

const policyCopy = {
  fr: {
    closeAria: 'Fermer la fenêtre',
    understood: 'Compris',
    privacyTitle: 'Politique de Confidentialité',
    privacyIntro: 'Chez iVISION Agency, nous accordons une importance primordiale à la protection de vos données personnelles. Cette politique détaille comment nous collectons et utilisons vos informations.',
    privacyItems: [
      ['1. Collecte des données', 'Nous collectons les informations que vous nous fournissez via nos formulaires (nom, téléphone, e-mail, entreprise et informations de projet) uniquement pour traiter vos demandes de devis.'],
      ['2. Utilisation', 'Vos données servent à répondre à votre demande et à vous contacter par WhatsApp ou e-mail. Les formulaires utilisent le service Formspark pour transmettre les demandes à iVISION ; ne saisissez jamais de données bancaires ou de mots de passe.'],
      ['3. Sécurité', 'Nous limitons l’accès aux demandes reçues et appliquons des mesures raisonnables de sécurité. Les données peuvent être traitées par Formspark selon ses propres conditions et sa politique de confidentialité.'],
    ],
    termsTitle: 'Conditions Générales',
    termsIntro: 'En utilisant les services d’iVISION Agency, vous acceptez les conditions suivantes :',
    termsItems: [
      ['1. Services', 'iVISION Agency fournit des services de marketing digital, de création de contenu et de développement web haute performance.'],
      ['2. Engagement', 'Toute collaboration fait l’objet d’un contrat spécifique détaillant les objectifs, les délais et les modalités de paiement.'],
      ['3. Propriété', 'Sauf mention contraire, tous les éléments créés restent la propriété intellectuelle de l’agence jusqu’au paiement intégral de la prestation.'],
    ],
  },
  en: {
    closeAria: 'Close window',
    understood: 'Got it',
    privacyTitle: 'Privacy Policy',
    privacyIntro: 'At iVISION Agency, we attach primary importance to protecting your personal data. This policy details how we collect and use your information.',
    privacyItems: [
      ['1. Data collection', 'We collect the information you provide via our forms (name, phone, email, company and project details) solely to process your quote requests.'],
      ['2. Use of data', 'Your data is used to answer your request and contact you via WhatsApp or email. Forms use Formspark to transmit requests to iVISION; never enter banking data or passwords.'],
      ['3. Security', 'We limit access to received requests and apply reasonable security measures. Data may be processed by Formspark under its own terms and privacy policy.'],
    ],
    termsTitle: 'Terms & Conditions',
    termsIntro: 'By using iVISION Agency services, you agree to the following conditions:',
    termsItems: [
      ['1. Services', 'iVISION Agency provides digital marketing, content creation and web development services.'],
      ['2. Commitment', 'Every collaboration is covered by a specific agreement detailing goals, timelines and payment terms.'],
      ['3. Ownership', 'Unless stated otherwise, created assets remain the intellectual property of the agency until full payment.'],
    ],
  },
  ar: {
    closeAria: 'إغلاق النافذة',
    understood: 'مفهوم',
    privacyTitle: 'سياسة الخصوصية',
    privacyIntro: 'في وكالة iVISION، نولي أهمية قصوى لحماية بياناتك الشخصية. توضح هذه السياسة كيفية جمع معلوماتك واستخدامها.',
    privacyItems: [
      ['1. جمع البيانات', 'نجمع المعلومات التي تقدمها عبر نماذجنا (الاسم، الهاتف، البريد الإلكتروني، الشركة ومعلومات المشروع) فقط لمعالجة طلبات العروض الخاصة بك.'],
      ['2. الاستخدام', 'تُستخدم بياناتك للرد على طلبك والتواصل معك عبر واتساب أو البريد الإلكتروني. تستخدم النماذج خدمة Formspark لإرسال الطلبات إلى iVISION؛ لا تُدخل أبداً بيانات بنكية أو كلمات مرور.'],
      ['3. الأمان', 'نقيّد الوصول إلى الطلبات المستلمة ونطبق إجراءات أمان مناسبة. قد تتم معالجة البيانات بواسطة Formspark وفقاً لشروطها وسياسة الخصوصية الخاصة بها.'],
    ],
    termsTitle: 'الشروط العامة',
    termsIntro: 'باستخدامك لخدمات وكالة iVISION، فإنك توافق على الشروط التالية:',
    termsItems: [
      ['1. الخدمات', 'تقدم وكالة iVISION خدمات التسويق الرقمي، وصناعة المحتوى، وتطوير مواقع الويب.'],
      ['2. الالتزام', 'يخضع كل تعاون لاتفاق خاص يوضح الأهداف والآجال وشروط الدفع.'],
      ['3. الملكية الفكرية', 'ما لم يُذكر خلاف ذلك، تظل جميع العناصر المنجزة ملكاً فكرياً للوكالة حتى سداد كامل مستحقات الخدمة.'],
    ],
  },
} as const;

const PolicyModal: React.FC<{ isOpen: boolean; onClose: () => void; type: 'privacy' | 'terms'; language?: Language }> = ({ isOpen, onClose, type, language = 'fr' }) => {
  const closeButton = React.useRef<HTMLButtonElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;
  const copy = policyCopy[language] || policyCopy.fr;
  const items = type === 'privacy' ? copy.privacyItems : copy.termsItems;

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeButton.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCloseRef.current();
      if (event.key === 'Tab') {
        const buttons = closeButton.current?.closest('[role="dialog"]')?.querySelectorAll<HTMLButtonElement>('button:not([disabled])');
        if (!buttons?.length) return;
        const first = buttons[0];
        const last = buttons[buttons.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => { window.removeEventListener('keydown', onKeyDown); previousFocus?.focus(); };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md animate-fade-in" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div role="dialog" aria-modal="true" aria-labelledby="policy-title" className="relative bg-white dark:bg-navy border border-navy/10 dark:border-white/10 p-8 md:p-14 max-w-3xl w-full rounded-[2.5rem] shadow-2xl max-h-[80vh] overflow-y-auto scrollbar-none">
        <button ref={closeButton} type="button" aria-label={copy.closeAria} onClick={onClose} className={`absolute top-8 ${language === 'ar' ? 'left-8' : 'right-8'} text-navy/40 dark:text-white/40 hover:text-brand-blue transition-colors`}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>
        
        <div className="space-y-8">
            <h2 id="policy-title" className="text-3xl font-black text-navy dark:text-white uppercase tracking-tighter">
                {type === 'privacy' ? copy.privacyTitle : copy.termsTitle}
            </h2>
            
            <div className="space-y-6 text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed">
                <p>{type === 'privacy' ? copy.privacyIntro : copy.termsIntro}</p>
                {items.map(([heading, body]) => (
                  <div key={heading}>
                    <h4 className="font-bold text-navy dark:text-white mb-2 uppercase text-xs tracking-widest">{heading}</h4>
                    <p>{body}</p>
                  </div>
                ))}
            </div>
            
            <button onClick={onClose} className="btn-ivision w-full py-4 mt-8">{copy.understood}</button>
        </div>
      </div>
    </div>
  );
};

const StaticBackground: React.FC = () => <div className="source-page-background" aria-hidden="true" />;

type ViewType = 'home' | 'quote' | 'blog' | 'blog-post' | 'service' | 'centres';

// Source unique de routage : lib/router.ts (plus de parseHash dupliqué ici).
const parseHash = (): { view: ViewType; slug?: string } => {
  const route = parseRoute();
  const slug = route.type === 'blog-post' || route.type === 'service'
    ? route.slug
    : route.type === 'quote' ? route.service : undefined;
  return { view: route.type, slug };
};

type HomeSectionsProps = { language: Language; translations: typeof translations.fr };

// Le pré-rendu peut fournir la même section de manière synchrone ; le navigateur
// conserve l'import lazy afin de ne télécharger le bas de page qu'à la demande.
const App: React.FC<{ homeSections?: React.ComponentType<HomeSectionsProps> }> = ({ homeSections: HomeSections = HomeBelowFold }) => {
  const [isLoading] = useState(false);
  const [language, setLanguage] = useState<Language>('fr');
  const [theme, setTheme] = useState<'dark' | 'light'>('light');
  const [isExitingLangSelector, setIsExitingLangSelector] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [currentSlug, setCurrentSlug] = useState<string>('');

  // L’entrée sur la home reste immédiate, comme sur l’expérience de référence.
  const [showLangSelector, setShowLangSelector] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  
  const WHATSAPP_NUMBER = "213563839404";

  useEffect(() => {
    const savedLang = localStorage.getItem('ivision-lang-selected') as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
    initReveal();
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const { view, slug } = parseHash();
      if (view === 'service' && slug) {
        const destination = getLegacyServicePage(slug);
        if (destination) {
          window.location.replace(destination);
          return;
        }
      }
      setCurrentView(view);
      setCurrentSlug(slug || '');
      if (view !== 'home') {
        setShowGuide(false);
      }
      window.scrollTo(0, 0);
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
    if (currentView !== 'home') return;
    updateSEO({
      title: 'iVISION Agency | Agence digitale & marketing en Algérie',
      fullTitle: true,
      description: 'iVISION accompagne les entreprises en Algérie : stratégie digitale, campagnes Meta et Google, création de contenu, réseaux sociaux et sites web.',
      ogImage: 'https://ivision.agency/images/ivision-hero-analytics.webp',
      canonical: 'https://ivision.agency/',
    });
  }, [currentView]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const handleSelectLanguage = (selectedLanguage: Language) => {
    setLanguage(selectedLanguage);
    localStorage.setItem('ivision-lang-selected', selectedLanguage);
    setIsExitingLangSelector(true);
    setTimeout(() => setShowLangSelector(false), 500);
  };

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const handleOpenQuotePage = () => {
    window.location.hash = '/devis';
  };
  
  const t = translations[language] || translations['fr'];

  const renderContent = () => {
    switch (currentView) {
      case 'blog':
        return (
          <Suspense fallback={<PageLoader language={language} />}>
            <BlogList />
          </Suspense>
        );

      case 'blog-post':
        return (
          <Suspense fallback={<PageLoader language={language} />}>
            <BlogPostPage slug={currentSlug} />
          </Suspense>
        );

      case 'service':
        return (
          <Suspense fallback={<PageLoader language={language} />}>
            <ServicePage slug={currentSlug} />
          </Suspense>
        );

      case 'centres':
        return <TrainingCenterLanding language={language} />;

      case 'quote':
        return currentSlug === 'site-web'
          ? <WebProjectQuoteForm language={language} onOpenPolicy={() => setPolicyType('privacy')} />
          : <QuoteForm translations={{ form: t.contact.form }} />;
        
      case 'home':
      default:
        return (
          <>
            <Hero translations={t.hero} onQuoteClick={handleOpenQuotePage} language={language} />
            <AboutVisual language={language} />
            <Suspense fallback={null}>
              <HomeSections
                language={language}
                translations={t}
              />
            </Suspense>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen relative font-sans overflow-x-clip selection:bg-brand-blue selection:text-white">
      <StaticBackground />
      
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
          onClose={() => {
            setShowGuide(false);
            localStorage.setItem('ivision-guide-shown', 'true');
          }} 
        />
      )}

      <PolicyModal isOpen={!!policyType} onClose={() => setPolicyType(null)} type={policyType || 'privacy'} language={language} />
      
      <div 
        className={`relative z-10 flex flex-col min-h-screen transition-all duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'} ${(showLangSelector || policyType) ? 'filter blur-md' : ''}`}
      >
        <Header 
          translations={t.header} 
          onQuoteClick={handleOpenQuotePage} 
          theme={theme}
          onToggleTheme={toggleTheme}
          language={language}
          forceScrolled={currentView !== 'home'}
          onChangeLanguage={(lang) => {
            setLanguage(lang);
            localStorage.setItem('ivision-lang-selected', lang);
          }}
        />
        
        <main className="flex-grow">
          <div key={currentView + currentSlug} className="iv-page-enter">
            {renderContent()}
          </div>
        </main>

        <Footer translations={t.footer} onOpenPolicy={(type) => setPolicyType(type)} />
      </div>

      {!isLoading && !showLangSelector && !policyType && currentView !== 'quote' && (
        <MobileConversionBar language={language} />
      )}
    </div>
  );
};

export default App;
