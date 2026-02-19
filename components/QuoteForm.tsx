
import React, { useState, useEffect } from 'react';

const FORMSPARK_ID = "3hB9voxjF";

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
    problem: '', 
    budget: '' 
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  const t = translations.form;

  const handleNext = () => {
    if (step === 1 && (!formData.name.trim() || !formData.phone.trim())) return;
    if (step === 2 && !formData.business) return;
    if (step === 2 && formData.business === 'Autre' && !formData.otherBusiness.trim()) return;
    if (step === 3 && (!formData.problem || !formData.budget)) return;
    setStep(prev => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.hash = '';
    }
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const businessLabel = formData.business === 'Autre' ? `Autre: ${formData.otherBusiness}` : formData.business;

    const submissionData = {
      ...formData,
      business: businessLabel,
      _subject: `AUDIT iVISION : ${formData.name}`,
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
            content_name: 'Audit Audit iVISION',
            business_type: businessLabel,
            budget: formData.budget,
            currency: 'DZD'
          });
        }
        setStatus('done');
      } else { throw new Error('Error'); }
    } catch (error) { 
      setStatus('idle');
      alert("Une erreur est survenue.");
    }
  };

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-white dark:bg-navy flex items-center justify-center p-8 transition-colors duration-500">
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

  return (
    <div className="min-h-screen bg-white dark:bg-navy transition-colors duration-500 py-24 md:py-32">
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
          <p className="text-brand-gray font-medium opacity-60">Étape {step} sur 3</p>
        </div>

        <form onSubmit={e => e.preventDefault()} className="space-y-12">
          {step === 1 && (
            <div className="space-y-10 animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className={labelClass}>{t.nameLabel}</label>
                    <input 
                      type="text" 
                      placeholder="Ex: Omar Dahmani"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>{t.phoneLabel}</label>
                    <input 
                      type="tel" 
                      placeholder="05 00 00 00 00"
                      value={formData.phone}
                      onChange={e => setFormData({...formData, phone: e.target.value})}
                      className={inputClass}
                    />
                  </div>
              </div>
              <button onClick={handleNext} disabled={!formData.name || !formData.phone} className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group">
                <span>{t.next}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-10 animate-fade-in-up">
              <label className={labelClass}>{t.businessLabel}</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {t.businessOptions.map((opt: string) => (
                  <div key={opt} onClick={() => setFormData({...formData, business: opt})} className={cardClass(formData.business === opt)}>
                    <span className="text-xs font-black uppercase tracking-tight text-navy dark:text-white">{opt}</span>
                    {formData.business === opt && <div className="absolute top-4 right-4 text-brand-blue"><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg></div>}
                  </div>
                ))}
              </div>

              {formData.business === 'Autre' && (
                <div className="animate-fade-in-up">
                  <label className={labelClass}>Précisez</label>
                  <input 
                    type="text" 
                    placeholder={t.otherSpecify}
                    value={formData.otherBusiness}
                    onChange={e => setFormData({...formData, otherBusiness: e.target.value})}
                    className={inputClass}
                    autoFocus
                  />
                </div>
              )}

              <button onClick={handleNext} disabled={!formData.business || (formData.business === 'Autre' && !formData.otherBusiness)} className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group">
                <span>{t.next}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
              </button>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-12 animate-fade-in-up">
              <div>
                <label className={labelClass}>{t.problemLabel}</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {t.problemOptions.map((opt: string) => (
                    <div key={opt} onClick={() => setFormData({...formData, problem: opt})} className={cardClass(formData.problem === opt)}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className={labelClass}>{t.budgetLabel}</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {t.budgetOptions.map((opt: string) => (
                    <div key={opt} onClick={() => setFormData({...formData, budget: opt})} className={cardClass(formData.budget === opt)}>
                      <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button 
                onClick={onSubmit} 
                disabled={status === 'submitting' || !formData.problem || !formData.budget} 
                className="btn-ivision w-full py-8 text-xl"
              >
                {status === 'submitting' ? '...' : t.cta}
              </button>
            </div>
          )}
        </form>

        <div className="mt-20 p-8 border-l-4 border-brand-blue bg-navy/5 dark:bg-white/5 rounded-r-2xl">
            <p className="text-brand-gray font-medium italic opacity-60">"Nous ne prenons que 3 nouveaux clients par mois pour garantir un accompagnement haute performance."</p>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
