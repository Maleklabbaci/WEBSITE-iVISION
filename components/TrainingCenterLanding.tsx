import React, { useState, useEffect } from 'react';
import { FORMSPARK_ID } from '../lib/config';

type Language = 'fr' | 'en' | 'ar';
interface Props { language: Language; }

const WHATSAPP_NUMBER = '213563839404';

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

const SECTORS = {
  fr: ['Restaurant / Café', 'Boutique / Mode', 'Clinique / Santé', 'Immobilier', 'E-commerce', 'Sport / Fitness', 'Beauté / Cosmétique', 'Éducation / Formation', 'Hôtel / Tourisme', 'Autre'],
  en: ['Restaurant / Café', 'Shop / Fashion', 'Clinic / Health', 'Real Estate', 'E-commerce', 'Sport / Fitness', 'Beauty / Cosmetics', 'Education / Training', 'Hotel / Tourism', 'Other'],
  ar: ['مطعم / مقهى', 'متجر / أزياء', 'عيادة / صحة', 'عقارات', 'تجارة إلكترونية', 'رياضة / لياقة', 'جمال / تجميل', 'تعليم / تكوين', 'فندق / سياحة', 'أخرى'],
};

const packDetails: Record<string, {
  price: string; color: string; reels: number; designs: number;
  whyReels: { fr: string; en: string; ar: string };
  whyDesigns: { fr: string; en: string; ar: string };
  howItWorks: { fr: string[]; en: string[]; ar: string[] };
  bestFor: { fr: string; en: string; ar: string };
  extras: { fr: string[]; en: string[]; ar: string[] };
}> = {
  ESSENTIEL: {
    price: '40 000 DA', color: '#1A1A5E', reels: 4, designs: 4,
    whyReels: {
      fr: '4 Reels par mois c\'est 1 vidéo par semaine — le rythme idéal pour lancer votre présence digitale sans surcharger votre audience. Chaque reel cible un angle différent : présentation de votre business, témoignage client, offre du mois, behind-the-scenes.',
      en: '4 Reels per month means 1 video per week — the ideal rhythm to launch your digital presence. Each reel targets a different angle: business presentation, client testimonial, monthly offer, behind-the-scenes.',
      ar: '4 ريلز شهرياً تعني فيديو واحد أسبوعياً — الإيقاع المثالي لإطلاق حضورك الرقمي. كل ريل يستهدف زاوية مختلفة: تقديم نشاطك، شهادة عميل، عرض الشهر، كواليس.',
    },
    whyDesigns: {
      fr: '4 designs par mois couvrent l\'essentiel : 2 posts informatifs (conseils, présentation de vos services) + 2 posts promotionnels (offres, actualités). Un contenu visuel cohérent construit la confiance et la reconnaissance de votre marque.',
      en: '4 designs per month cover the essentials: 2 informative posts (tips, service presentation) + 2 promotional posts (offers, news). Consistent visual content builds trust and brand recognition.',
      ar: '4 تصاميم شهرياً تغطي الأساسيات: منشورات إعلامية وترويجية. المحتوى المرئي المتسق يبني الثقة والتعرف على علامتك التجارية.',
    },
    howItWorks: {
      fr: ['Semaine 1 : Tournage d\'une journée avec notre filmmaker', 'Semaine 1-2 : Montage, voix off IA, sous-titres et visuels', 'Semaine 2-3 : Publication des contenus sur vos réseaux', 'Semaine 4 : Rapport mensuel + plan du mois suivant'],
      en: ['Week 1: Full day filming with our filmmaker', 'Week 1-2: Editing, AI voiceover, subtitles and visuals', 'Week 2-3: Content publication on your social media', 'Week 4: Monthly report + next month plan'],
      ar: ['الأسبوع 1: يوم تصوير مع مصورنا', 'الأسبوع 1-2: المونتاج، التعليق الصوتي، الترجمة والمرئيات', 'الأسبوع 2-3: نشر المحتوى على منصاتك', 'الأسبوع 4: تقرير شهري + خطة الشهر القادم'],
    },
    bestFor: {
      fr: 'Idéal pour les businesses qui démarrent leur présence digitale ou qui ont un budget de lancement.',
      en: 'Ideal for businesses starting their digital presence or with a launch budget.',
      ar: 'مثالي للأعمال التي تبدأ حضورها الرقمي أو لديها ميزانية إطلاق.',
    },
    extras: {
      fr: ['Production vidéo professionnelle', 'Rapport mensuel détaillé', 'Support WhatsApp direct'],
      en: ['Professional video production', 'Detailed monthly report', 'Direct WhatsApp support'],
      ar: ['إنتاج فيديو احترافي', 'تقرير شهري مفصل', 'دعم واتساب مباشر'],
    },
  },
  'AVANCÉ': {
    price: '85 000 DA', color: '#1A1AFF', reels: 6, designs: 12,
    whyReels: {
      fr: '6 Reels par mois = 1,5 vidéo par semaine. On diversifie les formats : reels courts viraux (15s), reels longs engageants (60s), et témoignages clients filmés. Plus de fréquence = plus d\'algorithme = plus de reach organique gratuit.',
      en: '6 Reels per month = 1.5 videos per week. We diversify formats: short viral reels (15s), long engaging reels (60s), and filmed client testimonials. More frequency = more algorithm = more free organic reach.',
      ar: '6 ريلز شهرياً = 1.5 فيديو أسبوعياً. ننوع الصيغ: ريلز قصيرة فيروسية (15 ثانية)، ريلز طويلة جذابة (60 ثانية)، وشهادات عملاء مصورة.',
    },
    whyDesigns: {
      fr: '12 designs = 3 posts par semaine. On couvre tous les piliers de votre communication : contenus éducatifs sur votre domaine, témoignages graphiques, annonces de promotions, et carrousels de présentation. Une présence constante qui rassure et convertit.',
      en: '12 designs = 3 posts per week. We cover all communication pillars: educational content, graphic testimonials, promotional announcements, and presentation carousels. A constant presence that reassures and converts.',
      ar: '12 تصميم = 3 منشورات أسبوعياً. نغطي جميع ركائز تواصلك: محتوى تعليمي، شهادات جرافيكية، إعلانات ترويجية، وعروض تقديمية.',
    },
    howItWorks: {
      fr: ['Semaine 1 : Tournage + stratégie de contenu sur mesure', 'Semaine 1-2 : Production complète : montage, voix off, visuels', 'Semaine 2 : Lancement campagnes + ciblage affiné par zone', 'Semaine 3 : Analyse des premiers résultats + optimisation', 'Semaine 4 : Rapport bi-mensuel + plan du mois suivant'],
      en: ['Week 1: Filming + custom content strategy', 'Week 1-2: Full production: editing, voiceover, visuals', 'Week 2: Campaign launch + refined geographic targeting', 'Week 3: First results analysis + creative optimization', 'Week 4: Bi-monthly report + next month plan'],
      ar: ['الأسبوع 1: التصوير + استراتيجية محتوى مخصصة', 'الأسبوع 1-2: إنتاج كامل: مونتاج، تعليق صوتي، مرئيات', 'الأسبوع 2: إطلاق الحملات + استهداف جغرافي محسّن', 'الأسبوع 3: تحليل النتائج الأولى + تحسين', 'الأسبوع 4: تقرير نصف شهري + خطة الشهر القادم'],
    },
    bestFor: {
      fr: 'Pour les businesses qui veulent accélérer leur croissance et attirer un flux régulier de nouveaux clients.',
      en: 'For businesses that want to accelerate their growth and attract a steady flow of new clients.',
      ar: 'للأعمال التي تريد تسريع نموها وجذب تدفق منتظم من العملاء الجدد.',
    },
    extras: {
      fr: ['Stratégie de contenu mensuelle', 'Ciblage géographique avancé', 'Rapport bi-mensuel', 'Support prioritaire 7j/7'],
      en: ['Monthly content strategy', 'Advanced geographic targeting', 'Bi-monthly report', 'Priority support 7/7'],
      ar: ['استراتيجية محتوى شهرية', 'استهداف جغرافي متقدم', 'تقرير نصف شهري', 'دعم أولوي 7 أيام/7'],
    },
  },
  PRO: {
    price: '150 000 DA', color: '#0033FF', reels: 8, designs: 20,
    whyReels: {
      fr: '8 Reels = 2 vidéos par semaine. C\'est la fréquence qui déclenche l\'algorithme Meta en faveur de votre page. Formats variés : reels viraux courts, présentations produits/services, interviews équipe, live replay montés, et vidéos de témoignages clients.',
      en: '8 Reels = 2 videos per week. This is the frequency that triggers the Meta algorithm in favor of your page. Varied formats: short viral reels, product/service presentations, team interviews, edited live replays, and client testimonial videos.',
      ar: '8 ريلز = فيديوان أسبوعياً. هذا هو التكرار الذي يحرك خوارزمية ميتا لصالح صفحتك. صيغ متنوعة: ريلز فيروسية، عروض منتجات/خدمات، مقابلات الفريق، وشهادات عملاء.',
    },
    whyDesigns: {
      fr: '20 designs = un post par jour ouvrable. On couvre tous les angles : contenu éducatif qui positionne votre business comme référence, stories quotidiennes, carrousels de présentation, posts de témoignages, et visuels publicitaires. Votre feed devient une machine à confiance.',
      en: '20 designs = one post per working day. We cover all angles: educational content positioning your business as a reference, daily stories, presentation carousels, testimonial posts, and ad visuals. Your feed becomes a trust machine.',
      ar: '20 تصميم = منشور لكل يوم عمل. نغطي جميع الزوايا: محتوى يضع نشاطك كمرجع، قصص يومية، عروض تقديمية، منشورات شهادات، ومرئيات إعلانية.',
    },
    howItWorks: {
      fr: ['J1-J3 : Audit complet + stratégie de contenu + calendrier éditorial', 'J4-J7 : Tournage multi-formats avec filmmaker professionnel', 'J8-J14 : Production : montage, voix off, motion design, visuels', 'J15 : Lancement campagnes Meta + Instagram Ads simultanément', 'J16-J30 : Optimisation quotidienne + A/B test des créatifs', 'J30 : Rapport complet + stratégie mois suivant'],
      en: ['D1-D3: Full audit + content strategy + editorial calendar', 'D4-D7: Multi-format filming with professional filmmaker', 'D8-D14: Production: editing, voiceover, motion design, visuals', 'D15: Launch Meta + Instagram Ads simultaneously', 'D16-D30: Daily optimization + A/B testing of creatives', 'D30: Full report + next month strategy'],
      ar: ['ي1-ي3: تدقيق كامل + استراتيجية محتوى + تقويم تحريري', 'ي4-ي7: تصوير متعدد الصيغ مع مصور محترف', 'ي8-ي14: إنتاج: مونتاج، تعليق صوتي، موشن ديزاين، مرئيات', 'ي15: إطلاق إعلانات ميتا + انستغرام في نفس الوقت', 'ي16-ي30: تحسين يومي + اختبار A/B للإبداعات', 'ي30: تقرير كامل + استراتيجية الشهر القادم'],
    },
    bestFor: {
      fr: 'Le choix des businesses sérieux qui veulent dominer leur marché local et générer un flux constant de nouveaux clients.',
      en: 'The choice for serious businesses that want to dominate their local market and generate a constant flow of new clients.',
      ar: 'اختيار الأعمال الجادة التي تريد السيطرة على سوقها المحلي وتوليد تدفق مستمر من العملاء.',
    },
    extras: {
      fr: ['Meta + Instagram Ads gérés', 'Calendrier éditorial mensuel', 'A/B testing créatifs', 'Rapports hebdomadaires', 'Account manager dédié'],
      en: ['Meta + Instagram Ads managed', 'Monthly editorial calendar', 'Creative A/B testing', 'Weekly reports', 'Dedicated account manager'],
      ar: ['إدارة إعلانات ميتا + انستغرام', 'تقويم تحريري شهري', 'اختبار A/B للإبداعات', 'تقارير أسبوعية', 'مدير حساب مخصص'],
    },
  },
  SCALE: {
    price: '250 000 DA', color: '#0A0A2E', reels: 12, designs: 30,
    whyReels: {
      fr: '12 Reels = 3 vidéos par semaine. C\'est la fréquence maximale pour saturer votre marché local. On produit pour 3 plateformes en parallèle : Meta, Instagram et TikTok. Formats adaptés à chaque plateforme, audiences différentes, message cohérent. Votre business est partout.',
      en: '12 Reels = 3 videos per week. Maximum frequency to saturate your local market. We produce for 3 platforms in parallel: Meta, Instagram and TikTok. Platform-specific formats, different audiences, consistent message. Your business is everywhere.',
      ar: '12 ريل = 3 فيديوهات أسبوعياً. التكرار الأقصى لإشباع سوقك المحلي. ننتج لـ 3 منصات بالتوازي: ميتا، انستغرام وتيك توك.',
    },
    whyDesigns: {
      fr: '30 designs = un post par jour, 7j/7. Stories, posts, carrousels, visuels publicitaires pour 3 plateformes. Chaque pièce optimisée pour sa plateforme. Une domination totale du paysage digital de votre secteur dans votre wilaya.',
      en: '30 designs = one post per day, 7/7. Stories, posts, carousels, ad visuals for 3 platforms. Each piece optimized for its platform. Total domination of the digital landscape in your sector and wilaya.',
      ar: '30 تصميم = منشور يومياً، 7 أيام/7. قصص، منشورات، عروض، مرئيات إعلانية لـ 3 منصات. كل قطعة محسّنة لمنصتها.',
    },
    howItWorks: {
      fr: ['J1-J3 : Audit complet + stratégie full-funnel multi-plateformes', 'J4-J7 : Tournage intensif (2 jours avec filmmaker)', 'J8-J14 : Production complète : 3 plateformes, formats variés', 'J15 : Lancement simultané Meta + Instagram + TikTok', 'J16-J30 : Pilotage quotidien + optimisation temps réel', 'Hebdomadaire : Rapport de performance complet', 'J30 : Bilan + stratégie d\'expansion mois suivant'],
      en: ['D1-D3: Full audit + multi-platform full-funnel strategy', 'D4-D7: Intensive filming (2 days with filmmaker)', 'D8-D14: Full production: 3 platforms, varied formats', 'D15: Simultaneous launch Meta + Instagram + TikTok', 'D16-D30: Daily management + real-time optimization', 'Weekly: Full performance report', 'D30: Review + next month expansion strategy'],
      ar: ['ي1-ي3: تدقيق كامل + استراتيجية متعددة المنصات', 'ي4-ي7: تصوير مكثف (يومان مع المصور)', 'ي8-ي14: إنتاج كامل: 3 منصات، صيغ متنوعة', 'ي15: إطلاق متزامن ميتا + انستغرام + تيك توك', 'ي16-ي30: إدارة يومية + تحسين فوري', 'أسبوعياً: تقرير أداء كامل', 'ي30: مراجعة + استراتيجية توسع الشهر القادم'],
    },
    bestFor: {
      fr: 'Pour les businesses ambitieux qui veulent devenir LA référence de leur wilaya dans leur secteur.',
      en: 'For ambitious businesses that want to become THE reference in their wilaya in their sector.',
      ar: 'للأعمال الطموحة التي تريد أن تصبح المرجع في ولايتها في قطاعها.',
    },
    extras: {
      fr: ['Meta + TikTok + Instagram gérés', 'Stratégie full-funnel', 'Rapports en temps réel', 'Account manager VIP', '2 jours de tournage/mois'],
      en: ['Meta + TikTok + Instagram managed', 'Full-funnel strategy', 'Real-time reports', 'VIP account manager', '2 filming days/month'],
      ar: ['إدارة ميتا + تيك توك + انستغرام', 'استراتيجية متكاملة', 'تقارير فورية', 'مدير حساب VIP', 'يومان تصوير شهرياً'],
    },
  },
};

