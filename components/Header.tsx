
import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <a href="#accueil" aria-label="iVISION Home" className="flex items-center group">
    <img 
      src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
      alt="iVISION Agency" 
      className="h-7 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
    />
  </a>
);

interface NavLinksProps {
  className?: string;
  onItemClick?: () => void;
  links: string[];
}

const NavLinks: React.FC<NavLinksProps> = ({ className, onItemClick, links }) => {
  const staticLinks = ['accueil', 'services', 'process'];
  return (
    <nav className={className}>
      {links.map((link, index) => (
        <a 
          key={link} 
          href={`#${staticLinks[index]}`} 
          onClick={onItemClick}
          className="relative block py-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gray hover:text-white transition-all duration-300 group"
        >
          {link}
          <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-brand-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
        </a>
      ))}
    </nav>
  );
};

interface HeaderProps {
    translations: {
        links: string[];
        cta: string;
    }
    onQuoteClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ translations, onQuoteClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'py-3 bg-brand-dark/80 backdrop-blur-2xl border-b border-white/5 shadow-xl' : 'py-6 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <NavLinks className="flex items-center" links={translations.links} />
          <button 
            onClick={onQuoteClick} 
            className="group relative bg-brand-accent text-brand-dark font-black py-2.5 px-6 rounded-lg text-[10px] transition-all duration-500 transform hover:scale-105 hover:shadow-[0_0_25px_rgba(56,189,248,0.3)] uppercase tracking-widest border border-white/10"
          >
            <span className="relative z-10">{translations.cta}</span>
            <div className="absolute inset-0 bg-white rounded-lg opacity-0 group-hover:opacity-10 transition-opacity"></div>
          </button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-2 rounded-xl transition-all duration-300 ${isOpen ? 'text-brand-accent bg-brand-accent/10 rotate-90' : 'text-white bg-white/5'}`}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 right-0 bg-brand-dark/98 backdrop-blur-3xl border-b border-white/5 transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[400px] opacity-100 py-8 shadow-2xl' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-6">
          <NavLinks className="flex flex-col gap-4 mb-8" onItemClick={() => setIsOpen(false)} links={translations.links}/>
          <button 
            onClick={() => {
              setIsOpen(false);
              onQuoteClick();
            }} 
            className="w-full bg-brand-accent text-brand-dark font-black py-4 rounded-xl shadow-xl uppercase tracking-widest text-[11px]"
          >
            {translations.cta}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
