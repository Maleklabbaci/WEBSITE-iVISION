import React, { useEffect, useRef, useState } from 'react';

interface ImpactStripProps { language: 'fr' | 'en' | 'ar' }

const copy = {
  fr: { eyebrow: 'L’IMPACT EN CHIFFRES', title: 'DES RÉSULTATS', accent: 'QUI SE VOIENT.', body: 'Des décisions créatives reliées à des indicateurs business lisibles.', stats: [['200+', 'marques accompagnées'], ['5', 'projets actifs'], ['98%', 'satisfaction client']] },
  en: { eyebrow: 'IMPACT IN NUMBERS', title: 'RESULTS', accent: 'YOU CAN SEE.', body: 'Creative decisions connected to business metrics you can actually read.', stats: [['200+', 'brands supported'], ['5', 'active projects'], ['98%', 'client satisfaction']] },
  ar: { eyebrow: 'الأثر بالأرقام', title: 'نتائج', accent: 'تظهر بوضوح.', body: 'قرارات إبداعية مرتبطة بمؤشرات أعمال واضحة.', stats: [['200+', 'علامة ندعمها'], ['5', 'مشاريع نشطة'], ['98%', 'رضا العملاء']] },
};

const ImpactStrip: React.FC<ImpactStripProps> = ({ language }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: 0.18 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} className={`pipam-impact ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-impact-image" aria-hidden="true"><img src="/images/ivision-hero-editorial.webp" alt="" loading="lazy" decoding="async" /><div /></div>
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.eyebrow}<span className="pipam-section-number">05 / 07</span></div>
      <div className="pipam-impact-copy"><h2><span>{t.title}</span><span className="is-gradient">{t.accent}</span></h2><p>{t.body}</p></div>
      <div className="pipam-impact-stats">{t.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>
    </section>
  );
};

export default ImpactStrip;