const T = {
  badge: { fr: 'Agence Marketing Digital — Algérie', en: 'Digital Marketing Agency — Algeria', ar: 'وكالة تسويق رقمي — الجزائر' },
  heroTitle1: { fr: 'Attirez plus de clients.', en: 'Attract more clients.', ar: 'اجذب المزيد من العملاء.' },
  heroTitle2: { fr: 'Chaque mois.', en: 'Every month.', ar: 'كل شهر.' },
  heroSub: {
    fr: 'Des campagnes digitales sur mesure pour les businesses algériens qui veulent se démarquer, gagner en visibilité et convertir leur audience en clients. Résultats mesurables dès le premier mois.',
    en: 'Custom digital campaigns for Algerian businesses that want to stand out, gain visibility and convert their audience into clients. Measurable results from the first month.',
    ar: 'حملات رقمية مخصصة للأعمال الجزائرية التي تريد التميز واكتساب الظهور وتحويل جمهورها إلى عملاء. نتائج قابلة للقياس من الشهر الأول.',
  },
  seeOffers: { fr: 'Voir nos offres', en: 'See our offers', ar: 'عرض عروضنا' },
  statsTitle: { fr: 'Résultats prouvés sur le terrain', en: 'Field-proven results', ar: 'نتائج مثبتة ميدانياً' },
  packsTitle: { fr: 'Choisissez votre pack', en: 'Choose your pack', ar: 'اختر باقتك' },
  packsSub: { fr: 'Budget publicitaire inclus — aucun frais caché', en: 'Ad budget included — no hidden fees', ar: 'ميزانية الإعلانات مشمولة — لا رسوم خفية' },
  perMonth: { fr: 'tout inclus / mois', en: 'all inclusive / month', ar: 'الكل شامل / شهر' },
  recommended: { fr: '⭐ Recommandé', en: '⭐ Recommended', ar: '⭐ موصى به' },
  maxResults: { fr: '🔥 Max résultats', en: '🔥 Max results', ar: '🔥 أقصى نتائج' },
  choosePack: { fr: 'Choisir ce pack', en: 'Choose this pack', ar: 'اختر هذه الباقة' },
  customPack: { fr: 'Sur mesure', en: 'Custom', ar: 'مخصص' },
  customPackSub: { fr: 'Votre stratégie unique', en: 'Your unique strategy', ar: 'استراتيجيتك الفريدة' },
  customPackCta: { fr: 'Discutons ensemble', en: "Let's talk", ar: 'لنتحدث معاً' },
  customPackFeatures: {
    fr: ['Stratégie 100% personnalisée', 'Formats & plateformes sur mesure', 'Budget adapté à vos objectifs', 'Accompagnement dédié', 'Reporting personnalisé'],
    en: ['100% custom strategy', 'Custom formats & platforms', 'Budget adapted to your goals', 'Dedicated support', 'Custom reporting'],
    ar: ['استراتيجية 100% مخصصة', 'صيغ ومنصات حسب الطلب', 'ميزانية تتناسب مع أهدافك', 'مرافقة مخصصة', 'تقارير مخصصة'],
  },
  footerNote: { fr: 'Frais de déplacement hors wilaya définis selon votre localisation', en: 'Travel fees outside wilaya defined based on your location', ar: 'رسوم التنقل خارج الولاية محددة حسب موقعك' },
  testimonialsTitle: { fr: 'Ils nous font confiance', en: 'They trust us', ar: 'يثقون بنا' },
  back: { fr: 'Retour', en: 'Back', ar: 'رجوع' },
  packSelected: { fr: 'Pack sélectionné', en: 'Selected pack', ar: 'الباقة المختارة' },
  whyThisPack: { fr: 'Pourquoi ce pack ?', en: 'Why this pack?', ar: 'لماذا هذه الباقة؟' },
  reelsSection: { fr: 'Reels vidéo', en: 'Video Reels', ar: 'ريلز فيديو' },
  designsSection: { fr: 'Designs graphiques', en: 'Graphic designs', ar: 'تصاميم جرافيك' },
  howItWorks: { fr: 'Comment ça marche ?', en: 'How does it work?', ar: 'كيف يعمل؟' },
  bestFor: { fr: 'Ce pack est fait pour vous si…', en: 'This pack is for you if…', ar: 'هذه الباقة مناسبة لك إذا…' },
  included: { fr: 'Inclus dans ce pack', en: 'Included in this pack', ar: 'مشمول في هذه الباقة' },
  formTitle: { fr: 'Démarrons ensemble.', en: "Let's start together.", ar: 'لنبدأ معاً.' },
  formSub: { fr: 'Remplissez vos informations — on vous contacte sous 24h.', en: 'Fill in your info — we contact you within 24h.', ar: 'أدخل معلوماتك — سنتواصل معك خلال 24 ساعة.' },
  fullName: { fr: 'Nom complet', en: 'Full name', ar: 'الاسم الكامل' },
  fullNamePh: { fr: 'Ex: Omar Dahmani', en: 'Ex: John Smith', ar: 'مثال: عمر دحماني' },
  businessName: { fr: 'Nom de votre business', en: 'Your business name', ar: 'اسم نشاطك التجاري' },
  businessNamePh: { fr: 'Ex: Restaurant Dar Zitoun', en: 'Ex: Dar Zitoun Restaurant', ar: 'مثال: مطعم دار الزيتون' },
  phone: { fr: 'Numéro WhatsApp', en: 'WhatsApp number', ar: 'رقم واتساب' },
  phonePh: { fr: '05 00 00 00 00', en: '05 00 00 00 00', ar: '05 00 00 00 00' },
  wilaya: { fr: 'Wilaya', en: 'Wilaya', ar: 'الولاية' },
  wilayaPh: { fr: 'Sélectionnez votre wilaya', en: 'Select your wilaya', ar: 'اختر ولايتك' },
  baladia: { fr: 'Commune', en: 'Commune', ar: 'البلدية' },
  baladiaPh: { fr: 'Ex: Bab Ezzouar', en: 'Ex: Bab Ezzouar', ar: 'مثال: باب الزوار' },
  sectorLabel: { fr: 'Secteur d\'activité', en: 'Business sector', ar: 'قطاع النشاط' },
  onlineLabel: { fr: 'Présence en ligne actuelle', en: 'Current online presence', ar: 'الحضور الإلكتروني الحالي' },
  objectiveLabel: { fr: 'Votre objectif principal', en: 'Your main objective', ar: 'هدفك الرئيسي' },
  agencyLabel: { fr: 'Avez-vous déjà travaillé avec une agence ?', en: 'Have you worked with an agency before?', ar: 'هل سبق لك العمل مع وكالة؟' },
  recap: { fr: 'Récapitulatif', en: 'Summary', ar: 'ملخص' },
  recapNote: { fr: 'Frais de déplacement hors wilaya définis à l\'appel', en: 'Travel fees outside wilaya defined at call', ar: 'رسوم التنقل خارج الولاية عند الاتصال' },
  submit: { fr: 'Envoyer ma demande', en: 'Send my request', ar: 'إرسال طلبي' },
  submitting: { fr: 'Envoi en cours...', en: 'Sending...', ar: 'جارٍ الإرسال...' },
  successTitle: { fr: 'Demande envoyée !', en: 'Request sent!', ar: 'تم إرسال الطلب!' },
  successMsg: { fr: 'On vous contacte dans les 24h pour démarrer votre stratégie.', en: 'We will contact you within 24h to start your strategy.', ar: 'سنتواصل معك خلال 24 ساعة لبدء استراتيجيتك.' },
  backHome: { fr: 'Retour à l\'accueil', en: 'Back to home', ar: 'العودة للرئيسية' },
};

