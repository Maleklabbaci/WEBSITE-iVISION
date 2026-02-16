import React, { useEffect, useState } from 'react';

interface HeroProps {
  translations: { badge: string; title: string; subtitle: string; cta: string; secondaryCta: string; }
  onQuoteClick: () => void;
}

const BackgroundFlow: React.FC = () => (
  <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox="0 0 1440 800" fill="none">
    <path 
      d="M-100 300C200 150 500 450 800 350C1100 250 1400 550 1600 450" 
      stroke="rgba(0, 51, 255, 0.15)" 
      strokeWidth="1.5" 
      className="dotted-path"
    />
  </svg>
);

const Hero: React.FC<HeroProps> = ({ translations, onQuoteClick }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsVisible(true);
    const handleMove = (e: MouseEvent) => {
      setTilt({
        x: (e.clientX / window.innerWidth - 0.5) * 6,
        y: (e.clientY / window.innerHeight - 0.5) * 6
      });
    };
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMove);
    }
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  const words = translations.title.split(' ');
  const splitIndex = Math.ceil(words.length / 2);

  return (
    <section id="accueil" className="relative min-h-[90vh] md:min-h-screen pt-32 pb-16 md:pt-40 md:pb-20 bg-navy overflow-hidden flex items-center perspective-stage">
      <BackgroundFlow />
      
      <div className="absolute top-0 right-0 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-brand-blue/10 blur-[100px] md:blur-[180px] rounded-full -z-10"></div>
      
      <div className="container relative z-10 layer-3d" style={{ transform: window.innerWidth > 768 ? `rotateX(${-tilt.y}deg) rotateY(${tilt.x}deg)` : 'none' }}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-20 items-center">
          
          <div className={`lg:col-span-7 transition-all duration-[1s] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-6 md:mb-8">
              <div className="sketch-badge">
                {translations.badge}
              </div>
            </div>

            <h1 className="text-[clamp(2.5rem,8vw,8rem)] font-black mb-6 md:mb-8 leading-[0.9] tracking-tighter text-white uppercase">
              {words.slice(0, splitIndex).join(' ')} <br className="hidden md:block" />
              <span className="text-brand-blue">{words.slice(splitIndex).join(' ')}</span>
            </h1>

            <p className="text-base md:text-2xl text-brand-gray max-w-xl mb-10 md:mb-12 font-medium leading-snug opacity-70">
              {translations.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-10">
              <button 
                onClick={onQuoteClick}
                className="btn-ivision group w-full sm:w-auto px-10 py-5"
              >
                <span>{translations.cta}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
              
              <div className="flex items-center gap-4">
                <div className="flex -space-x-2 md:-space-x-3">
                  {[1, 2, 3].map(i => (
                    <img key={i} src={`https://i.pravatar.cc/100?u=${i+20}`} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-navy object-cover" alt="User" />
                  ))}
                </div>
                <div>
                  <div className="text-white font-black text-xl md:text-2xl leading-none">200+</div>
                  <div className="text-[9px] md:text-[10px] text-brand-gray uppercase font-black tracking-widest mt-1">Clients Certifiés</div>
                </div>
              </div>
            </div>
          </div>

          <div className={`lg:col-span-5 relative transition-all duration-[1s] delay-300 ease-out hidden lg:block ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="grid grid-cols-2 gap-4 layer-3d">
              <div className="space-y-4 float-3d" style={{ animationDelay: '-1s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=600" 
                  className="w-full h-64 object-cover rounded-[40px] rounded-tr-[10px] shadow-2xl border border-white/5" 
                  alt="Team" 
                />
                <div className="glass-card p-8 flex flex-col items-center justify-center text-center">
                  <div className="text-4xl font-black text-brand-blue">98%</div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-brand-gray">Satisfaction</div>
                </div>
              </div>
              <div className="pt-12 float-3d" style={{ animationDelay: '-3s' }}>
                <img 
                  src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600" 
                  className="w-full h-80 object-cover rounded-[10px] rounded-br-[40px] shadow-2xl border-2 border-brand-blue/20" 
                  alt="Results" 
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;