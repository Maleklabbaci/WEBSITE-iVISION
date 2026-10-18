import React, { useEffect, useMemo, useState } from 'react';
import type { Language } from '../lib/translations';

export type ToolKey = 'diagnostic' | 'pertes' | 'audit-seo' | 'simulateur-web' | 'calculateur';

interface InteractiveToolsPageProps {
  language: Language;
  initialTool?: string;
}

const VALID_TOOLS: ToolKey[] = ['diagnostic', 'pertes', 'audit-seo', 'simulateur-web', 'calculateur'];

function resolveTool(raw?: string): ToolKey {
  if (raw && (VALID_TOOLS as string[]).includes(raw)) {
    return raw as ToolKey;
  }
  return 'diagnostic';
}

const FONT_COMPARATOR_OPTIONS = [
  {
    id: 'pinyon',
    name: 'Cormorant Garamond 500 + Pinyon Script',
    tag: 'CALLIGRAPHIE HAUTE-COUTURE · ACTIF',
    family: "'Cormorant Garamond', Georgia, serif",
    scriptFamily: "'Pinyon Script', cursive",
    weight: 500,
    noteFr: 'Calligraphie éditoriale française très chic : contraste spectaculaire avec les majuscules de Cormorant Garamond 500.',
    noteAr: 'خط كاليغرافي فرنسي فاخر يمنح تبايناً راقياً مع عناوين Cormorant Garamond.',
  },
  {
    id: 'allura',
    name: 'Cormorant Garamond 500 + Allura',
    tag: 'SIGNATURE FLUIDE & MODERNE',
    family: "'Cormorant Garamond', Georgia, serif",
    scriptFamily: "'Allura', cursive",
    weight: 500,
    noteFr: 'Script manuscrit très lisible, aérien et naturel : parfait pour une lecture rapide sur mobile et desktop.',
    noteAr: 'خط يدوي انسيابي وواضح جداً للقراءة السريعة على الهاتف والحاسوب.',
  },
  {
    id: 'parisienne',
    name: 'Cormorant Garamond 500 + Parisienne',
    tag: 'ÉLÉGANCE PARISIENNE',
    family: "'Cormorant Garamond', Georgia, serif",
    scriptFamily: "'Parisienne', cursive",
    weight: 500,
    noteFr: 'Inspirée des publicités vintage parisiennes : courbes souples et rebondies très chaleureuses.',
    noteAr: 'مستوحى من الإعلانات الباريسية الكلاسيكية بانحناءات ناعمة ودافئة.',
  },
  {
    id: 'greatvibes',
    name: 'Cormorant Garamond 500 + Great Vibes',
    tag: 'PLUME EXPRESSIVE DE LUXE',
    family: "'Cormorant Garamond', Georgia, serif",
    scriptFamily: "'Great Vibes', cursive",
    weight: 500,
    noteFr: 'Pleins et déliés très marqués avec de belles majuscules calligraphiées.',
    noteAr: 'حروف يدوية بارزة بتفاصيل غنية في البدايات والنهايات.',
  },
  {
    id: 'alexbrush',
    name: 'Cormorant Garamond 500 + Alex Brush',
    tag: 'PINCEAU CALLIGRAPHIQUE',
    family: "'Cormorant Garamond', Georgia, serif",
    scriptFamily: "'Alex Brush', cursive",
    weight: 500,
    noteFr: 'Script fluide aux liaisons courtes et très nettes, proche d’une signature à l’encre.',
    noteAr: 'خط فرشاة متوازن وواضح قريب من التوقيع اليدوي بالحبر.',
  },
  {
    id: 'caveat',
    name: 'Cormorant Garamond 500 + Caveat',
    tag: 'NOTE MANUSCRITE STUDIO CRÉATIF',
    family: "'Cormorant Garamond', Georgia, serif",
    scriptFamily: "'Caveat', cursive",
    weight: 500,
    noteFr: 'Style écriture main levée / carnet de directeur artistique (moins calligraphique, plus spontané).',
    noteAr: 'أسلوب كتابة يدوية عفوية تشبه ملاحظات المدير الفني في الاستوديو.',
  },
];

