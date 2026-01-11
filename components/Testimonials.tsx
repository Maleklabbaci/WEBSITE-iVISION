
import React, { useState, useEffect, useRef, useMemo } from 'react';

interface TestimonialItem {
  quote: string;
  author: string;
  position: string;
  avatar: string;
  rating?: number;
}

interface TestimonialsProps {
  translations: {
    title: string;
    subtitle: string;
    items: TestimonialItem[];
    form: {
        title: string;
        nameLabel: string;
        brandLabel: string;
        ratingLabel: string;
        messageLabel: string;
        cta: string;
        success: string;
    }
  }
}

const StarDisplay: React.FC<{ rating: number }> = ({ rating }) => (
  <div className="flex gap-1 mb-4 justify-center">
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 ${s <= rating ? 'text-brand-accent' : 'text-brand-gray/20'}`} fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

const Testimonials: React.FC<TestimonialsProps> = ({ translations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<number | null>(null);

  // Load "Real" testimonials from storage
  const allTestimonials = useMemo(() => {
    const saved = localStorage.getItem('user_testimonials');
    const userItems: TestimonialItem[] = saved ? JSON.parse(saved).map((t: any) => ({
      quote: t.message,
      author: t.name,
      position: t.brand,
      avatar: t.avatar,
      rating: t.rating
    })) : [];
    
    return [...userItems, ...translations.items.map(t => ({ ...t, rating: 5 }))];
  }, [translations.items]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);
  
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  }

  useEffect(() => {
    if (isVisible && allTestimonials.length > 1) {
      resetTimeout();
      timeoutRef.current = window.setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % allTestimonials.length);
      }, 5000);
    }
    return () => {
      resetTimeout();
    };
  }, [currentIndex, isVisible, allTestimonials.length]);

  const handleNavClick = (index: number) => {
    setCurrentIndex(index);
  }

  const handleTitleClick = () => {
    window.location.hash = '/avis';
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-20 bg-transparent text-brand-light relative">
      <div className="container mx-auto px-6">
        <div 
          className={`text-center mb-16 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <h2 
            onClick={handleTitleClick}
            className="text-3xl md:text-4xl font-black cursor-pointer hover:text-brand-accent transition-all duration-300 group inline-flex flex-col items-center"
          >
            <span>{translations.title}</span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gray group-hover:text-brand-accent mt-2 opacity-0 group-hover:opacity-100 transition-all">Laissez votre avis</span>
          </h2>
          <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto font-medium">{translations.subtitle}</p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4"></div>
        </div>
        
        <div className={`relative max-w-4xl mx-auto bg-brand-dark/50 border border-brand-border p-8 md:p-12 rounded-lg text-center ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '200ms' }}>
           <div className="absolute top-4 left-4 text-brand-accent/10 z-0">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M9.983 3v7.391c0 2.908-2.352 5.261-5.261 5.261h-1.722v4.348h1.722c5.082 0 9.217-4.135 9.217-9.217v-7.391h-3.956zm14.017 0v7.391c0 2.908-2.352 5.261-5.261 5.261h-1.722v4.348h1.722c5.082 0 9.217-4.135 9.217-9.217v-7.391h-3.956z"/></svg>
            </div>
          <div className="relative grid">
            {allTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`[grid-area:1/1] transition-opacity duration-700 ease-in-out flex flex-col justify-center items-center ${currentIndex === index ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
              >
                <img src={testimonial.avatar} alt={testimonial.author} className="w-20 h-20 rounded-full mb-4 border-2 border-brand-accent object-cover bg-brand-dark" loading="lazy" />
                <StarDisplay rating={testimonial.rating || 5} />
                <blockquote className="text-lg md:text-xl italic text-brand-light mb-6 max-w-2xl relative z-10">
                  "{testimonial.quote}"
                </blockquote>
                <cite className="block not-italic">
                  <div className="font-bold text-brand-accent text-lg">{testimonial.author}</div>
                  <div className="text-brand-gray text-sm mt-1">{testimonial.position}</div>
                </cite>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center gap-2 mt-8">
            {allTestimonials.map((_, index) => (
              <button
                key={index}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => handleNavClick(index)}
                className={`h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index 
                    ? 'w-8 bg-brand-accent' 
                    : 'w-3 bg-brand-border hover:bg-brand-gray'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
