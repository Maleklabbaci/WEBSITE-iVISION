
import React, { useState, useMemo } from 'react';

const FORMSPARK_FORM_ID = "3hB9voxjF";
const WHATSAPP_NUMBER = "213563839404";

interface ContactTranslations {
    form: {
        title: string;
        yourInfoTitle: string;
        projectInfoTitle: string;
        nameLabel: string;
        companyNameLabel: string;
        emailLabel: string;
        phoneLabel: string;
        activityLabel: string;
        facebookLabel: string;
        instagramLabel: string;
        tiktokLabel: string;
        goalLabel: string;
        goalLabelHint: string;
        goalOptions: string[];
        serviceLabel: string;
        serviceLabelHint: string;
        budgetLabel: string;
        budgetLabelHint: string;
        budgetError?: string;
        budgetSmall: string;
        budgetMedium: string;
        budgetStrong: string;
        projectLabel: string;
        namePlaceholder: string;
        companyNamePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        activityPlaceholder: string;
        facebookPlaceholder: string;
        instagramPlaceholder: string;
        tiktokPlaceholder: string;
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

const IconFacebookBrand = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#1877F2]" xmlns="http://www.w3.org/2000/svg">
    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
  </svg>
);

const IconInstagramBrand = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-[#E4405F]" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919 4.919 1.266-.057 1.644-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4s1.791-4 4-4 4 1.79 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44 1.441-.645 1.441-1.44-.645-1.44-1.441-1.44z" />
  </svg>
);

const IconTikTokBrand = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.98-.23-2.81.33-.85.51-1.44 1.43-1.58 2.41-.05.34-.02.68-.01 1.03.11 1.04.81 2.01 1.8 2.33.5.18 1.05.21 1.57.18.82-.01 1.62-.33 2.22-.88.71-.62 1.09-1.54 1.12-2.47.01-4.75-.01-9.51 0-14.27z" />
  </svg>
);

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
  <div className="w-full">
    <label className="block text-sm font-bold text-brand-gray mb-3 uppercase tracking-wider text-[10px] text-start">
      {label} <span className="text-[9px] opacity-60 lowercase font-normal">{hint}</span>
    </label>
    <div className="grid grid-cols-2 gap-2 sm:gap-3">
      {options.map((option: string, index: number) => {
        const isSelected = selectedValues.includes(option);
        const Icon = icons ? icons[index] : null;
        return (
          <label key={option} className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-2.5 sm:p-3 border rounded-xl transition-all duration-300 text-[10px] sm:text-xs h-full ${
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
  <div className="w-full">
    <label className="block text-sm font-bold text-brand-gray mb-3 uppercase tracking-wider text-[10px] text-start">
      {label} {hint && <span className="block mt-1 text-[9px] text-brand-accent font-medium normal-case tracking-normal">{hint}</span>}
    </label>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {options.map((option: string) => (
        <label key={option} className={`cursor-pointer text-center p-3 border rounded-xl transition-all duration-300 text-[11px] sm:text-xs flex items-center justify-center h-full font-medium ${
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
    facebook: '',
    instagram: '',
    tiktok: '',
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
      `📱 *Facebook:* ${formData.facebook || 'N/A'}\n` +
      `📸 *Instagram:* ${formData.instagram || 'N/A'}\n` +
      `🎵 *TikTok:* ${formData.tiktok || 'N/A'}\n` +
      `🎯 *Objectifs:* ${formData.goals.length > 0 ? formData.goals.join(', ') : '...'}\n` +
      `🛠️ *Services:* ${formData.services.length > 0 ? formData.services.join(', ') : '...'}\n` +
      `💰 *Budget:* ${formData.budget || 'N/A'}\n\n` +
      `📝 *Projet:* \n${formData.project || '...'}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [formData]);

  const budgetAdvice = useMemo(() => {
    if (!formData.budget) return null;
    const index = translations.form.budgetOptions.indexOf(formData.budget);
    if (index === 0) return translations.form.budgetSmall;
    if (index === 1) return translations.form.budgetMedium;
    if (index >= 2) return translations.form.budgetStrong;
    return null;
  }, [formData.budget, translations.form]);

  const validateForm = () => {
    if (!formData.name.trim()) return "Veuillez entrer votre nom.";
    if (!formData.phone.trim()) return "Veuillez entrer votre numéro de téléphone.";
    if (!formData.budget) return translations.form.budgetError || "Veuillez sélectionner votre budget.";
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

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      const errorEl = document.getElementById('form-error-display');
      if (errorEl) errorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const inputClass = "w-full p-3 sm:p-4 bg-brand-dark/50 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent transition-all text-xs text-start rtl:text-right outline-none";
  
  const socialInputBaseClass = "flex-grow p-3 sm:p-4 bg-brand-dark/30 border border-brand-border rounded-xl focus:ring-1 focus:ring-brand-accent transition-all text-xs sm:text-[13px] text-start rtl:text-right placeholder:text-white/10 outline-none";
  
  const labelClass = "block text-[9px] font-black uppercase tracking-widest text-brand-gray mb-1.5 ms-1 text-start";

  return (
    <section className="py-8 md:py-20 animate-fade-in-up">
      <div className="container px-4 md:px-6">
        <div className="bg-brand-dark/40 border border-brand-border p-6 sm:p-8 md:p-14 rounded-[2rem] sm:rounded-[3.5rem] shadow-2xl relative overflow-hidden">
          {isSubmitted ? (
            <div className="text-center py-10 md:py-16">
               <div className="mx-auto bg-brand-accent/20 text-brand-accent w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 md:mb-8">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 md:h-10 md:w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
              <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight">{translations.form.successTitle}</h3>
              <p className="text-brand-gray text-base md:text-lg max-w-md mx-auto">{translations.form.successMessage}</p>
              <a href="#accueil" className="mt-8 md:mt-12 inline-block bg-brand-accent text-brand-dark font-black py-4 px-10 md:px-12 rounded-2xl transition-all shadow-xl shadow-brand-accent/20">Accueil</a>
            </div>
          ) : (
            <>
              <div className="mb-8 md:mb-12 text-center">
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 tracking-tighter uppercase">{translations.form.title}</h2>
                <div className="w-12 md:w-16 h-0.5 bg-brand-accent mx-auto rounded-full opacity-50"></div>
              </div>

              <div className="bg-brand-accent/5 border border-brand-accent/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 mb-8 md:mb-12 flex flex-col md:flex-row items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-brand-accent/10 rounded-xl md:rounded-2xl flex items-center justify-center text-brand-accent shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <div className="text-center md:text-left rtl:md:text-right">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                      <h4 className="text-brand-accent font-black uppercase tracking-widest text-[9px] md:text-[10px]">{translations.qualification?.title}</h4>
                      <span className="bg-brand-accent/10 text-brand-accent text-[7px] md:text-[8px] font-black px-2 py-0.5 rounded-full whitespace-nowrap">{translations.qualification?.badge}</span>
                    </div>
                    <p className="text-brand-gray text-[11px] md:text-[13px] leading-relaxed">{translations.qualification?.message}</p>
                  </div>
              </div>

              {formError && (
                <div 
                  id="form-error-display"
                  className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl md:rounded-2xl mb-6 md:mb-8 text-center text-[10px] sm:text-xs font-bold animate-shake"
                >
                  {formError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  <div className="space-y-5 md:space-y-6">
                    <h4 className="text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] md:tracking-[0.3em] border-b border-white/5 pb-2 mb-4 md:mb-6 text-start">{translations.form.yourInfoTitle}</h4>
                    <div className="space-y-4">
                      <div>
                        <label className={labelClass}>{translations.form.nameLabel}</label>
                        <input type="text" name="name" placeholder={translations.form.namePlaceholder} value={formData.name} onChange={handleChange} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClass}>{translations.form.emailLabel}</label>
                        <input type="email" name="email" placeholder={translations.form.emailPlaceholder} value={formData.email} onChange={handleChange} className={inputClass} />
                      </div>
                      <div>
                        <label className={labelClass}>{translations.form.phoneLabel}</label>
                        <input type="tel" name="phone" placeholder={translations.form.phonePlaceholder} value={formData.phone} onChange={handleChange} className={inputClass} required />
                      </div>
                      <div>
                        <label className={labelClass}>{translations.form.companyNameLabel}</label>
                        <input type="text" name="companyName" placeholder={translations.form.companyNamePlaceholder} value={formData.companyName} onChange={handleChange} className={inputClass} />
                      </div>
                      <div className="pb-2">
                        <label className={labelClass}>{translations.form.activityLabel}</label>
                        <input type="text" name="activity" placeholder={translations.form.activityPlaceholder} value={formData.activity} onChange={handleChange} className={inputClass} />
                      </div>
                      
                      {/* Premium Social Media fields */}
                      <div className="space-y-5 md:space-y-6 pt-4 border-t border-white/5">
                        {/* Facebook */}
                        <div className="space-y-1.5 group/social">
                          <label className={labelClass}>{translations.form.facebookLabel}</label>
                          <div className="flex items-stretch gap-2 md:gap-3 ltr:flex-row rtl:flex-row-reverse">
                            <input 
                              type="text" 
                              name="facebook" 
                              placeholder={translations.form.facebookPlaceholder} 
                              value={formData.facebook} 
                              onChange={handleChange} 
                              className={socialInputBaseClass} 
                            />
                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-brand-dark/40 border border-brand-border rounded-xl flex items-center justify-center transition-all group-focus-within/social:border-brand-accent/50 group-focus-within/social:scale-105">
                              <IconFacebookBrand />
                            </div>
                          </div>
                        </div>

                        {/* Instagram */}
                        <div className="space-y-1.5 group/social">
                          <label className={labelClass}>{translations.form.instagramLabel}</label>
                          <div className="flex items-stretch gap-2 md:gap-3 ltr:flex-row rtl:flex-row-reverse">
                            <input 
                              type="text" 
                              name="instagram" 
                              placeholder={translations.form.instagramPlaceholder} 
                              value={formData.instagram} 
                              onChange={handleChange} 
                              className={socialInputBaseClass} 
                            />
                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-brand-dark/40 border border-brand-border rounded-xl flex items-center justify-center transition-all group-focus-within/social:border-brand-accent/50 group-focus-within/social:scale-105">
                              <IconInstagramBrand />
                            </div>
                          </div>
                        </div>

                        {/* TikTok */}
                        <div className="space-y-1.5 group/social">
                          <label className={labelClass}>{translations.form.tiktokLabel}</label>
                          <div className="flex items-stretch gap-2 md:gap-3 ltr:flex-row rtl:flex-row-reverse">
                            <input 
                              type="text" 
                              name="tiktok" 
                              placeholder={translations.form.tiktokPlaceholder} 
                              value={formData.tiktok} 
                              onChange={handleChange} 
                              className={socialInputBaseClass} 
                            />
                            <div className="w-10 h-10 md:w-12 md:h-12 shrink-0 bg-brand-dark/40 border border-brand-border rounded-xl flex items-center justify-center transition-all group-focus-within/social:border-brand-accent/50 group-focus-within/social:scale-105">
                              <IconTikTokBrand />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-5 md:space-y-6">
                    <h4 className="text-[9px] md:text-[10px] font-black text-brand-accent uppercase tracking-[0.2em] md:tracking-[0.3em] border-b border-white/5 pb-2 mb-4 md:mb-6 text-start">{translations.form.projectInfoTitle}</h4>
                    <div className="space-y-6 md:space-y-8">
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

                {/* Dynamic Budget Advice Box */}
                {budgetAdvice && (
                  <div className="animate-fade-in-up bg-brand-accent/5 border border-brand-accent/20 p-4 sm:p-5 rounded-2xl flex items-start gap-3 md:gap-4 transition-all duration-500 shadow-[0_0_20px_rgba(56,189,248,0.05)]">
                    <div className="w-8 h-8 md:w-10 md:h-10 shrink-0 bg-brand-accent/10 rounded-lg md:rounded-xl flex items-center justify-center text-brand-accent">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h5 className="text-[9px] md:text-[10px] font-black uppercase text-brand-accent tracking-widest mb-1 text-start">Analyse Stratégique</h5>
                      <p className="text-[12px] md:text-[13px] text-brand-gray/90 leading-relaxed text-start">{budgetAdvice}</p>
                    </div>
                  </div>
                )}

                <div className="pt-2 text-center">
                  <p className="text-[10px] md:text-[11px] text-brand-gray/60 italic leading-relaxed max-w-lg mx-auto">
                    {translations.form.privacyNote}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-center justify-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] bg-white text-brand-dark font-black py-4 px-8 md:px-10 rounded-xl transition-all uppercase tracking-widest text-[9px] md:text-[10px]"
                  >
                    {isSubmitting ? 'Envoi...' : translations.form.cta}
                  </button>
                  <button 
                    type="button"
                    onClick={handleWhatsAppClick}
                    className="w-full sm:w-auto min-w-[180px] md:min-w-[200px] bg-whatsapp-green text-white font-black py-4 px-8 md:px-10 rounded-xl transition-all flex items-center justify-center gap-3 uppercase tracking-widest text-[9px] md:text-[10px]"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 md:w-5 md:h-5 fill-white" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.403.007 12.04c0 2.123.554 4.197 1.607 6.034L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.637 0 12.038-5.402 12.041-12.04a11.817 11.817 0 00-3.517-8.482" />
                    </svg>
                    {translations.form.whatsappCta}
                  </button>
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
