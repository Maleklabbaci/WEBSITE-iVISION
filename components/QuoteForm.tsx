
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelect = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation stricte
    if (!formData.name.trim() || !formData.phone.trim() || !formData.business || !formData.problem || !formData.budget) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    setStatus('submitting');
    
    // Préparation des données propres
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
        setStatus('done');
      } else {
        throw new Error('Server returned an error');
      }
    } catch (error) { 
      console.error("Submission error:", error);
      setStatus('idle');
      alert("Une erreur est survenue lors de l'envoi. Veuillez vérifier votre connexion ou nous contacter directement sur WhatsApp.");
    }
  };

  const labelClass = "text-[11px] font-black uppercase text-brand-blue ml-2 tracking-widest block mb-4";
  const inputClass = "w-full p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-white font-bold placeholder:text-white/20";
  const cardBaseClass = "relative p-5 md:p-6 rounded-2xl border transition-all duration-300 text-left cursor-pointer group";
  const cardSelectedClass = "bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/20";
  const cardUnselectedClass = "bg-white/5 border-white/10 hover:border-white/30";

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-navy flex flex-col items-center justify-center p-12 text-center animate-fade-in relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl bg-brand-blue/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col items-center">
            <div className="w-24 h-24 md:w-32 md:h-32 bg-brand-blue rounded-full flex items-center justify-center mb-8 md:mb-12 text-white shadow-2xl shadow-brand-blue/40 animate-scale-in">
              <svg className="w-12 h-12 md:w-16 md:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <div className="sketch-badge mb-6">Félicitations</div>
            
            <h2 className="text-4xl md:text-7xl font-black mb-6 text-white uppercase tracking-tighter leading-none animate-fade-in-up">
              {translations.form.successTitle}
            </h2>
            
            <p className="text-lg md:text-2xl font-medium text-brand-gray max-w-2xl mb-12 md:mb-16 opacity-80 leading-relaxed animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              {translations.form.successMessage}
            </p>
            
            <button 
              onClick={() => window.location.hash = ''} 
              className="btn-ivision px-12 md:px-16 group py-4 md:py-6 animate-fade-in-up"
              style={{ animationDelay: '400ms' }}
            >
              <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1.5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
              <span>{translations.form.backToHome}</span>
            </button>
        </div>
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
                className="btn-ivision w-full md:w-auto px-20 py-10 text-base shadow-2xl shadow-brand-blue/30"
              >
                {status === 'submitting' ? 'ENVOI EN COURS...' : translations.form.cta}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
