import React from 'react';

interface FooterProps {
  translations: {
    tagline: string;
    copyright: string;
    contactUs: string;
    marketingLink: string;
    contentLink: string;
    adsLink: string;
    webLink: string;
    privacyLink?: string;
    termsLink?: string;
    contact: { email: string; support: string; phone: string };
  };
  onOpenPolicy: (type: 'privacy' | 'terms') => void;
}

const Footer: React.FC<FooterProps> = ({ translations, onOpenPolicy }) => {
  const year = new Date().getFullYear();
  if (!translations?.contact) return null;
  return (
    <footer className="site-footer">
      <div className="site-footer-top"><div><img loading="lazy" decoding="async" src="/images/ivision-logo-white.png" alt="iVISION" className="site-footer-logo" /><p>{translations.tagline}</p></div><a href="#/devis" className="site-footer-talk">{translations.contactUs}<span aria-hidden="true">↗</span></a></div>
      <div className="site-footer-contact"><a href={`mailto:${translations.contact.email}`} dir="ltr">{translations.contact.email}</a><a href={`tel:${translations.contact.phone?.replace(/\s/g, '') || ''}`} dir="ltr">{translations.contact.phone}</a><span className="site-footer-socials"><a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.tiktok.com/@ivisionagency1" target="_blank" rel="noopener noreferrer">TikTok</a></span></div>
      <nav className="site-footer-expertise" aria-label="Expertises iVISION"><a href="/agence-marketing-digital-algerie.html">{translations.marketingLink}</a><a href="/creation-contenu-algerie.html">{translations.contentLink}</a><a href="/publicite-meta-google-ads-algerie.html">{translations.adsLink}</a><a href="/creation-site-web-algerie.html">{translations.webLink}</a><a href="/blog/">Blog</a></nav>
      <div className="site-footer-bottom"><p suppressHydrationWarning>&copy; {year} {translations.copyright}</p><div><button type="button" onClick={() => onOpenPolicy('privacy')}>{translations.privacyLink || 'Confidentialité'}</button><button type="button" onClick={() => onOpenPolicy('terms')}>{translations.termsLink || 'Conditions'}</button></div></div>
    </footer>
  );
};
export default Footer;
