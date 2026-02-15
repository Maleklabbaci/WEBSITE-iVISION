
import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <a href="#accueil" aria-label="iVISION Home" className="flex items-center group">
    <img 
      src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
      alt="iVISION Agency" 
      className="h-8 md:h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
          className="relative block py-2 px-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/70 hover:text-brand-accent transition-all duration-300"
        >
          {link}
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ${isScrolled ? 'py-4 bg-brand-dark/80 backdrop-blur-2xl border-b border-white/5' : 'py-8 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        <div className="hidden md:flex items-center gap-10">
          <NavLinks className="flex items-center" links={translations.links} />
          <button 
            onClick={onQuoteClick} 
            className="bg-brand-accent text-brand-dark font-black py-3 px-8 rounded-xl text-[10px] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(56,189,248,0.4)] uppercase tracking-widest"
          >
            {translations.cta}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
