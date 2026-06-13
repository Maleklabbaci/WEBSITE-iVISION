import React, { useState, useEffect } from 'react';

import { FORMSPARK_ID } from '../lib/config';

interface QuoteFormProps {
  translations: { form: any; };
}

declare global {
  interface Window {
    fbq: any;
  }
}

const QuoteForm: React.FC<QuoteFormProps> = ({ translations }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    business: '', 
    otherBusiness: '',
    problems: [] as string[],
    otherProblem: '',
    onlinePresence: '',
    businessAge: '',
    hasPaidAds: '',
    budget: '',
    pack: '' 
  });
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const t = translations.form;

  useEffect(() => {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const urlParams = new URLSearchParams(hashParts[1]);
      const packName = urlParams.get('pack');
      const businessName = urlParams.get('business');
      if (packName || businessName) {
        setFormData(prev => ({
          ...prev,
          ...(packName ? { pack: packName.toUpperCase() } : {}),
          ...(businessName ? { business: decodeURIComponent(businessName) } : {}),
        }));
        if (businessName) {
          setStep(1);
        }
      }
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow digits
    const digits = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: digits });
    if (digits.length > 0 && digits.length !== 10) {
      setPhoneError('Le numéro doit contenir exactement 10 chiffres');
    } else {
      setPhoneError('');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) return;
      if (formData.phone.length !== 10) {
        setPhoneError('Le numéro doit contenir exactement 10 chiffres');
        return;
      }
    }
    if (step === 2 && !formData.business) return;
    if (step === 2 && formData.business === 'Autre' && !formData.otherBusiness.trim()) return;
    if (step === 3 && (formData.problems.length === 0 || !formData.budget)) return;
    if (step === 3 && formData.problems.includes('Autre') && !formData.otherProblem.trim()) return;
    if (step === 3 && (!formData.onlinePresence || !formData.businessAge || !formData.hasPaidAds)) return;

    if (step === 1 && formData.business && formData.business !== 'Autre') {
      setStep(3);
    } else {
      setStep(prev => prev + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step === 3 && formData.business && formData.business !== 'Autre') {
      setStep(1);
    } else if (step > 1) {
      setStep(prev => prev - 1);
    } else {
      window.location.hash = '';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleProblem = (opt: string) => {
    setFormData(prev => {
      const exists = prev.problems.includes(opt);
      return {
        ...prev,
        problems: exists ? prev.problems.filter(p => p !== opt) : [...prev.problems, opt],
        otherProblem: opt === 'Autre' && exists ? '' : prev.otherProblem,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const businessLabel = formData.business === 'Autre' ? `Autre: ${formData.otherBusiness}` : formData.business;
    const problemsLabel = formData.problems.map(p => p === 'Autre' ? `Autre: ${formData.otherProblem}` : p).join(', ');

    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      business: businessLabel,
      problems: problemsLabel,
      onlinePresence: formData.onlinePresence,
      businessAge: formData.businessAge,
      hasPaidAds: formData.hasPaidAds,
      budget: formData.budget,
      pack: formData.pack,
      _subject: formData.pack ? `[PACK ${formData.pack}] AUDIT : ${formData.name}` : `AUDIT iVISION : ${formData.name}`,
    };

    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Audit iVISION',
            business_type: businessLabel,
            budget: formData.budget,
            pack_choisi: formData.pack,
            currency: 'DZD'
          });
        }
        setStatus('done');
      } else { throw new Error('Error'); }
    } catch (error) {
      setStatus('error');
    }
  };

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-white dark:bg-transparent flex items-center justify-center p-8 transition-colors duration-500">
        <div className="text-center animate-scale-in max-w-lg">
          <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center mb-8 mx-auto text-white shadow-2xl shadow-brand-blue/30">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-black mb-4 text-navy dark:text-white uppercase tracking-tighter">{t.successTitle}</h2>
          <p className="text-brand-gray text-lg font-medium mb-10 opacity-80 leading-relaxed">{t.successMessage}</p>
          <button onClick={() => window.location.hash = ''} className="btn-ivision w-full py-5">{t.backToHome}</button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full p-6 bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-navy dark:text-white font-bold text-lg placeholder:opacity-30";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-4 ml-2";
  const cardClass = (selected: boolean) => `relative p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-start justify-between h-full group ${selected ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10' : 'bg-navy/5 dark:bg-white/5 border-navy/5 dark:border-white/5 hover:border-brand-blue/30'}`;
  const pillClass = (selected: boolean) => `relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-center group ${selected ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10' : 'bg-navy/5 dark:bg-white/5 border-navy/5 dark:border-white/5 hover:border-brand-blue/30'}`;

  const isStep3Valid = formData.problems.length > 0 
    && formData.budget 
    && formData.onlinePresence 
    && formData.businessAge 
    && formData.hasPaidAds
    && !(formData.problems.includes('Autre') && !formData.otherProblem.trim());

  return (
    <div className="min-h-screen bg-white dark:bg-transparent transition-colors duration-500 py-24 md:py-32">
      <div className="container max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <button onClick={handleBack} className="text-navy/40 dark:text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span className="text-[10px] font-black tracking-widest uppercase">{t.back}</span>
          </button>
          <div className="flex gap-4 w-32">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-blue' : 'bg-navy/10 dark:bg-white/10'}`}></div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-black text-navy dark:text-white uppercase tracking-tighter leading-none mb-4">{t.title}</h1>
          <p className="text-brand-gray font-medium opacity-60">
            {(translations.form as any).stepLabel
              ? (translations.form as any).stepLabel.replace('{step}', step).replace('{total}', 3)
              : `Étape ${step} sur 3`}
          </p>
        </div>

        <form onSubmit={e => e.preventDefault()} className="space-y-12">
          {/* ─── STEP 1 ─── */}
          {step === 1 && (
            <div className="space-y-10 animate-fade-in-up">
              {formData.pack && (
                <div className="p-4 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl flex items-center gap-4 animate-scale-in">
                  <div className="bg-brand-blue text-white p-2 rounded-full">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  </div>
                  <div>
                    <p className="text-[10px] font-black tracking-widest uppercase text-brand-blue">Sélection validée</p>
                    <p className="text-navy dark:text-white font-bold text-lg uppercase">PACK {formData.pack}</p>
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>{t.nameLabel}</label>
                  <input
                    type="text"
                    placeholder="Ex: Omar Dahmani"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>{t.phoneLabel}</label>
                  <input
                    type="tel"
                    inputMode="numeric"
                    placeholder="05 00 00 00 00"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    className={`${inputClass} ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {phoneError && (
                    <p className="mt-2 ml-2 text-[11px] font-bold text-red-500 uppercase tracking-wide">{phoneError}</p>
                  )}
                  {formData.phone.length === 10 && !phoneError && (
                    <p className="mt-2 ml-2 text-[11px] font-bold text-green-500 uppercase tracking-wide">✓ Numéro valide</p>
                  )}
                </div>
              </div>
              <button
                onClick={handleNext}
                disabled={!formData.name || !formData.phone || formData.phone.length !== 10}
                className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group"
              >
                <span>{t.next}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
              </button>
            </div>
          )}

          {/* ─── STEP 2 ─── */}
          {step === 2 && (
            <div className="space-y-10 animate-fade-in-up">
              <label className={labelClass}>{t.businessLabel}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {t.businessOptions.map((opt: string) => (
                  <div key={opt} onClick={() => setFormData({ ...formData, business: opt, otherBusiness: '' })} className={cardClass(formData.business === opt)}>
                    <span className="text-xs font-black uppercase tracking-tight text-navy dark:text-white">{opt}</span>
                    {formData.business === opt && (
                      <div className="absolute top-4 right-4 text-brand-blue">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {formData.business === 'Autre' && (
                <div className="animate-fade-in-up">
                  <label className={labelClass}>Précisez votre activité <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder={t.otherSpecify || "Ex: Agence de voyage, Pharmacie..."}
                    value={formData.otherBusiness}
                    onChange={e => setFormData({ ...formData, otherBusiness: e.target.value })}
                    className={inputClass}
                    autoFocus
                  />
                  {formData.business === 'Autre' && !formData.otherBusiness.trim() && (
                    <p className="mt-2 ml-2 text-[11px] font-bold text-red-500 uppercase tracking-wide">⚠ Ce champ est obligatoire pour continuer</p>
                  )}
                </div>
              )}

              <button
                onClick={handleNext}
                disabled={!formData.business || (formData.business === 'Autre' && !formData.otherBusiness.trim())}
                className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group"
              >
                <span>{t.next}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
              </button>
            </div>
          )}

          {/* ─── STEP 3 ─── */}
          {step === 3 && (
            <div className="space-y-12 animate-fade-in-up">

              {/* Blocages — multi-select */}
              <div>
                <label className={labelClass}>
                  {t.problemLabel}
                  <span className="ml-2 text-white/30 font-medium normal-case tracking-normal">(plusieurs choix possibles)</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...(t.problemOptions || []), 'Autre'].map((opt: string) => (
                    <div key={opt} onClick={() => toggleProblem(opt)} className={cardClass(formData.problems.includes(opt))}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                      {formData.problems.includes(opt) && (
                        <div className="absolute top-4 right-4 text-brand-blue">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {formData.problems.includes('Autre') && (
                  <div className="mt-6 animate-fade-in-up">
                    <label className={labelClass}>Précisez votre blocage <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder="Ex: Mauvaises avis clients, fidélisation..."
                      value={formData.otherProblem}
                      onChange={e => setFormData({ ...formData, otherProblem: e.target.value })}
                      className={inputClass}
                      autoFocus
                    />
                  </div>
                )}
              </div>

              {/* Présence en ligne */}
              <div>
                <label className={labelClass}>Votre présence en ligne actuelle ?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Pas de page', 'Page inactive', 'Page active mais sans résultats'].map((opt) => (
                    <div key={opt} onClick={() => setFormData({ ...formData, onlinePresence: opt })} className={cardClass(formData.onlinePresence === opt)}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                      {formData.onlinePresence === opt && (
                        <div className="absolute top-4 right-4 text-brand-blue">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Ancienneté business */}
              <div>
                <label className={labelClass}>Depuis combien de temps votre business est actif ?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Moins de 6 mois', '6 mois – 2 ans', '+2 ans'].map((opt) => (
                    <div key={opt} onClick={() => setFormData({ ...formData, businessAge: opt })} className={cardClass(formData.businessAge === opt)}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                      {formData.businessAge === opt && (
                        <div className="absolute top-4 right-4 text-brand-blue">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Pub payante */}
              <div>
                <label className={labelClass}>Avez-vous déjà fait de la pub payante ?</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Jamais', 'Oui, sans résultats', 'Oui, avec résultats'].map((opt) => (
                    <div key={opt} onClick={() => setFormData({ ...formData, hasPaidAds: opt })} className={cardClass(formData.hasPaidAds === opt)}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                      {formData.hasPaidAds === opt && (
                        <div className="absolute top-4 right-4 text-brand-blue">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className={labelClass}>{t.budgetLabel}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {t.budgetOptions.map((opt: string, idx: number) => (
                    <div key={opt} onClick={() => setFormData({ ...formData, budget: opt })} className={cardClass(formData.budget === opt)}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                      {formData.budget === opt && (
                        <div className="absolute top-4 right-4 text-brand-blue">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                        </div>
                      )}
                      {/* Note sur le premier budget */}
                      {idx === 0 && (
                        <p className="mt-2 text-[10px] text-brand-blue/70 font-semibold">Budget minimum recommandé</p>
                      )}
                    </div>
                  ))}
                </div>
                <p className="mt-4 ml-2 text-[11px] text-white/40 font-medium uppercase tracking-wide">
                  * Budget minimum de départ : 30 000 DA / mois
                </p>
              </div>

              {status === 'error' && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">
                  Une erreur est survenue. Vérifiez votre connexion et réessayez.
                </div>
              )}

              <button
                onClick={onSubmit}
                disabled={status === 'submitting' || !isStep3Valid}
                className="btn-ivision w-full py-8 text-xl disabled:opacity-30 disabled:pointer-events-none"
              >
                {status === 'submitting' ? '...' : t.cta}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
