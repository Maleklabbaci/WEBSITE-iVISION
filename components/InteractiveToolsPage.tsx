import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../lib/translations';
import { updateSEO } from '../lib/seo-utils';

export type ToolKey = 'diagnostic' | 'pertes' | 'audit-seo' | 'simulateur-web' | 'calculateur';

interface InteractiveToolsPageProps {
  initialTool?: string;
  language?: Language;
}

const VALID_TOOLS: ToolKey[] = ['diagnostic', 'pertes', 'audit-seo', 'simulateur-web', 'calculateur'];

const InteractiveToolsPage: React.FC<InteractiveToolsPageProps> = ({
  initialTool = 'diagnostic',
  language = 'fr',
}) => {
  const isAr = language === 'ar';
  const normalizedInitial = (VALID_TOOLS.includes(initialTool as ToolKey) ? initialTool : 'diagnostic') as ToolKey;
  const [activeTool, setActiveTool] = useState<ToolKey>(normalizedInitial);

  useEffect(() => {
    const nextTool = (VALID_TOOLS.includes(initialTool as ToolKey) ? initialTool : 'diagnostic') as ToolKey;
    setActiveTool(nextTool);
  }, [initialTool]);

  useEffect(() => {
    updateSEO({
      title: isAr
        ? 'الأدوات التفاعلية والحاسبات الرقمية | iVISION'
        : 'Outils digitaux, Diagnostic & Simulateurs | iVISION Agency',
      description: isAr
        ? 'قيم حضورك الرقمي، احسب الفرص الضائعة، افحص جاهزية SEO، وصمم موقعك أو عرض السعر مباشرة مع iVISION.'
        : 'Évaluez votre score digital, estimez vos opportunités manquées, auditez vos bases SEO et configurez votre site web ou devis avec iVISION.',
      canonical: 'https://ivision.agency/',
    });
  }, [isAr]);

  const selectTool = (tool: ToolKey) => {
    setActiveTool(tool);
    window.history.replaceState(null, '', `/#/outils?tool=${tool}`);
  };

  // --- TOOL 1: DIAGNOSTIC DIGITAL SCORE ---
  const [diagAnswers, setDiagAnswers] = useState<Record<string, number>>({
    website: 15,
    speed: 10,
    social: 10,
    ads: 5,
    tracking: 5,
    branding: 15,
  });

  const diagQuestions = isAr
    ? [
        {
          id: 'website',
          label: '01 / الموقع الإلكتروني',
          q: 'ما هي وضعية موقعكم الإلكتروني حالياً؟',
          options: [
            { label: 'لا يوجد موقع حالياً (صفحات تواصل فقط)', score: 0 },
            { label: 'موقع قديم أو غير متوافق جيداً مع الهاتف', score: 10 },
            { label: 'موقع واضح وسريع مع مسار تواصل مباشر', score: 20 },
          ],
        },
        {
          id: 'speed',
          label: '02 / تجربة الهاتف والسرعة',
          q: 'كيف يقيم الزوار سهولة التصفح وطلب الخدمة من الهاتف؟',
          options: [
            { label: 'صعب أو يتطلب خطوات كثيرة', score: 0 },
            { label: 'مقبول لكن يحتاج لتوضيح العرض', score: 10 },
            { label: 'سريع جداً وزر التواصل واضح من أول ثانية', score: 16 },
          ],
        },
        {
          id: 'social',
          label: '03 / صناعة المحتوى والشبكات',
          q: 'ما هي وتيرة وجودة النشر على إنستغرام، فيسبوك أو تيك توك؟',
          options: [
            { label: 'نشر غير منتظم بدون خط تحريري', score: 0 },
            { label: 'نشر منتظم بتصاميم أساسية', score: 10 },
            { label: 'هوية بصرية قوية، فيديوهات Reels ومحتوى يقنع العميل', score: 18 },
          ],
        },
        {
          id: 'ads',
          label: '04 / الحملات الإعلانية (Meta & Google Ads)',
          q: 'كيف تديرون الإعلانات الممولة لجلب العملاء؟',
          options: [
            { label: 'لا نطلق حملات أو نكتفي بـ Boost عشوائي', score: 0 },
            { label: 'حملات موسمية عند الحاجة', score: 10 },
            { label: 'حملات مهيكلة مرتبطة بصفحة هبوط وهدف واضح', score: 16 },
          ],
        },
        {
          id: 'tracking',
          label: '05 / قياس التحويلات والطلبات',
          q: 'هل تعرفون بدقة أي قناة تجلب لكم أفضل الطلبات والمبيعات؟',
          options: [
            { label: 'لا يوجد تتبع واضح للمصادر', score: 0 },
            { label: 'نتابع الرسائل يدوياً فقط', score: 7 },
            { label: 'Pixel وتتبع واضح للطلبات وتكلفة كل عميل', score: 15 },
          ],
        },
        {
          id: 'branding',
          label: '06 / وضوح العرض والهوية',
          q: 'هل يفهم الزائر الجديد ما يميزكم في أقل من 5 ثوانٍ؟',
          options: [
            { label: 'العرض عام ويحتاج إلى شرح طويل', score: 3 },
            { label: 'واضح نسبياً لعملائنا المعتادين', score: 9 },
            { label: 'تموقع قوي وهوية احترافية تمنح الثقة فوراً', score: 15 },
          ],
        },
      ]
    : [
        {
          id: 'website',
          label: '01 / PRÉSENCE WEB',
          q: 'Quel est l’état actuel de votre site internet ?',
          options: [
            { label: 'Aucun site web (réseaux sociaux uniquement)', score: 0 },
            { label: 'Site ancien ou peu adapté au mobile', score: 10 },
            { label: 'Site moderne, rapide avec parcours de contact clair', score: 20 },
          ],
        },
        {
          id: 'speed',
          label: '02 / EXPÉRIENCE MOBILE',
          q: 'Un prospect sur smartphone comprend-il votre offre en 5 secondes ?',
          options: [
            { label: 'Non, parcours lent ou confus', score: 0 },
            { label: 'Correct mais manque d’appels à l’action clairs', score: 10 },
            { label: 'Fluide, lisible et orienté prise de contact immédiate', score: 16 },
          ],
        },
        {
          id: 'social',
          label: '03 / CONTENU & SOCIAL MEDIA',
          q: 'Quelle est la régularité et la qualité de vos contenus (Reels, posts) ?',
          options: [
            { label: 'Publications irrégulières sans ligne éditoriale', score: 0 },
            { label: 'Présence régulière mais visuels standards', score: 10 },
            { label: 'Direction artistique forte, vidéos courtes et preuves concrètes', score: 18 },
          ],
        },
        {
          id: 'ads',
          label: '04 / ACQUISITION META & GOOGLE ADS',
          q: 'Comment gérez-vous vos campagnes publicitaires en Algérie ?',
          options: [
            { label: 'Aucune campagne ou simples boosts de publications', score: 0 },
            { label: 'Campagnes ponctuelles selon la saison', score: 10 },
            { label: 'Campagnes structurées reliées à une page d’atterrissage dédiée', score: 16 },
          ],
        },
        {
          id: 'tracking',
          label: '05 / SUIVI & MESURE',
          q: 'Savez-vous exactement quel canal génère vos demandes qualifiées ?',
          options: [
            { label: 'Aucun suivi précis (Pixel / Analytics absents)', score: 0 },
            { label: 'Suivi manuel des messages WhatsApp / DM', score: 7 },
            { label: 'Tracking configuré et lecture claire du coût par demande', score: 15 },
          ],
        },
        {
          id: 'branding',
          label: '06 / POSITIONNEMENT & MARQUE',
          q: 'Votre image de marque reflète-t-elle le vrai niveau de votre entreprise ?',
          options: [
            { label: 'Identité vieillissante ou incohérente selon les supports', score: 3 },
            { label: 'Propre mais ressemble aux concurrents du secteur', score: 9 },
            { label: 'Identité distinctive qui inspire confiance immédiatement', score: 15 },
          ],
        },
      ];

  const diagScore = useMemo(
    () => (Object.values(diagAnswers) as number[]).reduce((sum, val) => sum + val, 0),
    [diagAnswers]
  );

  const diagLevel = useMemo(() => {
    if (diagScore < 40) {
      return isAr
        ? {
            badge: 'أولوية قصوى للتحسين',
            title: 'حضور رقمي غير مستغل بالكامل',
            desc: 'تفقدون حالياً جزءاً كبيراً من العملاء لصالح المنافسين. الأولوية هي بناء صفحة ويب واضحة وهيكلة رسائلكم الأساسية.',
          }
        : {
            badge: 'Fondations à bâtir',
            title: 'Potentiel digital sous-exploité',
            desc: 'Vos prospects peinent à comprendre votre offre ou à vous trouver sur Google. Priorité : poser un site clair et une ligne éditoriale crédible.',
          };
    }
    if (diagScore < 75) {
      return isAr
        ? {
            badge: 'أساس جيد قابل للتسريع',
            title: 'حضور نشط يحتاج إلى ربط القنوات',
            desc: 'لديكم تواجد أولي، لكن ربط المحتوى بصفحات هبوط وحملات ميتا/جوجل مدروسة سيضاعف عدد الطلبات المؤهلة.',
          }
        : {
            badge: 'Socle en place · Accélération',
            title: 'Présence active mais conversion perfectible',
            desc: 'Vous avez déjà une base. En reliant vos contenus, vos publicités et un parcours web plus net, vous pouvez capter beaucoup plus de demandes qualifiées.',
          };
    }
    return isAr
      ? {
          badge: 'نضج رقمي متقدم',
          title: 'بنية رقمية قوية جاهزة للتوسع',
          desc: 'أساسكم متين. الخطوة القادمة هي تحسين تكلفة الاستحواذ، تطوير محتوى إبداعي عالي التأثير وتوسيع حصتكم في السوق.',
        }
      : {
          badge: 'Maturité avancée',
          title: 'Écosystème solide prêt à passer à l’échelle',
          desc: 'Vos fondamentaux sont bons. L’enjeu maintenant : affiner le coût par acquisition, élever la direction artistique et dominer vos requêtes clés.',
        };
  }, [diagScore, isAr]);

  // --- TOOL 2: COMPTEUR / SIMULATEUR DE PERTES ---
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(1500);
  const [avgDealValue, setAvgDealValue] = useState<number>(25000);
  const [loadSeconds, setLoadSeconds] = useState<number>(6);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setElapsedSeconds((prev) => prev + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const lossStats = useMemo(() => {
    // Plus le chargement dépasse 2s, plus la perte de visiteurs grimpe (jusqu'à 58%)
    const dropRate = Math.min(0.62, Math.max(0.12, (loadSeconds - 1.5) * 0.095));
    const lostVisitors = Math.round(monthlyVisitors * dropRate);
    // Taux de conversion réaliste de 3.2% sur les visiteurs retenus avec un bon parcours
    const missedLeads = Math.max(1, Math.round(lostVisitors * 0.032));
    // Taux de closing moyen de 25% sur les leads qualifiés
    const missedClients = Math.max(1, Math.round(missedLeads * 0.25));
    const missedRevenueMonth = missedClients * avgDealValue;
    const realtimeLostDA = Math.round((missedRevenueMonth / (30 * 24 * 3600)) * elapsedSeconds * 120);
    return {
      dropPercent: Math.round(dropRate * 100),
      lostVisitors,
      missedLeads,
      missedClients,
      missedRevenueMonth,
      realtimeLostDA,
    };
  }, [monthlyVisitors, avgDealValue, loadSeconds, elapsedSeconds]);

  // --- TOOL 3: AUDIT SEO GRATUIT ---
  const [seoUrl, setSeoUrl] = useState('');
  const [seoSector, setSeoSector] = useState('');
  const [seoChecks, setSeoChecks] = useState<Record<string, boolean>>({
    https: true,
    mobile: true,
    servicePages: false,
    gmb: true,
    speed: false,
    bilingual: false,
    schema: false,
    cta: true,
  });

  const seoItems = isAr
    ? [
        { id: 'https', title: 'اتصال آمن HTTPS ونطاق احترافي', weight: 12 },
        { id: 'mobile', title: 'توافق كامل وسريع مع شاشات الهاتف', weight: 15 },
        { id: 'servicePages', title: 'صفحات مستقلة لكل خدمة (وليس صفحة واحدة فقط)', weight: 16 },
        { id: 'gmb', title: 'بطاقة Google Maps (Google Business) مفعلة ومحدثة', weight: 12 },
        { id: 'speed', title: 'سرعة فتح الصفحة أقل من 3 ثوانٍ', weight: 13 },
        { id: 'bilingual', title: 'محتوى واضح يغطي البحث بالفرنسية والعربية في الجزائر', weight: 12 },
        { id: 'schema', title: 'عناوين H1 ووصف Meta وبيانات منظمة لمحركات البحث', weight: 10 },
        { id: 'cta', title: 'استمارة طلب عرض سعر أو واتساب واضح في كل صفحة', weight: 10 },
      ]
    : [
        { id: 'https', title: 'Certificat HTTPS actif & nom de domaine propre', weight: 12 },
        { id: 'mobile', title: 'Affichage mobile-first irréprochable sur smartphone', weight: 15 },
        { id: 'servicePages', title: 'Pages HTML dédiées par service (et non une seule page vague)', weight: 16 },
        { id: 'gmb', title: 'Fiche Google Business Profile (Maps) active et renseignée', weight: 12 },
        { id: 'speed', title: 'Temps de chargement initial inférieur à 3 secondes', weight: 13 },
        { id: 'bilingual', title: 'Contenu adapté aux recherches locales en Algérie (FR / AR)', weight: 12 },
        { id: 'schema', title: 'Balises Title, H1 uniques et données structurées JSON-LD', weight: 10 },
        { id: 'cta', title: 'Parcours de conversion clair (Devis / WhatsApp) sur chaque page', weight: 10 },
      ];

  const seoScore = useMemo(
    () => seoItems.reduce((acc, item) => acc + (seoChecks[item.id] ? item.weight : 0), 0),
    [seoChecks, seoItems]
  );

  // --- TOOL 4: SIMULATEUR DE SITE WEB ---
  const [webGoal, setWebGoal] = useState<'vitrine' | 'ecommerce' | 'landing' | 'refonte'>('vitrine');
  const [webPages, setWebPages] = useState<'1-3' | '4-7' | '8+'>('4-7');
  const [webBilingual, setWebBilingual] = useState<boolean>(true);
  const [webFeatures, setWebFeatures] = useState<string[]>(['whatsapp', 'seo']);

  const toggleWebFeature = (feat: string) => {
    setWebFeatures((prev) => (prev.includes(feat) ? prev.filter((item) => item !== feat) : [...prev, feat]));
  };

  const webRecommendation = useMemo(() => {
    const map = {
      vitrine: {
        fr: {
          title: 'Site Vitrine Éditorial & Acquisition',
          subtitle: 'Idéal pour présenter votre entreprise, asseoir votre crédibilité et recevoir des demandes qualifiées.',
          pages: ['Accueil impactant', 'Pages Services dédiées', 'Réalisations / Preuves', 'À propos', 'Formulaire Devis & WhatsApp'],
          timeline: '2 à 4 semaines selon contenus',
        },
        ar: {
          title: 'موقع تعريفي احترافي لجلب العملاء',
          subtitle: 'مثالي لتقديم مؤسستك، بناء الثقة وتحويل الزوار إلى طلبات تواصل مؤهلة.',
          pages: ['صفحة رئيسية قوية', 'صفحات مستقلة للخدمات', 'معرض الأعمال والخبرات', 'من نحن', 'استمارة عرض سعر وواتساب'],
          timeline: 'من أسبوعين إلى 4 أسابيع حسب المحتوى',
        },
      },
      ecommerce: {
        fr: {
          title: 'Boutique E-Commerce Algérie',
          subtitle: 'Conçue pour présenter vos collections, gérer le catalogue et fluidifier les commandes sur mobile.',
          pages: ['Accueil & Collections', 'Catalogue filtrable', 'Fiches produits détaillées', 'Panier & Commande rapide (COD / Livraison)', 'Suivi & WhatsApp'],
          timeline: '3 à 6 semaines selon catalogue',
        },
        ar: {
          title: 'متجر إلكتروني متكامل للسوق الجزائري',
          subtitle: 'مصمم لعرض منتجاتك بوضوح وتسهيل الطلب عبر الهاتف مع خيارات التوصيل والدفع.',
          pages: ['الرئيسية والمجموعات', 'كتالوج المنتجات مع الفلترة', 'صفحات تفاصيل المنتج', 'سلة ومسار طلب سريع', 'ربط واتساب والطلبيات'],
          timeline: 'من 3 إلى 6 أسابيع حسب حجم الكتالوج',
        },
      },
      landing: {
        fr: {
          title: 'Landing Page Haute Conversion (Meta & Google Ads)',
          subtitle: 'Une page ultra-ciblée pensée pour rentabiliser immédiatement vos campagnes sponsorisées.',
          pages: ['Promesse & Hero direct', 'Arguments & Preuves visuelles', 'FAQ anti-objections', 'Formulaire court & Tracking Pixel'],
          timeline: '7 à 12 jours ouvrés',
        },
        ar: {
          title: 'صفحة هبوط عالية التحويل لحملات الإعلانات',
          subtitle: 'صفحة مركزة على عرض واحد لتحويل زيارات إعلانات ميتا وجوجل إلى طلبات فعلية.',
          pages: ['عنوان وعرض مباشر', 'مزايا وإثباتات بصرية', 'أسئلة شائعة لإزالة التردد', 'استمارة سريعة مع تتبع Pixel'],
          timeline: 'من 7 إلى 12 يوم عمل',
        },
      },
      refonte: {
        fr: {
          title: 'Refonte Complète & Modernisation SEO',
          subtitle: 'Repensez l’image, la vitesse mobile et la structure Google de votre site actuel sans perdre votre historique.',
          pages: ['Audit de l’existant', 'Nouvelle direction artistique', 'Réécriture & Architecture SEO', 'Redirections & Mise en ligne propre'],
          timeline: '3 à 5 semaines selon périmètre',
        },
        ar: {
          title: 'تجديد شامل وتحديث تقني وSEO للموقع',
          subtitle: 'إعادة تصميم موقعك الحالي لتسريعه على الهاتف وتحسين ظهوره في جوجل مع الحفاظ على روابطك.',
          pages: ['فحص الموقع الحالي', 'هوية بصرية وتجربة مستخدم جديدة', 'إعادة هيكلة الصفحات لـ SEO', 'نشر آمن وتحويل الروابط'],
          timeline: 'من 3 إلى 5 أسابيع حسب النطاق',
        },
      },
    };
    return isAr ? map[webGoal].ar : map[webGoal].fr;
  }, [webGoal, isAr]);

  // --- TOOL 5: CALCULATEUR DE DEVIS & PÉRIMÈTRE ---
  const [selectedPoles, setSelectedPoles] = useState<string[]>(['web', 'ads']);
  const [cadence, setCadence] = useState<'launch' | 'growth' | 'scale'>('growth');

  const togglePole = (poleId: string) => {
    setSelectedPoles((prev) => (prev.includes(poleId) ? (prev.length > 1 ? prev.filter((p) => p !== poleId) : prev) : [...prev, poleId]));
  };

  const polesCatalog = isAr
    ? [
        {
          id: 'web',
          title: 'إنشاء أو تجديد موقع ويب',
          tag: 'WEB & CONVERSION',
          deliverables: ['تصميم متجاوب للهاتف والحاسوب', 'هيكلة صفحات واضحة ومسار تواصل', 'تهيئة SEO تقنية أولية'],
        },
        {
          id: 'social',
          title: 'صناعة المحتوى وشبكات التواصل',
          tag: 'CONTENT & SOCIAL',
          deliverables: ['خط تحريري ورزنامة نشر', 'تصاميم احترافية وفيديوهات Reels', 'توجيه فني منسجم مع العلامة'],
        },
        {
          id: 'ads',
          title: 'حملات الإعلانات Meta & Google Ads',
          tag: 'ACQUISITION & LEADS',
          deliverables: ['إعداد وهيكلة الحملات الإعلانية', 'تصاميم ونصوص مخصصة للإعلانات', 'تتبع التحويلات وتقارير الأداء'],
        },
        {
          id: 'branding',
          title: 'الهوية البصرية والتموقع',
          tag: 'BRANDING & DESIGN',
          deliverables: ['الشعار والخطوط والألوان', 'دليل استخدام الهوية البصرية', 'قوالب جاهزة للعرض والتواصل'],
        },
      ]
    : [
        {
          id: 'web',
          title: 'Création ou refonte de site web',
          tag: 'WEB & CONVERSION',
          deliverables: ['Design éditorial mobile-first', 'Architecture de pages & formulaire devis', 'Fondations techniques SEO & vitesse'],
        },
        {
          id: 'social',
          title: 'Création de contenu & Social Media',
          tag: 'CONTENT & SOCIAL',
          deliverables: ['Ligne éditoriale & planning de publication', 'Visuels de marque & vidéos courtes (Reels)', 'Direction artistique cohérente'],
        },
        {
          id: 'ads',
          title: 'Publicité Meta Ads & Google Ads',
          tag: 'ACQUISITION & LEADS',
          deliverables: ['Cadrage des audiences & structure de campagne', 'Créas publicitaires & copywriting', 'Suivi des conversions & bilan de performance'],
        },
        {
          id: 'branding',
          title: 'Identité visuelle & Branding',
          tag: 'BRANDING & DESIGN',
          deliverables: ['Logotype, typographies & palette', 'Charte graphique & univers visuel', 'Déclinaisons réseaux sociaux & supports'],
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

  return (
    <section className="web-quote" aria-labelledby="tools-page-title">
      <div className="web-quote-shell">
        <div className="web-quote-topline">
          <span>{isAr ? 'iVISION / الأدوات التفاعلية' : 'iVISION / Outils & Simulateurs'}</span>
          <a href="/">{isAr ? '→ العودة إلى الرئيسية' : '← Retour à l’accueil'}</a>
        </div>

        <div style={{ marginBottom: '2.4rem' }}>
          <p className="web-quote-eyebrow">
            {isAr ? 'أدوات مجانية لاتخاذ القرار' : 'Atelier digital interactif · Algérie'}
          </p>
          <h1
            id="tools-page-title"
            style={{
              margin: '0 0 1rem',
              fontSize: 'clamp(2.4rem, 5.2vw, 5.2rem)',
              lineHeight: 0.96,
              textTransform: 'uppercase',
            }}
          >
            {isAr ? (
              <>
                شخّص حضورك الرقمي <span style={{ color: '#a69b8b' }}>بدقة.</span>
              </>
            ) : (
              <>
                Pilotez votre projet <span style={{ color: '#a69b8b' }}>en données réelles.</span>
              </>
            )}
          </h1>
          <p className="web-quote-lead" style={{ maxWidth: '46rem' }}>
            {isAr
              ? 'خمس أدوات تفاعلية صممتها iVISION لمساعدة المؤسسات في الجزائر على تقييم حضورها الرقمي، تقدير الفرص الضائعة، وتحديد نطاق موقعها أو حملاتها قبل الانطلاق.'
              : 'Cinq outils interactifs conçus par iVISION pour évaluer votre maturité digitale, mesurer l’impact d’un site lent, vérifier vos fondamentaux SEO et cadrer votre projet avant de demander un devis.'}
          </p>
        </div>

        {/* BARRE DE SÉLECTION DES 5 OUTILS */}
        <div
          role="tablist"
          aria-label={isAr ? 'الأدوات التفاعلية' : 'Outils interactifs'}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(12.5rem, 1fr))',
            gap: '0.65rem',
            marginBottom: '2.5rem',
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
                  textAlign: isAr ? 'right' : 'left',
                  padding: '1rem 1.15rem',
                  borderRadius: '0.85rem',
                  border: active ? '1px solid #14120f' : '1px solid rgba(20, 18, 15, 0.14)',
                  background: active ? '#14120f' : '#fbf8f2',
                  color: active ? '#f2ede4' : '#14120f',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontSize: '0.62rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    color: active ? '#a69b8b' : 'rgba(20, 18, 15, 0.5)',
                    marginBottom: '0.35rem',
                  }}
                >
                  {tab.num} / OUTIL
                </span>
                <strong style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700 }}>
                  {tab.label}
                </strong>
                <small
                  style={{
                    display: 'block',
                    marginTop: '0.2rem',
                    fontSize: '0.74rem',
                    color: active ? 'rgba(242, 237, 228, 0.72)' : 'rgba(20, 18, 15, 0.6)',
                  }}
                >
                  {tab.short}
                </small>
              </button>
            );
          })}
        </div>

        {/* CONTENU DE L'OUTIL ACTIF */}
        {activeTool === 'diagnostic' && (
          <div className="web-quote-grid" role="tabpanel">
            <div className="web-quote-form" style={{ display: 'grid', gap: '1.35rem' }}>
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
                      color: '#6f6559',
                      marginBottom: '0.35rem',
                    }}
                  >
                    {item.label}
                  </span>
                  <p style={{ margin: '0 0 0.75rem', fontWeight: 700, fontSize: '1rem' }}>
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
                            padding: '0.75rem 0.95rem',
                            borderRadius: '0.65rem',
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
                          <b style={{ fontSize: '0.75rem', color: selected ? '#a69b8b' : '#6f6559' }}>
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
                borderRadius: '1.1rem',
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
                  fontFamily: "'Bodoni Moda', Georgia, serif",
                  fontSize: 'clamp(3.4rem, 6vw, 5.2rem)',
                  lineHeight: 1,
                  margin: '1.1rem 0 0.4rem',
                }}
              >
                {diagScore}
                <span style={{ fontSize: '1.4rem', color: '#a69b8b' }}>/100</span>
              </div>
              <h2 style={{ margin: '0 0 0.75rem', fontSize: '1.45rem', color: '#f2ede4' }}>
                {diagLevel.title}
              </h2>
              <p style={{ margin: '0 0 1.5rem', color: 'rgba(242, 237, 228, 0.75)', lineHeight: 1.65, fontSize: '0.92rem' }}>
                {diagLevel.desc}
              </p>

              <div style={{ display: 'grid', gap: '0.65rem' }}>
                <a
                  href="/#/devis"
                  className="web-quote-submit"
                  style={{
                    background: '#f2ede4',
                    color: '#14120f',
                    textDecoration: 'none',
                    justifyContent: 'center',
                  }}
                >
                  {isAr ? 'اطلب خطة عمل مخصصة ↗' : 'Demander mon plan d’action ↗'}
                </a>
                <a
                  href={buildWhatsAppLink(
                    isAr
                      ? `مرحباً iVISION، أجريت التشخيص الرقمي وحصلت على ${diagScore}/100. أود مناقشة خطة تطوير لمشروعي.`
                      : `Bonjour iVISION, j'ai réalisé le Diagnostic Digital Score (${diagScore}/100) et je souhaite discuter des priorités pour mon entreprise.`
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
                  {isAr ? 'إرسال النتيجة عبر واتساب ↗' : 'Envoyer mon score sur WhatsApp ↗'}
                </a>
              </div>
            </aside>
          </div>
        )}

        {activeTool === 'pertes' && (
          <div className="web-quote-grid" role="tabpanel">
            <div className="web-quote-form" style={{ display: 'grid', gap: '1.5rem' }}>
              <div>
                <span className="web-quote-eyebrow">
                  {isAr ? 'محاكاة الأثر التجاري' : 'Simulateur de friction & vitesse'}
                </span>
                <h2 style={{ margin: '0.3rem 0 0.6rem', fontSize: '1.75rem' }}>
                  {isAr
                    ? 'كم يكلفك الموقع البطيء أو غياب مسار التحويل؟'
                    : 'Combien vous coûte un site lent ou absent chaque mois ?'}
                </h2>
                <p style={{ margin: 0, color: 'rgba(20, 18, 15, 0.68)', fontSize: '0.92rem' }}>
                  {isAr
                    ? 'حرك المؤشرات الثلاثة لتقدير عدد الزوار والطلبات التي تضيع قبل أن يتواصل العميل معك.'
                    : 'Ajustez les 3 curseurs selon votre activité en Algérie pour estimer les visiteurs et demandes perdus avant même le premier contact.'}
                </p>
              </div>

              <label>
                <span>
                  {isAr
                    ? `عدد الزوار أو المهتمين شهرياً : ${monthlyVisitors.toLocaleString('fr-DZ')}`
                    : `Visiteurs / prospects mensuels estimés : ${monthlyVisitors.toLocaleString('fr-DZ')}`}
                </span>
                <input
                  type="range"
                  min={300}
                  max={15000}
                  step={100}
                  value={monthlyVisitors}
                  onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                />
              </label>

              <label>
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
                />
              </label>

              <label>
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
                />
              </label>

              <div
                style={{
                  padding: '1.15rem',
                  borderRadius: '0.85rem',
                  background: '#f2ede4',
                  border: '1px solid rgba(20, 18, 15, 0.12)',
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
                borderRadius: '1.1rem',
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
                    fontFamily: "'Bodoni Moda', Georgia, serif",
                    fontSize: 'clamp(2.2rem, 4.2vw, 3.4rem)',
                    lineHeight: 1.05,
                    marginTop: '0.45rem',
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

        {activeTool === 'audit-seo' && (
          <div className="web-quote-grid" role="tabpanel">
            <div className="web-quote-form" style={{ display: 'grid', gap: '1.25rem' }}>
              <div className="web-quote-row">
                <label>
                  <span>{isAr ? 'رابط موقعك الحالي (اختياري)' : 'URL de votre site web (optionnel)'}</span>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={seoUrl}
                    onChange={(e) => setSeoUrl(e.target.value)}
                  />
                </label>
                <label>
                  <span>{isAr ? 'مجال النشاط والولايات المستهدفة' : 'Secteur & wilayas ciblées'}</span>
                  <input
                    type="text"
                    placeholder={isAr ? 'مثال: عيادة، عقارات، تجارة في الجزائر...' : 'Ex : Immobilier Alger, E-commerce Algérie...'}
                    value={seoSector}
                    onChange={(e) => setSeoSector(e.target.value)}
                  />
                </label>
              </div>

              <p style={{ margin: '0.2rem 0', fontWeight: 700, fontSize: '0.95rem' }}>
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
                        background: checked ? '#f2ede4' : '#ffffff',
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
                          style={{ width: '1.05rem', height: '1.05rem' }}
                        />
                        {item.title}
                      </span>
                      <small style={{ fontWeight: 700, color: '#6f6559' }}>+{item.weight}%</small>
                    </label>
                  );
                })}
              </div>
            </div>

            <aside
              style={{
                padding: '2rem',
                borderRadius: '1.1rem',
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
              <div style={{ fontFamily: "'Bodoni Moda', Georgia, serif", fontSize: '4.2rem', lineHeight: 1 }}>
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

        {activeTool === 'simulateur-web' && (
          <div className="web-quote-grid" role="tabpanel">
            <div className="web-quote-form" style={{ display: 'grid', gap: '1.35rem' }}>
              <div>
                <span className="web-quote-eyebrow">
                  {isAr ? 'مصمم بنية الموقع' : 'Configurateur d’architecture web'}
                </span>
                <h2 style={{ margin: '0.3rem 0 0', fontSize: '1.65rem' }}>
                  {isAr ? 'ما هو الهدف الأساسي لموقعك القادم؟' : 'Quel est l’objectif principal de votre futur site ?'}
                </h2>
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
                <label>
                  <span>{isAr ? 'الحجم التقديري للصفحات' : 'Volume de pages estimé'}</span>
                  <select value={webPages} onChange={(e) => setWebPages(e.target.value as typeof webPages)}>
                    <option value="1-3">{isAr ? '1 إلى 3 صفحات مركزة' : '1 à 3 pages ciblées'}</option>
                    <option value="4-7">{isAr ? '4 إلى 7 صفحات متكاملة' : '4 à 7 pages structurées'}</option>
                    <option value="8+">{isAr ? '8 صفحات فأكثر / كتالوج' : '8+ pages ou catalogue complet'}</option>
                  </select>
                </label>
                <label>
                  <span>{isAr ? 'اللغات المطلوبة' : 'Langues du site'}</span>
                  <select
                    value={webBilingual ? 'fr-ar' : 'fr'}
                    onChange={(e) => setWebBilingual(e.target.value === 'fr-ar')}
                  >
                    <option value="fr-ar">{isAr ? 'ثنائي اللغة (فرنسي + عربي RTL)' : 'Bilingue Français + Arabe (RTL)'}</option>
                    <option value="fr">{isAr ? 'لغة واحدة فقط' : 'Une seule langue (FR)'}</option>
                  </select>
                </label>
              </div>

              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.55rem' }}>
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
                          background: active ? '#14120f' : 'transparent',
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
                borderRadius: '1.1rem',
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

        {activeTool === 'calculateur' && (
          <div className="web-quote-grid" role="tabpanel">
            <div className="web-quote-form" style={{ display: 'grid', gap: '1.35rem' }}>
              <div>
                <span className="web-quote-eyebrow">
                  {isAr ? 'مُجمّع نطاق المشروع' : 'Configurateur de périmètre'}
                </span>
                <h2 style={{ margin: '0.3rem 0 0', fontSize: '1.65rem' }}>
                  {isAr ? 'اختر الأقطاب التي يحتاجها مشروعك' : 'Sélectionnez les pôles à activer pour votre marque'}
                </h2>
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
                        background: selected ? '#f2ede4' : '#ffffff',
                        cursor: 'pointer',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                        <span style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.14em', color: '#6f6559' }}>
                          {pole.tag}
                        </span>
                        <strong style={{ fontSize: '0.78rem', color: selected ? '#14120f' : '#6f6559' }}>
                          {selected ? (isAr ? '✓ مضاف' : '✓ Inclus') : isAr ? '+ إضافة' : '+ Ajouter'}
                        </strong>
                      </div>
                      <h3 style={{ margin: '0.25rem 0 0.45rem', fontSize: '1.15rem' }}>{pole.title}</h3>
                      <ul style={{ margin: 0, paddingInlineStart: '1.1rem', fontSize: '0.82rem', color: 'rgba(20,18,15,0.72)' }}>
                        {pole.deliverables.map((d) => (
                          <li key={d}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <div>
                <span style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
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
                borderRadius: '1.1rem',
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
  );
};

export default InteractiveToolsPage;
