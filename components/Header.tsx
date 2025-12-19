import React, { useState, useEffect } from 'react';

const Logo: React.FC = () => (
  <a href="#accueil" aria-label="iVISION Home" className="text-2xl font-bold tracking-tight text-brand-light">
    i<span className="text-brand-accent">V</span>ISION
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
          className="block py-2 px-4 text-brand-light hover:text-brand-accent transition-colors duration-300"
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
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-brand-dark/30 backdrop-blur-xl border-b border-brand-border' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Logo />
        <div className="hidden md:flex items-center space-x-6">
          <NavLinks className="flex space-x-2" links={translations.links} />
          <button onClick={onQuoteClick} className="bg-brand-accent text-brand-dark font-semibold py-2 px-6 rounded-md hover:opacity-90 transition-all duration-300 transform hover:scale-105">
            {translations.cta}
          </button>
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none z-50">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-brand-dark/95 backdrop-blur-sm pb-4 absolute top-full left-0 right-0">
          <NavLinks className="text-center" onItemClick={() => setIsOpen(false)} links={translations.links}/>
        </div>
      )}
    </header>
  );
};

export default Header;