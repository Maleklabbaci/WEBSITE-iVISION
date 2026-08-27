import React, { useEffect, useRef, useState } from 'react';

interface AboutVisualProps { language: 'fr' | 'en' | 'ar' }

const copy = {
  fr: { eyebrow: 'À PROPOS', title: 'On transforme l’attention en croissance.', body: 'iVISION construit des systèmes digitaux clairs : une idée forte, une image juste et une acquisition qui se mesure.', principles: ['Une direction qui se remarque.', 'Un contenu qui donne confiance.', 'Une expérience qui convertit.'], link: 'Voir nos réalisations', trust: 'DES ÉQUIPES QUI NOUS FONT CONFIANCE' },
  en: { eyebrow: 'ABOUT', title: 'We turn attention into growth.', body: 'iVISION builds clear digital systems: a strong idea, a precise image and acquisition you can measure.', principles: ['A direction people notice.', 'Content that earns trust.', 'An experience that converts.'], link: 'See our work', trust: 'TEAMS THAT TRUST OUR WORK' },
  ar: { eyebrow: 'من نحن', title: 'نحوّل الانتباه إلى نمو.', body: 'نبني أنظمة رقمية واضحة: فكرة قوية، صورة دقيقة واكتساب يمكن قياسه.', principles: ['اتجاه يلفت الانتباه.', 'محتوى يبني الثقة.', 'تجربة تحقق النتائج.'], link: 'اكتشف أعمالنا', trust: 'فرق تثق في عملنا' },
};

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
        <div className="iv-about-side"><ol>{t.principles.map((principle, index) => <li key={principle}><p>{principle}</p></li>)}</ol></div>
      </div>
      <div className="iv-about-trust"><div><span className="iv-label">/ TRUST &amp; LEGACY</span><h3>{t.trust}<b aria-hidden="true">↗</b></h3></div><p>From fast-growing startups to established enterprises, we build the visual systems that move people to act.</p></div>
      <div className="iv-about-mosaic" aria-label="Visuels temporaires de la direction artistique"><figure className="iv-about-mosaic-small"><img src="/images/agency-card-product.jpg" alt="Composition artistique orange et crème" /></figure><figure className="iv-about-mosaic-large"><img src="/images/agency-card-lifestyle.jpg" alt="Campagne éditoriale en mouvement" /><figcaption>E-COMMERCE &amp; D2C<br />BRANDS</figcaption></figure><figure className="iv-about-mosaic-medium"><img src="/images/agency-card-portrait.jpg" alt="Portrait éditorial" /><figcaption>UX / REFINEMENT</figcaption></figure></div>
    </section>
  );
};

export default AboutVisual;
