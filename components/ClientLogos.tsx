
import React, { useRef, useEffect, useState } from 'react';
import InfoModal from './InfoModal';

// Icons
const IconTarget = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const IconUsers = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.653-.124-1.282-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.653.124-1.282.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconChartBar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const IconTrophy = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;

const icons = [<IconTarget />, <IconUsers />, <IconChartBar />, <IconTrophy />];

interface Point {
  title: string;
  description: string;
  details: string;
}

interface ClientLogosProps {
  translations: {
    title: string;
    subtitle: string;
    points: Point[];
    modal: any;
  },
  onQuoteClick: () => void;
}

const ClientLogos: React.FC<ClientLogosProps> = ({ translations, onQuoteClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<number | null>(null);

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
    <section ref={sectionRef} className="py-24 bg-brand-dark scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className={`text-center mb-20 transition-all duration-1000 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="uni-badge mb-6">Expertise Agency</div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-6">
            Pourquoi <span className="text-brand-accent">iVISION ?</span>
          </h2>
          <p className="text-brand-gray text-lg md:text-xl max-w-2xl mx-auto font-medium opacity-80">
            {translations.subtitle}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {translations.points.map((point, index) => (
            <div 
              key={index}
              onClick={() => setSelectedPoint(index)}
              className={`uni-card p-10 flex flex-col items-center text-center cursor-pointer group transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-brand-accent mb-8 p-4 bg-brand-accent/10 rounded-2xl group-hover:bg-brand-accent/20 transition-colors">
                  {icons[index]}
              </div>
              <h3 className="text-xl md:text-2xl font-black text-white mb-4 uppercase tracking-tighter group-hover:text-brand-accent transition-colors">{point.title}</h3>
              <p className="text-brand-gray text-sm md:text-base leading-relaxed font-medium opacity-80">{point.description}</p>
              <div className="mt-8 text-brand-accent text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">Détails</div>
            </div>
          ))}
        </div>
      </div>

      <InfoModal 
        isOpen={selectedPoint !== null} 
        onClose={() => setSelectedPoint(null)}
        title={selectedPoint !== null ? translations.points[selectedPoint].title : ''}
        description={selectedPoint !== null ? translations.points[selectedPoint].description : ''}
        details={selectedPoint !== null ? translations.points[selectedPoint].details : ''}
        icon={selectedPoint !== null ? icons[selectedPoint] : null}
        translations={translations.modal}
        onCtaClick={onQuoteClick}
      />
    </section>
  );
};

export default ClientLogos;
