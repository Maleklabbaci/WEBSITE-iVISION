
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
        serviceLabel: string;
        serviceLabelHint: string;
        budgetLabel: string;
        projectLabel: string;
        namePlaceholder: string;
        companyNamePlaceholder: string;
        emailPlaceholder: string;
        phonePlaceholder: string;
        servicePlaceholder: string;
        serviceOptions: string[];
        budget: string;
        budgetOptions: string[];
        projectPlaceholder: string;
        cta: string;
        whatsappCta: string;
        successTitle: string;
        successMessage: string;
        yourInfoTitle: string;
        projectInfoTitle: string;
    };
}

interface QuoteFormProps {
    translations: { form: ContactTranslations['form'] };
    onClose: () => void;
}

// Icons
const IconTrendingUp = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>;
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2-2v8a2 2 0 002 2z" /></svg>;
const IconMegaphone = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-2.236 9.168-5.514C18.332 18.89 12.056 22 7 22a4.001 4.001 0 01-1.564-.317z" /></svg>;
const IconShoppingCart = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const IconDots = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" /></svg>;

const serviceIcons = [
  <IconTrendingUp />,
  <IconCamera />,
  <IconMegaphone />,
  <IconShoppingCart />,
  <IconDots />
];

interface CheckboxGroupProps {
  label: string;
  hint: string;
  name: string;
  options: string[];
  selectedValues: string[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  icons?: React.ReactNode[];
}

const CheckboxGroup: React.FC<CheckboxGroupProps> = ({ label, hint, name, options, selectedValues, onChange, required, icons }) => (
  <div>
    <label className="block text-sm font-bold text-brand-gray mb-3 uppercase tracking-wider text-[10px]">
      {label} <span className="text-[9px] opacity-60 lowercase font-normal">{hint}</span>
    </label>
    <div className="grid grid-cols-2 gap-3">
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option);
        const Icon = icons ? icons[index] : null;
        