const ONLINE_OPTIONS = {
  fr: ['Pas de page / compte', 'Page inactive', 'Page active mais sans résultats'],
  en: ['No page / account', 'Inactive page', 'Active page but no results'],
  ar: ['لا توجد صفحة / حساب', 'صفحة غير نشطة', 'صفحة نشطة لكن بدون نتائج'],
};

const OBJECTIVE_OPTIONS = {
  fr: ['Attirer plus de clients', 'Augmenter ma visibilité', 'Lancer mon business en ligne', 'Fidéliser mes clients existants'],
  en: ['Attract more clients', 'Increase my visibility', 'Launch my business online', 'Retain existing clients'],
  ar: ['جذب المزيد من العملاء', 'زيادة ظهوري', 'إطلاق نشاطي على الإنترنت', 'الاحتفاظ بعملائي الحاليين'],
};

const AGENCY_OPTIONS = {
  fr: ['Non, première fois', 'Oui, sans résultats', 'Oui, avec de bons résultats'],
  en: ['No, first time', 'Yes, without results', 'Yes, with good results'],
  ar: ['لا، أول مرة', 'نعم، بدون نتائج', 'نعم، بنتائج جيدة'],
};

const packs = [
  { name: 'ESSENTIEL', subtitle: { fr: 'Pour bien démarrer', en: 'To get started', ar: 'للبداية الصحيحة' }, features: { fr: ['4 Reels professionnels', '4 Designs graphiques', 'Sans publicités Meta', 'Rapport mensuel', 'Support WhatsApp'], en: ['4 Professional Reels', '4 Graphic Designs', 'Without Meta Ads', 'Monthly report', 'WhatsApp support'], ar: ['4 ريلز احترافية', '4 تصاميم جرافيك', 'بدون إعلانات ميتا', 'تقرير شهري', 'دعم واتساب'] }, highlight: false, tag: null },
  { name: 'AVANCÉ', subtitle: { fr: 'Croissance accélérée', en: 'Accelerated growth', ar: 'نمو متسارع' }, features: { fr: ['6 Reels professionnels', '12 Designs graphiques', 'Gestion publicités Meta', 'Stratégie de contenu', 'Rapport bi-mensuel', 'Support prioritaire'], en: ['6 Professional Reels', '12 Graphic Designs', 'Meta Ads Management', 'Content strategy', 'Bi-monthly report', 'Priority support'], ar: ['6 ريلز احترافية', '12 تصاميم جرافيك', 'إدارة إعلانات ميتا', 'استراتيجية محتوى', 'تقرير نصف شهري', 'دعم أولوي'] }, highlight: false, tag: null },
  { name: 'PRO', subtitle: { fr: 'Le plus choisi', en: 'Most popular', ar: 'الأكثر اختياراً' }, features: { fr: ['8 Reels professionnels', '20 Designs graphiques', 'Meta + Instagram Ads', 'Stratégie avancée', 'Rapports hebdomadaires', 'Account manager dédié'], en: ['8 Professional Reels', '20 Graphic Designs', 'Meta + Instagram Ads', 'Advanced strategy', 'Weekly reports', 'Dedicated account manager'], ar: ['8 ريلز احترافية', '20 تصاميم جرافيك', 'ميتا + انستغرام', 'استراتيجية متقدمة', 'تقارير أسبوعية', 'مدير حساب مخصص'] }, highlight: true, tag: 'recommended' },
  { name: 'SCALE', subtitle: { fr: 'Dominez votre marché', en: 'Dominate your market', ar: 'سيطر على سوقك' }, features: { fr: ['12 Reels professionnels', '30 Designs graphiques', 'Meta + TikTok + Instagram', 'Stratégie full funnel', 'Rapports en temps réel', 'Account manager VIP'], en: ['12 Professional Reels', '30 Graphic Designs', 'Meta + TikTok + Instagram', 'Full funnel strategy', 'Real-time reports', 'VIP account manager'], ar: ['12 ريلز احترافية', '30 تصاميم جرافيك', 'ميتا + تيك توك + انستغرام', 'استراتيجية كاملة', 'تقارير فورية', 'مدير حساب VIP'] }, highlight: false, tag: 'maxResults' },
];

