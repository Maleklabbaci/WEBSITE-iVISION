
import React, { useState, useEffect, useRef } from 'react';

interface VisualShowcaseProps {
  translations: {
    title: string;
    subtitle: string;
  }
}

interface ShowcaseImage {
  url: string;
  label: string;
  span: string;
}

const showcaseImages: ShowcaseImage[] = [
  {
    url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    label: "Digital Strategy",
    span: "col-span-2 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0",
    label: "Content Creation",
    span: "col-span-2 row-span-1"
  },
  {
    url: "https://images.unsplash.com/photo-1557838923-2985c318be48",
    label: "Social Media Ads",
    span: "col-span-2 row-span-2"
  },
  {
    url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644",
    label: "Team Growth",
    span: "col-span-2 row-span-1"
  }
];

const getUnsplashUrl = (baseUrl: string, width: number, quality: number = 80) => {
  return `${baseUrl}?q=${quality}&w=${width}&auto=format&fit=crop`;
};

const LazyImageItem: React.FC<{ 
  img: ShowcaseImage, 
  index: number, 
  isSectionVisible: boolean,
  isWide: boolean 
}> = ({ img, index, isSectionVisible, isWide }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (isSectionVisible) {
      setShouldLoad(true);
    }
  }, [isSectionVisible]);

  return (
    <figure 
      role="listitem"
      tabIndex={0}
      aria-label={img.label}
      className={`${img.span} relative group overflow-hidden rounded-[2.5rem] border border-white/5 bg-brand-dark/40 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] outline-none focus-visible:ring-4 focus-visible:ring-brand-accent focus-visible:ring-offset-4 focus-visible:ring-offset-brand-dark ${isSectionVisible ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-95 translate-y-12 rotate-1'}`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {shouldLoad && (
        <img 
          src={getUnsplashUrl(img.url, 800)}
          srcSet={`
            ${getUnsplashUrl(img.url, 400)} 400w,
            ${getUnsplashUrl(img.url, 800)} 800w,
            ${getUnsplashUrl(img.url, 1200)} 1200w
          `}
          sizes={isWide ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
          alt="" 
          width={isWide ? 800 : 400}
          height={img.span.includes('row-span-2') ? 800 : 400}
          onLoad={() => setIsLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-1000 group-hover:scale-110 group-focus:scale-110 ${isLoaded ? 'opacity-100 blur-0' : 'opacity-0 blur-xl'}`}
          loading="lazy"
        />
      )}
      
      {/* Loading Placeholder Spinner */}
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Overlay with modern gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-60 group-hover:opacity-30 group-focus:opacity-30 transition-opacity duration-700"></div>
      
      {/* Center icon on hover/focus */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-500">
        <div className="w-14 h-14 bg-brand-accent/20 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-accent/30 transform scale-50 group-hover:scale-100 group-focus:scale-100 transition-transform duration-500" aria-hidden="true">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      {/* Bottom Label (Glassmorphism) */}
      <figcaption className="absolute bottom-8 left-8 right-8 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 transition-all duration-500">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-5 py-3 rounded-2xl inline-flex items-center gap-3">
          <div className="w-2 h-2 bg-brand-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(56,189,248,0.8)]" aria-hidden="true"></div>
          <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">
            {img.label}
          </span>
        </div>
      </figcaption>
    </figure>
  );
};

const VisualShowcase: React.FC<VisualShowcaseProps> = ({ translations }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // We keep observing if we want to trigger load when it's even closer, 
          // but usually one-way visibility is better for section entry animations.
          observer.unobserve(entry.target);
        }
      },
      { 
        root: null, 
        rootMargin: '200px', // Start loading slightly before the user reaches the section
        threshold: 0.1 
      }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="py-24 bg-brand-dark overflow-hidden relative"
      aria-labelledby="visual-showcase-title"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-20" aria-hidden="true">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/30 blur-[150px] rounded-full"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 id="visual-showcase-title" className="text-4xl md:text-6xl font-black text-brand-light mb-6 tracking-tighter uppercase">
            {translations.title}
          </h2>
          <p className="text-brand-gray text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            {translations.subtitle}
          </p>
          <div className="w-16 h-1 bg-brand-accent mx-auto mt-8 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.5)]" aria-hidden="true"></div>
        </div>

        <div 
          className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-6 h-[650px] md:h-[900px]"
          role="list"
          aria-label="Projets de l'agence"
        >
          {showcaseImages.map((img, index) => (
            <LazyImageItem 
              key={index} 
              img={img} 
              index={index} 
              isSectionVisible={isVisible}
              isWide={img.span.includes('col-span-2')}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisualShowcase;
