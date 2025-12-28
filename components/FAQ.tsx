
import React, { useState, useEffect, useRef } from 'react';

interface QA {
  question: string;
  answer: string;
}

interface FAQProps {
  translations: {
    title: string;
    subtitle: string;
    faqs: QA[];
  };
}

const FAQItem: React.FC<{ qa: QA; isOpen: boolean; onClick: () => void; isVisible: boolean; index: number }> = ({ qa, isOpen, onClick, isVisible, index }) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`border-b border-brand-border transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-6 text-left group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-semibold text-brand-light group-hover:text-brand-accent transition-colors duration-300">{qa.question}</span>
        <span className={`transform transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isOpen ? 'rotate-45' : 'rotate-0'}`}>
           <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 transition-colors duration-300 ${isOpen ? 'text-brand-accent' : 'text-brand-gray group-hover:text-brand-accent'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
           </svg>
        </span>
      </button>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-500 ease-in-out"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
      >
        <div className={`pb-6 text-brand-gray leading-relaxed transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
          <p>{qa.answer}</p>
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC<FAQProps> = ({ translations }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.15 }
    );
    
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" ref={sectionRef} className="py-20 bg-transparent">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-12 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-light">{translations.title}</h2>
          <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto">{translations.subtitle}</p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4 rounded-full"></div>
        </div>

        <div className="max-w-3xl mx-auto">
          {translations.faqs.map((qa, index) => (
            <FAQItem
              key={index}
              qa={qa}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
              isVisible={isVisible}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
