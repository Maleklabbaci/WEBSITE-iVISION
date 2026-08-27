import React, { useState } from 'react';
import PortfolioGallery from './PortfolioGallery';
import Services from './Services';
import type { Language } from '../lib/translations';

type HomeBelowFoldProps = { language: Language; translations: any; onQuoteClick: () => void };

const localCopy = {
  fr: {
    smm: { label: 'L’OFFRE QUI SUIT', title: 'SOCIAL MEDIA\nMANAGER', body: 'Une présence sociale qui attire, rassure et transforme l’attention en demandes.', points: ['Stratégie éditoriale', 'Direction artistique', 'Publication & optimisation'], cta: 'Découvrir le SMM' },
    proof: { label: 'IMPACT', title: 'Des idées\nqui avancent.', body: 'Chaque décision créative est reliée à un objectif business lisible.', stats: [['200+', 'marques accompagnées'], ['4', 'univers digitaux créés'], ['98%', 'satisfaction client']] },
    faq: { label: 'QUESTIONS', title: 'Les réponses\nclaires.', body: 'Les informations essentielles avant de lancer votre prochaine étape.' },
    contact: { label: 'CONTACT', title: 'On parle de\nvotre prochaine étape.', body: 'Un projet, une idée ou simplement besoin d’un regard extérieur ? Écrivez-nous.' },
  },
  en: {
    smm: { label: 'THE NEXT OFFER', title: 'SOCIAL MEDIA\nMANAGER', body: 'A social presence that attracts, reassures and turns attention into demand.', points: ['Editorial strategy', 'Art direction', 'Publishing & optimisation'], cta: 'Discover SMM' },
    proof: { label: 'IMPACT', title: 'Ideas\nthat move.', body: 'Every creative decision connects to a clear business goal.', stats: [['200+', 'brands supported'], ['4', 'digital worlds built'], ['98%', 'client satisfaction']] },
    faq: { label: 'QUESTIONS', title: 'Clear\nanswers.', body: 'The essential information before your next move.' },
    contact: { label: 'CONTACT', title: 'Let’s talk about\nwhat comes next.', body: 'A project, an idea or simply need an outside perspective? Write to us.' },
  },
  ar: {
    smm: { label: 'العرض التالي', title: 'مدير وسائل\nالتواصل', body: 'حضور اجتماعي يجذب ويطمئن ويحوّل الانتباه إلى طلبات.', points: ['استراتيجية تحريرية', 'إخراج فني', 'نشر وتحسين'], cta: 'اكتشف الخدمة' },
    proof: { label: 'الأثر', title: 'أفكار\nتتقدم.', body: 'كل قرار إبداعي مرتبط بهدف تجاري واضح.', stats: [['200+', 'علامة تمت مرافقتها'], ['4', 'عوالم رقمية'], ['98%', 'رضا العملاء']] },
    faq: { label: 'أسئلة', title: 'إجابات\nواضحة.', body: 'المعلومات الأساسية قبل خطوتك القادمة.' },
    contact: { label: 'تواصل', title: 'لنتحدث عن\nخطوتك القادمة.', body: 'مشروع أو فكرة أو تحتاج إلى رأي خارجي؟ اكتب لنا.' },
  },
};

const HomeBelowFold: React.FC<HomeBelowFoldProps> = ({ language, translations, onQuoteClick }) => {
  const t = localCopy[language];
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const faqs = translations.faq?.faqs || [];
  const contact = translations.footer?.contact || {};
  const contactSection = translations.contactSection || {};
  const splitLines = (value: string) => value.split('\n').map((line) => <span key={line}>{line}</span>);

  return (
    <div className="iv-home-sections">
      <PortfolioGallery language={language} onQuoteClick={onQuoteClick} />

      <section id="smm" className="iv-smm">
        <div className="iv-section-topline"><span>{t.smm.label}</span></div>
        <div className="iv-smm-grid"><div className="iv-smm-heading"><h2>{splitLines(t.smm.title)}</h2><div className="iv-smm-orbit"><b>social<br />systems</b></div></div><div className="iv-smm-copy"><p>{t.smm.body}</p><ol>{t.smm.points.map((point) => <li key={point}><b>{point}</b></li>)}</ol><a href="#services" className="iv-arrow-link"><span>{t.smm.cta}</span><b aria-hidden="true">↗</b></a></div></div>
      </section>

      <Services translations={translations.services} onQuoteClick={onQuoteClick} />

      <section className="iv-proof"><div className="iv-section-topline"><span>{t.proof.label}</span></div><div className="iv-proof-grid"><h2>{splitLines(t.proof.title)}</h2><p>{t.proof.body}</p></div><div className="iv-proof-stats">{t.proof.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div></section>

      <section id="faq" className="iv-faq"><div className="iv-section-topline"><span>{t.faq.label}</span></div><div className="iv-faq-grid"><div><h2>{splitLines(t.faq.title)}</h2><p>{t.faq.body}</p></div><div className="iv-faq-list">{faqs.map((item: { question: string; answer: string }, index: number) => { const isOpen = openFaq === index; return <article key={item.question} className={isOpen ? 'is-open' : ''}><button type="button" aria-expanded={isOpen} onClick={() => setOpenFaq(isOpen ? null : index)}><span>{item.question}</span><b>{isOpen ? '−' : '+'}</b></button>{isOpen && <p>{item.answer}</p>}</article>; })}</div></div></section>

      <section id="contact" className="iv-contact"><div className="iv-section-topline"><span>{t.contact.label}</span></div><div className="iv-contact-heading"><h2>{splitLines(t.contact.title)}</h2><p>{contactSection.subtitle || t.contact.body}</p></div><div className="iv-contact-grid"><div><span>{contactSection.labels?.contact || 'Contact direct'}</span><a href={`mailto:${contact.email || ''}`}>{contact.email}</a><a href={`tel:${(contact.phone || '').replace(/\s/g, '')}`}>{contact.phone}</a></div><div><span>{contactSection.labels?.follow || 'Suivez-nous'}</span><div className="iv-contact-socials"><a href="https://www.instagram.com/ivision_agency/" target="_blank" rel="noopener noreferrer">Instagram</a><a href="https://web.facebook.com/agencyivision" target="_blank" rel="noopener noreferrer">Facebook</a><a href="https://www.tiktok.com/@ivisionagency1" target="_blank" rel="noopener noreferrer">TikTok</a></div></div></div></section>
    </div>
  );
};

export default HomeBelowFold;
