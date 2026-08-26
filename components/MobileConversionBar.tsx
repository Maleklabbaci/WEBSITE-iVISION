import React from 'react';
import { WHATSAPP_NUMBER } from '../lib/config';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

const labels = {
  fr: { whatsapp: 'WhatsApp', quote: 'Devis' },
  en: { whatsapp: 'WhatsApp', quote: 'Quote' },
  ar: { whatsapp: 'واتساب', quote: 'عرض' },
};

type MobileConversionBarProps = { language: Language };

const MobileConversionBar: React.FC<MobileConversionBarProps> = ({ language }) => {
  const t = labels[language];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour iVISION, je souhaite obtenir un devis.')}`;

  return (
    <nav aria-label="Actions de contact rapides" className="mobile-conversion-bar pointer-events-auto fixed bottom-3 left-3 right-3 z-[120] rounded-2xl border border-white/20 bg-navy/95 p-2 shadow-2xl backdrop-blur-xl pb-[calc(0.5rem+env(safe-area-inset-bottom))] touch-manipulation lg:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'mobile_bar' })} className="flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-2 text-[10px] font-black uppercase tracking-wide text-white transition-transform active:scale-[0.98]">{t.whatsapp}</a>
        <a href="#/devis" onClick={() => trackEvent('quick_quote_click', { location: 'mobile_bar' })} className="flex min-h-12 items-center justify-center rounded-xl bg-white px-2 text-[10px] font-black uppercase tracking-wide text-navy transition-transform active:scale-[0.98]">{t.quote}</a>
      </div>
    </nav>
  );
};

export default MobileConversionBar;