const stats = [
  { value: '125K', label: { fr: 'Interactions en 30 jours', en: 'Interactions in 30 days', ar: 'تفاعل في 30 يوماً' }, sub: { fr: 'Restaurant, Blida', en: 'Restaurant, Blida', ar: 'مطعم، البليدة' } },
  { value: '2 000', label: { fr: 'Followers en 28 jours', en: 'Followers in 28 days', ar: 'متابع في 28 يوماً' }, sub: { fr: 'Boutique mode, Alger', en: 'Fashion shop, Algiers', ar: 'بوتيك أزياء، الجزائر' } },
  { value: '240%', label: { fr: 'ROI dès le 1er mois', en: 'ROI from month 1', ar: 'عائد استثمار من الشهر الأول' }, sub: { fr: 'Clinique, Oran', en: 'Clinic, Oran', ar: 'عيادة، وهران' } },
  { value: '300+', label: { fr: 'Leads générés', en: 'Leads generated', ar: 'عميل محتمل تم توليده' }, sub: { fr: 'Agence immo, Tipaza', en: 'Real estate, Tipaza', ar: 'عقارات، تيبازة' } },
];

const testimonials = [
  { name: 'Amira B.', role: { fr: 'Gérante — Boutique Mode, Blida', en: 'Manager — Fashion Boutique, Blida', ar: 'مديرة — بوتيك أزياء، البليدة' }, text: { fr: 'En 3 semaines, on a triplé nos demandes. iVision a compris notre secteur dès le départ.', en: 'In 3 weeks, our requests tripled. iVision understood our sector from day one.', ar: 'في 3 أسابيع، تضاعفت طلباتنا ثلاث مرات. iVision فهمت قطاعنا من البداية.' }, avatar: 'https://i.pravatar.cc/100?u=amira_b' },
  { name: 'Karim M.', role: { fr: 'Gérant — Clinique Dentaire, Oran', en: 'Manager — Dental Clinic, Oran', ar: 'مدير — عيادة أسنان، وهران' }, text: { fr: 'Le ROI était visible dès la première semaine. Les reels convertissent vraiment bien.', en: 'ROI was visible from the first week. The reels convert really well.', ar: 'كان عائد الاستثمار واضحاً من الأسبوع الأول. الريلز تحول بشكل ممتاز.' }, avatar: 'https://i.pravatar.cc/100?u=karim_m' },
  { name: 'Nadia S.', role: { fr: 'Fondatrice — E-commerce, Alger', en: 'Founder — E-commerce, Algiers', ar: 'مؤسسة — تجارة إلكترونية، الجزائر' }, text: { fr: 'Professionnels, réactifs et efficaces. Notre page a explosé en moins d\'un mois.', en: 'Professional, responsive and effective. Our page exploded in less than a month.', ar: 'محترفون ومتجاوبون وفعالون. انتشرت صفحتنا في أقل من شهر.' }, avatar: 'https://i.pravatar.cc/100?u=nadia_s' },
];

