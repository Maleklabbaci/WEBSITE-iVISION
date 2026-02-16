
import React, { useState } from 'react';

const FORMSPARK_ID = "3hB9voxjF";

interface QuoteFormProps {
    translations: { form: any; };
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation client side
    if (!formData.name.trim() || !formData.phone.trim() || !formData.business || !formData.problem || !formData.budget) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setStatus('submitting');
    
    // Prepare data for submission (merging Other if applicable)
    const submissionData: any = { ...formData };
    if (formData.business === translations.form.businessOptions[translations.form.businessOptions.length - 1]) {
        submissionData.business = `Autre: ${formData.businessOther}`;
    }

    try {
      await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData),
      });
      setStatus('done');
    } catch { 
      setStatus('idle');
      alert("Erreur de transmission. Vérifiez votre connexion.");
    }
  };

  const labelClass = "text-[11px] font-black uppercase text-brand-blue ml-2 tracking-widest block mb-4";
  const inputClass = "w-full p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-white font-bold placeholder:text-white/20";
  const cardBaseClass = "relative p-5 md:p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer group";
  const cardSelectedClass = "bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/20";
  const cardUnselectedClass = "bg-white/5 border-white/10 hover:border-white/30";

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-12 text-center animate-fade-in">
        <div className="w-32 h-32 bg-brand-blue rounded-full flex items-center justify-center mb-12 text-white shadow-2xl shadow-brand-blue/30 scale-in">
          <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
        </div>
        <h2 className="text-5xl font-black mb-6 text-white uppercase tracking-tighter">{translations.form.successTitle}</h2>
        <p className="text-2xl font-medium text-brand-gray max-w-2xl mb-16 opacity-70">{translations.form.successMessage}</p>
        <button 
          onClick={() => window.location.hash = ''} 
          className="btn-ivision px-16 group"
        >
          <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
          <span>{translations.form.backToHome}</span>
        </button>
      </div>
    );
  }

  const isOtherBusinessSelected = formData.business === translations.form.businessOptions[translations.form.businessOptions.length - 1];

  return (
    <section className="min-h-screen bg-navy pt-48 pb-32 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/4 h-full bg-brand-blue/[0.02] transform -skew-x-12"></div>
      
      <div className="container max-w-5xl relative z-10">
        <div className="mb-20 text-center">
            <div className="sketch-badge mb-8">On passe à l'action</div>
            <h2 className="text-5xl md:text-[6rem] font-black text-white leading-[0.8] mb-12 uppercase tracking-tighter">
              Bâtissons <br />
              <span className="text-brand-blue">votre empire.</span>
            </h2>
            <p className="text-brand-gray text-xl md:text-2xl font-medium max-w-2xl mx-auto opacity-60 leading-tight border-l-2 md:border-l-0 md:border-b-2 border-brand-blue/30 pl-8 md:pl-0 md:pb-8">
                Répondez à ces 5 questions pour lancer votre audit stratégique.
            </p>
        </div>

        <div className="glass-card p-8 md:p-20 shadow-2xl border-white/10">
          <form onSubmit={onSubmit} className="space-y-16">
            
            {/* Q1: Nom */}
            <div className="space-y-2">
              <label className={labelClass}>01. {translations.form.nameLabel}</label>
              <input 
                  name="name" 
                  required 
                  placeholder="..." 
                  value={formData.name}
                  onChange={handleChange} 
                  className={inputClass}
              />
            </div>

            {/* Q2: WhatsApp */}
            <div className="space-y-2">
              <label className={labelClass}>02. {translations.form.phoneLabel}</label>
              <input 
                  name="phone" 
                  required 
                  type="tel" 
                  placeholder="+213..." 
                  value={formData.phone}
                  onChange={handleChange} 
                  className={inputClass}
              />
            </div>

            {/* Q3: Business */}
            <div className="space-y-6">
              <label className={labelClass}>03. {translations.form.businessLabel}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {translations.form.businessOptions.map((option: string) => (
                  <div 
                    key={option}
                    onClick={() => handleSelect('business', option)}
                    className={`${cardBaseClass} ${formData.business === option ? cardSelectedClass : cardUnselectedClass}`}
                  >
                    <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.business === option ? 'border-brand-blue bg-brand-blue' : 'border-white/20'}`}>
                            {formData.business === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`font-bold transition-colors ${formData.business === option ? 'text-white' : 'text-brand-gray group-hover:text-white'}`}>
                            {option}
                        </span>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Other Business Specification */}
              {isOtherBusinessSelected && (
                <div className="animate-fade-in-up mt-4">
                  <input 
                    name="businessOther"
                    placeholder="Précisez votre activité..."
                    required
                    value={formData.businessOther}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              )}
            </div>

            {/* Q4: Problème */}
            <div className="space-y-6">
              <label className={labelClass}>04. {translations.form.problemLabel}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {translations.form.problemOptions.map((option: string) => (
                  <div 
                    key={option}
                    onClick={() => handleSelect('problem', option)}
                    className={`${cardBaseClass} ${formData.problem === option ? cardSelectedClass : cardUnselectedClass}`}
                  >
                    <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.problem === option ? 'border-brand-blue bg-brand-blue' : 'border-white/20'}`}>
                            {formData.problem === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`font-bold transition-colors ${formData.problem === option ? 'text-white' : 'text-brand-gray group-hover:text-white'}`}>
                            {option}
                        </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Q5: Budget */}
            <div className="space-y-6">
              <label className={labelClass}>05. {translations.form.budgetLabel}</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {translations.form.budgetOptions.map((option: string) => (
                  <div 
                    key={option}
                    onClick={() => handleSelect('budget', option)}
                    className={`${cardBaseClass} ${formData.budget === option ? cardSelectedClass : cardUnselectedClass}`}
                  >
                    <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${formData.budget === option ? 'border-brand-blue bg-brand-blue' : 'border-white/20'}`}>
                            {formData.budget === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                        </div>
                        <span className={`font-bold transition-colors ${formData.budget === option ? 'text-white' : 'text-brand-gray group-hover:text-white'}`}>
                            {option}
                        </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-10 flex justify-center">
              <button 
                type="submit" 
                disabled={status === 'submitting'} 
                className="btn-ivision w-full md:w-auto px-20 py-10 text-base"
              >
                {status === 'submitting' ? 'SYNCHRONISATION...' : translations.form.cta}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
