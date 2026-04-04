import React, { useState, useEffect } from 'react';

import { FORMSPARK_ID } from '../lib/config';
type Language = 'fr' | 'en' | 'ar';
interface Props { language: Language; }

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

// ─── PACK DETAILS ────────────────────────────────────────────────────────────
const packDetails: Record<string, {
  price: string;
  color: string;
  reels: number;
  designs: number;
  whyReels: { fr: string; en: string; ar: string };
  whyDesigns: { fr: string; en: string; ar: string };
  howItWorks: { fr: string[]; en: string[]; ar: string[] };
  bestFor: { fr: string; en: string; ar: string };
  extras: { fr: string[]; en: string[]; ar: string[] };
}> = {
  ESSENTIEL: {
    price: '40 000 DA',
    color: '#1A1A5E',
    reels: 4,
    designs: 8,
    whyReels: {
      fr: '4 Reels par mois c\'est 1 vidéo par semaine — le rythme idéal pour lancer votre présence sans surcharger votre audience. Chaque reel cible un angle différent : présentation du centre, témoignage, offre du mois, behind-the-scenes.',
      en: '4 Reels per month means 1 video per week — the ideal rhythm to launch your presence without overwhelming your audience. Each reel targets a different angle: center presentation, testimonial, monthly offer, behind-the-scenes.',
      ar: '4 ريلز شهرياً تعني فيديو واحد أسبوعياً — الإيقاع المثالي لإطلاق حضورك دون إرهاق جمهورك. كل ريل يستهدف زاوية مختلفة: تقديم المركز، شهادة، عرض الشهر، كواليس.',
    },
    whyDesigns: {
      fr: '8 designs couvrent : 4 posts informatifs (conseils, infos sur les formations) + 4 posts promotionnels (offres, inscriptions). Un contenu visuel cohérent construit la confiance et la reconnaissance de votre marque.',
      en: '8 designs cover: 4 informative posts (tips, training info) + 4 promotional posts (offers, registrations). Consistent visual content builds trust and brand recognition.',
      ar: '8 تصاميم تغطي: 4 منشورات إعلامية (نصائح، معلومات التدريب) + 4 منشورات ترويجية (عروض، التسجيلات). المحتوى المرئي المتسق يبني الثقة والتعرف على العلامة التجارية.',
    },
    howItWorks: {
      fr: [
        'Semaine 1 : Tournage d\'une journée complète avec notre filmmaker',
        'Semaine 1-2 : Montage, voix off IA, sous-titres et visuels',
        'Semaine 2 : Lancement des campagnes Meta Ads ciblées',
        'Semaine 3-4 : Optimisation quotidienne + rapport de résultats',
      ],
      en: [
        'Week 1: Full day filming with our filmmaker',
        'Week 1-2: Editing, AI voiceover, subtitles and visuals',
        'Week 2: Launch of targeted Meta Ads campaigns',
        'Week 3-4: Daily optimization + results report',
      ],
      ar: [
        'الأسبوع 1: يوم تصوير كامل مع مصورنا',
        'الأسبوع 1-2: المونتاج، التعليق الصوتي بالذكاء الاصطناعي، الترجمة والمرئيات',
        'الأسبوع 2: إطلاق حملات ميتا الإعلانية المستهدفة',
        'الأسبوع 3-4: تحسين يومي + تقرير النتائج',
      ],
    },
    bestFor: {
      fr: 'Idéal pour les centres qui démarrent leur présence digitale ou ont un budget limité.',
      en: 'Ideal for centers starting their digital presence or with a limited budget.',
      ar: 'مثالي للمراكز التي تبدأ حضورها الرقمي أو لديها ميزانية محدودة.',
    },
    extras: {
      fr: ['Gestion complète des publicités Meta', 'Rapport mensuel détaillé', 'Support WhatsApp direct'],
      en: ['Full Meta Ads management', 'Detailed monthly report', 'Direct WhatsApp support'],
      ar: ['إدارة كاملة لإعلانات ميتا', 'تقرير شهري مفصل', 'دعم واتساب مباشر'],
    },
  },
  'AVANCÉ': {
    price: '60 000 DA',
    color: '#1A1AFF',
    reels: 6,
    designs: 12,
    whyReels: {
      fr: '6 Reels par mois = 1,5 vidéo par semaine. On diversifie les formats : reels courts viraux (15s), reels longs éducatifs (60s), et témoignages clients filmés. Plus de fréquence = plus d\'algorithme = plus de reach organique gratuit.',
      en: '6 Reels per month = 1.5 videos per week. We diversify formats: short viral reels (15s), long educational reels (60s), and filmed client testimonials. More frequency = more algorithm = more free organic reach.',
      ar: '6 ريلز شهرياً = 1.5 فيديو أسبوعياً. ننوع الصيغ: ريلز قصيرة فيروسية (15 ثانية)، ريلز تعليمية طويلة (60 ثانية)، وشهادات عملاء مصورة. المزيد من التكرار = المزيد من الخوارزمية = المزيد من الوصول العضوي المجاني.',
    },
    whyDesigns: {
      fr: '12 designs = 3 posts par semaine. On couvre tous les piliers : contenus éducatifs sur votre domaine de formation, témoignages graphiques, annonces d\'inscriptions, et carrousels de présentation des formateurs. Une présence constante qui rassure et convertit.',
      en: '12 designs = 3 posts per week. We cover all pillars: educational content on your training field, graphic testimonials, registration announcements, and trainer presentation carousels. A constant presence that reassures and converts.',
      ar: '12 تصميم = 3 منشورات أسبوعياً. نغطي جميع الركائز: محتوى تعليمي في مجال تدريبك، شهادات جرافيكية، إعلانات التسجيل، وعروض تقديمية للمدربين.',
    },
    howItWorks: {
      fr: [
        'Semaine 1 : Tournage + stratégie de contenu sur mesure',
        'Semaine 1-2 : Production complète : montage, voix off, visuels',
        'Semaine 2 : Lancement campagnes + ciblage affiné par zone géographique',
        'Semaine 3 : Analyse des premiers résultats + optimisation créatifs',
        'Semaine 4 : Rapport bi-mensuel + plan du mois suivant',
      ],
      en: [
        'Week 1: Filming + custom content strategy',
        'Week 1-2: Full production: editing, voiceover, visuals',
        'Week 2: Campaign launch + refined targeting by geographic area',
        'Week 3: Analysis of first results + creative optimization',
        'Week 4: Bi-monthly report + next month plan',
      ],
      ar: [
        'الأسبوع 1: التصوير + استراتيجية محتوى مخصصة',
        'الأسبوع 1-2: إنتاج كامل: مونتاج، تعليق صوتي، مرئيات',
        'الأسبوع 2: إطلاق الحملات + استهداف محسّن حسب المنطقة الجغرافية',
        'الأسبوع 3: تحليل النتائج الأولى + تحسين الإبداعات',
        'الأسبوع 4: تقرير نصف شهري + خطة الشهر القادم',
      ],
    },
    bestFor: {
      fr: 'Pour les centres qui veulent accélérer leur croissance et remplir leurs sessions rapidement.',
      en: 'For centers that want to accelerate their growth and fill their sessions quickly.',
      ar: 'للمراكز التي تريد تسريع نموها وملء جلساتها بسرعة.',
    },
    extras: {
      fr: ['Stratégie de contenu mensuelle', 'Ciblage géographique avancé', 'Rapport bi-mensuel', 'Support prioritaire 7j/7'],
      en: ['Monthly content strategy', 'Advanced geographic targeting', 'Bi-monthly report', 'Priority support 7 days/7'],
      ar: ['استراتيجية محتوى شهرية', 'استهداف جغرافي متقدم', 'تقرير نصف شهري', 'دعم أولوي 7 أيام/7'],
    },
  },
  PRO: {
    price: '100 000 DA',
    color: '#0033FF',
    reels: 8,
    designs: 20,
    whyReels: {
      fr: '8 Reels = 2 vidéos par semaine. C\'est la fréquence qui déclenche l\'algorithme Meta en faveur de votre page. On produit des formats variés : reels viraux courts, présentations de formations, interviews de formateurs, live replay montés, et vidéos de résultats de stagiaires.',
      en: '8 Reels = 2 videos per week. This is the frequency that triggers the Meta algorithm in favor of your page. We produce varied formats: short viral reels, training presentations, trainer interviews, edited live replays, and trainee results videos.',
      ar: '8 ريلز = فيديوان أسبوعياً. هذا هو التكرار الذي يحرك خوارزمية ميتا لصالح صفحتك. ننتج صيغاً متنوعة: ريلز فيروسية قصيرة، عروض تدريبية، مقابلات مدربين، مقاطع بث مباشر معدّلة، وفيديوهات نتائج المتدربين.',
    },
    whyDesigns: {
      fr: '20 designs = un post par jour ouvrable. On couvre tous les angles : contenu éducatif qui positionne votre centre comme expert, stories quotidiennes, carrousels de présentation, posts de témoignages, et visuels de campagne publicitaire. Votre feed devient une machine à confiance.',
      en: '20 designs = one post per working day. We cover all angles: educational content that positions your center as an expert, daily stories, presentation carousels, testimonial posts, and advertising campaign visuals. Your feed becomes a trust machine.',
      ar: '20 تصميم = منشور لكل يوم عمل. نغطي جميع الزوايا: محتوى تعليمي يضع مركزك في مكانة الخبير، قصص يومية، عروض تقديمية بالصور، منشورات الشهادات، ومرئيات الحملات الإعلانية. يصبح ملفك الشخصي آلة ثقة.',
    },
    howItWorks: {
      fr: [
        'J1-J3 : Audit complet + stratégie de contenu + calendrier éditorial',
        'J4-J7 : Tournage multi-formats avec filmmaker professionnel',
        'J8-J14 : Production : montage, voix off, motion design, visuels',
        'J15 : Lancement campagnes Meta + Instagram Ads simultanément',
        'J16-J30 : Optimisation quotidienne + A/B test des créatifs',
        'J30 : Rapport complet + stratégie mois suivant',
      ],
      en: [
        'D1-D3: Full audit + content strategy + editorial calendar',
        'D4-D7: Multi-format filming with professional filmmaker',
        'D8-D14: Production: editing, voiceover, motion design, visuals',
        'D15: Launch Meta + Instagram Ads simultaneously',
        'D16-D30: Daily optimization + A/B testing of creatives',
        'D30: Full report + next month strategy',
      ],
      ar: [
        'ي1-ي3: تدقيق كامل + استراتيجية محتوى + تقويم تحريري',
        'ي4-ي7: تصوير متعدد الصيغ مع مصور محترف',
        'ي8-ي14: الإنتاج: مونتاج، تعليق صوتي، موشن ديزاين، مرئيات',
        'ي15: إطلاق إعلانات ميتا + انستغرام في نفس الوقت',
        'ي16-ي30: تحسين يومي + اختبار A/B للإبداعات',
        'ي30: تقرير كامل + استراتيجية الشهر القادم',
      ],
    },
    bestFor: {
      fr: 'Le choix des centres sérieux qui veulent dominer leur marché local et générer un flux constant d\'inscriptions.',
      en: 'The choice of serious centers that want to dominate their local market and generate a constant flow of registrations.',
      ar: 'اختيار المراكز الجادة التي تريد السيطرة على سوقها المحلي وتوليد تدفق مستمر من التسجيلات.',
    },
    extras: {
      fr: ['Meta + Instagram Ads gérés', 'Calendrier éditorial mensuel', 'A/B testing créatifs', 'Rapports hebdomadaires', 'Account manager dédié'],
      en: ['Meta + Instagram Ads managed', 'Monthly editorial calendar', 'Creative A/B testing', 'Weekly reports', 'Dedicated account manager'],
      ar: ['إدارة إعلانات ميتا + انستغرام', 'تقويم تحريري شهري', 'اختبار A/B للإبداعات', 'تقارير أسبوعية', 'مدير حساب مخصص'],
    },
  },
  SCALE: {
    price: '150 000 DA',
    color: '#0A0A2E',
    reels: 12,
    designs: 30,
    whyReels: {
      fr: '12 Reels = 3 vidéos par semaine. C\'est la fréquence maximale pour saturer votre marché local. On produit pour 3 plateformes en parallèle : Meta, Instagram et TikTok. Formats différents selon la plateforme, audience différente, mais message cohérent. Votre centre est partout.',
      en: '12 Reels = 3 videos per week. This is the maximum frequency to saturate your local market. We produce for 3 platforms in parallel: Meta, Instagram and TikTok. Different formats per platform, different audience, but consistent message. Your center is everywhere.',
      ar: '12 ريل = 3 فيديوهات أسبوعياً. هذا هو التكرار الأقصى لإشباع سوقك المحلي. ننتج لـ 3 منصات بالتوازي: ميتا، انستغرام وتيك توك. صيغ مختلفة حسب المنصة، جمهور مختلف، لكن رسالة متسقة. مركزك في كل مكان.',
    },
    whyDesigns: {
      fr: '30 designs = un post par jour, 7j/7. Stories, posts, carrousels, visuels publicitaires pour 3 plateformes. Chaque pièce est optimisée pour sa plateforme. C\'est une domination totale du paysage digital de votre niche dans votre wilaya.',
      en: '30 designs = one post per day, 7 days/7. Stories, posts, carousels, advertising visuals for 3 platforms. Each piece is optimized for its platform. This is total domination of the digital landscape of your niche in your wilaya.',
      ar: '30 تصميم = منشور يومياً، 7 أيام/7. قصص، منشورات، عروض تقديمية بالصور، مرئيات إعلانية لـ 3 منصات. كل قطعة محسّنة لمنصتها. هذا هو الهيمنة الكاملة على المشهد الرقمي لمجال تخصصك في ولايتك.',
    },
    howItWorks: {
      fr: [
        'J1-J3 : Audit complet + stratégie full-funnel multi-plateformes',
        'J4-J7 : Tournage intensif (2 jours avec filmmaker)',
        'J8-J14 : Production complète : 3 plateformes, formats variés',
        'J15 : Lancement simultané Meta + Instagram + TikTok',
        'J16-J30 : Pilotage quotidien + optimisation temps réel',
        'Hebdomadaire : Rapport de performance complet',
        'J30 : Bilan + stratégie d\'expansion mois suivant',
      ],
      en: [
        'D1-D3: Full audit + multi-platform full-funnel strategy',
        'D4-D7: Intensive filming (2 days with filmmaker)',
        'D8-D14: Full production: 3 platforms, varied formats',
        'D15: Simultaneous launch Meta + Instagram + TikTok',
        'D16-D30: Daily management + real-time optimization',
        'Weekly: Full performance report',
        'D30: Review + next month expansion strategy',
      ],
      ar: [
        'ي1-ي3: تدقيق كامل + استراتيجية متعددة المنصات',
        'ي4-ي7: تصوير مكثف (يومان مع المصور)',
        'ي8-ي14: إنتاج كامل: 3 منصات، صيغ متنوعة',
        'ي15: إطلاق متزامن ميتا + انستغرام + تيك توك',
        'ي16-ي30: إدارة يومية + تحسين فوري',
        'أسبوعياً: تقرير أداء كامل',
        'ي30: مراجعة + استراتيجية توسع الشهر القادم',
      ],
    },
    bestFor: {
      fr: 'Pour les centres ambitieux qui veulent devenir LA référence de leur wilaya dans leur domaine de formation.',
      en: 'For ambitious centers that want to become THE reference in their wilaya in their training field.',
      ar: 'للمراكز الطموحة التي تريد أن تصبح المرجع في ولايتها في مجال تدريبها.',
    },
    extras: {
      fr: ['Meta + TikTok + Instagram gérés', 'Stratégie full-funnel', 'Rapports en temps réel', 'Account manager VIP', '2 jours de tournage/mois'],
      en: ['Meta + TikTok + Instagram managed', 'Full-funnel strategy', 'Real-time reports', 'VIP account manager', '2 filming days/month'],
      ar: ['إدارة ميتا + تيك توك + انستغرام', 'استراتيجية متكاملة', 'تقارير فورية', 'مدير حساب VIP', 'يومان تصوير شهرياً'],
    },
  },
};

