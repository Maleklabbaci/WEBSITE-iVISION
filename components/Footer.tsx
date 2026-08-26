import React from 'react';

interface FooterProps {
  translations: {
    tagline: string;
    links: string[];
    copyright: string;
    contactUs: string;
    contact: { email: string; support: string; phone: string };
  };
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ translations, onOpenPolicy }) => {
  const year = new Date().getFullYear();
  const sectionIds = ['services', 'etudes-de-cas', 'methodologie', 'contact'];

  if (!translations?.contact) return null;

  return (
    <footer className="site-footer border-t border-navy/10 bg-white/70 py-16 dark:border-white/10 dark:bg-transparent">
      <div className="container">
        <div className="grid gap-10 md:grid-cols-[1.2fr_1fr_1fr] md:gap-16">
          <div className="max-w-xs">
            <img loading="lazy" decoding="async" src="https://i.ibb.co/vCV92NXv/logo2.png" alt="iVISION" className="logo-img mb-5 h-10 w-auto object-contain" />
            <p className="text-sm font-medium leading-relaxed text-brand-gray dark:text-brand-gray/80">{translations.tagline}</p>
          </div>

          <nav aria-label="Navigation du pied de page" className="flex flex-col gap-3">
            <span className="mb-2 text-[10px] font-black uppercase tracking-widest text-navy/40 dark:text-white/40">Navigation</span>
            {translations.links.map((link, index) => (
              <a key={link} href={`#${sectionIds[index] || 'contact'}`} className="w-fit text-xs font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-blue dark:text-brand-gray/80">{link}</a>
            ))}
            <a href="#/devis" className="w-fit text-xs font-black uppercase tracking-widest text-brand-blue transition-colors hover:brightness-110">{translations.contactUs}</a>
          </nav>

          <div className="flex flex-col gap-3">
            <span className="mb-2 text-[10px] font-black uppercase tracking-widest text-navy/40 dark:text-white/40">Contact</span>
            <a href={`mailto:${translations.contact.email}`} className="w-fit break-all text-sm font-bold text-brand-gray transition-colors hover:text-brand-blue dark:text-brand-gray/80">{translations.contact.email}</a>
            <a href={`mailto:${translations.contact.support}`} className="w-fit break-all text-sm font-bold text-brand-gray transition-colors hover:text-brand-blue dark:text-brand-gray/80">{translations.contact.support}</a>
            <a href={`tel:${translations.contact.phone?.replace(/\s/g, '') || ''}`} className="w-fit text-sm font-black text-brand-blue transition-colors hover:brightness-110">{translations.contact.phone}</a>
            <div className="mt-2 flex gap-4">
              <a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-blue dark:text-brand-gray/80">Instagram</a>
              <a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gray transition-colors hover:text-brand-blue dark:text-brand-gray/80">Facebook</a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-navy/10 pt-6 text-xs dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-bold uppercase tracking-widest text-brand-gray/60">&copy; {year} {translations.copyright}</p>
          <div className="flex gap-5">
            <button type="button" onClick={() => onOpenPolicy('privacy')} className="font-bold uppercase tracking-widest text-brand-gray/60 transition-colors hover:text-brand-blue">Confidentialité</button>
            <button type="button" onClick={() => onOpenPolicy('terms')} className="font-bold uppercase tracking-widest text-brand-gray/60 transition-colors hover:text-brand-blue">Conditions</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
