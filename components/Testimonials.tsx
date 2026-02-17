
import React, { useState, useEffect, useRef } from 'react';

interface TestimonialItem {
  quote: string;
  author: string;
  position: string;
  avatar: string;
}

interface TestimonialsProps {
  translations: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
  }
}

const Testimonials: React.FC<TestimonialsProps> = ({ translations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);
  
  const resetTimeout = () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }

  useEffect(() => {
    const items = translations?.items || [];
    if (isVisible && items.length > 0) {
      resetTimeout();
      timeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
      }, 6000);
    }
    return () => resetTimeout();
  }, [currentIndex, isVisible, translations?.items?.length]);

  const words = translations?.title?.split(' ') || [];
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="temoignages" ref={sectionRef} className="py-24 md:py-40 bg-white dark:bg-navy transition-colors duration-500 relative border-t border-navy/5 dark:border-white/5 overflow-hidden">
      <div className="container">
        {/* Harmonized Header */}
        <div className={`mb-16 md:mb-32 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="flex flex-col md:flex-row justify-between items-end gap-12">
            <div className="max-w-4xl">
              <div className="sketch-badge mb-8">Confiance</div>
              <h2 className="text-4xl md:text-[8rem] font-black text-navy dark:text-white tracking-tighter leading-[1] md:leading-[0.8] uppercase transition-colors duration-500">
                {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
                <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
              </h2>
            </div>
            <p className="text-base md:text-2xl text-brand-gray dark:text-brand-gray/80 max-w-sm font-medium leading-tight opacity-70 md:border-l-2 md:border-brand-blue/30 md:pl-8">
              {translations.subtitle}
            </p>
          </div>
        </div>
        
        <div className={`relative max-w-6xl mx-auto glass-card p-8 md:p-24 transition-all duration-[1200ms] ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <div className="absolute top-12 left-12 text-brand-blue/5 dark:text-brand-blue/10 pointer-events-none">
            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 2.908-2.352 5.261-5.261 5.261h-1.722v4.348h1.722c5.082 0 9.217-4.135 9.217-9.217v-7.391h-3.956zm14.017 0v7.391c0 2.908-2.352 5.261-5.261 5.261h-1.722v4.348h1.722c5.082 0 9.217-4.135 9.217-9.217v-7.391h-3.956z"/></svg>
          </div>
          
          <div className="relative grid min-h-[400px] md:min-h-[350px]">
            {translations.items.map((testimonial, index) => (
              <div
                key={index}
                className={`[grid-area:1/1] transition-all duration-1000 ease-in-out flex flex-col md:flex-row items-center gap-10 md:gap-16 ${currentIndex === index ? 'opacity-100 translate-x-0 blur-0' : 'opacity-0 translate-x-12 blur-lg pointer-events-none'}`}
              >
                <div className="shrink-0 relative">
                  <div className="absolute inset-0 bg-brand-blue/10 dark:bg-brand-blue/20 blur-3xl rounded-full"></div>
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.author} 
                    className="relative w-32 h-32 md:w-56 md:h-56 rounded-[30px] md:rounded-[40px] border-2 border-brand-blue/20 p-2 shadow-2xl object-cover" 
                  />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <blockquote className="text-xl md:text-4xl italic text-navy dark:text-white mb-8 md:mb-10 font-medium leading-tight tracking-tight transition-colors duration-500">
                    "{testimonial.quote}"
                  </blockquote>
                  <cite className="block not-italic">
                    <div className="font-black text-brand-blue text-xl md:text-2xl uppercase tracking-tighter mb-1">{testimonial.author}</div>
                    <div className="text-brand-gray/60 text-[10px] md:text-[11px] font-black uppercase">{testimonial.position}</div>
                  </cite>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center md:justify-start items-center gap-3 md:gap-4 mt-12 md:mt-16">
            {translations.items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${currentIndex === index ? 'w-12 md:w-20 bg-brand-blue' : 'w-3 md:w-4 bg-navy/10 dark:bg-white/10 hover:bg-navy/20 dark:hover:bg-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
