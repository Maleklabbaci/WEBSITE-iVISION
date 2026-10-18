import React, { useState } from 'react';
import PortfolioGallery from './PortfolioGallery';
import Services from './Services';
import type { Language } from '../lib/translations';

type HomeBelowFoldProps = { language: Language; translations: any };

const localCopy = {
  fr: {
    smm: { label: 'L’OFFRE QUI SUIT', title: 'SOCIAL MEDIA\nMANAGER', orbit: ['social', 'systems'], body: 'Une présence sociale qui attire, rassure et transforme l’attention en demandes.', points: ['Stratégie éditoriale', 'Direction artistique', 'Publication & optimisation'], cta: 'Voir le portfolio social & vidéo', offer: 'Découvrir l’offre contenu', deliverables: [['Calendrier éditorial', 'Une ligne claire et un planning mensuel prêt à publier.'], ['Templates de marque', 'Des visuels réutilisables qui gardent votre feed cohérent.'], ['Community management', 'Réponses, modération et veille au quotidien.'], ['Rapport mensuel', 'Des résultats lisibles et les décisions du mois suivant.']] },
    proof: { label: 'DÉMARCHE', title: 'Une méthode\nà partager.', body: 'Découvrez les projets web présentés ici et la façon dont nous cadrons les objectifs, les livrables et le suivi de chaque nouveau projet.', stats: [['Clarifier', 'l’objectif et le public'], ['Créer', 'des contenus et des parcours utiles'], ['Mesurer', 'les signaux disponibles']] },
    faq: { label: 'QUESTIONS', title: 'Les réponses\nclaires.', body: 'Les informations essentielles avant de lancer votre prochaine étape.', guide: 'SEO ou Ads : lire le guide' },
    contact: { label: 'CONTACT', title: 'On parle de\nvotre prochaine étape.', body: 'Un projet, une idée ou simplement besoin d’un regard extérieur ? Écrivez-nous.' },
  },
  en: {
    smm: { label: 'THE NEXT OFFER', title: 'SOCIAL MEDIA\nMANAGER', orbit: ['social', 'systems'], body: 'A social presence that attracts, reassures and turns attention into demand.', points: ['Editorial strategy', 'Art direction', 'Publishing & optimisation'], cta: 'Social portfolio (in progress)', offer: 'Explore content services', deliverables: [['Editorial calendar', 'A clear line and a monthly plan ready to publish.'], ['Brand templates', 'Reusable visuals that keep your feed coherent.'], ['Community management', 'Daily replies, moderation and listening.'], ['Monthly report', 'Readable results and next month’s decisions.']] },
    proof: { label: 'APPROACH', title: 'A process\nyou can follow.', body: 'Explore the web projects featured here and how we define goals, deliverables and follow-up for each new project.', stats: [['Define', 'the goal and audience'], ['Create', 'useful content and journeys'], ['Measure', 'what can be observed']] },
    faq: { label: 'QUESTIONS', title: 'Clear\nanswers.', body: 'The essential information before your next move.', guide: 'SEO or Ads: read the guide' },
    contact: { label: 'CONTACT', title: 'Let’s talk about\nwhat comes next.', body: 'A project, an idea or simply need an outside perspective? Write to us.' },
  },
  ar: {
    smm: { label: 'العرض التالي', title: 'إدارة حسابات\nالتواصل', orbit: ['أنظمة', 'التواصل'], body: 'حضور اجتماعي يجذب ويطمئن ويحوّل الانتباه إلى طلبات.', points: ['استراتيجية تحريرية', 'إخراج فني', 'نشر وتحسين'], cta: 'تصفح معرض التواصل والفيديو', offer: 'اكتشف خدمة المحتوى', deliverables: [['تقويم تحريري', 'خط واضح وخطة شهرية جاهزة للنشر.'], ['قوالب العلامة', 'تصاميم قابلة لإعادة الاستخدام لتجانس الحساب.'], ['إدارة المجتمع', 'الردود والإشراف والمتابعة اليومية.'], ['تقرير شهري', 'نتائج واضحة وقرارات الشهر التالي.']] },
    proof: { label: 'المنهجية', title: 'طريقة\nواضحة.', body: 'استكشف مشاريع الويب المعروضة هنا وكيف نحدد الأهداف والمخرجات والمتابعة لكل مشروع جديد.', stats: [['نحدد', 'الهدف والجمهور'], ['ننتج', 'محتوى ومسارات مفيدة'], ['نقيس', 'ما تسمح به البيانات']] },
    faq: { label: 'أسئلة', title: 'إجابات\nواضحة.', body: 'المعلومات الأساسية قبل خطوتك القادمة.', guide: 'دليل SEO والإعلانات' },
    contact: { label: 'تواصل', title: 'لنتحدث عن\nخطوتك القادمة.', body: 'مشروع أو فكرة أو تحتاج إلى رأي خارجي؟ اكتب لنا.' },
  },
};

