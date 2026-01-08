
import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <a href="#accueil" aria-label="iVISION Home" className="flex items-center gap-2.5 group">
    <div className="w-9 h-9 bg-brand-accent text-brand-dark rounded-xl flex items-center justify-center font-black text-lg transition-all duration-300 group-hover:rotate-6 group-hover:scale-105 shadow-[0_0_15px_rgba(56,189,248,0.2)]">
      iV
    </div>
    <div className="flex flex-col -space-y-1">
      <span className="text-lg font-black tracking-tighter text-brand-light">
        iVISION
      </span>
      <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-brand-accent opacity-80">
        Agency
      </span>
    </div>
  </a>
);

interface NavLinksProps {
  className?: string;
  onItemClick?: () => void;
  links: string[];
}

const NavLinks: React.FC<NavLinksProps> = ({ className, onItemClick, links }) => {
  const staticLinks = ['accueil', 'services', 'process', 'portfolio'];
  return (
    <nav className={className}>
      {links.map((link, index) => (
        <a 
          key={link} 
          href={`#${staticLinks[index]}`} 
          onClick={onItemClick}
          className="block py-1.5 px-3.5 text-[11px] font-black uppercase tracking-widest text-brand-gray hover:text-brand-accent transition-colors duration-300"
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
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-2 bg-brand-dark/50 backdrop-blur-xl border-b border-brand-border shadow-lg' : 'py-4 bg-transparent'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Logo />
        
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks className="flex space-x-1" links={translations.links} />
          <button 
            onClick={onQuoteClick} 
            className="group relative bg-brand-accent text-brand-dark font-black py-2.5 px-7 rounded-xl text-[10px] transition-all duration-300 transform hover:scale-105 shadow-md shadow-brand-accent/10 uppercase tracking-widest"
          >
            <span className="relative z-10">{translations.cta}</span>
            <div className="absolute inset-0 bg-white rounded-xl opacity-0 group-hover:opacity-20 transition-opacity"></div>
          </button>
        </div>

        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`p-1.5 rounded-lg transition-colors ${isOpen ? 'text-brand-accent bg-brand-accent/5' : 'text-white'}`}
            aria-label="Toggle Menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden absolute top-full left-0 right-0 bg-brand-dark/95 backdrop-blur-xl border-b border-brand-border transition-all duration-500 overflow-hidden ${isOpen ? 'max-h-[350px] opacity-100 py-6' : 'max-h-0 opacity-0'}`}>
        <div className="container mx-auto px-6">
          <NavLinks className="flex flex-col space-y-3 mb-6" onItemClick={() => setIsOpen(false)} links={translations.links}/>
          <button 
            onClick={() => {
              setIsOpen(false);
              onQuoteClick();
            }} 
            className="w-full bg-brand-accent text-brand-dark font-black py-3.5 rounded-xl shadow-lg uppercase tracking-widest text-[11px]"
          >
            {translations.cta}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
