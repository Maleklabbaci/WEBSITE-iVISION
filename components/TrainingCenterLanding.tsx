import React, { useState, useEffect } from 'react';

const FORMSPARK_ID = "3hB9voxjF";

type Language = 'fr' | 'en' | 'ar';

interface Props {
  language: Language;
}

const WILAYAS = [
  "Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar",
  "Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger",
  "Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma",
  "Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh",
  "Illizi","Bordj Bou Arréridj","Boumerdès","El Tarf","Tindouf","Tissemsilt",
  "El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma",
  "Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar",
  "Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet",
  "El M'Ghair","El Meniaa"
];

// ─── TRANSLATIONS ───────────────────────────────
const t = {
  badge: {
    fr: 'Offre Exclusive — Secteur Éducatif',
    en: 'Exclusive Offer — Education Sector',
    ar: 'عرض حصري — القطاع التعليمي',
  },
  heroTitle1: {
    fr: 'Remplissez vos sessions.',
    en: 'Fill your sessions.',
    ar: 'املأ جلساتك.',
  },
  heroTitle2: {
    fr: 'Chaque mois.',
    en: 'Every month.',
    ar: 'كل شهر.',
  },
  heroSub: {
    fr: 'Des campagnes digitales conçues spécialement pour les centres de formation, crèches et écoles privées en Algérie. Résultats mesurables dès le premier mois.',
    en: 'Digital campaigns designed specifically for training centers, nurseries and private schools in Algeria. Measurable results from the first month.',
    ar: 'حملات رقمية مصممة خصيصاً لمراكز التكوين والحضانات والمدارس الخاصة في الجزائر. نتائج قابلة للقياس منذ الشهر الأول.',
  },
  seeOffers: {
    fr: 'Voir nos offres',
    en: 'See our offers',
    ar: 'عرض عروضنا',
  },
  statsTitle: {
    fr: 'Résultats prouvés sur le terrain',
    en: 'Field-proven results',
    ar: 'نتائج مثبتة ميدانياً',
  },
  packsTitle: {
    fr: 'Choisissez votre pack',
    en: 'Choose your pack',
    ar: 'اختر باقتك',
  },
  packsSub: {
    fr: 'Budget publicitaire inclus — aucun frais caché',
    en: 'Ad budget included — no hidden fees',
    ar: 'ميزانية الإعلانات مشمولة — لا رسوم خفية',
  },
  perMonth: {
    fr: 'tout inclus / mois',
    en: 'all inclusive / month',
    ar: 'الكل شامل / شهر',
  },
  recommended: {
    fr: '⭐ Recommandé',
    en: '⭐ Recommended',
    ar: '⭐ موصى به',
  },
  maxResults: {
    fr: '🔥 Max résultats',
    en: '🔥 Max results',
    ar: '🔥 أقصى نتائج',
  },
  choosePack: {
    fr: 'Choisir ce pack',
    en: 'Choose this pack',
    ar: 'اختر هذه الباقة',
  },
  footerNote: {
    fr: 'Frais de déplacement hors wilaya définis selon votre localisation',
    en: 'Travel fees outside wilaya defined based on your location',
    ar: 'رسوم التنقل خارج الولاية محددة حسب موقعك',
  },
  testimonialsTitle: {
    fr: 'Ils nous font confiance',
    en: 'They trust us',
    ar: 'يثقون بنا',
  },
  formTitle: {
    fr: 'Démarrons ensemble.',
    en: "Let's start together.",
    ar: 'لنبدأ معاً.',
  },
  formSub: {
    fr: 'Remplissez vos informations — on vous contacte sous 24h.',
    en: 'Fill in your information — we contact you within 24h.',
    ar: 'أدخل معلوماتك — سنتواصل معك خلال 24 ساعة.',
  },
  back: { fr: 'Retour', en: 'Back', ar: 'رجوع' },
  packSelected: { fr: 'Pack sélectionné', en: 'Selected pack', ar: 'الباقة المختارة' },
  fullName: { fr: 'Nom complet', en: 'Full name', ar: 'الاسم الكامل' },
  fullNamePh: { fr: 'Ex: Amira Bensalem', en: 'Ex: John Smith', ar: 'مثال: أمل بن سالم' },
  centerName: { fr: 'Nom du centre / établissement', en: 'Center / school name', ar: 'اسم المركز / المؤسسة' },
  centerNamePh: { fr: 'Ex: Centre Al Nour de Formation', en: 'Ex: Al Nour Training Center', ar: 'مثال: مركز النور للتكوين' },
  phone: { fr: 'Numéro de téléphone', en: 'Phone number', ar: 'رقم الهاتف' },
  phonePh: { fr: '05 00 00 00 00', en: '05 00 00 00 00', ar: '05 00 00 00 00' },
  wilaya: { fr: 'Wilaya', en: 'Wilaya', ar: 'الولاية' },
  wilayaPh: { fr: 'Sélectionnez...', en: 'Select...', ar: 'اختر...' },
  baladia: { fr: 'Commune (Baladia)', en: 'Commune', ar: 'البلدية' },
  baladiaPh: { fr: 'Ex: Bab Ezzouar', en: 'Ex: Bab Ezzouar', ar: 'مثال: باب الزوار' },
  recap: { fr: 'Récapitulatif', en: 'Summary', ar: 'ملخص' },
  recapNote: {
    fr: 'Budget publicitaire inclus — frais de déplacement hors wilaya définis à l\'appel',
    en: 'Ad budget included — travel fees outside wilaya defined at call',
    ar: 'ميزانية الإعلانات مشمولة — رسوم التنقل خارج الولاية محددة عند الاتصال',
  },
  submit: { fr: 'Envoyer ma demande', en: 'Send my request', ar: 'إرسال طلبي' },
  submitting: { fr: 'Envoi en cours...', en: 'Sending...', ar: 'جارٍ الإرسال...' },
  successTitle: { fr: 'Demande envoyée !', en: 'Request sent!', ar: 'تم إرسال الطلب!' },
  successMsg: {
    fr: 'On vous contacte dans les 24h pour démarrer votre stratégie.',
    en: 'We will contact you within 24h to start your strategy.',
    ar: 'سنتواصل معك خلال 24 ساعة لبدء استراتيجيتك.',
  },
  backHome: { fr: 'Retour à l\'accueil', en: 'Back to home', ar: 'العودة للرئيسية' },
};

