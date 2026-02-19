
import React, { useState, useEffect, useRef } from 'react';

interface ContactProps {
    translations: {
        title: string;
        subtitle: string;
        labels: {
            contact: string;
            follow: string;
        };
        footerContact: {
            email: string;
            support: string;
            phone: string;
        }
    }
}

const IconFacebook = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>;
const IconInstagram = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z"/></svg>;
const IconTikTok = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.36-.54.38-.89.96-.99 1.6-.13.58-.1 1.18.06 1.75.22.82.75 1.54 1.45 2.01.62.4 1.38.54 2.12.39.92-.14 1.74-.74 2.19-1.56.32-.53.42-1.15.42-1.76.01-3.46-.01-6.91.01-10.37z"/></svg>;

const Contact: React.FC<ContactProps> = ({ translations }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  if (!translations || !translations.labels) return null;

  const words = translations.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="contact" ref={sectionRef} className="py-24 md:py-40 bg-white dark:bg-navy relative border-t border-navy/5 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="container">
        <div className={`mb-16 md:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 md:gap-12">
            <div className="max-w-4xl">
              <div className="sketch-badge mb-6 md:mb-8">Contact</div>
              <h2 className="text-[clamp(2.5rem,7vw,8rem)] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.8] uppercase transition-colors duration-500">
                {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-base md:text-2xl text-brand-gray dark:text-brand-gray/80 max-w-sm font-medium leading-tight opacity-70 md:border-l-2 md:border-brand-blue/30 md:pl-8">
              {translations.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Details Card */}
          <div className={`glass-card p-8 md:p-14 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-10">{translations.labels.contact}</h4>
            
            <div className="space-y-10">
              <div>
                <span className="block text-[8px] font-black uppercase tracking-widest text-brand-gray/40 mb-2">Email</span>
                <a href={`mailto:${translations.footerContact?.email}`} className="text-xl md:text-3xl font-black text-navy dark:text-white hover:text-brand-blue transition-colors break-all tracking-tighter">
                  {translations.footerContact?.email}
                </a>
              </div>
              <div>
                <span className="block text-[8px] font-black uppercase tracking-widest text-brand-gray/40 mb-2">WhatsApp</span>
                <a href={`tel:${translations.footerContact?.phone?.replace(/\s/g, '') || ''}`} className="text-xl md:text-3xl font-black text-brand-blue hover:brightness-110 transition-all tracking-tighter">
                  {translations.footerContact?.phone}
                </a>
              </div>
            </div>
          </div>

          {/* Social Media Card */}
          <div className={`glass-card p-8 md:p-14 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-10">{translations.labels.follow}</h4>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              <a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 hover:border-brand-blue transition-all">
                <div className="p-4 bg-brand-blue text-white rounded-xl group-hover:rotate-6 transition-transform">
                  <IconInstagram />
                </div>
                <span className="text-[10px] font-black text-navy dark:text-white uppercase tracking-tighter">Instagram</span>
              </a>

              <a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 hover:border-brand-blue transition-all">
                <div className="p-4 bg-brand-blue text-white rounded-xl group-hover:rotate-6 transition-transform">
                  <IconFacebook />
                </div>
                <span className="text-[10px] font-black text-navy dark:text-white uppercase tracking-tighter">Facebook</span>
              </a>

              <a href="https://www.tiktok.com/@ivisionagency1" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-4 p-6 rounded-2xl bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 hover:border-brand-blue transition-all">
                <div className="p-4 bg-brand-blue text-white rounded-xl group-hover:rotate-6 transition-transform">
                  <IconTikTok />
                </div>
                <span className="text-[10px] font-black text-navy dark:text-white uppercase tracking-tighter">TikTok</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