        return (
          <label key={option} className={`cursor-pointer flex flex-col items-center justify-center gap-2 p-3 border rounded-xl transition-all duration-300 text-xs h-full ${
            isSelected
              ? 'bg-brand-accent/20 text-brand-accent border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.15)]'
              : 'bg-brand-dark/50 border-brand-border hover:border-brand-accent/40'
          }`}>
            <input
              type="checkbox"
              name={name}
              value={option}
              checked={isSelected}
              onChange={onChange}
              className="sr-only"
            />
            {Icon && (
              <div className={`transition-all duration-300 transform ${isSelected ? 'scale-110 text-brand-accent' : 'text-brand-gray group-hover:text-brand-accent/60'}`}>
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

interface RadioBoxGroupProps {
  label: string;
  name: string;
  options: string[];
  selectedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const RadioBoxGroup: React.FC<RadioBoxGroupProps> = ({ label, name, options, selectedValue, onChange, required }) => (
  <div>
    <label className="block text-sm font-bold text-brand-gray mb-3 uppercase tracking-wider text-[10px]">{label}</label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option} className={`cursor-pointer text-center p-3 border rounded-xl transition-all duration-300 text-xs flex items-center justify-center h-full font-medium ${
          selectedValue === option
            ? 'bg-brand-accent/20 text-brand-accent border-brand-accent shadow-[0_0_15px_rgba(56,189,248,0.15)]'
            : 'bg-brand-dark/50 border-brand-border hover:border-brand-accent/40'
        }`}>
          <input
            type="radio"
            name={name}
            value={option}
            checked={selectedValue === option}
            onChange={onChange}
            className="sr-only"
            required={required && !selectedValue}
          />
          {option}
        </label>
      ))}
    </div>
  </div>
);


const QuoteForm: React.FC<QuoteFormProps> = ({ translations, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
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

  const handleServiceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData(prev => {
        if (checked) {
            return { ...prev, services: [...prev.services, value] };
        } else {
            return { ...prev, services: prev.services.filter(s => s !== value) };
        }
    });
    if (formError) setFormError(null);
  };

  const whatsappUrl = useMemo(() => {
    const message = `*Nouveau Devis iVISION*\n\n` +
      `👤 *Nom:* ${formData.name || '...'}\n` +
      `🏢 *Entreprise:* ${formData.companyName || 'N/A'}\n` +
      `📧 *Email:* ${formData.email || '...'}\n` +
      `📞 *Tel:* ${formData.phone || 'N/A'}\n` +
      `🛠️ *Services:* ${formData.services.length > 0 ? formData.services.join(', ') : '...'}\n` +
      `💰 *Budget:* ${formData.budget || 'N/A'}\n\n` +
      `📝 *Projet:* \n${formData.project || '...'}`;

    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  }, [formData]);

  const validateForm = () => {
    if (!formData.name.trim()) return "Veuillez entrer votre nom.";
    if (!formData.email.trim()) return "Veuillez entrer votre email.";
    if (formData.services.length === 0) return "Veuillez sélectionner au moins un service.";
    if (!formData.project.trim()) return "Veuillez décrire votre projet.";
    return null;
  };

  const handleWhatsAppClick = (e: React.MouseEvent) => {
    const error = validateForm();
    if (error) {
      e.preventDefault();
      setFormError(error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error) {
      setFormError(error);
      return;
    }

    setIsSubmitting(true);
    setFormError(null);

    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: formData.services.join(', '), 
          "_email.subject": `Lead iVISION: ${formData.name}`,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setFormError("Erreur lors de l'envoi. Veuillez utiliser WhatsApp.");
      }
    } catch (error) {
      setFormError("Erreur de connexion. Veuillez essayer via WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-brand-dark/80 z-[60] flex items-center justify-center p-4 backdrop-blur-sm"
        onClick={onClose}
    >
      <div
        className="relative bg-brand-dark border border-brand-border text-brand-light p-8 md:p-10 rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-[0_25px_80px_rgba(0,0,0,0.6)]"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-8 right-8 text-brand-gray hover:text-brand-accent transition-all duration-300 p-2 group">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 group-hover:rotate-90 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
        </button>
        
        {isSubmitted ? (
            <div className="text-center py-16">
                 <div className="mx-auto bg-brand-accent/20 text-brand-accent w-24 h-24 rounded-full flex items-center justify-center mb-8 animate-fade-in-up">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                <h3 className="text-4xl font-black mb-4 text-brand-light tracking-tight">{translations.form.successTitle}</h3>
                <p className="text-brand-gray text-xl max-w-md mx-auto">{translations.form.successMessage}</p>
                <button onClick={onClose} className="mt-12 bg-brand-accent text-brand-dark font-black py-4 px-12 rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-brand-accent/20">
                  Fermer
                </button>
            </div>
        ) : (
            <>
                <h3 className="text-3xl md:text-4xl font-black mb-10 text-center tracking-tighter uppercase">{translations.form.title}</h3>
                
                {formError && (
                  <div className="bg-red-500/10 border border-red-500/40 text-red-400 p-4 rounded-2xl mb-8 text-center text-sm font-bold flex items-center justify-center gap-2 animate-shake">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {formError}
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {/* User Profile */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-brand-accent uppercase tracking-[0.3em] border-b border-brand-border pb-3 mb-6">
                            {translations.form.yourInfoTitle}
                        </h4>
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2 ml-1">{translations.form.nameLabel}</label>
                                <input id="name" type="text" name="name" placeholder={translations.form.namePlaceholder} value={formData.name} onChange={handleChange} className="w-full p-4 bg-brand-dark border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder:text-brand-gray/30" required disabled={isSubmitting} />
                            </div>
                            <div>
                                <label htmlFor="companyName" className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2 ml-1">{translations.form.companyNameLabel}</label>
                                <input id="companyName" type="text" name="companyName" placeholder={translations.form.companyNamePlaceholder} value={formData.companyName} onChange={handleChange} className="w-full p-4 bg-brand-dark border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder:text-brand-gray/30" disabled={isSubmitting} />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2 ml-1">{translations.form.emailLabel}</label>
                                <input id="email" type="email" name="email" placeholder={translations.form.emailPlaceholder} value={formData.email} onChange={handleChange} className="w-full p-4 bg-brand-dark border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder:text-brand-gray/30" required disabled={isSubmitting} />
                            </div>
                            <div>
                                <label htmlFor="phone" className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2 ml-1">{translations.form.phoneLabel}</label>
                                <input id="phone" type="tel" name="phone" placeholder={translations.form.phonePlaceholder} value={formData.phone} onChange={handleChange} className="w-full p-4 bg-brand-dark border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder:text-brand-gray/30" disabled={isSubmitting} />
                            </div>
                        </div>
                    </div>

                    {/* Project Requirements */}
                    <div className="space-y-6">
                        <h4 className="text-xs font-black text-brand-accent uppercase tracking-[0.3em] border-b border-brand-border pb-3 mb-6">
                           {translations.form.projectInfoTitle}
                        </h4>
                        <div className="space-y-8">
                            <CheckboxGroup
                              label={translations.form.serviceLabel}
                              hint={translations.form.serviceLabelHint}
                              name="services"
                              options={translations.form.serviceOptions}
                              selectedValues={formData.services}
                              onChange={handleServiceChange}
                              required
                              icons={serviceIcons}
                            />
                            <RadioBoxGroup
                              label={translations.form.budgetLabel}
                              name="budget"
                              options={translations.form.budgetOptions}
                              selectedValue={formData.budget}
                              onChange={handleChange}
                              required
                            />
                        </div>
                    </div>
                  </div>

                  {/* Message Field */}
                  <div className="w-full">
                      <label htmlFor="project" className="block text-[10px] font-black uppercase tracking-widest text-brand-gray mb-2 ml-1">{translations.form.projectLabel}</label>
                      <textarea id="project" name="project" placeholder={translations.form.projectPlaceholder} value={formData.project} onChange={handleChange} rows={4} className="w-full p-5 bg-brand-dark border border-brand-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-accent transition-all placeholder:text-brand-gray/30 resize-none" required disabled={isSubmitting}></textarea>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center pt-4">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full sm:w-auto min-w-[200px] bg-brand-light text-brand-dark font-black py-5 px-10 rounded-2xl transition-all duration-300 ${isSubmitting ? 'opacity-40 cursor-not-allowed' : 'hover:scale-[1.03] active:scale-95 shadow-2xl shadow-brand-light/10'} uppercase tracking-widest text-xs`}
                    >
                        {isSubmitting ? translations.form.cta + '...' : translations.form.cta}
                    </button>
                    
                    <a 
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={handleWhatsAppClick}
                        className={`w-full sm:w-auto min-w-[250px] bg-whatsapp-green text-white font-black py-5 px-10 rounded-2xl transition-all duration-300 hover:scale-[1.03] active:scale-95 shadow-2xl shadow-whatsapp-green/30 flex items-center justify-center gap-3 uppercase tracking-widest text-xs`}
                    >
                        <svg 
                          viewBox="0 0 24 24" 
                          className="w-6 h-6 fill-white"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.411 0 .01 5.403.007 12.04c0 2.123.554 4.197 1.607 6.034L0 24l6.117-1.605a11.803 11.803 0 005.925 1.586h.005c6.637 0 12.038-5.402 12.041-12.04a11.817 11.817 0 00-3.517-8.482" />
                        </svg>
                        {translations.form.whatsappCta}
                    </a>
                  </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;