// ─── TRANSLATIONS ────────────────────────────────────────────────────────────
const T = {
  badge: { fr: 'Offre Exclusive — Secteur Éducatif', en: 'Exclusive Offer — Education Sector', ar: 'عرض حصري — القطاع التعليمي' },
  heroTitle1: { fr: 'Remplissez vos sessions.', en: 'Fill your sessions.', ar: 'املأ جلساتك.' },
  heroTitle2: { fr: 'Chaque mois.', en: 'Every month.', ar: 'كل شهر.' },
  heroSub: {
    fr: 'Des campagnes digitales conçues spécialement pour les centres de formation, crèches et écoles privées en Algérie. Résultats mesurables dès le premier mois.',
    en: 'Digital campaigns designed specifically for training centers, nurseries and private schools in Algeria. Measurable results from the first month.',
    ar: 'حملات رقمية مصممة خصيصاً لمراكز التكوين والحضانات والمدارس الخاصة في الجزائر. نتائج قابلة للقياس من الشهر الأول.',
  },
  seeOffers: { fr: 'Voir nos offres', en: 'See our offers', ar: 'عرض عروضنا' },
  statsTitle: { fr: 'Résultats prouvés sur le terrain', en: 'Field-proven results', ar: 'نتائج مثبتة ميدانياً' },
  packsTitle: { fr: 'Choisissez votre pack', en: 'Choose your pack', ar: 'اختر باقتك' },
  packsSub: { fr: 'Budget publicitaire inclus — aucun frais caché', en: 'Ad budget included — no hidden fees', ar: 'ميزانية الإعلانات مشمولة — لا رسوم خفية' },
  perMonth: { fr: 'tout inclus / mois', en: 'all inclusive / month', ar: 'الكل شامل / شهر' },
  recommended: { fr: '⭐ Recommandé', en: '⭐ Recommended', ar: '⭐ موصى به' },
  maxResults: { fr: '🔥 Max résultats', en: '🔥 Max results', ar: '🔥 أقصى نتائج' },
  choosePack: { fr: 'Choisir ce pack', en: 'Choose this pack', ar: 'اختر هذه الباقة' },
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
  fullNamePh: { fr: 'Ex: Amira Bensalem', en: 'Ex: John Smith', ar: 'مثال: أمل بن سالم' },
  centerName: { fr: 'Nom du centre / établissement', en: 'Center / school name', ar: 'اسم المركز / المؤسسة' },
  centerNamePh: { fr: 'Ex: Centre Al Nour de Formation', en: 'Ex: Al Nour Training Center', ar: 'مثال: مركز النور للتكوين' },
  phone: { fr: 'Numéro de téléphone', en: 'Phone number', ar: 'رقم الهاتف' },
  phonePh: { fr: '05 00 00 00 00', en: '05 00 00 00 00', ar: '05 00 00 00 00' },
  wilaya: { fr: 'Wilaya', en: 'Wilaya', ar: 'الولاية' },
  wilayaPh: { fr: 'Sélectionnez votre wilaya', en: 'Select your wilaya', ar: 'اختر ولايتك' },
  baladia: { fr: 'Commune (Baladia)', en: 'Commune', ar: 'البلدية' },
  baladiaPh: { fr: 'Ex: Bab Ezzouar', en: 'Ex: Bab Ezzouar', ar: 'مثال: باب الزوار' },
  recap: { fr: 'Récapitulatif', en: 'Summary', ar: 'ملخص' },
  recapNote: { fr: 'Budget publicitaire inclus — frais de déplacement hors wilaya définis à l\'appel', en: 'Ad budget included — travel fees outside wilaya defined at call', ar: 'ميزانية الإعلانات مشمولة — رسوم التنقل خارج الولاية محددة عند الاتصال' },
  submit: { fr: 'Envoyer ma demande', en: 'Send my request', ar: 'إرسال طلبي' },
  submitting: { fr: 'Envoi en cours...', en: 'Sending...', ar: 'جارٍ الإرسال...' },
  successTitle: { fr: 'Demande envoyée !', en: 'Request sent!', ar: 'تم إرسال الطلب!' },
  successMsg: { fr: 'On vous contacte dans les 24h pour démarrer votre stratégie.', en: 'We will contact you within 24h to start your strategy.', ar: 'سنتواصل معك خلال 24 ساعة لبدء استراتيجيتك.' },
  backHome: { fr: 'Retour à l\'accueil', en: 'Back to home', ar: 'العودة للرئيسية' },
};

