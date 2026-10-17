import React, { useState } from 'react';
import { FORMSPARK_ID, WHATSAPP_NUMBER } from '../lib/config';
import { trackEvent } from '../lib/analytics';
import type { Language } from '../lib/translations';

export type WebQuoteDetails = {
  name: string;
  phone: string;
  email: string;
  company: string;
  siteType: string;
  currentSite: string;
  projectDescription: string;
  timeline: string;
  budget: string;
};

export const countPhoneDigits = (phone: string) => phone
  .replace(/[٠-٩]/g, (digit) => String(digit.charCodeAt(0) - 0x0660))
  .replace(/[۰-۹]/g, (digit) => String(digit.charCodeAt(0) - 0x06f0))
  .replace(/\D/g, '').length;

export type WebQuoteValidationError = 'name' | 'phone' | 'project' | null;
export const validateWebQuoteDetails = (details: WebQuoteDetails): WebQuoteValidationError => {
  if (!details.name.trim()) return 'name';
  const digits = countPhoneDigits(details.phone);
  if (digits < 8 || digits > 15) return 'phone';
  if (details.projectDescription.trim().length < 15) return 'project';
  return null;
};

export const buildWebQuotePayload = (details: WebQuoteDetails) => ({
  name: details.name.trim(),
  phone: details.phone.trim(),
  email: details.email.trim() || 'Non fourni',
  company: details.company.trim() || 'Non fourni',
  service: 'Création de site web',
  siteType: details.siteType,
  currentSite: details.currentSite.trim() || 'Non fourni',
  projectDescription: details.projectDescription.trim(),
  timeline: details.timeline || 'À définir',
  budget: details.budget.trim() || 'À définir',
  _subject: `DEVIS SITE WEB : ${details.name.trim()}`,
});

