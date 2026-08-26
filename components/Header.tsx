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
  const labels = language === 'ar' ? { home: 'الرئيسية', about: 'من نحن', work: 'أعمالنا', services: 'خدماتنا', blog: 'المدونة' } : language === 'en' ? { home: 'Home', about: 'About', work: 'Work', services: 'Services', blog: 'Blog' } : { home: 'Accueil', about: 'À propos', work: 'Projets', services: 'Services', blog: 'Blog' };
  const navItems = [
    { label: labels.about, id: 'about' },
    { label: labels.work, id: 'etudes-de-cas' },
    { label: labels.services, id: 'services' },
    { label: labels.blog, hash: '/blog' },
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
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      <header className={`iv-header ${isScrolled || open ? 'is-scrolled' : ''}`}>
        <div className="iv-header-inner">
          <a href="#accueil" className="iv-logo" onClick={(event) => { event.preventDefault(); setOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} aria-label="iVISION — accueil">
            <img src="https://i.ibb.co/vCV92NXv/logo2.png" alt="iVISION" />
          </a>
          <nav className="iv-nav" aria-label="Navigation principale">
            <a href="#accueil" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }}>{labels.home}</a>
            {navItems.map((item) => item.hash ? <a key={item.hash} href={`#${item.hash}`} onClick={(event) => { event.preventDefault(); setOpen(false); window.location.hash = item.hash; }}>{item.label}</a> : <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollTo(item.id!); }}>{item.label}</a>)}
          </nav>
          <button type="button" className="iv-header-cta" onClick={onQuoteClick}><span>{translations.cta}</span><b aria-hidden="true">↗</b></button>
          <button type="button" className={`iv-menu-button ${open ? 'is-open' : ''}`} onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}><span /><span /></button>
        </div>
      </header>
      <div className={`iv-mobile-menu ${open ? 'is-open' : ''}`} aria-hidden={!open}>
        <nav aria-label="Navigation mobile">
          <a href="#accueil" onClick={(event) => { event.preventDefault(); scrollTo('accueil'); }}>{labels.home}</a>
          {navItems.map((item) => item.hash ? <a key={item.hash} href={`#${item.hash}`} onClick={(event) => { event.preventDefault(); setOpen(false); window.location.hash = item.hash; }}>{item.label}</a> : <a key={item.id} href={`#${item.id}`} onClick={(event) => { event.preventDefault(); scrollTo(item.id!); }}>{item.label}</a>)}
          <button type="button" onClick={() => { setOpen(false); onQuoteClick(); }}>{translations.cta}<span aria-hidden="true">↗</span></button>
        </nav>
      </div>
    </>
  );
};

export default Header;
