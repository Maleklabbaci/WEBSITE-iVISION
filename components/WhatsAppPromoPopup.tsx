
import React, { useState, useEffect } from 'react';

interface WhatsAppPromoPopupProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  message: string;
  btnLabel: string;
  phoneNumber: string;
  whatsappMessage: string;
}

const WhatsAppPromoPopup: React.FC<WhatsAppPromoPopupProps> = ({ 
  isVisible, 
  onClose, 
  title,
  message, 
  btnLabel, 
  phoneNumber, 
  whatsappMessage 
}) => {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      setIsAnimatingOut(false);
    } else if (shouldRender) {
      setIsAnimatingOut(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsAnimatingOut(false);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isVisible, shouldRender]);

  if (!shouldRender) return null;

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleClose = () => {
    setIsAnimatingOut(true);
    setTimeout(onClose, 500);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-6 bg-brand-dark/60 backdrop-blur-xl transition-opacity duration-500 ${isAnimatingOut ? 'opacity-0' : 'opacity-100'}`}>
      <div 
        className={`relative max-w-md w-full origin-bottom-left ${isAnimatingOut ? 'animate-pop-to-whatsapp' : 'animate-pop-from-whatsapp'}`}
        style={{
          transformOrigin: '40px calc(100% - 40px)'
        }}
      >
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-whatsapp-green/20 blur-3xl rounded-full"></div>
        
        <div className="relative bg-brand-dark/95 border border-whatsapp-green/40 backdrop-blur-2xl rounded-[2.5rem] p-10 md:p-12 shadow-[0_0_100px_rgba(37,211,102,0.25)] text-center overflow-hidden">
          {/* Subtle line at top */}
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-whatsapp-green to-transparent"></div>

          {/* Close Button */}
          <button 
            onClick={handleClose}
            className="absolute top-6 right-6 text-brand-gray hover:text-whatsapp-green transition-colors p-2 z-10"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Icon with Ring Animation */}
          <div className="mb-6 flex justify-center relative">
            <div className="absolute inset-0 bg-whatsapp-green/20 rounded-full animate-ping scale-150"></div>
            <div className="relative w-24 h-24 bg-whatsapp-green rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,211,102,0.5)]">
              <svg 
                viewBox="0 0 24 24" 
                className="w-14 h-14 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.403.007 12.04c0 2.123.554 4.197 1.607 6.034L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.637 0 12.038-5.402 12.041-12.04a11.817 11.817 0 00-3.517-8.482" />
              </svg>
            </div>
          </div>

          <h3 className="text-2xl md:text-3xl font-black mb-4 text-brand-light tracking-tight leading-tight">
            {title}
          </h3>
          
          <p className="text-lg text-brand-gray mb-8 font-medium leading-relaxed px-4">
            {message}
          </p>

          <div className="space-y-4">
            <a 
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleClose}
              className="flex items-center justify-center w-full py-5 px-8 bg-whatsapp-green text-white font-black text-sm uppercase tracking-[0.2em] rounded-2xl hover:brightness-110 transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-xl shadow-whatsapp-green/30"
            >
              {btnLabel}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 rtl:rotate-180" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
            
            <button 
              onClick={handleClose}
              className="text-[10px] font-black tracking-[0.4em] text-brand-gray/50 uppercase hover:text-brand-light transition-colors py-2"
            >
              Fermer l'offre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppPromoPopup;
