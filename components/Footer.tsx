import React from 'react';

interface FooterProps {
  translations: { tagline: string; copyright: string; contactUs: string; contact: { email: string; support: string; phone: string } };
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ translations, onOpenPolicy }) => {
  const year = new Date().getFullYear();
  if (!translations?.contact) return null;
  return (
    <footer className="site-footer">
      <div className="site-footer-top"><div><img loading="lazy" decoding="async" src="https://i.ibb.co/vCV92NXv/logo2.png" alt="iVISION" className="site-footer-logo" /><p>{translations.tagline}</p></div><a href="#/devis" className="site-footer-talk">{translations.contactUs}<span aria-hidden="true">↗</span></a></div>
      <div className="site-footer-contact"><a href={`mailto:${translations.contact.email}`}>{translations.contact.email}</a><a href={`tel:${translations.contact.phone?.replace(/\s/g, '') || ''}`}>{translations.contact.phone}</a><span className="site-footer-socials"><a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.tiktok.com/@ivisionagency1" target="_blank" rel="noopener noreferrer">TikTok</a></span></div>
      <div className="site-footer-bottom"><p>&copy; {year} {translations.copyright}</p><div><button type="button" onClick={() => onOpenPolicy('privacy')}>Confidentialité</button><button type="button" onClick={() => onOpenPolicy('terms')}>Conditions</button></div></div>
    </footer>
  );
};
export default Footer;
