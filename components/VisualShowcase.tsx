
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
      className={`${img.span} relative group overflow-hidden rounded-[2rem] border border-white/5 bg-brand-dark/40 transition-all duration-[1200ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] outline-none focus-visible:ring-2 focus-visible:ring-brand-accent ${isSectionVisible ? 'opacity-100 scale-100 translate-y-0 rotate-0' : 'opacity-0 scale-95 translate-y-12 rotate-1'}`}
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
      
      {!isLoaded && shouldLoad && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-brand-accent/20 border-t-brand-accent rounded-full animate-spin"></div>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-60 group-hover:opacity-20 transition-opacity duration-700"></div>
      
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="w-12 h-12 bg-brand-accent/20 backdrop-blur-md rounded-full flex items-center justify-center border border-brand-accent/30 transform scale-50 group-hover:scale-100 transition-transform duration-500">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-brand-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
        </div>
      </div>

      <figcaption className="absolute bottom-6 left-6 right-6 z-10 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-4 py-2 rounded-xl inline-flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-pulse"></div>
          <span className="text-[9px] font-black text-white uppercase tracking-widest">
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
          observer.unobserve(entry.target);
        }
      },
      { root: null, rootMargin: '200px', threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-brand-dark overflow-hidden relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none opacity-10">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-brand-accent/30 blur-[150px] rounded-full"></div>
      </div>

      <div className="container relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl md:text-4xl font-black text-brand-light mb-4 uppercase tracking-tight">
            {translations.title}
          </h2>
          <p className="text-brand-gray text-lg max-w-xl mx-auto font-medium leading-relaxed">
            {translations.subtitle}
          </p>
          <div className="w-16 h-0.5 bg-brand-accent mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-3 gap-5 h-[500px] md:h-[700px]">
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
