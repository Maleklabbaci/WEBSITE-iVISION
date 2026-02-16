
import React from 'react';

interface FooterProps {
    translations: { 
      tagline: string; 
      links: string[]; 
      copyright: string; 
      contact: { email: string; support: string; phone: string; }
    }
}

const Footer: React.FC<FooterProps> = ({ translations }) => {
  const year = new Date().getFullYear();
  const staticLinks = ['accueil', 'services', 'projets'];

  return (
    <footer className="bg-brand-dark border-t border-white/5 pt-32 pb-16">
      <div className="container px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-20 mb-32">
          <div className="max-w-sm">
            <img 
              src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
              alt="iVISION" 
              className="h-12 w-auto object-contain mb-8 block"
            />
            <p className="text-brand-gray text-lg font-medium leading-relaxed opacity-60">
              {translations.tagline}
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-20">
            {/* Navigation */}
            <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Navigation</span>
                {translations.links.map((link, index) => (
                  <a key={link} href={`#${staticLinks[index]}`} className="text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-brand-accent transition-colors">
                    {link}
                  </a>
                ))}
            </div>

            {/* Contact */}
            <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Contact</span>
                <div className="flex flex-col gap-4">
                  <a href={`mailto:${translations.contact.email}`} className="text-xs font-bold text-brand-gray hover:text-brand-accent transition-colors break-all">
                    {translations.contact.email}
                  </a>
                  <a href={`tel:${translations.contact.phone.replace(/\s/g, '')}`} className="text-xs font-bold text-brand-gray hover:text-brand-accent transition-colors">
                    {translations.contact.phone}
                  </a>
                </div>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Social</span>
                <a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-brand-accent transition-colors">Instagram</a>
                <a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-brand-gray hover:text-brand-accent transition-colors">Facebook</a>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-white/5">
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-gray/30">
            &copy; {year} {translations.copyright}
          </p>
          <div className="flex gap-10">
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-brand-gray/30 hover:text-brand-accent transition-colors">Privacy</a>
            <a href="#" className="text-[10px] font-black uppercase tracking-widest text-brand-gray/30 hover:text-brand-accent transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