const copy = {
  fr: {
    eyebrow: 'iVISION / Projet web en Algérie', title: 'Parlons de votre site.', intro: 'Un site vitrine, une boutique ou une refonte ? Décrivez votre besoin. Ici, pas de budget mensuel imposé pour demander un devis de création de site.',
    returnLink: 'Retour à la création de sites web', name: 'Votre nom', phone: 'Téléphone / WhatsApp', email: 'Adresse e-mail', company: 'Entreprise ou projet', optional: '(facultatif)',
    siteType: 'Quel type de site ?', siteTypes: ['Site vitrine', 'Boutique en ligne', 'Page de campagne', 'Refonte de site', 'Je ne sais pas encore'],
    select: 'Choisir une option', currentSite: 'Site actuel, si vous en avez un', currentSitePlaceholder: 'exemple.dz',
    project: 'Que doit permettre votre site ?', projectPlaceholder: 'Présentez votre activité, les pages ou fonctions souhaitées et ce que les visiteurs doivent pouvoir faire.',
    timeline: 'Quand souhaitez-vous démarrer ?', timelines: ['Dès que possible', 'Dans les prochains mois', 'À définir ensemble'],
    budget: 'Enveloppe prévue pour le projet', budgetPlaceholder: 'Si vous avez déjà une idée, sinon laissez vide',
    consent: 'J’accepte que mes coordonnées et mon message soient utilisés pour répondre à ma demande.', policy: 'Lire la politique de confidentialité',
    submit: 'Envoyer ma demande de site web', sending: 'Envoi en cours…', nameError: 'Indiquez votre nom.', phoneError: 'Indiquez un numéro joignable (8 à 15 chiffres).', projectError: 'Décrivez votre projet en au moins 15 caractères.',
    sendError: 'L’envoi n’a pas abouti. Réessayez ou contactez-nous directement par e-mail ou WhatsApp.',
    successTitle: 'Votre demande est envoyée.', successBody: 'Merci ! Nous avons reçu les informations sur votre projet web. Vous pouvez revenir à l’offre ou nous écrire directement.',
    emailLink: 'Écrire par e-mail', whatsappLink: 'Discuter sur WhatsApp', noPromise: 'Un devis précise le périmètre, le calendrier et les éventuels frais d’hébergement ou de maintenance avant tout engagement.',
  },
  en: {
    eyebrow: 'iVISION / Website project in Algeria', title: 'Tell us about your website.', intro: 'A business site, online shop or redesign? Describe your project. A monthly advertising budget is not required to request a website quote.',
    returnLink: 'Back to website creation (FR)', name: 'Your name', phone: 'Phone / WhatsApp', email: 'Email address', company: 'Company or project', optional: '(optional)',
    siteType: 'What kind of site?', siteTypes: ['Business website', 'Online shop', 'Campaign page', 'Website redesign', 'Not sure yet'],
    select: 'Select an option', currentSite: 'Current website, if you have one', currentSitePlaceholder: 'example.com',
    project: 'What should your site help visitors do?', projectPlaceholder: 'Tell us about your business, the pages or features you need and your visitors’ goals.',
    timeline: 'When would you like to start?', timelines: ['As soon as possible', 'In the coming months', 'Let’s discuss'],
    budget: 'Estimated project budget', budgetPlaceholder: 'If you have one; otherwise leave blank',
    consent: 'I agree that my contact details and message may be used to answer my request.', policy: 'Read the privacy policy (FR)',
    submit: 'Send my website request', sending: 'Sending…', nameError: 'Please enter your name.', phoneError: 'Enter a reachable phone number (8 to 15 digits).', projectError: 'Describe your project in at least 15 characters.',
    sendError: 'The request could not be sent. Please try again or contact us by email or WhatsApp.',
    successTitle: 'Your request has been sent.', successBody: 'Thank you! We received the details about your website project. You can return to the service page or contact us directly.',
    emailLink: 'Send an email', whatsappLink: 'Chat on WhatsApp', noPromise: 'The proposal defines the scope, schedule and any hosting or maintenance costs before you commit.',
  },
  ar: {
    eyebrow: 'آيفيجن / مشروع موقع في الجزائر', title: 'لنتحدث عن موقعك.', intro: 'موقع تعريفي أو متجر إلكتروني أو تجديد موقع؟ اشرح مشروعك. لا نطلب ميزانية إعلانات شهرية لطلب عرض إنشاء موقع.',
    returnLink: 'العودة إلى خدمة إنشاء المواقع (بالفرنسية)', name: 'الاسم', phone: 'الهاتف / واتساب', email: 'البريد الإلكتروني', company: 'الشركة أو المشروع', optional: '(اختياري)',
    siteType: 'ما نوع الموقع؟', siteTypes: ['موقع تعريفي', 'متجر إلكتروني', 'صفحة حملة', 'تجديد موقع', 'لم أحدد بعد'],
    select: 'اختر نوع الموقع', currentSite: 'موقعك الحالي إن وجد', currentSitePlaceholder: 'example.dz',
    project: 'ماذا تريد أن يفعل الزائر في موقعك؟', projectPlaceholder: 'صف نشاطك والصفحات أو الوظائف التي تحتاجها وما الذي يجب أن يجده الزائر.',
    timeline: 'متى ترغب في البدء؟', timelines: ['في أقرب وقت', 'خلال الأشهر القادمة', 'نحدده معاً'],
    budget: 'الميزانية التقريبية للمشروع', budgetPlaceholder: 'إذا كانت لديك فكرة، أو اترك الخانة فارغة',
    consent: 'أوافق على استخدام بيانات الاتصال ورسالتي للرد على طلبي.', policy: 'قراءة سياسة الخصوصية (بالفرنسية)',
    submit: 'إرسال طلب موقع', sending: 'جارٍ الإرسال…', nameError: 'أدخل اسمك.', phoneError: 'أدخل رقم هاتف صالحاً للتواصل (من 8 إلى 15 رقماً).', projectError: 'اشرح مشروعك في 15 حرفاً على الأقل.',
    sendError: 'تعذر إرسال الطلب. حاول مجدداً أو تواصل معنا بالبريد أو واتساب.',
    successTitle: 'تم إرسال طلبك.', successBody: 'شكراً! استلمنا معلومات مشروع موقعك. يمكنك العودة إلى صفحة الخدمة أو التواصل معنا مباشرة.',
    emailLink: 'إرسال بريد إلكتروني', whatsappLink: 'التحدث على واتساب', noPromise: 'يوضح العرض نطاق العمل والجدول الزمني وتكاليف الاستضافة أو الصيانة إن وجدت قبل الاتفاق.',
  },
} as const;

