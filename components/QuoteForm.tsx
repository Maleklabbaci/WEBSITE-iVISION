import React, { useState, useEffect } from 'react';
import { FORMSPARK_ID } from '../lib/config';

interface QuoteFormProps {
  translations: { form?: any; };
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
    email: '',
    company: '',
    businessType: '',
    otherBusinessType: '',
    problems: [] as string[],
    otherProblem: '',
    projectDescription: '',
    onlinePresence: '',
    businessAge: '',
    hasPaidAds: '',
    timeline: '',
    budget: '',
  });
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');

  const t = translations?.form || {};
  
  // Fallback translations
  const labels = {
    nameLabel: t.nameLabel || 'Votre nom complet',
    phoneLabel: t.phoneLabel || 'Numéro WhatsApp',
    emailLabel: t.emailLabel || 'Email',
    emailOptional: t.emailOptional || '(Optionnel)',
    companyLabel: t.companyLabel || 'Nom de l\'entreprise',
    businessTypeLabel: t.businessTypeLabel || 'Type d\'activité',
    businessTypeOptions: t.businessTypeOptions || ['PME', 'E-commerce', 'Crèche', 'Centre de formation', 'Autre'],
    blocagesLabel: t.blocagesLabel || 'Vos blocages',
    blocagesOptions: t.blocagesOptions || ['Pas de visibilité en ligne', 'Génération de leads faible', 'Mauvaise conversion', 'Besoin de croissance', 'Concurrence forte', 'Autre'],
    projectDescriptionLabel: t.projectDescriptionLabel || 'Description du projet',
    projectDescriptionPlaceholder: t.projectDescriptionPlaceholder || 'Décrivez brièvement votre besoin...',
    onlinePresenceNewLabel: t.onlinePresenceNewLabel || 'Présence en ligne actuelle',
    onlinePresenceNewOptions: t.onlinePresenceNewOptions || ['Pas de présence', 'Site vitrine', 'Présence active'],
    businessAgeNewLabel: t.businessAgeNewLabel || 'Ancienneté de l\'entreprise',
    businessAgeNewOptions: t.businessAgeNewOptions || ['0-1 an', '1-3 ans', '3+ ans'],
    paidAdsNewLabel: t.paidAdsNewLabel || 'Publicités payantes',
    paidAdsNewOptions: t.paidAdsNewOptions || ['Jamais', 'Peu d\'expérience', 'Expérience confirmée'],
    timelineLabel: t.timelineLabel || 'Timeline d\'engagement',
    timelineOptions: t.timelineOptions || ['Immédiat (< 1 mois)', '1-3 mois', '3-6 mois', 'Sans urgence'],
    budgetMonthlyLabel: t.budgetMonthlyLabel || 'Budget mensuel',
    budgetMonthlyOptions: t.budgetMonthlyOptions || ['30-50k DA', '50-100k DA', '100-200k DA', '200k+ DA'],
    summaryLabel: t.summaryLabel || 'Résumé de votre demande',
    contactInfoLabel: t.contactInfoLabel || 'Contact',
    profileLabel: t.profileLabel || 'Profil',
    needLabel: t.needLabel || 'Besoin',
    engagementLabel: t.engagementLabel || 'Engagement',
    projectDetailsLabel: t.projectDetailsLabel || 'Détails du projet',
    submitButtonText: t.submitButtonText || 'Envoyer mon devis',
    back: t.back || 'RETOUR',
    next: t.next || 'SUIVANT',
    successTitle: t.successTitle || 'DEMANDE VALIDÉE !',
    successMessage: t.successMessage || 'Un expert vous contactera sur WhatsApp sous 2h.',
    backToHome: t.backToHome || 'Retour à l\'accueil',
    phoneError: t.phoneError || 'Le numéro doit contenir exactement 10 chiffres',
    networkError: t.networkError || 'Une erreur est survenue. Vérifiez votre connexion et réessayez.',
    multipleChoice: t.multipleChoice || 'plusieurs choix possibles',
    otherActivityLabel: t.otherActivityLabel || 'Précisez votre activité',
    otherSpecify: t.otherSpecify || 'Précisez votre activité...',
    otherProblemLabel: t.otherProblemLabel || 'Précisez votre blocage',
  };

  useEffect(() => {
    const hashParts = window.location.hash.split('?');
    if (hashParts.length > 1) {
      const urlParams = new URLSearchParams(hashParts[1]);
      const packName = urlParams.get('pack');
      if (packName) {
        setFormData(prev => ({ ...prev, pack: packName.toUpperCase() }));
      }
    }
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: digits });
    if (digits.length > 0 && digits.length !== 10) {
      setPhoneError(labels.phoneError);
    } else {
      setPhoneError('');
    }
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.name.trim() || !formData.phone.trim()) return;
      if (formData.phone.length !== 10) {
        setPhoneError(labels.phoneError);
        return;
      }
    }
    if (step === 2 && (!formData.company.trim() || !formData.businessType)) return;
    if (step === 2 && formData.businessType === labels.businessTypeOptions[labels.businessTypeOptions.length - 1] && !formData.otherBusinessType.trim()) return;
    if (step === 3 && (formData.problems.length === 0 || !formData.projectDescription.trim())) return;
    if (step === 3 && formData.problems.includes(labels.blocagesOptions[labels.blocagesOptions.length - 1]) && !formData.otherProblem.trim()) return;
    if (step === 4 && (!formData.onlinePresence || !formData.businessAge || !formData.hasPaidAds || !formData.timeline)) return;
    if (step === 5 && !formData.budget) return;

    if (step < 5) {
      setStep(prev => prev + 1);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    if (step > 1) {
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
        otherProblem: opt === labels.blocagesOptions[labels.blocagesOptions.length - 1] && exists ? '' : prev.otherProblem,
      };
    });
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    const businessTypeLabel = formData.businessType === labels.businessTypeOptions[labels.businessTypeOptions.length - 1] ? `Autre: ${formData.otherBusinessType}` : formData.businessType;
    const problemsLabel = formData.problems.map(p => p === labels.blocagesOptions[labels.blocagesOptions.length - 1] ? `Autre: ${formData.otherProblem}` : p).join(', ');

    const submissionData = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email || 'Non fourni',
      company: formData.company,
      businessType: businessTypeLabel,
      problems: problemsLabel,
      projectDescription: formData.projectDescription,
      onlinePresence: formData.onlinePresence,
      businessAge: formData.businessAge,
      hasPaidAds: formData.hasPaidAds,
      timeline: formData.timeline,
      budget: formData.budget,
      _subject: `DEVIS PACK MENSUEL : ${formData.name}`,
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
            content_name: 'Devis Pack Mensuel',
            business_type: businessTypeLabel,
            budget: formData.budget,
            timeline: formData.timeline,
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
          <h2 className="text-4xl font-black mb-4 text-navy dark:text-white uppercase tracking-tighter">{labels.successTitle}</h2>
          <p className="text-brand-gray text-lg font-medium mb-10 opacity-80 leading-relaxed">{labels.successMessage}</p>
          <button onClick={() => window.location.hash = ''} className="btn-ivision w-full py-5">{labels.backToHome}</button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full p-6 bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-navy dark:text-white font-bold text-lg placeholder:opacity-30";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-4 ml-2";
  const cardClass = (selected: boolean) => `relative p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-start justify-between h-full group ${selected ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10' : 'bg-navy/5 dark:bg-white/5 border-navy/5 dark:border-white/5 hover:border-brand-blue/30'}`;

  return (
    <div className="min-h-screen bg-white dark:bg-transparent transition-colors duration-500 py-24 md:py-32">
      <div className="container max-w-4xl">
        <div className="mb-12 flex items-center justify-between">
          <button onClick={handleBack} className="text-navy/40 dark:text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
            <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            <span className="text-[10px] font-black tracking-widest uppercase">{labels.back}</span>
          </button>
          <div className="flex gap-2 w-40">
            {[1, 2, 3, 4, 5].map(i => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-blue' : 'bg-navy/10 dark:bg-white/10'}`}></div>
            ))}
          </div>
        </div>

        <form onSubmit={step === 5 ? onSubmit : (e) => { e.preventDefault(); handleNext(); }} className="space-y-8">
          <div>
            {/* ─── STEP 1 ─── */}
            {step === 1 && (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <label className={labelClass}>{labels.nameLabel} <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder={labels.nameLabel}
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className={inputClass}
                    autoFocus
                  />
                </div>

                <div>
                  <label className={labelClass}>{labels.phoneLabel} <span className="text-red-400">*</span></label>
                  <input
                    type="tel"
                    placeholder="0561234567"
                    value={formData.phone}
                    onChange={handlePhoneChange}
                    maxLength={10}
                    className={`${inputClass} ${phoneError ? 'border-red-500/50' : ''}`}
                  />
                  {phoneError && <p className="mt-2 ml-2 text-[11px] font-bold text-red-500 uppercase tracking-wide">⚠ {phoneError}</p>}
                </div>

                <div>
                  <label className={labelClass}>{labels.emailLabel} <span className="text-white/30 font-medium text-[8px]">{labels.emailOptional}</span></label>
                  <input
                    type="email"
                    placeholder="contact@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className={inputClass}
                  />
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.name.trim() || !formData.phone.trim() || phoneError}
                  className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group"
                >
                  <span>{labels.next}</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
                </button>
              </div>
            )}

            {/* ─── STEP 2 ─── */}
            {step === 2 && (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <label className={labelClass}>{labels.companyLabel} <span className="text-red-400">*</span></label>
                  <input
                    type="text"
                    placeholder={labels.companyLabel}
                    value={formData.company}
                    onChange={e => setFormData({ ...formData, company: e.target.value })}
                    className={inputClass}
                    autoFocus
                  />
                </div>

                <div>
                  <label className={labelClass}>{labels.businessTypeLabel} <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {labels.businessTypeOptions.map((opt: string) => (
                      <div key={opt} onClick={() => setFormData({ ...formData, businessType: opt, otherBusinessType: '' })} className={cardClass(formData.businessType === opt)}>
                        <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                        {formData.businessType === opt && (
                          <div className="absolute top-4 right-4 text-brand-blue">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {formData.businessType === labels.businessTypeOptions[labels.businessTypeOptions.length - 1] && (
                  <div className="animate-fade-in-up">
                    <label className={labelClass}>{labels.otherActivityLabel} <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder={labels.otherSpecify}
                      value={formData.otherBusinessType}
                      onChange={e => setFormData({ ...formData, otherBusinessType: e.target.value })}
                      className={inputClass}
                      autoFocus
                    />
                  </div>
                )}

                <button
                  onClick={handleNext}
                  disabled={!formData.company.trim() || !formData.businessType || (formData.businessType === labels.businessTypeOptions[labels.businessTypeOptions.length - 1] && !formData.otherBusinessType.trim())}
                  className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group"
                >
                  <span>{labels.next}</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
                </button>
              </div>
            )}

            {/* ─── STEP 3 ─── */}
            {step === 3 && (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <label className={labelClass}>
                    {labels.blocagesLabel} <span className="ml-2 text-white/30 font-medium normal-case tracking-normal text-[9px]">{labels.multipleChoice}</span>
                    <span className="text-red-400 ml-2">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {labels.blocagesOptions.map((opt: string) => (
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
                </div>

                {formData.problems.includes(labels.blocagesOptions[labels.blocagesOptions.length - 1]) && (
                  <div className="animate-fade-in-up">
                    <label className={labelClass}>{labels.otherProblemLabel} <span className="text-red-400">*</span></label>
                    <input
                      type="text"
                      placeholder={labels.otherProblemLabel}
                      value={formData.otherProblem}
                      onChange={e => setFormData({ ...formData, otherProblem: e.target.value })}
                      className={inputClass}
                      autoFocus
                    />
                  </div>
                )}

                <div>
                  <label className={labelClass}>{labels.projectDescriptionLabel} <span className="text-red-400">*</span></label>
                  <textarea
                    placeholder={labels.projectDescriptionPlaceholder}
                    value={formData.projectDescription}
                    onChange={e => setFormData({ ...formData, projectDescription: e.target.value })}
                    className={`${inputClass} min-h-32 resize-none`}
                    maxLength={500}
                  />
                  <p className="mt-2 ml-2 text-[10px] text-brand-gray/60">{formData.projectDescription.length}/500</p>
                </div>

                <button
                  onClick={handleNext}
                  disabled={formData.problems.length === 0 || !formData.projectDescription.trim() || (formData.problems.includes(labels.blocagesOptions[labels.blocagesOptions.length - 1]) && !formData.otherProblem.trim())}
                  className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group"
                >
                  <span>{labels.next}</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
                </button>
              </div>
            )}

            {/* ─── STEP 4 ─── */}
            {step === 4 && (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <label className={labelClass}>{labels.onlinePresenceNewLabel} <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {labels.onlinePresenceNewOptions.map((opt: string) => (
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

                <div>
                  <label className={labelClass}>{labels.businessAgeNewLabel} <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {labels.businessAgeNewOptions.map((opt: string) => (
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

                <div>
                  <label className={labelClass}>{labels.paidAdsNewLabel} <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {labels.paidAdsNewOptions.map((opt: string) => (
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

                <div>
                  <label className={labelClass}>{labels.timelineLabel} <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {labels.timelineOptions.map((opt: string) => (
                      <div key={opt} onClick={() => setFormData({ ...formData, timeline: opt })} className={cardClass(formData.timeline === opt)}>
                        <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                        {formData.timeline === opt && (
                          <div className="absolute top-4 right-4 text-brand-blue">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  disabled={!formData.onlinePresence || !formData.businessAge || !formData.hasPaidAds || !formData.timeline}
                  className="btn-ivision w-full py-6 disabled:opacity-30 disabled:pointer-events-none group"
                >
                  <span>{labels.next}</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" strokeWidth="3" /></svg>
                </button>
              </div>
            )}

            {/* ─── STEP 5 : BUDGET + RÉSUMÉ ─── */}
            {step === 5 && (
              <div className="space-y-12 animate-fade-in-up">
                <div>
                  <label className={labelClass}>{labels.budgetMonthlyLabel} <span className="text-red-400">*</span></label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {labels.budgetMonthlyOptions.map((opt: string) => (
                      <div key={opt} onClick={() => setFormData({ ...formData, budget: opt })} className={cardClass(formData.budget === opt)}>
                        <span className="text-xs font-bold uppercase text-navy dark:text-white">{opt}</span>
                        {formData.budget === opt && (
                          <div className="absolute top-4 right-4 text-brand-blue">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl p-8 space-y-6">
                  <div className="text-center mb-8">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-2">{labels.summaryLabel}</p>
                    <h3 className="text-2xl font-black text-navy dark:text-white">{formData.company}</h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-brand-blue/60 mb-1">{labels.contactInfoLabel}</p>
                      <p className="text-navy dark:text-white font-bold">{formData.name}</p>
                      <p className="text-navy/60 dark:text-white/60">{formData.phone}{formData.email ? ` • ${formData.email}` : ''}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-brand-blue/60 mb-1">{labels.profileLabel}</p>
                      <p className="text-navy dark:text-white font-bold">{formData.businessType === labels.businessTypeOptions[labels.businessTypeOptions.length - 1] ? formData.otherBusinessType : formData.businessType}</p>
                      <p className="text-navy/60 dark:text-white/60">{formData.businessAge} • {formData.hasPaidAds}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-brand-blue/60 mb-1">{labels.needLabel}</p>
                      <p className="text-navy dark:text-white font-bold truncate">{formData.problems.join(', ')}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest text-brand-blue/60 mb-1">{labels.engagementLabel}</p>
                      <p className="text-navy dark:text-white font-bold">{formData.timeline} • {formData.budget}</p>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-navy/10 dark:border-white/10">
                    <p className="text-[8px] font-black uppercase tracking-widest text-brand-blue/60 mb-2">{labels.projectDetailsLabel}</p>
                    <p className="text-navy dark:text-white text-sm leading-relaxed opacity-80">{formData.projectDescription}</p>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">
                    {labels.networkError}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting' || !formData.budget}
                  className="btn-ivision w-full py-8 text-xl disabled:opacity-30 disabled:pointer-events-none"
                >
                  {status === 'submitting' ? '...' : labels.submitButtonText}
                </button>
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteForm;
