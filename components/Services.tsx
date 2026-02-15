
import React, { useState, useEffect, useRef } from 'react';

const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconMegaphone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.89 12.056 22 7 22a4.001 4.001 0 01-1.564-.317z" /></svg>;
const IconShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

const icons = [<IconTrendingUp />, <IconCamera />, <IconMegaphone />, <IconShoppingCart />];

interface Service {
  title: string;
  description: string;
}

const ServiceCard: React.FC<{ service: Service; icon: React.ReactElement; index: number; isVisible: boolean }> = ({ service, icon, index, isVisible }) => (
    <div 
        className={`uni-card p-10 flex flex-col items-center text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
        style={{ transitionDelay: `${index * 150}ms` }}
    >
        <div className="text-brand-accent mb-8 p-4 bg-brand-accent/10 rounded-2xl">
            {icon}
        </div>
        <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase tracking-tighter">{service.title}</h3>
        <p className="text-brand-gray text-sm md:text-base leading-relaxed font-medium">{service.description}</p>
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
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) setIsVisible(true); }, { threshold: 0.1 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="services" ref={sectionRef} className="py-24 bg-brand-dark scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="uni-badge mb-6">Expert Solutions</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Nos Solutions <span className="text-brand-accent">Expert</span>
          </h2>
          <p className="text-brand-gray text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-80">{translations.subtitle}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {translations.items.map((item, index) => (
                <ServiceCard key={index} service={item} icon={icons[index]} index={index} isVisible={isVisible} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