const packs = [
  {
    name: 'ESSENTIEL',
    subtitle: { fr: 'Pour bien démarrer', en: 'To get started', ar: 'للبداية الصحيحة' },
    features: {
      fr: ['4 Reels professionnels', '8 Designs graphiques', 'Gestion publicités Meta', 'Rapport mensuel', 'Support WhatsApp'],
      en: ['4 Professional Reels', '8 Graphic Designs', 'Meta Ads Management', 'Monthly report', 'WhatsApp support'],
      ar: ['4 ريلز احترافية', '8 تصاميم جرافيك', 'إدارة إعلانات ميتا', 'تقرير شهري', 'دعم واتساب'],
    },
    highlight: false, tag: null,
  },
  {
    name: 'AVANCÉ',
    subtitle: { fr: 'Croissance accélérée', en: 'Accelerated growth', ar: 'نمو متسارع' },
    features: {
      fr: ['6 Reels professionnels', '12 Designs graphiques', 'Gestion publicités Meta', 'Stratégie de contenu', 'Rapport bi-mensuel', 'Support prioritaire'],
      en: ['6 Professional Reels', '12 Graphic Designs', 'Meta Ads Management', 'Content strategy', 'Bi-monthly report', 'Priority support'],
      ar: ['6 ريلز احترافية', '12 تصاميم جرافيك', 'إدارة إعلانات ميتا', 'استراتيجية محتوى', 'تقرير نصف شهري', 'دعم أولوي'],
    },
    highlight: false, tag: null,
  },
  {
    name: 'PRO',
    subtitle: { fr: 'Le plus choisi', en: 'Most popular', ar: 'الأكثر اختياراً' },
    features: {
      fr: ['8 Reels professionnels', '20 Designs graphiques', 'Meta + Instagram Ads', 'Stratégie avancée', 'Rapports hebdomadaires', 'Account manager dédié'],
      en: ['8 Professional Reels', '20 Graphic Designs', 'Meta + Instagram Ads', 'Advanced strategy', 'Weekly reports', 'Dedicated account manager'],
      ar: ['8 ريلز احترافية', '20 تصاميم جرافيك', 'ميتا + انستغرام', 'استراتيجية متقدمة', 'تقارير أسبوعية', 'مدير حساب مخصص'],
    },
    highlight: true, tag: 'recommended',
  },
  {
    name: 'SCALE',
    subtitle: { fr: 'Dominez votre marché', en: 'Dominate your market', ar: 'سيطر على سوقك' },
    features: {
      fr: ['12 Reels professionnels', '30 Designs graphiques', 'Meta + TikTok + Instagram', 'Stratégie full funnel', 'Rapports en temps réel', 'Account manager VIP'],
      en: ['12 Professional Reels', '30 Graphic Designs', 'Meta + TikTok + Instagram', 'Full funnel strategy', 'Real-time reports', 'VIP account manager'],
      ar: ['12 ريلز احترافية', '30 تصاميم جرافيك', 'ميتا + تيك توك + انستغرام', 'استراتيجية كاملة', 'تقارير فورية', 'مدير حساب VIP'],
    },
    highlight: false, tag: 'maxResults',
  },
];

