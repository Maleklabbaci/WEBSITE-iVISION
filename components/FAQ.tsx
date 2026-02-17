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
      className={`glass-card p-8 md:p-12 mb-6 cursor-pointer transition-all duration-[1s] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
      style={{ transitionDelay: `${index * 100}ms` }}
      onClick={onClick}
    >
      <div className="flex justify-between items-center text-left">
        <span className={`text-xl md:text-2xl font-black uppercase tracking-tighter transition-colors duration-500 ${isOpen ? 'text-brand-blue' : 'text-navy dark:text-white'}`}>
          {qa.question}
        </span>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center border border-navy/10 dark:border-white/10 transition-all duration-500 ${isOpen ? 'bg-brand-blue border-brand-blue rotate-45' : 'bg-navy/5 dark:bg-white/5'}`}>
           <svg className={`w-6 h-6 transition-colors ${isOpen ? 'text-white' : 'text-navy dark:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
        </div>
      </div>
      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-700 ease-[cubic-bezier(0.16, 1, 0.3, 1)]"
        style={{ maxHeight: isOpen ? `${contentRef.current?.scrollHeight}px` : '0px' }}
      >
        <div className="pt-8 text-brand-gray dark:text-brand-gray/80 text-lg font-medium leading-relaxed opacity-80 max-w-4xl border-t border-navy/5 dark:border-white/5 mt-8">
          {qa.answer}
        </div>
      </div>
    </div>
  );
};


const FAQ: React.FC<FAQProps> = ({ translations }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const words = translations?.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="faq" ref={sectionRef} className="py-40 bg-white dark:bg-navy relative border-t border-navy/5 dark:border-white/5 overflow-hidden transition-colors duration-500">
      <div className="container">
        {/* Harmonized Header */}
        <div className={`mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl">
              <div className="sketch-badge mb-8">Support</div>
              <h2 className="text-5xl md:text-[8rem] font-black text-navy dark:text-white tracking-tighter leading-[0.8] uppercase transition-colors duration-500">
                {words.slice(0, splitIndex).join(' ')} <br />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-brand-gray dark:text-brand-gray/80 max-w-sm font-medium leading-tight opacity-70 border-l-2 border-brand-blue/30 pl-8">
              {translations?.subtitle}
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto perspective-stage">
          {translations?.faqs?.map((qa, index) => (
            <FAQItem
              key={index}
              qa={qa}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
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