const packs = [
  {
    name: 'ESSENTIEL',
    subtitle: { fr: 'Pour bien démarrer', en: 'To get started', ar: 'للبداية الصحيحة' },
    price: '40 000 DA',
    features: {
      fr: ['4 Reels professionnels', '8 Designs graphiques', 'Gestion publicités Meta', 'Rapport mensuel', 'Support WhatsApp'],
      en: ['4 Professional Reels', '8 Graphic Designs', 'Meta Ads Management', 'Monthly report', 'WhatsApp support'],
      ar: ['4 ريلز احترافية', '8 تصاميم جرافيك', 'إدارة إعلانات ميتا', 'تقرير شهري', 'دعم واتساب'],
    },
    highlight: false,
    tag: null,
  },
  {
    name: 'AVANCÉ',
    subtitle: { fr: 'Croissance accélérée', en: 'Accelerated growth', ar: 'نمو متسارع' },
    price: '60 000 DA',
    features: {
      fr: ['6 Reels professionnels', '12 Designs graphiques', 'Gestion publicités Meta', 'Stratégie de contenu', 'Rapport bi-mensuel', 'Support prioritaire'],
      en: ['6 Professional Reels', '12 Graphic Designs', 'Meta Ads Management', 'Content strategy', 'Bi-monthly report', 'Priority support'],
      ar: ['6 ريلز احترافية', '12 تصاميم جرافيك', 'إدارة إعلانات ميتا', 'استراتيجية محتوى', 'تقرير نصف شهري', 'دعم أولوي'],
    },
    highlight: false,
    tag: null,
  },
  {
    name: 'PRO',
    subtitle: { fr: 'Le plus choisi', en: 'Most popular', ar: 'الأكثر اختياراً' },
    price: '100 000 DA',
    features: {
      fr: ['8 Reels professionnels', '20 Designs graphiques', 'Meta + Instagram Ads', 'Stratégie avancée', 'Rapports hebdomadaires', 'Account manager dédié'],
      en: ['8 Professional Reels', '20 Graphic Designs', 'Meta + Instagram Ads', 'Advanced strategy', 'Weekly reports', 'Dedicated account manager'],
      ar: ['8 ريلز احترافية', '20 تصاميم جرافيك', 'ميتا + انستغرام', 'استراتيجية متقدمة', 'تقارير أسبوعية', 'مدير حساب مخصص'],
    },
    highlight: true,
    tag: 'recommended',
  },
  {
    name: 'SCALE',
    subtitle: { fr: 'Dominez votre marché', en: 'Dominate your market', ar: 'سيطر على سوقك' },
    price: '150 000 DA',
    features: {
      fr: ['12 Reels professionnels', '30 Designs graphiques', 'Meta + TikTok + Instagram', 'Stratégie full funnel', 'Rapports en temps réel', 'Account manager VIP'],
      en: ['12 Professional Reels', '30 Graphic Designs', 'Meta + TikTok + Instagram', 'Full funnel strategy', 'Real-time reports', 'VIP account manager'],
      ar: ['12 ريلز احترافية', '30 تصاميم جرافيك', 'ميتا + تيك توك + انستغرام', 'استراتيجية كاملة', 'تقارير فورية', 'مدير حساب VIP'],
    },
    highlight: false,
    tag: 'maxResults',
  },
];

