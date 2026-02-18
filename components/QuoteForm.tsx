import React, { useState } from 'react';

const FORMSPARK_ID = "3hB9voxjF";

interface QuoteFormProps {
    translations: { form: any; };
}

// Déclaration globale pour éviter les erreurs TS sur fbq
declare global {
  interface Window {
    fbq: any;
  }
}

const QuoteForm: React.FC<QuoteFormProps> = ({ translations }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    phone: '', 
    business: '', 
    businessOther: '',
    problem: '', 
    budget: '' 
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.phone.trim() || !formData.business || !formData.problem || !formData.budget) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setStatus('submitting');
    
    const businessValue = formData.business === translations.form.businessOptions[translations.form.businessOptions.length - 1]
        ? `Autre: ${formData.businessOther}`
        : formData.business;

    const submissionData = {
      name: formData.name.trim(),
      phone: formData.phone.trim(),
      business_type: businessValue,
      problem: formData.problem,
      budget_range: formData.budget,
      _subject: `Nouvelle demande de devis : ${formData.name}`,
    };

    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json' 
        },
        body: JSON.stringify(submissionData),
      });

      if (response.ok) {
        // --- META PIXEL TRACKING ---
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: 'Demande Audit iVISION',
            content_category: 'Lead Prospect',
            business_type: businessValue,
            budget_range: formData.budget,
            value: 0.00,
            currency: 'DZD'
          });
        }
        // ---------------------------
        setStatus('done');
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) { 
      console.error("Submission error:", error);
      setStatus('idle');
      alert("Une erreur est survenue lors de l'envoi.");
    }
  };

  const labelClass = "text-[11px] font-black uppercase text-brand-blue ml-2 tracking-widest block mb-4";
  const inputClass = "w-full p-6 md:p-8 bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-navy dark:text-white font-bold placeholder:text-navy/20 dark:placeholder:text-white/20";
  const cardBaseClass = "relative p-5 md:p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer group";
  const cardSelectedClass = "bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/20";
  const cardUnselectedClass = "bg-navy/5 dark:bg-white/5 border-navy/10 dark:border-white/10 hover:border-brand-blue/40";

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-white dark:bg-navy flex flex-col items-center justify-center p-12 text-center animate-fade-in relative overflow-hidden transition-colors duration-500">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-blue rounded-full flex items-center justify-center mb-8 md:mb-12 text-white shadow-2xl shadow-brand-blue/40 animate-scale-in">
              <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="sketch-badge mb-6">Validation terminée</div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-6 text-navy dark:text-white uppercase tracking-tighter leading-none animate-fade-in-up transition-colors duration-500">
              {translations.form.successTitle}
            </h2>
            
            <p className="text-lg md:text-2xl font-medium text-brand-gray dark:text-brand-gray/80 max-w-2xl mb-12 md:mb-16 opacity-80 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {translations.form.successMessage}
            </p>
            
            <button 
              onClick={() => window.location.hash = ''} 
              className="btn-ivision px-12 md:px-20 py-5"
            >
              {translations.form.backToHome}
            </button>
        </div>
      </div>
    );
  }

  return (
    <section className="py-32 md:py-40 bg-white dark:bg-navy transition-colors duration-500 relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="mb-16 md:mb-24 text-center">
            <div className="sketch-badge mb-8">On vous rappelle sous 2h</div>
            <h2 className="text-4xl md:text-8xl font-black text-navy dark:text-white uppercase tracking-tighter leading-[0.85] transition-colors duration-500">
              {translations.form.title}
            </h2>
          </div>

          <form onSubmit={onSubmit} className="space-y-16 md:space-y-24">
            {/* Identité */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 animate-fade-in-up">
              <div>
                <label className={labelClass}>{translations.form.nameLabel}</label>
                <input 
                  type="text" 
                  name="name"
                  placeholder="Ex: Mourad Brahimi"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{translations.form.phoneLabel}</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="05 / 06 / 07 ..."
                  value={formData.phone}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Type de Business */}
            <div className="animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <label className={labelClass}>{translations.form.businessLabel}</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {translations.form.businessOptions.map((option: string, i: number) => (
                  <div 
                    key={i}
                    onClick={() => handleSelect('business', option)}
                    className={`${cardBaseClass} ${formData.business === option ? cardSelectedClass : cardUnselectedClass}`}
                  >
                    <div className="text-xs md:text-sm font-black uppercase tracking-tight text-navy dark:text-white transition-colors">
                      {option}
                    </div>
                    {formData.business === option && (
                        <div className="absolute top-2 right-2 text-brand-blue animate-scale-in">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </div>
                    )}
                  </div>
                ))}
              </div>
              {formData.business === translations.form.businessOptions[translations.form.businessOptions.length - 1] && (
                <div className="mt-8 animate-fade-in-up">
                    <input 
                        type="text" 
                        name="businessOther"
                        placeholder="Précisez votre activité..."
                        value={formData.businessOther}
                        onChange={handleChange}
                        className={inputClass}
                    />
                </div>
              )}
            </div>

            {/* Problématique */}
            <div className="animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <label className={labelClass}>{translations.form.problemLabel}</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {translations.form.problemOptions.map((option: string, i: number) => (
                  <div 
                    key={i}
                    onClick={() => handleSelect('problem', option)}
                    className={`${cardBaseClass} ${formData.problem === option ? cardSelectedClass : cardUnselectedClass}`}
                  >
                    <div className="text-xs md:text-sm font-black uppercase tracking-tight text-navy dark:text-white transition-colors">
                      {option}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <label className={labelClass}>{translations.form.budgetLabel}</label>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {translations.form.budgetOptions.map((option: string, i: number) => (
                  <div 
                    key={i}
                    onClick={() => handleSelect('budget', option)}
                    className={`${cardBaseClass} ${formData.budget === option ? cardSelectedClass : cardUnselectedClass}`}
                  >
                    <div className="text-xs md:text-sm font-black uppercase tracking-tight text-navy dark:text-white transition-colors">
                      {option}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Final */}
            <div className="pt-12 md:pt-20 flex flex-col items-center gap-8 animate-fade-in-up" style={{ animationDelay: '400ms' }}>
               <button 
                  type="submit" 
                  disabled={status === 'submitting'}
                  className="btn-ivision w-full md:w-auto px-16 md:px-32 py-6 md:py-8 text-sm md:text-base disabled:opacity-50"
               >
                  {status === 'submitting' ? '...' : translations.form.cta}
               </button>
               <p className="text-brand-gray/40 text-[9px] font-black uppercase tracking-[0.3em]">
                 Données sécurisées & audit gratuit garanti
               </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;