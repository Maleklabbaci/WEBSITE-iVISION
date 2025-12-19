import React, { useState, useEffect, useRef } from 'react';

// Icons
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconMegaphone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.89 12.056 22 7 22a4.001 4.001 0 01-1.564-.317z" /></svg>;
const IconShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

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
        className={`group bg-brand-dark/50 border border-brand-border p-8 rounded-lg transition-all duration-300 hover:border-brand-accent hover:-translate-y-2 hover:bg-brand-dark/60 hover:shadow-lg hover:shadow-brand-accent/10 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
        style={{ animationDelay: `${index * 150}ms` }}
    >
        <div className="text-brand-accent mb-4 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
            {service.icon}
        </div>
        <h3 className="text-xl font-bold text-brand-light mb-2">{service.title}</h3>
        <p className="text-brand-gray">{service.description}</p>
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
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-transparent text-brand-light">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">{translations.title}</h2>
          <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto">{translations.subtitle}</p>
          <div className="w-24 h-1 bg-brand-accent mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {servicesData.map((service, index) => (
                <ServiceCard key={index} service={service} isVisible={isVisible} index={index} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;