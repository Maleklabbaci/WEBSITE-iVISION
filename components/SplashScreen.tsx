
import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-dark flex flex-col items-center justify-center z-[100] animate-splash-fade-out">
      <div className="relative animate-scale-in text-center">
        <img 
          src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
          alt="iVISION" 
          className="h-16 md:h-20 w-auto object-contain mb-8"
        />
        <div className="flex gap-2 justify-center">
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0s]"></div>
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.2s]"></div>
          <div className="w-1.5 h-1.5 bg-brand-accent rounded-full animate-bounce [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
