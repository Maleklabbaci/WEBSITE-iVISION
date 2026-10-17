import React, { useEffect, useRef, useState } from 'react';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

interface Project { id: number; name: string; sector: { fr: string; en: string; ar: string }; summary: string; media: string; website: string }
const projects: Project[] = [
  { id: 1, name: 'DC16 X WYN', sector: { fr: 'E-commerce · streetwear', en: 'E-commerce · streetwear', ar: 'تجارة إلكترونية · ستريت وير' }, summary: 'Une boutique pensée autour du produit et de la culture streetwear.', media: '/images/project-dc16.webp', website: 'https://dc16.shop/' },
  { id: 2, name: 'MoveSmart', sector: { fr: 'Immobilier · Dubai', en: 'Real Estate · Dubai', ar: 'عقارات · دبي' }, summary: 'Une expérience premium pour présenter les opportunités aux Émirats.', media: '/images/project-movesmart.webp', website: 'https://movesmart-ecru.vercel.app/' },
  { id: 3, name: 'Fidali', sector: { fr: 'SaaS · fidélité digitale', en: 'SaaS · digital loyalty', ar: 'منتج رقمي · ولاء الزبائن' }, summary: 'Un produit digital clair pour transformer la fidélité des commerçants.', media: '/images/project-fidali.webp', website: 'https://fidali.vercel.app/' },
  { id: 4, name: 'White Aura', sector: { fr: 'Cosmétiques · e-commerce', en: 'Cosmetics · e-commerce', ar: 'تجميل · متجر إلكتروني' }, summary: 'Une boutique beauté immersive pour une marque premium.', media: '/images/project-white-aura.webp', website: 'https://white-aura.vercel.app/' },
];

const copy = {
  fr: { label: 'NOS RÉALISATIONS', kicker: 'SELECTED DIGITAL WORK', title: ['DES SITES', 'QUI BOUGENT.'], body: 'Vitrine, boutique ou produit digital : explorez quatre interfaces, puis choisissez le format adapté à votre activité.', view: 'Ouvrir le site', portfolio: 'Voir le portfolio sites web', offer: 'L’offre sites web', quote: 'Décrire mon site', scroll: 'NOS SITES', badge: 'WEBSITE' },
  en: { label: 'OUR WORK', kicker: 'SELECTED DIGITAL WORK', title: ['WEBSITES', 'THAT MOVE.'], body: 'A business site, a shop or a digital product: explore four interfaces, then find the right format for your project.', view: 'Open website', portfolio: 'Web portfolio', offer: 'Website services', quote: 'Request a website', scroll: 'OUR SITES', badge: 'WEBSITE' },
  ar: { label: 'أعمالنا', kicker: 'أعمال رقمية مختارة', title: ['مواقع', 'تتحرك.'], body: 'موقع تعريفي أو متجر أو منتج رقمي: تصفح أربع واجهات واختر الشكل المناسب لمشروعك.', view: 'فتح الموقع', portfolio: 'تصفح أعمال المواقع', offer: 'خدمة إنشاء المواقع', quote: 'اطلب موقعاً', scroll: 'مواقعنا', badge: 'موقع ويب' },
};

interface PortfolioGalleryProps { language: Language }

const PortfolioGallery: React.FC<PortfolioGalleryProps> = ({ language }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    projects.forEach(({ media }) => { const image = new Image(); image.decoding = 'async'; image.src = media; });
    trackEvent('view_portfolio', { projects: projects.map((project) => project.name).join(', ') });
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .08 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="etudes-de-cas" className={`iv-work-scene ${visible ? 'is-visible' : ''}`}>
      <div className="iv-work-scene-sticky">
        <div className="iv-section-topline"><span>{t.label}</span></div>
        <div className="iv-work-scene-heading iv-reveal"><div><span className="iv-label">{t.kicker}</span><h2><span>{t.title[0]}</span><span>{t.title[1]}</span></h2></div><div className="iv-work-scene-intro"><p>{t.body}</p><div className="iv-work-actions"><a href="/portfolio-sites-web-algerie.html" className="iv-work-simple-cta"><span>{t.portfolio}</span><b aria-hidden="true">↗</b></a><a href="/creation-site-web-algerie.html" className="iv-work-secondary-cta">{t.offer} ↗</a><a href="/#/devis?service=site-web" className="iv-work-secondary-cta">{t.quote} ↗</a></div></div></div>
        <div className="iv-work-marquee" dir="ltr" aria-label={t.scroll}>
          <div className="iv-work-marquee-track">
            {[0, 1].map((set) => <div className="iv-work-marquee-set" key={set} aria-hidden={set === 1}>
              {projects.map((project) => <a key={`${set}-${project.id}`} href={project.website} target="_blank" rel="noopener noreferrer" aria-label={`${project.name} — ${t.view}`} className="iv-work-fixed-card" tabIndex={set === 1 ? -1 : undefined} onClick={() => trackEvent('view_project', { project: project.name })}>
                <div className="iv-work-float-media"><div className="iv-work-float-bar"><span /><span /><span /><small>{t.badge}</small></div><img src={project.media} alt={set === 1 ? '' : `${project.name} — aperçu du site`} loading={project.id === 1 && set === 0 ? 'eager' : 'lazy'} decoding="async" /></div>
                <div className="iv-work-float-meta"><span>{project.sector[language]}</span><strong>{project.name}</strong><small>{t.view} <b aria-hidden="true">↗</b></small></div>
              </a>)}
            </div>)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;
