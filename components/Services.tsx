
import React, { useState, useEffect, useRef } from 'react';

// Icons
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconMegaphone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.89 12.056 22 7 22a4.001 4.001 0 01-1.564-.317z" /></svg>;
const IconShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

const icons = [
  <IconTrendingUp />,
  <IconCamera />,
  <IconMegaphone />,
  <IconShoppingCart />,
];

interface Service {
  title: string;
  description: string;
}

interface ServiceWithIcon extends Service {
    icon: React.ReactElement;
}

interface ServiceCardProps {
    service: ServiceWithIcon;
    isVisible: boolean;
    index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, isVisible, index }) => (
    <div 
        className={`group bg-brand-dark/50 border border-brand-border p-6 rounded-2xl transition-all duration-[1000ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:border-brand-accent/50 hover:-translate-y-1.5 hover:bg-brand-dark/60 hover:shadow-xl hover:shadow-brand-accent/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
        style={{ transitionDelay: `${index * 120}ms` }}
    >
        <div className="text-brand-accent mb-4 transition-all duration-300 group-hover:scale-105 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
            {service.icon}
        </div>
        <h3 className="text-lg font-bold text-brand-light mb-2">{service.title}</h3>
        <p className="text-sm text-brand-gray leading-relaxed">{service.description}</p>
    </div>
);


interface ServicesProps {
  translations: {
    title: string;
    subtitle: string;
    items: Service[];
  }
}

const Services: React.FC<ServicesProps> = ({ translations }) => {
  const servicesData = translations.items.map((item, index) => ({
    ...item,
    icon: icons[index]
  }));
  
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

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-transparent text-brand-light scroll-mt-24">
      <div className="container">
        <div className={`text-center mb-16 transition-all duration-1000 ease-[cubic-bezier(0.2,0.8,0.2,1)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight">{translations.title}</h2>
          <p className="text-base text-brand-gray mt-3 max-w-xl mx-auto font-medium">{translations.subtitle}</p>
          <div className="w-16 h-0.5 bg-brand-accent mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.map((service, index) => (
                <ServiceCard key={index} service={service} isVisible={isVisible} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
