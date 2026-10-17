import React, { useEffect, useState } from 'react';

interface HeaderProps {
  translations: { links: string[]; cta: string };
  onQuoteClick: () => void;
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  language?: string;
  onChangeLanguage?: (lang: 'fr' | 'en' | 'ar') => void;
}

const Header: React.FC<HeaderProps> = ({ translations, onQuoteClick, language = 'fr' }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const labels = language === 'ar'
    ? { home: 'الرئيسية', about: 'من نحن', work: 'أعمال المواقع (فرنسي)', social: 'أعمال التواصل (فرنسي)', services: 'خدماتنا', marketing: 'التسويق الرقمي (فرنسي)', content: 'صناعة المحتوى (فرنسي)', web: 'مواقع ويب (فرنسي)' }
    : language === 'en'
      ? { home: 'Home', about: 'About', work: 'Web portfolio (FR)', social: 'Social portfolio (FR)', services: 'Services', marketing: 'Digital marketing (FR)', content: 'Content (FR)', web: 'Websites (FR)' }
      : { home: 'Accueil', about: 'À propos', work: 'Portfolio web', social: 'Portfolio social', services: 'Services', marketing: 'Marketing digital', content: 'Contenu', web: 'Sites web' };
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
    const go = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (window.location.hash.startsWith('#/') && window.location.hash.length > 2) {
      window.location.hash = '';
      window.setTimeout(go, 280);
    } else {
      go();
    }
  };

  return (
    <>
      <header className={`iv-header ${isScrolled || open ? 'is-scrolled' : ''}`}>
        <div className="iv-header-inner">
          <a href="/" className="iv-logo" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }} aria-label="iVISION — accueil">
            <img src="/images/ivision-logo-white.png" alt="iVISION" />
          </a>
          <nav className="iv-nav" aria-label="Navigation principale">
            <a href="#accueil" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }}>{labels.home}</a>
            {navItems.map((item) => item.href
              ? <a key={item.href} href={item.href}>{item.label}</a>
              : item.hash
                ? <a key={item.hash} href={`#${item.hash}`} onClick={(event) => { event.preventDefault(); setOpen(false); window.location.hash = item.hash!; }}>{item.label}</a>
                : <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollTo(item.id!); }}>{item.label}</a>)}
          </nav>
          <button type="button" className="iv-header-cta" onClick={onQuoteClick}><span>{translations.cta}</span><b aria-hidden="true">↗</b></button>
          <button type="button" className={`iv-menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}><span /><span /></button>
        </div>
      </header>
      <div className={`iv-mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Navigation mobile">
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
