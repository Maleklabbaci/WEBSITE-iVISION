
import React, { useEffect } from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  details: string;
  icon: React.ReactNode;
  translations?: {
    cta: string;
    close: string;
  };
  onCtaClick: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  details, 
  icon, 
  translations,
  onCtaClick 
}) => {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  if (!isOpen) return null;

  const ctaLabel = translations?.cta || "Commencer";
  const closeLabel = translations?.close || "Fermer";

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="relative bg-[#0D0D0D] border border-white/10 p-8 md:p-12 max-w-2xl w-full rounded-2xl shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col items-start">
          <div className="text-brand-accent mb-8 w-12 h-12 bg-brand-accent/10 rounded-lg flex items-center justify-center">
            {icon || null}
          </div>
          
          <h2 className="text-3xl font-black text-white mb-4 tracking-tight">
            {title || ''}
          </h2>
          
          <p className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-8">
            {description || ''}
          </p>

          <p className="text-brand-gray text-lg leading-relaxed mb-12">
            {details || ''}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={() => { onClose(); onCtaClick(); }}
              className="tech-button flex-1"
            >
              {ctaLabel}
            </button>
            <button 
              onClick={onClose}
              className="flex-1 bg-white/5 border border-white/10 text-white font-semibold py-3 rounded-lg hover:bg-white/10 transition-all"
            >
              {closeLabel}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoModal;
