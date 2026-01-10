
export type Language = 'fr' | 'en' | 'ar';

const textContent = {
  header: {
    links: {
      fr: ['Accueil', 'Services', 'Processus', 'Portfolio'],
      en: ['Home', 'Services', 'Process', 'Portfolio'],
      ar: ['الرئيسية', 'خدماتنا', 'عمليتنا', 'أعمالنا'],
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
      fr: 'Nous limitons nos collaborations à 3 nouveaux clients par mois pour garantir une excellence maximale. Nous travaillons exclusivement avec des entrepreneurs prêts à investir sérieusement dans leur croissance.',
      en: 'We limit our collaborations to 3 new clients per month to ensure maximum excellence. We work exclusively with entrepreneurs ready to seriously invest in their growth.',
      ar: 'نحن نقصر تعاوننا على 3 عملاء جدد فقط شهريًا لضمان أقصى قدر من التميز. نحن نعمل حصريًا مع رواد الأعمال المستعدين للاستثمار بجدية في نقوهم.',
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
      fr: 'VOIR NOS TRAVAUX',
      en: 'SEE OUR WORK',
      ar: 'عرض أعمالنا',
    }
  },
  visualShowcase: {
    title: {
      fr: 'Aperçu Visuel',
      en: 'Visual Showcase',
      ar: 'معرضنا المرئي',
    },
    subtitle: {
      fr: 'Une immersion dans notre univers créatif et stratégique.',
      en: 'An immersion into our creative and strategic world.',
      ar: 'انغماس في عالمنا الإبداعي والاستراتيجي.',
    }
  },
  clientLogos: {
    title: {
      fr: 'Pourquoi Nous Choisir ?',
      en: 'Why Choose Us?',
      ar: 'لماذا تختارنا؟',
    },
    subtitle: {
      fr: 'Nous ne sommes pas juste une autre agence. Nous sommes votre équipe dédiée à la croissance.',
      en: 'We are not just another agency. We are your dedicated growth team.',
      ar: 'نحن لسنا مجرد وكالة أخرى. نحن فريقك المخصص للنمو.',
    },
    points: {
      fr: [
        { title: 'Expertise Ciblée', description: 'Nous vivons et respirons l\'e-commerce. Notre spécialisation nous permet de créer des stratégies qui frappent juste.' },
        { title: 'Approche Partenaire', description: 'Votre succès est notre succès. Nous nous intégrons à votre équipe pour atteindre des objectifs communs.' },
        { title: 'Stratégie Basée sur la Data', description: 'Chaque décision est guidée par des données concrètes, assurant une optimisation continue et un ROI maximal.' },
        { title: 'Résultats Concrets', description: 'Nous nous concentrons sur des métriques qui comptent vraiment : augmentation des ventes et croissance durable.' },
      ],
      en: [
        { title: 'Targeted Expertise', description: 'We live and breathe e-commerce. Our specialization allows us to create strategies that hit the mark.' },
        { title: 'Partnership Approach', description: 'Your success is our success. We integrate with your team to achieve common goals.' },
        { title: 'Data-Driven Strategy', description: 'Every decision is guided by concrete data, ensuring continuous optimization and maximum ROI.' },
        { title: 'Tangible Results', description: 'We focus on metrics that truly matter: increased sales and sustainable growth.' },
      ],
      ar: [
        { title: 'خبرة مستهدفة', description: 'نحن نعيش ونتنفس التجارة الإلكترونية. تخصصنا يسمح لنا بإنشاء استراتيجيات تصيب الهدف.' },
        { title: 'نهج الشراكة', description: 'نجاحك هو نجاحنا. نحن نندمج مع فريقك لتحقيق الأهداف المشتركة.' },
        { title: 'استراتيجية تعتمد على البيانات', description: 'كل قرار يسترشد ببيانات ملموسة، مما يضمن التحسين المستمر وأقصى عائد على الاستثمار.' },
        { title: 'نتائج ملموسة', description: 'نحن نركز على المقاييس التي تهم حقًا: زيادة المبيعات والنمو المستدام.' },
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
      fr: 'Des solutions complètes pour propulser votre e-commerce.',
      en: 'Comprehensive solutions to boost your e-commerce.',
      ar: 'حلول شاملة لدفع تجارتك الإلكترونية.',
    },
    items: {
      fr: [
        { title: 'Marketing digital complet', description: 'Stratégie digitale 360° pour booster votre présence et vos ventes en ligne.' },
        { title: 'Création de contenu (design & vidéo)', description: 'Contenus visuels et vidéos qui attirent et convertissent.' },
        { title: 'Sponsoring Meta Ads', description: 'Campagnes Meta Ads optimisées pour maximiser votre ROI.' },
        { title: 'Website e-commerce', description: 'Sites e-commerce modernes, responsive et performants.' },
      ],
      en: [
        { title: 'Complete Digital Marketing', description: '360° digital strategy to boost your online presence and sales.' },
        { title: 'Content Creation (design & video)', description: 'Visual and video content that attracts and converts.' },
        { title: 'Meta Ads Sponsoring', description: 'Optimized Meta Ads campaigns to maximize your ROI.' },
        { title: 'E-commerce Website', description: 'Modern, responsive, and high-performance e-commerce sites.' },
      ],
      ar: [
        { title: 'التسويق الرقمي المتكامل', description: 'استراتيجية رقمية 360 درجة لتعزيز وجودك ومبيعاتك عبر الإنترنت.' },
        { title: 'إنشاء المحتوى (تصميم وفيديو)', description: 'محتوى مرئي وفيديوهات تجذب وتحول الزوار إلى عملاء.' },
        { title: 'إعلانات ميتا الممولة', description: 'حملات إعلانية محسّنة على منصات ميتا لزيادة عائد الاستثمار.' },
        { title: 'مواقع التجارة الإلكترونية', description: 'مواقع تجارة إلكترونية عصرية، متجاوبة، وعالية الأداء.' },
      ],
    },
  },
  process: {
    title: {
      fr: 'Notre Processus en 4 Étapes',
      en: 'Our 4-Step Process',
      ar: 'عمليتنا في 4 خطوات',
    },
    subtitle: {
      fr: 'Un parcours transparent et efficace, de la stratégie aux résultats.',
      en: 'A transparent and effective journey, from strategy to results.',
      ar: 'رحلة شفافة وفعالة، من الاستراتيجية إلى النتائج.',
    },
    steps: {
      fr: [
        { step: '01', title: 'Découverte & Stratégie', description: 'Nous plongeons dans votre univers pour comprendre vos objectifs, votre audience et votre marché afin de construire une stratégie sur-mesure.' },
        { step: '02', title: 'Création & Implémentation', description: 'Nos experts créatifs et techniques donnent vie à la stratégie à travers des contenus percutants et des campagnes ciblées.' },
        { step: '03', title: 'Lancement & Promotion', description: 'Nous déployons les campagnes sur les canaux les plus pertinents pour atteindre votre audience et générer un engagement maximal.' },
        { step: '04', title: 'Analyse & Optimisation', description: 'Nous suivons les performances en temps réel, analysons les données et optimisons continuellement pour garantir le meilleur ROI.' },
      ],
      en: [
        { step: '01', title: 'Discovery & Strategy', description: 'We dive into your world to understand your goals, audience, and market to build a tailor-made strategy.' },
        { step: '02', title: 'Creation & Implementation', description: 'Our creative and technical experts bring the strategy to life through impactful content and targeted campaigns.' },
        { step: '03', title: 'Launch & Promotion', description: 'We deploy campaigns on the most relevant channels to reach your audience and generate maximum engagement.' },
        { step: '04', title: 'Analysis & Optimization', description: 'We track performance in real-time, analyze data, and continuously optimize to ensure the best ROI.' },
      ],
      ar: [
        { step: '01', title: 'الاكتشاف والاستراتيجية', description: 'نتعمق في عالمك لفهم أهدافك وجمهورك وسوقك لبناء استراتيجية مخصصة.' },
        { step: '02', title: 'الإنشاء والتنفيذ', description: 'يقوم خبراؤنا المبدعون والتقنيون بإحياء الاستراتيجية من خلال محتوى مؤثر وحملات مستهدفة.' },
        { step: '03', title: 'الإطلاق والترويج', description: 'ننشر الحملات على القنوات الأكثر صلة للوصول إلى جمهورك وتوليد أقصى قدر من المشاركة.' },
        { step: '04', title: 'التحليل والتحسين', description: 'نتتبع الأداء في الوقت الفعلي، ونحلل البيانات، ونحسن باستمرار لضمان أفضل عائد على الاستثمار.' },
      ]
    }
  },
  portfolio: {
    title: {
      fr: 'Nos Réalisations',
      en: 'Our Achievements',
      ar: 'إنجازاتنا',
    },
    subtitle: {
      fr: 'Des résultats qui parlent d\'eux-mêmes.',
      en: 'Results that speak for themselves.',
      ar: 'نتائج تتحدث عن نفسها.',
    },
    projects: {
      fr: [
        { 
          client: 'Client E-commerce Mode', 
          title: 'Campagne Meta Ads Explosive',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+350%', label: 'Augmentation du ROI' },
            { value: '+200%', label: 'Taux de Conversion' },
          ],
          cta: 'Discuter de votre projet'
        },
        { 
          client: 'Marque de Cosmétiques', 
          title: 'Lancement de Produit Viral',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+5M', label: 'Impressions en 1 mois' },
            { value: 'Top 1', label: 'Tendance sur les réseaux' },
          ],
          cta: 'Discuter de votre projet'
        },
        { 
          client: 'Startup Tech', 
          title: 'Création Visuelle',
          image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+400%', label: 'Trafic Organique' },
            { value: 'Top 3', label: 'Classement Google' },
          ],
          cta: 'Discuter de votre projet'
        },
      ],
      en: [
        { 
          client: 'Fashion E-commerce Client', 
          title: 'Explosive Meta Ads Campaign',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+350%', label: 'ROI Increase' },
            { value: '+200%', label: 'Conversion Rate' },
          ],
          cta: 'Discuss your project'
        },
        { 
          client: 'Cosmetics Brand', 
          title: 'Viral Product Launch',
          image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+5M', label: 'Impressions in 1 month' },
            { value: 'Top 1', label: 'Trending on social media' },
          ],
          cta: 'Discuss your project'
        },
        { 
          client: 'Tech Startup', 
          title: 'Visual Creation',
          image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+400%', label: 'Organic Traffic' },
            { value: 'Top 3', label: 'Google Ranking' },
          ],
          cta: 'Discuss your project'
        },
      ],
      ar: [
        { 
          client: 'عميل في تجارة الأزياء', 
          title: 'حملة إعلانات ميتا ناجحة',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+350%', label: 'زيادة في عائد الاستثمار' },
            { value: '+200%', label: 'معدل التحويل' },
          ],
          cta: 'ناقش مشروعك'
        },
        { 
          client: 'علامة تجارية لمستحضرات التجميل', 
          title: 'إطلاق منتج واسع الانتشار',
          image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+5 مليون', label: 'ظهور في شهر واحد' },
            { value: 'المرتبة الأولى', label: 'في الترند على الشبكات' },
          ],
          cta: 'ناقش مشروعك'
        },
        { 
          client: 'شركة تقنية ناشئة', 
          title: 'إنشاء بصري',
          image: 'https://images.unsplash.com/photo-1558655146-364adaf1fcc9?q=80&w=800&auto=format&fit=crop',
          results: [
            { value: '+400%', label: 'زيارات عضوية' },
            { value: 'أعلى 3', label: 'ترتيب جوجل' },
          ],
          cta: 'ناقش مشروعك'
        },
      ],
    },
  },
  testimonials: {
    title: {
      fr: 'Ce que disent nos clients',
      en: 'What Our Clients Say',
      ar: 'ماذا يقول عملاؤنا',
    },
    subtitle: {
      fr: 'Découvrez comment nous avons aidé des entreprises comme la vôtre à réussir.',
      en: 'Discover how we have helped businesses like yours succeed.',
      ar: 'اكتشف كيف ساعدنا الشركات مثل شركتك على تحقيق النجاح.',
    },
    items: {
      fr: [
        {
          quote: "L'équipe d'iVISION a complètement transformé notre approche du marketing digital. Notre chiffre d'affaires a explosé en seulement 6 mois. Une collaboration exceptionnelle !",
          author: 'Jean Dupont',
          position: 'CEO, E-commerce Mode',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          quote: "Leur expertise en création de contenu a donné un nouveau souffle à notre marque. L'engagement sur nos réseaux sociaux n'a jamais été aussi élevé. Je recommande vivement.",
          author: 'Sophie Martin',
          position: 'Directrice Marketing, Marque de Cosmétiques',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          quote: "Une agence pro, réactive et créative. Ils ont su comprendre nos besoins et proposer des solutions sur-mesure qui ont dépassé nos attentes. Le ROI est au rendez-vous.",
          author: 'Karim Bennani',
          position: 'Fondateur, Startup Tech',
          avatar: 'https://randomuser.me/api/portraits/men/51.jpg'
        }
      ],
      en: [
        {
          quote: "The iVISION team completely transformed our approach to digital marketing. Our revenue exploded in just 6 months. An exceptional collaboration!",
          author: 'John Smith',
          position: 'CEO, Fashion E-commerce',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          quote: "Their content creation expertise has breathed new life into our brand. Engagement on our social media has never been higher. I highly recommend them.",
          author: 'Emily White',
          position: 'Marketing Director, Cosmetics Brand',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          quote: "A professional, responsive, and creative agency. They understood our needs and proposed custom solutions that exceeded our expectations. The ROI is definitely there.",
          author: 'Michael Chen',
          position: 'Founder, Tech Startup',
          avatar: 'https://randomuser.me/api/portraits/men/51.jpg'
        }
      ],
      ar: [
        {
          quote: "لقد غيّر فريق iVISION نهجنا في التسويق الرقمي تمامًا. ارتفعت إيراداتنا بشكل كبير في 6 أشهر فقط. تعاون استثنائي!",
          author: 'علي أحمد',
          position: 'الرئيس التنفيذي، تجارة أزياء إلكترونية',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
          quote: "خبرتهم في إنشاء المحتوى بثت حياة جديدة في علامتنا التجارية. لم يكن التفاعل على وسائل التواصل الاجتماعي لدينا أعلى من أي وقت مضى. أوصي بهم بشدة.",
          author: 'فاطمة الزهراء',
          position: 'مديرة التسويق، علامة تجارية لمستحضرات التجميل',
          avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
          quote: "وكالة محترفة وسريعة الاستجابة ومبدعة. لقد فهموا احتياجاتنا واقترحوا حلولاً مخصصة فاقت توقعاتنا. عائد الاستثمار واضح وملموس.",
          author: 'يوسف محمد',
          position: 'مؤسس، شركة تقنية ناشئة',
          avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        }
      ]
    }
  },
  faq: {
    title: {
      fr: 'Questions Fréquemment Posées',
      en: 'Frequently Asked Questions',
      ar: 'الأسئلة الشائعة',
    },
    subtitle: {
      fr: 'Trouvez ici les réponses à vos questions les plus courantes.',
      en: 'Find answers to your most common questions here.',
      ar: 'تجد هنا إجابات على أسئلتك الأكثر شيوعًا.',
    },
    faqs: {
      fr: [
        { question: 'Quels types d\'entreprises aidez-vous ?', answer: 'Nous nous spécialisons dans l\'aide aux entreprises e-commerce, des startups aux marques établies, pour augmenter leur visibilité en ligne and leurs ventes.' },
        { question: 'Combien de temps faut-il pour voir des résultats ?', answer: 'Les résultats peuvent varier, mais vous pouvez généralement vous attendre à voir des améliorations significatives dans les métriques clés en 3 à 6 mois, en fonction de la stratégie et des services choisis.' },
        { question: 'Comment mesurez-vous le succès d\'une campagne ?', answer: 'Nous mesurons le succès à l\'aide d\'indicateurs de performance clés (KPI) tels que le retour sur investissement publicitaire (ROAS), le coût par acquisition (CPA), le taux de conversion et la croissance globale du trafic et des revenus.' },
        { question: 'Proposez-vous des contrats à long terme ?', answer: 'Nous proposons des options flexibles, y compris des projets uniques and des contrats de service mensuels. Notre objectif est de construire un partenariat qui correspond à vos besoins et à vos objectifs.' },
      ],
      en: [
        { question: 'What types of businesses do you help?', answer: 'We specialize in helping e-commerce businesses, from startups to established brands, increase their online visibility and sales.' },
        { question: 'How long does it take to see results?', answer: 'Results can vary, but you can typically expect to see significant improvements in key metrics within 3 to 6 months, depending on the strategy and services chosen.' },
        { question: 'How do you measure the success of a campaign?', answer: 'We measure success using key performance indicators (KPIs) such as Return On Ad Spend (ROAS), Cost Per Acquisition (CPA), conversion rate, and overall growth in traffic and revenue.' },
        { question: 'Do you offer long-term contracts?', answer: 'We offer flexible options, including one-time projects and monthly retainers. Our goal is to build a partnership that fits your needs and objectives.' },
      ],
      ar: [
        { question: 'ما أنواع الشركات التي تساعدونها؟', answer: 'نحن متخصصون في مساعدة شركات التجارة الإلكترونية، من الشركات الناشئة إلى العلامات التجارية الراسخة، على زيادة ظهورها ومبيعاتها عبر الإنترنت.' },
        { question: 'كم من الوقت يستغرق رؤية النتائج؟', answer: 'يمكن أن تختلف النتائج، ولكن يمكنك عادةً توقع رؤية تحسينات كبيرة في المقاييس الرئيسية في غضون 3 إلى 6 أشهر، اعتمادًا على الاستراتيجية والخدمات المختارة.' },
        { question: 'كيف تقيسون نجاح الحملة؟', answer: 'نقيس النجاح باستخدام مؤشرات الأداء الرئيسية (KPIs) مثل العائد على الإنفاق الإعلاني (ROAS)، وتكلفة الاستحواذ (CPA)، بمعدل التحويل، والنمو الإجمالي في حركة المرور والإيرادات.' },
        { question: 'هل تقدمون عقودًا طويلة الأجل؟', answer: 'نحن نقدم خيارات مرنة، بما في ذلك المشاريع لمرة واحدة والعقود الشهرية. هدفنا هو بناء شراكة تناسب احتياجاتك وأهدافك.' },
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
    info: {
      contactDetails: {
        fr: 'Nos Coordonnées',
        en: 'Contact Details',
        ar: 'معلومات الاتصال',
      },
      followUs: {
        fr: 'Suivez-nous',
        en: 'Follow Us',
        ar: 'تابعونا',
      }
    },
    form: {
      title: {
        fr: 'Demande de devis rapide',
        en: 'Quick quote request',
        ar: 'طلب عرض سعر سريع',
      },
      yourInfoTitle: { fr: 'Vos informations', en: 'Your Information', ar: 'معلوماتك الشخصية' },
      projectInfoTitle: { fr: 'Informations sur le projet', en: 'Project Information', ar: 'معلومات المشروع' },
      nameLabel: { fr: 'Nom complet', en: 'Full Name', ar: 'الاسم الكامل' },
      companyNameLabel: { fr: "Nom de l'entreprise", en: 'Company Name', ar: 'اسم الشركة' },
      emailLabel: { fr: 'Adresse e-mail (optionnel)', en: 'Email Address (optional)', ar: 'البريد الإلكتروني (اختياري)' },
      phoneLabel: { 
        fr: 'Numéro de téléphone / WhatsApp', 
        en: 'Phone Number / WhatsApp', 
        ar: 'رقم الهاتف / واتساب (مهم للتواصل السريع)' 
      },
      activityLabel: {
        fr: 'Secteur d\'activité (resto, clinique, habits...)',
        en: 'Business Sector (restaurant, clinic, clothing...)',
        ar: 'مجال النشاط (مطعم، عيادة، ملابس، تدريب، …)'
      },
      facebookLabel: { fr: 'Page Facebook (Optionnel)', en: 'Facebook Page (Optional)', ar: 'صفحة فيسبوك (اختياري)' },
      instagramLabel: { fr: 'Compte Instagram (Optionnel)', en: 'Instagram Account (Optional)', ar: 'حساب إنستغرام (اختياري)' },
      tiktokLabel: { fr: 'Compte TikTok (Optionnel)', en: 'TikTok Account (Optional)', ar: 'حساب تيك توك (اختياري)' },
      goalLabel: {
        fr: 'Objectif du projet',
        en: 'Project Goal',
        ar: 'هدف المشروع'
      },
      goalLabelHint: {
        fr: '(choix multiple)',
        en: '(multiple choice)',
        ar: '(اختيار متعدد)'
      },
      goalOptions: {
        fr: ['Augmenter les ventes', 'Prendre des RDV', 'Image de marque', 'Lancement de projet', 'Autre'],
        en: ['Increase sales', 'Book appointments', 'Brand building', 'Project launch', 'Other'],
        ar: ['زيادة المبيعات', 'حجز مواعيد', 'بناء علامة تجارية', 'إطلاق مشروع جديد', 'أخرى']
      },
      serviceLabel: { fr: 'Service souhaité', en: 'Service Needed', ar: 'الخدمة المطلوبة' },
      serviceLabelHint: { fr: '(choix multiple)', en: '(multiple choice)', ar: '(اختيار متعدد)' },
      budgetLabel: { 
        fr: 'Budget estimé (DZD)', 
        en: 'Estimated Budget (DZD)', 
        ar: 'الميزانية التقديرية (دينار جزائري)' 
      },
      budgetLabelHint: {
        fr: 'Min. 5 000 DZD (Obligatoire)',
        en: 'Min. 5,000 DZD (Mandatory)',
        ar: 'نبدأ العمل على المشاريع التي تفوق ميزانيتها 5,000 دج. (اختيار إلزامي)',
      },
      budgetError: {
        fr: 'Veuillez sélectionner votre budget.',
        en: 'Please select your budget.',
        ar: 'يرجى اختيار ميزانيتك، هذا الحقل إلزامي.',
      },
      projectLabel: { fr: 'Description du projet', en: 'Project Description', ar: 'وصف المشروع' },
      namePlaceholder: { fr: 'Votre nom', en: 'Your name', ar: 'اسمك' },
      companyNamePlaceholder: { fr: 'Votre entreprise', en: 'Your company', ar: 'شركتك' },
      emailPlaceholder: { fr: 'Votre email', en: 'Your email', ar: 'بريدك الإلكتروني' },
      phonePlaceholder: { fr: 'Numéro avec indicatif', en: 'Number with code', ar: 'رقم الهاتف' },
      activityPlaceholder: { fr: 'Ex: Restauration, Prêt-à-porter', en: 'Ex: Catering, Fashion', ar: 'مثال: مطعم، ملابس...' },
      facebookPlaceholder: { fr: '@page_nom', en: '@page_name', ar: '@اسم_الصفحة' },
      instagramPlaceholder: { fr: '@username', en: '@username', ar: '@اسم_المستخدم' },
      tiktokPlaceholder: { fr: '@username', en: '@username', ar: '@اسم_المستخدم' },
      servicePlaceholder: { fr: 'Choisir un service', en: 'Choose a service', ar: 'اختر خدمة' },
      serviceOptions: {
          fr: ['Marketing digital complet', 'Création de contenu', 'Sponsoring Meta Ads', 'Website e-commerce', 'Autre'],
          en: ['Complete Digital Marketing', 'Content Creation', 'Meta Ads Sponsoring', 'E-commerce Website', 'Other'],
          ar: ['التسويق الرقمي المتكامل', 'إنشاء المحتوى', 'إعلانات ميتا الممولة', 'موقع تجارة إلكتروني', 'أخرى'],
      },
      budget: { fr: 'Choisir un budget', en: 'Choose a budget', ar: 'اختر ميزانية' },
      budgetOptions: {
        fr: ['5 000 – 10 000 DZD', '10 000 – 30 000 DZD', '30 000 – 70 000 DZD', 'Plus de 100 000 DZD'],
        en: ['5,000 – 10,000 DZD', '10,000 – 30,000 DZD', '30,000 – 70,000 DZD', 'More than 100,000 DZD'],
        ar: ['5,000 دج – 10,000 دج', '10,000 دج – 30,000 دج', '30,000 دج – 70,000 دج', 'أكثر من 100,000 دج'],
      },
      projectPlaceholder: { fr: 'Décrivez votre projet', en: 'Describe your project', ar: 'صف مشروعك' },
      privacyNote: {
        fr: 'Nous utilisons vos informations uniquement pour vous contacter et envoyer le devis. Aucun partage tiers.',
        en: 'We only use your info to contact you and send the quote. No third-party sharing.',
        ar: 'نستخدم معلوماتك فقط للاتصال بك وإرسال عرض السعر، ولا نشاركها مع أي طرف ثالث.'
      },
      cta: { fr: 'Envoyer la demande', en: 'Send request', ar: 'إرسال الطلب' },
      whatsappCta: { fr: 'Envoyer via WhatsApp', en: 'Send via WhatsApp', ar: 'إرسال عبر واتساب' },
      successTitle: { fr: 'Merci !', en: 'Thank you!', ar: 'شكراً لك!' },
      successMessage: { fr: 'Votre demande a bien été envoyée. Nous reviendrons vers vous très prochainement.', en: 'Your request has been sent successfully. We will get back to you very soon.', ar: 'تم إرسال طلبك بنجاح. سنتواصل معك قريبًا جدًا.' },
    },
  },
  whatsapp: {
    message: {
      fr: 'Bonjour iVISION, je souhaite en savoir plus sur vos services.',
      en: 'Hello iVISION, I would like to know more about your services.',
      ar: 'مرحبًا iVISION ، أود معرفة المزيد عن خدماتكم.',
    },
    promo: {
      title: {
          fr: 'OFFRE SPÉCIALE : -30 %',
          en: 'SPECIAL OFFER: -30%',
          ar: 'عرض خاص: -30%',
      },
      fr: 'Pour bien commencer l’année, profitez de 30 % de réduction sur nos services. Contactez-nous dès maintenant pour en bénéficier !',
      en: 'To start the year off right, enjoy a 30% discount on our services. Contact us now to benefit!',
      ar: 'لبدء العام الجديد بشكل مثالي، استمتع بخصم 30% على خدماتنا. اتصل بنا الآن للاستفادة من العرض!',
      btn: {
        fr: 'Profiter de l\'offre',
        en: 'Get the offer',
        ar: 'احصل على العرض',
      }
    }
  },
  footer: {
    tagline: {
      fr: 'Votre partenaire de croissance e-commerce.',
      en: 'Your e-commerce growth partner.',
      ar: 'شريكك في نمو التجارة الإلكترونية.',
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
    process: {
      title: textContent.process.title[lang],
      subtitle: textContent.process.subtitle[lang],
      steps: textContent.process.steps[lang],
    },
    portfolio: {
        title: textContent.portfolio.title[lang],
        subtitle: textContent.portfolio.subtitle[lang],
        projects: textContent.portfolio.projects[lang],
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
        info: {
          contactDetails: textContent.contact.info.contactDetails[lang],
          followUs: textContent.contact.info.followUs[lang],
        },
        form: {
            title: textContent.contact.form.title[lang],
            yourInfoTitle: textContent.contact.form.yourInfoTitle[lang],
            projectInfoTitle: textContent.contact.form.projectInfoTitle[lang],
            nameLabel: textContent.contact.form.nameLabel[lang],
            companyNameLabel: textContent.contact.form.companyNameLabel[lang],
            emailLabel: textContent.contact.form.emailLabel[lang],
            phoneLabel: textContent.contact.form.phoneLabel[lang],
            activityLabel: textContent.contact.form.activityLabel[lang],
            facebookLabel: (textContent.contact.form as any).facebookLabel[lang],
            instagramLabel: (textContent.contact.form as any).instagramLabel[lang],
            tiktokLabel: (textContent.contact.form as any).tiktokLabel[lang],
            goalLabel: textContent.contact.form.goalLabel[lang],
            goalLabelHint: textContent.contact.form.goalLabelHint[lang],
            goalOptions: textContent.contact.form.goalOptions[lang],
            serviceLabel: textContent.contact.form.serviceLabel[lang],
            serviceLabelHint: textContent.contact.form.serviceLabelHint[lang],
            budgetLabel: textContent.contact.form.budgetLabel[lang],
            budgetLabelHint: textContent.contact.form.budgetLabelHint[lang],
            budgetError: (textContent.contact.form as any).budgetError?.[lang] || "Veuillez choisir un budget.",
            projectLabel: textContent.contact.form.projectLabel[lang],
            namePlaceholder: textContent.contact.form.namePlaceholder[lang],
            companyNamePlaceholder: textContent.contact.form.companyNamePlaceholder[lang],
            emailPlaceholder: textContent.contact.form.emailPlaceholder[lang],
            phonePlaceholder: textContent.contact.form.phonePlaceholder[lang],
            activityPlaceholder: textContent.contact.form.activityPlaceholder[lang],
            facebookPlaceholder: (textContent.contact.form as any).facebookPlaceholder[lang],
            instagramPlaceholder: (textContent.contact.form as any).instagramPlaceholder[lang],
            tiktokPlaceholder: (textContent.contact.form as any).tiktokPlaceholder[lang],
            servicePlaceholder: textContent.contact.form.servicePlaceholder[lang],
            serviceOptions: textContent.contact.form.serviceOptions[lang],
            budget: textContent.contact.form.budget[lang],
            budgetOptions: textContent.contact.form.budgetOptions[lang],
            projectPlaceholder: textContent.contact.form.projectPlaceholder[lang],
            privacyNote: textContent.contact.form.privacyNote[lang],
            cta: textContent.contact.form.cta[lang],
            whatsappCta: textContent.contact.form.whatsappCta[lang],
            successTitle: textContent.contact.form.successTitle[lang],
            successMessage: textContent.contact.form.successMessage[lang],
        },
    },
    whatsapp: {
        message: textContent.whatsapp.message[lang],
        promoTitle: textContent.whatsapp.promo.title[lang],
        promo: textContent.whatsapp.promo[lang],
        promoBtn: textContent.whatsapp.promo.btn[lang],
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