const InteractiveToolsPage: React.FC<InteractiveToolsPageProps> = ({ language, initialTool }) => {
  const isAr = language === 'ar';
  const [activeTool, setActiveTool] = useState<ToolKey>(() => resolveTool(initialTool));
  const [previewFontId, setPreviewFontId] = useState<string>('caveat');

  useEffect(() => {
    setActiveTool(resolveTool(initialTool));
  }, [initialTool]);

  const activeFontObj = useMemo(
    () => FONT_COMPARATOR_OPTIONS.find((f) => f.id === previewFontId) || FONT_COMPARATOR_OPTIONS[0],
    [previewFontId]
  );

  const handleApplyPreviewFont = (fontId: string) => {
    setPreviewFontId(fontId);
    const chosen = FONT_COMPARATOR_OPTIONS.find((f) => f.id === fontId);
    if (chosen && typeof document !== 'undefined') {
      document.documentElement.style.setProperty('--iv-display-font', chosen.family);
      document.documentElement.style.setProperty('--iv-script-font', chosen.scriptFamily);
    }
  };

  const selectTool = (tool: ToolKey, scrollToWorkspace = false) => {
    setActiveTool(tool);
    if (typeof window !== 'undefined') {
      const nextHash = `/#/outils?tool=${tool}`;
      if (window.location.hash !== `#/outils?tool=${tool}`) {
        window.history.replaceState(null, '', nextHash);
      }
      if (scrollToWorkspace) {
        document.getElementById('tools-workspace')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // --- 1. DIAGNOSTIC DIGITAL SCORE ---
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({
    site: 10,
    seo: 5,
    social: 15,
    ads: 10,
    crm: 5,
  });

  const diagScore = useMemo(
    () => (Object.values(diagAnswers) as number[]).reduce((acc, v) => acc + v, 0),
    [diagAnswers]
  );

  // --- 2. COMPTEUR DE PERTES ---
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(3000);
  const [avgDealValue, setAvgDealValue] = useState<number>(25000);
  const [loadSeconds, setLoadSeconds] = useState<number>(5);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (activeTool !== 'pertes') return;
    setElapsedSeconds(0);
    const timer = window.setInterval(() => {
      setElapsedSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [activeTool]);

  const lossStats = useMemo(() => {
    const extraSeconds = Math.max(0, loadSeconds - 2);
    const dropRate = Math.min(0.68, 0.12 + extraSeconds * 0.09);
    const lostVisitors = Math.round(monthlyVisitors * dropRate);
    const missedLeads = Math.max(1, Math.round(lostVisitors * 0.025));
    const missedDeals = Math.max(1, Math.round(missedLeads * 0.25));
    const missedRevenueMonth = missedDeals * avgDealValue;
    const perSecondLoss = missedRevenueMonth / (30 * 24 * 3600);
    const realtimeLostDA = Math.round(elapsedSeconds * perSecondLoss * 360);
    return {
      dropPercent: Math.round(dropRate * 100),
      lostVisitors,
      missedLeads,
      missedRevenueMonth,
      realtimeLostDA,
    };
  }, [monthlyVisitors, avgDealValue, loadSeconds, elapsedSeconds]);

  // --- 3. AUDIT SEO GRATUIT ---
  const [seoUrl, setSeoUrl] = useState<string>('');
  const [seoSector, setSeoSector] = useState<string>('');
  const [seoChecks, setSeoChecks] = useState<Record<string, boolean>>({
    https: true,
    mobile: true,
    speed: false,
    gmb: true,
    keywords: false,
    schema: false,
    bilingual: false,
    cta: true,
  });

  const seoItems = useMemo(
    () =>
      isAr
        ? [
            { id: 'https', weight: 12, title: 'شهادة أمان HTTPS نشطة وسريعة' },
            { id: 'mobile', weight: 15, title: 'تصميم متجاوب 100% مع الهواتف في الجزائر' },
            { id: 'speed', weight: 15, title: 'سرعة تحميل أقل من 2.5 ثانية على شبكة 4G' },
            { id: 'gmb', weight: 12, title: 'ملف Google Maps (Google Business) موثق ومرتبط' },
            { id: 'keywords', weight: 14, title: 'صفحات مستقلة لكل خدمة مع كلمات مفتاحية محلية' },
            { id: 'schema', weight: 10, title: 'بيانات منظمة Schema.org وفهرسة Sitemap.xml' },
            { id: 'bilingual', weight: 10, title: 'محتوى مهيأ بالعربية والفرنسية (FR / AR)' },
            { id: 'cta', weight: 12, title: 'مسار تحويل واضح (واتساب + استمارة سريعة)' },
          ]
        : [
            { id: 'https', weight: 12, title: 'Certificat HTTPS actif & sécurité navigateur' },
            { id: 'mobile', weight: 15, title: 'Affichage mobile irréprochable (80%+ du trafic DZ)' },
            { id: 'speed', weight: 15, title: 'Chargement rapide (< 2,5 s sur réseau 4G Algérie)' },
            { id: 'gmb', weight: 12, title: 'Fiche Google Maps / Business Profile reliée au site' },
            { id: 'keywords', weight: 14, title: 'Une page dédiée par service (ciblage requêtes Algérie)' },
            { id: 'schema', weight: 10, title: 'Données structurées Schema.org & Sitemap soumis' },
            { id: 'bilingual', weight: 10, title: 'Architecture bilingue Français / Arabe (RTL propre)' },
            { id: 'cta', weight: 12, title: 'Parcours de conversion direct (WhatsApp & Devis)' },
          ],
    [isAr]
  );

  const seoScore = useMemo(
    () => seoItems.reduce((sum, item) => sum + (seoChecks[item.id] ? item.weight : 0), 0),
    [seoChecks, seoItems]
  );

  // --- 4. SIMULATEUR DE SITE WEB ---
  const [webGoal, setWebGoal] = useState<'vitrine' | 'ecommerce' | 'landing' | 'refonte'>('vitrine');
  const [webPages, setWebPages] = useState<'1-3' | '4-7' | '8+'>('4-7');
  const [webBilingual, setWebBilingual] = useState<boolean>(true);
  const [webFeatures, setWebFeatures] = useState<string[]>(['whatsapp', 'seo']);

  const toggleWebFeature = (feat: string) => {
    setWebFeatures((prev) =>
      prev.includes(feat) ? prev.filter((item) => item !== feat) : [...prev, feat]
    );
  };

  const webRecommendation = useMemo(() => {
    if (webGoal === 'ecommerce') {
      return isAr
        ? {
            title: 'متجر إلكتروني متكامل للسوق الجزائري',
            subtitle: 'مصمم للبيع المباشر مع الدفع عند الاستلام (COD)، إدارة الطلبيات وربط التوصيل.',
            timeline: '3 إلى 5 أسابيع',
            pages: ['الرئيسية + الكتالوج', 'صفحات المنتجات المحسنة', 'سلة طلب سريع (COD)', 'تتبع Meta Pixel & TikTok'],
          }
        : {
            title: 'Site E-commerce & Catalogue COD Algérie',
            subtitle: 'Conçu pour la vente directe avec commande rapide, paiement à la livraison (COD) et suivi publicitaire.',
            timeline: '3 à 5 semaines',
            pages: ['Accueil & univers de marque', 'Fiches produits orientées conversion', 'Tunnel de commande directe COD', 'Intégration Meta Pixel & Google Tag'],
          };
    }
    if (webGoal === 'landing') {
      return isAr
        ? {
            title: 'صفحة هبوط عالية التحويل (Landing Page)',
            subtitle: 'مهيكلة خصيصاً لتحويل زوار إعلانات Meta وGoogle إلى اتصالات وطلبات فعلية.',
            timeline: '7 إلى 12 يوماً',
            pages: ['عرض القيمة المباشر (Hero)', 'براهين الثقة والنتائج', 'استمارة طلب سريع + واتساب'],
          }
        : {
            title: 'Landing Page Haute Conversion (Ads & Lancement)',
            subtitle: 'Taillée pour transformer le trafic issu de Meta Ads et Google Ads en demandes qualifiées.',
            timeline: '7 à 12 jours',
            pages: ['Proposition de valeur immédiate', 'Preuves sociales & arguments clés', 'Formulaire qualifié + WhatsApp direct'],
          };
    }
    return isAr
      ? {
          title: 'موقع شركة احترافي مهيأ لمحركات البحث (SEO)',
          subtitle: 'يبني مصداقية علامتك، يعرض خدماتك بوضوح، ويجذب العملاء الباحثين في جوجل بالجزائر.',
          timeline: '2 إلى 4 أسابيع',
          pages: [
            'الصفحة الرئيسية الإستراتيجية',
            webPages === '8+' ? 'صفحات مفصلة لكل خدمة وقطاع' : 'صفحات الخدمات والأعمال السابقة',
            'صفحة من نحن ومعايير الثقة',
            'صفحة تواصل وطلب عرض سعر',
          ],
        }
      : {
          title: 'Site Vitrine Éditorial & Acquisition SEO',
          subtitle: 'Asseoit votre crédibilité, présente vos offres clairement et capte les recherches Google en Algérie.',
          timeline: '2 à 4 semaines',
          pages: [
            'Accueil éditorial & positionnement',
            webPages === '8+' ? 'Pages dédiées par service & secteur' : 'Pages services & réalisations',
            'À propos & preuves de réassurance',
            'Parcours de contact & demande de devis',
          ],
        };
  }, [webGoal, webPages, isAr]);

  // --- 5. CALCULATEUR DE DEVIS (CONFIGURATEUR SUR-MESURE) ---
  const [selectedPoles, setSelectedPoles] = useState<string[]>(['web', 'ads']);
  const [cadence, setCadence] = useState<'launch' | 'growth' | 'scale'>('growth');

  const togglePole = (poleId: string) => {
    setSelectedPoles((prev) =>
      prev.includes(poleId)
        ? prev.length > 1
          ? prev.filter((id) => id !== poleId)
          : prev
        : [...prev, poleId]
    );
  };

  const polesCatalog = isAr
    ? [
        {
          id: 'web',
          title: 'تصميم وتطوير موقع ويب',
          tag: 'WEB & SEO',
          deliverables: ['تصميم UI/UX مخصص للعلامة', 'برمجة سريعة متوافقة مع الهواتف', 'تهيئة SEO تقنية لمحركات البحث'],
        },
        {
          id: 'ads',
          title: 'إدارة الإعلانات الممولة (Meta & Google Ads)',
          tag: 'ACQUISITION',
          deliverables: ['هيكلة الحملات والاستهداف في الجزائر', 'إعداد Pixel وتتبع التحويلات', 'تحسين مستمر لتكلفة العميل المحتمل'],
        },
        {
          id: 'content',
          title: 'صناعة المحتوى وإنتاج الفيديو (Reels / Spot)',
          tag: 'STUDIO & SOCIAL',
          deliverables: ['كتابة السيناريو والإخراج الفني', 'تصوير ومونتاج فيديوهات قصيرة', 'تصاميم منشورات احترافية للشبكات'],
        },
        {
          id: 'branding',
          title: 'الهوية البصرية والتموقع الإستراتيجي',
          tag: 'BRANDING',
          deliverables: ['تصميم الشعار والخطوط والألوان', 'دليل الهوية البصرية الكامل', 'توحيد صورة العلامة الرقمية'],
        },
      ]
    : [
        {
          id: 'web',
          title: 'Création ou refonte de site web',
          tag: 'WEB & SEO',
          deliverables: ['Direction artistique & UX sur-mesure', 'Développement rapide pensé mobile', 'Socle SEO technique & pages services'],
        },
        {
          id: 'ads',
          title: 'Campagnes Meta Ads & Google Ads',
          tag: 'ACQUISITION',
          deliverables: ['Ciblage marché algérien & cadrage', 'Tracking des conversions (Pixel / Tag)', 'Optimisation continue du coût par contact'],
        },
        {
          id: 'content',
          title: 'Création de contenu & Production Reels',
          tag: 'STUDIO & SOCIAL',
          deliverables: ['Scénarisation & direction créative', 'Tournage / montage formats 9:16', 'Design éditorial & carrousels réseaux'],
        },
        {
          id: 'branding',
          title: 'Identité visuelle & Positionnement',
          tag: 'BRANDING',
          deliverables: ['Logotype, typographies & palette', 'Charte graphique déclinable', 'Harmonisation des supports digitaux'],
        },
      ];

  const activePolesDetails = polesCatalog.filter((p) => selectedPoles.includes(p.id));

  const buildWhatsAppLink = (summaryText: string) =>
    `https://wa.me/213563839404?text=${encodeURIComponent(summaryText)}`;

  const toolsTabs: Array<{ id: ToolKey; num: string; label: string; short: string }> = isAr
    ? [
        { id: 'diagnostic', num: '01', label: 'التشخيص الرقمي (Score)', short: 'تقييم شامل /100' },
        { id: 'pertes', num: '02', label: 'حاسبة الفرص الضائعة', short: 'محاكاة الزيارات والعائد' },
        { id: 'audit-seo', num: '03', label: 'فحص SEO المجاني', short: 'جاهزية جوجل الجزائر' },
        { id: 'simulateur-web', num: '04', label: 'مصمم مشروع الموقع', short: 'اختيار نوع الموقع' },
        { id: 'calculateur', num: '05', label: 'حاسبة نطاق عرض السعر', short: 'تجميع الخدمات والمخرجات' },
      ]
    : [
        { id: 'diagnostic', num: '01', label: 'Diagnostic Digital Score', short: 'Score de maturité /100' },
        { id: 'pertes', num: '02', label: 'Compteur de Pertes', short: 'Simulateur trafic & CA' },
        { id: 'audit-seo', num: '03', label: 'Audit SEO Gratuit', short: 'Checklist Google Algérie' },
        { id: 'simulateur-web', num: '04', label: 'Simulateur de Site Web', short: 'Architecture & format' },
        { id: 'calculateur', num: '05', label: 'Calculateur de Devis', short: 'Configurateur sur-mesure' },
      ];

  const diagQuestions = isAr
    ? [
        {
          id: 'site',
          label: '01 · الموقع الإلكتروني وسرعة التحميل',
          q: 'كيف تقيّم موقعك الإلكتروني الحالي؟',
          options: [
            { score: 0, label: 'لا يوجد موقع حالياً (نعتمد فقط على الصفحات الاجتماعية)' },
            { score: 10, label: 'موقع قديم أو بطيء على الهاتف ولا يجلب طلبات' },
            { score: 20, label: 'موقع حديث، سريع ومرتبط بواتساب واستمارة واضحة' },
          ],
        },
        {
          id: 'seo',
          label: '02 · الظهور في محرك البحث جوجل (SEO)',
          q: 'هل يظهر نشاطك عندما يبحث العملاء عن خدماتك في الجزائر؟',
          options: [
            { score: 0, label: 'لا نظهر في نتائج البحث الأولى إطلاقاً' },
            { score: 10, label: 'نظهر فقط عند كتابة اسم علامتنا التجارية' },
            { score: 20, label: 'لدينا صفحات مهيأة تتصدر كلمات مفتاحية محلية' },
          ],
        },
        {
          id: 'social',
          label: '03 · المحتوى والفيديو على الشبكات الاجتماعية',
          q: 'ما هو مستوى إنتاج المحتوى (Reels / تصاميم) لديكم؟',
          options: [
            { score: 5, label: 'نشر غير منتظم وبدون هوية بصرية واضحة' },
            { score: 12, label: 'تصاميم مقبولة لكن ينقصنا الفيديو القصير المقنع' },
            { score: 20, label: 'محتوى احترافي منتظم يعكس قيمة العلامة التجارية' },
          ],
        },
        {
          id: 'ads',
          label: '04 · الإعلانات الممولة (Meta Ads & Google Ads)',
          q: 'كيف تديرون حملاتكم الإعلانية حالياً؟',
          options: [
            { score: 5, label: 'نعتمد على الترويج المباشر (Boost) بدون تتبع دقيق' },
            { score: 12, label: 'نطلق حملات متقطعة بدون صفحات هبوط مخصصة' },
            { score: 20, label: 'حملات مهيكلة مع تتبع التحويلات وحساب العائد' },
          ],
        },
        {
          id: 'crm',
          label: '05 · معالجة الطلبات والعملاء المحتملين',
          q: 'كيف يتم استقبال ومتابعة رسائل وطلبات العملاء؟',
          options: [
            { score: 5, label: 'الرسائل تتشتت بين إنستغرام وفيسبوك ويتأخر الرد' },
            { score: 12, label: 'نرد يدوياً عبر الهاتف أو واتساب بدون تصنيف' },
            { score: 20, label: 'مسار واضح يفرز الطلبات الجادة بسرعة' },
          ],
        },
      ]
    : [
        {
          id: 'site',
          label: '01 · Site web & expérience mobile',
          q: 'Quel est l’état actuel de votre site internet ?',
          options: [
            { score: 0, label: 'Aucun site web (présence uniquement sur les réseaux sociaux)' },
            { score: 10, label: 'Site vieillissant, lent sur mobile ou peu orienté conversion' },
            { score: 20, label: 'Site rapide, rassurant, avec parcours devis & WhatsApp clair' },
          ],
        },
        {
          id: 'seo',
          label: '02 · Visibilité Google en Algérie (SEO)',
          q: 'Comment ressortez-vous sur Google quand un client cherche votre activité ?',
          options: [
            { score: 0, label: 'Invisible sur nos mots-clés métiers en Algérie' },
            { score: 10, label: 'Visible uniquement lorsqu’on tape le nom exact de notre entreprise' },
            { score: 20, label: 'Pages services positionnées sur des requêtes locales qualifiées' },
          ],
        },
        {
          id: 'social',
          label: '03 · Contenu Social Media & Reels',
          q: 'Quelle est la régularité et la qualité de vos contenus (visuels, vidéos) ?',
          options: [
            { score: 5, label: 'Publications irrégulières, sans véritable direction artistique' },
            { score: 12, label: 'Visuels propres mais manque de vidéos incarnées (Reels / TikTok)' },
            { score: 20, label: 'Ligne éditoriale forte + vidéos régulières qui retiennent l’attention' },
          ],
        },
        {
          id: 'ads',
          label: '04 · Acquisition payante (Meta Ads & Google Ads)',
          q: 'Comment pilotez-vous vos campagnes publicitaires ?',
          options: [
            { score: 5, label: 'Simples « Boosts » de publications sans suivi des conversions' },
            { score: 12, label: 'Campagnes ponctuelles mais sans page d’atterrissage dédiée' },
            { score: 20, label: 'Campagnes structurées avec tracking Pixel / Tag et suivi des leads' },
          ],
        },
        {
          id: 'crm',
          label: '05 · Traitement commercial des demandes',
          q: 'Que se passe-t-il lorsqu’un prospect vous contacte ?',
          options: [
            { score: 5, label: 'Messages dispersés en DM avec délais de réponse variables' },
            { score: 12, label: 'Traitement manuel sur WhatsApp / téléphone sans pré-qualification' },
            { score: 20, label: 'Demandes qualifiées centralisées avec rappel rapide' },
          ],
        },
      ];

  const diagLevel = useMemo(() => {
    if (diagScore < 45) {
      return isAr
        ? {
            badge: 'المرحلة 1 · أساسيات تحتاج إلى بناء',
            title: 'حضورك الرقمي يفقد الكثير من الفرص الجاهزة',
            advice:
              'الأولوية الآن هي تأسيس قاعدة تحويل واضحة (موقع سريع أو صفحة هبوط مهيكلة + هوية محتوى متناسقة) قبل رفع ميزانية الإعلانات.',
          }
        : {
            badge: 'Palier 1 · Fondations à structurer',
            title: 'Votre écosystème laisse échapper des demandes qualifiées',
            advice:
              'Priorité recommandée : poser un socle de conversion crédible (site rapide ou page dédiée + contenus rassurants) avant d’intensifier le budget publicitaire.',
          };
    }
    if (diagScore < 75) {
      return isAr
        ? {
            badge: 'المرحلة 2 · حضور نشط قابل للتسريع',
            title: 'لديكم قاعدة جيدة ينقصها الربط بين المحتوى والإعلانات والموقع',
            advice:
              'الخطوة التالية هي تحسين صفحات الهبوط، هيكلة SEO محلي في الجزائر، وربط الإعلانات الممولة بمسار تحويل قابل للقياس.',
          }
        : {
            badge: 'Palier 2 · Croissance à accélérer',
            title: 'Les bases existent, mais vos leviers travaillent encore séparément',
            advice:
              'Priorité recommandée : relier vos campagnes Meta / Google Ads et votre création de contenu à un site optimisé pour la conversion et le SEO local.',
          };
    }
    return isAr
      ? {
          badge: 'المرحلة 3 · نضج رقمي متقدم',
          title: 'منظومتكم الرقمية جاهزة للتوسع وزيادة الحصة السوقية',
          advice:
            'يمكنكم التركيز على إنتاج فيديو إبداعي عالي التأثير، أتمتة مسار المبيعات، وتوسيع الكلمات المفتاحية التنافسية في جوجل.',
        }
      : {
          badge: 'Palier 3 · Maturité avancée',
          title: 'Votre socle digital est prêt pour passer à l’échelle',
          advice:
            'Priorité recommandée : intensifier la production créative (Reels, spots), affiner le coût d’acquisition et dominer les requêtes SEO de votre secteur.',
        };
  }, [diagScore, isAr]);

  const activeTabInfo = toolsTabs.find((t) => t.id === activeTool) || toolsTabs[0];

  return (
    <div style={{ background: '#f2ede4', color: '#14120f', minHeight: '100vh' }}>
      {/* ===== 1. HERO SOMBRE ÉDITORIAL (100% aligné sur creation-site-web-algerie.html) ===== */}
      <header
        style={{
          position: 'relative',
          padding: '7.6rem 0 4.6rem',
          background: '#14120f',
          color: '#f2ede4',
          borderBottom: '1px solid rgba(242, 237, 228, 0.14)',
          overflow: 'hidden',
        }}
      >
        <div style={{ width: 'min(100% - 9.6vw, 84rem)', marginInline: 'auto' }}>
          {/* Barre de fil d'Ariane identique aux pages SEO */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              paddingBottom: '1.35rem',
              marginBottom: '2.4rem',
              borderBottom: '1px solid rgba(242, 237, 228, 0.14)',
              color: 'rgba(242, 237, 228, 0.62)',
              fontSize: '0.62rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.55rem', flexWrap: 'wrap' }}>
              <span
                aria-hidden="true"
                style={{
                  width: '0.45rem',
                  height: '0.45rem',
                  borderRadius: '50%',
                  background: '#f2ede4',
                  boxShadow: '0 0 12px rgba(242, 237, 228, 0.7)',
                }}
              />
              <a href="/" style={{ color: '#f2ede4', textDecoration: 'none' }}>
                {isAr ? '← الرئيسية' : '← Accueil'}
              </a>
              <span>/</span>
              <a href="/agence-marketing-digital-algerie.html" style={{ color: 'rgba(242, 237, 228, 0.72)', textDecoration: 'none' }}>
                {isAr ? 'التسويق الرقمي' : 'Marketing digital'}
              </a>
              <span>/</span>
              <span style={{ color: '#f2ede4' }}>{isAr ? 'الأدوات التفاعلية' : 'Outils & Simulateurs'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.9rem', flexWrap: 'wrap' }}>
              {toolsTabs.map((tab, idx) => (
                <React.Fragment key={tab.id}>
                  {idx > 0 && <span aria-hidden="true">·</span>}
                  <button
                    type="button"
                    onClick={() => selectTool(tab.id, true)}
                    style={{
                      background: 'none',
                      border: 0,
                      padding: 0,
                      color: activeTool === tab.id ? '#f2ede4' : 'rgba(242, 237, 228, 0.62)',
                      fontSize: '0.6rem',
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      textDecoration: activeTool === tab.id ? 'underline' : 'none',
                      textUnderlineOffset: '0.28rem',
                    }}
                  >
                    {tab.label}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Grille Hero 2 colonnes comme creation-site-web-algerie.html */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
              gap: 'clamp(1.8rem, 3.6vw, 4rem)',
              alignItems: 'end',
            }}
          >
            <div>
              <p
                style={{
                  margin: '0 0 1rem',
                  color: '#a69b8b',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {isAr ? 'iVISION / مختبر القرار الرقمي · الجزائر' : 'iVISION / Atelier digital interactif'}
              </p>
              <h1
                id="tools-page-title"
                style={{
                  margin: '0 0 1.4rem',
                  fontFamily: activeFontObj.family,
                  fontWeight: activeFontObj.weight,
                  fontSize: 'clamp(2.55rem, 5.3vw, 5.5rem)',
                  lineHeight: 0.94,
                  letterSpacing: '-0.025em',
                  textTransform: 'uppercase',
                  color: '#f2ede4',
                }}
              >
                {isAr ? (
                  <>
                    شخّص حضورك <em style={{ fontStyle: 'normal', color: '#a69b8b' }}>الرقمي</em> بدقة.
                  </>
                ) : (
                  <>
                    Outils &amp;{' '}
                    <em
                      style={{
                        fontFamily: activeFontObj.scriptFamily,
                        fontStyle: 'normal',
                        fontWeight: 400,
                        textTransform: 'capitalize',
                        fontSize: '1.14em',
                        color: '#a69b8b',
                      }}
                    >
                      simulateurs
                    </em>{' '}
                    digitaux.
                  </>
                )}
              </h1>
              <p
                style={{
                  maxWidth: '42rem',
                  margin: '0 0 1.9rem',
                  color: 'rgba(242, 237, 228, 0.82)',
                  fontSize: 'clamp(0.98rem, 1.15vw, 1.12rem)',
                  lineHeight: 1.68,
                }}
              >
                {isAr
                  ? 'خمس أدوات مجانية صممتها وكالة iVISION لمساعدة المؤسسات في الجزائر على تقييم نضجها الرقمي، حساب الفرص الضائعة، فحص جاهزية SEO وتحديد نطاق مشروعها قبل طلب عرض السعر.'
                  : 'Cinq outils interactifs gratuits conçus par iVISION pour évaluer votre maturité digitale, mesurer l’impact d’un site lent, vérifier vos fondamentaux SEO et cadrer votre projet avant de demander un devis.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                <a
                  href="#tools-workspace"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.2rem',
                    minHeight: '2.95rem',
                    padding: '0.78rem 1.35rem',
                    borderRadius: '999px',
                    background: '#f2ede4',
                    color: '#14120f',
                    border: '1px solid #f2ede4',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  <span>{isAr ? 'استخدم الأدوات التفاعلية' : 'Utiliser les 5 outils'}</span>
                  <b aria-hidden="true">↓</b>
                </a>
                <a
                  href="/#/devis"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1.2rem',
                    minHeight: '2.95rem',
                    padding: '0.78rem 1.35rem',
                    borderRadius: '999px',
                    background: 'transparent',
                    color: '#f2ede4',
                    border: '1px solid rgba(242, 237, 228, 0.45)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.09em',
                    textTransform: 'uppercase',
                    textDecoration: 'none',
                  }}
                >
                  <span>{isAr ? 'اطلب عرض سعر مخصص' : 'Parler de mon projet'}</span>
                  <b aria-hidden="true">↗</b>
                </a>
              </div>
            </div>

            {/* Cadre tablette éditorial (identique au cadre Fidali de creation-site-web-algerie.html) */}
            <aside
              aria-label={isAr ? 'قائمة الأدوات' : 'Sélecteur rapide des 5 outils'}
              style={{
                position: 'relative',
                padding: 'clamp(0.85rem, 1.5vw, 1.2rem)',
                border: '1px solid rgba(242, 237, 228, 0.18)',
                borderRadius: '1.35rem',
                background: '#1c1a17',
                boxShadow: '0 26px 70px rgba(0, 0, 0, 0.28)',
              }}
            >
              <div
                style={{
                  borderRadius: '0.95rem',
                  background: '#fbf8f2',
                  color: '#14120f',
                  padding: '1.25rem',
                  display: 'grid',
                  gap: '0.55rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingBottom: '0.65rem',
                    borderBottom: '1px solid rgba(20, 18, 15, 0.12)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    color: '#6b6259',
                  }}
                >
                  <span>{isAr ? 'اختر الأداة التفاعلية' : 'Sélectionner un simulateur'}</span>
                  <span>05 OUTILS</span>
                </div>

                {toolsTabs.map((tab) => {
                  const active = activeTool === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => selectTool(tab.id, true)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.8rem',
                        padding: '0.7rem 0.9rem',
                        borderRadius: '0.7rem',
                        border: active ? '1px solid #14120f' : '1px solid rgba(20, 18, 15, 0.12)',
                        background: active ? '#14120f' : '#f2ede4',
                        color: active ? '#f2ede4' : '#14120f',
                        textAlign: isAr ? 'right' : 'left',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <span
                          style={{
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            letterSpacing: '0.12em',
                            color: active ? '#a69b8b' : '#6b6259',
                          }}
                        >
                          {tab.num}
                        </span>
                        <div>
                          <strong style={{ display: 'block', fontSize: '0.84rem', fontWeight: 700 }}>
                            {tab.label}
                          </strong>
                          <small
                            style={{
                              display: 'block',
                              fontSize: '0.7rem',
                              color: active ? 'rgba(242, 237, 228, 0.7)' : '#6b6259',
                            }}
                          >
                            {tab.short}
                          </small>
                        </div>
                      </div>
                      <span style={{ fontSize: '0.8rem', color: active ? '#a69b8b' : '#6b6259' }}>
                        {active ? '●' : '↗'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        </div>
      </header>

      {/* ===== 2. SECTION OUTILS SUR FOND CRÈME CHAUD (#f2ede4) & CARTES PAPIER (#fbf8f2) ===== */}
      <section
        id="tools-workspace"
        aria-labelledby="active-tool-heading"
        style={{
          padding: 'clamp(3.2rem, 6vw, 5.4rem) 0',
          background: '#f2ede4',
          color: '#14120f',
          borderBottom: '1px solid rgba(20, 18, 15, 0.14)',
        }}
      >
        <div style={{ width: 'min(100% - 9.6vw, 84rem)', marginInline: 'auto' }}>
          {/* En-tête de section éditorial */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'end',
              gap: '1.5rem',
              flexWrap: 'wrap',
              paddingBottom: '1.4rem',
              marginBottom: '2rem',
              borderBottom: '1px solid rgba(20, 18, 15, 0.14)',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: '0.62rem',
                  fontWeight: 700,
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: '#6b6259',
                  marginBottom: '0.45rem',
                }}
              >
                {activeTabInfo.num} / {activeTabInfo.short}
              </span>
              <h2
                id="active-tool-heading"
                style={{
                  margin: 0,
                  fontFamily: activeFontObj.family,
                  fontWeight: activeFontObj.weight,
                  fontSize: 'clamp(1.85rem, 3.4vw, 3.1rem)',
                  lineHeight: 0.98,
                  textTransform: 'uppercase',
                  color: '#14120f',
                }}
              >
                {activeTabInfo.label}
              </h2>
            </div>

            {/* Onglets pilules sur fond papier #fbf8f2 */}
            <div
              role="tablist"
              aria-label={isAr ? 'الأدوات التفاعلية' : 'Outils interactifs'}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.45rem',
                padding: '0.38rem',
                borderRadius: '999px',
                background: '#fbf8f2',
                border: '1px solid rgba(20, 18, 15, 0.14)',
              }}
            >
              {toolsTabs.map((tab) => {
                const active = activeTool === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => selectTool(tab.id)}
                    style={{
                      padding: '0.58rem 1rem',
                      borderRadius: '999px',
                      border: active ? '1px solid #14120f' : '1px solid transparent',
                      background: active ? '#14120f' : 'transparent',
                      color: active ? '#f2ede4' : '#14120f',
                      fontSize: '0.64rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <span style={{ color: active ? '#a69b8b' : '#6b6259', marginInlineEnd: '0.35rem' }}>
                      {tab.num}
                    </span>
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* CONTENU DE L'OUTIL 01 : DIAGNOSTIC */}
          {activeTool === 'diagnostic' && (
            <div className="web-quote-grid" role="tabpanel">
              <div
                style={{
                  padding: 'clamp(1.35rem, 2.5vw, 2.2rem)',
                  borderRadius: '1.15rem',
                  background: '#fbf8f2',
                  color: '#14120f',
                  border: '1px solid rgba(20, 18, 15, 0.14)',
                  display: 'grid',
                  gap: '1.35rem',
                }}
              >
                {diagQuestions.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      paddingBottom: '1.25rem',
                      borderBottom: '1px solid rgba(20, 18, 15, 0.1)',
                    }}
                  >
                    <span
                      style={{
                        display: 'block',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        letterSpacing: '0.14em',
                        color: '#6b6259',
                        textTransform: 'uppercase',
                        marginBottom: '0.35rem',
                      }}
                    >
                      {item.label}
                    </span>
                    <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '1rem', color: '#14120f' }}>
                      {item.q}
                    </p>
                    <div style={{ display: 'grid', gap: '0.5rem' }}>
                      {item.options.map((opt) => {
                        const selected = diagAnswers[item.id] === opt.score;
                        return (
                          <button
                            key={opt.label}
                            type="button"
                            onClick={() =>
                              setDiagAnswers((prev) => ({ ...prev, [item.id]: opt.score }))
                            }
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              gap: '0.75rem',
                              padding: '0.8rem 1rem',
                              borderRadius: '0.7rem',
                              border: selected
                                ? '1px solid #14120f'
                                : '1px solid rgba(20, 18, 15, 0.14)',
                              background: selected ? '#14120f' : '#f2ede4',
                              color: selected ? '#f2ede4' : '#14120f',
                              fontSize: '0.88rem',
                              fontWeight: selected ? 600 : 500,
                              textAlign: isAr ? 'right' : 'left',
                              cursor: 'pointer',
                            }}
                          >
                            <span>{opt.label}</span>
                            <b style={{ fontSize: '0.75rem', color: selected ? '#a69b8b' : '#6b6259' }}>
                              +{opt.score} pts
                            </b>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <aside
                style={{
                  position: 'sticky',
                  top: '6.5rem',
                  padding: '2rem',
                  borderRadius: '1.15rem',
                  background: '#14120f',
                  color: '#f2ede4',
                  border: '1px solid rgba(242, 237, 228, 0.16)',
                }}
              >
                <span
                  style={{
                    display: 'inline-block',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '999px',
                    border: '1px solid rgba(242, 237, 228, 0.25)',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#a69b8b',
                  }}
                >
                  {diagLevel.badge}
                </span>
                <div
                  style={{
                    fontFamily: activeFontObj.family,
                    fontSize: 'clamp(3.4rem, 6vw, 5.2rem)',
                    lineHeight: 0.95,
                    margin: '1rem 0 0.5rem',
                    color: '#f2ede4',
                  }}
                >
                  {diagScore}
                  <span style={{ fontSize: '1.5rem', color: '#a69b8b' }}>/100</span>
                </div>
                <h3 style={{ margin: '0 0 0.75rem', fontSize: '1.35rem', color: '#f2ede4' }}>
                  {diagLevel.title}
                </h3>
                <p style={{ margin: '0 0 1.5rem', color: 'rgba(242, 237, 228, 0.76)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {diagLevel.advice}
                </p>

                <div style={{ display: 'grid', gap: '0.65rem' }}>
                  <a
                    href="/#/devis"
                    className="web-quote-submit"
                    style={{ background: '#f2ede4', color: '#14120f', textDecoration: 'none', justifyContent: 'center' }}
                  >
                    {isAr ? 'اطلب خطة عمل مخصصة ↗' : 'Demander mon plan d’action ↗'}
                  </a>
                  <a
                    href={buildWhatsAppLink(
                      isAr
                        ? `مرحباً iVISION، أجريت التشخيص الرقمي وحصلت على ${diagScore}/100. أرغب في مناقشة خطة تحسين حضوري الرقمي.`
                        : `Bonjour iVISION, j'ai réalisé le Diagnostic Digital Score (${diagScore}/100) et je souhaite échanger sur les priorités de mon projet.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '3.1rem',
                      padding: '0.75rem 1.2rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(242, 237, 228, 0.28)',
                      color: '#f2ede4',
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {isAr ? 'إرسال النتيجة عبر واتساب ↗' : 'Discuter de mon score sur WhatsApp ↗'}
                  </a>
                </div>
              </aside>
            </div>
          )}

          {/* CONTENU DE L'OUTIL 02 : COMPTEUR DE PERTES */}
          {activeTool === 'pertes' && (
            <div className="web-quote-grid" role="tabpanel">
              <div
                style={{
                  padding: 'clamp(1.35rem, 2.5vw, 2.2rem)',
                  borderRadius: '1.15rem',
                  background: '#fbf8f2',
                  color: '#14120f',
                  border: '1px solid rgba(20, 18, 15, 0.14)',
                  display: 'grid',
                  gap: '1.4rem',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6b6259',
                    }}
                  >
                    {isAr ? 'محاكاة تأثير البطء وغياب التحويل' : 'Impact de la lenteur & du parcours client'}
                  </span>
                  <h3 style={{ margin: '0.35rem 0 0.5rem', fontSize: '1.6rem', color: '#14120f' }}>
                    {isAr ? 'كم يكلفك موقع بطيء أو غير مقنع؟' : 'Combien vous coûte un site lent ou absent ?'}
                  </h3>
                  <p style={{ margin: 0, color: '#554d44', fontSize: '0.92rem', lineHeight: 1.65 }}>
                    {isAr
                      ? 'حرك المؤشرات الثلاثة لتقدير عدد الزوار والطلبات التي تضيع شهرياً عندما يتجاوز وقت تحميل الصفحة ثانيتين على الهاتف.'
                      : 'Ajustez les 3 curseurs pour estimer le volume de visiteurs et de demandes perdues chaque mois lorsque votre page met trop de temps à charger sur mobile.'}
                  </p>
                </div>

                <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.88rem', color: '#14120f' }}>
                  <span>
                    {isAr
                      ? `عدد الزوار أو النقرات شهرياً : ${monthlyVisitors.toLocaleString('fr-DZ')}`
                      : `Visiteurs / clics mensuels estimés : ${monthlyVisitors.toLocaleString('fr-DZ')}`}
                  </span>
                  <input
                    type="range"
                    min={500}
                    max={30000}
                    step={500}
                    value={monthlyVisitors}
                    onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                    style={{ accentColor: '#14120f', cursor: 'pointer' }}
                  />
                </label>

                <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.88rem', color: '#14120f' }}>
                  <span>
                    {isAr
                      ? `متوسط قيمة العميل أو الطلبية (د.ج) : ${avgDealValue.toLocaleString('fr-DZ')} DA`
                      : `Panier moyen / valeur d’un client (DA) : ${avgDealValue.toLocaleString('fr-DZ')} DA`}
                  </span>
                  <input
                    type="range"
                    min={3000}
                    max={250000}
                    step={1000}
                    value={avgDealValue}
                    onChange={(e) => setAvgDealValue(Number(e.target.value))}
                    style={{ accentColor: '#14120f', cursor: 'pointer' }}
                  />
                </label>

                <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.88rem', color: '#14120f' }}>
                  <span>
                    {isAr
                      ? `مدة تحميل الموقع أو صعوبة الوصول للعرض : ${loadSeconds} ثوانٍ`
                      : `Temps de chargement / friction actuelle : ${loadSeconds} secondes`}
                  </span>
                  <input
                    type="range"
                    min={2}
                    max={12}
                    step={1}
                    value={loadSeconds}
                    onChange={(e) => setLoadSeconds(Number(e.target.value))}
                    style={{ accentColor: '#14120f', cursor: 'pointer' }}
                  />
                </label>

                <div
                  style={{
                    padding: '1.15rem',
                    borderRadius: '0.85rem',
                    background: '#f2ede4',
                    color: '#14120f',
                    border: '1px solid rgba(20, 18, 15, 0.14)',
                    fontSize: '0.86rem',
                    lineHeight: 1.6,
                  }}
                >
                  <strong>{isAr ? 'ملاحظة منهجية :' : 'Note méthodologique :'}</strong>{' '}
                  {isAr
                    ? 'وفق دراسات تجربة المستخدم على الهاتف، يغادر أكثر من 53% من الزوار الصفحة إذا تجاوز التحميل 3 ثوانٍ أو غابت وسيلة التواصل المباشرة.'
                    : 'Selon les études UX mobile, plus de 53 % des visiteurs quittent une page qui met plus de 3 secondes à charger ou ne présente pas d’action claire.'}
                </div>
              </div>

              <aside
                style={{
                  padding: '2rem',
                  borderRadius: '1.15rem',
                  background: '#14120f',
                  color: '#f2ede4',
                  display: 'grid',
                  gap: '1.2rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a69b8b', fontWeight: 700 }}>
                    {isAr ? 'تقدير الفرص الضائعة شهرياً' : 'Estimation mensuelle des pertes'}
                  </span>
                  <div
                    style={{
                      fontFamily: activeFontObj.family,
                      fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                      lineHeight: 1.05,
                      marginTop: '0.45rem',
                      color: '#f2ede4',
                    }}
                  >
                    {lossStats.missedRevenueMonth.toLocaleString('fr-DZ')} DA
                    <small style={{ display: 'block', fontSize: '0.78rem', color: 'rgba(242, 237, 228, 0.65)', fontFamily: 'Jost, sans-serif', marginTop: '0.3rem' }}>
                      {isAr ? 'فرص مبيعات غير مستغلة شهرياً (تقديري)' : 'Potentiel de chiffre d’affaires non capté / mois'}
                    </small>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div style={{ padding: '0.9rem', borderRadius: '0.75rem', border: '1px solid rgba(242,237,228,0.14)' }}>
                    <strong style={{ display: 'block', fontSize: '1.4rem', color: '#f2ede4' }}>
                      -{lossStats.dropPercent}%
                    </strong>
                    <small style={{ color: 'rgba(242,237,228,0.68)', fontSize: '0.75rem' }}>
                      {isAr ? `(${lossStats.lostVisitors} زائر يغادر مبكراً)` : `(${lossStats.lostVisitors} visiteurs perdus / mois)`}
                    </small>
                  </div>
                  <div style={{ padding: '0.9rem', borderRadius: '0.75rem', border: '1px solid rgba(242,237,228,0.14)' }}>
                    <strong style={{ display: 'block', fontSize: '1.4rem', color: '#f2ede4' }}>
                      ~{lossStats.missedLeads}
                    </strong>
                    <small style={{ color: 'rgba(242,237,228,0.68)', fontSize: '0.75rem' }}>
                      {isAr ? 'طلبات تواصل ضائعة شهرياً' : 'Demandes de devis manquées / mois'}
                    </small>
                  </div>
                </div>

                <div style={{ padding: '0.9rem 1rem', borderRadius: '0.75rem', background: 'rgba(242,237,228,0.06)', fontSize: '0.82rem' }}>
                  ⏱ {isAr ? `منذ فتحك لهذه الصفحة (${elapsedSeconds} ثانية)، يقدر الهدر التراكمي بنحو ` : `Depuis votre arrivée sur cette page (${elapsedSeconds}s), l’écart cumulé simulé représente `}
                  <strong style={{ color: '#a69b8b' }}>{lossStats.realtimeLostDA.toLocaleString('fr-DZ')} DA</strong>.
                </div>

                <a
                  href="/#/devis?service=site-web"
                  className="web-quote-submit"
                  style={{ background: '#f2ede4', color: '#14120f', textDecoration: 'none', justifyContent: 'center' }}
                >
                  {isAr ? 'أصلح مسار موقعي الآن ↗' : 'Optimiser mon site & ma conversion ↗'}
                </a>
              </aside>
            </div>
          )}

          {/* CONTENU DE L'OUTIL 03 : AUDIT SEO */}
          {activeTool === 'audit-seo' && (
            <div className="web-quote-grid" role="tabpanel">
              <div
                style={{
                  padding: 'clamp(1.35rem, 2.5vw, 2.2rem)',
                  borderRadius: '1.15rem',
                  background: '#fbf8f2',
                  color: '#14120f',
                  border: '1px solid rgba(20, 18, 15, 0.14)',
                  display: 'grid',
                  gap: '1.25rem',
                }}
              >
                <div className="web-quote-row">
                  <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.84rem', color: '#14120f' }}>
                    <span>{isAr ? 'رابط موقعك الحالي (اختياري)' : 'URL de votre site web (optionnel)'}</span>
                    <input
                      type="url"
                      placeholder="https://..."
                      value={seoUrl}
                      onChange={(e) => setSeoUrl(e.target.value)}
                      style={{
                        minHeight: '3rem',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(20, 18, 15, 0.16)',
                        background: '#ffffff',
                        color: '#14120f',
                      }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.84rem', color: '#14120f' }}>
                    <span>{isAr ? 'مجال النشاط والولايات المستهدفة' : 'Secteur & wilayas ciblées'}</span>
                    <input
                      type="text"
                      placeholder={isAr ? 'مثال: عيادة، عقارات، تجارة في الجزائر...' : 'Ex : Immobilier Alger, E-commerce Algérie...'}
                      value={seoSector}
                      onChange={(e) => setSeoSector(e.target.value)}
                      style={{
                        minHeight: '3rem',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(20, 18, 15, 0.16)',
                        background: '#ffffff',
                        color: '#14120f',
                      }}
                    />
                  </label>
                </div>

                <p style={{ margin: '0.2rem 0', fontWeight: 700, fontSize: '0.95rem', color: '#14120f' }}>
                  {isAr
                    ? 'حدد العناصر المتوفرة حالياً في موقعك لحساب جاهزية SEO :'
                    : 'Cochez les éléments déjà en place sur votre site pour calculer votre score SEO :'}
                </p>

                <div style={{ display: 'grid', gap: '0.55rem' }}>
                  {seoItems.map((item) => {
                    const checked = Boolean(seoChecks[item.id]);
                    return (
                      <label
                        key={item.id}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '0.8rem',
                          padding: '0.8rem 1rem',
                          borderRadius: '0.7rem',
                          border: checked ? '1px solid #14120f' : '1px solid rgba(20, 18, 15, 0.14)',
                          background: checked ? '#14120f' : '#f2ede4',
                          color: checked ? '#f2ede4' : '#14120f',
                          cursor: 'pointer',
                        }}
                      >
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', margin: 0, fontWeight: 600 }}>
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setSeoChecks((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                            }
                            style={{ width: '1.05rem', height: '1.05rem', accentColor: '#a69b8b' }}
                          />
                          {item.title}
                        </span>
                        <small style={{ fontWeight: 700, color: checked ? '#a69b8b' : '#6b6259' }}>+{item.weight}%</small>
                      </label>
                    );
                  })}
                </div>
              </div>

              <aside
                style={{
                  padding: '2rem',
                  borderRadius: '1.15rem',
                  background: '#14120f',
                  color: '#f2ede4',
                  display: 'grid',
                  gap: '1.1rem',
                  alignContent: 'start',
                }}
              >
                <span style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a69b8b', fontWeight: 700 }}>
                  {isAr ? 'مؤشر جاهزية الظهور في جوجل' : 'Indice de visibilité SEO Algérie'}
                </span>
                <div style={{ fontFamily: activeFontObj.family, fontSize: '4.2rem', lineHeight: 1, color: '#f2ede4' }}>
                  {seoScore}%
                </div>
                <p style={{ margin: 0, color: 'rgba(242,237,228,0.76)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                  {seoScore < 60
                    ? isAr
                      ? 'موقعك يفتقد لركائز أساسية تمنعه من الظهور في الصفحات الأولى على جوجل في الجزائر.'
                      : 'Il manque des fondations critiques (pages dédiées par service, balisage ou vitesse mobile) pour ressortir sur Google en Algérie.'
                    : isAr
                      ? 'القاعدة التقنية جيدة! يمكنك الآن التركيز على صفحات الخدمات الكاملة وبناء الثقة لتصدر نتائج البحث.'
                      : 'Vos bases techniques sont saines. L’étape suivante consiste à enrichir vos pages de services et votre maillage local.'}
                </p>

                <a
                  href={buildWhatsAppLink(
                    isAr
                      ? `مرحباً iVISION، أود طلب فحص SEO لموقعي (${seoUrl || 'بدون رابط بعد'}) في مجال (${seoSector || 'غير محدد'}). النتيجة الأولية: ${seoScore}%.`
                      : `Bonjour iVISION, je souhaite demander un audit SEO gratuit pour mon site (${seoUrl || 'à créer'}) dans le secteur (${seoSector || 'à préciser'}). Score checklist : ${seoScore}%.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="web-quote-submit"
                  style={{ background: '#f2ede4', color: '#14120f', textDecoration: 'none', justifyContent: 'center' }}
                >
                  {isAr ? 'اطلب تدقيق SEO مجاني من الفريق ↗' : 'Recevoir mon audit SEO par WhatsApp ↗'}
                </a>
                <a
                  href="/choisir-seo-google-ads-meta-algerie.html"
                  style={{ color: '#a69b8b', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  {isAr ? 'اقرأ الدليل: كيف تختار بين SEO وGoogle Ads؟ ↗' : 'Lire notre guide : choisir entre SEO, Google Ads et Meta Ads ↗'}
                </a>
              </aside>
            </div>
          )}

          {/* CONTENU DE L'OUTIL 04 : SIMULATEUR DE SITE WEB */}
          {activeTool === 'simulateur-web' && (
            <div className="web-quote-grid" role="tabpanel">
              <div
                style={{
                  padding: 'clamp(1.35rem, 2.5vw, 2.2rem)',
                  borderRadius: '1.15rem',
                  background: '#fbf8f2',
                  color: '#14120f',
                  border: '1px solid rgba(20, 18, 15, 0.14)',
                  display: 'grid',
                  gap: '1.35rem',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6b6259',
                    }}
                  >
                    {isAr ? 'مصمم بنية الموقع' : 'Configurateur d’architecture web'}
                  </span>
                  <h3 style={{ margin: '0.3rem 0 0', fontSize: '1.65rem', color: '#14120f' }}>
                    {isAr ? 'ما هو الهدف الأساسي لموقعك القادم؟' : 'Quel est l’objectif principal de votre futur site ?'}
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(11rem, 1fr))', gap: '0.6rem' }}>
                  {[
                    { id: 'vitrine', label: isAr ? 'موقع تعريفي للشركة' : 'Site vitrine & crédibilité' },
                    { id: 'ecommerce', label: isAr ? 'متجر إلكتروني (بيع)' : 'Boutique E-commerce' },
                    { id: 'landing', label: isAr ? 'صفحة هبوط للإعلانات' : 'Landing page Ads' },
                    { id: 'refonte', label: isAr ? 'تجديد موقع حالي' : 'Refonte de site existant' },
                  ].map((item) => {
                    const active = webGoal === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setWebGoal(item.id as typeof webGoal)}
                        style={{
                          padding: '0.85rem 1rem',
                          borderRadius: '0.7rem',
                          border: active ? '1px solid #14120f' : '1px solid rgba(20,18,15,0.15)',
                          background: active ? '#14120f' : '#f2ede4',
                          color: active ? '#f2ede4' : '#14120f',
                          fontWeight: 700,
                          fontSize: '0.86rem',
                          cursor: 'pointer',
                        }}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>

                <div className="web-quote-row">
                  <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.84rem', color: '#14120f' }}>
                    <span>{isAr ? 'الحجم التقديري للصفحات' : 'Volume de pages estimé'}</span>
                    <select
                      value={webPages}
                      onChange={(e) => setWebPages(e.target.value as typeof webPages)}
                      style={{
                        minHeight: '3rem',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(20, 18, 15, 0.16)',
                        background: '#ffffff',
                        color: '#14120f',
                      }}
                    >
                      <option value="1-3">{isAr ? '1 إلى 3 صفحات مركزة' : '1 à 3 pages ciblées'}</option>
                      <option value="4-7">{isAr ? '4 إلى 7 صفحات متكاملة' : '4 à 7 pages structurées'}</option>
                      <option value="8+">{isAr ? '8 صفحات فأكثر / كتالوج' : '8+ pages ou catalogue complet'}</option>
                    </select>
                  </label>
                  <label style={{ display: 'grid', gap: '0.45rem', fontWeight: 700, fontSize: '0.84rem', color: '#14120f' }}>
                    <span>{isAr ? 'اللغات المطلوبة' : 'Langues du site'}</span>
                    <select
                      value={webBilingual ? 'fr-ar' : 'fr'}
                      onChange={(e) => setWebBilingual(e.target.value === 'fr-ar')}
                      style={{
                        minHeight: '3rem',
                        padding: '0.75rem 0.9rem',
                        borderRadius: '0.75rem',
                        border: '1px solid rgba(20, 18, 15, 0.16)',
                        background: '#ffffff',
                        color: '#14120f',
                      }}
                    >
                      <option value="fr-ar">{isAr ? 'ثنائي اللغة (فرنسي + عربي RTL)' : 'Bilingue Français + Arabe (RTL)'}</option>
                      <option value="fr">{isAr ? 'لغة واحدة فقط' : 'Une seule langue (FR)'}</option>
                    </select>
                  </label>
                </div>

                <div>
                  <span style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.55rem', color: '#14120f' }}>
                    {isAr ? 'الوظائف المطلوبة في الموقع :' : 'Fonctionnalités souhaitées :'}
                  </span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                    {[
                      { id: 'whatsapp', label: isAr ? 'ربط واتساب واستمارة ذكية' : 'Conversion WhatsApp & Devis' },
                      { id: 'seo', label: isAr ? 'تهيئة SEO لمحركات البحث' : 'Optimisation SEO Google Algérie' },
                      { id: 'catalog', label: isAr ? 'كتالوج منتجات / طلب سريع' : 'Catalogue produits / Commande COD' },
                      { id: 'pixel', label: isAr ? 'تتبع Meta Pixel & Google Tag' : 'Tracking Meta Pixel & Google Ads' },
                    ].map((feat) => {
                      const active = webFeatures.includes(feat.id);
                      return (
                        <button
                          key={feat.id}
                          type="button"
                          onClick={() => toggleWebFeature(feat.id)}
                          style={{
                            padding: '0.55rem 0.9rem',
                            borderRadius: '999px',
                            border: active ? '1px solid #14120f' : '1px solid rgba(20,18,15,0.18)',
                            background: active ? '#14120f' : '#f2ede4',
                            color: active ? '#f2ede4' : '#14120f',
                            fontSize: '0.8rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                          }}
                        >
                          {active ? '✓ ' : '+ '}
                          {feat.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside
                style={{
                  padding: '2rem',
                  borderRadius: '1.15rem',
                  background: '#14120f',
                  color: '#f2ede4',
                  display: 'grid',
                  gap: '1rem',
                }}
              >
                <span style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a69b8b', fontWeight: 700 }}>
                  {isAr ? 'التوصية المناسبة لمشروعك' : 'Architecture recommandée'}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.5rem', color: '#f2ede4' }}>{webRecommendation.title}</h3>
                <p style={{ margin: 0, color: 'rgba(242,237,228,0.75)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                  {webRecommendation.subtitle}
                </p>

                <div style={{ borderTop: '1px solid rgba(242,237,228,0.14)', paddingTop: '0.9rem' }}>
                  <strong style={{ display: 'block', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#a69b8b', marginBottom: '0.5rem' }}>
                    {isAr ? 'الهيكلة المقترحة :' : 'Structure conseillée :'}
                  </strong>
                  <ul style={{ margin: 0, paddingInlineStart: '1.1rem', display: 'grid', gap: '0.35rem', fontSize: '0.85rem' }}>
                    {webRecommendation.pages.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                    <li>{webBilingual ? (isAr ? 'دعم كامل للغتين FR / AR' : 'Interface bilingue FR / AR (RTL)') : 'Interface FR'}</li>
                  </ul>
                </div>

                <div style={{ fontSize: '0.82rem', color: 'rgba(242,237,228,0.75)' }}>
                  <strong>{isAr ? 'المدة التقديرية :' : 'Délai indicatif :'}</strong> {webRecommendation.timeline}
                </div>

                <a
                  href="/#/devis?service=site-web"
                  className="web-quote-submit"
                  style={{ background: '#f2ede4', color: '#14120f', textDecoration: 'none', justifyContent: 'center' }}
                >
                  {isAr ? 'أرسل هذا التصور لطلب عرض سعر ↗' : 'Demander un devis pour ce site ↗'}
                </a>
              </aside>
            </div>
          )}

          {/* CONTENU DE L'OUTIL 05 : CALCULATEUR DE DEVIS */}
          {activeTool === 'calculateur' && (
            <div className="web-quote-grid" role="tabpanel">
              <div
                style={{
                  padding: 'clamp(1.35rem, 2.5vw, 2.2rem)',
                  borderRadius: '1.15rem',
                  background: '#fbf8f2',
                  color: '#14120f',
                  border: '1px solid rgba(20, 18, 15, 0.14)',
                  display: 'grid',
                  gap: '1.35rem',
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontSize: '0.62rem',
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#6b6259',
                    }}
                  >
                    {isAr ? 'مُجمّع نطاق المشروع' : 'Configurateur de périmètre'}
                  </span>
                  <h3 style={{ margin: '0.3rem 0 0', fontSize: '1.65rem', color: '#14120f' }}>
                    {isAr ? 'اختر الأقطاب التي يحتاجها مشروعك' : 'Sélectionnez les pôles à activer pour votre marque'}
                  </h3>
                </div>

                <div style={{ display: 'grid', gap: '0.7rem' }}>
                  {polesCatalog.map((pole) => {
                    const selected = selectedPoles.includes(pole.id);
                    return (
                      <div
                        key={pole.id}
                        onClick={() => togglePole(pole.id)}
                        style={{
                          padding: '1rem 1.15rem',
                          borderRadius: '0.85rem',
                          border: selected ? '1px solid #14120f' : '1px solid rgba(20,18,15,0.14)',
                          background: selected ? '#14120f' : '#f2ede4',
                          color: selected ? '#f2ede4' : '#14120f',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                          <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', color: selected ? '#a69b8b' : '#6b6259' }}>
                            {pole.tag}
                          </span>
                          <strong style={{ fontSize: '0.78rem', color: selected ? '#a69b8b' : '#6b6259' }}>
                            {selected ? (isAr ? '✓ مضاف' : '✓ Inclus') : isAr ? '+ إضافة' : '+ Ajouter'}
                          </strong>
                        </div>
                        <h4 style={{ margin: '0.25rem 0 0.45rem', fontSize: '1.15rem', color: selected ? '#f2ede4' : '#14120f' }}>
                          {pole.title}
                        </h4>
                        <ul style={{ margin: 0, paddingInlineStart: '1.1rem', fontSize: '0.82rem', color: selected ? 'rgba(242,237,228,0.78)' : '#554d44' }}>
                          {pole.deliverables.map((d) => (
                            <li key={d}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>

                <div>
                  <span style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem', color: '#14120f' }}>
                    {isAr ? 'وتيرة المرافقة المطلوبة :' : 'Rythme d’accompagnement souhaité :'}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.55rem' }}>
                    {[
                      { id: 'launch', label: isAr ? 'إطلاق أولي مركز' : 'Lancement ciblé' },
                      { id: 'growth', label: isAr ? 'نمو شهري مستمر' : 'Croissance mensuelle' },
                      { id: 'scale', label: isAr ? 'مرافقة شاملة 360°' : 'Dispositif 360° intensif' },
                    ].map((item) => {
                      const active = cadence === item.id;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setCadence(item.id as typeof cadence)}
                          style={{
                            padding: '0.75rem 0.6rem',
                            borderRadius: '0.65rem',
                            border: active ? '1px solid #14120f' : '1px solid rgba(20,18,15,0.14)',
                            background: active ? '#14120f' : '#f2ede4',
                            color: active ? '#f2ede4' : '#14120f',
                            fontSize: '0.8rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside
                style={{
                  padding: '2rem',
                  borderRadius: '1.15rem',
                  background: '#14120f',
                  color: '#f2ede4',
                  display: 'grid',
                  gap: '1.1rem',
                  alignContent: 'start',
                }}
              >
                <span style={{ fontSize: '0.64rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#a69b8b', fontWeight: 700 }}>
                  {isAr ? 'ملخص نطاق مشروعك' : 'Synthèse de votre configuration'}
                </span>
                <h3 style={{ margin: 0, fontSize: '1.45rem', color: '#f2ede4' }}>
                  {isAr
                    ? `${activePolesDetails.length} أقطاب مفعلة لمشروعك`
                    : `${activePolesDetails.length} pôle(s) sélectionné(s)`}
                </h3>

                <div style={{ display: 'grid', gap: '0.75rem', borderTop: '1px solid rgba(242,237,228,0.14)', paddingTop: '0.9rem' }}>
                  {activePolesDetails.map((p) => (
                    <div key={p.id}>
                      <strong style={{ display: 'block', fontSize: '0.92rem', color: '#f2ede4' }}>
                        • {p.title}
                      </strong>
                      <small style={{ color: 'rgba(242,237,228,0.68)', fontSize: '0.78rem' }}>
                        {p.deliverables.join(' · ')}
                      </small>
                    </div>
                  ))}
                </div>

                <p style={{ margin: 0, fontSize: '0.82rem', color: 'rgba(242,237,228,0.72)', lineHeight: 1.55 }}>
                  {isAr
                    ? 'يتم تسعير كل مشروع بدقة بعد مراجعة أهدافك مع فريقنا، مع فصل واضح بين أتعاب الوكالة وميزانية الإعلانات الممولة.'
                    : 'Chaque devis est chiffré sur mesure selon votre volume de livrables, en séparant clairement les honoraires d’agence et le budget média payé aux plateformes.'}
                </p>

                <div style={{ display: 'grid', gap: '0.65rem' }}>
                  <a
                    href={selectedPoles.length === 1 && selectedPoles[0] === 'web' ? '/#/devis?service=site-web' : '/#/devis'}
                    className="web-quote-submit"
                    style={{ background: '#f2ede4', color: '#14120f', textDecoration: 'none', justifyContent: 'center' }}
                  >
                    {isAr ? 'أكمل طلب عرض السعر ↗' : 'Valider et chiffrer mon devis ↗'}
                  </a>
                  <a
                    href={buildWhatsAppLink(
                      isAr
                        ? `مرحباً iVISION، قمت بتكوين مشروعي عبر الحاسبة (${activePolesDetails.map((p) => p.title).join(' + ')}) وأرغب في الحصول على عرض سعر مفصل.`
                        : `Bonjour iVISION, j'ai configuré mon projet (${activePolesDetails.map((p) => p.title).join(' + ')}) et je souhaite recevoir un devis détaillé.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '3.1rem',
                      borderRadius: '999px',
                      border: '1px solid rgba(242, 237, 228, 0.28)',
                      color: '#f2ede4',
                      textDecoration: 'none',
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {isAr ? 'إرسال التكوين عبر واتساب ↗' : 'Envoyer cette configuration sur WhatsApp ↗'}
                  </a>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InteractiveToolsPage;
