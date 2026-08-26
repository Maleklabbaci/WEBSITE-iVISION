import React, { useState } from 'react';
import { FORMSPARK_ID, WHATSAPP_NUMBER } from '../lib/config';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

const copy = {
  fr: { eyebrow: 'Un premier contact', title: 'BESOIN D’UN', accent: 'AVIS RAPIDE ?', intro: 'Laissez vos coordonnées et dites-nous ce que vous voulez améliorer. Nous revenons vers vous avec le prochain bon pas.', name: 'Votre nom', phone: 'Votre téléphone', service: 'Votre besoin', choose: 'Choisir un service', services: ['Meta & Google Ads', 'Création de site web', 'Contenu & branding', 'Formation'], consent: 'J’accepte d’être contacté au sujet de ma demande.', submit: 'Recevoir un premier retour', sending: 'Envoi…', success: 'Demande reçue. Nous revenons vers vous rapidement.', error: 'Impossible d’envoyer la demande. Réessayez ou contactez-nous sur WhatsApp.', full: 'Formulaire complet' },
  en: { eyebrow: 'Start a conversation', title: 'NEED A', accent: 'QUICK OPINION?', intro: 'Share your details and tell us what you want to improve. We will come back with the right next step.', name: 'Your name', phone: 'Your phone', service: 'Your need', choose: 'Choose a service', services: ['Meta & Google Ads', 'Website creation', 'Content & branding', 'Training'], consent: 'I agree to be contacted about my request.', submit: 'Get a first response', sending: 'Sending…', success: 'Request received. We will get back to you shortly.', error: 'Could not send the request. Try again or contact us on WhatsApp.', full: 'Full form' },
  ar: { eyebrow: 'تواصل أولي', title: 'تحتاج', accent: 'رأياً سريعاً؟', intro: 'اترك معلوماتك وأخبرنا بما تريد تحسينه. سنعود إليك بالخطوة المناسبة.', name: 'اسمك', phone: 'رقم الهاتف', service: 'احتياجك', choose: 'اختر الخدمة', services: ['Meta و Google Ads', 'إنشاء موقع', 'المحتوى والهوية', 'التكوين'], consent: 'أوافق على التواصل معي بخصوص طلبي.', submit: 'احصل على رد أولي', sending: 'جار الإرسال…', success: 'تم استلام الطلب. سنتواصل معك قريباً.', error: 'تعذر إرسال الطلب. أعد المحاولة أو تواصل معنا عبر واتساب.', full: 'النموذج الكامل' },
};

const QuickQuote: React.FC<{ language: Language; onFullQuoteClick?: () => void }> = ({ language, onFullQuoteClick }) => {
  const t = copy[language];
  const [form, setForm] = useState({ name: '', phone: '', service: '', consent: false, website: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.website || !form.consent || !form.name.trim() || !form.phone.trim() || !form.service) return;
    setStatus('sending');
    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: form.name.trim(), phone: form.phone.trim(), service: form.service, source: 'Quick Quote', _subject: `Quick quote — ${form.service}` }),
      });
      if (!response.ok) throw new Error('Formspark request failed');
      trackEvent('quick_quote_submit', { service: form.service });
      setStatus('done');
    } catch (error) {
      console.error('Quick quote error:', error);
      setStatus('error');
    }
  };

  return (
    <section id="devis-rapide" className="quick-quote-section py-24 md:py-36 bg-brand-blue text-white relative overflow-hidden">
      <div className="absolute -right-32 -top-32 w-96 h-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
      <div className="container relative grid lg:grid-cols-[0.9fr_1.1fr] gap-12 lg:gap-20 items-center">
        <div>
          <div className="sketch-badge mb-6 border-white/30 text-white">{t.eyebrow}</div>
          <h2 className="text-[clamp(2.5rem,7vw,7rem)] font-black tracking-tighter leading-[0.88] uppercase">{t.title}<br /><span className="text-navy">{t.accent}</span></h2>
          <p className="mt-8 max-w-xl text-lg md:text-xl text-white/80 leading-relaxed">{t.intro}</p>
          <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('quick_quote_whatsapp_click')} className="inline-flex mt-8 font-black uppercase tracking-widest text-xs border-b border-white/50 pb-2 hover:border-white transition-colors">WhatsApp direct <span aria-hidden="true" className="ml-2">→</span></a>
        </div>
        <div className="rounded-[2rem] bg-white p-7 md:p-10 text-navy shadow-2xl">
          {status === 'done' ? (
            <div role="status" className="py-10 text-center"><div className="w-16 h-16 rounded-full bg-brand-blue text-white grid place-items-center mx-auto mb-6 text-2xl">✓</div><p className="text-2xl font-black mb-7">{t.success}</p><a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="btn-ivision">WhatsApp direct</a></div>
          ) : (
            <form onSubmit={submit} className="space-y-5">
              <div className="hidden" aria-hidden="true"><label htmlFor="quick-website">Website</label><input id="quick-website" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} tabIndex={-1} autoComplete="off" /></div>
              <div><label htmlFor="quick-name" className="block text-xs font-black uppercase tracking-widest mb-2">{t.name}</label><input id="quick-name" required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="w-full rounded-xl border border-navy/15 p-4 font-bold outline-none focus:border-brand-blue" /></div>
              <div><label htmlFor="quick-phone" className="block text-xs font-black uppercase tracking-widest mb-2">{t.phone}</label><input id="quick-phone" required type="tel" inputMode="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="w-full rounded-xl border border-navy/15 p-4 font-bold outline-none focus:border-brand-blue" /></div>
              <div><label htmlFor="quick-service" className="block text-xs font-black uppercase tracking-widest mb-2">{t.service}</label><select id="quick-service" required value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} className="w-full rounded-xl border border-navy/15 p-4 font-bold outline-none focus:border-brand-blue bg-white"><option value="">{t.choose}</option>{t.services.map(service => <option key={service} value={service}>{service}</option>)}</select></div>
              <label className="flex items-start gap-3 text-sm text-navy/70"><input type="checkbox" checked={form.consent} onChange={e => setForm({ ...form, consent: e.target.checked })} className="mt-1 h-4 w-4 accent-brand-blue" /><span>{t.consent}</span></label>
              {status === 'error' && <p role="alert" className="text-sm font-bold text-red-600">{t.error}</p>}
              <button type="submit" disabled={status === 'sending' || !form.consent} className="btn-ivision w-full disabled:opacity-40">{status === 'sending' ? t.sending : t.submit}</button>
              {onFullQuoteClick && <button type="button" onClick={onFullQuoteClick} className="w-full text-xs font-black uppercase tracking-widest text-navy/50 hover:text-brand-blue">{t.full}</button>}
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuickQuote;
