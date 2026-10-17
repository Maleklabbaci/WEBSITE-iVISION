import React, { useEffect, useRef, useState } from 'react';

interface AboutVisualProps { language: 'fr' | 'en' | 'ar' }

const copy = {
  fr: {
    eyebrow: 'À PROPOS',
    kicker: 'DIGITAL / CULTURE / GROWTH',
    title: 'On relie les idées à vos objectifs.',
    body: 'iVISION construit des parcours digitaux clairs : une idée forte, une image juste et des actions dont on peut suivre les effets.',
    principles: ['Une direction qui se remarque.', 'Un contenu qui donne confiance.', 'Une expérience qui facilite le contact.'],
    link: 'Voir nos réalisations',
    trustKicker: 'SELECTED WEB WORK',
    trust: 'DES PROJETS WEB À EXPLORER',
    mosaic: [['E-COMMERCE', 'DIRECTION'], ['CONTENT', 'CAMPAIGNS'], ['GROWTH', 'SYSTEMS']],
  },
  en: {
    eyebrow: 'ABOUT',
    kicker: 'DIGITAL / CULTURE / GROWTH',
    title: 'We connect ideas to your goals.',
    body: 'iVISION builds clear digital journeys: a strong idea, a precise image and actions you can track.',
    principles: ['A direction people notice.', 'Content that earns trust.', 'An experience that makes contact easier.'],
    link: 'See our work',
    trustKicker: 'SELECTED WEB WORK',
    trust: 'EXPLORE WEB PROJECTS',
    mosaic: [['E-COMMERCE', 'DIRECTION'], ['CONTENT', 'CAMPAIGNS'], ['GROWTH', 'SYSTEMS']],
  },
  ar: {
    eyebrow: 'من نحن',
    kicker: 'رقمي / ثقافة / نمو',
    title: 'نربط الأفكار بأهدافك.',
    body: 'نبني مسارات رقمية واضحة: فكرة قوية، صورة دقيقة وخطوات يمكن قياس أثرها.',
    principles: ['اتجاه يلفت الانتباه.', 'محتوى يبني الثقة.', 'تجربة تسهل التواصل.'],
    link: 'اكتشف أعمالنا',
    trustKicker: 'أعمال ويب مختارة',
    trust: 'مشاريع ويب لاستكشافها',
    mosaic: [['إدارة المتاجر', 'الإلكترونية'], ['حملات', 'المحتوى'], ['أنظمة', 'النمو']],
  },
};

const webProjects = [
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
        <div className="iv-about-lead"><span className="iv-label">{t.kicker}</span><h2>{t.title}</h2><p>{t.body}</p><a className="iv-arrow-link" href="#etudes-de-cas"><span>{t.link}</span><b aria-hidden="true">↗</b></a></div>
        <div className="iv-about-side"><ol>{t.principles.map((principle) => <li key={principle}><p>{principle}</p></li>)}</ol></div>
      </div>
      <div className="iv-about-trust">
        <div className="iv-about-trust-heading"><span className="iv-label">{t.trustKicker}</span><h3>{t.trust}<b aria-hidden="true">↗</b></h3></div>
        <div className="iv-trust-logo-window" dir="ltr" aria-label="Liens vers les projets web présentés par iVISION">
          <div className="iv-trust-logo-track">
            {[0, 1].map((set) => <div className="iv-trust-logo-set" key={set} aria-hidden={set === 1}>
              {webProjects.map((project) => <a key={`${set}-${project.name}`} href={project.website} target="_blank" rel="noopener noreferrer" className="iv-trust-logo" tabIndex={set === 1 ? -1 : undefined}>{project.name}<span aria-hidden="true">↗</span></a>)}
            </div>)}
          </div>
        </div>
      </div>
      <div className="iv-about-mosaic" aria-label="Visuels de stratégie digitale"><figure className="iv-about-mosaic-small iv-reveal-img"><img src="/images/agency-card-ecommerce-new.webp" alt="Illustration d'une mise en scène de produits e-commerce" width={960} height={1200} loading="lazy" decoding="async" /><figcaption>{t.mosaic[0][0]}<br />{t.mosaic[0][1]}</figcaption></figure><figure className="iv-about-mosaic-large iv-reveal-img" style={{ "--reveal-delay": "0.12s" } as React.CSSProperties}><img src="/images/agency-card-content-studio.webp" alt="Illustration d'un studio de création de contenu" width={1200} height={800} loading="lazy" decoding="async" /><figcaption>{t.mosaic[1][0]}<br />{t.mosaic[1][1]}</figcaption></figure><figure className="iv-about-mosaic-medium iv-reveal-img" style={{ "--reveal-delay": "0.24s" } as React.CSSProperties}><img src="/images/agency-card-growth-new.webp" alt="Illustration d'une séance de travail sur une identité visuelle" width={900} height={1200} loading="lazy" decoding="async" /><figcaption>{t.mosaic[2][0]}<br />{t.mosaic[2][1]}</figcaption></figure></div>
    </section>
  );
};

export default AboutVisual;