const images = [
  { url: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80', badge: '+125K interactions' },
  { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&q=80', badge: '2 000 followers / 28j' },
  { url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&q=80', badge: '240% ROI' },
];

const WilayaSelector: React.FC<{ value: string; onChange: (v: string) => void; placeholder: string }> = ({ value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = WILAYAS.filter(w => w.toLowerCase().includes(search.toLowerCase()));
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) { setOpen(false); setSearch(''); }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button type="button" onClick={() => setOpen(!open)}
        className="w-full p-5 bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl transition-all outline-none text-navy dark:text-white font-bold text-base flex items-center justify-between hover:border-brand-blue focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5">
        <span className={value ? 'text-navy dark:text-white font-bold' : 'text-navy/30 dark:text-white/30 font-normal'}>{value || placeholder}</span>
        <svg className={`w-4 h-4 text-brand-blue transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-[#0f1729] border border-navy/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-3 border-b border-navy/5 dark:border-white/5 bg-white dark:bg-[#0f1729]">
            <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher..."
              className="w-full px-4 py-2.5 bg-navy/5 dark:bg-white/10 border border-navy/10 dark:border-white/10 rounded-xl outline-none text-navy dark:text-white text-sm font-medium placeholder:text-navy/30 dark:placeholder:text-white/30 focus:border-brand-blue" autoFocus />
          </div>
          <div className="max-h-52 overflow-y-auto bg-white dark:bg-[#0f1729]">
            {filtered.map(w => (
              <button key={w} type="button" onClick={() => { onChange(w); setOpen(false); setSearch(''); }}
                className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-brand-blue/10 hover:text-brand-blue ${value === w ? 'bg-brand-blue/10 text-brand-blue font-black' : 'text-navy dark:text-white'}`}>
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const OptionCard: React.FC<{ label: string; selected: boolean; onClick: () => void }> = ({ label, selected, onClick }) => (
  <div onClick={onClick} className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer text-center group ${selected ? 'bg-brand-blue/10 border-brand-blue shadow-lg shadow-brand-blue/10' : 'bg-navy/5 dark:bg-white/5 border-navy/5 dark:border-white/5 hover:border-brand-blue/30'}`}>
    <span className="text-xs font-bold uppercase text-navy dark:text-white">{label}</span>
    {selected && <div className="absolute top-2 right-2 text-brand-blue"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg></div>}
  </div>
);

const PackDetailsSection: React.FC<{ packName: string; lang: Language }> = ({ packName, lang }) => {
  const details = packDetails[packName];
  if (!details) return null;
  return (
    <div className="space-y-6 mb-10">
      <div className="p-6 rounded-3xl border border-navy/10 dark:border-white/10 bg-navy/2 dark:bg-white/2">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-blue mb-3">{T.whyThisPack[lang]}</p>
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-blue text-white font-black text-lg">{details.reels}</div>
            <span className="text-sm font-black text-navy dark:text-white uppercase tracking-wide">{T.reelsSection[lang]}</span>
          </div>
          <p className="text-sm text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-80">{details.whyReels[lang]}</p>
        </div>
        <div className="h-px bg-navy/5 dark:bg-white/10 my-4" />
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-navy/10 dark:bg-white/10 text-navy dark:text-white font-black text-lg">{details.designs}</div>
            <span className="text-sm font-black text-navy dark:text-white uppercase tracking-wide">{T.designsSection[lang]}</span>
          </div>
          <p className="text-sm text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-80">{details.whyDesigns[lang]}</p>
        </div>
      </div>
      <div className="p-6 rounded-3xl border border-brand-blue/20 bg-brand-blue/3 dark:bg-brand-blue/5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-blue mb-4">{T.howItWorks[lang]}</p>
        <div className="space-y-3">
          {details.howItWorks[lang].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-[10px] font-black mt-0.5">{i + 1}</div>
              <p className="text-sm text-navy dark:text-white font-medium leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="p-5 rounded-2xl bg-navy/5 dark:bg-white/5 border border-navy/5 dark:border-white/5 flex items-start gap-3">
        <span className="text-xl">✓</span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1">{T.bestFor[lang]}</p>
          <p className="text-sm text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed">{details.bestFor[lang]}</p>
        </div>
      </div>
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-blue mb-3">{T.included[lang]}</p>
        <div className="flex flex-wrap gap-2">
          {details.extras[lang].map((extra, i) => (
            <span key={i} className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20">{extra}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const PricingQuoteForm: React.FC<{ selectedPack: string; onBack: () => void; lang: Language }> = ({ selectedPack, onBack, lang }) => {
  const [formData, setFormData] = useState({
    name: '', businessName: '', phone: '', wilaya: '', baladia: '',
    sector: '', onlinePresence: '', objective: '', hadAgency: '',
    pack: selectedPack,
  });
  const [phoneError, setPhoneError] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const isRtl = lang === 'ar';

  const inputClass = "w-full p-5 bg-navy/5 dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-navy dark:text-white font-bold text-base placeholder:text-navy/30 dark:placeholder:text-white/30 placeholder:font-normal";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-3";

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    setFormData({ ...formData, phone: digits });
    if (digits.length > 0 && digits.length !== 10) setPhoneError('Le numéro doit contenir exactement 10 chiffres');
    else setPhoneError('');
  };

  const isValid = formData.name.trim() && formData.businessName.trim()
    && formData.phone.length === 10 && !phoneError
    && formData.wilaya && formData.baladia.trim()
    && formData.sector && formData.onlinePresence
    && formData.objective && formData.hadAgency;

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
          _subject: `[PRICING — PACK ${formData.pack}] ${formData.businessName} — ${formData.wilaya}`,
          source: 'Landing Pricing',
          langue: lang,
        }),
      });
      if (res.ok) { setStatus('done'); window.scrollTo({ top: 0, behavior: 'smooth' }); }
      else throw new Error();
    } catch { setStatus('error'); }
  };

  if (status === 'done') {
    return (
      <div className="min-h-screen bg-white dark:bg-transparent flex items-center justify-center p-8 transition-colors duration-500">
        <div className={`text-center animate-scale-in max-w-lg ${isRtl ? 'rtl' : ''}`}>
          <div className="w-24 h-24 bg-brand-blue rounded-full flex items-center justify-center mb-8 mx-auto text-white shadow-2xl shadow-brand-blue/30">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
          </div>
          <h2 className="text-4xl font-black mb-4 text-navy dark:text-white uppercase tracking-tighter">{T.successTitle[lang]}</h2>
          <p className="text-brand-gray text-lg font-medium mb-4 opacity-80 leading-relaxed">{T.successMsg[lang]}</p>
          <p className="text-brand-gray/50 text-sm mb-10">{T.packSelected[lang]} : <span className="font-black text-brand-blue">{formData.pack}</span></p>
          <button onClick={() => window.location.hash = ''} className="btn-ivision w-full py-5">{T.backHome[lang]}</button>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-white dark:bg-transparent transition-colors duration-500 py-24 md:py-32 ${isRtl ? 'rtl' : ''}`}>
      <div className="container max-w-2xl">
        <button onClick={onBack} className="mb-12 text-navy/40 dark:text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
          <svg className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:translate-x-1 rotate-180' : 'group-hover:-translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          <span className="text-[10px] font-black tracking-widest uppercase">{T.back[lang]}</span>
        </button>
        <div className="mb-10">
          <div className="sketch-badge mb-6">{T.packSelected[lang]}</div>
          <div className="inline-flex items-center gap-3 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl px-5 py-3 mb-6">
            <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
            <span className="text-brand-blue font-black text-sm uppercase tracking-wider">{selectedPack} — {packDetails[selectedPack]?.price}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-navy dark:text-white uppercase tracking-tighter leading-none mb-3">{T.formTitle[lang]}</h1>
          <p className="text-brand-gray font-medium opacity-60">{T.formSub[lang]}</p>
        </div>
        <PackDetailsSection packName={selectedPack} lang={lang} />
        <form onSubmit={onSubmit} className="space-y-8">
          <div>
            <label className={labelClass}>{T.fullName[lang]}</label>
            <input type="text" placeholder={T.fullNamePh[lang]} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{T.businessName[lang]}</label>
            <input type="text" placeholder={T.businessNamePh[lang]} value={formData.businessName} onChange={e => setFormData({ ...formData, businessName: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{T.phone[lang]}</label>
            <input type="tel" inputMode="numeric" placeholder={T.phonePh[lang]} value={formData.phone} onChange={handlePhoneChange} maxLength={10}
              className={`${inputClass} ${phoneError ? 'border-red-500 focus:border-red-500' : ''}`} />
            {phoneError && <p className="mt-2 ml-1 text-[11px] font-bold text-red-500 uppercase tracking-wide">{phoneError}</p>}
            {formData.phone.length === 10 && !phoneError && <p className="mt-2 ml-1 text-[11px] font-bold text-green-500 uppercase tracking-wide">✓ Numéro valide</p>}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className={labelClass}>{T.wilaya[lang]}</label>
              <WilayaSelector value={formData.wilaya} onChange={v => setFormData({ ...formData, wilaya: v })} placeholder={T.wilayaPh[lang]} />
            </div>
            <div>
              <label className={labelClass}>{T.baladia[lang]}</label>
              <input type="text" placeholder={T.baladiaPh[lang]} value={formData.baladia} onChange={e => setFormData({ ...formData, baladia: e.target.value })} className={inputClass} />
            </div>
          </div>
          <div>
            <label className={labelClass}>{T.sectorLabel[lang]}</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {SECTORS[lang].map((s) => (
                <OptionCard key={s} label={s} selected={formData.sector === s} onClick={() => setFormData({ ...formData, sector: s })} />
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>{T.onlineLabel[lang]}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {ONLINE_OPTIONS[lang].map((o) => (
                <OptionCard key={o} label={o} selected={formData.onlinePresence === o} onClick={() => setFormData({ ...formData, onlinePresence: o })} />
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>{T.objectiveLabel[lang]}</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {OBJECTIVE_OPTIONS[lang].map((o) => (
                <OptionCard key={o} label={o} selected={formData.objective === o} onClick={() => setFormData({ ...formData, objective: o })} />
              ))}
            </div>
          </div>
          <div>
            <label className={labelClass}>{T.agencyLabel[lang]}</label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {AGENCY_OPTIONS[lang].map((o) => (
                <OptionCard key={o} label={o} selected={formData.hadAgency === o} onClick={() => setFormData({ ...formData, hadAgency: o })} />
              ))}
            </div>
          </div>
          <div className="p-5 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-2">{T.recap[lang]}</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-navy dark:text-white font-black text-lg uppercase">{selectedPack}</span>
              <span className="text-brand-blue font-black">{packDetails[selectedPack]?.price}</span>
            </div>
            <p className="text-[10px] text-brand-gray/50 font-medium">{T.recapNote[lang]}</p>
          </div>
          {status === 'error' && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">
              Erreur réseau. Vérifiez votre connexion et réessayez.
            </div>
          )}
          <button type="submit" disabled={!isValid || status === 'submitting'}
            className="btn-ivision w-full py-6 text-base disabled:opacity-30 disabled:pointer-events-none group">
            <span>{status === 'submitting' ? T.submitting[lang] : T.submit[lang]}</span>
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

const TrainingCenterLanding: React.FC<Props> = ({ language: lang }) => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 100); return () => clearTimeout(t); }, []);

  const handleCustomPack = () => {
    const businessLine = lang === 'ar' ? 'أريد حزمة مخصصة' : lang === 'en' ? 'I want a custom pack' : 'Je souhaite un pack personnalisé';
    const detailLine = lang === 'ar' ? 'هل يمكنكم مساعدتي في بناء استراتيجية مخصصة لنشاطي؟' : lang === 'en' ? 'Can you help me build a custom digital strategy for my business?' : 'Pouvez-vous m\'aider à construire une stratégie digitale sur mesure pour mon business ?';
    const msg = encodeURIComponent(`Bonjour iVISION 👋\n\n${businessLine}\n\n${detailLine}\n\nMon secteur : [À préciser]\nMes objectifs : [À préciser]\n\nMerci !`);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, '_blank');
  };

  if (selectedPack) return <PricingQuoteForm selectedPack={selectedPack} onBack={() => setSelectedPack(null)} lang={lang} />;

  return (
    <div className={`min-h-screen bg-white dark:bg-transparent transition-colors duration-500 overflow-x-hidden ${isRtl ? 'rtl' : ''}`}>
      <section className="relative min-h-screen pt-36 pb-24 px-6 flex items-center">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-brand-blue/5 blur-[120px] rounded-full pointer-events-none" />
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1440 800" fill="none">
          <path d="M-100 400C300 200 700 600 1100 350C1300 220 1500 480 1600 380" stroke="rgba(0,51,255,0.25)" strokeWidth="1.5" strokeDasharray="8 8" />
        </svg>
        <div className="container max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="sketch-badge mb-8">{T.badge[lang]}</div>
              <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-black text-navy dark:text-white uppercase tracking-tighter leading-[0.9] mb-8">
                {T.heroTitle1[lang]}<br /><span className="text-brand-blue">{T.heroTitle2[lang]}</span>
              </h1>
              <p className="text-lg text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-70 max-w-xl mb-10">{T.heroSub[lang]}</p>
              <div className="flex flex-wrap gap-8 mb-10">
                {[{ v: '125K', l: { fr: 'interactions/mois', en: 'interactions/month', ar: 'تفاعل/شهر' } }, { v: '240%', l: { fr: 'ROI moyen', en: 'avg ROI', ar: 'متوسط العائد' } }, { v: '30j', l: { fr: 'premiers résultats', en: 'first results', ar: 'أول نتائج' } }].map(s => (
                  <div key={s.v} className="flex flex-col">
                    <span className="text-3xl font-black text-navy dark:text-white tracking-tighter">{s.v}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">{s.l[lang]}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => document.getElementById('packs')?.scrollIntoView({ behavior: 'smooth' })} className="btn-ivision px-10 py-5 group">
                <span>{T.seeOffers[lang]}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-y-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
              </button>
            </div>
            <div className={`hidden lg:grid grid-cols-2 gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="col-span-2 relative rounded-3xl overflow-hidden h-52 group">
                <img src={images[0].url} alt="business" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl shadow-lg shadow-brand-blue/30">{images[0].badge}</div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-40 group">
                <img src={images[1].url} alt="marketing" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">{images[1].badge}</div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-40 group">
                <img src={images[2].url} alt="résultats" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-brand-blue/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">{images[2].badge}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-navy/5 dark:border-white/5">
        <div className="container max-w-6xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-12">{T.statsTitle[lang]}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className={`glass-card rounded-3xl p-6 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="block text-4xl font-black text-navy dark:text-white tracking-tighter mb-2">{s.value}</span>
                <span className="block text-[11px] font-black uppercase tracking-widest text-brand-blue mb-1">{s.label[lang]}</span>
                <span className="block text-[10px] text-brand-gray/50 font-medium">{s.sub[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="packs" className="py-24 px-6">
        <div className="container max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-navy dark:text-white uppercase tracking-tighter mb-3">{T.packsTitle[lang]}</h2>
            <p className="text-brand-gray text-sm font-medium opacity-60">{T.packsSub[lang]}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {packs.map((pack) => (
              <div key={pack.name} className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 ${pack.highlight ? 'ring-2 ring-brand-blue shadow-2xl shadow-brand-blue/20 scale-[1.03]' : 'ring-1 ring-navy/10 dark:ring-white/10 hover:ring-brand-blue/50 hover:shadow-xl hover:-translate-y-1'}`}>
                {pack.tag && (
                  <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} z-10`}>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${pack.highlight ? 'bg-white text-brand-blue' : 'bg-brand-blue/10 text-brand-blue'}`}>
                      {pack.tag === 'recommended' ? T.recommended[lang] : T.maxResults[lang]}
                    </span>
                  </div>
                )}
                <div className={`px-6 pt-8 pb-6 ${pack.highlight ? 'bg-brand-blue' : 'bg-navy/5 dark:bg-white/5'}`}>
                  <h3 className={`text-lg font-black uppercase tracking-tighter mb-1 ${pack.highlight ? 'text-white' : 'text-navy dark:text-white'}`}>{pack.name}</h3>
                  <p className={`text-[11px] font-medium ${pack.highlight ? 'text-white/70' : 'text-brand-gray opacity-70'}`}>{pack.subtitle[lang]}</p>
                </div>
                <div className="flex flex-col flex-grow px-6 py-6 bg-white dark:bg-navy/40">
                  <div className="mb-6">
                    <span className="block text-3xl font-black text-navy dark:text-white tracking-tighter">{packDetails[pack.name]?.price}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">{T.perMonth[lang]}</span>
                  </div>
                  <div className="h-px bg-navy/5 dark:bg-white/10 mb-6" />
                  <ul className="flex flex-col gap-3 flex-grow mb-8">
                    {pack.features[lang].map((feat: string) => (
                      <li key={feat} className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 ${pack.highlight ? 'bg-brand-blue' : 'bg-brand-blue/10'}`}>
                          <svg className={`w-2.5 h-2.5 ${pack.highlight ? 'text-white' : 'text-brand-blue'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                        </span>
                        <span className="text-xs font-medium text-brand-gray dark:text-brand-gray/80 leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <button onClick={() => setSelectedPack(pack.name)} className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${pack.highlight ? 'bg-brand-blue text-white hover:brightness-110 shadow-lg shadow-brand-blue/30' : 'bg-navy/5 dark:bg-white/5 text-navy dark:text-white hover:bg-brand-blue hover:text-white border border-navy/10 dark:border-white/10 hover:border-brand-blue'}`}>
                    {T.choosePack[lang]}
                  </button>
                </div>
              </div>
            ))}

            {/* PACK PERSONNALISÉ */}
            <div className="relative flex flex-col rounded-3xl overflow-hidden ring-1 ring-dashed ring-brand-blue/40 hover:ring-brand-blue hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
              <div className="px-6 pt-8 pb-6 bg-brand-blue/5 dark:bg-brand-blue/10">
                <div className="w-8 h-8 rounded-xl bg-brand-blue/20 flex items-center justify-center mb-3">
                  <svg className="w-4 h-4 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
                </div>
                <h3 className="text-lg font-black uppercase tracking-tighter mb-1 text-navy dark:text-white">{T.customPack[lang]}</h3>
                <p className="text-[11px] font-medium text-brand-gray opacity-70">{T.customPackSub[lang]}</p>
              </div>
              <div className="flex flex-col flex-grow px-6 py-6 bg-white dark:bg-navy/40">
                <div className="mb-6">
                  <span className="block text-2xl font-black text-brand-blue tracking-tighter">Sur devis</span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">{T.perMonth[lang]}</span>
                </div>
                <div className="h-px bg-navy/5 dark:bg-white/10 mb-6" />
                <ul className="flex flex-col gap-3 flex-grow mb-8">
                  {T.customPackFeatures[lang].map((feat: string) => (
                    <li key={feat} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center mt-0.5 bg-brand-blue/10">
                        <svg className="w-2.5 h-2.5 text-brand-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      </span>
                      <span className="text-xs font-medium text-brand-gray dark:text-brand-gray/80 leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
                <button onClick={handleCustomPack} className="w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 bg-brand-blue/10 text-brand-blue hover:bg-brand-blue hover:text-white border border-brand-blue/20 hover:border-brand-blue flex items-center justify-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" /><path d="M12 0C5.373 0 0 5.373 0 12c0 2.385.695 4.61 1.898 6.484L.065 24l5.68-1.805A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.894a9.877 9.877 0 01-5.031-1.378l-.361-.214-3.732 1.187 1.225-3.614-.235-.371A9.865 9.865 0 012.106 12C2.106 6.533 6.533 2.106 12 2.106S21.894 6.533 21.894 12 17.467 21.894 12 21.894z" /></svg>
                  {T.customPackCta[lang]}
                </button>
              </div>
            </div>
          </div>
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-gray/30 mt-10">✦ {T.footerNote[lang]}</p>
        </div>
      </section>

      <section className="py-20 px-6 border-t border-navy/5 dark:border-white/5">
        <div className="container max-w-5xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-12">{T.testimonialsTitle[lang]}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <div key={i} className="glass-card rounded-3xl p-7 flex flex-col gap-5">
                <p className="text-brand-gray dark:text-brand-gray/80 text-sm font-medium leading-relaxed flex-grow">"{tm.text[lang]}"</p>
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
