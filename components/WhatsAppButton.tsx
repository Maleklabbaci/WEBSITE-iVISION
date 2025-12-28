
import React, { useState, useRef, useEffect } from 'react';

interface WhatsAppButtonProps {
  phoneNumber: string;
  message: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ phoneNumber, message }) => {
  const [position, setPosition] = useState({ x: 32, y: window.innerHeight - 100 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPos = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY };
    initialPos.current = { ...position };
    hasMoved.current = false;
    if (buttonRef.current) buttonRef.current.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    
    if (Math.abs(dx) > 5 || Math.abs(dy) > 5) {
      hasMoved.current = true;
    }

    setPosition({
      x: initialPos.current.x + dx,
      y: initialPos.current.y + dy
    });
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (buttonRef.current) buttonRef.current.releasePointerCapture(e.pointerId);

    // Snapping to edges
    const screenWidth = window.innerWidth;
    const padding = 20;
    const buttonWidth = 64;
    
    let targetX = position.x < (screenWidth / 2) - (buttonWidth / 2) 
      ? padding 
      : screenWidth - buttonWidth - padding;

    // Boundary checks for Y
    const screenHeight = window.innerHeight;
    let targetY = Math.max(padding, Math.min(position.y, screenHeight - buttonWidth - padding));

    setPosition({ x: targetX, y: targetY });

    if (!hasMoved.current) {
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      ref={buttonRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`,
        transition: isDragging ? 'none' : 'all 0.4s cubic-bezier(0.18, 0.89, 0.32, 1.28)',
        touchAction: 'none'
      }}
      className="fixed z-40 group cursor-grab active:cursor-grabbing"
      aria-label="Contact us on WhatsApp"
    >
      {/* Pulse Rings */}
      <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20 group-hover:opacity-40 transition-opacity"></span>
      <span className="absolute -inset-2 rounded-full bg-[#25D366] animate-pulse opacity-10 group-hover:opacity-30 transition-opacity"></span>
      
      {/* Main Button */}
      <div className="relative flex items-center justify-center w-14 h-14 md:w-16 md:h-16 bg-[#25D366] rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] transition-all duration-300 transform group-hover:scale-110 group-active:scale-95 group-hover:shadow-[0_15px_35px_rgb(37,211,102,0.6)]">
        <svg 
          viewBox="0 0 24 24" 
          className="w-8 h-8 md:w-10 md:h-10 fill-white pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.403.007 12.04c0 2.123.554 4.197 1.607 6.034L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.637 0 12.038-5.402 12.041-12.04a11.817 11.817 0 00-3.517-8.482" />
        </svg>
      </div>
    </div>
  );
};

export default WhatsAppButton;
