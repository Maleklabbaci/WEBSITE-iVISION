import React, { useState, useEffect, useRef } from 'react';

// Icons for Why Us
const IconTargetWhyUs = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconChartBar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;

const whyUsIcons = [<IconTargetWhyUs />, <IconUsers />, <IconChartBar />, <IconTrophy />];

// Icons for Services
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IconMegaphone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.89 12.056 22 7 22a4.001 4.001 0 01-1.564-.317z" /></svg>;
const IconShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;

const serviceIcons = [<IconTrendingUp />, <IconCamera />, <IconMegaphone />, <IconShoppingCart />];

interface Point {
  title: string;
  description: string;
}
interface Service {
  title: string;
  description: string;
}

interface WhyAndServicesProps {
  whyUsTranslations: {
    title: string;
    subtitle: string;
    points: Point[];
  },
  servicesTranslations: {
    title: string;
    subtitle: string;
    items: Service[];
  }
}

const WhyAndServices: React.FC<WhyAndServicesProps> = ({ whyUsTranslations, servicesTranslations }) => {
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
    
    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  const servicesData = servicesTranslations.items.map((item, index) => ({
    ...item,
    icon: serviceIcons[index]
  }));

  return (
    <section id="services" ref={sectionRef} className="py-20 bg-transparent text-brand-light">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Why Choose Us */}
          <div className="lg:sticky top-24 h-fit">
            <div className={`text-center lg:text-left mb-12 lg:mb-0 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
              <h2 className="text-3xl md:text-4xl font-bold">{whyUsTranslations.title}</h2>
              <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto lg:mx-0">{whyUsTranslations.subtitle}</p>
              <div className="w-24 h-1 bg-brand-accent mx-auto lg:mx-0 mt-4"></div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 mt-12">
              {whyUsTranslations.points.map((point, index) => (
                <div 
                  key={index}
                  className={`group bg-brand-dark/50 border border-brand-border p-6 rounded-lg flex items-start gap-4 transition-all duration-300 hover:border-brand-accent hover:-translate-y-1 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="text-brand-accent mt-1 flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
                      {whyUsIcons[index]}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-light mb-1">{point.title}</h3>
                    <p className="text-brand-gray text-sm">{point.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Our Services */}
          <div>
            <div className={`text-center lg:text-left mb-12 lg:mt-0 mt-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`} style={{ animationDelay: '150ms' }}>
              <h2 className="text-3xl md:text-4xl font-bold">{servicesTranslations.title}</h2>
              <p className="text-lg text-brand-gray mt-2 max-w-2xl mx-auto lg:mx-0">{servicesTranslations.subtitle}</p>
              <div className="w-24 h-1 bg-brand-accent mx-auto lg:mx-0 mt-4"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {servicesData.map((service, index) => (
                    <div 
                        key={index}
                        className={`group bg-brand-dark/50 border border-brand-border p-8 rounded-lg transition-all duration-300 hover:border-brand-accent hover:-translate-y-2 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
                        style={{ animationDelay: `${(index + 2) * 150}ms` }}
                    >
                        <div className="text-brand-accent mb-4 transition-all duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]">
                            {service.icon}
                        </div>
                        <h3 className="text-xl font-bold text-brand-light mb-2">{service.title}</h3>
                        <p className="text-brand-gray">{service.description}</p>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyAndServices;
