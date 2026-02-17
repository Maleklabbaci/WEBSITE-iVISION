
import React, { useState, useEffect } from 'react';
import { translations, Language } from '../lib/translations';

interface GuideOverlayProps {
  onClose: () => void;
  language: Language;
}

const GuideOverlay: React.FC<GuideOverlayProps> = ({ onClose, language }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const isRtl = language === 'ar';
  const stepsCount = 4;
  
  const t = translations[language].guide;
  const stepData = t.steps[currentStep - 1];

  const updateSpotlight = () => {
    const w = window.innerWidth;
    const isMobile = w < 1024;
    
    let targetId = '';
    switch(currentStep) {
      case 1: targetId = 'guide-theme-toggle'; break;
      case 2: targetId = isMobile ? 'guide-mobile-menu' : 'guide-contact-btn'; break;
      case 3: targetId = 'guide-whatsapp'; break;
      case 4: targetId = 'guide-scroll'; break;
    }

    const element = document.getElementById(targetId);
    if (element) {
      setTargetRect(element.getBoundingClientRect());
    }
  };

  useEffect(() => {
    const timer = setTimeout(updateSpotlight, 150);
    window.addEventListener('resize', updateSpotlight);
    document.body.style.overflow = 'hidden';
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', updateSpotlight);
    };
  }, [currentStep, language]);

  const nextStep = () => {
    if (currentStep < stepsCount) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  if (!targetRect) return null;

  const cx = targetRect.left + targetRect.width / 2;
  const cy = targetRect.top + targetRect.height / 2;
  const r = Math.max(targetRect.width, targetRect.height) / 2 + 15;

  const cardWidth = 320;
  let cardX = cx - cardWidth / 2;
  let cardY = cy + r + 24;

  if (cardX < 20) cardX = 20;
  if (cardX + cardWidth > window.innerWidth - 20) cardX = window.innerWidth - cardWidth - 20;

  if (cardY + 200 > window.innerHeight) {
    cardY = cy - r - 200;
  }

  return (
    <div className="fixed inset-0 z-[300] pointer-events-none overflow-hidden">
      <svg className="absolute inset-0 w-full h-full pointer-events-auto">
        <defs>
          <mask id="guide-mask">
            <rect width="100%" height="100%" fill="white" />
            <circle 
              cx={cx} 
              cy={cy} 
              r={r} 
              fill="black" 
              className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
            />
          </mask>
        </defs>
        <rect 
          width="100%" 
          height="100%" 
          fill="rgba(5, 10, 31, 0.9)" 
          mask="url(#guide-mask)" 
          className="transition-all duration-500" 
          onClick={nextStep}
        />
      </svg>

      <div 
        className="absolute border-2 border-brand-blue rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-[0_0_40px_rgba(0,51,255,0.6)] animate-pulse"
        style={{
          left: cx - r,
          top: cy - r,
          width: r * 2,
          height: r * 2,
        }}
      />

      <div 
        className="absolute pointer-events-auto transition-all duration-500"
        style={{ 
          top: cardY, 
          left: cardX,
          width: cardWidth
        }}
      >
        <div className="bg-white p-6 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-b-4 border-brand-blue animate-fade-in-up">
          <div className="flex items-center gap-3 mb-3">
             <div className="w-8 h-8 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                <span className="text-xs font-black">{currentStep}</span>
             </div>
             <h4 className="text-brand-blue text-[10px] font-black uppercase tracking-widest">
               {stepData.title}
             </h4>
          </div>
          <p className="text-navy text-sm font-bold leading-relaxed mb-6">
            {stepData.desc}
          </p>
          <div className={`flex items-center justify-between ${isRtl ? 'flex-row-reverse' : 'flex-row'}`}>
             <button 
               onClick={onClose}
               className="text-[10px] font-black text-navy/30 hover:text-brand-blue uppercase tracking-widest transition-colors px-2 py-1"
             >
               {t.skip}
             </button>
             <button 
               onClick={nextStep}
               className="text-[10px] font-black text-brand-blue uppercase tracking-widest hover:translate-x-1 transition-transform flex items-center gap-2"
             >
               {currentStep < stepsCount ? t.next : t.finish}
               <svg className={`w-3 h-3 ${isRtl ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
               </svg>
             </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 pointer-events-auto">
        {[...Array(stepsCount)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 rounded-full transition-all duration-500 ${currentStep === (i+1) ? 'w-10 bg-brand-blue' : 'w-2 bg-white/20'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default GuideOverlay;
