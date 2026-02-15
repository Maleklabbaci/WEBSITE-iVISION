
export type Language = 'fr' | 'en' | 'ar';

const textContent = {
  header: {
    links: {
      fr: ['Accueil', 'Services', 'Notre Méthode'],
      en: ['Home', 'Services', 'Our Method'],
      ar: ['الرئيسية', 'خدماتنا', 'طريقتنا'],
    },
    cta: {
      fr: 'Devis Gratuit',
      en: 'Free Quote',
      ar: 'عرض سعر مجاني',
    },
  },
  qualification: {
    title: {
      fr: 'Critères de Partenariat',
      en: 'Partnership Criteria',
      ar: 'معايير الشراكة',
    },
    message: {
      fr: 'Nous limitons nos collaborations à 3 nouveaux clients par mois pour garantir une excellence maximale.',
      en: 'We limit our collaborations to 3 new clients per month to ensure maximum excellence.',
      ar: 'نحن نقصر تعاوننا على 3 عملاء جدد فقط شهريًا لضمان أقصى قدر من التميز.',
    },
    badge: {
      fr: 'Sélectivité Active',
      en: 'Selective Partnership',
      ar: 'شراكة انتقائية',
    }
  },
  hero: {
    badge: {
      fr: 'Agence de performance digitale',
      en: 'Digital Performance Agency',
      ar: 'وكالة الأداء الرقمي',
    },
    title: {
      fr: 'Boostez vos ventes en ligne avec une stratégie digitale sur-mesure',
      en: 'Boost your online sales with a custom digital strategy',
      ar: 'عزز مبيعاتك عبر الإنترنت باستراتيجية رقمية مخصصة',
    },
    subtitle: {
      fr: '+300 entreprises nous font confiance pour transformer leur présence en ligne en chiffre d’affaires mesurable.',
      en: '+300 companies trust us to transform their online presence into measurable revenue.',
      ar: '+300 شركة تثق بنا لتحويل تواجدها عبر الإنترنت إلى إيرادات ملموسة.',
    },
    cta: {
      fr: 'DEMANDEZ UN AUDIT GRATUIT',
      en: 'REQUEST A FREE AUDIT',
      ar: 'اطلب تدقيقاً مجانياً',
    },
    secondaryCta: {
      fr: 'NOTRE MÉTHODE',
      en: 'OUR METHOD',
      ar: 'طريقة عملنا',
    }
  },
  visualShowcase: {
    title: {
      fr: 'Projets Récents',
      en: 'Recent Projects',
      ar: 'مشاريعنا الأخيرة',
    },
    subtitle: {
      fr: 'Des résultats concrets pour des marques ambitieuses.',
      en: 'Concrete results for ambitious brands.',
      ar: 'نتائج ملموسة لعلامات تجارية طموحة.',
    }
  },
  clientLogos: {
    title: {
      fr: 'Pourquoi iVISION ?',
      en: 'Why iVISION?',
      ar: 'لماذا iVISION؟',
    },
    subtitle: {
      fr: 'Nous ne sommes pas juste une autre agence. Nous sommes votre équipe de croissance.',
      en: 'We are not just another agency. We are your growth team.',
      ar: 'نحن لسنا مجرد وكالة أخرى. نحن فريق النمو الخاص بك.',
    },
    points: {
      fr: [
        { title: 'Expertise Ciblée', description: 'Nous vivons et respirons l\'e-commerce. Notre spécialisation nous permet de créer des stratégies qui frappent juste.' },
        { title: 'Approche Partenaire', description: 'Votre succès est notre succès. Nous nous intégrons à votre équipe pour atteindre des objectifs communs.' },
        { title: 'Stratégie Basée sur la Data', description: 'Chaque décision est guidée par des données concrètes, assurant un ROI maximal.' },
        { title: 'Résultats Concrets', description: 'Nous nous concentrons sur les ventes et une croissance durable.' },
      ],
      en: [
        { title: 'Targeted Expertise', description: 'We live and breathe e-commerce. Our specialization allows us to create strategies that hit the mark.' },
        { title: 'Partnership Approach', description: 'Your success is our success. We integrate with your team to achieve common goals.' },
        { title: 'Data-Driven Strategy', description: 'Every decision is guided by concrete data, ensuring maximum ROI.' },
        { title: 'Tangible Results', description: 'We focus on sales and sustainable growth.' },
      ],
      ar: [
        { title: 'خبرة مستهدفة', description: 'نحن نعيش ونتنفس التجارة الإلكترونية. تخصصنا يسمح لنا بإنشاء استراتيجيات تصيب الهدف.' },
        { title: 'نهج الشراكة', description: 'نجاحك هو نجاحنا. نحن نندمج مع فريقك لتحقيق الأهداف المشتركة.' },
        { title: 'استراتيجية تعتمد على البيانات', description: 'كل قرار يسترشد ببيانات ملموسة، مما يضمن أقصى عائد على الاستثمار.' },
        { title: 'نتائج ملموسة', description: 'نحن نركز on المبيعات والنمو المستدام.' },
      ]
    }
  },
  services: {
    title: {
      fr: 'Nos Services',
      en: 'Our Services',
      ar: 'خدماتنا',
    },
    subtitle: {
      fr: 'Des solutions complètes pour propulser votre business.',
      en: 'Comprehensive solutions to boost your business.',
      ar: 'حلول شاملة لدفع تجارتك.',
    },
    items: {
      fr: [
        { title: 'Marketing digital complet', description: 'Stratégie digitale 360° pour booster votre présence.' },
        { title: 'Création de contenu', description: 'Contenus visuels et vidéos qui convertissent.' },
        { title: 'Sponsoring Meta Ads', description: 'Campagnes optimisées pour maximiser votre ROI.' },
        { title: 'Website e-commerce', description: 'Sites modernes, responsive et performants.' },
      ],
      en: [
        { title: 'Complete Digital Marketing', description: '360° digital strategy to boost your presence.' },
        { title: 'Content Creation', description: 'Visual and video content that converts.' },
        { title: 'Meta Ads Sponsoring', description: 'Optimized campaigns to maximize your ROI.' },
        { title: 'E-commerce Website', description: 'Modern, responsive, and high-performance sites.' },
      ],
      ar: [
        { title: 'التسويق الرقمي المتكامل', description: 'استراتيجية رقمية 360 درجة لتعزيز وجودك.' },
        { title: 'إنشاء المحتوى', description: 'محتوى مرئي وفيديوهات تحول الزوار إلى عملاء.' },
        { title: 'إعلانات ميتا الممولة', description: 'حملات إعلانية محسّنة لزيادة عائد الاستثمار.' },
        { title: 'مواقع التجارة الإلكترونية', description: 'مواقع عصرية، متجاوبة، وعالية الأداء.' },
      ],
    },
  },
  howWeWork: {
    title: {
      fr: 'Notre Méthode',
      en: 'Our Method',
      ar: 'طريقتنا',
    },
    subtitle: {
      fr: 'Une approche professionnelle centrée sur la stratégie.',
      en: 'A professional strategy-centered approach.',
      ar: 'نهج احترافي متمحور حول الاستراتيجية.',
    },
    steps: {
      fr: [
        { title: 'Stratégie d\'abord', description: 'Nous analysons votre business pour créer un plan d\'action sur-mesure.' },
        { title: 'Équipe Pro dédiée', description: 'Vous travaillez avec des experts seniors pour une exécution sans faille.' },
        { title: 'Adaptation au Budget', description: 'Nous optimisons chaque centime pour un ROI maximal.' },
        { title: 'Excellence Opérationnelle', description: 'Des étapes strictes pour des résultats prévisibles.' },
      ],
      en: [
        { title: 'Strategy First', description: 'We analyze your business to create a custom action plan.' },
        { title: 'Dedicated Pro Team', description: 'You work with senior experts for flawless execution.' },
        { title: 'Budget Scaling', description: 'We optimize every cent for maximum ROI.' },
        { title: 'Operational Excellence', description: 'Strict steps to ensure predictable results.' },
      ],
      ar: [
        { title: 'الاستراتيجية أولاً', description: 'نحلل عملك لإنشاء خطة عمل مخصصة.' },
        { title: 'فريق محترف متخصص', description: 'أنت تعمل مع خبراء كبار لتنفيذ لا تشوبه شائبة.' },
        { title: 'التكيف مع الميزانية', description: 'نحن نحسن كل مليم لتحقيق أقصى عائد على الاستثمار.' },
        { title: 'التميز التشغيلي', description: 'خطوات عمل احترافية صارمة لضمان نتائج يمكن التنبؤ بها.' },
      ]
    }
  },
  testimonials: {
    title: {
      fr: 'Avis Clients',
      en: 'Client Reviews',
      ar: 'آراء العملاء',
    },
    subtitle: {
      fr: 'Découvrez les succès de nos partenaires.',
      en: 'Discover the success of our partners.',
      ar: 'اكتشف نجاحات شركائنا.',
    },
    items: {
      fr: [
        { quote: "L'équipe d'iVISION a transformé notre marketing. ROI exceptionnel !", author: 'Jean D.', position: 'CEO, E-commerce', avatar: 'https://i.pravatar.cc/150?u=1' },
        { quote: "Leur contenu a donné un nouveau souffle à notre marque.", author: 'Sophie M.', position: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
        { quote: "Une agence pro, réactive et créative.", author: 'Karim B.', position: 'Founder, Startup', avatar: 'https://i.pravatar.cc/150?u=3' }
      ],
      en: [
        { quote: "iVISION transformed our marketing. Exceptional ROI!", author: 'John S.', position: 'CEO, E-commerce', avatar: 'https://i.pravatar.cc/150?u=1' },
        { quote: "Their content breathed new life into our brand.", author: 'Emily W.', position: 'Marketing Manager', avatar: 'https://i.pravatar.cc/150?u=2' },
        { quote: "Professional, responsive, and creative agency.", author: 'Michael C.', position: 'Founder, Startup', avatar: 'https://i.pravatar.cc/150?u=3' }
      ],
      ar: [
        { quote: "لقد غيّر فريق iVISION تسويقنا تمامًا. عائد استثمار استثنائي!", author: 'علي أ.', position: 'الرئيس التنفيذي', avatar: 'https://i.pravatar.cc/150?u=1' },
        { quote: "محتواهم بثت حياة جديدة في علامتنا التجارية.", author: 'فاطمة ز.', position: 'مديرة تسويق', avatar: 'https://i.pravatar.cc/150?u=2' },
        { quote: "وكالة محترفة وسريعة الاستجابة ومبدعة.", author: 'يوسف م.', position: 'مؤسس شركة ناشئة', avatar: 'https://i.pravatar.cc/150?u=3' }
      ]
    }
  },
  faq: {
    title: {
      fr: 'Questions Fréquentes',
      en: 'FAQ',
      ar: 'الأسئلة الشائعة',
    },
    subtitle: {
      fr: 'Réponses aux questions courantes.',
      en: 'Answers to common questions.',
      ar: 'إجابات على الأسئلة الشائعة.',
    },
    faqs: {
      fr: [
        { question: 'Quels types d\'entreprises aidez-vous ?', answer: 'E-commerce, PME et startups ambitieuses.' },
        { question: 'Temps pour voir des résultats ?', answer: 'Généralement 3 à 6 mois pour une croissance stable.' },
        { question: 'Comment mesurez-vous le succès ?', answer: 'Via le ROAS, CPA et croissance globale du CA.' },
        { question: 'Proposez-vous des contrats flexibles ?', answer: 'Oui, nous nous adaptons à vos objectifs.' },
      ],
      en: [
        { question: 'Who do you help?', answer: 'E-commerce, SMEs and ambitious startups.' },
        { question: 'Time for results?', answer: 'Usually 3 to 6 months for stable growth.' },
        { question: 'How is success measured?', answer: 'Via ROAS, CPA and overall revenue growth.' },
        { question: 'Flexible contracts?', answer: 'Yes, we adapt to your goals.' },
      ],
      ar: [
        { question: 'من تساعدون؟', answer: 'التجارة الإلكترونية والشركات الصغيرة والمتوسطة والشركات الناشئة الطموحة.' },
        { question: 'الوقت للنتائج؟', answer: 'عادة من 3 إلى 6 أشهر لنمو مستقر.' },
        { question: 'كيف يقاس النجاح؟', answer: 'عبر ROAS و CPA ونمو الإيرادات الإجمالي.' },
        { question: 'عقود مرنة؟', answer: 'نعم، نحن نتكيف مع أهدافك.' },
      ],
    }
  },
  contact: {
    title: {
      fr: 'Contactez-nous',
      en: 'Contact Us',
      ar: 'اتصل بنا',
    },
    subtitle: {
      fr: 'Prêt à propulser votre business ?',
      en: 'Ready to grow your business?',
      ar: 'هل أنت مستعد لنمو عملك؟',
    },
    form: {
      title: {
        fr: 'Demande de devis rapide',
        en: 'Quick quote request',
        ar: 'طلب عرض سعر سريع',
      },
      nameLabel: { fr: 'Nom & Prénom', en: 'Full Name', ar: 'الاسم واللقب' },
      phoneLabel: { fr: 'Numéro WhatsApp', en: 'WhatsApp Number', ar: 'رقم الواتساب' },
      businessLabel: { fr: "C'est quoi votre business ?", en: 'What is your business type?', ar: 'ما هو نوع نشاطك التجاري؟' },
      businessOptions: {
        fr: ['Restaurant / Café', 'Clinique / Cabinet médical', 'Immobilier', 'Prêt-à-porter / Mode', 'Salle de sport', 'E-commerce', 'Autre'],
        en: ['Restaurant / Cafe', 'Clinic / Medical Office', 'Real Estate', 'Clothing / Fashion', 'Gym / Fitness', 'E-commerce', 'Other'],
        ar: ['مطعم / مقهى', 'عيادة / مكتب طبي', 'عقار', 'ملابس / موضة', 'قاعة رياضة', 'تجارة إلكترونية', 'آخر']
      },
      problemLabel: { fr: "C'est quoi votre plus gros problème ?", en: 'What is your biggest problem?', ar: 'ما هي أكبر مشكلة تواجهك؟' },
      problemOptions: {
        fr: ["Je n'ai pas assez de clients", "Mon contenu est nul", "Je ne sais pas gérer mes réseaux", "Mes pubs ne donnent pas de résultats"],
        en: ["Not enough clients", "Poor content quality", "Social media management", "Ads not performing"],
        ar: ["ليس لدي ما يكفي من العملاء", "محتواي ضعيف", "لا أعرف كيف أدير حساباتي", "إعلاناتي لا تعطي نتائج"]
      },
      budgetLabel: { fr: "Budget MENSUEL prêt à investir", en: 'MONTHLY budget ready to invest', ar: 'الميزانية الشهرية المستعدة للاستثمار' },
      budgetOptions: {
        fr: ['30,000 - 60,000 DA', '60,000 - 120,000 DA', '120,000 - 250,000 DA', 'Plus de 250,000 DA'],
        en: ['30,000 - 60,000 DA', '60,000 - 120,000 DA', '120,000 - 250,000 DA', 'More than 250,000 DA'],
        ar: ['30,000 - 60,000 دج', '60,000 - 120,000 دج', '120,000 - 250,000 دج', 'أكثر من 250,000 دج']
      },
      placeholderName: { fr: 'Ex: Jean Dupont', en: 'Ex: John Doe', ar: 'مثال: أحمد محمد' },
      placeholderPhone: { fr: 'Ex: 05xx xxx xxx', en: 'Ex: 05xx xxx xxx', ar: 'مثال: 05xx xxx xxx' },
      placeholderOther: { fr: 'Précisez votre business...', en: 'Specify your business...', ar: 'حدد نوع نشاطك...' },
      cta: { fr: 'Envoyer la demande', en: 'Send request', ar: 'إرسال الطلب' },
      whatsappCta: { fr: 'Envoyer via WhatsApp', en: 'Send via WhatsApp', ar: 'إرسال عبر واتساب' },
      successTitle: { fr: 'Demande Reçue !', en: 'Request Received!', ar: 'تم استلام الطلب!' },
      successMessage: { fr: 'Nous analysons votre profil et vous recontacterons via WhatsApp sous 24h.', en: 'We are analyzing your profile and will contact you via WhatsApp within 24h.', ar: 'نحن نحلل ملفك وسنتصل بك عبر الواتساب خلال 24 ساعة.' },
    },
  },
  whatsapp: {
    message: {
      fr: "Bonjour iVISION, je souhaite lancer ma stratégie de croissance.",
      en: "Hello iVISION, I want to launch my growth strategy.",
      ar: "مرحباً iVISION، أرغب في إطلاق استراتيجية النمو الخاصة بي.",
    }
  },
  footer: {
    tagline: {
      fr: 'Partenaire de croissance digitale.',
      en: 'Digital growth partner.',
      ar: 'شريك النمو الرقمي.',
    },
    copyright: {
      fr: 'iVISION Agency. Tous droits réservés.',
      en: 'iVISION Agency. All rights reserved.',
      ar: 'وكالة iVISION. جميع الحقوق محفوظة.',
    },
  },
};

const processTranslations = (lang: Language) => ({
    header: {
        links: textContent.header.links[lang],
        cta: textContent.header.cta[lang],
    },
    hero: {
        badge: textContent.hero.badge[lang],
        title: textContent.hero.title[lang],
        subtitle: textContent.hero.subtitle[lang],
        cta: textContent.hero.cta[lang],
        secondaryCta: textContent.hero.secondaryCta[lang],
    },
    visualShowcase: {
        title: textContent.visualShowcase.title[lang],
        subtitle: textContent.visualShowcase.subtitle[lang],
    },
    clientLogos: {
        title: textContent.clientLogos.title[lang],
        subtitle: textContent.clientLogos.subtitle[lang],
        points: textContent.clientLogos.points[lang],
    },
    services: {
        title: textContent.services.title[lang],
        subtitle: textContent.services.subtitle[lang],
        items: textContent.services.items[lang],
    },
    howWeWork: {
      title: textContent.howWeWork.title[lang],
      subtitle: textContent.howWeWork.subtitle[lang],
      steps: textContent.howWeWork.steps[lang],
    },
    testimonials: {
      title: textContent.testimonials.title[lang],
      subtitle: textContent.testimonials.subtitle[lang],
      items: textContent.testimonials.items[lang],
    },
    faq: {
        title: textContent.faq.title[lang],
        subtitle: textContent.faq.subtitle[lang],
        faqs: textContent.faq.faqs[lang],
    },
    contact: {
        title: textContent.contact.title[lang],
        subtitle: textContent.contact.subtitle[lang],
        qualification: {
          title: textContent.qualification.title[lang],
          message: textContent.qualification.message[lang],
          badge: textContent.qualification.badge[lang],
        },
        form: {
            title: textContent.contact.form.title[lang],
            nameLabel: textContent.contact.form.nameLabel[lang],
            phoneLabel: textContent.contact.form.phoneLabel[lang],
            businessLabel: textContent.contact.form.businessLabel[lang],
            businessOptions: textContent.contact.form.businessOptions[lang],
            problemLabel: textContent.contact.form.problemLabel[lang],
            problemOptions: textContent.contact.form.problemOptions[lang],
            budgetLabel: textContent.contact.form.budgetLabel[lang],
            budgetOptions: textContent.contact.form.budgetOptions[lang],
            placeholderName: textContent.contact.form.placeholderName[lang],
            placeholderPhone: textContent.contact.form.placeholderPhone[lang],
            placeholderOther: textContent.contact.form.placeholderOther[lang],
            cta: textContent.contact.form.cta[lang],
            whatsappCta: textContent.contact.form.whatsappCta[lang],
            successTitle: textContent.contact.form.successTitle[lang],
            successMessage: textContent.contact.form.successMessage[lang],
        },
    },
    whatsapp: {
        message: textContent.whatsapp.message[lang],
    },
    footer: {
        tagline: textContent.footer.tagline[lang],
        links: textContent.header.links[lang],
        copyright: textContent.footer.copyright[lang],
    }
});


export const translations = {
    fr: processTranslations('fr'),
    en: processTranslations('en'),
    ar: processTranslations('ar'),
};
