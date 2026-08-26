import React, { useEffect, useRef, useState } from 'react';

interface AboutVisualProps { language: 'fr' | 'en' | 'ar' }

const copy = {
  fr: { eyebrow: 'À PROPOS / 01', title: 'On transforme l’attention en croissance.', body: 'iVISION construit des systèmes digitaux clairs : une idée forte, une image juste et une acquisition qui se mesure.', principles: ['Une direction qui se remarque.', 'Un contenu qui donne confiance.', 'Une expérience qui convertit.'], link: 'Voir nos réalisations' },
  en: { eyebrow: 'ABOUT / 01', title: 'We turn attention into growth.', body: 'iVISION builds clear digital systems: a strong idea, a precise image and acquisition you can measure.', principles: ['A direction people notice.', 'Content that earns trust.', 'An experience that converts.'], link: 'See our work' },
  ar: { eyebrow: 'من نحن / ٠١', title: 'نحوّل الانتباه إلى نمو.', body: 'نبني أنظمة رقمية واضحة: فكرة قوية، صورة دقيقة واكتساب يمكن قياسه.', principles: ['اتجاه يلفت الانتباه.', 'محتوى يبني الثقة.', 'تجربة تحقق النتائج.'], link: 'اكتشف أعمالنا' },
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
      <div className="iv-section-topline"><span>{t.eyebrow}</span><span>01 / 07</span></div>
      <div className="iv-about-grid">
        <div className="iv-about-lead">
          <span className="iv-label">DIGITAL / CULTURE / GROWTH</span>
          <h2>{t.title}</h2>
          <p>{t.body}</p>
          <a className="iv-arrow-link" href="#etudes-de-cas"><span>{t.link}</span><b aria-hidden="true">↗</b></a>
        </div>
        <div className="iv-about-side">
          <div className="iv-about-orbit" aria-hidden="true"><span /><span /><span /><i /></div>
          <ol>{t.principles.map((principle, index) => <li key={principle}><span>0{index + 1}</span><p>{principle}</p></li>)}</ol>
        </div>
      </div>
    </section>
  );
};

export default AboutVisual;
