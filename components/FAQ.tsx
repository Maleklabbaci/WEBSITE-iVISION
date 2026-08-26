import React, { useEffect, useRef, useState } from 'react';

interface QA { question: string; answer: string }
interface FAQProps { translations: { title: string; subtitle: string; faqs: QA[] } }

const FAQ: React.FC<FAQProps> = ({ translations }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setVisible(true); }, { threshold: .15 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  const words = translations.title.replace('.', '').split(' ');

  return (
    <section ref={ref} id="faq" className={`pipam-faq ${visible ? 'is-visible' : ''}`}>
      <div className="pipam-section-meta"><span className="pipam-pulse" />Support<span className="pipam-section-number">06 / 07</span></div>
      <div className="pipam-faq-heading"><h2>{words.map((word, index) => <span key={`${word}-${index}`} className={index === words.length - 1 ? 'is-gradient' : ''}>{word}</span>)}</h2><p>{translations.subtitle}</p></div>
      <div className="pipam-faq-list">
        {translations.faqs.map((qa, index) => {
          const open = openIndex === index;
          return <article key={qa.question} className={`pipam-faq-item ${open ? 'is-open' : ''}`}>
            <button type="button" aria-expanded={open} onClick={() => setOpenIndex(open ? null : index)}><span>{qa.question}</span><i aria-hidden="true">+</i></button>
            <div className="pipam-faq-answer" aria-hidden={!open}><p>{qa.answer}</p></div>
          </article>;
        })}
      </div>
    </section>
  );
};

export default FAQ;