const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({ language, translations }) => {
  const t = localCopy[language];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = translations.faq?.faqs || [];
  const contact = translations.footer?.contact || {};
  const contactSection = translations.contactSection || {};
  const splitLines = (value: string) =>
    value.split('\n').map((line, idx) => (
      <span key={line}>
        {idx === 1 && language !== 'ar' ? <em>{line.toLowerCase()}</em> : line}
      </span>
    ));

  return (
    <div className="iv-home-sections">
      <PortfolioGallery language={language} />

      <section id="smm" className="iv-smm">
        <div className="iv-section-topline"><span>{t.smm.label}</span></div>
        <div className="iv-smm-grid"><div className="iv-smm-heading iv-reveal iv-reveal-left"><h2>{splitLines(t.smm.title)}</h2><div className="iv-smm-orbit"><span aria-hidden="true">✦</span><b>{t.smm.orbit[0]}<br />{t.smm.orbit[1]}</b></div></div><div className="iv-smm-copy iv-reveal iv-reveal-right"><p>{t.smm.body}</p><ol>{t.smm.points.map((point, index) => <li key={point}><span>0{index + 1}</span><b>{point}</b></li>)}</ol><div className="iv-smm-links"><a href="/portfolio-social-media-algerie.html" className="iv-arrow-link"><span>{t.smm.cta}</span><b aria-hidden="true">↗</b></a><a href="/creation-contenu-algerie.html" className="iv-arrow-link"><span>{t.smm.offer}</span><b aria-hidden="true">↗</b></a></div></div></div>
        <div className="iv-smm-cards iv-reveal-group">{t.smm.deliverables.map(([title, desc], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{desc}</p></article>)}</div>
        <div className="iv-smm-platforms iv-reveal" dir="ltr" aria-label="Plateformes à envisager selon le projet"><div className="iv-smm-platforms-track">{[0, 1].map((set) => <div key={set} className="iv-smm-platforms-set" aria-hidden={set === 1}><span>Instagram</span><i aria-hidden="true">✦</i><span>TikTok</span><i aria-hidden="true">✦</i><span>Facebook</span><i aria-hidden="true">✦</i><span>LinkedIn</span><i aria-hidden="true">✦</i><span>YouTube</span><i aria-hidden="true">✦</i><span>Snapchat</span><i aria-hidden="true">✦</i></div>)}</div></div>
      </section>

      <Services translations={translations.services} />

      <section className="iv-proof"><div className="iv-section-topline"><span>{t.proof.label}</span></div><div className="iv-proof-grid iv-reveal"><h2>{splitLines(t.proof.title)}</h2><p>{t.proof.body}</p></div><div className="iv-proof-stats iv-reveal-group">{t.proof.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

      <section id="faq" className="iv-faq"><div className="iv-section-topline"><span>{t.faq.label}</span></div><div className="iv-faq-grid iv-reveal"><div><h2>{splitLines(t.faq.title)}</h2><p>{t.faq.body}</p><a href="/choisir-seo-google-ads-meta-algerie.html" className="iv-arrow-link iv-faq-guide"><span>{t.faq.guide}</span><b aria-hidden="true">↗</b></a></div><div className="iv-faq-list">{faqs.map((item: { question: string; answer: string }, index: number) => { const isOpen = openFaq === index; return <article key={item.question} className={isOpen ? 'is-open' : ''}><button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span>{item.question}</span><b>{isOpen ? '−' : '+'}</b></button>{isOpen && <p>{item.answer}</p>}</article>; })}</div></div></section>

      <section id="contact" className="iv-contact"><div className="iv-section-topline"><span>{t.contact.label}</span></div><div className="iv-contact-heading iv-reveal"><h2>{splitLines(t.contact.title)}</h2><p>{contactSection.subtitle || t.contact.body}</p></div><div className="iv-contact-grid iv-reveal-group"><div><span>{contactSection.labels?.contact || 'Contact direct'}</span><a href={`mailto:${contact.email || ''}`} dir="ltr">{contact.email}</a><a href={`tel:${(contact.phone || '').replace(/\s/g, '')}`} dir="ltr">{contact.phone}</a></div><div><span>{contactSection.labels?.follow || 'Suivez-nous'}</span><div className="iv-contact-socials"><a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.tiktok.com/@ivisionagency1" target="_blank" rel="noopener noreferrer">TikTok</a></div></div></div></section>
    </div>
  );
};

export default HomeBelowFold;
