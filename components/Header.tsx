import React, { useEffect, useState } from 'react';

interface HeaderProps {
  translations: { links: string[]; cta: string };
  onQuoteClick: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  language?: string;
  onChangeLanguage?: (lang: 'fr' | 'en' | 'ar') => void;
}

const Header: React.FC<HeaderProps> = ({ translations, onQuoteClick, theme, onToggleTheme, language = 'fr', onChangeLanguage }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: language === 'ar' ? 'الرئيسية' : language === 'en' ? 'Home' : 'Accueil', id: 'accueil' },
    { label: language === 'ar' ? 'من نحن' : language === 'en' ? 'About' : 'À propos', id: 'about' },
    { label: translations.links[0], id: 'services' },
    { label: translations.links[1], id: 'etudes-de-cas' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = () => setIsMobileMenuOpen(false);

  const handleAnchorClick = (event: React.MouseEvent, sectionId: string) => {
    event.preventDefault();
    closeMenu();
    const isSubPage = window.location.hash.startsWith('#/') && window.location.hash.length > 2;
    const scroll = () => document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (isSubPage) {
      window.location.hash = '';
      window.setTimeout(scroll, 280);
    } else {
      scroll();
    }
  };

  const handleBlogClick = (event: React.MouseEvent) => {
    event.preventDefault();
    closeMenu();
    window.location.hash = '/blog';
  };

  const handleLogoClick = (event: React.MouseEvent) => {
    event.preventDefault();
    closeMenu();
    if (window.location.hash.startsWith('#/')) window.location.hash = '';
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cycleLanguage = () => {
    const langs: ('fr' | 'en' | 'ar')[] = ['fr', 'en', 'ar'];
    const next = langs[(langs.indexOf(language as 'fr' | 'en' | 'ar') + 1) % langs.length];
    onChangeLanguage?.(next);
  };

  return (
    <>
      <header className={`site-header pipam-header ${isScrolled || isMobileMenuOpen ? 'is-scrolled' : ''}`}>
        <div className="pipam-header-inner">
          <a href="#accueil" onClick={handleLogoClick} className="pipam-brand" aria-label="iVISION — accueil">
            <img src="https://i.ibb.co/vCV92NXv/logo2.png" alt="iVISION" className="logo-img" />
          </a>

          <nav className="pipam-nav" aria-label="Navigation principale">
            {navItems.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(event) => handleAnchorClick(event, item.id)}>{item.label}</a>
            ))}
            <a href="#/blog" onClick={handleBlogClick}>Blog</a>
          </nav>

          <div className="pipam-header-right">
            <button id="guide-contact-btn" type="button" onClick={onQuoteClick} className="pipam-header-cta">
              <span>{translations.cta}</span><span aria-hidden="true">↗</span>
            </button>
            <button type="button" className={`pipam-menu-toggle ${isMobileMenuOpen ? 'is-open' : ''}`} onClick={() => setIsMobileMenuOpen((open) => !open)} aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'} aria-expanded={isMobileMenuOpen}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div className={`pipam-mobile-menu ${isMobileMenuOpen ? 'is-open' : ''}`} aria-hidden={!isMobileMenuOpen}>
        <div className="pipam-mobile-menu-inner">
          <nav aria-label="Navigation mobile">
            {navItems.map((item, index) => (
              <a key={item.id} href={`#${item.id}`} onClick={(event) => handleAnchorClick(event, item.id)} style={{ transitionDelay: `${index * 60}ms` }}>{item.label}</a>
            ))}
            <a href="#/blog" onClick={handleBlogClick} style={{ transitionDelay: `${navItems.length * 60}ms` }}>Blog</a>
          </nav>
          <button type="button" onClick={() => { closeMenu(); onQuoteClick(); }} className="pipam-mobile-cta">{translations.cta}<span aria-hidden="true">↗</span></button>
          <div className="pipam-utility-row">
            <button type="button" onClick={cycleLanguage} aria-label="Changer la langue">{language.toUpperCase()}</button>
            <button id="guide-theme-toggle" type="button" onClick={onToggleTheme} aria-label="Changer de thème">{theme === 'dark' ? 'Light' : 'Dark'}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