const stats = [
  {
    value: '125K',
    label: { fr: 'Interactions en 30 jours', en: 'Interactions in 30 days', ar: 'تفاعل في 30 يوماً' },
    sub: { fr: 'Centre de formation, Blida', en: 'Training center, Blida', ar: 'مركز تكوين، البليدة' },
  },
  {
    value: '2 000',
    label: { fr: 'Followers en 28 jours', en: 'Followers in 28 days', ar: 'متابع في 28 يوماً' },
    sub: { fr: 'Crèche privée, Alger', en: 'Private nursery, Algiers', ar: 'روضة خاصة، الجزائر' },
  },
  {
    value: '240%',
    label: { fr: 'ROI dès le 1er mois', en: 'ROI from month 1', ar: 'عائد استثمار من الشهر الأول' },
    sub: { fr: 'École de langue, Oran', en: 'Language school, Oran', ar: 'مدرسة لغات، وهران' },
  },
  {
    value: '300+',
    label: { fr: 'Inscriptions générées', en: 'Registrations generated', ar: 'تسجيل تم توليده' },
    sub: { fr: 'Centre de soutien, Tipaza', en: 'Support center, Tipaza', ar: 'مركز دعم، تيبازة' },
  },
];

const testimonials = [
  {
    name: 'Amira B.',
    role: { fr: 'Directrice — Centre de Formation, Blida', en: 'Director — Training Center, Blida', ar: 'مديرة — مركز التكوين، البليدة' },
    text: {
      fr: 'En 3 semaines, on a rempli toutes nos sessions. iVision a compris notre secteur dès le départ.',
      en: 'In 3 weeks, all our sessions were full. iVision understood our sector from day one.',
      ar: 'في 3 أسابيع، امتلأت جميع جلساتنا. iVision فهمت قطاعنا من البداية.',
    },
    avatar: 'https://i.pravatar.cc/100?u=amira_b',
  },
  {
    name: 'Karim M.',
    role: { fr: 'Gérant — École de Langues, Oran', en: 'Manager — Language School, Oran', ar: 'مدير — مدرسة لغات، وهران' },
    text: {
      fr: 'Le ROI était visible dès la première semaine. Les reels convertissent vraiment bien pour notre cible.',
      en: 'ROI was visible from the first week. The reels convert really well for our target audience.',
      ar: 'كان عائد الاستثمار واضحاً من الأسبوع الأول. الريلز تحول بشكل ممتاز لجمهورنا المستهدف.',
    },
    avatar: 'https://i.pravatar.cc/100?u=karim_m',
  },
  {
    name: 'Nadia S.',
    role: { fr: 'Fondatrice — Crèche Privée, Alger', en: 'Founder — Private Nursery, Algiers', ar: 'مؤسسة — روضة خاصة، الجزائر' },
    text: {
      fr: 'Professionnels, réactifs et surtout efficaces. Notre page a explosé en moins d\'un mois.',
      en: 'Professional, responsive and above all effective. Our page exploded in less than a month.',
      ar: 'محترفون ومتجاوبون وفعالون فوق كل شيء. انتشرت صفحتنا في أقل من شهر.',
    },
    avatar: 'https://i.pravatar.cc/100?u=nadia_s',
  },
];

