import React, { useEffect, useRef, useState } from 'react';

interface AboutVisualProps { language: 'fr' | 'en' | 'ar' }

const copy = {
  fr: {
    eyebrow: 'À PROPOS DE NOUS',
    lines: ['ATTIRER L’ATTENTION', 'FAÇONNER LA CULTURE', 'DOMINER LE FEED'],
    body: 'Nous transformons les idées en expériences digitales qui attirent les bons clients, donnent du relief aux marques et accélèrent la croissance.',
    link: 'Découvrir iVISION',
  },
  en: {
    eyebrow: 'ABOUT US',
    lines: ['OWN THE ATTENTION', 'SHAPE THE CULTURE', 'DOMINATE THE FEED'],
    body: 'We turn ideas into digital experiences that attract the right customers, sharpen brand presence and accelerate growth.',
    link: 'Read more',
  },
  ar: {
    eyebrow: 'من نحن',
    lines: ['نلفت الانتباه', 'نصنع الثقافة', 'نقود التأثير'],
    body: 'نحوّل الأفكار إلى تجارب رقمية تجذب العملاء المناسبين وتمنح العلامات حضوراً أقوى وتسرّع النمو.',
    link: 'اكتشف iVISION',
  },
};

const AboutVisual: React.FC<AboutVisualProps> = ({ language }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className={`pipam-about ${visible ? 'is-visible' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pipam-about-bg-ring" aria-hidden="true" />
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.eyebrow}<span className="pipam-section-number">01 / 07</span></div>
      <div className="pipam-about-title-stack" aria-label={t.lines.join(' ')}>
        {t.lines.map((line, index) => <div key={line} className="pipam-about-title-line"><span className={index === 1 ? 'is-outline' : ''}>{line}</span></div>)}
      </div>
      <div className="pipam-about-orbit" aria-hidden="true"><img src="/images/ivision-orbit.webp" alt="" loading="lazy" decoding="async" /></div>
      <div className="pipam-about-copy"><p>{t.body}</p><a href="#etudes-de-cas" className="pipam-text-link"><span>{t.link}</span><span aria-hidden="true">↗</span></a></div>
    </section>
  );
};

export default AboutVisual;
