import React from 'react';
import { WHATSAPP_NUMBER } from '../lib/config';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

const labels = {
  fr: { whatsapp: 'WhatsApp', call: 'Appeler', quote: 'Devis rapide' },
  en: { whatsapp: 'WhatsApp', call: 'Call', quote: 'Quick quote' },
  ar: { whatsapp: 'واتساب', call: 'اتصل', quote: 'عرض سريع' },
};

const MobileConversionBar: React.FC<{ language: Language; onQuoteClick: () => void }> = ({ language, onQuoteClick }) => {
  const t = labels[language];
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour iVISION, je souhaite obtenir un devis.')}`;

  return (
    <nav aria-label="Actions de contact rapides" className="fixed bottom-3 left-3 right-3 z-[105] lg:hidden rounded-2xl border border-white/20 bg-navy/95 p-2 shadow-2xl backdrop-blur-xl pb-[calc(0.5rem+env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-3 gap-2">
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { location: 'mobile_bar' })} className="flex min-h-12 items-center justify-center rounded-xl bg-[#25D366] px-2 text-[10px] font-black uppercase tracking-wide text-white">{t.whatsapp}</a>
        <a href="tel:+213563839404" onClick={() => trackEvent('phone_click', { location: 'mobile_bar' })} className="flex min-h-12 items-center justify-center rounded-xl border border-white/15 px-2 text-[10px] font-black uppercase tracking-wide text-white">{t.call}</a>
        <button type="button" onClick={() => { trackEvent('quick_quote_click', { location: 'mobile_bar' }); onQuoteClick(); }} className="min-h-12 rounded-xl bg-white px-2 text-[10px] font-black uppercase tracking-wide text-navy">{t.quote}</button>
      </div>
    </nav>
  );
};

export default MobileConversionBar;