const blankDetails: WebQuoteDetails = {
  name: '', phone: '', email: '', company: '', siteType: '', currentSite: '', projectDescription: '', timeline: '', budget: '',
};

const WebProjectQuoteForm: React.FC<{ language: Language; onOpenPolicy: () => void }> = ({ language, onOpenPolicy }) => {
  const t = copy[language];
  const [details, setDetails] = useState<WebQuoteDetails>(blankDetails);
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [website, setWebsite] = useState(''); // Honeypot distinct de l'adresse du site actuel.
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const [validationError, setValidationError] = useState<WebQuoteValidationError>(null);

  const update = <K extends keyof WebQuoteDetails>(key: K, value: WebQuoteDetails[K]) => {
    setDetails((previous) => ({ ...previous, [key]: value }));
    if (status === 'error') setStatus('idle');
    setValidationError(null);
  };

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Bonjour iVISION, je souhaite discuter de la création d’un site web.')}`;
  const emailUrl = 'mailto:contact@ivision.agency?subject=Demande%20de%20site%20web';

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (status === 'submitting' || website.trim()) return;
    if (!privacyConsent) return;
    const invalidField = validateWebQuoteDetails(details);
    if (invalidField) {
      setValidationError(invalidField);
      document.getElementById(`web-quote-${invalidField}`)?.focus();
      return;
    }

    setStatus('submitting');
    try {
      const response = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(buildWebQuotePayload(details)),
      });
      if (!response.ok) throw new Error('Le formulaire n’a pas été accepté.');
      trackEvent('lead_submit', { source: 'website_quote_form', site_type: details.siteType });
      setStatus('done');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="web-quote" aria-labelledby="web-quote-title">
      <div className="web-quote-inner">
        <a className="web-quote-back" href="/creation-site-web-algerie.html">← {t.returnLink}</a>
        <div className="web-quote-heading">
          <p className="web-quote-eyebrow">{t.eyebrow}</p>
          <h1 id="web-quote-title">{status === 'done' ? t.successTitle : t.title}</h1>
          <p>{status === 'done' ? t.successBody : t.intro}</p>
        </div>
        {status === 'done' ? (
          <div className="web-quote-card web-quote-success" role="status" aria-live="polite">
            <a className="web-quote-submit" href="/creation-site-web-algerie.html">{t.returnLink} ↗</a>
            <a href={emailUrl}>{t.emailLink} ↗</a>
          </div>
        ) : (
          <form className="web-quote-card" onSubmit={onSubmit} aria-busy={status === 'submitting'}>
            <div className="web-quote-honeypot" aria-hidden="true"><label htmlFor="web-quote-website">Website</label><input id="web-quote-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(event) => setWebsite(event.target.value)} /></div>
            <div className="web-quote-grid">
              <div><label htmlFor="web-quote-name">{t.name} *</label><input id="web-quote-name" name="name" required autoComplete="name" maxLength={120} aria-invalid={validationError === 'name' || undefined} aria-describedby={validationError === 'name' ? 'web-quote-name-error' : undefined} value={details.name} onChange={(event) => update('name', event.target.value)} />{validationError === 'name' && <p className="web-quote-field-error" id="web-quote-name-error" role="alert">{t.nameError}</p>}</div>
              <div><label htmlFor="web-quote-phone">{t.phone} *</label><input id="web-quote-phone" name="phone" type="tel" inputMode="tel" dir="ltr" required autoComplete="tel" maxLength={24} aria-invalid={validationError === 'phone' || undefined} aria-describedby={validationError === 'phone' ? 'web-quote-phone-error' : undefined} value={details.phone} onChange={(event) => update('phone', event.target.value)} />{validationError === 'phone' && <p className="web-quote-field-error" id="web-quote-phone-error" role="alert">{t.phoneError}</p>}</div>
              <div><label htmlFor="web-quote-email">{t.email} <span>{t.optional}</span></label><input id="web-quote-email" name="email" type="email" dir="ltr" autoComplete="email" maxLength={254} value={details.email} onChange={(event) => update('email', event.target.value)} /></div>
              <div><label htmlFor="web-quote-company">{t.company} <span>{t.optional}</span></label><input id="web-quote-company" name="company" autoComplete="organization" maxLength={120} value={details.company} onChange={(event) => update('company', event.target.value)} /></div>
              <div><label htmlFor="web-quote-type">{t.siteType} *</label><select id="web-quote-type" name="siteType" required value={details.siteType} onChange={(event) => update('siteType', event.target.value)}><option value="" disabled>{t.select}</option>{t.siteTypes.map((option, index) => <option key={option} value={copy.fr.siteTypes[index]}>{option}</option>)}</select></div>
              <div><label htmlFor="web-quote-current">{t.currentSite} <span>{t.optional}</span></label><input id="web-quote-current" name="currentSite" type="text" inputMode="url" dir="ltr" placeholder={t.currentSitePlaceholder} maxLength={200} value={details.currentSite} onChange={(event) => update('currentSite', event.target.value)} /></div>
              <div className="web-quote-wide"><label htmlFor="web-quote-project">{t.project} *</label><textarea id="web-quote-project" name="projectDescription" required minLength={15} maxLength={1500} rows={5} placeholder={t.projectPlaceholder} aria-invalid={validationError === 'project' || undefined} aria-describedby={validationError === 'project' ? 'web-quote-project-error' : undefined} value={details.projectDescription} onChange={(event) => update('projectDescription', event.target.value)} />{validationError === 'project' && <p className="web-quote-field-error" id="web-quote-project-error" role="alert">{t.projectError}</p>}</div>
              <div><label htmlFor="web-quote-timeline">{t.timeline} <span>{t.optional}</span></label><select id="web-quote-timeline" name="timeline" value={details.timeline} onChange={(event) => update('timeline', event.target.value)}><option value="">{t.select}</option>{t.timelines.map((option, index) => <option key={option} value={copy.fr.timelines[index]}>{option}</option>)}</select></div>
              <div><label htmlFor="web-quote-budget">{t.budget} <span>{t.optional}</span></label><input id="web-quote-budget" name="budget" type="text" maxLength={80} placeholder={t.budgetPlaceholder} value={details.budget} onChange={(event) => update('budget', event.target.value)} /></div>
            </div>
            <div className="web-quote-consent"><label><input type="checkbox" name="privacyConsent" required checked={privacyConsent} onChange={(event) => setPrivacyConsent(event.target.checked)} /><span>{t.consent}</span></label><button type="button" onClick={onOpenPolicy}>{t.policy} ↗</button></div>
            {status === 'error' && <p className="web-quote-error" role="alert" aria-live="polite">{t.sendError}</p>}
            <button className="web-quote-submit" type="submit" disabled={status === 'submitting'}>{status === 'submitting' ? t.sending : t.submit}<span aria-hidden="true">↗</span></button>
            <p className="web-quote-note">{t.noPromise}</p>
          </form>
        )}
        <div className="web-quote-alternatives"><a href={emailUrl}>{t.emailLink} ↗</a><a href={whatsappUrl} target="_blank" rel="noopener noreferrer">{t.whatsappLink} ↗</a></div>
      </div>
    </section>
  );
};

export default WebProjectQuoteForm;
