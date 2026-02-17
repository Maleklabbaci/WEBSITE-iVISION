
import React from 'react';

interface FooterProps {
    translations: { 
      tagline: string; 
      links: string[]; 
      copyright: string; 
      contactUs: string;
      contact: { email: string; support: string; phone: string; }
    },
    onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ translations, onOpenPolicy }) => {
  const year = new Date().getFullYear();
  const staticLinks = ['accueil', 'services', 'projets'];

  return (
    <footer className="bg-white dark:bg-navy border-t border-navy/5 dark:border-white/5 pt-32 pb-16 transition-colors duration-500">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-sm">
            <img 
              src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
              alt="iVISION" 
              className="h-12 w-auto object-contain mb-8 block logo-img"
            />
            <p className="text-brand-gray dark:text-brand-gray/80 text-lg font-medium leading-relaxed opacity-60">
              {translations.tagline}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
            {/* Navigation */}
            <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-navy/20 dark:text-white/20">Navigation</span>
                {translations.links.map((link, index) => (
                  <a key={link} href={`#${staticLinks[index]}`} className="text-xs font-bold uppercase tracking-widest text-brand-gray dark:text-brand-gray/80 hover:text-brand-blue transition-colors">
                    {link}
                  </a>
                ))}
                <a href="#/devis" className="text-xs font-black uppercase tracking-widest text-brand-blue hover:brightness-110 transition-all">
                  {translations.contactUs}
                </a>
            </div>

            {/* Contact Direct */}
            <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-navy/20 dark:text-white/20">Contact</span>
                <div className="flex flex-col gap-4">
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-brand-gray/40 mb-1">Général</span>
                    <a href={`mailto:${translations.contact.email}`} className="text-xs font-bold text-brand-gray dark:text-brand-gray/80 hover:text-brand-blue transition-colors break-all">
                      {translations.contact.email}
                    </a>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-brand-gray/40 mb-1">Support</span>
                    <a href={`mailto:${translations.contact.support}`} className="text-xs font-bold text-brand-gray dark:text-brand-gray/80 hover:text-brand-blue transition-colors break-all">
                      {translations.contact.support}
                    </a>
                  </div>
                  <div>
                    <span className="block text-[8px] font-black uppercase tracking-widest text-brand-gray/40 mb-1">Ligne Directe</span>
                    <a href={`tel:${translations.contact.phone.replace(/\s/g, '')}`} className="text-xs font-black text-brand-blue hover:brightness-110 transition-all">
                      {translations.contact.phone}
                    </a>
                  </div>
                </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-navy/20 dark:text-white/20">Social</span>
                <a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gray dark:text-brand-gray/80 hover:text-brand-blue transition-colors">Instagram</a>
                <a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gray dark:text-brand-gray/80 hover:text-brand-blue transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-navy/5 dark:border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray/30">
            &copy; {year} {translations.copyright}
          </p>
          <div className="flex gap-10">
            <button 
                onClick={() => onOpenPolicy('privacy')}
                className="text-[10px] font-black uppercase tracking-widest text-brand-gray/30 hover:text-brand-blue transition-colors"
            >
                Confidentialité
            </button>
            <button 
                onClick={() => onOpenPolicy('terms')}
                className="text-[10px] font-black uppercase tracking-widest text-brand-gray/30 hover:text-brand-blue transition-colors"
            >
                Conditions
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
