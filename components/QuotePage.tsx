import { useEffect, useState } from 'react';
import { navigate } from '../lib/router';
import { updateSEO } from '../lib/seo-utils';
import { Language, translations } from '../lib/translations';

interface QuotePageProps {
  language: Language;
}

const QuotePage: React.FC<QuotePageProps> = ({ language }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const t = translations[language] || translations['fr'];
  const serviceLabels = {
    fr: {
      'site-web': 'Création de site web',
      'marketing-digital': 'Marketing digital',
      'branding': 'Branding & identité visuelle',
      'video': 'Production vidéo',
      'seo': 'SEO & référencement',
      'social-media': 'Réseaux sociaux',
      'autre': 'Autre'
    },
    en: {
      'site-web': 'Website Creation',
      'marketing-digital': 'Digital Marketing',
      'branding': 'Branding & Visual Identity',
      'video': 'Video Production',
      'seo': 'SEO & Referencing',
      'social-media': 'Social Media',
      'autre': 'Other'
    },
    ar: {
      'site-web': 'إنشاء موقع إلكتروني',
      'marketing-digital': 'التسويق الرقمي',
      'branding': 'العلامة التجارية والهوية البصرية',
      'video': 'إنتاج الفيديو',
      'seo': 'تحسين محركات البحث',
      'social-media': 'وسائل التواصل الاجتماعي',
      'autre': 'أخرى'
    }
  };

  const budgetLabels = {
    fr: ['< 100,000 DZD', '100,000 - 300,000 DZD', '300,000 - 500,000 DZD', '500,000 - 1,000,000 DZD', '> 1,000,000 DZD'],
    en: ['< 100,000 DZD', '100,000 - 300,000 DZD', '300,000 - 500,000 DZD', '500,000 - 1,000,000 DZD', '> 1,000,000 DZD'],
    ar: ['< 100,000 دج', '100,000 - 300,000 دج', '300,000 - 500,000 دج', '500,000 - 1,000,000 دج', '> 1,000,000 دج']
  };

  const serviceOptions = {
    fr: ['Création de site web', 'Marketing digital', 'Branding & identité visuelle', 'Production vidéo', 'SEO & référencement', 'Réseaux sociaux', 'Autre'],
    en: ['Website Creation', 'Digital Marketing', 'Branding & Visual Identity', 'Video Production', 'SEO & Referencing', 'Social Media', 'Other'],
    ar: ['إنشاء موقع إلكتروني', 'التسويق الرقمي', 'العلامة التجارية والهوية البصرية', 'إنتاج الفيديو', 'تحسين محركات البحث', 'وسائل التواصل الاجتماعي', 'أخرى']
  };

  const langText = {
    fr: {
      back: '← Retour',
      title: 'Demandez votre',
      titleHighlight: 'devis gratuit',
      subtitle: 'Réponse garantie en 24h. Consultation de 60 min offerte. Sans engagement.',
      nameLabel: 'Nom complet *',
      namePlaceholder: 'Votre nom',
      emailLabel: 'Email *',
      emailPlaceholder: 'votre@email.com',
      phoneLabel: 'Téléphone *',
      phonePlaceholder: '05XX XX XX XX',
      companyLabel: 'Entreprise',
      companyPlaceholder: 'Nom de votre entreprise',
      serviceLabel: 'Service souhaité *',
      selectService: 'Sélectionnez un service',
      budgetLabel: 'Budget estimé',
      selectBudget: 'Sélectionnez votre budget',
      messageLabel: 'Décrivez votre projet *',
      messagePlaceholder: 'Parlez-nous de votre projet, vos objectifs, vos délais...',
      submitButton: 'Envoyer ma demande via WhatsApp →',
      disclaimer: 'En soumettant, vous serez redirigé vers WhatsApp pour finaliser votre demande. Réponse en 24h garantie.',
      phone: '📞 Téléphone',
      whatsapp: '💬 WhatsApp',
      whatsappText: 'Chat direct',
      email: '📧 Email',
      successTitle: 'Demande envoyée !',
      successMessage: 'Merci ! Nous vous répondrons dans les 24 heures. Vérifiez aussi WhatsApp.',
      backHome: 'Retour à l\'accueil'
    },
    en: {
      back: '← Back',
      title: 'Request your',
      titleHighlight: 'free quote',
      subtitle: 'Response guaranteed within 24 hours. 60-minute consultation offered. No commitment.',
      nameLabel: 'Full Name *',
      namePlaceholder: 'Your name',
      emailLabel: 'Email *',
      emailPlaceholder: 'your@email.com',
      phoneLabel: 'Phone *',
      phonePlaceholder: '+213 5XX XX XX XX',
      companyLabel: 'Company',
      companyPlaceholder: 'Your company name',
      serviceLabel: 'Desired Service *',
      selectService: 'Select a service',
      budgetLabel: 'Estimated Budget',
      selectBudget: 'Select your budget',
      messageLabel: 'Describe your project *',
      messagePlaceholder: 'Tell us about your project, objectives, timeline...',
      submitButton: 'Send my request via WhatsApp →',
      disclaimer: 'By submitting, you will be redirected to WhatsApp to complete your request. Response guaranteed within 24 hours.',
      phone: '📞 Phone',
      whatsapp: '💬 WhatsApp',
      whatsappText: 'Direct chat',
      email: '📧 Email',
      successTitle: 'Request sent!',
      successMessage: 'Thank you! We will reply within 24 hours. Check WhatsApp as well.',
      backHome: 'Back to home'
    },
    ar: {
      back: '← رجوع',
      title: 'اطلب',
      titleHighlight: 'عرض سعر مجاني',
      subtitle: 'ضمان الرد خلال 24 ساعة. استشارة مجانية 60 دقيقة. بدون التزام.',
      nameLabel: 'الاسم الكامل *',
      namePlaceholder: 'اسمك',
      emailLabel: 'البريد الإلكتروني *',
      emailPlaceholder: 'your@email.com',
      phoneLabel: 'الهاتف *',
      phonePlaceholder: '+213 5XX XX XX XX',
      companyLabel: 'الشركة',
      companyPlaceholder: 'اسم شركتك',
      serviceLabel: 'الخدمة المطلوبة *',
      selectService: 'اختر خدمة',
      budgetLabel: 'الميزانية المقدرة',
      selectBudget: 'اختر ميزانيتك',
      messageLabel: 'صف مشروعك *',
      messagePlaceholder: 'أخبرنا عن مشروعك وأهدافك...',
      submitButton: 'أرسل طلبي عبر واتساب ←',
      disclaimer: 'بالإرسال، ستتم إعادة توجيهك إلى واتساب لإكمال طلبك. ضمان الرد خلال 24 ساعة.',
      phone: '📞 الهاتف',
      whatsapp: '💬 واتساب',
      whatsappText: 'محادثة مباشرة',
      email: '📧 البريد الإلكتروني',
      successTitle: 'تم إرسال الطلب!',
      successMessage: 'شكراً! سنرد عليك في غضون 24 ساعة. تحقق من واتساب أيضاً.',
      backHome: 'العودة للرئيسية'
    }
  };

  const text = langText[language];

  useEffect(() => {
    updateSEO({
      title: language === 'fr' ? 'Demander un Devis Gratuit' : language === 'en' ? 'Request a Free Quote' : 'اطلب عرض سعر مجاني',
      description: language === 'fr' ? 'Demandez votre devis gratuit pour votre projet web, marketing digital ou branding. Réponse en 24h garantie.' : language === 'en' ? 'Request your free quote for your web project, digital marketing or branding. Guaranteed 24-hour response.' : 'اطلب عرض السعر المجاني الخاص بك لمشروعك. ضمان الرد في 24 ساعة.',
      canonical: 'https://ivision-agency.com/quote',
    });
    window.scrollTo(0, 0);
  }, [language]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const message = `🔔 *${language === 'fr' ? 'Nouvelle demande de devis' : language === 'en' ? 'New quote request' : 'طلب عرض سعر جديد'}*
    
👤 *${language === 'fr' ? 'Nom' : language === 'en' ? 'Name' : 'الاسم'} :* ${formData.name}
📧 *${language === 'fr' ? 'Email' : 'Email'} :* ${formData.email}
📞 *${language === 'fr' ? 'Tél' : language === 'en' ? 'Phone' : 'الهاتف'} :* ${formData.phone}
🏢 *${language === 'fr' ? 'Entreprise' : language === 'en' ? 'Company' : 'الشركة'} :* ${formData.company || (language === 'fr' ? 'Non spécifié' : language === 'en' ? 'Not specified' : 'غير محدد')}
🎯 *${language === 'fr' ? 'Service' : language === 'en' ? 'Service' : 'الخدمة'} :* ${formData.service}
💰 *${language === 'fr' ? 'Budget' : 'Budget'} :* ${formData.budget}
📝 *${language === 'fr' ? 'Message' : language === 'en' ? 'Message' : 'الرسالة'} :* ${formData.message}`;

    const whatsappUrl = `https://wa.me/213563839404?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <section className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center max-w-lg">
          <span className="text-6xl block mb-6">✅</span>
          <h1 className="text-3xl font-bold text-white mb-4">{text.successTitle}</h1>
          <p className="text-gray-400 mb-8">
            {text.successMessage}
          </p>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition"
          >
            {text.backHome}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className={`min-h-screen bg-black pt-32 pb-20 px-4 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-white transition mb-6 inline-flex items-center gap-2"
          >
            {text.back}
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {text.title}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
              {text.titleHighlight}
            </span>
          </h1>
          <p className="text-gray-400 text-lg">
            {text.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className={`grid md:grid-cols-2 gap-6 ${language === 'ar' ? 'flex flex-col-reverse' : ''}`}>
            {/* Name */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {text.nameLabel}
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder={text.namePlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {text.emailLabel}
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder={text.emailPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {text.phoneLabel}
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder={text.phonePlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>

            {/* Company */}
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                {text.companyLabel}
              </label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder={text.companyPlaceholder}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          {/* Service */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {text.serviceLabel}
            </label>
            <select
              name="service"
              required
              value={formData.service}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition appearance-none"
            >
              <option value="" className="bg-gray-900">{text.selectService}</option>
              {serviceOptions[language].map((service, idx) => (
                <option key={idx} value={service} className="bg-gray-900">{service}</option>
              ))}
            </select>
          </div>

          {/* Budget */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {text.budgetLabel}
            </label>
            <select
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition appearance-none"
            >
              <option value="" className="bg-gray-900">{text.selectBudget}</option>
              {budgetLabels[language].map((budget, idx) => (
                <option key={idx} value={budget} className="bg-gray-900">{budget}</option>
              ))}
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              {text.messageLabel}
            </label>
            <textarea
              name="message"
              required
              rows={5}
              value={formData.message}
              onChange={handleChange}
              placeholder={text.messagePlaceholder}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:shadow-lg hover:shadow-purple-500/25 transition"
          >
            {text.submitButton}
          </button>

          <p className="text-gray-500 text-sm text-center">
            {text.disclaimer}
          </p>
        </form>

        {/* Contact direct */}
        <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
          <a href="tel:+213563839404" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-purple-500/30 transition">
            <span className="text-2xl block mb-2">📞</span>
            <span className="text-white font-medium block">{text.phone}</span>
            <span className="text-gray-400 text-sm">+213 563 839 404</span>
          </a>
          <a href="https://wa.me/213563839404" target="_blank" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-green-500/30 transition">
            <span className="text-2xl block mb-2">💬</span>
            <span className="text-white font-medium block">{text.whatsapp}</span>
            <span className="text-gray-400 text-sm">{text.whatsappText}</span>
          </a>
          <a href="mailto:contact@ivision-agency.com" className="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-blue-500/30 transition">
            <span className="text-2xl block mb-2">📧</span>
            <span className="text-white font-medium block">{text.email}</span>
            <span className="text-gray-400 text-sm">contact@ivision.dz</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default QuotePage;
