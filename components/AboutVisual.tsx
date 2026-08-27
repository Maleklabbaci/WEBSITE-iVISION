import React, { useEffect, useRef, useState } from 'react';

interface AboutVisualProps { language: 'fr' | 'en' | 'ar' }

const copy = {
  fr: { eyebrow: 'À PROPOS', title: 'On transforme l’attention en croissance.', body: 'iVISION construit des systèmes digitaux clairs : une idée forte, une image juste et une acquisition qui se mesure.', principles: ['Une direction qui se remarque.', 'Un contenu qui donne confiance.', 'Une expérience qui convertit.'], link: 'Voir nos réalisations', trust: 'DES ÉQUIPES QUI NOUS FONT CONFIANCE' },
  en: { eyebrow: 'ABOUT', title: 'We turn attention into growth.', body: 'iVISION builds clear digital systems: a strong idea, a precise image and acquisition you can measure.', principles: ['A direction people notice.', 'Content that earns trust.', 'An experience that converts.'], link: 'See our work', trust: 'TEAMS THAT TRUST OUR WORK' },
  ar: { eyebrow: 'من نحن', title: 'نحوّل الانتباه إلى نمو.', body: 'نبني أنظمة رقمية واضحة: فكرة قوية، صورة دقيقة واكتساب يمكن قياسه.', principles: ['اتجاه يلفت الانتباه.', 'محتوى يبني الثقة.', 'تجربة تحقق النتائج.'], link: 'اكتشف أعمالنا', trust: 'فرق تثق في عملنا' },
};

const clientLogos = [
  { name: 'Centre Bissan', website: '#', media: '/images/client-logo-centre-bissane.png' },
  { name: 'Eminora', website: '#', media: '/images/client-logo-eminora.png' },
  { name: 'DC16 X WYN', website: 'https://dc16.shop/' },
  { name: 'MOVESMART', website: 'https://movesmart-ecru.vercel.app/' },
  { name: 'FIDALI', website: 'https://fidali.vercel.app/' },
  { name: 'WHITE AURA', website: 'https://white-aura.vercel.app/' },
];

const AboutVisual: React.FC<AboutVisualProps> = ({ language }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className={`iv-about ${visible ? 'is-visible' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="iv-section-topline"><span>{t.eyebrow}</span></div>
      <div className="iv-about-grid">
        <div className="iv-about-lead"><span className="iv-label">DIGITAL / CULTURE / GROWTH</span><h2>{t.title}</h2><p>{t.body}</p><a className="iv-arrow-link" href="#etudes-de-cas"><span>{t.link}</span><b aria-hidden="true">↗</b></a></div>
        <div className="iv-about-side"><ol>{t.principles.map((principle) => <li key={principle}><p>{principle}</p></li>)}</ol></div>
      </div>
      <div className="iv-about-trust">
        <div className="iv-about-trust-heading"><span className="iv-label">TRUST &amp; LEGACY</span><h3>{t.trust}<b aria-hidden="true">↗</b></h3></div>
        <div className="iv-trust-logo-window" aria-label="Marques accompagnées par iVISION">
          <div className="iv-trust-logo-track">
            {[0, 1].map((set) => <div className="iv-trust-logo-set" key={set} aria-hidden={set === 1}>
              {clientLogos.map((logo) => <a key={`${set}-${logo.name}`} href={logo.website === '#' ? undefined : logo.website} target={logo.website === '#' ? undefined : '_blank'} rel={logo.website === '#' ? undefined : 'noopener noreferrer'} className={`iv-trust-logo ${logo.media ? 'has-image' : ''}`} tabIndex={set === 1 ? -1 : undefined}>{logo.media ? <img src={logo.media} alt={logo.name} loading={set === 0 ? 'lazy' : 'eager'} decoding="async" /> : <>{logo.name}<span aria-hidden="true">↗</span></>}</a>)}
            </div>)}
          </div>
        </div>
      </div>
      <div className="iv-about-mosaic" aria-label="Visuels temporaires de la direction artistique"><figure className="iv-about-mosaic-small"><img src="/images/agency-card-product.jpg" alt="Composition artistique orange et crème" /></figure><figure className="iv-about-mosaic-large"><img src="/images/agency-card-lifestyle.jpg" alt="Campagne éditoriale en mouvement" /><figcaption>E-COMMERCE &amp; D2C<br />BRANDS</figcaption></figure><figure className="iv-about-mosaic-medium"><img src="/images/agency-card-portrait.jpg" alt="Portrait éditorial" /><figcaption>UX / REFINEMENT</figcaption></figure></div>
    </section>
  );
};

export default AboutVisual;
