
import React, { useState, useMemo } from 'react';

const FORMSPARK_FORM_ID = "3hB9voxjF";
const WHATSAPP_NUMBER = "213563839404";

interface QuoteFormProps {
    translations: { 
      form: any;
      qualification: any;
    };
}

const CardSelector: React.FC<any> = ({ label, name, options, selectedValue, onChange }) => (
  <div className="w-full">
    <label className="block text-[11px] font-extrabold uppercase tracking-widest text-brand-gray mb-4 text-start rtl:text-right">
      {label}
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {options.map((option: string) => {
        const isSelected = selectedValue === option;
        return (
          <label key={option} className={`cursor-pointer flex items-center justify-center p-4 border rounded-xl transition-all duration-300 ${
            isSelected
              ? 'bg-brand-accent text-brand-dark border-brand-accent font-bold'
              : 'bg-white/[0.02] border-brand-border text-brand-gray hover:border-brand-gray/50'
          }`}>
            <input type="radio" name={name} value={option} checked={isSelected} onChange={onChange} className="sr-only" required />
            <span className="text-[12px] text-center leading-tight uppercase tracking-tight">{option}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const QuoteForm: React.FC<QuoteFormProps> = ({ translations }) => {
  const [formData, setFormData] = useState({ name: '', phone: '', businessType: '', otherBusiness: '', problem: '', budget: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const whatsappUrl = useMemo(() => {
    const biz = formData.businessType === 'Autre' || formData.businessType === 'Other' || formData.businessType === 'آخر' ? formData.otherBusiness : formData.businessType;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`*Lead iVISION*\nNom: ${formData.name}\nWhatsApp: ${formData.phone}\nBusiness: ${biz}\nProblème: ${formData.problem}\nBudget: ${formData.budget}`)}`;
  }, [formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      setIsSubmitted(true);
    } catch { alert("Erreur."); } finally { setIsSubmitting(false); }
  };

  const inputClass = "w-full p-4 bg-white/[0.02] border border-brand-border rounded-xl focus:border-brand-accent transition-all text-sm outline-none text-start rtl:text-right text-white font-medium";
  const labelClass = "block text-[11px] font-extrabold uppercase tracking-widest text-brand-gray mb-2 text-start rtl:text-right";

  return (
    <section className="py-20">
      <div className="container px-6">
        <div className="max-w-4xl mx-auto bg-white/[0.01] border border-brand-border p-8 md:p-16 rounded-3xl">
          {isSubmitted ? (
            <div className="text-center py-12">
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">{translations.form.successTitle}</h2>
              <p className="text-brand-gray mb-10 text-lg">{translations.form.successMessage}</p>
              <a href="#accueil" className="bg-brand-accent text-brand-dark font-black py-4 px-12 rounded-xl uppercase tracking-widest text-[11px]">Retour Accueil</a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-12">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">{translations.form.title}</h2>
                <p className="text-brand-gray font-medium uppercase tracking-[0.3em] text-[10px]">{translations.qualification?.title}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>{translations.form.nameLabel}</label>
                  <input type="text" name="name" placeholder={translations.form.placeholderName} value={formData.name} onChange={handleChange} className={inputClass} required />
                </div>
                <div>
                  <label className={labelClass}>{translations.form.phoneLabel}</label>
                  <input type="tel" name="phone" placeholder={translations.form.placeholderPhone} value={formData.phone} onChange={handleChange} className={inputClass} required />
                </div>
              </div>

              <CardSelector label={translations.form.businessLabel} name="businessType" options={translations.form.businessOptions} selectedValue={formData.businessType} onChange={handleChange} />
              
              <CardSelector label={translations.form.problemLabel} name="problem" options={translations.form.problemOptions} selectedValue={formData.problem} onChange={handleChange} />

              <CardSelector label={translations.form.budgetLabel} name="budget" options={translations.form.budgetOptions} selectedValue={formData.budget} onChange={handleChange} />

              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <button type="submit" disabled={isSubmitting} className="flex-1 bg-white text-brand-dark font-black py-5 rounded-xl uppercase tracking-widest text-[12px] hover:brightness-90 transition-all">{isSubmitting ? '...' : translations.form.cta}</button>
                <button type="button" onClick={() => window.open(whatsappUrl, '_blank')} className="flex-1 bg-whatsapp-green text-white font-black py-5 rounded-xl uppercase tracking-widest text-[12px] hover:brightness-110 transition-all">WhatsApp Direct</button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