const images = [
  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', badge: '+125K interactions' },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', badge: '2 000 followers / 28j' },
  { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80', badge: '240% ROI' },
];

// ─── QUOTE FORM ────────────────────────────────
const AcademiqQuoteForm: React.FC<{ selectedPack: string; onBack: () => void; lang: Language }> = ({ selectedPack, onBack, lang }) => {
  const [formData, setFormData] = useState({ name: '', centerName: '', phone: '', wilaya: '', baladia: '', pack: selectedPack });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done'>('idle');
  const isRtl = lang === 'ar';

  const inputClass = "w-full p-5 bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-navy dark:text-white font-bold text-base placeholder:opacity-30 placeholder:font-normal";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-3";

  const isValid = formData.name.trim() && formData.centerName.trim() && formData.phone.trim() && formData.wilaya && formData.baladia.trim();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('submitting');
    try {
      const res = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          ...formData,
          _subject: `[ACADEMIQ — PACK ${formData.pack}] ${formData.centerName} — ${formData.wilaya}`,
          source: 'Landing Academiq',
          langue: lang,
        }),
      });
      if (res.ok) { setStatus('done'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      else throw new Error();
    } catch { setStatus('idle'); alert('Erreur. Réessayez.'); }
  };

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-white dark:bg-navy flex items-center justify-center p-8 transition-colors duration-500">
        <div className={`text-center animate-scale-in max-w-lg ${isRtl ? 'rtl' : ''}`}>
          <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center mb-8 mx-auto text-white shadow-2xl shadow-brand-blue/30">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-4xl font-black mb-4 text-navy dark:text-white uppercase tracking-tighter">{t.successTitle[lang]}</h2>
          <p className="text-brand-gray text-lg font-medium mb-4 opacity-80 leading-relaxed">
            {t.successMsg[lang]} <span className="text-brand-blue font-black">24h</span>
          </p>
          <p className="text-brand-gray/50 text-sm mb-10">{t.packSelected[lang]} : <span className="font-black text-brand-blue">{formData.pack}</span></p>
          <button onClick={() => window.location.hash = ''} className="btn-ivision w-full py-5">{t.backHome[lang]}</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-navy transition-colors duration-500 py-24 md:py-32 ${isRtl ? 'rtl' : ''}`}>
      <div className="container max-w-2xl">
        <button onClick={onBack} className="mb-12 text-navy/40 dark:text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
          <svg className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:translate-x-1 rotate-180' : 'group-hover:-translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-[10px] font-black tracking-widest uppercase">{t.back[lang]}</span>
        </button>

        <div className="mb-12">
          <div className="sketch-badge mb-6">{t.packSelected[lang]}</div>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-brand-blue/10 border border-brand-blue/30 rounded-2xl px-5 py-3 inline-flex items-center gap-3">
              <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
              <span className="text-brand-blue font-black text-sm uppercase tracking-wider">{selectedPack}</span>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy dark:text-white uppercase tracking-tighter leading-none mb-4">
            {t.formTitle[lang].split('.')[0]}.<br />
            <span className="text-brand-blue">{t.formTitle[lang].split('.')[1] || ''}</span>
          </h1>
          <p className="text-brand-gray font-medium opacity-60">{t.formSub[lang]}</p>
        </div>

        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label className={labelClass}>{t.fullName[lang]}</label>
            <input type="text" placeholder={t.fullNamePh[lang]} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t.centerName[lang]}</label>
            <input type="text" placeholder={t.centerNamePh[lang]} value={formData.centerName} onChange={e => setFormData({ ...formData, centerName: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{t.phone[lang]}</label>
            <input type="tel" placeholder={t.phonePh[lang]} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>{t.wilaya[lang]}</label>
              <select value={formData.wilaya} onChange={e => setFormData({ ...formData, wilaya: e.target.value })} className={inputClass + " cursor-pointer"}>
                <option value="">{t.wilayaPh[lang]}</option>
                {WILAYAS.map(w => <option key={w} value={w}>{w}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass}>{t.baladia[lang]}</label>
              <input type="text" placeholder={t.baladiaPh[lang]} value={formData.baladia} onChange={e => setFormData({ ...formData, baladia: e.target.value })} className={inputClass} />
            </div>
          </div>

          {/* Pack recap */}
          <div className="p-5 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-2">{t.recap[lang]}</p>
            <div className="flex items-center justify-between">
              <span className="text-navy dark:text-white font-black text-lg uppercase">{selectedPack}</span>
              <span className="text-brand-gray font-bold text-sm">{t.perMonth[lang]}</span>
            </div>
            <p className="text-[10px] text-brand-gray/50 mt-2 font-medium">{t.recapNote[lang]}</p>
          </div>

          <button type="submit" disabled={!isValid || status === 'submitting'} className="btn-ivision w-full py-6 text-base disabled:opacity-30 disabled:pointer-events-none group">
            <span>{status === 'submitting' ? t.submitting[lang] : t.submit[lang]}</span>
            {status === 'idle' && (
              <svg className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// ─── MAIN LANDING ───────────────────────────────
const TrainingCenterLanding: React.FC<Props> = ({ language: lang }) => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (selectedPack) {
    return <AcademiqQuoteForm selectedPack={selectedPack} onBack={() => setSelectedPack(null)} lang={lang} />;
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-navy transition-colors duration-500 overflow-x-hidden ${isRtl ? 'rtl' : ''}`}>

      {/* ══ HERO ══ */}
      <section className="relative min-h-screen pt-36 pb-24 px-6 flex items-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1440 800" fill="none">
          <path d="M-100 400C300 200 700 600 1100 350C1300 220 1500 480 1600 380" stroke="rgba(0,51,255,0.25)" strokeWidth="1.5" strokeDasharray="8 8" />
        </svg>

        <div className="container max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="sketch-badge mb-8">{t.badge[lang]}</div>
              <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-black text-navy dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
                {t.heroTitle1[lang]}<br />
                <span className="text-brand-blue">{t.heroTitle2[lang]}</span>
              </h1>
              <p className="text-lg text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-70 max-w-xl mb-10">
                {t.heroSub[lang]}
              </p>

              {/* Mini stats */}
              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { v: '125K', l: { fr: 'interactions/mois', en: 'interactions/month', ar: 'تفاعل/شهر' } },
                  { v: '240%', l: { fr: 'ROI moyen', en: 'avg ROI', ar: 'متوسط العائد' } },
                  { v: '30j', l: { fr: 'premiers résultats', en: 'first results', ar: 'أول نتائج' } },
                ].map(s => (
                  <div key={s.v} className="flex flex-col">
                    <span className="text-3xl font-black text-navy dark:text-white tracking-tighter">{s.v}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">{s.l[lang]}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-ivision px-10 py-5 group"
              >
                <span>{t.seeOffers[lang]}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>

            {/* Right — image grid */}
            <div className={`hidden lg:grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="col-span-2 relative rounded-3xl overflow-hidden h-52 group">
                <img src={images[0].url} alt="formation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl shadow-lg shadow-brand-blue/30">
                  {images[0].badge}
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-40 group">
                <img src={images[1].url} alt="apprentissage" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">
                  {images[1].badge}
                </div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-40 group">
                <img src={images[2].url} alt="centre" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-brand-blue/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">
                  {images[2].badge}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS ══ */}
      <section className="py-20 px-6 border-t border-navy/5 dark:border-white/5">
        <div className="container max-w-6xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-12">{t.statsTitle[lang]}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div
                key={i}
                className={`glass-card rounded-3xl p-6 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="block text-4xl font-black text-navy dark:text-white tracking-tighter mb-2">{s.value}</span>
                <span className="block text-[11px] font-black uppercase tracking-widest text-brand-blue mb-1">{s.label[lang]}</span>
                <span className="block text-[10px] text-brand-gray/50 font-medium">{s.sub[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PACKS ══ */}
      <section id="packs" className="py-24 px-6">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white uppercase tracking-tighter mb-3">
              {t.packsTitle[lang]}
            </h2>
            <p className="text-brand-gray text-sm font-medium opacity-60">{t.packsSub[lang]}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack) => (
              <div
                key={pack.name}
                className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 group ${
                  pack.highlight
                    ? 'ring-2 ring-brand-blue shadow-2xl shadow-brand-blue/20 scale-[1.03]'
                    : 'ring-1 ring-navy/10 dark:ring-white/10 hover:ring-brand-blue/50 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Tag */}
                {pack.tag && (
                  <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} z-10`}>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${pack.highlight ? 'bg-white text-brand-blue' : 'bg-brand-blue/10 text-brand-blue'}`}>
                      {pack.tag === 'recommended' ? t.recommended[lang] : t.maxResults[lang]}
                    </span>
                  </div>
                )}

                {/* Top band */}
                <div className={`px-6 pt-8 pb-6 ${pack.highlight ? 'bg-brand-blue' : 'bg-navy/5 dark:bg-white/5'}`}>
                  <h3 className={`text-lg font-black uppercase tracking-tighter mb-1 ${pack.highlight ? 'text-white' : 'text-navy dark:text-white'}`}>
                    {pack.name}
                  </h3>
                  <p className={`text-[11px] font-medium ${pack.highlight ? 'text-white/70' : 'text-brand-gray opacity-70'}`}>
                    {pack.subtitle[lang]}
                  </p>
                </div>

                {/* Body */}
                <div className="flex flex-col flex-grow px-6 py-6 bg-white dark:bg-navy/40">
                  <div className="mb-6">
                    <span className="block text-3xl font-black text-navy dark:text-white tracking-tighter">{pack.price}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">{t.perMonth[lang]}</span>
                  </div>
                  <div className="h-px bg-navy/5 dark:bg-white/10 mb-6" />
                  <ul className="flex flex-col gap-3 flex-grow mb-8">
                    {pack.features[lang].map((feat: string) => (
                      <li key={feat} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${pack.highlight ? 'bg-brand-blue' : 'bg-brand-blue/10'}`}>
                          <svg className={`w-2.5 h-2.5 ${pack.highlight ? 'text-white' : 'text-brand-blue'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                        <span className="text-xs font-medium text-brand-gray dark:text-brand-gray/80 leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    onClick={() => setSelectedPack(pack.name)}
                    className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${
                      pack.highlight
                        ? 'bg-brand-blue text-white hover:brightness-110 shadow-lg shadow-brand-blue/30'
                        : 'bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-brand-blue hover:text-white border border-navy/10 dark:border-white/10 hover:border-brand-blue'
                    }`}
                  >
                    {t.choosePack[lang]}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-gray/30 mt-10">
            ✦ {t.footerNote[lang]}
          </p>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-20 px-6 border-t border-navy/5 dark:border-white/5">
        <div className="container max-w-5xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-12">{t.testimonialsTitle[lang]}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <div key={i} className="glass-card rounded-3xl p-7 flex flex-col gap-5">
                <p className="text-brand-gray dark:text-brand-gray/80 text-sm font-medium leading-relaxed flex-grow">
                  "{tm.text[lang]}"
                </p>
                <div className="flex items-center gap-4">
                  <img src={tm.avatar} alt={tm.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <span className="block text-xs font-black text-navy dark:text-white">{tm.name}</span>
                    <span className="block text-[10px] text-brand-gray/50 font-medium">{tm.role[lang]}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default TrainingCenterLanding;
