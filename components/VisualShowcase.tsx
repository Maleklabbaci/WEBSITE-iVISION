
import React, { useState, useEffect, useRef } from 'react';

interface VisualShowcaseProps {
  translations: {
    title: string;
    subtitle: string;
  }
}

const showcaseImages = [
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
    label: "Digital Strategy",
    span: "col-span-2 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070&auto=format&fit=crop",
    label: "Content Creation",
    span: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2062&auto=format&fit=crop",
    label: "Social Media Ads",
    span: "col-span-1 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    label: "Team Growth",
    span: "col-span-1 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    label: "E-commerce Performance",
    span: "col-span-2 row-span-1"
  }
];

const VisualShowcase: React.FC<VisualShowcaseProps> = ({ translations }) => {
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
      { root: null, rootMargin: '0px', threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-brand-dark overflow-hidden">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-5xl font-black text-brand-light mb-4">{translations.title}</h2>
          <p className="text-brand-gray text-lg max-w-2xl mx-auto">{translations.subtitle}</p>
          <div className="w-20 h-1 bg-brand-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-4 h-[600px] md:h-[800px]">
          {showcaseImages.map((img, index) => (
            <div 
              key={index} 
              className={`${img.span} relative group overflow-hidden rounded-2xl transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <img 
                src={img.url} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-brand-dark/40 group-hover:bg-brand-dark/10 transition-colors duration-500"></div>
              <div className="absolute bottom-6 left-6 z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                <span className="bg-brand-accent text-brand-dark px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {img.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
