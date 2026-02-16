
import React, { useState, useEffect } from 'react';

interface HeaderProps {
    translations: { links: string[]; cta: string; };
    onQuoteClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ translations, onQuoteClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-[110] transition-all duration-700 ${isScrolled || isMobileMenuOpen ? 'py-4 bg-navy/80 backdrop-blur-2xl border-b border-white/5' : 'py-6 md:py-8 bg-transparent'}`}>
        <div className="container flex items-center justify-between">
          {/* Logo Image */}
          <a href="#accueil" className="flex items-center gap-2 group z-[120]" onClick={handleLinkClick}>
            <img 
              src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
              alt="iVISION" 
              className="h-8 md:h-10 w-auto object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {translations.links.map((link, i) => (
              <a 
                key={i} 
                href={`#${['services', 'projets', 'accueil'][i]}`} 
                className="text-[11px] font-bold uppercase tracking-[0.15em] text-brand-gray/80 hover:text-white transition-all duration-300 relative group/link"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-brand-blue transition-all duration-300 group-hover/link:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => { handleLinkClick(); onQuoteClick(); }} 
              className="hidden md:block bg-white/5 border border-white/10 text-white font-bold px-6 py-2.5 rounded-full text-[10px] uppercase tracking-widest hover:bg-brand-blue hover:border-brand-blue transition-all duration-500"
            >
              {translations.cta}
            </button>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMobileMenu}
              className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[120]"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-0.5 bg-white transition-all duration-500 transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}></span>
              <span className={`w-6 h-0.5 bg-white transition-all duration-500 transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Premium Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[100] bg-navy/95 backdrop-blur-3xl flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] lg:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'}`}>
        <nav className="flex flex-col items-center gap-10">
          {translations.links.map((link, i) => (
            <a 
              key={i} 
              href={`#${['services', 'projets', 'accueil'][i]}`} 
              onClick={handleLinkClick}
              className={`text-3xl font-black uppercase tracking-tighter transition-all duration-700 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100 blur-0' : 'translate-y-12 opacity-0 blur-md'}`}
              style={{ transitionDelay: `${isMobileMenuOpen ? i * 100 + 200 : 0}ms` }}
            >
              {link}
            </a>
          ))}
          <button 
            onClick={() => { handleLinkClick(); onQuoteClick(); }}
            className={`mt-6 btn-ivision px-12 py-5 transition-all duration-700 transform ${isMobileMenuOpen ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-90'}`}
            style={{ transitionDelay: `${isMobileMenuOpen ? translations.links.length * 100 + 200 : 0}ms` }}
          >
            {translations.cta}
          </button>
        </nav>
      </div>
    </>
  );
};

export default Header;
