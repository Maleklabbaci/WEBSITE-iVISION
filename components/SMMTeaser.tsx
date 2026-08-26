import React from 'react';
import type { Language } from '../lib/translations';

const copy = {
  fr: {
    eyebrow: 'L’OFFRE QUI SUIT',
    title: ['SOCIAL', 'MEDIA', 'MANAGER'],
    body: 'Une présence sociale qui ne publie pas pour remplir un calendrier : elle attire, rassure et transforme l’attention en demandes.',
    points: ['Stratégie éditoriale', 'Création & direction artistique', 'Publication, suivi & optimisation'],
    cta: 'Découvrir le SMM'
  },
  en: {
    eyebrow: 'THE NEXT OFFER',
    title: ['SOCIAL', 'MEDIA', 'MANAGER'],
    body: 'A social presence built to attract, reassure and turn attention into qualified demand.',
    points: ['Editorial strategy', 'Creative direction & content', 'Publishing, reporting & optimisation'],
    cta: 'Discover SMM'
  },
  ar: {
    eyebrow: 'الخدمة التالية',
    title: ['إدارة', 'وسائل', 'التواصل'],
    body: 'حضور اجتماعي يجذب الانتباه ويطمئن العملاء ويحوّل التفاعل إلى طلبات حقيقية.',
    points: ['استراتيجية المحتوى', 'الإبداع والإخراج الفني', 'النشر والمتابعة والتحسين'],
    cta: 'اكتشف الخدمة'
  }
};

const SMMTeaser: React.FC<{ language: Language }> = ({ language }) => {
  const t = copy[language];
  return (
    <section id="smm" className="pipam-smm-scene">
      <div className="pipam-section-meta"><span className="pipam-pulse" />{t.eyebrow}<span className="pipam-section-number">03 / 07</span></div>
      <div className="pipam-smm-layout">
        <h2>{t.title.map((line, index) => <span key={line} className={index === 1 ? 'is-accent' : ''}>{line}</span>)}</h2>
        <div className="pipam-smm-copy"><p>{t.body}</p><div className="pipam-smm-points">{t.points.map((point, index) => <span key={point}><b>0{index + 1}</b>{point}</span>)}</div><a className="pipam-smm-cta" href="#services"><span>{t.cta}</span><span aria-hidden="true">↗</span></a></div>
      </div>
    </section>
  );
};

export default SMMTeaser;
