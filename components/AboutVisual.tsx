import React, { useEffect, useRef, useState } from 'react';

interface AboutVisualProps {
  language: 'fr' | 'en' | 'ar';
}

const copy = {
  fr: {
    eyebrow: 'À PROPOS DE NOUS',
    lines: ['CAPTER', 'L’ATTENTION', 'CRÉER', 'L’IMPACT'],
    body: 'Nous transformons les idées en expériences digitales qui attirent les bons clients, donnent du relief aux marques et accélèrent la croissance.',
    link: 'Découvrir iVISION',
    mark: 'iV / 01',
  },
  en: {
    eyebrow: 'ABOUT US',
    lines: ['OWN', 'THE', 'ATTENTION', 'CREATE IMPACT'],
    body: 'We turn ideas into digital experiences that attract the right customers, give brands a sharper point of view and accelerate growth.',
    link: 'Discover iVISION',
    mark: 'iV / 01',
  },
  ar: {
    eyebrow: 'من نحن',
    lines: ['نلتقط', 'الانتباه', 'نصنع', 'التأثير'],
    body: 'نحوّل الأفكار إلى تجارب رقمية تجذب العملاء المناسبين وتمنح العلامات حضوراً أقوى وتسرّع النمو.',
    link: 'اكتشف iVISION',
    mark: 'iV / 01',
  },
};

const AboutVisual: React.FC<AboutVisualProps> = ({ language }) => {
  const t = copy[language];
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setVisible(true);
    }, { threshold: 0.18 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={ref} id="about" className={`pipam-about ${visible ? 'is-visible' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.eyebrow}<span className="pipam-section-number">{t.mark}</span></div>
      <div className="pipam-about-heading" aria-label={t.lines.join(' ')}>
        {t.lines.map((line, index) => <span key={line} className={index % 2 === 1 ? 'is-outline' : ''}>{line}</span>)}
      </div>
      <div className="pipam-about-orbit" aria-hidden="true">
        <img src="/images/ivision-orbit.webp" alt="" loading="lazy" decoding="async" />
      </div>
      <div className="pipam-about-copy">
        <p>{t.body}</p>
        <a href="#etudes-de-cas" className="pipam-text-link"><span>{t.link}</span><span aria-hidden="true">↗</span></a>
      </div>
    </section>
  );
};

export default AboutVisual;
