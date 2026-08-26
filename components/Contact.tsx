import React, { useEffect, useRef, useState } from 'react';

interface ContactProps {
  translations: { title: string; subtitle: string; labels: { contact: string; follow: string }; footerContact: { email: string; support: string; phone: string } }
}

const Contact: React.FC<ContactProps> = ({ translations }) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .12 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  if (!translations?.labels) return null;
  const words = translations.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);
  return (
    <section id="contact" ref={ref} className={`pipam-contact-scene ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />Contact<span className="pipam-section-number">07 / 07</span></div>
      <div className="pipam-contact-heading"><h2><span>{words.slice(0, splitIndex).join(' ')}</span><span className="is-outline">{words.slice(splitIndex).join(' ')}</span></h2><p>{translations.subtitle}</p></div>
      <div className="pipam-contact-links"><div><span>{translations.labels.contact}</span><a href={`mailto:${translations.footerContact.email}`}>{translations.footerContact.email}</a><a href={`tel:${translations.footerContact.phone?.replace(/\s/g, '') || ''}`}>{translations.footerContact.phone}</a></div><div><span>{translations.labels.follow}</span><div className="pipam-social-links"><a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.tiktok.com/@ivisionagency1" target="_blank" rel="noopener noreferrer">TikTok</a></div></div></div>
    </section>
  );
};
export default Contact;
