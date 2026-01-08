
import React, { useState, useMemo } from 'react';

const FORMSPARK_FORM_ID = "3hB9voxjF";
const WHATSAPP_NUMBER = "213697660969";

interface ContactTranslations {
    form: {
        title: string;
        nameLabel: string;
        companyNameLabel: string;
        emailLabel: string;
        phoneLabel: string;
        activityLabel: string;
        goalLabel: string;
        goalLabelHint: string;
        goalOptions: string[];
        serviceLabel: string;
        serviceLabelHint: string;
        budgetLabel: string;
        budgetLabelHint: string;
        projectLabel: string;
        namePlaceholder: string;
        companyNamePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        activityPlaceholder: string;
        servicePlaceholder: string;
        serviceOptions: string[];
        budget: string;
        budgetOptions: string[];
        projectPlaceholder: string;
        privacyNote: string;
        cta: string;
        whatsappCta: string;
        successTitle: string;
        successMessage: string;
        yourInfoTitle: string;
        projectInfoTitle: string;
    };
    qualification?: {
      title: string;
      message: string;
      badge: string;
    };
}

interface QuoteFormProps {
    translations: { 
      form: ContactTranslations['form'],
      qualification: {
        title: string;
        message: string;
        badge: string;
      }
    };
}

// Icons
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v8a2 2 0 002 2z" /></svg>;
const IconMegaphone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.89 12.056 22 7 22a4.001 4.001 0 01-1.564-.317z" /></svg>;
const IconShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconDots = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;
const IconCalendar = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const IconSparkles = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-12v4m-2-2h4m5 4h.01M17 17v4m-2-2h4M12 21a9 9 0 110-18 9 9 0 010 18z" /></svg>;
const IconRocket = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.585 15.585a1.826 1.826 0 102.582-2.582 1.826 1.826 0 00-2.582 2.582zM4.318 19.682l2.122-2.122m5.656-5.656l2.122-2.122M11 9.9l1.414-1.414m-1.414 4.242L12.414 11.3M7 7l.707-.707m4.243 4.243l.707-.707m-5.657 5.657l.707-.707m11.314-11.314a8.001 8.001 0 010 11.314l-2.828 2.828a1 1 0 01-1.414 0L4.343 7.879a1 1 0 010-1.414L7.172 3.636a8.001 8.001 0 0111.314 0z" /></svg>;

const serviceIcons = [
  <IconTrendingUp />,
  <IconCamera />,
  <IconMegaphone />,
  <IconShoppingCart />,
  <IconDots />
];

const goalIcons = [
  <IconTrendingUp />,
  <IconCalendar />,
  <IconSparkles />,
  <IconRocket />,
  <IconDots />
];

