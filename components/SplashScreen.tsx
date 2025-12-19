import React from 'react';

const SplashScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-brand-dark flex items-center justify-center z-50 animate-splash-fade-out">
      <h1 className="text-5xl md:text-7xl font-bold text-brand-light tracking-tight flex items-center">
        <span className="animate-slide-in-left">i</span>
        <span className="text-brand-accent animate-pulse-glow">V</span>
        <span className="animate-slide-in-right">ISION</span>
      </h1>
    </div>
  );
};

export default SplashScreen;