const stats = [
  { value: '125K', label: { fr: 'Interactions en 30 jours', en: 'Interactions in 30 days', ar: 'تفاعل في 30 يوماً' }, sub: { fr: 'Centre de formation, Blida', en: 'Training center, Blida', ar: 'مركز تكوين، البليدة' } },
  { value: '2 000', label: { fr: 'Followers en 28 jours', en: 'Followers in 28 days', ar: 'متابع في 28 يوماً' }, sub: { fr: 'Crèche privée, Alger', en: 'Private nursery, Algiers', ar: 'روضة خاصة، الجزائر' } },
  { value: '240%', label: { fr: 'ROI dès le 1er mois', en: 'ROI from month 1', ar: 'عائد استثمار من الشهر الأول' }, sub: { fr: 'École de langue, Oran', en: 'Language school, Oran', ar: 'مدرسة لغات، وهران' } },
  { value: '300+', label: { fr: 'Inscriptions générées', en: 'Registrations generated', ar: 'تسجيل تم توليده' }, sub: { fr: 'Centre de soutien, Tipaza', en: 'Support center, Tipaza', ar: 'مركز دعم، تيبازة' } },
];

const testimonials = [
  { name: 'Amira B.', role: { fr: 'Directrice — Centre de Formation, Blida', en: 'Director — Training Center, Blida', ar: 'مديرة — مركز التكوين، البليدة' }, text: { fr: 'En 3 semaines, on a rempli toutes nos sessions. iVision a compris notre secteur dès le départ.', en: 'In 3 weeks, all our sessions were full. iVision understood our sector from day one.', ar: 'في 3 أسابيع، امتلأت جميع جلساتنا. iVision فهمت قطاعنا من البداية.' }, avatar: 'https://i.pravatar.cc/100?u=amira_b' },
  { name: 'Karim M.', role: { fr: 'Gérant — École de Langues, Oran', en: 'Manager — Language School, Oran', ar: 'مدير — مدرسة لغات، وهران' }, text: { fr: 'Le ROI était visible dès la première semaine. Les reels convertissent vraiment bien.', en: 'ROI was visible from the first week. The reels convert really well.', ar: 'كان عائد الاستثمار واضحاً من الأسبوع الأول. الريلز تحول بشكل ممتاز.' }, avatar: 'https://i.pravatar.cc/100?u=karim_m' },
  { name: 'Nadia S.', role: { fr: 'Fondatrice — Crèche Privée, Alger', en: 'Founder — Private Nursery, Algiers', ar: 'مؤسسة — روضة خاصة، الجزائر' }, text: { fr: 'Professionnels, réactifs et efficaces. Notre page a explosé en moins d\'un mois.', en: 'Professional, responsive and effective. Our page exploded in less than a month.', ar: 'محترفون ومتجاوبون وفعالون. انتشرت صفحتنا في أقل من شهر.' }, avatar: 'https://i.pravatar.cc/100?u=nadia_s' },
];

