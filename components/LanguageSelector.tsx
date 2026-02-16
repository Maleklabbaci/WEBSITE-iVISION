
import React from 'react';
import { Language } from '../lib/translations';

interface LanguageSelectorProps {
  onSelectLanguage: (language: Language) => void;
}

const FlagFR = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16">
    <clipPath id="circleFR">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
    <g clipPath="url(#circleFR)">
      <rect x="0" y="0" width="33.3" height="100" fill="#002395" />
      <rect x="33.3" y="0" width="33.4" height="100" fill="#FFFFFF" />
      <rect x="66.7" y="0" width="33.3" height="100" fill="#ED2939" />
    </g>
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16">
    <clipPath id="circleEN">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
    <g clipPath="url(#circleEN)">
      <rect width="100" height="100" fill="#012169" />
      <path d="M0 0 L100 100 M100 0 L0 100" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M0 0 L100 100 M100 0 L0 100" stroke="#C8102E" strokeWidth="6" />
      <path d="M50 0 V100 M0 50 H100" stroke="#FFFFFF" strokeWidth="16" />
      <path d="M50 0 V100 M0 50 H100" stroke="#C8102E" strokeWidth="10" />
    </g>
  </svg>
);

const FlagAR = () => (
  <svg viewBox="0 0 100 100" className="w-12 h-12 md:w-16 md:h-16">
    <clipPath id="circleAR">
      <circle cx="50" cy="50" r="50" />
    </clipPath>
    <g clipPath="url(#circleAR)">
      <rect width="100" height="100" fill="#007A3D" />
      <text x="50" y="68" fontSize="48" textAnchor="middle" fill="white" fontFamily="sans-serif" fontWeight="bold">ع</text>
    </g>
  </svg>
);

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ onSelectLanguage }) => {
  const languages: { id: Language; label: string; icon: React.ReactNode }[] = [
    { id: 'fr', label: 'FR', icon: <FlagFR /> },
    { id: 'en', label: 'EN', icon: <FlagEN /> },
    { id: 'ar', label: 'AR', icon: <FlagAR /> },
  ];

  return (
    <div className="relative animate-scale-in perspective-stage">
      {/* Glow Effect behind the popup */}
      <div className="absolute -inset-10 bg-brand-blue/30 blur-[100px] rounded-full opacity-50"></div>
      
      <div className="relative float-3d bg-brand-dark/80 border border-white/10 backdrop-blur-3xl rounded-[3.5rem] p-8 md:p-14 shadow-[0_60px_120px_rgba(0,0,0,0.9)] max-w-md w-full layer-3d">
        <div className="text-center mb-12">
          <img 
            src="https://i.ibb.co/rf42xscR/i-VISIONLOGO.png" 
            alt="iVISION" 
            className="h-16 w-auto object-contain mx-auto mb-3"
          />
          <div className="h-1.5 w-10 bg-brand-blue mx-auto rounded-full opacity-40"></div>
        </div>

        <div className="flex justify-around items-center gap-8">
          {languages.map((lang) => (
            <button
              key={lang.id}
              onClick={() => onSelectLanguage(lang.id)}
              className="group flex flex-col items-center gap-4 transition-all duration-300"
              style={{ transform: 'translateZ(20px)' }}
            >
              <div className="relative p-1 rounded-full border-2 border-transparent group-hover:border-brand-blue transition-all duration-500 scale-100 group-hover:scale-125 shadow-xl group-hover:shadow-brand-blue/30">
                {lang.icon}
                <div className="absolute inset-0 bg-brand-blue/0 group-hover:bg-brand-blue/10 rounded-full transition-all duration-500"></div>
              </div>
              <span className="text-[11px] font-black text-brand-gray group-hover:text-brand-blue transition-colors">
                {lang.label}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-14 text-center text-[11px] uppercase text-brand-gray/30 font-black">
          SÉLECTION DU TERMINAL
        </p>
      </div>
    </div>
  );
};

export default LanguageSelector;
