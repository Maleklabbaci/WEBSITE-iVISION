export type Language = 'fr' | 'en' | 'ar';

const textContent = {
  header: {
    links: {
      fr: ['Services', 'Résultats', 'Méthode', 'Contact'],
      en: ['Services', 'Results', 'Method', 'Contact'],
      ar: ['الخدمات', 'النتائج', 'طريقتنا', 'اتصل بنا'],
    },
    cta: {
      fr: 'AUDIT GRATUIT',
      en: 'FREE AUDIT',
      ar: 'تدقيق مجاني',
    },
  },
  guide: {
    steps: {
      fr: [
        { title: "VOTRE CONFORT", desc: "Choisissez l'ambiance qui vous convient. Basculez entre le mode clair et sombre ici." },
        { title: "VOTRE PROJET", desc: "Prêt à scaler ? Demandez votre audit stratégique gratuit en un clic." },
        { title: "VOTRE SUPPORT", desc: "Une question urgente ? Nos experts vous répondent en direct sur WhatsApp." },
        { title: "VOTRE EXPLORATION", desc: "C'est parti ! Scrollez maintenant pour découvrir comment nous allons bâtir votre empire." }
      ],
      en: [
        { title: "YOUR COMFORT", desc: "Choose the vibe that suits you. Switch between light and dark mode here." },
        { title: "YOUR PROJECT", desc: "Ready to scale? Request your free strategic audit in one click." },
        { title: "YOUR SUPPORT", desc: "Urgent question? Our experts answer you live on WhatsApp." },
        { title: "YOUR EXPLORATION", desc: "Let's go! Scroll now to discover how we will build your empire." }
      ],
      ar: [
        { title: "راحتك أولاً", desc: "اختر الجو الذي يناسبك. بدل بين الوضع الليلي والنهاري من هنا." },
        { title: "مشروعك", desc: "مستعد للنمو؟ اطلب تدقيقك الاستراتيجي المجاني بنقرة واحدة." },
        { title: "دعمنا لك", desc: "سؤال عاجل؟ خبراؤنا يجيبونك مباشرة عبر واتساب." },
        { title: "استكشافك", desc: "لننطلق! مرر الآن لتكتشف كيف سنبني إمبراطوريتك الرقمية." }
      ]
    },
    next: { fr: 'SUIVANT', en: 'NEXT', ar: 'التالي' },
    skip: { fr: 'PASSER', en: 'SKIP', ar: 'تخطي' },
    finish: { fr: 'C\'EST PARTI !', en: 'LET\'S GO!', ar: 'لنبدأ !' }
  },
  hero: {
    badge: {
      fr: 'VOTRE PARTENAIRE CROISSANCE',
      en: 'YOUR GROWTH PARTNER',
      ar: 'شريكك في النمو',
    },
    title: {
      fr: 'AGENCE DE|MARKETING|DIGITAL|EN ALGÉRIE',
      en: 'DIGITAL|MARKETING|AGENCY|IN ALGERIA',
      ar: 'وكالة|تسويق|رقمي|في الجزائر',
    },
    subtitle: {
      fr: 'Stratégie, campagnes Meta & Google, contenu et sites web : un plan adapté à votre activité, avec des résultats suivis ensemble.',
      en: 'Strategy, Meta & Google campaigns, content and websites: a plan tailored to your business, with results we track together.',
      ar: 'استراتيجية وحملات ميتا وجوجل ومحتوى ومواقع إلكترونية: خطة تناسب نشاطك ونتابع نتائجها معًا.',
    },
    middleCopy: {
      fr: 'STRATÉGIE · CONTENU · CROISSANCE',
      en: 'STRATEGY · CONTENT · GROWTH',
      ar: 'استراتيجية · محتوى · نمو',
    },
    cta: {
      fr: 'AUDIT GRATUIT',
      en: 'FREE AUDIT',
      ar: 'تدقيق مجاني',
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
      fr: 'Marketing digital en Algérie : stratégie, publicité, contenu et expérience web, selon les besoins réels de votre activité.',
      en: 'Digital marketing in Algeria: strategy, advertising, content and web experiences tailored to your business.',
      ar: 'التسويق الرقمي في الجزائر: استراتيجية وإعلانات ومحتوى ومواقع إلكترونية تناسب احتياجات نشاطك.',
    },
    items: {
      fr: [
        { title: 'META & GOOGLE ADS', description: 'Des campagnes reliées à un objectif mesurable.', details: 'Définir la cible, les créations, la page d’arrivée et les indicateurs avant de diffuser. Les dépenses publicitaires restent distinctes des honoraires.' },
        { title: 'CRÉATION DE CONTENU', description: 'Textes, visuels et formats adaptés à votre public.', details: 'Concevoir une ligne éditoriale et produire les formats prévus au brief, puis observer les réactions et les questions utiles.' },
        { title: 'CRÉATION DE SITES WEB', description: 'Sites vitrines et boutiques pensés pour vos visiteurs.', details: 'Structurer les pages, clarifier les messages, soigner le mobile et préparer des bases techniques pour la visibilité naturelle.' },
        { title: 'STRATÉGIE DIGITALE', description: 'Un plan pour relier les différents canaux.', details: 'Choisir les actions utiles, définir les livrables et suivre les données disponibles pour décider des prochaines étapes.' },
      ],
      en: [
        { title: 'META & GOOGLE ADS', description: 'Campaigns tied to a clear objective.', details: 'Plan the audience, creative, landing page and measurement before launch. Media spend and agency fees are separate.' },
        { title: 'CONTENT CREATION', description: 'Words and visuals for your audience.', details: 'Define an editorial approach and produce the formats agreed in the brief.' },
        { title: 'WEBSITE CREATION', description: 'Websites and shops designed for visitors.', details: 'Organize pages, clarify messages and prepare sound technical foundations.' },
        { title: 'DIGITAL STRATEGY', description: 'Connect channels through a practical plan.', details: 'Prioritize actions, agree on deliverables and review available data.' },
      ],
      ar: [
        { title: 'إعلانات ميتا وجوجل', description: 'حملات مرتبطة بهدف واضح.', details: 'نحدد الجمهور والتصميم وصفحة الوصول وطريقة القياس قبل الإطلاق، مع فصل ميزانية الإعلانات عن أتعاب الخدمة.' },
        { title: 'صناعة المحتوى', description: 'نصوص وصور تناسب جمهورك.', details: 'نحدد خطة تحريرية وننتج المحتوى المتفق عليه حسب احتياجات المشروع.' },
        { title: 'إنشاء مواقع الويب', description: 'مواقع ومتاجر واضحة للزوار.', details: 'ننظم الصفحات ونوضح الرسائل ونهتم بالتجربة على الهاتف والأسس التقنية.' },
        { title: 'الاستراتيجية الرقمية', description: 'خطة تربط القنوات المختلفة.', details: 'نرتب الأولويات ونحدد المخرجات ونراجع البيانات المتاحة.' },
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
        { question: "Combien de temps pour voir des résultats ?", answer: "Cela dépend de l'offre, du budget, du canal et de la qualité du parcours. On choisit des indicateurs pertinents dès le départ, puis on analyse les données disponibles ; aucun délai de vente n'est garanti." },
        { question: "Quel budget publicitaire minimum faut-il ?", answer: "Le montant dépend de votre objectif et du marché. Nous distinguons les dépenses versées aux plateformes et les honoraires, puis établissons un budget à tester avec vous." },
        { question: "Pourquoi travailler avec iVISION ?", answer: "Nous pouvons relier stratégie, contenu, publicité et sites web dans un périmètre défini ensemble, avec des livrables et une méthode de suivi expliqués avant le lancement." }
      ], 
      en: [
        { question: "How long to see results?", answer: "It depends on the offer, budget, channel and customer journey. We agree on useful indicators and review the available data; no sales timeframe is guaranteed." },
        { question: "What minimum ad budget is needed?", answer: "The amount depends on your goal and market. We separate platform spend from fees and agree on a testing budget together." },
        { question: "Why work with iVISION?", answer: "We can connect strategy, content, advertising and websites within an agreed scope, with clear deliverables and a review process." }
      ], 
      ar: [
        { question: "متى تظهر النتائج؟", answer: "يعتمد ذلك على العرض والميزانية والقناة وتجربة الزوار. نتفق على مؤشرات مناسبة ثم نراجع البيانات المتاحة دون ضمان موعد محدد للمبيعات." },
        { question: "ما الميزانية الإعلانية المناسبة؟", answer: "تختلف حسب هدفك والسوق. نفصل تكلفة المنصات عن أتعاب الخدمة ونحدد ميزانية الاختبار معك." },
        { question: "لماذا العمل مع iVISION؟", answer: "يمكننا الجمع بين الاستراتيجية والمحتوى والإعلانات والمواقع ضمن نطاق واضح مع مخرجات وخطة متابعة متفق عليها." }
      ] 
    } 
  },
  contactSection: {
    title: { fr: 'REJOIGNEZ-NOUS.', en: 'JOIN US.', ar: 'انضم إلينا.' },
    subtitle: { fr: 'Un projet pour votre activité en Algérie ? Décrivez-nous votre besoin, nous pourrons définir les premières étapes ensemble.', en: 'Working on a project in Algeria? Tell us what you need so we can discuss the next steps.', ar: 'هل لديك مشروع في الجزائر؟ صف احتياجاتك لنتناقش حول الخطوات التالية.' },
    labels: {
        contact: { fr: 'Contact Direct', en: 'Direct Contact', ar: 'اتصال مباشر' },
        follow: { fr: 'Suivez l\'Empire', en: 'Follow the Empire', ar: 'تابع الإمبراطورية' }
    }
  },
  contact: {
    form: {
      title: { fr: 'VOTRE AUDIT GRATUIT', en: 'YOUR FREE AUDIT', ar: 'تدقيقك المجاني' },
      back: { fr: 'RETOUR', en: 'BACK', ar: 'رجوع' },
      nameLabel: { fr: 'Votre Nom complet', en: 'Full Name', ar: 'الاسم الكامل' },
      phoneLabel: { fr: 'Numéro WhatsApp', en: 'WhatsApp Number', ar: 'رقم الواتساب' },
      businessLabel: { fr: 'Type d\'activité', en: 'Business Type', ar: 'نوع النشاط' },
      otherSpecify: { fr: 'Précisez votre activité...', en: 'Specify your business...', ar: 'حدد نشاطك...' },
      businessOptions: {
        fr: ['Restaurant / Café', 'Clinique médicale', 'Immobilier', 'E-commerce', 'Mode / Beauté', 'Salle de sport', 'Autre'],
        en: ['Restaurant / Cafe', 'Medical Clinic', 'Real Estate', 'E-commerce', 'Fashion / Beauty', 'Gym', 'Other'],
        ar: ['مطعم / مقهى', 'عيادة طبية', 'عقارات', 'تجارة إلكترونية', 'موضة / تجميل', 'قاعة رياضة', 'أخرى']
      },
      problemLabel: { fr: 'Votre plus gros blocage ?', en: 'Main obstacle?', ar: 'أكبر عائق يواجهك؟' },
      problemOptions: {
        fr: ['Manque de clients', 'Contenu inefficace', 'Gestion réseaux sociaux', 'Publicité non rentable'],
        en: ['Lack of clients', 'Ineffective content', 'Social media management', 'Unprofitable ads'],
        ar: ['نقص العملاء', 'محتوى غير فعال', 'تسيير حسابات', 'إعلانات غير مربحة']
      },
      budgetLabel: { fr: 'Budget prêt à investir ?', en: 'Investment budget?', ar: 'الميزانية المستعدة للاستثمار؟' },
      budgetOptions: {
        fr: ['30k - 60k DA', '60k - 120k DA', '120k - 250k DA', '+250k DA'],
        en: ['30k - 60k DA', '60k - 120k DA', '120k - 250k DA', '+250k DA'],
        ar: ['30-60 ألف دج', '60-120 ألف دج', '120-250 ألف دج', '+250 ألف دج']
      },
      cta: { fr: 'LANCER MON AUDIT', en: 'START MY AUDIT', ar: 'ابدأ تدقيقي' },
      stepLabel: { fr: 'Étape {step} sur {total}', en: 'Step {step} of {total}', ar: 'خطوة {step} من {total}' },
      next: { fr: 'SUIVANT', en: 'NEXT', ar: 'التالي' },
      successTitle: { fr: 'DEMANDE VALIDÉE !', en: 'REQUEST VALIDATED!', ar: 'تم تأكيد الطلب!' },
      successMessage: { fr: 'Votre demande a été reçue. Nous reviendrons vers vous avec les coordonnées fournies.', en: 'We received your request. We will get back to you using the contact details you provided.', ar: 'تلقينا طلبك. سنرد عليك باستخدام بيانات التواصل التي قدمتها.' },
      backToHome: { fr: 'Retour à l\'accueil', en: 'Back to Home', ar: 'العودة للرئيسية' },
      packSelected: { fr: 'Sélection validée', en: 'Selection confirmed', ar: 'تم التأكيد' },
      phoneError: { fr: 'Le numéro doit contenir exactement 10 chiffres', en: 'Number must be exactly 10 digits', ar: 'يجب أن يحتوي الرقم على 10 أرقام بالضبط' },
      phoneValid: { fr: '✓ Numéro valide', en: '✓ Valid number', ar: '✓ رقم صحيح' },
      multipleChoice: { fr: 'plusieurs choix possibles', en: 'multiple choices allowed', ar: 'اختيارات متعددة ممكنة' },
      otherActivityLabel: { fr: 'Précisez votre activité', en: 'Specify your activity', ar: 'حدد نشاطك' },
      otherProblemLabel: { fr: 'Précisez votre blocage', en: 'Specify your obstacle', ar: 'حدد عائقك' },
      requiredField: { fr: '⚠ Ce champ est obligatoire pour continuer', en: '⚠ This field is required to continue', ar: '⚠ هذا الحقل مطلوب للمتابعة' },
      networkError: { fr: 'Une erreur est survenue. Vérifiez votre connexion et réessayez.', en: 'An error occurred. Check your connection and try again.', ar: 'حدث خطأ. تحقق من اتصالك وحاول مجدداً.' },
      budgetNote: { fr: '* Budget minimum de départ : 30 000 DA / mois', en: '* Minimum starting budget: 30,000 DA / month', ar: '* الحد الأدنى للميزانية: 30,000 دج / شهر' },
      onlinePresenceLabel: { fr: 'Votre présence en ligne actuelle ?', en: 'Your current online presence?', ar: 'حضورك على الإنترنت حالياً؟' },
      onlinePresenceOptions: {
        fr: ['Pas de page', 'Page inactive', 'Page active mais sans résultats'],
        en: ['No page', 'Inactive page', 'Active page but no results'],
        ar: ['لا توجد صفحة', 'صفحة غير نشطة', 'صفحة نشطة بدون نتائج']
      },
      businessAgeLabel: { fr: 'Depuis combien de temps votre business est actif ?', en: 'How long has your business been active?', ar: 'منذ متى وعملك نشط؟' },
      businessAgeOptions: {
        fr: ['Moins de 6 mois', '6 mois – 2 ans', '+2 ans'],
        en: ['Less than 6 months', '6 months – 2 years', '+2 years'],
        ar: ['أقل من 6 أشهر', '6 أشهر – سنتان', '+سنتان']
      },
      paidAdsLabel: { fr: 'Avez-vous déjà fait de la pub payante ?', en: 'Have you ever run paid ads?', ar: 'هل سبق وأجريت إعلانات مدفوعة؟' },
      paidAdsOptions: {
        fr: ['Jamais', 'Oui, sans résultats', 'Oui, avec résultats'],
        en: ['Never', 'Yes, no results', 'Yes, with results'],
        ar: ['أبداً', 'نعم، بدون نتائج', 'نعم، مع نتائج']
      },
      // NEW TRANSLATIONS FOR 5-STEP FORM
      emailLabel: { fr: 'Email', en: 'Email', ar: 'البريد الإلكتروني' },
      emailOptional: { fr: '(Optionnel)', en: '(Optional)', ar: '(اختياري)' },
      companyLabel: { fr: 'Nom de l\'entreprise', en: 'Company Name', ar: 'اسم الشركة' },
      businessTypeLabel: { fr: 'Type d\'activité', en: 'Business Type', ar: 'نوع النشاط' },
      businessTypeOptions: {
        fr: ['PME', 'E-commerce', 'Crèche', 'Centre de formation', 'Autre'],
        en: ['SME', 'E-commerce', 'Daycare', 'Training Center', 'Other'],
        ar: ['مشروع صغير/متوسط', 'تجارة إلكترونية', 'روضة أطفال', 'مركز تدريب', 'أخرى']
      },
      blocagesLabel: { fr: 'Vos blocages', en: 'Your obstacles', ar: 'عوائقك' },
      blocagesOptions: {
        fr: ['Pas de visibilité en ligne', 'Génération de leads faible', 'Mauvaise conversion', 'Besoin de croissance', 'Concurrence forte', 'Autre'],
        en: ['No online visibility', 'Low lead generation', 'Poor conversion', 'Need growth', 'Strong competition', 'Other'],
        ar: ['عدم وجود ظهور على الإنترنت', 'ضعف جيل العملاء المحتملين', 'تحويل ضعيف', 'الحاجة إلى النمو', 'منافسة قوية', 'أخرى']
      },
      projectDescriptionLabel: { fr: 'Description du projet', en: 'Project Description', ar: 'وصف المشروع' },
      projectDescriptionPlaceholder: { 
        fr: 'Décrivez brièvement votre besoin et ce que vous recherchez...', 
        en: 'Briefly describe your needs and what you\'re looking for...', 
        ar: 'صف احتياجاتك بإيجاز وما تبحث عنه...' 
      },
      onlinePresenceNewLabel: { fr: 'Présence en ligne actuelle', en: 'Current online presence', ar: 'الحضور الحالي على الإنترنت' },
      onlinePresenceNewOptions: {
        fr: ['Pas de présence', 'Site vitrine', 'Présence active'],
        en: ['No presence', 'Brochure website', 'Active presence'],
        ar: ['بدون حضور', 'موقع إلكتروني بسيط', 'حضور نشط']
      },
      businessAgeNewLabel: { fr: 'Ancienneté de l\'entreprise', en: 'Company age', ar: 'عمر الشركة' },
      businessAgeNewOptions: {
        fr: ['0-1 an', '1-3 ans', '3+ ans'],
        en: ['0-1 year', '1-3 years', '3+ years'],
        ar: ['0-سنة واحدة', 'سنة-3 سنوات', '3+ سنوات']
      },
      paidAdsNewLabel: { fr: 'Publicités payantes', en: 'Paid advertising', ar: 'الإعلانات المدفوعة' },
      paidAdsNewOptions: {
        fr: ['Jamais', 'Peu d\'expérience', 'Expérience confirmée'],
        en: ['Never', 'Little experience', 'Confirmed experience'],
        ar: ['أبداً', 'خبرة قليلة', 'خبرة مؤكدة']
      },
      timelineLabel: { fr: 'Timeline d\'engagement', en: 'Engagement timeline', ar: 'المدة الزمنية للالتزام' },
      timelineOptions: {
        fr: ['Immédiat (< 1 mois)', '1-3 mois', '3-6 mois', 'Sans urgence'],
        en: ['Immediate (< 1 month)', '1-3 months', '3-6 months', 'No urgency'],
        ar: ['فوري (< شهر)', 'شهر-3 أشهر', '3-6 أشهر', 'بدون استعجالية']
      },
      budgetMonthlyLabel: { fr: 'Budget mensuel', en: 'Monthly budget', ar: 'الميزانية الشهرية' },
      budgetMonthlyOptions: {
        fr: ['30-50k DA', '50-100k DA', '100-200k DA', '200k+ DA'],
        en: ['30-50k DA', '50-100k DA', '100-200k DA', '200k+ DA'],
        ar: ['30-50 ألف دج', '50-100 ألف دج', '100-200 ألف دج', '+200 ألف دج']
      },
      summaryLabel: { fr: 'Résumé de votre demande', en: 'Summary of your request', ar: 'ملخص طلبك' },
      contactInfoLabel: { fr: 'Contact', en: 'Contact', ar: 'الاتصال' },
      profileLabel: { fr: 'Profil', en: 'Profile', ar: 'الملف الشخصي' },
      needLabel: { fr: 'Besoin', en: 'Need', ar: 'الاحتياج' },
      engagementLabel: { fr: 'Engagement', en: 'Engagement', ar: 'الالتزام' },
      projectDetailsLabel: { fr: 'Détails du projet', en: 'Project details', ar: 'تفاصيل المشروع' },
      submitButtonText: { fr: 'Envoyer mon devis', en: 'Send my quote', ar: 'أرسل عرضي' },
    },
    modal: {
        cta: { fr: 'Discuter sur WhatsApp', en: 'Chat on WhatsApp', ar: 'تحدث عبر واتساب' },
        close: { fr: 'Fermer', en: 'Close', ar: 'إغلاق' }
    }
  },
  footer: {
    tagline: { fr: 'On vous aide à grandir en Algérie.', en: 'Helping you grow in Algeria.', ar: 'نساعدك على النمو في الجزائر.' },
    copyright: { fr: 'iVISION Agency.', en: 'iVISION Agency.', ar: 'iVISION للخدمات.' },
    contactUs: { fr: 'AUDIT GRATUIT', en: 'FREE AUDIT', ar: 'تدقيق مجاني' },
    marketingLink: { fr: 'Marketing digital en Algérie', en: 'Digital marketing in Algeria (FR)', ar: 'التسويق الرقمي في الجزائر (فرنسي)' },
    contentLink: { fr: 'Création de contenu en Algérie', en: 'Content creation in Algeria (FR)', ar: 'صناعة المحتوى في الجزائر (فرنسي)' },
    adsLink: { fr: 'Publicité Meta & Google Ads', en: 'Meta & Google Ads (FR)', ar: 'إعلانات ميتا وجوجل (فرنسي)' },
    webLink: { fr: 'Création de sites web', en: 'Website creation (FR)', ar: 'إنشاء مواقع ويب (فرنسي)' },
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
    guide: {
      steps: b.guide.steps[lang],
      next: b.guide.next[lang],
      skip: b.guide.skip[lang],
      finish: b.guide.finish[lang]
    },
    hero: {
      badge: b.hero.badge[lang],
      title: b.hero.title[lang],
      subtitle: b.hero.subtitle[lang],
      middleCopy: b.hero.middleCopy[lang],
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
    contactSection: {
        title: b.contactSection.title[lang],
        subtitle: b.contactSection.subtitle[lang],
        labels: {
            contact: b.contactSection.labels.contact[lang],
            follow: b.contactSection.labels.follow[lang]
        }
    },
    contact: {
      form: {
        title: b.contact.form.title[lang],
        back: b.contact.form.back[lang],
        nameLabel: b.contact.form.nameLabel[lang],
        phoneLabel: b.contact.form.phoneLabel[lang],
        businessLabel: b.contact.form.businessLabel[lang],
        otherSpecify: b.contact.form.otherSpecify[lang],
        businessOptions: b.contact.form.businessOptions[lang],
        problemLabel: b.contact.form.problemLabel[lang],
        problemOptions: b.contact.form.problemOptions[lang],
        budgetLabel: b.contact.form.budgetLabel[lang],
        budgetOptions: b.contact.form.budgetOptions[lang],
        cta: b.contact.form.cta[lang],
        stepLabel: b.contact.form.stepLabel[lang],
        next: b.contact.form.next[lang],
        successTitle: b.contact.form.successTitle[lang],
        successMessage: b.contact.form.successMessage[lang],
        backToHome: b.contact.form.backToHome[lang],
        packSelected: b.contact.form.packSelected[lang],
        phoneError: b.contact.form.phoneError[lang],
        phoneValid: b.contact.form.phoneValid[lang],
        multipleChoice: b.contact.form.multipleChoice[lang],
        otherActivityLabel: b.contact.form.otherActivityLabel[lang],
        otherProblemLabel: b.contact.form.otherProblemLabel[lang],
        requiredField: b.contact.form.requiredField[lang],
        networkError: b.contact.form.networkError[lang],
        budgetNote: b.contact.form.budgetNote[lang],
        onlinePresenceLabel: b.contact.form.onlinePresenceLabel[lang],
        onlinePresenceOptions: b.contact.form.onlinePresenceOptions[lang],
        businessAgeLabel: b.contact.form.businessAgeLabel[lang],
        businessAgeOptions: b.contact.form.businessAgeOptions[lang],
        paidAdsLabel: b.contact.form.paidAdsLabel[lang],
        paidAdsOptions: b.contact.form.paidAdsOptions[lang],
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
      contactUs: b.footer.contactUs[lang],
      marketingLink: b.footer.marketingLink[lang],
      contentLink: b.footer.contentLink[lang],
      adsLink: b.footer.adsLink[lang],
      webLink: b.footer.webLink[lang],
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
