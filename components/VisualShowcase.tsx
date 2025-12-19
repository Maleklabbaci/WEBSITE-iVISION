
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
    span: "col-span-2 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=2062&auto=format&fit=crop",
    label: "Social Media Ads",
    span: "col-span-2 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop",
    label: "Team Growth",
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
    <section ref={sectionRef} className="py-24 bg-brand-dark overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/30 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl md:text-6xl font-black text-brand-light mb-6 tracking-tighter uppercase">{translations.title}</h2>
          <p className="text-brand-gray text-xl max-w-2xl mx-auto font-medium leading-relaxed">{translations.subtitle}</p>
          <div className="w-16 h-1 bg-brand-accent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6 h-[650px] md:h-[900px]">
          {showcaseImages.map((img, index) => (
            <div 
              key={index} 
              className={`${img.span} relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-dark/40 transition-all duration-1000 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <img 
                src={img.url} 
                alt={img.label} 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay with modern gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700"></div>
              
              {/* Center icon on hover */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="w-14 h-14 bg-brand-accent/20 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-accent/30 transform scale-50 group-hover:scale-100 transition-transform duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </div>
              </div>

              {/* Bottom Label (Glassmorphism) */}
              <div className="absolute bottom-8 left-8 right-8 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl inline-flex items-center gap-3">
                  <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]"></div>
                  <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
                    {img.label}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
