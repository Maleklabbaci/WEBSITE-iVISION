import React, { useState } from 'react';

const FORMSPARK_FORM_ID = "3hB9voxjF";

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
const IconCamera = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>;
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
    <label className="block text-sm font-medium text-brand-gray mb-2">
      {label} <span className="text-xs opacity-75">{hint}</span>
    </label>
    <div className="grid grid-cols-2 gap-3">
      {options.map((option, index) => {
        const isSelected = selectedValues.includes(option);
        const Icon = icons ? icons[index] : null;
        
        return (
          <label key={option} className={`cursor-pointer flex flex-col items-center justify-center gap-3 p-4 border rounded-md transition-all duration-200 text-sm h-full ${
            isSelected
              ? 'bg-brand-accent text-brand-dark border-brand-accent font-semibold'
              : 'bg-brand-dark/50 border-brand-border hover:border-brand-accent/50'
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
              <div className={`transition-colors duration-200 ${isSelected ? 'text-brand-dark' : 'text-brand-accent'}`}>
                {Icon}
              </div>
            )}
            <span className="text-center leading-tight">{option}</span>
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
    <label className="block text-sm font-medium text-brand-gray mb-2">{label}</label>
    <div className="grid grid-cols-2 gap-2">
      {options.map((option) => (
        <label key={option} className={`cursor-pointer text-center p-3 border rounded-md transition-all duration-200 text-sm flex items-center justify-center h-full ${
          selectedValue === option
            ? 'bg-brand-accent text-brand-dark border-brand-accent font-semibold'
            : 'bg-brand-dark/50 border-brand-border hover:border-brand-accent/50'
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.services.length === 0) {
        alert('Please select at least one service.');
        return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_FORM_ID}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          services: formData.services.join(', '), // Flatten array for better readability in email
          "_email.subject": `Nouveau lead iVISION de ${formData.name}`, // Custom subject for Formspark
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        // Fallback if the ID is wrong or service is down
        console.error("Form submission failed");
        setErrorMessage("Une erreur est survenue. Veuillez réessayer ou nous contacter directement par email.");
      }
    } catch (error) {
      console.error("Form submission error", error);
      setErrorMessage("Erreur de connexion. Veuillez vérifier votre internet.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
        className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
        onClick={onClose}
    >
      <div
        className="relative bg-brand-dark/90 backdrop-blur-md border border-brand-border text-brand-light p-8 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-brand-gray hover:text-brand-light text-2xl z-10">&times;</button>
        
        {isSubmitted ? (
            <div className="text-center p-8">
                 <div className="mx-auto bg-brand-accent/20 text-brand-accent w-20 h-20 rounded-full flex items-center justify-center mb-6 animate-fade-in-up">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                 </div>
                <h3 className="text-3xl font-bold mb-4 text-brand-light animate-fade-in-up" style={{animationDelay: '100ms'}}>{translations.form.successTitle}</h3>
                <p className="text-brand-gray text-lg animate-fade-in-up" style={{animationDelay: '200ms'}}>{translations.form.successMessage}</p>
                <button onClick={onClose} className="mt-8 bg-brand-border hover:bg-brand-gray/20 text-brand-light py-2 px-6 rounded-md transition-colors animate-fade-in-up" style={{animationDelay: '300ms'}}>
                  Fermer
                </button>
            </div>
        ) : (
            <>
                <h3 className="text-2xl font-bold mb-8 text-center">{translations.form.title}</h3>
                
                {errorMessage && (
                  <div className="bg-red-500/20 border border-red-500 text-red-200 p-4 rounded-md mb-6 text-center">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                    {/* Left Column: User Info */}
                    <div className="space-y-5">
                        <h4 className="text-lg font-semibold text-brand-light border-b border-brand-border pb-2">
                            {translations.form.yourInfoTitle}
                        </h4>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-brand-gray mb-1">{translations.form.nameLabel}</label>
                            <input id="name" type="text" name="name" placeholder={translations.form.namePlaceholder} value={formData.name} onChange={handleChange} className="w-full p-3 bg-brand-dark/50 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent" required disabled={isSubmitting} />
                        </div>
                        <div>
                            <label htmlFor="companyName" className="block text-sm font-medium text-brand-gray mb-1">{translations.form.companyNameLabel}</label>
                            <input id="companyName" type="text" name="companyName" placeholder={translations.form.companyNamePlaceholder} value={formData.companyName} onChange={handleChange} className="w-full p-3 bg-brand-dark/50 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent" disabled={isSubmitting} />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-brand-gray mb-1">{translations.form.emailLabel}</label>
                            <input id="email" type="email" name="email" placeholder={translations.form.emailPlaceholder} value={formData.email} onChange={handleChange} className="w-full p-3 bg-brand-dark/50 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent" required disabled={isSubmitting} />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-brand-gray mb-1">{translations.form.phoneLabel}</label>
                            <input id="phone" type="tel" name="phone" placeholder={translations.form.phonePlaceholder} value={formData.phone} onChange={handleChange} className="w-full p-3 bg-brand-dark/50 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent" disabled={isSubmitting} />
                        </div>
                    </div>

                    {/* Right Column: Project Info */}
                    <div className="space-y-5">
                        <h4 className="text-lg font-semibold text-brand-light border-b border-brand-border pb-2">
                           {translations.form.projectInfoTitle}
                        </h4>
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
                     {/* Project Description - Full Width */}
                    <div className="md:col-span-2">
                        <label htmlFor="project" className="block text-sm font-medium text-brand-gray mb-1">{translations.form.projectLabel}</label>
                        <textarea id="project" name="project" placeholder={translations.form.projectPlaceholder} value={formData.project} onChange={handleChange} rows={4} className="w-full p-3 bg-brand-dark/50 border border-brand-border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-accent" required disabled={isSubmitting}></textarea>
                    </div>

                  </div>
                  <div className="mt-8 text-center">
                    <button 
                        type="submit" 
                        disabled={isSubmitting}
                        className={`w-full md:w-auto bg-brand-accent text-brand-dark font-bold py-3 px-12 rounded-md transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:opacity-90 hover:scale-105'}`}
                    >
                        {isSubmitting ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-brand-dark" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                ...
                            </span>
                        ) : translations.form.cta}
                    </button>
                  </div>
                </form>
            </>
        )}
      </div>
    </div>
  );
};

export default QuoteForm;