const CheckboxGroup: React.FC<any> = ({ label, hint, name, options, selectedValues, onChange, icons }) => (
  <div>
    <label className="block text-sm font-bold text-brand-gray mb-3 uppercase tracking-wider text-[10px] text-start">
      {label} <span className="text-[9px] opacity-60 lowercase font-normal">{hint}</span>
    </label>
    <div className="grid grid-cols-2 gap-3">
      {options.map((option: string, index: number) => {
        const isSelected = selectedValues.includes(option);
        const Icon = icons ? icons[index] : null;
        return (
          <label key={option} className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-3 border rounded-xl transition-all duration-300 text-xs h-full ${
            isSelected
              ? 'bg-brand-accent/20 text-brand-accent border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.15)]'
              : 'bg-brand-dark/50 border-brand-border hover:border-brand-accent/40'
          }`}>
            <input type="checkbox" name={name} value={option} checked={isSelected} onChange={onChange} className="sr-only" />
            {Icon && (
              <div className={`transition-all duration-300 transform ${isSelected ? 'scale-110 text-brand-accent' : 'text-brand-gray'}`}>
                {Icon}
              </div>
            )}
            <span className={`text-center leading-tight font-medium ${isSelected ? 'text-brand-light' : 'text-brand-gray'}`}>{option}</span>
          </label>
        );
      })}
    </div>
  </div>
);

const RadioBoxGroup: React.FC<any> = ({ label, hint, name, options, selectedValue, onChange, required }) => (
  <div>
    <label className="block text-sm font-bold text-brand-gray mb-3 uppercase tracking-wider text-[10px] text-start">
      {label} {hint && <span className="block mt-1 text-[9px] text-brand-accent font-medium normal-case tracking-normal">{hint}</span>}
    </label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option: string) => (
        <label key={option} className={`cursor-pointer text-center p-3 border rounded-xl transition-all duration-300 text-xs flex items-center justify-center h-full font-medium ${
          selectedValue === option
            ? 'bg-brand-accent/20 text-brand-accent border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.15)]'
            : 'bg-brand-dark/50 border-brand-border hover:border-brand-accent/40'
        }`}>
          <input type="radio" name={name} value={option} checked={selectedValue === option} onChange={onChange} className="sr-only" required={required && !selectedValue} />
          {option}
        </label>
      ))}
    </div>
  </div>
);

const QuoteForm: React.FC<QuoteFormProps> = ({ translations }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    activity: '',
    goals: [] as string[],
    services: [] as string[],
    budget: '',
    project: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (formError) setFormError(null);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setFormData(prev => {
        const currentList = prev[name as 'goals' | 'services'] as string[];
        const newList = checked 
            ? [...currentList, value] 
            : currentList.filter(s => s !== value);
        return { ...prev, [name]: newList };
    });
    if (formError) setFormError(null);
  };

  const whatsappUrl = useMemo(() => {
    const message = `*Nouveau Devis iVISION*\n\n` +
      `👤 *Nom:* ${formData.name || '...'}\n` +
      `🏢 *Entreprise:* ${formData.companyName || 'N/A'}\n` +
      `📧 *Email:* ${formData.email || 'N/A'}\n` +
      `📞 *Tel/WA:* ${formData.phone || 'N/A'}\n` +
      `🏪 *Activité:* ${formData.activity || '...'}\n` +
      `🎯 *Objectifs:* ${formData.goals.length > 0 ? formData.goals.join(', ') : '...'}\n` +
      `🛠️ *Services:* ${formData.services.length > 0 ? formData.services.join(', ') : '...'}\n` +
      `💰 *Budget:* ${formData.budget || 'N/A'}\n\n` +
      `📝 *Projet:* \n${formData.project || '...'}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [formData]);

  const validateForm = () => {
    if (!formData.name.trim()) return "Veuillez entrer votre nom.";
    if (!formData.phone.trim()) return "Veuillez entrer votre numéro de téléphone.";
    if (formData.services.length === 0) return "Veuillez sélectionner au moins un service.";
    if (formData.goals.length === 0) return "Veuillez sélectionner au moins un objectif.";
    if (!formData.project.trim()) return "Veuillez décrire votre projet.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) { setFormError(error); return; }
    setIsSubmitting(true);
    setFormError(null);
    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ 
          ...formData, 
          services: formData.services.join(', '), 
          goals: formData.goals.join(', '),
          "_email.subject": `Lead iVISION: ${formData.name}` 
        }),
      });
      if (response.ok) setIsSubmitted(true);
      else setFormError("Erreur lors de l'envoi. Veuillez utiliser WhatsApp.");
    } catch {
      setFormError("Erreur de connexion. Veuillez essayer via WhatsApp.");
    } finally { setIsSubmitting(false); }
  };

  const inputClass = "w-full p-4 bg-brand-dark/50 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent transition-all text-xs text-start rtl:text-right";
  const labelClass = "block text-[9px] font-black uppercase tracking-widest text-brand-gray mb-1.5 ms-1 text-start";

  return (
    <section className="py-12 md:py-20 animate-fade-in-up">
      <div className="container px-6">
        <div className="bg-brand-dark/40 border border-brand-border p-8 md:p-14 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-16">
               <div className="mx-auto bg-brand-accent/20 text-brand-accent w-20 h-20 rounded-full flex items-center justify-center mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight">{translations.form.successTitle}</h3>
              <p className="text-brand-gray text-lg max-w-md mx-auto">{translations.form.successMessage}</p>
              <a href="#accueil" className="mt-12 inline-block bg-brand-accent text-brand-dark font-black py-4 px-12 rounded-2xl transition-all shadow-xl shadow-brand-accent/20">Accueil</a>
            </div>
          ) : (
            <>
              <div className="mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tighter uppercase">{translations.form.title}</h2>
                <div className="w-16 h-0.5 bg-brand-accent mx-auto rounded-full opacity-50"></div>
              </div>

              <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-3xl p-6 mb-12 flex flex-col md:flex-row items-center gap-6">
                  <div className="w-12 h-12 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div className="text-center md:text-left rtl:md:text-right">
                    <div className="flex items-center justify-center md:justify-start rtl:md:justify-start gap-3 mb-1">
                      <h4 className="text-brand-accent font-black uppercase tracking-widest text-[10px]">{translations.qualification.title}</h4>
                      <span className="bg-brand-accent/10 text-brand-accent text-[8px] font-black px-2 py-0.5 rounded-full">{translations.qualification.badge}</span>
                    </div>
                    <p className="text-brand-gray text-[13px] leading-relaxed">{translations.qualification.message}</p>
                  </div>
              </div>

              {formError && <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-2xl mb-8 text-center text-xs font-bold animate-shake">{formError}</div>}

              <form onSubmit={handleSubmit} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] border-b border-white/5 pb-2 mb-6 text-start">{translations.form.yourInfoTitle}</h4>
                    <div className="space-y-4">
                      {/* 1. الاسم الكامل */}
                      <div>
                        <label className={labelClass}>{translations.form.nameLabel}</label>
                        <input type="text" name="name" placeholder={translations.form.namePlaceholder} value={formData.name} onChange={handleChange} className={inputClass} required />
                      </div>
                      {/* 2. البريد الإلكتروني (اختياري) */}
                      <div>
                        <label className={labelClass}>{translations.form.emailLabel}</label>
                        <input type="email" name="email" placeholder={translations.form.emailPlaceholder} value={formData.email} onChange={handleChange} className={inputClass} />
                      </div>
                      {/* 3. رقم الهاتف / واتساب */}
                      <div>
                        <label className={labelClass}>{translations.form.phoneLabel}</label>
                        <input type="tel" name="phone" placeholder={translations.form.phonePlaceholder} value={formData.phone} onChange={handleChange} className={inputClass} required />
                      </div>
                      {/* 4. اسم الشركة */}
                      <div>
                        <label className={labelClass}>{translations.form.companyNameLabel}</label>
                        <input type="text" name="companyName" placeholder={translations.form.companyNamePlaceholder} value={formData.companyName} onChange={handleChange} className={inputClass} />
                      </div>
                      {/* 5. مجال النشاط */}
                      <div>
                        <label className={labelClass}>{translations.form.activityLabel}</label>
                        <input type="text" name="activity" placeholder={translations.form.activityPlaceholder} value={formData.activity} onChange={handleChange} className={inputClass} />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <h4 className="text-[10px] font-black text-brand-accent uppercase tracking-[0.3em] border-b border-white/5 pb-2 mb-6 text-start">{translations.form.projectInfoTitle}</h4>
                    <div className="space-y-8">
                      <CheckboxGroup 
                        label={translations.form.goalLabel} 
                        hint={translations.form.goalLabelHint} 
                        name="goals" 
                        options={translations.form.goalOptions} 
                        selectedValues={formData.goals} 
                        onChange={handleCheckboxChange} 
                        icons={goalIcons}
                      />
                      <CheckboxGroup 
                        label={translations.form.serviceLabel} 
                        hint={translations.form.serviceLabelHint} 
                        name="services" 
                        options={translations.form.serviceOptions} 
                        selectedValues={formData.services} 
                        onChange={handleCheckboxChange} 
                        icons={serviceIcons} 
                      />
                      <RadioBoxGroup 
                        label={translations.form.budgetLabel} 
                        hint={translations.form.budgetLabelHint} 
                        name="budget" 
                        options={translations.form.budgetOptions} 
                        selectedValue={formData.budget} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className={labelClass}>{translations.form.projectLabel}</label>
                  <textarea name="project" placeholder={translations.form.projectPlaceholder} value={formData.project} onChange={handleChange} rows={5} className={`${inputClass} resize-none`} required></textarea>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-brand-gray/60 italic leading-relaxed max-w-lg mx-auto">
                    {translations.form.privacyNote}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                  <button type="submit" disabled={isSubmitting} className="w-full sm:w-auto min-w-[200px] bg-white text-brand-dark font-black py-4 px-10 rounded-xl transition-all uppercase tracking-widest text-[10px]">{isSubmitting ? 'Envoi...' : translations.form.cta}</button>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto min-w-[200px] bg-whatsapp-green text-white font-black py-4 px-10 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[10px]">{translations.form.whatsappCta}</a>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default QuoteForm;