const images = [
  { url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80', badge: '+125K interactions' },
  { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600&q=80', badge: '2 000 followers / 28j' },
  { url: 'https://images.unsplash.com/photo-1588072432836-e10032774350?w=600&q=80', badge: '240% ROI' },
];

// ─── WILAYA SELECTOR ─────────────────────────────────────────────────────────
const WilayaSelector: React.FC<{ value: string; onChange: (v: string) => void; placeholder: string }> = ({ value, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const filtered = WILAYAS.filter(w => w.toLowerCase().includes(search.toLowerCase()));
  const containerRef = React.useRef<HTMLDivElement>(null);

  // BUG 5 FIX: Fermer le dropdown si clic en dehors
  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch('');
      }
    };
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open]);

  return (
    <div className="relative" ref={containerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full p-5 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-2xl transition-all outline-none text-white font-bold text-base flex items-center justify-between hover:border-brand-blue focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5"
      >
        <span className={value ? 'text-white font-bold' : 'text-white/30 dark:text-white/30 font-normal'}>
          {value || placeholder}
        </span>
        <svg className={`w-4 h-4 text-brand-blue transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute z-50 top-full mt-2 w-full bg-white dark:bg-transparent border border-white/10 dark:border-white/10 rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-3 border-b border-white/5 dark:border-white/5">
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher..."
              className="w-full px-4 py-2.5 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-xl outline-none text-white text-sm font-medium placeholder:text-white/30 dark:placeholder:text-white/30 focus:border-brand-blue"
              autoFocus
            />
          </div>
          <div className="max-h-52 overflow-y-auto">
            {filtered.map(w => (
              <button
                key={w}
                type="button"
                onClick={() => { onChange(w); setOpen(false); setSearch(''); }}
                className={`w-full text-left px-5 py-3 text-sm font-medium transition-colors hover:bg-brand-blue/10 hover:text-brand-blue ${value === w ? 'bg-brand-blue/10 text-brand-blue font-black' : 'text-white'}`}
              >
                {w}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── PACK DETAILS SECTION ─────────────────────────────────────────────────────
const PackDetailsSection: React.FC<{ packName: string; lang: Language }> = ({ packName, lang }) => {
  const details = packDetails[packName];
  if (!details) return null;

  return (
    <div className="space-y-6 mb-10">
      {/* Header */}
      <div className="p-6 rounded-3xl border border-white/10 dark:border-white/10 bg-transparent/2 dark:bg-white/2">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-blue mb-3">{T.whyThisPack[lang]}</p>

        {/* Reels block */}
        <div className="mb-5">
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-brand-blue text-white font-black text-lg">{details.reels}</div>
            <span className="text-sm font-black text-white uppercase tracking-wide">{T.reelsSection[lang]}</span>
          </div>
          <p className="text-sm text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-80">{details.whyReels[lang]}</p>
        </div>

        <div className="h-px bg-white/5 dark:bg-white/10 my-4" />

        {/* Designs block */}
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white/10 dark:bg-white/10 text-white font-black text-lg">{details.designs}</div>
            <span className="text-sm font-black text-white uppercase tracking-wide">{T.designsSection[lang]}</span>
          </div>
          <p className="text-sm text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-80">{details.whyDesigns[lang]}</p>
        </div>
      </div>

      {/* How it works */}
      <div className="p-6 rounded-3xl border border-brand-blue/20 bg-brand-blue/3 dark:bg-brand-blue/5">
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-blue mb-4">{T.howItWorks[lang]}</p>
        <div className="space-y-3">
          {details.howItWorks[lang].map((step, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-blue text-white flex items-center justify-center text-[10px] font-black mt-0.5">{i + 1}</div>
              <p className="text-sm text-white font-medium leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Best for */}
      <div className="p-5 rounded-2xl bg-white/5 dark:bg-white/5 border border-white/5 dark:border-white/5 flex items-start gap-3">
        <span className="text-xl">✓</span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-1">{T.bestFor[lang]}</p>
          <p className="text-sm text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed">{details.bestFor[lang]}</p>
        </div>
      </div>

      {/* Extras */}
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-blue mb-3">{T.included[lang]}</p>
        <div className="flex flex-wrap gap-2">
          {details.extras[lang].map((extra, i) => (
            <span key={i} className="text-[11px] font-bold px-3 py-1.5 rounded-full bg-brand-blue/10 text-brand-blue border border-brand-blue/20">
              {extra}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ─── QUOTE FORM ───────────────────────────────────────────────────────────────
const AcademiqQuoteForm: React.FC<{ selectedPack: string; onBack: () => void; lang: Language }> = ({ selectedPack, onBack, lang }) => {
  const [formData, setFormData] = useState({ name: '', centerName: '', phone: '', wilaya: '', baladia: '', pack: selectedPack });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'done' | 'error'>('idle');
  const isRtl = lang === 'ar';

  const inputClass = "w-full p-5 bg-white/5 dark:bg-white/5 border border-white/10 dark:border-white/10 rounded-2xl focus:border-brand-blue focus:ring-4 focus:ring-brand-blue/5 transition-all outline-none text-white font-bold text-base placeholder:text-white/30 dark:placeholder:text-white/30 placeholder:font-normal";
  const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-brand-blue mb-3";
  // BUG 6 FIX: Validation téléphone format algérien (05/06/07 + 8 chiffres)
  const phoneRegex = /^(0[5-7][0-9]{8}|\+213[5-7][0-9]{8})$/;
  const phoneValid = phoneRegex.test(formData.phone.replace(/\s/g, ''));
  const isValid = formData.name.trim() && formData.centerName.trim() && phoneValid && formData.wilaya && formData.baladia.trim();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus('submitting');
    try {
      const res = await fetch(`https://submit-form.com/${FORMSPARK_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ ...formData, _subject: `[ACADEMIQ — PACK ${formData.pack}] ${formData.centerName} — ${formData.wilaya}`, source: 'Landing Academiq', langue: lang }),
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
          <h2 className="text-4xl font-black mb-4 text-white uppercase tracking-tighter">{T.successTitle[lang]}</h2>
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
        {/* Back */}
        <button onClick={onBack} className="mb-12 text-white/40 dark:text-white/40 hover:text-brand-blue transition-colors flex items-center gap-2 group">
          <svg className={`w-5 h-5 transition-transform ${isRtl ? 'group-hover:translate-x-1 rotate-180' : 'group-hover:-translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-[10px] font-black tracking-widest uppercase">{T.back[lang]}</span>
        </button>

        {/* Pack badge + title */}
        <div className="mb-10">
          <div className="sketch-badge mb-6">{T.packSelected[lang]}</div>
          <div className="inline-flex items-center gap-3 bg-brand-blue/10 border border-brand-blue/30 rounded-2xl px-5 py-3 mb-6">
            <div className="w-2 h-2 bg-brand-blue rounded-full animate-pulse" />
            <span className="text-brand-blue font-black text-sm uppercase tracking-wider">{selectedPack} — {packDetails[selectedPack]?.price}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter leading-none mb-3">
            {T.formTitle[lang]}
          </h1>
          <p className="text-brand-gray font-medium opacity-60">{T.formSub[lang]}</p>
        </div>

        {/* ──── PACK DETAILS ABOVE FORM ──── */}
        <PackDetailsSection packName={selectedPack} lang={lang} />

        {/* ──── FORM ──── */}
        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label className={labelClass}>{T.fullName[lang]}</label>
            <input type="text" placeholder={T.fullNamePh[lang]} value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{T.centerName[lang]}</label>
            <input type="text" placeholder={T.centerNamePh[lang]} value={formData.centerName} onChange={e => setFormData({ ...formData, centerName: e.target.value })} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>{T.phone[lang]}</label>
            <input type="tel" placeholder={T.phonePh[lang]} value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className={inputClass} />
            {formData.phone.trim() && !phoneValid && (
              <p className="mt-2 text-xs text-red-500 font-bold">Format invalide (ex: 0561234567)</p>
            )}
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

          {/* Recap */}
          <div className="p-5 bg-brand-blue/5 border border-brand-blue/20 rounded-2xl">
            <p className="text-[10px] font-black uppercase tracking-widest text-brand-blue mb-2">{T.recap[lang]}</p>
            <div className="flex items-center justify-between mb-1">
              <span className="text-white font-black text-lg uppercase">{selectedPack}</span>
              <span className="text-brand-blue font-black">{packDetails[selectedPack]?.price}</span>
            </div>
            <p className="text-[10px] text-brand-gray/50 font-medium">{T.recapNote[lang]}</p>
          </div>

          {status === 'error' && (
              <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-sm font-bold text-center">
                Erreur réseau. Vérifiez votre connexion et réessayez.
              </div>
            )}
          <button type="submit" disabled={!isValid || status === 'submitting'} className="btn-ivision w-full py-6 text-base disabled:opacity-30 disabled:pointer-events-none group">
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

// ─── MAIN LANDING ─────────────────────────────────────────────────────────────
const TrainingCenterLanding: React.FC<Props> = ({ language: lang }) => {
  const [selectedPack, setSelectedPack] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const isRtl = lang === 'ar';

  useEffect(() => { const t = setTimeout(() => setIsVisible(true), 100); return () => clearTimeout(t); }, []);

  if (selectedPack) return <AcademiqQuoteForm selectedPack={selectedPack} onBack={() => setSelectedPack(null)} lang={lang} />;

  return (
    <div className={`min-h-screen bg-white dark:bg-transparent transition-colors duration-500 overflow-x-hidden ${isRtl ? 'rtl' : ''}`}>

      {/* HERO */}
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
              <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                {T.heroTitle1[lang]}<br /><span className="text-brand-blue">{T.heroTitle2[lang]}</span>
              </h1>
              <p className="text-lg text-brand-gray dark:text-brand-gray/80 font-medium leading-relaxed opacity-70 max-w-xl mb-10">{T.heroSub[lang]}</p>
              <div className="flex flex-wrap gap-8 mb-10">
                {[
                  { v: '125K', l: { fr: 'interactions/mois', en: 'interactions/month', ar: 'تفاعل/شهر' } },
                  { v: '240%', l: { fr: 'ROI moyen', en: 'avg ROI', ar: 'متوسط العائد' } },
                  { v: '30j', l: { fr: 'premiers résultats', en: 'first results', ar: 'أول نتائج' } },
                ].map(s => (
                  <div key={s.v} className="flex flex-col">
                    <span className="text-3xl font-black text-white tracking-tighter">{s.v}</span>
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
                <img src={images[0].url} alt="formation" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />
                <div className="absolute top-4 right-4 bg-brand-blue text-white text-[10px] font-black uppercase tracking-wider px-3 py-2 rounded-xl shadow-lg shadow-brand-blue/30">{images[0].badge}</div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-40 group">
                <img src={images[1].url} alt="apprentissage" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-white/10 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">{images[1].badge}</div>
              </div>
              <div className="relative rounded-3xl overflow-hidden h-40 group">
                <img src={images[2].url} alt="centre" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                <div className="absolute bottom-3 left-3 bg-brand-blue/80 backdrop-blur-sm text-white text-[10px] font-black uppercase tracking-wider px-2 py-1 rounded-lg">{images[2].badge}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 border-t border-white/5 dark:border-white/5">
        <div className="container max-w-6xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-12">{T.statsTitle[lang]}</p>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <div key={i} className={`glass-card rounded-3xl p-6 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <span className="block text-4xl font-black text-white tracking-tighter mb-2">{s.value}</span>
                <span className="block text-[11px] font-black uppercase tracking-widest text-brand-blue mb-1">{s.label[lang]}</span>
                <span className="block text-[10px] text-brand-gray/50 font-medium">{s.sub[lang]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="py-24 px-6">
        <div className="container max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-3">{T.packsTitle[lang]}</h2>
            <p className="text-brand-gray text-sm font-medium opacity-60">{T.packsSub[lang]}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {packs.map((pack) => (
              <div key={pack.name} className={`relative flex flex-col rounded-3xl overflow-hidden transition-all duration-500 ${pack.highlight ? 'ring-2 ring-brand-blue shadow-2xl shadow-brand-blue/20 scale-[1.03]' : 'ring-1 ring-navy/10 dark:ring-white/10 hover:ring-brand-blue/50 hover:shadow-xl hover:-translate-y-1'}`}>
                {pack.tag && (
                  <div className={`absolute top-3 ${isRtl ? 'left-3' : 'right-3'} z-10`}>
                    <span className={`text-[9px] font-black uppercase tracking-wider px-2 py-1 rounded-lg ${pack.highlight ? 'bg-white text-brand-blue' : 'bg-brand-blue/10 text-brand-blue'}`}>
                      {pack.tag === 'recommended' ? T.recommended[lang] : T.maxResults[lang]}
                    </span>
                  </div>
                )}
                <div className={`px-6 pt-8 pb-6 ${pack.highlight ? 'bg-brand-blue' : 'bg-white/5 dark:bg-white/5'}`}>
                  <h3 className={`text-lg font-black uppercase tracking-tighter mb-1 ${pack.highlight ? 'text-white' : 'text-white'}`}>{pack.name}</h3>
                  <p className={`text-[11px] font-medium ${pack.highlight ? 'text-white/70' : 'text-brand-gray opacity-70'}`}>{pack.subtitle[lang]}</p>
                </div>
                <div className="flex flex-col flex-grow px-6 py-6 bg-white dark:bg-transparent/40">
                  <div className="mb-6">
                    <span className="block text-3xl font-black text-white tracking-tighter">{packDetails[pack.name]?.price}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gray/50">{T.perMonth[lang]}</span>
                  </div>
                  <div className="h-px bg-white/5 dark:bg-white/10 mb-6" />
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
                  <button onClick={() => setSelectedPack(pack.name)} className={`w-full py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${pack.highlight ? 'bg-brand-blue text-white hover:brightness-110 shadow-lg shadow-brand-blue/30' : 'bg-white/5 dark:bg-white/5 text-white hover:bg-brand-blue hover:text-white border border-white/10 dark:border-white/10 hover:border-brand-blue'}`}>
                    {T.choosePack[lang]}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-[11px] font-bold uppercase tracking-widest text-brand-gray/30 mt-10">✦ {T.footerNote[lang]}</p>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-20 px-6 border-t border-white/5 dark:border-white/5">
        <div className="container max-w-5xl">
          <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-blue mb-12">{T.testimonialsTitle[lang]}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <div key={i} className="glass-card rounded-3xl p-7 flex flex-col gap-5">
                <p className="text-brand-gray dark:text-brand-gray/80 text-sm font-medium leading-relaxed flex-grow">"{tm.text[lang]}"</p>
                <div className="flex items-center gap-4">
                  <img src={tm.avatar} alt={tm.name} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <span className="block text-xs font-black text-white">{tm.name}</span>
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
