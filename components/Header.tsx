import React, { useEffect, useState } from 'react';

interface HeaderProps {
  translations: { links: string[]; cta: string };
  onQuoteClick: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  language?: string;
  onChangeLanguage?: (lang: 'fr' | 'en' | 'ar') => void;
  forceScrolled?: boolean;
}

const Header: React.FC<HeaderProps> = ({
  translations,
  onQuoteClick,
  language = 'fr',
  onChangeLanguage,
  forceScrolled = false,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const labels = language === 'ar'
    ? {
        home: 'الرئيسية',
        about: 'من نحن',
        work: 'أعمال المواقع',
        social: 'أعمال التواصل',
        services: 'خدماتنا',
        marketing: 'التسويق الرقمي',
        content: 'صناعة المحتوى',
        web: 'مواقع الويب',
        logoAria: 'iVISION — الرئيسية',
        navAria: 'التنقل الرئيسي',
        mobileNavAria: 'التنقل عبر الهاتف',
        openMenu: 'فتح القائمة',
        closeMenu: 'إغلاق القائمة',
        langAria: 'تغيير اللغة',
      }
    : language === 'en'
      ? {
          home: 'Home',
          about: 'About',
          work: 'Web portfolio',
          social: 'Social portfolio',
          services: 'Services',
          marketing: 'Digital marketing',
          content: 'Content',
          web: 'Websites',
          logoAria: 'iVISION — home',
          navAria: 'Main navigation',
          mobileNavAria: 'Mobile navigation',
          openMenu: 'Open menu',
          closeMenu: 'Close menu',
          langAria: 'Change language',
        }
      : {
          home: 'Accueil',
          about: 'À propos',
          work: 'Portfolio web',
          social: 'Portfolio social',
          services: 'Services',
          marketing: 'Marketing digital',
          content: 'Contenu',
          web: 'Sites web',
          logoAria: 'iVISION — accueil',
          navAria: 'Navigation principale',
          mobileNavAria: 'Navigation mobile',
          openMenu: 'Ouvrir le menu',
          closeMenu: 'Fermer le menu',
          langAria: 'Changer de langue',
        };

  const navItems: { label: string; id?: string; hash?: string; href?: string }[] = [
    { label: labels.about, id: 'about' },
    { label: labels.work, href: '/portfolio-sites-web-algerie.html' },
    { label: labels.social, href: '/portfolio-social-media-algerie.html' },
    { label: labels.services, id: 'services' },
    { label: labels.marketing, href: '/agence-marketing-digital-algerie.html' },
    { label: labels.content, href: '/creation-contenu-algerie.html' },
    { label: labels.web, href: '/creation-site-web-algerie.html' },
  ];

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const scrollTo = (id: string) => {
    setOpen(false);
    const go = () => {
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    if (window.location.hash.startsWith('#/') && window.location.hash.length > 2) {
      window.location.hash = '';
      window.setTimeout(go, 280);
    } else {
      go();
    }
  };

  const selectLang = (nextLang: 'fr' | 'ar') => {
    onChangeLanguage?.(nextLang);
  };

  return (
    <>
      <header className={`iv-header ${isScrolled || open || forceScrolled ? 'is-scrolled' : ''}`}>
        <div className="iv-header-inner">
          <a href="/" className="iv-logo" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }} aria-label={labels.logoAria}>
            <img src="/images/ivision-logo-white.png" alt="iVISION" />
          </a>
          <nav className="iv-nav" aria-label={labels.navAria}>
            <a href="#accueil" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }}>{labels.home}</a>
            {navItems.map((item) => item.href
              ? <a key={item.href} href={item.href}>{item.label}</a>
              : item.hash
                ? <a key={item.hash} href={`#${item.hash}`} onClick={(event) => { event.preventDefault(); setOpen(false); window.location.hash = item.hash!; }}>{item.label}</a>
                : <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollTo(item.id!); }}>{item.label}</a>)}
          </nav>
          <div className="iv-header-actions">
            <div className="iv-lang-switch" role="group" aria-label={labels.langAria}>
              <button
                type="button"
                className={`iv-lang-btn ${language !== 'ar' ? 'is-active' : ''}`}
                onClick={() => selectLang('fr')}
                aria-pressed={language !== 'ar'}
                lang="fr"
              >
                FR
              </button>
              <button
                type="button"
                className={`iv-lang-btn ${language === 'ar' ? 'is-active' : ''}`}
                onClick={() => selectLang('ar')}
                aria-pressed={language === 'ar'}
                lang="ar"
              >
                عربي
              </button>
            </div>
            <button type="button" className="iv-header-cta" onClick={onQuoteClick}><span>{translations.cta}</span><b aria-hidden="true">↗</b></button>
            <button type="button" className={`iv-menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? labels.closeMenu : labels.openMenu}><span /><span /></button>
          </div>
        </div>
      </header>
      <div className={`iv-mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <div className="iv-mobile-lang" role="group" aria-label={labels.langAria}>
          <button
            type="button"
            className={`iv-lang-btn ${language !== 'ar' ? 'is-active' : ''}`}
            onClick={() => selectLang('fr')}
            aria-pressed={language !== 'ar'}
            lang="fr"
          >
            Français (FR)
          </button>
          <button
            type="button"
            className={`iv-lang-btn ${language === 'ar' ? 'is-active' : ''}`}
            onClick={() => selectLang('ar')}
            aria-pressed={language === 'ar'}
            lang="ar"
          >
            العربية (AR)
          </button>
        </div>
        <nav aria-label={labels.mobileNavAria}>
          <a href="#accueil" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }}>{labels.home}</a>
          {navItems.map((item) => item.href
            ? <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
            : item.hash
              ? <a key={item.hash} href={`#${item.hash}`} onClick={(event) => { event.preventDefault(); setOpen(false); window.location.hash = item.hash!; }}>{item.label}</a>
              : <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollTo(item.id!); }}>{item.label}</a>)}
          <button type="button" onClick={() => { setOpen(false); onQuoteClick(); }}>{translations.cta}<span aria-hidden="true">↗</span></button>
        </nav>
      </div>
    </>
  );
};

export default Header;
