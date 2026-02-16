
export type Language = 'fr' | 'en' | 'ar';

const textContent = {
  header: {
    links: {
      fr: ['Services', 'Résultats', 'Méthode'],
      en: ['Services', 'Results', 'Method'],
      ar: ['الخدمات', 'النتائج', 'طريقتنا'],
    },
    cta: {
      fr: 'Contact',
      en: 'Contact',
      ar: 'اتصل بنا',
    },
  },
  hero: {
    badge: {
      fr: 'VOTRE PARTENAIRE CROISSANCE',
      en: 'YOUR GROWTH PARTNER',
      ar: 'شريكك في النمو',
    },
    title: {
      fr: 'PLUS DE CLIENTS PLUS DE VENTES',
      en: 'MORE CLIENTS MORE SALES',
      ar: 'المزيد من العملاء المزيد من المبيعات',
    },
    subtitle: {
      fr: 'Nous aidons les entreprises algériennes à dominer leur marché grâce à notre agence digitale spécialisée en acquisition massive.',
      en: 'We help Algerian businesses dominate their market thanks to our digital agency specialized in massive acquisition.',
      ar: 'نساعد الشركات الجزائرية على السيطرة على سوقها بفضل وكالتنا الرقمية المتخصصة في الاستحواذ المكثف.',
    },
    cta: {
      fr: 'C\'EST PARTI',
      en: 'LET\'S GO',
      ar: 'لنبدأ',
    },
    secondaryCta: {
      fr: 'NOS SERVICES',
      en: 'OUR SERVICES',
      ar: 'خدماتنا',
    }
  },
  services: {
    title: {
      fr: 'BOOSTEZ VOTRE MARQUE.',
      en: 'BOOST YOUR BRAND.',
      ar: 'عزز علامتك التجارية.',
    },
    subtitle: {
      fr: 'Tout ce dont vous avez besoin pour réussir sur internet et dominer votre marché local avec une stratégie sur-mesure.',
      en: 'Everything you need to succeed online and dominate your local market with a tailor-made strategy.',
      ar: 'كل ما تحتاجه للنجاح عبر الإنترنت والسيطرة على سوقك المحلي باستراتيجية مخصصة.',
    },
    items: {
      fr: [
        { title: 'META & GOOGLE ADS', description: 'Omniprésence et capture d\'intention.', details: 'Nous déployons des campagnes publicitaires agressives sur Meta et Google pour capter vos futurs clients là où ils se trouvent. Une stratégie omnicanale conçue pour maximiser votre ROAS et dominer vos concurrents sur tous les fronts.' },
        { title: 'CRÉATION DE CONTENU', description: 'Photos et Vidéos professionnelles.', details: 'Nous produisons des visuels haut de gamme et des vidéos publicitaires modernes (UGC, Reels). Un contenu esthétique et engageant est la clé pour capturer l\'attention immédiate et transformer vos simples prospects en clients fidèles.' },
        { title: 'CRÉATION DE SITES WEB', description: 'Écosystèmes digitaux haute performance.', details: 'Nous concevons des sites web et des boutiques e-commerce optimisés pour la conversion et le SEO. Plus qu\'une simple vitrine, nous bâtissons un véritable moteur de vente automatique qui travaille pour vous 24h/24.' },
        { title: 'SUIVI & RÉSULTATS', description: 'Analyse précise de vos performances.', details: 'Le marketing n\'est pas un jeu de hasard. Nous suivons méticuleusement chaque métrique (ROAS, CPA) pour ajuster vos campagnes en temps réel et garantir une croissance saine, prévisible et scalable de votre activité.' },
      ],
      en: [
        { title: 'META & GOOGLE ADS', description: 'Omnipresence and intent capture.', details: 'We deploy aggressive ad campaigns across Meta and Google to capture future customers wherever they are. A strategy designed to maximize ROI and dominate competitors.' },
        { title: 'CONTENT CREATION', description: 'Pro Photos & Videos.', details: 'We produce high-end visuals and modern ad videos (UGC, Reels). Aesthetic content is key to capturing attention and building lasting trust.' },
        { title: 'WEBSITE CREATION', description: 'High-performance digital ecosystems.', details: 'We design websites and e-commerce stores optimized for conversion and SEO. We build a true automatic sales engine that works for you 24/7.' },
        { title: 'TRACKING & RESULTS', description: 'Precise performance analysis.', details: 'Marketing isn\'t a game of luck. We track every metric meticulously to adjust your campaigns and guarantee healthy, predictable growth.' },
      ],
      ar: [
        { title: 'إعلانات ميتا وجوجل', description: 'الحضور الشامل واقتناص الفرص.', details: 'ننشر حملات إعلانية قوية على ميتا وجوجل لجذب عملائك أينما كانوا. استراتيجية مصممة لزيادة عائد الاستثمار والسيطرة على المنافسين.' },
        { title: 'صناعة المحتوى', description: 'صور وفيديو احترافي.', details: 'ننتج مرئيات راقية وفيديوهات إعلانية حديثة. المحتوى الجمالي والجذاب هو المفتاح لجذب الانتباه وتحويل العملاء المحتملين إلى عملاء دائمين.' },
        { title: 'إنشاء مواقع الويب', description: 'أنظمة رقمية عالية الأداء.', details: 'نصمم مواقع إلكترونية ومتاجر تجارة إلكترونية محسنة للتحويل. نحن نبني محرك مبيعات تلقائي حقيقي يعمل لصالحك على مدار الساعة.' },
        { title: 'المتابعة والنتائج', description: 'تحليل دقيق لأدائك.', details: 'التسويق ليس لعبة حظ. نحن نتبع كل مقياس بدقة لتعديل حملاتك وضمان نمو صحي ومتوقع لنشاطك.' },
      ],
    },
  },
  howWeWork: {
    title: { fr: 'SUIVEZ NOTRE MÉTHODE.', en: 'FOLLOW OUR METHOD.', ar: 'اتبع طريقتنا.' },
    subtitle: { fr: 'Un processus millimétré conçu pour transformer votre budget publicitaire en une machine à profit scalable.', en: 'A precise process designed to turn your ad budget into a scalable profit machine.', ar: 'عملية دقيقة مصممة لتحويل ميزانيتك الإعلانية إلى آلة ربح قابلة للتوسع.' },
    steps: {
      fr: [
        { title: 'ANALYSE', description: 'Audit complet de votre écosystème.', details: 'On plonge dans vos chiffres et votre marché. On identifie vos produits gagnants et les opportunités de croissance inexploitées pour bâtir un plan de bataille solide et ultra-rentable dès le lancement.' },
        { title: 'ACTION', description: 'Déploiement stratégique rapide.', details: 'On lance la production de vos créatifs et la configuration technique de vos campagnes. Notre équipe s\'assure que tout est prêt pour capter l\'attention du marché et générer vos premières ventes immédiatement.' },
        { title: 'OPTIMISATION', description: 'Pilotage quotidien de la rentabilité.', details: 'On ne lance pas et on oublie. On analyse les datas quotidiennement pour couper ce qui ne marche pas et booster les segments les plus rentables de votre audience afin de réduire votre coût par acquisition.' },
        { title: 'RÉSULTATS', description: 'Expansion et domination totale.', details: 'Une fois la rentabilité prouvée, on scale. On augmente les budgets intelligemment pour multiplier vos ventes tout en maintenant vos marges bénéficiaires élevées pour une croissance exponentielle.' }
      ],
      en: [
        { title: 'ANALYSIS', description: 'Full business audit.', details: 'We dive into your numbers and market. We identify winning products and untapped growth opportunities to build a solid plan.' },
        { title: 'ACTION', description: 'Fast strategic deployment.', details: 'We launch creative production and campaign setup. Our team ensures everything is ready to capture the market from day one.' },
        { title: 'OPTIMIZATION', description: 'Profitability management.', details: 'We don\'t launch and forget. We analyze data daily to cut what doesn\'t work and boost the most profitable segments.' },
        { title: 'RESULTS', description: 'Expansion and domination.', details: 'Once profitability is proven, we scale. We increase budgets intelligently to multiply sales while maintaining high margins.' }
      ],
      ar: [
        { title: 'التحليل', description: 'تدقيق كامل لعملك.', details: 'نغوص في أرقامك وسوقك. نحدد المنتجات الرابحة وفرص النمو غير المستغلة لبناء خطة معركة قوية وربحية.' },
        { title: 'التنفيذ', description: 'نشر استراتيجي سريع.', details: 'نبدأ في إنتاج التصاميم وإعداد الحملات. يتأكد فريقنا من أن كل شيء جاهز للاستحواذ على السوق من اليوم الأول.' },
        { title: 'التحسين', description: 'إدارة الربحية.', details: 'نحن لا نطلق الحملة وننساها. نحلل البيانات يومياً لإيقاف ما لا ينجح وتعزيز القطاعات الأكثر ربحية.' },
        { title: 'النتائج', description: 'التوسع والسيطرة.', details: 'بمجرد إثبات الربحية، نبدأ في التوسع. نزيد الميزانيات بذكاء لمضاعفة مبيعاتك مع الحفاظ على هوامش ربح عالية.' }
      ]
    }
  },
  visualShowcase: {
    title: { fr: 'VOYEZ NOS PREUVES.', en: 'SEE OUR PROOFS.', ar: 'شاهد نتائجنا.' },
    subtitle: { fr: 'Des chiffres réels pour des clients réels. Nous transformons votre investissement publicitaire en profit net grâce à une expertise technique sans compromis.', en: 'Real numbers for real clients. We turn your ad investment into net profit.', ar: 'أرقام حقيقية لعملاء حقيقيين. نحول استثمارك الإعلاني إلى ربح صافي.' }
  },
  testimonials: { 
    title: { fr: 'ILS NOUS CONFIRMENT.', en: 'THEY CONFIRM US.', ar: 'يؤكدون لنا.' }, 
    subtitle: { fr: 'La voix de nos partenaires qui ont vu leur business changer. Découvrez leurs retours d\'expérience après notre collaboration stratégique.', en: 'The voice of our partners who saw their business change. Discover their feedback.', ar: 'صوت شركائنا الذين رأوا أعمالهم تتغير. اكتشف تعليقاتهم.' }, 
    items: { 
      fr: [
        { quote: "Ventes multipliées par 4 en seulement 3 mois. L'expertise sur Meta est tout simplement chirurgicale. Je recommande les yeux fermés.", author: "A.K.", position: "CEO E-commerce", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
        { quote: "Enfin une agence qui livre des résultats concrets. Notre coût par acquisition a chuté de 45% grâce à leur stratégie de contenu.", author: "S.M.", position: "Directrice Cosmétique", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" },
        { quote: "Un accompagnement d'un professionnalisme rare. Ils gèrent tout, de la créa au media buying avec une transparence totale.", author: "F.H.", position: "Fondateur Mode", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" },
        { quote: "La création du site web a changé la donne. Le taux de conversion est passé de 1% à 3.5% dès la mise en ligne. Impressionnant.", author: "R.B.", position: "Entrepreneur Immobilier", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" },
        { quote: "Leur approche data-driven nous a permis de scaler sans perdre en rentabilité. Une équipe de haut niveau.", author: "M.T.", position: "Retailer High-Tech", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
        { quote: "iVISION a compris nos enjeux immédiatement. Le retour sur investissement est le meilleur que nous ayons eu à ce jour.", author: "L.D.", position: "Directeur de Franchise", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" }
      ],
      en: [
        { quote: "Sales quadrupled in just 3 months. The Meta expertise is surgical. I recommend them without hesitation.", author: "A.K.", position: "E-commerce CEO", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
        { quote: "Finally an agency delivering concrete results. Our CPA dropped by 45% thanks to their content strategy.", author: "S.M.", position: "Cosmetics Manager", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" },
        { quote: "Rare professional support. They handle everything from creative to media buying with full transparency.", author: "F.H.", position: "Fashion Founder", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" },
        { quote: "The website creation was a game changer. Conversion rate went from 1% to 3.5% immediately. Impressive.", author: "R.B.", position: "Real Estate Owner", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" },
        { quote: "Their data-driven approach allowed us to scale profitably. A high-level team indeed.", author: "M.T.", position: "High-Tech Retailer", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
        { quote: "iVISION understood our challenges instantly. The ROI is the best we've seen so far.", author: "L.D.", position: "Franchise Director", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" }
      ],
      ar: [
        { quote: "تضاعفت المبيعات 4 مرات في 3 أشهر فقط. الخبرة في إعلانات ميتا دقيقة للغاية. أنصح بهم بشدة.", author: "أ.ك.", position: "مدير متجر إلكتروني", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop" },
        { quote: "أخيراً وكالة تقدم نتائج ملموسة. انخفضت تكلفة الاستحواذ بنسبة 45% بفضل استراتيجيتهم.", author: "س.م.", position: "مسؤولة شركة تجميل", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop" },
        { quote: "دعم مهني نادر. يديرون كل شيء من التصميم إلى شراء الإعلانات بشفافية تامة.", author: "ف.هـ.", position: "مؤسس علامة أزياء", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300&auto=format&fit=crop" },
        { quote: "إنشاء موقع الويب غير اللعبة تماماً. ارتفع معدل التحويل بشكل مذهل فور الإطلاق.", author: "ر.ب.", position: "رائد أعمال عقاري", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop" },
        { quote: "سمح لنا نهجهم القائم على البيانات بالتوسع بربحية. فريق رفيع المستوى حقاً.", author: "م.ت.", position: "تاجر أجهزة تقنية", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop" },
        { quote: "فهمت iVISION تحدياتنا على الفور. العائد على الاستثمار هو الأفضل لدينا حتى الآن.", author: "ل.د.", position: "مدير امتياز تجاري", avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop" }
      ]
    } 
  },
  faq: { 
    title: { fr: 'RÉPONSES PRÉCISES.', en: 'PRECISE ANSWERS.', ar: 'إجابات دقيقة.' }, 
    subtitle: { fr: 'Toutes les réponses à vos questions techniques et stratégiques pour lever vos derniers doutes avant de propulser votre business.', en: 'All the answers to your technical and strategic questions before boosting your business.', ar: 'كل الإجابات على أسئلتك التقنية والاستراتيجية قبل تعزيز عملك.' }, 
    faqs: { 
      fr: [
        { question: "Combien de temps pour voir des résultats ?", answer: "Les premières ventes arrivent généralement dès la première semaine de diffusion. Cependant, la phase d'optimisation complète prend environ 14 à 21 jours pour stabiliser votre rentabilité." },
        { question: "Quel budget publicitaire minimum faut-il ?", answer: "Nous recommandons de commencer avec un budget qui permet de tester efficacement vos offres. Lors de notre audit, nous définirirons ensemble l'allocation idéale pour votre domaine spécifique." },
        { question: "Pourquoi iVISION et pas une autre agence ?", answer: "Parce que nous ne sommes pas juste des techniciens. Nous maîtrisons toute la chaîne : stratégie, création vidéo pro, et écosystèmes web. On s'occupe de tout." }
      ], 
      en: [
        { question: "How long to see results?", answer: "First sales usually arrive within the first week. However, the full optimization phase takes about 14 to 21 days to stabilize your profitability." },
        { question: "What minimum ad budget is needed?", answer: "We recommend starting with a budget that allows for effective offer testing. We will define the ideal allocation during our audit." },
        { question: "Why iVISION and not another agency?", answer: "Because we are not just technicians. We master the whole chain: strategy, pro video creation, and web ecosystems." }
      ], 
      ar: [
        { question: "كم من الوقت لرؤية النتائج؟", answer: "عادة ما تصل المبيعات الأولى خلال الأسبوع الأول. ومع ذلك، تستغرق مرحلة التحسين الكاملة حوالي 14 إلى 21 يوماً لاستقرار ربحيتك." },
        { question: "ما هو الحد الندنى للميزانية الإعلانية المطلوبة؟", answer: "نوصي بالبدء بميزانية تسمح باختبار عروضك بفعالية. سنحدد التخصيص المثالي خلال تدقيقنا." },
        { question: "لماذا iVISION وليس وكالة أخرى؟", answer: "لأننا لسنا مجرد تقنيين. نحن نتقن السلسلة بأكملها: الاستراتيجية، صناعة الفيديو الاحترافي، والأنظمة الرقمية." }
      ] 
    } 
  },
  contact: {
    form: {
      title: { fr: 'DEMANDER UNE CONSULTATION', en: 'REQUEST A CONSULTATION', ar: 'طلب استشارة مجانية' },
      nameLabel: { fr: 'Votre Nom + Prénom', en: 'Full Name', ar: 'الاسم الكامل' },
      phoneLabel: { fr: 'Numéro WhatsApp (Obligatoire)', en: 'WhatsApp Number (Required)', ar: 'رقم الواتساب (إجباري)' },
      businessLabel: { fr: 'C\'est quoi votre business ?', en: 'What is your business?', ar: 'ما هو نشاطك التجاري؟' },
      businessOptions: {
        fr: ['Restaurant / Café', 'Clinique / Cabinet médical', 'Immobilier', 'Prêt-à-porter / Mode', 'Salle de sport', 'E-commerce', 'Autre'],
        en: ['Restaurant / Cafe', 'Medical Clinic', 'Real Estate', 'Fashion / Apparel', 'Gym', 'E-commerce', 'Other'],
        ar: ['مطعم / مقهى', 'عيادة / مكتب طبي', 'عقارات', 'ملابس / أزياء', 'قاعة رياضة', 'تجارة إلكترونية', 'أخرى']
      },
      problemLabel: { fr: 'Votre plus gros problème aujourd\'hui ?', en: 'Your biggest problem today?', ar: 'ما هي أكبر مشكلة تواجهك اليوم؟' },
      problemOptions: {
        fr: ['Je n\'ai pas assez de clients', 'Mon contenu est nul', 'Je ne sais pas gérer mes réseaux', 'Mes pubs ne donnent pas de résultats'],
        en: ['Not enough clients', 'My content is bad', 'Don\'t know how to manage social media', 'My ads don\'t work'],
        ar: ['ليس لدي عملاء كافون', 'محتواي ضعيف', 'لا أعرف تسيير حساباتي', 'إعلاناتي لا تعطي نتائج']
      },
      budgetLabel: { fr: 'Budget mensuel prêt à investir ?', en: 'Monthly budget ready to invest?', ar: 'الميزانية الشهرية التي تنوي استثمارها؟' },
      budgetOptions: {
        fr: ['30,000 - 60,000 DA', '60,000 - 120,000 DA', '120,000 - 250,000 DA', 'Plus de 250,000 DA'],
        en: ['30,000 - 60,000 DA', '60,000 - 120,000 DA', '120,000 - 250,000 DA', 'Over 250,000 DA'],
        ar: ['30,000 - 60,000 دج', '60,000 - 120,000 دج', '120,000 - 250,000 دج', 'أكثر من 250,000 دج']
      },
      cta: { fr: 'ENVOYER MA DEMANDE', en: 'SEND MY REQUEST', ar: 'إرسال الطلب' },
      successTitle: { fr: 'MERCI !', en: 'THANK YOU!', ar: 'شكراً لك!' },
      successMessage: { fr: 'On vous recontacte très vite sur WhatsApp pour en discuter.', en: 'We will contact you very soon on WhatsApp to discuss.', ar: 'سنتصل بك قريباً جداً على الواتساب للمناقشة.' },
    },
    modal: {
        cta: { fr: 'Discuter sur WhatsApp', en: 'Chat on WhatsApp', ar: 'تحدث عبر واتساب' },
        close: { fr: 'Fermer', en: 'Close', ar: 'إغلاق' }
    }
  },
  footer: {
    tagline: { fr: 'On vous aide à grandir en Algérie.', en: 'Helping you grow in Algeria.', ar: 'نساعدك على النمو في الجزائر.' },
    copyright: { fr: 'iVISION Agency.', en: 'iVISION Agency.', ar: 'iVISION للخدمات.' },
    contact: {
      email: 'contact@ivision.agency',
      support: 'support@ivision.agency',
      phone: '+213 563 83 94 04'
    }
  },
  whatsapp: { message: { fr: "Bonjour iVISION, j'aimerais booster mon business.", en: "Hello iVISION, I would like to boost my business.", ar: "مرحباً iVISION، أود تطوير عملي." } }
};

const processTranslations = (lang: Language) => {
  const b = textContent;
  return {
    header: { links: b.header.links[lang], cta: b.header.cta[lang] },
    hero: {
      badge: b.hero.badge[lang],
      title: b.hero.title[lang],
      subtitle: b.hero.subtitle[lang],
      cta: b.hero.cta[lang],
      secondaryCta: b.hero.secondaryCta[lang],
    },
    services: {
      title: b.services.title[lang],
      subtitle: b.services.subtitle[lang],
      items: b.services.items[lang],
    },
    howWeWork: {
      title: b.howWeWork.title[lang],
      subtitle: b.howWeWork.subtitle[lang],
      steps: b.howWeWork.steps[lang],
    },
    visualShowcase: {
      title: b.visualShowcase.title[lang],
      subtitle: b.visualShowcase.subtitle[lang]
    },
    contact: {
      form: {
        title: b.contact.form.title[lang],
        nameLabel: b.contact.form.nameLabel[lang],
        phoneLabel: b.contact.form.phoneLabel[lang],
        businessLabel: b.contact.form.businessLabel[lang],
        businessOptions: b.contact.form.businessOptions[lang],
        problemLabel: b.contact.form.problemLabel[lang],
        problemOptions: b.contact.form.problemOptions[lang],
        budgetLabel: b.contact.form.budgetLabel[lang],
        budgetOptions: b.contact.form.budgetOptions[lang],
        cta: b.contact.form.cta[lang],
        successTitle: b.contact.form.successTitle[lang],
        successMessage: b.contact.form.successMessage[lang],
      },
      modal: {
          cta: b.contact.modal.cta[lang],
          close: b.contact.modal.close[lang]
      }
    },
    footer: {
      tagline: b.footer.tagline[lang],
      links: b.header.links[lang],
      copyright: b.footer.copyright[lang],
      contact: b.footer.contact
    },
    whatsapp: { message: b.whatsapp.message[lang] },
    faq: { title: b.faq.title[lang], subtitle: b.faq.subtitle[lang], faqs: b.faq.faqs[lang] },
    testimonials: { title: b.testimonials.title[lang], subtitle: b.testimonials.subtitle[lang], items: b.testimonials.items[lang] },
  };
};

export const translations = {
  fr: processTranslations('fr'),
  en: processTranslations('en'),
  ar: processTranslations('ar'),
};
