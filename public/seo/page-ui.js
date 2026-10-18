(() => {
  const STORAGE_KEY = 'ivision-lang-selected';
  const originalHtml = new WeakMap();
  const originalAttrs = new WeakMap();
  const trackedElements = new Set();

  const track = (el) => {
    if (el) trackedElements.add(el);
    return el;
  };

  const rememberAndSetHtml = (el, arHtml) => {
    if (!el || arHtml == null) return;
    if (!originalHtml.has(el)) {
      originalHtml.set(el, el.innerHTML);
    }
    el.innerHTML = arHtml;
  };

  const rememberAndSetAttr = (el, attr, arValue) => {
    if (!el || !attr || arValue == null) return;
    let map = originalAttrs.get(el);
    if (!map) {
      map = {};
      originalAttrs.set(el, map);
    }
    if (!(attr in map)) {
      map[attr] = el.getAttribute(attr);
    }
    el.setAttribute(attr, arValue);
  };

  const setHtml = (root, selector, arHtml) => {
    const el = track(root.querySelector(selector));
    if (el) rememberAndSetHtml(el, arHtml);
  };

  const setAllHtml = (root, selector, arHtmlList) => {
    const nodes = root.querySelectorAll(selector);
    nodes.forEach((el, index) => {
      if (arHtmlList[index] != null) {
        track(el);
        rememberAndSetHtml(el, arHtmlList[index]);
      }
    });
  };

  const restoreFrench = () => {
    trackedElements.forEach((el) => {
      if (originalHtml.has(el)) {
        el.innerHTML = originalHtml.get(el);
      }
      if (originalAttrs.has(el)) {
        const attrs = originalAttrs.get(el);
        Object.keys(attrs).forEach((attr) => {
          if (attrs[attr] == null) el.removeAttribute(attr);
          else el.setAttribute(attr, attrs[attr]);
        });
      }
    });
  };

  const sharedNavAr = {
    'nav.home': 'الرئيسية',
    'nav.about': 'من نحن',
    'nav.portfolio': 'المعرض',
    'nav.work': 'معرض المواقع',
    'nav.social': 'معرض التواصل',
    'nav.services': 'خدماتنا',
    'nav.marketing': 'التسويق الرقمي',
    'nav.content': 'صناعة المحتوى',
    'nav.ads': 'إعلانات Ads',
    'nav.web': 'مواقع الويب',
    'cta.project': 'لنتحدث عن مشروعي',
    'cta.site': 'لنتحدث عن موقعي',
    'cta.audit': 'تدقيق مجاني',
    'crumb.home': '→ الرئيسية',
  };

  const exactTextMapAr = {
    'Aller au contenu': 'انتقل إلى المحتوى',
    'Accueil': 'الرئيسية',
    '← Accueil': '→ الرئيسية',
    'Marketing digital en Algérie': 'التسويق الرقمي في الجزائر',
    'Marketing digital': 'التسويق الرقمي',
    'Création de contenu': 'صناعة المحتوى',
    'Publicité Meta & Google Ads': 'إعلانات ميتا وجوجل',
    'Publicité Ads': 'إعلانات Ads',
    'Création de sites web': 'إنشاء مواقع الويب',
    'Sites web': 'مواقع الويب',
    'Contenu': 'المحتوى',
    'Portfolio': 'معرض الأعمال',
    'Portfolio sites web': 'معرض مواقع الويب',
    'Portfolio social media': 'معرض التواصل الاجتماعي',
    'Choisir SEO ou Ads': 'اختيار SEO أو Ads',
    'Expertises': 'الخبرات',
    'Méthode': 'المنهجية',
    'Projets': 'المشاريع',
    'Questions': 'الأسئلة',
    'Livrables': 'المخرجات',
    'Exemple': 'مثال تطبيقي',
    'Canaux': 'القنوات',
    'Quel levier ?': 'أي قناة تختار؟',
    'Types de sites': 'أنواع المواقع',
    'Offre sites web': 'خدمة المواقع',
    'Les sites': 'المواقع',
    'Offre contenu': 'خدمة المحتوى',
    'La sélection': 'المختارات',
    'Comparer': 'المقارنة',
    'Décider': 'القرار',
    'Explorer ↗': 'استكشف ↗',
    'Voir le projet ↗': 'عرض المشروع ↗',
    'Explorer le site ↗': 'تصفح الموقع ↗',
    'Adresse du site à confirmer': 'رابط الموقع قيد التأكيد',
    'Voir le site iVISION ↗': 'زيارة موقع iVISION ↗',
  };

  const pageTranslationsAr = {
    '/agence-marketing-digital-algerie.html': (doc) => {
      setHtml(doc, '.hero-copy .eyebrow', 'iVISION / استراتيجية وإبداع في الجزائر');
      setHtml(doc, '#page-title', 'وكالتك <em>للتسويق الرقمي</em> في الجزائر.');
      setHtml(doc, '.hero-copy > p:not(.eyebrow)', 'الحضور القوي على الإنترنت لا يعتمد على قناة واحدة. نربط الاستراتيجية والمحتوى والإعلانات وتجربة الويب لكي يخدم كل إجراء هدفاً واضحاً.');
      setAllHtml(doc, '.hero-actions .btn', [
        'ناقش مشروعي <span aria-hidden="true">↗</span>',
        'اكتشف منهجيتنا <span aria-hidden="true">↓</span>',
      ]);
      setHtml(doc, '.hero-visual span', 'استراتيجية / محتوى / أداء');

      setAllHtml(doc, '.section-top .eyebrow', [
        '01 / نقطة الانطلاق',
        '02 / الخبرات',
        '03 / منهجيتنا',
        '04 / أعمالنا',
        '05 / أسئلة شائعة',
      ]);
      setAllHtml(doc, '.section-top span', [
        'عرض متكامل بعدة قنوات',
        'من الرسالة إلى القياس',
        'تعاون واضح بدون غموض',
        'مشاريع لاستكشافها',
        'قبل الانطلاق',
      ]);

      setHtml(doc, '#approche-title', 'الاستراتيجية قبل الحملة.');
      setAllHtml(doc, '.intro-grid > div > p', [
        'قبل النشر أو شراء الإعلانات، يجب تحديد <strong>من تستهدف، وما النتيجة المطلوبة، وكيف تقيسها</strong>. تنطلق iVISION من نشاطك وسوقك لاختيار القنوات المفيدة فعلاً بدل ملء قائمة خدمات.',
        'حسب طبيعة المشروع، نجمع بين شبكات التواصل، حملات ميتا وجوجل، صناعة المحتوى، مواقع الويب والظهور الطبيعي في محركات البحث. نحدد نطاق العمل معك قبل الإطلاق.',
        'هل تتردد بين البحث الطبيعي والإعلانات؟ <a class="text-link" href="/choisir-seo-google-ads-meta-algerie.html">اقرأ الدليل لاختيار SEO أو Google Ads أو Meta Ads في الجزائر</a>.',
      ]);
      setAllHtml(doc, '.inline-list li', [
        '<b>01</b> هدف تجاري محدد معاً',
        '<b>02</b> خطوات مصممة للجمهور المستهدف',
        '<b>03</b> مؤشرات واضحة لاتخاذ القرارات القادمة',
      ]);

      setHtml(doc, '#expertises-title', 'ما يمكننا بناؤه معاً.');
      setHtml(doc, '#expertises .section-heading p', 'لا تحتاج كل مؤسسة إلى نفس الخطة. يتم اختيار هذه القنوات حسب أهدافك ومواردك ومستوى حضورك الرقمي.');
      setAllHtml(doc, '#expertises .service-grid article', [
        '<span class="number">01 / التوجيه</span><h3>الاستراتيجية الرقمية</h3><p>توضيح تموقعك، جمهورك، والمراحل التي تقود الزائر من الاكتشاف إلى طلب عرض سعر أو الشراء.</p><ul><li>تشخيص الحضور الحالي</li><li>اختيار القنوات والرسائل</li><li>خطة عمل مرتبة حسب الأولوية</li></ul>',
        '<span class="number">02 / التعبير</span><h3><a class="text-link" href="/creation-contenu-algerie.html">المحتوى وشبكات التواصل</a></h3><p>بناء خط تحريري متناسق وصيغ محتوى تناسب المنصات التي يتواجد فيها عملاؤك.</p><ul><li>إخراج فني ومحتوى صور وفيديو</li><li>رزنامة نشر منظمة</li><li>تنشيط المجتمع حسب الحاجة</li></ul>',
        '<span class="number">03 / الاستحواذ</span><h3><a class="text-link" href="/publicite-meta-google-ads-algerie.html">إعلانات ميتا وجوجل</a></h3><p>تصميم حملات مرتبطة بهدف ملموس: تواصل، مبيعات أو وعي بالعلامة. اختبار الرسائل وضبط الميزانية.</p><ul><li>هيكلة الحملات والتصاميم الإعلانية</li><li>متابعة الطلبات والتحويلات</li><li>تحسين مستمر وتقارير دورية</li></ul>',
        '<span class="number">04 / التجربة</span><h3><a class="text-link" href="/creation-site-web-algerie.html">مواقع الويب ومسار الزائر</a></h3><p>تقديم صفحة واضحة للزوار لفهم العرض واتخاذ القرار، مع أسس تقنية تدعم الظهور في محركات البحث.</p><ul><li>موقع تعريفي أو متجر إلكتروني حسب المشروع</li><li>محتوى ومسار تواصل واضح</li><li>أسس تقنية للظهور الطبيعي</li></ul>',
      ]);

      setHtml(doc, '#methode-title', 'من الملخص الأولي إلى القرارات التالية.');
      setHtml(doc, '#methode .section-heading p', 'بدون وعود مبالغ فيها أو نتائج آلية: نضع خطة واضحة، ننفذها، ونقرأ ما تسمح البيانات باستنتاجه فعلياً.');
      setAllHtml(doc, '#methode .steps article', [
        '<span class="number">01 / الاستماع</span><h3>الفهم.</h3><p>نشاطك، جمهورك، قيودك، الخطوات السابقة والنتيجة التي تنتظرها.</p>',
        '<span class="number">02 / التخطيط</span><h3>الاختيار.</h3><p>القنوات ذات الأولوية، الرسائل، نطاق المخرجات وطريقة قياس التقدم.</p>',
        '<span class="number">03 / الإنتاج</span><h3>التنفيذ.</h3><p>إنشاء المحتوى أو الصفحات المتفق عليها، إطلاق الحملات والتأكد من سلاسة المسار.</p>',
        '<span class="number">04 / التعلم</span><h3>التعديل.</h3><p>قراءة المؤشرات المفيدة — الطلبات، التكاليف، المبيعات القابلة للقياس — وترتيب التحسينات.</p>',
      ]);
      setHtml(doc, '#methode .method-note', 'يتم توضيح المخرجات، وتيرة المتابعة وميزانيات الإعلانات في العرض الخاص بمشروعك.');

      setHtml(doc, '#realisations-title', 'العمل وراء الكلمات.');
      setHtml(doc, '#realisations .section-heading p', 'نماذج من تجارب الويب المعروضة من طرف iVISION. كل مشروع يجيب عن سياق مختلف؛ لنتحدث عن مشروعك أولاً.');
      setAllHtml(doc, '#realisations .project div', [
        '<small>متجر إلكتروني · ستريت وير</small><h3>DC16 X WYN</h3><p>متجر إلكتروني مصمم لتقديم تشكيلة أزياء وعالمها الخاص.</p><span>عرض المشروع ↗</span>',
        '<small>منتج رقمي · ولاء الزبائن</small><h3>Fidali</h3><p>واجهة رقمية تجعل خدمة ولاء الزبائن أبسط وأوضح للاكتشاف.</p><span>عرض المشروع ↗</span>',
        '<small>متجر إلكتروني · تجميل</small><h3>White Aura</h3><p>واجهة تجارة إلكترونية مبنية حول هوية وصورة العلامة.</p><span>عرض المشروع ↗</span>',
      ]);
      setHtml(doc, '#realisations .related-note', '<a class="text-link" href="/portfolio-sites-web-algerie.html">تصفح معرض مواقع الويب ↗</a> · <a class="text-link" href="/portfolio-social-media-algerie.html">عرض صفحة أعمال التواصل الاجتماعي (قيد الإعداد) ↗</a>');
      setHtml(doc, '#realisations .fineprint', 'توضح هذه الأمثلة أعمال الويب المعروضة على موقعنا، وليست أرقام أداء إعلاني.');

      setHtml(doc, '#questions-title', 'إجابات مفيدة، بدون تعقيد.');
      setHtml(doc, '#questions .faq-grid > div:first-child > p', 'هل لديك احتياج محدد؟ يمكننا مناقشته مباشرة.');
      setAllHtml(doc, '#questions details', [
        '<summary>ماذا تفعل وكالة التسويق الرقمي؟</summary><p>تساعد في تحديد استراتيجية الحضور والاستحواذ عبر الإنترنت، ثم اختيار وإدارة القنوات المناسبة: المحتوى، شبكات التواصل، الإعلانات، الموقع والقياس حسب الهدف المتفق عليه.</p>',
        '<summary>ما الفرق بينها وبين إدارة الحسابات فقط؟</summary><p>تركز إدارة الحسابات على تنشيط الصفحات والتفاعل مع المتابعين، بينما تشمل استراتيجية التسويق الرقمي اختيار الجمهور، الحملات، صفحات الهبوط وقياس الطلبات أو المبيعات.</p>',
        '<summary>هل ميزانية الإعلانات مشمولة؟</summary><p>يتم الفصل بين أتعاب الوكالة والمبالغ المدفوعة لمنصات الإعلانات. نوضح كليهما في العرض قبل أي انطلاق حسب القنوات وميزانيتك.</p>',
        '<summary>هل SEO وإعلانات جوجل هما نفس الشيء؟</summary><p>لا. يعمل SEO على الظهور الطبيعي للموقع على المدى المتوسط والطويل، بينما تتيح Google Ads نشر إعلانات مدفوعة. <a class="text-link" href="/choisir-seo-google-ads-meta-algerie.html">قارن بين SEO وGoogle Ads وMeta Ads في دليلنا</a>.</p>',
        '<summary>هل ترافقون المؤسسات في الجزائر؟</summary><p>نعم، ترافق iVISION المشاريع الموجهة للسوق الجزائري، ويتم تحديد تفاصيل المتابعة والإنتاج عند دراسة طلبك.</p>',
        '<summary>كيف نعرف أن الخطوات تحقق نتيجة؟</summary><p>نحدد معك المؤشرات المناسبة للهدف: طلبات مؤهلة، مواعيد، تكلفة استحواذ أو مبيعات عندما يكون التتبع متاحاً، ثم نقيم النتائج دورياً.</p>',
      ]);

      setHtml(doc, '.contact-panel .eyebrow', 'خطوتك القادمة');
      setHtml(doc, '#contact-title', 'لنتحدث عن هدفك.');
      setHtml(doc, '.contact-panel p:not(.eyebrow)', 'صف نشاطك والنتيجة التي تبحث عنها. سنحدد معاً الخطوات الأولى المفيدة.');
      setAllHtml(doc, '.contact-panel .actions .btn', [
        'اطلب عرض سعر <span aria-hidden="true">↗</span>',
        'تواصل عبر واتساب <span aria-hidden="true">↗</span>',
      ]);
    },

    '/creation-contenu-algerie.html': (doc) => {
      setHtml(doc, '.hero-copy .eyebrow', 'iVISION / أفكار، صور ورسائل');
      setHtml(doc, '#page-title', 'صناعة <em>المحتوى</em> في الجزائر.');
      setHtml(doc, '.hero-copy > p:not(.eyebrow)', 'محتوى مصمم لشرح عرضك، والتعبير عن علامتك وتغذية القنوات المناسبة. نبدأ بالجمهور والرسالة، لا بعدد منشورات عشوائي.');
      setAllHtml(doc, '.hero-actions .btn', [
        'اشرح احتياجي <span aria-hidden="true">↗</span>',
        'معرض أعمال التواصل <span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.hero-visual span', 'تحريري / بصري / اجتماعي');

      setAllHtml(doc, '.section-top .eyebrow', [
        '01 / نقطة الانطلاق',
        '02 / ما يمكن إنتاجه',
        '03 / مثال توضيحي',
        '04 / منهجيتنا',
        '05 / معرض التواصل الاجتماعي',
        '06 / أسئلة شائعة',
        '07 / خطوات مكملة',
      ]);
      setAllHtml(doc, '.section-top span', [
        'فكرة واضحة قبل الشكل',
        'النطاق يتحدد حسب المشروع',
        'للتوضيح فقط وليس نتيجة عميل',
        'من الفكرة إلى النشر',
        'صفحة مخصصة للأعمال الإبداعية',
        'قبل بدء الإنتاج',
        'خبرات متكاملة',
      ]);

      setHtml(doc, '#besoin-title', 'ماذا يجب أن يفهم جمهورك؟');
      setAllHtml(doc, '.intro-grid > div > p', [
        'الصورة الجميلة وحدها لا تروي القصة كاملة. تحتاج إلى <strong>وعد مفهوم</strong>، وعناصر ملموسة يمكنك إظهارها، ودعوة واضحة للتواصل تنسجم مع عرضك.',
        'حسب نشاطك في الجزائر، يمكننا إعداد خط تحريري باللغتين العربية أو الفرنسية يتم تحديده في الملخص الأولي، مع توضيح الإنتاج وحقوق الاستخدام والمنصات قبل التنفيذ.',
      ]);
      setAllHtml(doc, '.inline-list li', [
        '<b>01</b> الرسالة والجمهور ذو الأولوية',
        '<b>02</b> صيغ مناسبة لعادات جمهورك',
        '<b>03</b> وتيرة نشر قابلة للاستمرار لفريقك',
      ]);

      setHtml(doc, '#livrables-title', 'محتوى مفيد في كل مرحلة.');
      setHtml(doc, '#livrables .section-heading p', 'نختار الصيغ حسب هدفها: التعريف بالعلامة، الشرح، بناء الثقة أو تسهيل طلب التواصل.');
      setAllHtml(doc, '#livrables .service-grid article', [
        '<span class="number">01 / التأطير</span><h3>الخط التحريري</h3><p>المواضيع، النبرة، أمثلة الرسائل ورزنامة النشر: إطار واضح قبل الإنتاج المستمر.</p><ul><li>التموقع والمواضيع الأساسية</li><li>زوايا الطرح والنشر</li><li>تخطيط يُعتمد معاً</li></ul>',
        '<span class="number">02 / التصميم</span><h3>تصاميم العلامة</h3><p>تصاميم مقروءة ومتناسقة لشبكات التواصل، صفحات الويب أو الحملات الإعلانية.</p><ul><li>إخراج فني متناسق</li><li>مقاسات متعددة حسب المنصة</li><li>انسجام مع هوية العلامة</li></ul>',
        '<span class="number">03 / العرض</span><h3>فيديوهات قصيرة</h3><p>سيناريو واضح: جذب الانتباه، عرض الفائدة والدعوة للتفاعل. تصوير أو مونتاج حسب الاتفاق.</p><ul><li>فكرة وسيناريو مختصر</li><li>صيغ عمودية للمنصات</li><li>ترجمة نصية إن تضمنها العرض</li></ul>',
        '<span class="number">04 / الشرح</span><h3>محتوى المواقع</h3><p>نصوص تجعل عرضك مفهوماً في صفحات الخدمات، صفحات المنتجات أو الصفحة الرئيسية.</p><ul><li>ترتيب واضح للمعلومات</li><li>أسئلة شائعة مفيدة</li><li>روابط نحو خطوات التواصل</li></ul>',
      ]);

      setHtml(doc, '#exemple-title', 'أسبوع من المحتوى، لماذا؟');
      setHtml(doc, '#exemple .section-heading p', 'مثال افتراضي لعلامة تطلق منتجاً جديداً. الوتيرة والصيغ تُفصل دائماً حسب كل مشروع.');
      setHtml(doc, '#exemple .example', '<h3>ثلاث رسائل، ثلاثة أدوار.</h3><ol><li><strong>التعريف:</strong> عرض قصير للمشكلة التي يحلها المنتج وكيفية استعماله عملياً.</li><li><strong>الطمأنة:</strong> منشور يجيب عن سؤال متكرر حول التوصيل أو الضمان أو طريقة الطلب.</li><li><strong>التحفيز على التواصل:</strong> صفحة أو منشور يوضح كيفية طلب عرض سعر أو الشراء بوضوح.</li></ol><p class="example-note">هذا المثال توضيحي فقط ولا يمثل حملة سابقة ولا ضماناً للمبيعات.</p>');

      setHtml(doc, '#methode-title', 'إبداع بوصلة واضحة.');
      setHtml(doc, '#methode .section-heading p', 'الشكل الجيد يخدم معلومة دقيقة. المراحل والاعتمادات تتكيف مع تنظيم فريقك.');
      setAllHtml(doc, '#methode .steps article', [
        '<span class="number">01 / الملخص</span><h3>الفهم.</h3><p>نشاطك، الأسئلة المتكررة لعملائك، مواردك والقنوات المتاحة.</p>',
        '<span class="number">02 / الخطة</span><h3>الاختيار.</h3><p>المواضيع، الصيغ، وتيرة النشر والعناصر اللازمة قبل الإنتاج.</p>',
        '<span class="number">03 / الإنجاز</span><h3>الإنتاج.</h3><p>نصوص وتصاميم وفيديو عند الحاجة، مع مرحلة مراجعة متفق عليها.</p>',
        '<span class="number">04 / التقييم</span><h3>التعلم.</h3><p>متابعة التفاعل والطلبات الناتجة عندما يكون قياسها ممكناً.</p>',
      ]);
      setHtml(doc, '#methode .method-note', 'يتم تحديد عدد المنشورات والتنقلات وحقوق الاستخدام وإدارة الحسابات في كل عرض سعر.');

      setHtml(doc, '#portfolio-social-title', 'رؤية العمل، وليس العرض فقط.');
      setHtml(doc, '#portfolio-social .section-heading p', 'صفحة مخصصة جاهزة لعرض التصاميم والفيديوهات المعتمدة بكل شفافية.');
      setHtml(doc, '#portfolio-social .btn', 'فتح معرض أعمال التواصل <span aria-hidden="true">↗</span>');

      setHtml(doc, '#questions-title', 'محتوى مصمم لسياقك.');
      setHtml(doc, '#questions .faq-grid > div:first-child > p', 'حدثنا عن جمهورك والوسائط المتوفرة لديك.');
      setAllHtml(doc, '#questions details', [
        '<summary>هل صناعة المحتوى وإدارة الحسابات هما نفس الشيء؟</summary><p>لا. تركز صناعة المحتوى على الرسائل والتصاميم والفيديو، بينما تضيف إدارة الحسابات النشر والردود والتفاعل اليومي. يمكن الجمع بينهما في العرض.</p>',
        '<summary>هل يجب توفر صور أو فيديوهات مسبقاً؟</summary><p>ليس بالضرورة. ننطلق مما هو متوفر لديك ونحدد إن كانت هناك حاجة لجلسة تصوير أو مونتاج.</p>',
        '<summary>أي شبكات تواصل نختار في الجزائر؟</summary><p>يعتمد ذلك على جمهورك وقدرتك على الرد ومتابعة الطلبات. ندرس القنوات قبل اقتراح وتيرة النشر.</p>',
        '<summary>هل يمكن استخدام المحتوى في الإعلانات الممولة؟</summary><p>نعم، إذا كانت الصيغة وحقوق الاستخدام مناسبة، مع تكييف الإعلان مع صفحة الهبوط. <a class="text-link" href="/publicite-meta-google-ads-algerie.html">اكتشف مرافقة الإعلانات</a>.</p>',
        '<summary>هل تساعد النصوص في الظهور الطبيعي SEO؟</summary><p>الصفحة الواضحة والمفيدة تساعد الزائر ومحركات البحث على فهم العرض. <a class="text-link" href="/creation-site-web-algerie.html">اكتشف إنشاء مواقع الويب</a>.</p>',
      ]);

      setHtml(doc, '#suite-title', 'أين يذهب هذا المحتوى؟');
      setHtml(doc, '#suite-title + p', 'يمكن للمحتوى أن يغذي شبكات التواصل أو حملة إعلانية أو موقعك الإلكتروني ضمن مسار متناسق.');
      setAllHtml(doc, '.topic-grid a', [
        '<b>التسويق الرقمي</b><span>ربط الرسالة والجمهور والأهداف في استراتيجية واضحة.</span><small>استكشف ↗</small>',
        '<b>إعلانات ميتا وجوجل</b><span>اختبار التصاميم الإعلانية لدى جمهور محدد بميزانية مستقلة.</span><small>استكشف ↗</small>',
        '<b>مواقع الويب</b><span>توفير وجهة واضحة للأشخاص المهتمين بعرضك.</span><small>استكشف ↗</small>',
      ]);

      setHtml(doc, '.contact-panel .eyebrow', 'علامتك، كلماتك');
      setHtml(doc, '#contact-title', 'لنتحدث عن محتواك.');
      setHtml(doc, '.contact-panel p:not(.eyebrow)', 'اذكر نشاطك وقنواتك الحالية وما تريد أن يفهمه جمهورك لنحدد نطاق العمل معاً.');
      setAllHtml(doc, '.contact-panel .actions .btn', [
        'اطلب عرض سعر <span aria-hidden="true">↗</span>',
        'راسلنا عبر البريد <span aria-hidden="true">↗</span>',
      ]);
    },

    '/publicite-meta-google-ads-algerie.html': (doc) => {
      setHtml(doc, '.hero-copy .eyebrow', 'iVISION / الإعلانات الممولة في الجزائر');
      setHtml(doc, '#page-title', 'إعلانات <em>Meta &amp; Google Ads</em> في الجزائر.');
      setHtml(doc, '.hero-copy > p:not(.eyebrow)', 'الحملة الناجحة لا تبدأ بمجرد صرف ميزانية. لا بد من عرض واضح، وجمهور أو نية بحث، ووسيلة لقياس الطلبات. نبني هذا المسار معك.');
      setAllHtml(doc, '.hero-actions .btn', [
        'لنتحدث عن حملتي <span aria-hidden="true">↗</span>',
        'اختيار القناة <span aria-hidden="true">↓</span>',
      ]);
      setHtml(doc, '.hero-visual span', 'إعلانات / إبداع / قياس');

      setAllHtml(doc, '.section-top .eyebrow', [
        '01 / قبل الإطلاق',
        '02 / المكونات',
        '03 / إطار القرار',
        '04 / منهجيتنا',
        '05 / أسئلة شائعة',
        '06 / حول الحملات',
      ]);
      setAllHtml(doc, '.section-top span', [
        'الرسالة ووجهتها',
        'الحملة مسار متكامل',
        'توضيح عملي بدون وعود آلية',
        'ميزانية تحت المراقبة',
        'إجابات واضحة وشفافة',
        'مسار متناسق',
      ]);

      setHtml(doc, '#approche-title', 'الإعلان الجيد وحده لا يكفي.');
      setAllHtml(doc, '.intro-grid > div > p', [
        'قد ينقر الزائر دون أن يفهم عرضك. لذلك نراجع أيضاً <strong>صفحة الهبوط، وطريقة التواصل، والقدرة على تتبع الطلبات</strong>.',
        'بالنسبة لنشاط يستهدف الجزائر، ندرس الاستهداف، اللغة، التوقيت ووسائل الدفع المتاحة حسب المنصة والجمهور.',
      ]);
      setAllHtml(doc, '.inline-list li', [
        '<b>01</b> عرض وهدف قابلان للقياس',
        '<b>02</b> تصميم إعلاني منسجم مع صفحة الهبوط',
        '<b>03</b> فصل واضح بين ميزانية المنصات وأتعاب الإدارة',
      ]);

      setHtml(doc, '#canaux-title', 'منصتان، استخدامان مختلفان.');
      setHtml(doc, '#canaux .section-heading p', 'تختلف صيغة الإعلان وتوقيت الوصول إلى الزائر وطريقة قياس النتيجة بين المنصتين.');
      setAllHtml(doc, '#canaux .service-grid article', [
        '<span class="number">01 / الاكتشاف</span><h3>Meta Ads</h3><p>يتيح فيسبوك وإنستغرام تقديم عرضك بالصورة أو الفيديو لجمهور محدد.</p><ul><li>اختيار هدف الحملة</li><li>تصاميم مناسبة لمواضع الظهور</li><li>قراءة المؤشرات بعد الإطلاق</li></ul>',
        '<span class="number">02 / النية</span><h3>Google Ads</h3><p>تجيب إعلانات البحث عن طلب معبّر عنه مسبقاً، وتعتمد على دقة الكلمات المفتاحية وصفحة الهبوط.</p><ul><li>تنظيم الكلمات المفتاحية المفيدة</li><li>إعلانات مرتبطة بالعرض الفعلي</li><li>مراقبة عبارات البحث والاستثناءات</li></ul>',
        '<span class="number">03 / الرسالة</span><h3>التصاميم والصفحات</h3><p>الوعد المقدم في الإعلان يجب أن يجده الزائر بوضوح في الصفحة التي يصل إليها.</p><ul><li>اختبار زوايا عرض متعددة</li><li>تصاميم ونصوص حسب الملخص</li><li>مراجعة صفحة الهبوط</li></ul>',
        '<span class="number">04 / القراءة</span><h3>قياس مفيد</h3><p>نحدد ما يهم قبل الإطلاق: طلب مؤهل، موعد، اتصال أو طلب شراء حسب إمكانية التتبع.</p><ul><li>ضبط الأحداث والوصول</li><li>تقييم مبني على البيانات المتاحة</li><li>قرارات الفترة الموالية</li></ul>',
      ]);

      setHtml(doc, '#choix-title', 'من أين نبدأ؟');
      setHtml(doc, '#choix .section-heading p', 'ثلاثة أسئلة تساعد على ترتيب الأولويات قبل شراء الزيارات.');
      setHtml(doc, '#choix .example', '<h3>شبكة بسيطة لتأطير طلبك.</h3><ol><li><strong>هل يبحث العملاء فعلاً عن حلك؟</strong> راجع عمليات البحث على جوجل والصفحة التي تجيبهم.</li><li><strong>هل يحتاج عرضك إلى العرض البصري أولاً؟</strong> يمكن لإعلانات ميتا توضيح الاستخدام أو التعريف بالمنتج.</li><li><strong>هل يمكنك معالجة الطلبات؟</strong> تأكد من أوقات الرد، الاستمارة واستقبال الرسائل قبل الانطلاق.</li></ol><p class="example-note">هذا الإطار عام؛ يلزم تشخيص الحساب والعرض لتوصية منصة أو ميزانية دقيقة.</p>');

      setHtml(doc, '#methode-title', 'اختبار، قراءة، تعديل.');
      setHtml(doc, '#methode .section-heading p', 'نتفق أولاً على النطاق والمؤشرات. ولا تُخلط ميزانية الإعلانات مع أتعاب المرافقة.');
      setAllHtml(doc, '#methode .steps article', [
        '<span class="number">01 / التأطير</span><h3>التحديد.</h3><p>توضيح العرض، الجمهور، الصلاحيات، الميزانية المقترحة والهدف القابل للقياس.</p>',
        '<span class="number">02 / التحضير</span><h3>التحقق.</h3><p>إعداد الإعلانات، التصاميم، صفحات الهبوط وتتبع التحويلات.</p>',
        '<span class="number">03 / البث</span><h3>الملاحظة.</h3><p>إطلاق الحملات، مراقبة الإنفاق وتحديد نقاط الاحتكاك الأولى.</p>',
        '<span class="number">04 / المتابعة</span><h3>القرار.</h3><p>مشاركة النتائج المتاحة واختيار ما يجب الاحتفاظ به أو تعديله.</p>',
      ]);
      setHtml(doc, '#methode .method-note', 'لا يمكن ضمان مرتبة في النتائج الطبيعية أو تكلفة ثابتة لكل مبيعة مسبقاً.');

      setHtml(doc, '#questions-title', 'الإعلانات، بوضوح تام.');
      setHtml(doc, '#questions .faq-grid > div:first-child > p', 'يوضح عرض السعر القنوات والمخرجات وميزانية البث المقترحة.');
      setAllHtml(doc, '#questions details', [
        '<summary>ما الفرق بين Meta Ads وGoogle Ads؟</summary><p>على ميتا، تصل الرسالة البصرية إلى جمهور قد لا يبحث حالياً عن المنتج. وعلى بحث جوجل، يجيب الإعلان عن بحث مباشر.</p>',
        '<summary>هل ميزانية الإعلانات مشمولة في أتعاب الوكالة؟</summary><p>لا، المبالغ المدفوعة للمنصات وأتعاب الإدارة بندان منفصلان يتم توضيحهما في العرض.</p>',
        '<summary>هل تضمن الحملة الإعلانية المبيعات؟</summary><p>لا. الإعلانات تشتري الظهور والوصول، بينما تتأثر المبيعات بالعرض والسعر والموقع وسرعة معالجة الطلبات.</p>',
        '<summary>هل تحسن Google Ads ترتيبي في SEO؟</summary><p>لا، الإعلانات المدفوعة والنتائج الطبيعية منفصلتان. <a class="text-link" href="/choisir-seo-google-ads-meta-algerie.html">قارن القنوات في الدليل</a>.</p>',
        '<summary>ماذا يجب توفيره للانطلاق؟</summary><p>عرضك، الهدف المطلوب، صفحة الهبوط أو وسيلة التواصل، والصلاحيات والميزانية المخصصة.</p>',
      ]);

      setHtml(doc, '#suite-title', 'ما الذي يمنح النقرة قيمتها؟');
      setHtml(doc, '#suite-title + p', 'تزداد فعالية الميزانية عندما تجيب الرسالة وصفحة الهبوط عن نفس السؤال. <a class="text-link" href="/choisir-seo-google-ads-meta-algerie.html">الدليل: SEO أو Google Ads أو Meta Ads؟</a>');
      setAllHtml(doc, '.topic-grid a', [
        '<b>التسويق الرقمي</b><span>تحديد دور الإعلانات ضمن استراتيجية أشمل.</span><small>استكشف ↗</small>',
        '<b>صناعة المحتوى</b><span>تصميم النصوص والصور التي تشرح عرضك بوضوح.</span><small>استكشف ↗</small>',
        '<b>إنشاء مواقع الويب</b><span>تحضير صفحة واضحة ومسار تواصل سهل.</span><small>استكشف ↗</small>',
      ]);

      setHtml(doc, '.contact-panel .eyebrow', 'حملتك القادمة');
      setHtml(doc, '#contact-title', 'لنتحدث عن هدفك.');
      setHtml(doc, '.contact-panel p:not(.eyebrow)', 'اذكر عرضك وجمهورك وقنواتك الحالية والميزانية التي ترغب في دراستها.');
      setAllHtml(doc, '.contact-panel .actions .btn', [
        'اطلب عرض سعر <span aria-hidden="true">↗</span>',
        'راسلنا عبر البريد <span aria-hidden="true">↗</span>',
      ]);
    },

    '/creation-site-web-algerie.html': (doc) => {
      setHtml(doc, '.hero-copy .eyebrow', 'iVISION / تصميم وتطوير مواقع');
      setHtml(doc, '#page-title', 'إنشاء <em>مواقع الويب</em> في الجزائر.');
      setHtml(doc, '.hero-copy > p:not(.eyebrow)', 'موقع تعريفي، متجر إلكتروني أو تجديد موقع: ننظم محتواك ومسار التواصل ليفهم الزوار عرضك ويعرفوا الخطوة التالية على الهاتف والحاسوب.');
      setAllHtml(doc, '.hero-actions .btn', [
        'اشرح مشروع موقعي <span aria-hidden="true">↗</span>',
        'تصفح معرض المواقع <span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.hero-visual span', 'موقع معروض / Fidali');

      setAllHtml(doc, '.section-top .eyebrow', [
        '01 / قبل التصميم',
        '02 / اختيار الصيغة المناسبة',
        '03 / ملخص مشروعك',
        '04 / منهجيتنا',
        '05 / مشاريع لاستكشافها',
        '06 / أسئلة شائعة',
        '07 / خطوات مكملة',
      ]);
      setAllHtml(doc, '.section-top span', [
        'العرض أولاً، والتقنية في خدمته',
        'احتياج واضح، نطاق محدد',
        'قائمة بسيطة للانطلاق',
        'من الهيكلة إلى النشر',
        'مواقع معروضة من طرف iVISION',
        'التصميم والتشغيل',
        'من الموقع إلى ظهوره',
      ]);

      setHtml(doc, '#cadrage-title', 'ماذا يجب أن يتمكن الزائر من فعله؟');
      setAllHtml(doc, '.intro-grid > div > p', [
        'تصفح عرض، طلب تسعيرة، حجز موعد أو الشراء: كل هدف يتطلب مساراً مختلفاً. نبدأ <strong>بأسئلة جمهورك والمحتوى المتوفر</strong> قبل اختيار الصفحات والوظائف.',
        'بالنسبة لمشروع موجه للجزائر، يتم تحديد اللغات ووسائل التواصل والتوصيل أو الدفع حسب نشاطك.',
      ]);
      setAllHtml(doc, '.inline-list li', [
        '<b>01</b> الصفحات والإجراءات ذات الأولوية',
        '<b>02</b> المحتوى والموارد اللازم تحضيرها',
        '<b>03</b> المتطلبات التقنية والتنظيمية',
      ]);

      setHtml(doc, '#types-title', 'أي موقع يناسب نشاطك؟');
      setHtml(doc, '#types .section-heading p', 'يمكن دمج هذه الصيغ حسب الحاجة، ويُفصل نطاقها في العرض المقترح.');
      setAllHtml(doc, '#types .service-grid article', [
        '<span class="number">01 / التعريف</span><h3>موقع تعريفي</h3><p>شرح النشاط، تفصيل الخدمات وتسهيل طلب التواصل على الهاتف والحاسوب.</p><ul><li>هيكلة صفحات واضحة</li><li>صفحات خدمات مفهومة</li><li>بيانات اتصال ودعوات واضحة للتواصل</li></ul>',
        '<span class="number">02 / البيع</span><h3>متجر إلكتروني</h3><p>عرض المنتجات بمعلوماتها الأساسية ومسار طلب يناسب طريقة عمل التاجر.</p><ul><li>بطاقات منتجات وتصنيفات</li><li>توضيح التوصيل والاستبدال</li><li>مسار طلب منظم</li></ul>',
        '<span class="number">03 / الاستحواذ</span><h3>صفحة هبوط لحملة</h3><p>صفحة مركزة على عرض واحد وإجراء محدد عندما تأتي الزيارات من إعلان موجه.</p><ul><li>رسالة منسجمة مع الإعلان</li><li>إجابات عن أهم التساؤلات</li><li>استمارة أو قناة تواصل مباشرة</li></ul>',
        '<span class="number">04 / التطوير</span><h3>تجديد موقع قائم</h3><p>إعادة تنظيم موقع حالي عندما يصبح محتواه أو عرضه على الهاتف غير مناسب لنشاطك.</p><ul><li>تحديد ما يجب الحفاظ عليه</li><li>توضيح الصفحات والمسار</li><li>تحضير انتقال الروابط المهمة</li></ul>',
      ]);
      setHtml(doc, '#types .related-note', 'مهما كانت الصيغة المختارة، يوضح العرض المحتوى وتجربة الهاتف والأسس التقنية للظهور. <a class="text-link" href="/#/devis?service=site-web">اشرح مشروع موقعي ↗</a>');

      setHtml(doc, '#brief-title', 'ما يساعد على تسعير الموقع.');
      setHtml(doc, '#brief-title + p', 'لا حاجة لدفتر شروط معقد؛ العناصر التالية تساعدنا على اقتراح نطاق واقعي.');
      setHtml(doc, '.example', '<h3>حضّر ما تعرفه مسبقاً.</h3><ol><li><strong>عرضك:</strong> المنتجات أو الخدمات، الجمهور المستهدف والإجراء المطلوب في الموقع.</li><li><strong>مواردك:</strong> النصوص، الشعار، الصور، الكتالوج أو المحتوى المطلوب إنتاجه.</li><li><strong>متطلباتك:</strong> اللغات، الوظائف، اسم النطاق والاستضافة إن توفرت.</li><li><strong>الإدارة اليومية:</strong> من سيقوم بتحديث الصفحات والرد على الرسائل وإدارة الطلبات؟</li></ol><p class="example-note">يتم تفصيل التصميم والربط التقني والاستضافة والصيانة في العرض دون أسعار أو آجال عشوائية.</p>');

      setHtml(doc, '#methode-title', 'موقع يجيب عن احتياج حقيقي.');
      setHtml(doc, '#methode .section-heading p', 'يتقدم المشروع عبر مراحل اعتماد واضحة وبجدول زمني يناسب المحتوى والوظائف.');
      setAllHtml(doc, '#methode .steps article', [
        '<span class="number">01 / الاكتشاف</span><h3>التأطير.</h3><p>توضيح الجمهور، الصفحات، المحتوى والمتطلبات المهنية.</p>',
        '<span class="number">02 / التصميم</span><h3>التنظيم.</h3><p>تحديد هيكلة الصفحات، الرسائل، النماذج الأولية ومسار الزائر.</p>',
        '<span class="number">03 / الإنجاز</span><h3>البناء.</h3><p>دمج المحتوى، تطوير الوظائف المتفق عليها والتحقق من تجربة الهاتف.</p>',
        '<span class="number">04 / النشر</span><h3>المراقبة.</h3><p>اختبار الروابط، الاستمارات، العرض والتهيئة التقنية قبل وبعد النشر.</p>',
      ]);
      setHtml(doc, '#methode .method-note', 'الموقع السليم تقنياً يسهل أرشفته في محركات البحث، دون وعود بمرتبة أولى مضمونة.');

      setHtml(doc, '#projets-title', 'نظرة قبل المعرض الكامل.');
      setHtml(doc, '#projets .section-heading p', 'واجهتان من بين المشاريع المعروضة في صفحة معرض المواقع المخصصة.');
      setAllHtml(doc, '#projets .project div', [
        '<small>متجر · ستريت وير</small><h3>DC16 X WYN</h3><p>متجر إلكتروني بهوية مجموعة أزياء مميزة.</p><span>تصفح الموقع ↗</span>',
        '<small>منتج رقمي · ولاء</small><h3>Fidali</h3><p>منتج رقمي معروض عبر استخداماته وطريقة عمله.</p><span>تصفح الموقع ↗</span>',
      ]);
      setHtml(doc, '#projets .related-note', '<a class="text-link" href="/portfolio-sites-web-algerie.html">تصفح جميع المواقع في معرض الأعمال ↗</a>');
      setHtml(doc, '#projets .fineprint', 'المواقع الخارجية مستقلة؛ قد يتطور محتواها أو توفرها مع الوقت.');

      setHtml(doc, '#questions-title', 'موقع يبقى مفيداً بعد الإطلاق.');
      setHtml(doc, '#questions .faq-grid > div:first-child > p', 'نتحدث أيضاً عن المحتوى والصيانة، وليس عن التصميم فقط.');
      setAllHtml(doc, '#questions details', [
        '<summary>موقع تعريفي أم متجر إلكتروني: أيهما أختار؟</summary><p>الموقع التعريفي يقدم نشاطك ويسهل التواصل، بينما يضيف المتجر بطاقات المنتجات والسلة وإدارة الطلبات.</p>',
        '<summary>هل يشمل إنشاء الموقع تهيئة SEO؟</summary><p>نجهز الأسس التقنية والتحريرية: صفحات واضحة، عناوين ومحتوى منظم حسب العرض، بينما يتطلب SEO عملاً متواصلاً.</p>',
        '<summary>كم يكلف الموقع وكم يستغرق من الوقت؟</summary><p>يعتمد ذلك على عدد الصفحات، المحتوى المتوفر، الوظائف والربط التقني. يوضح عرض السعر كل هذه العناصر بدقة.</p>',
        '<summary>لدي موقع حالي: هل يجب إعادة كل شيء من الصفر؟</summary><p>ليس بالضرورة. تبدأ عملية التجديد بفحص الصفحات والمحتوى الذي يستحق الاحتفاظ به وتصحيح نقاط الضعف.</p>',
        '<summary>من يملك النطاق ويحدّث الموقع؟</summary><p>يتم توضيح ملكية الحسابات، الاستضافة، التوثيق والصيانة قبل بدء المشروع في العرض المقدم.</p>',
        '<summary>هل يمكن ربط الموقع بحملات ميتا أو جوجل؟</summary><p>نعم، يمكن لصفحة الهبوط أن تكمل الإعلان بعرض ووسيلة تواصل متناسقين. <a class="text-link" href="/publicite-meta-google-ads-algerie.html">اكتشف مرافقة الإعلانات</a>.</p>',
      ]);

      setHtml(doc, '#suite-title', 'موقعك لا يعمل بمعزل عن الباقي.');
      setHtml(doc, '#suite-title + p', 'يحتاج الزوار إلى فهم العرض قبل التواصل. ويمكن للاستراتيجية والمحتوى والحملات دعم هذا العمل.');
      setAllHtml(doc, '.topic-grid a', [
        '<b>التسويق الرقمي</b><span>جعل الموقع خطوة متناسقة في مسار عملائك.</span><small>استكشف ↗</small>',
        '<b>صناعة المحتوى</b><span>تحضير النصوص والصور التي تجعل عرضك أكثر وضوحاً.</span><small>استكشف ↗</small>',
        '<b>إعلانات Ads</b><span>بناء حملات إعلانية مرتبطة بصفحة هبوط مناسبة.</span><small>استكشف ↗</small>',
      ]);

      setHtml(doc, '.contact-panel .eyebrow', 'موقعك القادم');
      setHtml(doc, '#contact-title', 'لنتحدث عن مشروع موقعك.');
      setHtml(doc, '.contact-panel p:not(.eyebrow)', 'صف نوع الموقع وما يجب أن يتمكن زوارك من فعله. الاستمارة مخصصة لمشاريع الويب بدون ميزانية إعلانات شهرية مفروضة.');
      setAllHtml(doc, '.contact-panel .actions .btn', [
        'اطلب عرض سعر لموقع ويب <span aria-hidden="true">↗</span>',
        'راسلنا عبر البريد <span aria-hidden="true">↗</span>',
      ]);
    },

    '/portfolio-sites-web-algerie.html': (doc) => {
      setHtml(doc, '.pf-kicker', 'iVISION / معرض مواقع الويب');
      setHtml(doc, '#page-title', 'معرض <em>مواقع الويب.</em>');
      setHtml(doc, '.pf-hero-copy > p:not(.pf-kicker)', 'متاجر إلكترونية، مواقع تعريفية ومنتجات رقمية بعوالم متنوعة. تصفح لقطات المواقع المعروضة من طرف iVISION؛ كما يظهر موقعنا الخاص بشكل مستقل عن مشاريع العملاء.');
      setAllHtml(doc, '.pf-hero-actions .btn', [
        'تصفح المواقع <span aria-hidden="true">↓</span>',
        'اكتشف خدمة المواقع <span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.pf-hero-art figcaption', 'موقع معروض / JawebFlow');

      setHtml(doc, '.pf-lead .eyebrow', '01 / مختارات من المواقع');
      setHtml(doc, '#projets-title', 'مشاريع، واجهات وهويات.');
      setHtml(doc, '.pf-lead p:last-child', 'تُظهر اللقطات واجهات المواقع عند التقاطها. يمكنك فتح الروابط المتاحة، بينما تُضاف الروابط الأخرى بعد تأكيدها. موقع iVISION هو موقع وكالتنا وليس مشروع عميل.');

      const projectCopiesAr = [
        ['01 / موقع ويب', 'منتج رقمي · مساعد محادثة', 'صفحة رئيسية تقدم مساعد المحادثة للمؤسسات مع شرح سريع، عرض تجريبي وولوج إلى الفضاء الخاص.', ['رسالة ترحيبية', 'عرض تجريبي', 'فضاء خاص']],
        ['02 / موقع ويب', 'متجر · ستريت وير', 'تقديم التشكيلة حول ألبوم Picasso: الغلاف، الأسطوانة وسرد عالم DC16 X WYN يكملون تجربة المتجر.', ['عالم التشكيلة', 'صفحة تحريرية', 'مسار المتجر']],
        ['03 / موقع ويب', 'منصة · معارض أعمال', 'مساحة لإنشاء وتصفح معارض الأعمال، تبدأ بعنوان بارز وتصميم ثنائي وروابط مباشرة للإبداعات.', ['معارض رقمية', 'إنشاء', 'استكشاف']],
        ['04 / موقع الوكالة', 'موقع الوكالة · مشروع داخلي', 'موقعنا الخاص معروض بشكل منفصل عن المشاريع الأخرى: واجهة لهوية iVISION مع ولوج للخدمات والمشاريع والتواصل.', ['مشروع داخلي', 'تقديم الوكالة', 'الخدمات']],
        ['05 / موقع ويب', 'منتج رقمي · صوت بالدارجة', 'واجهة مخصصة لتوليد الصوت بالدارجة الجزائرية: تقدم الصفحة المنتج وتوجه نحو التجربة والمزايا والأسعار.', ['صوت بالدارجة', 'تجربة مباشرة', 'الأسعار والأسئلة']],
        ['06 / موقع ويب', 'متجر · تجميل', 'صورة علامة مميزة ودعوة لاكتشاف المنتجات تفتتحان تجربة المتجر الإلكتروني.', ['هوية بصرية', 'اكتشاف المنتجات', 'المجموعات']],
        ['07 / موقع ويب', 'موقع تعريفي · عقارات', 'صورة بانورامية تضع المشروع في دبي، مع تنقل واضح نحو الفرص العقارية، المدونة والتواصل.', ['عرض غامر', 'أقسام واضحة', 'طلب استشارة']],
        ['08 / موقع ويب', 'منتج رقمي · ولاء الزبائن', 'تشرح الصفحة فكرة برنامج الولاء منذ البداية وتدعو لاكتشاف المزايا أو الانطلاق.', ['وعد واضح', 'المزايا', 'ولوج للمنتج']],
      ];

      doc.querySelectorAll('.pf-project').forEach((article, idx) => {
        const data = projectCopiesAr[idx];
        if (!data) return;
        setHtml(article, '.pf-number', data[0]);
        setHtml(article, '.pf-category', data[1]);
        const paragraphs = article.querySelectorAll('.pf-project-copy > p:not(.pf-category)');
        if (paragraphs[0]) {
          track(paragraphs[0]);
          rememberAndSetHtml(paragraphs[0], data[2]);
        }
        const items = article.querySelectorAll('.pf-project-copy ul li');
        items.forEach((li, liIdx) => {
          if (data[3][liIdx]) {
            track(li);
            rememberAndSetHtml(li, data[3][liIdx]);
          }
        });
        const pending = article.querySelector('.pf-project-pending');
        if (pending) {
          track(pending);
          rememberAndSetHtml(pending, 'رابط الموقع قيد التأكيد');
        }
      });

      setHtml(doc, '.pf-disclaimer', 'قد تتطور المواقع أو تتوقف مؤقتاً؛ اللقطات المعروضة لا تمثل ضماناً لنتائج تجارية. تُضاف روابط الزيارة غير المتوفرة بعد تأكيدها.');
      setAllHtml(doc, '.pf-cross-grid a', [
        '<small>الخدمة</small><strong>كيف نحضّر موقعك الإلكتروني؟</strong><span aria-hidden="true">↗</span>',
        '<small>المعرض الآخر</small><strong>عرض صفحة أعمال التواصل الاجتماعي.</strong><span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.pf-contact .eyebrow', 'ومشروعك القادم؟');
      setHtml(doc, '#contact-title', 'لنتحدث عن موقعك القادم.');
      setHtml(doc, '.pf-contact p:not(.eyebrow)', 'صف نشاطك وما يجب أن يتمكن الزوار من فعله. طلب تسعيرة الموقع مستقل عن اشتراكات الإعلانات.');
      setAllHtml(doc, '.pf-contact-actions .btn', [
        'اشرح مشروع موقعي <span aria-hidden="true">↗</span>',
        'راسلنا عبر البريد <span aria-hidden="true">↗</span>',
      ]);
    },

    '/portfolio-social-media-algerie.html': (doc) => {
      setHtml(doc, '.pf-kicker', 'iVISION / معرض التواصل الاجتماعي، التصميم والفيديو');
      setHtml(doc, '#page-title', 'إبداعات <em>التواصل والفيديو.</em>');
      setHtml(doc, '.pf-hero-copy > p:not(.pf-kicker)', 'إخراج فني، تصاميم منتجات، ملصقات إعلانية وفيديوهات Reels عمودية (9:16) من إنتاج استوديو iVISION. تصفح تصاميمنا وشغّل الفيديوهات مباشرة من المعرض.');
      setAllHtml(doc, '.pf-hero-actions .btn', [
        'تصفح التصاميم <span aria-hidden="true">↓</span>',
        'مشاهدة فيديوهات Reels <span aria-hidden="true">▶</span>',
        'خدمة صناعة المحتوى <span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.pf-hero-art figcaption', 'استوديو iVISION الإبداعي · تصميم جرافيك وإنتاج Reels');

      setAllHtml(doc, '.pf-filter-tabs .pf-filter-btn', [
        'عرض الكل (40)',
        'الهوية وسلسلة Eminora (7)',
        'تصاميم المنتجات والإعلانات (12)',
        'ملصقات رياضية (5)',
        'فيديوهات وReels 9:16 (16)',
      ]);
      setHtml(doc, '#pf-filter-status', '40 إبداعاً معروضاً');

      setHtml(doc, '#selection .pf-section-head .eyebrow', '01 / تصميم التواصل الاجتماعي والإخراج الجرافيكي');
      setHtml(doc, '#selection-title', 'تصاميم الشبكات، منشورات المنتجات والملصقات.');
      setHtml(doc, '#selection .pf-section-head p:last-child', 'اضغط على أي تصميم لتكبيره بجودة عالية. كل عمل مصمم لجذب الانتباه في خلاصة إنستغرام، فيسبوك وتيك توك.');

      setHtml(doc, '#videos .pf-section-head .eyebrow', '02 / إنتاج الفيديو، Reels 9:16 وإعلانات الأداء');
      setHtml(doc, '#videos-title', 'فيديوهات قصيرة مصممة لشد الانتباه.');
      setHtml(doc, '#videos .pf-section-head p:last-child', 'اضغط على «تشغيل الفيديو ▶» لفتح المشغل مباشرة داخل البطاقة. صيغ عمودية 9:16 مصورة ومنتجة لـ Reels وتيك توك وإعلانات Meta.');

      doc.querySelectorAll('.pf-card-zoom-pill').forEach((el) => {
        track(el);
        rememberAndSetHtml(el, 'تكبير ↗');
      });
      doc.querySelectorAll('.pf-reel-play-label').forEach((el) => {
        track(el);
        rememberAndSetHtml(el, 'تشغيل الفيديو');
      });
      doc.querySelectorAll('.pf-reel-ext').forEach((el) => {
        track(el);
        rememberAndSetHtml(el, 'فتح ↗');
      });

      setHtml(doc, '#formats .eyebrow', '03 / الصيغ المنفذة في الاستوديو');
      setHtml(doc, '#formats-title', 'ما ننتجه لحساباتك الرقمية.');
      setAllHtml(doc, '.pf-formats article', [
        '<span>01 / التصميم الجرافيكي</span><h3>منشورات، كاروسيل وملصقات.</h3><p>تصاميم منتجات، مطويات وسلاسل بصرية مصممة لإيقاف التمرير وبناء هوية علامتك.</p>',
        '<span>02 / فيديو قصير 9:16</span><h3>Reels، تيك توك وإعلانات ممولة.</h3><p>كتابة الخطاف (Hook)، التصوير، المونتاج الإيقاعي، الترجمة النصية والمؤثرات الصوتية.</p>',
        '<span>03 / تناسق العلامة</span><h3>إخراج فني متكامل.</h3><p>خط بصري موحد يربط منشوراتك وإعلانات Meta/TikTok وموقعك الإلكتروني.</p>',
      ]);

      setHtml(doc, '#canaux .eyebrow', 'قنوات الوكالة');
      setHtml(doc, '#canaux-title', 'تابع iVISION حيث ننشر.');
      setHtml(doc, '#canaux .pf-public-grid > div:last-child > p', 'تابع أيضاً أحدث أعمالنا، كواليس التصوير ونصائح التسويق مباشرة على الحسابات الرسمية لوكالة iVISION.');
      setAllHtml(doc, '.pf-cross-grid a', [
        '<small>الخدمة</small><strong>كيف نحضّر محتواك؟</strong><span aria-hidden="true">↗</span>',
        '<small>المعرض الآخر</small><strong>تصفح مواقع الويب المعروضة.</strong><span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.pf-contact .eyebrow', 'مشروعك في المحتوى والفيديو');
      setHtml(doc, '#contact-title', 'لنتحدث عن محتواك القادم.');
      setHtml(doc, '.pf-contact p:not(.eyebrow)', 'اذكر نشاطك وقنواتك وأهدافك: تصميم منشورات، تصوير Reels أو إدارة شاملة لحساباتك.');
      setAllHtml(doc, '.pf-contact-actions .btn', [
        'اطلب عرض سعر للمحتوى <span aria-hidden="true">↗</span>',
        'راسل iVISION <span aria-hidden="true">↗</span>',
      ]);
    },

    '/choisir-seo-google-ads-meta-algerie.html': (doc) => {
      setHtml(doc, '.hero-copy .eyebrow', 'دليل عملي / للمؤسسات في الجزائر');
      setHtml(doc, '#page-title', '<em>SEO أو Google Ads أو Meta Ads</em>: بماذا تبدأ؟');
      setHtml(doc, '.hero-copy > p:not(.eyebrow)', '«الظهور في المرتبة الأولى» قد يعني أمرين مختلفين: الظهور في النتائج الطبيعية، أو شراء بث إعلان ممول. إليك كيفية اختيار القناة المناسبة لعرضك ومسار عميلك.');
      setAllHtml(doc, '.hero-actions .btn', [
        'قارن القنوات <span aria-hidden="true">↓</span>',
        'اكتشف مرافقة الإعلانات <span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.hero-visual span', 'طبيعي / ممول / قرار');

      setAllHtml(doc, '.section-top .eyebrow', [
        '01 / توضيح الهدف',
        '02 / المقارنة',
        '03 / الانتقال إلى التنفيذ',
        '04 / نقطة انطلاقك',
        '05 / أسئلة شائعة',
        '06 / استكشف',
      ]);
      setAllHtml(doc, '.section-top span', [
        'الظهور لا يعني وعداً بالمرتبة الأولى',
        'ثلاث قنوات، ثلاثة أنواع من الجهد',
        'ترتيب عمل منطقي بدون اختصارات وهمية',
        'أربعة أسئلة قبل طلب عرض سعر',
        'بدون وعود بمرتبة أولى مضمونة',
        'صفحات مخصصة لكل احتياج',
      ]);

      setHtml(doc, '#distinction-title', 'الإعلان الممول ليس نتيجة طبيعية.');
      setAllHtml(doc, '.intro-grid > div > p', [
        'يساعد <strong>SEO</strong> محركات البحث على اكتشاف وفهم وتقديم الصفحات المفيدة، ويعتمد على جودة الموقع ومحتواه دون ضمان فوري للمرتبة الأولى. راجع <a class="text-link" href="https://developers.google.com/search/docs/fundamentals/do-i-need-seo" target="_blank" rel="noopener noreferrer">إرشادات جوجل الرسمية</a>.',
        'تشتري <strong>Google Ads</strong> إمكانية بث إعلانات عند البحث عن عبارات محددة، وليست وسيلة لشراء ترتيب SEO طبيعي. راجع <a class="text-link" href="https://support.google.com/google-ads/answer/1722122?hl=fr" target="_blank" rel="noopener noreferrer">توضيح Google Ads</a>.',
        'تبث <strong>Meta Ads</strong> إعلانات مرئية على فيسبوك وإنستغرام لتقديم عرضك لجمهور لم يبحث عنه بالضرورة في جوجل.',
      ]);

      setHtml(doc, '#comparaison-title', 'ما النتيجة التي تبحث عنها؟');
      setHtml(doc, '#comparaison .section-heading p', 'هذا الجدول إطار للنقاش واتخاذ القرار، وليس توقعاً للترتيب أو التكلفة أو المبيعات.');
      setHtml(doc, '.comparison caption', 'الفروقات الأساسية بين SEO وGoogle Ads وMeta Ads');
      setAllHtml(doc, '.comparison thead th', ['القناة', 'سؤال البداية', 'ما يجب تحضيره', 'ما لا يجب الوعد به']);
      setAllHtml(doc, '.comparison tbody tr', [
        '<th scope="row">SEO الطبيعي</th><td>هل يجيب عرضك عن عمليات بحث يجريها عملاؤك فعلاً؟</td><td>صفحات قابلة للأرشفة، مفيدة، مخصصة للعرض، مع تحسين مستمر.</td><td>أرشفة فورية أو مرتبة أولى مضمونة.</td>',
        '<th scope="row">Google Ads</th><td>هل تريد اختبار عرض لدى أشخاص يبحثون حالياً عن حل؟</td><td>إعلان دقيق، صفحة هبوط متناسقة، حساب مؤهل، ميزانية وقياس للطلبات.</td><td>الظهور الأول في كل بحث أو التأثير على SEO.</td>',
        '<th scope="row">Meta Ads</th><td>هل يُفهم منتجك أو خدمتك بشكل أفضل عبر الصورة أو الفيديو؟</td><td>تصاميم مناسبة للجمهور، عرض واضح، قناة تواصل وتتبع للنتائج.</td><td>عدد مبيعات أو طلبات مضمون مسبقاً.</td>',
      ]);

      setHtml(doc, '#parcours-title', 'المسار قبل جلب الزيارات.');
      setHtml(doc, '#parcours .section-heading p', 'مثال افتراضي: مؤسسة خدمات موجهة للعملاء في عدة ولايات بالجزائر.');
      setHtml(doc, '#parcours .example', '<h3>تسلسل منطقي لاتخاذ القرار.</h3><ol><li><strong>شرح العرض:</strong> كتابة صفحة توضح ما تقدمه، لمن، وكيفية التواصل معك ومنطقة التدخل.</li><li><strong>فهم الطلب:</strong> رصد أسئلة العملاء والعبارات المستعملة للبحث عن الخدمة.</li><li><strong>اختيار أول اختبار:</strong> إذا كان الطلب موجوداً على جوجل وتتوفر ميزانية، اختبر حملة بحث؛ وإن كان العرض يحتاج للإظهار البصري، حضّر تصاميم لميتا.</li><li><strong>القياس ثم القرار:</strong> التمييز بين النقرات، الطلبات والعملاء الفعليين لتحسين الصفحة والحملات.</li></ol><p class="example-note">هذا المثال توضيحي؛ تتوقف الإعلانات عند إيقاف تمويلها بينما يعتمد SEO على جودة الموقع وتقييم محركات البحث.</p>');

      setHtml(doc, '#methode-title', 'حضّر ملخص مشروعك.');
      setHtml(doc, '#methode-title + p', 'تساعد هذه الإجابات على التمييز بين العمل على الموقع، المحتوى وميزانية الإعلانات.');
      setAllHtml(doc, '.method .steps article', [
        '<span class="number">01 / العرض</span><h3>ماذا؟</h3><p>ما الخدمة أو المنتج الذي تريد تقديمه؟ وما الخطوة المطلوبة من الزائر؟</p>',
        '<span class="number">02 / الجمهور</span><h3>لمن؟</h3><p>من هم العملاء الذين يمكنك خدمتهم في الجزائر، وما أسئلتهم قبل التواصل معك؟</p>',
        '<span class="number">03 / الوسائط</span><h3>بماذا؟</h3><p>هل لديك موقع، تصاميم، إجابات عن الأسئلة الشائعة وشخص لمعالجة الطلبات؟</p>',
        '<span class="number">04 / القياس</span><h3>كيف؟</h3><p>ما البيانات المتاحة للتمييز بين الزيارة والطلب المؤهل مع احترام الخصوصية؟</p>',
      ]);
      setHtml(doc, '.method .method-note', 'أفضل استثمار أولي قد يكون توضيح صفحة أو استمارة قبل شراء الزيارات.');

      setHtml(doc, '#questions-title', 'توقعات واضحة منذ البداية.');
      setHtml(doc, '#questions .faq-grid > div:first-child > p', 'مقارنة القنوات تكون مفيدة عندما نميز بين الأهداف والنتائج المقاسة.');
      setAllHtml(doc, '#questions details', [
        '<summary>هل يمكنني الدفع لأكون الأول في جوجل؟</summary><p>يمكنك الدفع للمشاركة في مزادات الإعلانات (Google Ads)، وليس لشراء المرتبة الأولى في النتائج الطبيعية.</p>',
        '<summary>هل الإعلانات تحسن ترتيبي في SEO؟</summary><p>لا، الدفع في Google Ads لا يرفع ترتيب صفحاتك في النتائج الطبيعية بشكل مباشر.</p>',
        '<summary>هل يجب استهداف مدينة محددة فقط؟</summary><p>فقط إذا كان نشاطك وقدرتك على التوصيل أو التدخل يتطلبان ذلك. للخدمات الوطنية، وضح تغطيتك بصدق.</p>',
        '<summary>أي قناة أختار إذا لم يكن لدي موقع؟</summary><p>وجود صفحة واضحة ووسيلة لاستقبال الطلبات ضروري قبل إرسال الزيارات. <a class="text-link" href="/creation-site-web-algerie.html">اكتشف كيف نؤطر مشروع موقع ويب</a>.</p>',
      ]);

      setHtml(doc, '#liens-title', 'اختر قراءتك التالية.');
      setHtml(doc, '#liens-title + p', 'تقدم هذه الصفحات خدمات متكاملة بوضوح وشفافية.');
      setAllHtml(doc, '.topic-grid a', [
        '<b>التسويق الرقمي</b><span>ربط العرض، القنوات والأهداف.</span><small>استكشف ↗</small>',
        '<b>صناعة المحتوى</b><span>تحضير الرسائل، الصور والصيغ المفيدة.</span><small>استكشف ↗</small>',
        '<b>إعلانات Ads</b><span>تحديد الحملات وطريقة قياسها.</span><small>استكشف ↗</small>',
      ]);
      setHtml(doc, '.related-note', 'هل تحضر أولاً موقعاً تعريفياً أو متجراً إلكترونياً؟ <a class="text-link" href="/creation-site-web-algerie.html">اكتشف خدمة إنشاء مواقع الويب في الجزائر.</a>');

      setHtml(doc, '.contact-panel .eyebrow', 'وضعيتك الخاصة، وليست وصفة سحرية');
      setHtml(doc, '#contact-title', 'لنتحدث عن هدفك.');
      setHtml(doc, '.contact-panel p:not(.eyebrow)', 'اشرح عرضك وجمهورك وما ترغب في قياسه لنحدد معاً الخطوات المفيدة قبل الانطلاق.');
      setAllHtml(doc, '.contact-panel .actions .btn', [
        'اطلب عرض سعر <span aria-hidden="true">↗</span>',
        'راسلنا عبر البريد <span aria-hidden="true">↗</span>',
      ]);
    },
  };

  const applyArabicCommon = (doc) => {
    doc.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (key && sharedNavAr[key]) {
        track(el);
        rememberAndSetHtml(el, sharedNavAr[key]);
      }
    });

    doc.querySelectorAll('a, span, small, summary, caption').forEach((el) => {
      if (el.children.length === 0) {
        const txt = (el.textContent || '').trim();
        if (exactTextMapAr[txt]) {
          track(el);
          rememberAndSetHtml(el, exactTextMapAr[txt]);
        }
      }
    });

    setHtml(doc, '.footer-brand p', 'وكالة iVISION<br /><span class="muted">استراتيجية، إبداع وتجربة رقمية لمشاريعكم في الجزائر.</span>');
    setHtml(doc, '.footer-grid > p', 'وكالة iVISION<br /><span class="muted">استراتيجية، إبداع وتجربة رقمية لمشاريعكم في الجزائر.</span>');
    const footerSpans = doc.querySelectorAll('.footer-base span');
    if (footerSpans[0]) {
      track(footerSpans[0]);
      rememberAndSetHtml(footerSpans[0], '© وكالة iVISION');
    }
    if (footerSpans[1]) {
      track(footerSpans[1]);
      rememberAndSetHtml(footerSpans[1], 'التسويق الرقمي في الجزائر · استراتيجية / محتوى / ويب');
    }

    doc.querySelectorAll('.brand, .iv-logo').forEach((el) => {
      track(el);
      rememberAndSetAttr(el, 'aria-label', 'iVISION — العودة إلى الرئيسية');
    });
  };

  const renderDesktopNav = (lang) => {
    const nav = document.querySelector('.header-nav.iv-nav, .iv-nav');
    if (!nav) return;
    const isAr = lang === 'ar';
    nav.setAttribute('aria-label', isAr ? 'التنقل الرئيسي' : 'Navigation principale');

    nav.innerHTML = isAr
      ? `
        <a href="/">الرئيسية</a>
        <a href="/#about">من نحن</a>
        <div class="iv-nav-item has-dropdown">
          <button type="button" class="iv-nav-trigger" aria-expanded="false">
            <span>خدماتنا</span><i class="iv-caret" aria-hidden="true">⌄</i>
          </button>
          <div class="iv-dropdown iv-dropdown-mega" role="region" aria-label="خدماتنا">
            <div class="iv-mega-grid">
              <div class="iv-mega-col">
                <span class="iv-mega-heading">01 / الاستراتيجية والاستحواذ</span>
                <div class="iv-mega-list">
                  <a href="/agence-marketing-digital-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>التسويق الرقمي 360°</strong><em>STRATÉGIE</em></div>
                    <span>استراتيجية الحضور، التموقع وخطة القنوات في الجزائر</span>
                  </a>
                  <a href="/publicite-meta-google-ads-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>إعلانات Meta &amp; Google Ads</strong><em>ADS</em></div>
                    <span>حملات ممولة مرتبطة بصفحات هبوط وقياس الطلبات</span>
                  </a>
                  <a href="/choisir-seo-google-ads-meta-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>دليل SEO أو Google &amp; Meta Ads</strong><em>GUIDE SEO</em></div>
                    <span>مقارنة عملية لاختيار القناة الأنسب لميزانيتك</span>
                  </a>
                </div>
              </div>
              <div class="iv-mega-col">
                <span class="iv-mega-heading">02 / صناعة المحتوى والتواصل</span>
                <div class="iv-mega-list">
                  <a href="/creation-contenu-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>صناعة المحتوى والاستوديو</strong><em>STUDIO</em></div>
                    <span>إخراج فني، فيديوهات Reels، تصوير ونصوص إعلانية</span>
                  </a>
                  <a href="/portfolio-social-media-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>معرض أعمال التواصل الاجتماعي</strong><em>SOCIAL</em></div>
                    <span>صيغ النشر، التصاميم والفيديوهات القصيرة</span>
                  </a>
                  <a href="/#/centres" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>مرافقة مراكز التدريب والمدارس</strong><em>ACADÉMIQ</em></div>
                    <span>حلول مخصصة لملء الأفواج واستقطاب المسجلين</span>
                  </a>
                </div>
              </div>
              <div class="iv-mega-col">
                <span class="iv-mega-heading">03 / مواقع الويب والتحويل</span>
                <div class="iv-mega-list">
                  <a href="/creation-site-web-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>إنشاء وتطوير مواقع الويب</strong><em>SITES WEB</em></div>
                    <span>مواقع تعريفية، متاجر إلكترونية وتجديد مواقع</span>
                  </a>
                  <a href="/portfolio-sites-web-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>معرض مواقع الويب المنجزة</strong><em>PORTFOLIO</em></div>
                    <span>تصفح 8 مشاريع ويب ومتاجر إلكترونية مباشرة</span>
                  </a>
                  <a href="/#/devis?service=site-web" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>طلب عرض سعر خاص بموقع ويب</strong><em>DEVIS WEB</em></div>
                    <span>استمارة مخصصة لمشاريع الويب بدون التزام إعلاني</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="iv-nav-item has-dropdown">
          <button type="button" class="iv-nav-trigger" aria-expanded="false">
            <span>المعرض</span><i class="iv-caret" aria-hidden="true">⌄</i>
          </button>
          <div class="iv-dropdown iv-dropdown-list" role="region" aria-label="المعرض">
            <span class="iv-mega-heading">أعمالنا ومشاريعنا المعروضة</span>
            <div class="iv-mega-list">
              <a href="/portfolio-sites-web-algerie.html" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>معرض مواقع الويب</strong><em>01</em></div>
                <span>متاجر إلكترونية، مواقع تعريفية ومنتجات رقمية (8 مشاريع)</span>
              </a>
              <a href="/portfolio-social-media-algerie.html" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>معرض التواصل الاجتماعي</strong><em>02</em></div>
                <span>مختارات المحتوى البصري، Reels وإدارة العلامات</span>
              </a>
              <a href="/#work" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>مختارات الصفحة الرئيسية</strong><em>03</em></div>
                <span>استعراض تفاعلي لأهم المشاريع على الرئيسية</span>
              </a>
            </div>
          </div>
        </div>
        <div class="iv-nav-item has-dropdown">
          <button type="button" class="iv-nav-trigger" aria-expanded="false">
            <span>الأدوات</span><i class="iv-caret" aria-hidden="true">⌄</i>
          </button>
          <div class="iv-dropdown iv-dropdown-list" role="region" aria-label="الأدوات">
            <span class="iv-mega-heading">أدوات تفاعلية مجانية لاتخاذ القرار</span>
            <div class="iv-mega-list">
              <a href="/#/outils?tool=diagnostic" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>التشخيص الرقمي (Digital Score)</strong><em>01</em></div>
                <span>قيّم نضج حضورك الرقمي من 100 في 60 ثانية</span>
              </a>
              <a href="/#/outils?tool=pertes" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>حاسبة الفرص الضائعة</strong><em>02</em></div>
                <span>احسب الزوار والطلبات المهدرة بسبب بطء الموقع بالدينار</span>
              </a>
              <a href="/#/outils?tool=audit-seo" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>فحص SEO المجاني (الجزائر)</strong><em>03</em></div>
                <span>قائمة فحص شاملة لجاهزية موقعك على محرك جوجل</span>
              </a>
              <a href="/#/outils?tool=simulateur-web" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>مصمم ومحاكي الموقع الإلكتروني</strong><em>04</em></div>
                <span>اختر الصيغة والصفحات الأنسب لمشروعك القادم</span>
              </a>
              <a href="/#/outils?tool=calculateur" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>حاسبة عرض السعر الفورية</strong><em>05</em></div>
                <span>كوّن أقطاب مشروعك وأرسل الملخص مباشرة للفريق</span>
              </a>
            </div>
          </div>
        </div>
        <a href="/#/blog">المدونة</a>
        <a href="/#contact">اتصل بنا</a>
      `
      : `
        <a href="/">Accueil</a>
        <a href="/#about">À propos</a>
        <div class="iv-nav-item has-dropdown">
          <button type="button" class="iv-nav-trigger" aria-expanded="false">
            <span>Services</span><i class="iv-caret" aria-hidden="true">⌄</i>
          </button>
          <div class="iv-dropdown iv-dropdown-mega" role="region" aria-label="Services">
            <div class="iv-mega-grid">
              <div class="iv-mega-col">
                <span class="iv-mega-heading">01 / STRATÉGIE &amp; ACQUISITION</span>
                <div class="iv-mega-list">
                  <a href="/agence-marketing-digital-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Marketing Digital 360°</strong><em>STRATÉGIE</em></div>
                    <span>Positionnement, plan d’action multicanal &amp; suivi en Algérie</span>
                  </a>
                  <a href="/publicite-meta-google-ads-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Publicité Meta &amp; Google Ads</strong><em>ADS</em></div>
                    <span>Campagnes sponsorisées, créas &amp; génération de demandes</span>
                  </a>
                  <a href="/choisir-seo-google-ads-meta-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Guide SEO vs Google &amp; Meta Ads</strong><em>GUIDE SEO</em></div>
                    <span>Comparatif clair pour prioriser vos investissements</span>
                  </a>
                </div>
              </div>
              <div class="iv-mega-col">
                <span class="iv-mega-heading">02 / CRÉATION &amp; SOCIAL MEDIA</span>
                <div class="iv-mega-list">
                  <a href="/creation-contenu-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Création de Contenu &amp; Studio</strong><em>STUDIO</em></div>
                    <span>Direction artistique, Reels, visuels de marque &amp; copywriting</span>
                  </a>
                  <a href="/portfolio-social-media-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Portfolio Social Media</strong><em>SOCIAL</em></div>
                    <span>Formats éditoriaux, vidéos courtes &amp; univers de marque</span>
                  </a>
                  <a href="/#/centres" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Offre Centres de Formation</strong><em>ACADÉMIQ</em></div>
                    <span>Système d’acquisition dédié aux écoles &amp; instituts</span>
                  </a>
                </div>
              </div>
              <div class="iv-mega-col">
                <span class="iv-mega-heading">03 / SITES WEB &amp; EXPÉRIENCE</span>
                <div class="iv-mega-list">
                  <a href="/creation-site-web-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Création de Sites Web</strong><em>SITES WEB</em></div>
                    <span>Sites vitrines, boutiques e-commerce &amp; refonte SEO</span>
                  </a>
                  <a href="/portfolio-sites-web-algerie.html" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Portfolio Sites Web</strong><em>PORTFOLIO</em></div>
                    <span>8 réalisations web, e-commerce et produits digitaux</span>
                  </a>
                  <a href="/#/devis?service=site-web" class="iv-dropdown-link">
                    <div class="iv-dropdown-link-top"><strong>Devis Projet Site Web</strong><em>DEVIS WEB</em></div>
                    <span>Formulaire dédié aux sites web sans budget pub imposé</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="iv-nav-item has-dropdown">
          <button type="button" class="iv-nav-trigger" aria-expanded="false">
            <span>Portfolio</span><i class="iv-caret" aria-hidden="true">⌄</i>
          </button>
          <div class="iv-dropdown iv-dropdown-list" role="region" aria-label="Portfolio">
            <span class="iv-mega-heading">SÉLECTION DE RÉALISATIONS iVISION</span>
            <div class="iv-mega-list">
              <a href="/portfolio-sites-web-algerie.html" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Portfolio Sites Web</strong><em>01</em></div>
                <span>Boutiques e-commerce, sites vitrines &amp; produits digitaux (8 projets)</span>
              </a>
              <a href="/portfolio-social-media-algerie.html" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Portfolio Social Media</strong><em>02</em></div>
                <span>Créations visuelles, formats courts Reels &amp; direction artistique</span>
              </a>
              <a href="/#work" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Études de cas (Accueil)</strong><em>03</em></div>
                <span>Parcourir la galerie interactive sur la page d’accueil</span>
              </a>
            </div>
          </div>
        </div>
        <div class="iv-nav-item has-dropdown">
          <button type="button" class="iv-nav-trigger" aria-expanded="false">
            <span>Outils</span><i class="iv-caret" aria-hidden="true">⌄</i>
          </button>
          <div class="iv-dropdown iv-dropdown-list" role="region" aria-label="Outils">
            <span class="iv-mega-heading">OUTILS &amp; SIMULATEURS INTERACTIFS</span>
            <div class="iv-mega-list">
              <a href="/#/outils?tool=diagnostic" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Diagnostic Digital Score</strong><em>01</em></div>
                <span>Évaluez votre maturité digitale sur 100 en 60 secondes</span>
              </a>
              <a href="/#/outils?tool=pertes" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Compteur de Pertes &amp; Trafic</strong><em>02</em></div>
                <span>Simulez les demandes et le CA manqués avec un site lent</span>
              </a>
              <a href="/#/outils?tool=audit-seo" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Audit SEO Gratuit</strong><em>03</em></div>
                <span>Vérifiez les 8 piliers de visibilité Google en Algérie</span>
              </a>
              <a href="/#/outils?tool=simulateur-web" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Simulateur de Site Web</strong><em>04</em></div>
                <span>Trouvez l’architecture et le format adaptés à votre cible</span>
              </a>
              <a href="/#/outils?tool=calculateur" class="iv-dropdown-link">
                <div class="iv-dropdown-link-top"><strong>Calculateur de Devis</strong><em>05</em></div>
                <span>Configurez vos pôles sur mesure avant chiffrage</span>
              </a>
            </div>
          </div>
        </div>
        <a href="/#/blog">Blog</a>
        <a href="/#contact">Contact</a>
      `;

    const items = nav.querySelectorAll('.iv-nav-item.has-dropdown');
    items.forEach((item) => {
      const btn = item.querySelector('.iv-nav-trigger');
      if (!btn) return;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const wasOpen = item.classList.contains('is-open');
        items.forEach((other) => {
          other.classList.remove('is-open');
          const b = other.querySelector('.iv-nav-trigger');
          if (b) b.setAttribute('aria-expanded', 'false');
        });
        if (!wasOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    const mobileNav = document.querySelector('.iv-mobile-menu nav');
    if (mobileNav) {
      mobileNav.className = 'iv-mobile-nav';
      mobileNav.innerHTML = isAr
        ? `
          <a href="/" class="iv-mobile-row"><span>الرئيسية</span></a>
          <a href="/#about" class="iv-mobile-row"><span>من نحن</span></a>
          <div class="iv-mobile-group">
            <button type="button" class="iv-mobile-row iv-mobile-accordion-btn" aria-expanded="false">
              <span>خدماتنا</span><i class="iv-caret" aria-hidden="true">⌄</i>
            </button>
            <div class="iv-mobile-sublist" hidden>
              <a href="/agence-marketing-digital-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>التسويق الرقمي 360°</strong><em>STRATÉGIE</em></div><small>استراتيجية الحضور والقنوات في الجزائر</small></a>
              <a href="/creation-contenu-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>صناعة المحتوى والاستوديو</strong><em>STUDIO</em></div><small>إخراج فني، Reels وتصاميم</small></a>
              <a href="/publicite-meta-google-ads-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>إعلانات Meta &amp; Google Ads</strong><em>ADS</em></div><small>حملات ممولة وقياس التحويلات</small></a>
              <a href="/creation-site-web-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>إنشاء مواقع الويب</strong><em>SITES WEB</em></div><small>مواقع تعريفية ومتاجر إلكترونية</small></a>
              <a href="/choisir-seo-google-ads-meta-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>دليل SEO أو Ads</strong><em>GUIDE</em></div><small>مقارنة لاختيار القناة الأنسب</small></a>
            </div>
          </div>
          <div class="iv-mobile-group">
            <button type="button" class="iv-mobile-row iv-mobile-accordion-btn" aria-expanded="false">
              <span>المعرض</span><i class="iv-caret" aria-hidden="true">⌄</i>
            </button>
            <div class="iv-mobile-sublist" hidden>
              <a href="/portfolio-sites-web-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>معرض مواقع الويب</strong><em>01</em></div><small>8 مشاريع ويب ومتاجر إلكترونية</small></a>
              <a href="/portfolio-social-media-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>معرض التواصل الاجتماعي</strong><em>02</em></div><small>مختارات المحتوى البصري وReels</small></a>
            </div>
          </div>
          <div class="iv-mobile-group">
            <button type="button" class="iv-mobile-row iv-mobile-accordion-btn" aria-expanded="false">
              <span>الأدوات التفاعلية</span><i class="iv-caret" aria-hidden="true">⌄</i>
            </button>
            <div class="iv-mobile-sublist" hidden>
              <a href="/#/outils?tool=diagnostic" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>التشخيص الرقمي</strong><em>01</em></div><small>تقييم شامل من 100</small></a>
              <a href="/#/outils?tool=pertes" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>حاسبة الفرص الضائعة</strong><em>02</em></div><small>محاكاة الزيارات والعائد بالدينار</small></a>
              <a href="/#/outils?tool=audit-seo" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>فحص SEO المجاني</strong><em>03</em></div><small>قائمة فحص جوجل الجزائر</small></a>
              <a href="/#/outils?tool=simulateur-web" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>مصمم الموقع الإلكتروني</strong><em>04</em></div><small>اختيار البنية والصفحات</small></a>
              <a href="/#/outils?tool=calculateur" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>حاسبة عرض السعر</strong><em>05</em></div><small>تكوين أقطاب المشروع</small></a>
            </div>
          </div>
          <a href="/#/blog" class="iv-mobile-row"><span>المدونة</span></a>
          <a href="/#contact" class="iv-mobile-row"><span>اتصل بنا</span></a>
          <a href="/#/devis" class="iv-mobile-cta-btn"><span>لنتحدث عن مشروعي</span><b aria-hidden="true">↗</b></a>
        `
        : `
          <a href="/" class="iv-mobile-row"><span>Accueil</span></a>
          <a href="/#about" class="iv-mobile-row"><span>À propos</span></a>
          <div class="iv-mobile-group">
            <button type="button" class="iv-mobile-row iv-mobile-accordion-btn" aria-expanded="false">
              <span>Services</span><i class="iv-caret" aria-hidden="true">⌄</i>
            </button>
            <div class="iv-mobile-sublist" hidden>
              <a href="/agence-marketing-digital-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Marketing Digital 360°</strong><em>STRATÉGIE</em></div><small>Positionnement, plan multicanal &amp; suivi</small></a>
              <a href="/creation-contenu-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Création de Contenu &amp; Studio</strong><em>STUDIO</em></div><small>Direction artistique, Reels &amp; visuels</small></a>
              <a href="/publicite-meta-google-ads-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Publicité Meta &amp; Google Ads</strong><em>ADS</em></div><small>Campagnes sponsorisées &amp; génération de leads</small></a>
              <a href="/creation-site-web-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Création de Sites Web</strong><em>SITES WEB</em></div><small>Sites vitrines, e-commerce &amp; refonte</small></a>
              <a href="/choisir-seo-google-ads-meta-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Guide SEO vs Ads</strong><em>GUIDE</em></div><small>Comparatif pour choisir le bon levier</small></a>
            </div>
          </div>
          <div class="iv-mobile-group">
            <button type="button" class="iv-mobile-row iv-mobile-accordion-btn" aria-expanded="false">
              <span>Portfolio</span><i class="iv-caret" aria-hidden="true">⌄</i>
            </button>
            <div class="iv-mobile-sublist" hidden>
              <a href="/portfolio-sites-web-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Portfolio Sites Web</strong><em>01</em></div><small>8 projets web, e-commerce &amp; produits</small></a>
              <a href="/portfolio-social-media-algerie.html" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Portfolio Social Media</strong><em>02</em></div><small>Sélection créative &amp; formats courts</small></a>
            </div>
          </div>
          <div class="iv-mobile-group">
            <button type="button" class="iv-mobile-row iv-mobile-accordion-btn" aria-expanded="false">
              <span>Outils &amp; Simulateurs</span><i class="iv-caret" aria-hidden="true">⌄</i>
            </button>
            <div class="iv-mobile-sublist" hidden>
              <a href="/#/outils?tool=diagnostic" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Diagnostic Digital Score</strong><em>01</em></div><small>Score de maturité /100 en 60s</small></a>
              <a href="/#/outils?tool=pertes" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Compteur de Pertes</strong><em>02</em></div><small>Simulateur trafic &amp; CA en DA</small></a>
              <a href="/#/outils?tool=audit-seo" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Audit SEO Gratuit</strong><em>03</em></div><small>Checklist visibilité Google Algérie</small></a>
              <a href="/#/outils?tool=simulateur-web" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Simulateur de Site Web</strong><em>04</em></div><small>Architecture &amp; format recommandés</small></a>
              <a href="/#/outils?tool=calculateur" class="iv-mobile-sublink"><div class="iv-mobile-sublink-top"><strong>Calculateur de Devis</strong><em>05</em></div><small>Configurateur sur-mesure</small></a>
            </div>
          </div>
          <a href="/#/blog" class="iv-mobile-row"><span>Blog</span></a>
          <a href="/#contact" class="iv-mobile-row"><span>Contact</span></a>
          <a href="/#/devis" class="iv-mobile-cta-btn"><span>Parler de mon projet</span><b aria-hidden="true">↗</b></a>
        `;

      mobileNav.querySelectorAll('.iv-mobile-accordion-btn').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          const group = btn.closest('.iv-mobile-group');
          if (!group) return;
          const sublist = group.querySelector('.iv-mobile-sublist');
          const willOpen = !group.classList.contains('is-open');
          mobileNav.querySelectorAll('.iv-mobile-group').forEach((g) => {
            g.classList.remove('is-open');
            const b = g.querySelector('.iv-mobile-accordion-btn');
            const s = g.querySelector('.iv-mobile-sublist');
            if (b) b.setAttribute('aria-expanded', 'false');
            if (s) s.hidden = true;
          });
          if (willOpen) {
            group.classList.add('is-open');
            btn.setAttribute('aria-expanded', 'true');
            if (sublist) sublist.hidden = false;
          }
        });
      });

      mobileNav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
          document.dispatchEvent(new CustomEvent('iv-close-mobile-menu'));
        });
      });
    }
  };

  const setLanguage = (lang) => {
    const normalized = lang === 'ar' ? 'ar' : 'fr';
    try {
      localStorage.setItem(STORAGE_KEY, normalized);
    } catch {
      // ignore storage errors
    }

    document.documentElement.lang = normalized === 'ar' ? 'ar' : 'fr-DZ';
    document.documentElement.dir = normalized === 'ar' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
      const isMatch = btn.getAttribute('data-lang-switch') === normalized;
      btn.classList.toggle('is-active', isMatch);
      btn.setAttribute('aria-pressed', isMatch ? 'true' : 'false');
    });

    renderDesktopNav(normalized);

    if (normalized === 'ar') {
      restoreFrench();
      applyArabicCommon(document);
      const path = window.location.pathname;
      const translatePage = pageTranslationsAr[path];
      if (translatePage) translatePage(document);
    } else {
      restoreFrench();
    }
  };

  const ensureFontsAndDropdownStyles = () => {
    if (!document.getElementById('iv-multi-arabic-fonts')) {
      const link = document.createElement('link');
      link.id = 'iv-multi-arabic-fonts';
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400;1,700&family=Noto+Kufi+Arabic:wght@400;500;600;700&family=Readex+Pro:wght@400;500;600;700&family=Tajawal:wght@400;500;700&display=swap';
      document.head.appendChild(link);
    }
    if (!document.getElementById('iv-dropdown-runtime-style')) {
      const style = document.createElement('style');
      style.id = 'iv-dropdown-runtime-style';
      style.textContent = `
        .iv-nav > a, .iv-nav-trigger { color: var(--iv-muted, rgba(242,237,228,.62)); font-family: inherit; font-size: .58rem; font-weight: 600; letter-spacing: .1em; text-decoration: none; text-transform: uppercase; white-space: nowrap; background: transparent; border: 0; padding: .4rem .15rem; cursor: pointer; display: inline-flex; align-items: center; gap: .28rem; }
        .iv-nav > a:hover, .iv-nav-trigger:hover, .iv-nav-item.is-open .iv-nav-trigger { color: var(--iv-white, #f2ede4); }
        .iv-caret { font-style: normal; font-size: .72rem; line-height: 1; display: inline-block; transition: transform .25s ease; transform: translateY(-.08rem); }
        .iv-nav-item.is-open .iv-caret { transform: translateY(.05rem) rotate(180deg); color: #a69b8b; }
        .iv-nav-item.has-dropdown { position: relative; display: inline-flex; align-items: center; }
        .iv-dropdown { position: absolute; top: calc(100% + .85rem); left: 50%; transform: translateX(-50%) translateY(8px); opacity: 0; visibility: hidden; pointer-events: none; z-index: 140; background: #fbf8f2; color: #14120f; border: 1px solid rgba(20,18,15,.16); border-radius: 1.15rem; box-shadow: 0 24px 60px rgba(10,9,8,.24); padding: 1.35rem; transition: opacity .22s ease, transform .22s cubic-bezier(.23,1,.32,1), visibility .22s ease; }
        .iv-nav-item.is-open .iv-dropdown, .iv-nav-item.has-dropdown:hover .iv-dropdown { opacity: 1; visibility: visible; pointer-events: auto; transform: translateX(-50%) translateY(0); }
        .iv-dropdown::before { content: ''; position: absolute; top: -1rem; left: 0; right: 0; height: 1rem; }
        .iv-dropdown-mega { width: min(86vw, 58rem); left: 50%; transform: translateX(-52%) translateY(8px); }
        .iv-nav-item.is-open .iv-dropdown-mega, .iv-nav-item.has-dropdown:hover .iv-dropdown-mega { transform: translateX(-52%) translateY(0); }
        .iv-dropdown-list { width: min(86vw, 23rem); }
        .iv-mega-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1.1rem; }
        .iv-mega-col { display: flex; flex-direction: column; padding-right: .8rem; border-right: 1px solid rgba(20,18,15,.1); }
        .iv-mega-col:last-child { padding-right: 0; border-right: 0; }
        .iv-mega-heading { display: block; padding-bottom: .6rem; margin-bottom: .65rem; border-bottom: 1px solid rgba(20,18,15,.1); color: #6f6559; font-size: .54rem; font-weight: 700; letter-spacing: .16em; text-transform: uppercase; }
        .iv-mega-list { display: flex; flex-direction: column; gap: .35rem; }
        .iv-dropdown-link { display: block !important; padding: .5rem .65rem !important; border-radius: .6rem; border: 1px solid transparent; text-decoration: none !important; color: #14120f !important; text-transform: none !important; letter-spacing: 0 !important; white-space: normal !important; transition: background .2s ease, border-color .2s ease, transform .2s ease; }
        .iv-dropdown-link:hover { background: #f2ede4; border-color: rgba(20,18,15,.14); transform: translateY(-1px); }
        .iv-dropdown-link-top { display: flex; align-items: center; justify-content: space-between; gap: .5rem; margin-bottom: .12rem; }
        .iv-dropdown-link-top strong { color: #14120f; font-family: 'Jost', 'Readex Pro', sans-serif; font-size: .8rem; font-weight: 600; letter-spacing: 0; line-height: 1.25; }
        .iv-dropdown-link-top em { font-style: normal; padding: .14rem .42rem; border-radius: 999px; background: rgba(20,18,15,.07); color: #55504a; font-size: .44rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; flex-shrink: 0; }
        .iv-dropdown-link > span { display: block; color: rgba(20,18,15,.62); font-size: .68rem; font-weight: 400; line-height: 1.35; }
        .iv-mobile-backdrop { position: fixed; inset: 0; z-index: 130; background: rgba(14,13,11,.55); backdrop-filter: blur(5px); -webkit-backdrop-filter: blur(5px); opacity: 0; visibility: hidden; pointer-events: none; transition: opacity .26s ease, visibility .26s ease; }
        .iv-mobile-backdrop.is-open { opacity: 1; visibility: visible; pointer-events: auto; }
        .iv-mobile-menu { position: fixed !important; top: 5.1rem !important; right: .85rem !important; left: .85rem !important; bottom: auto !important; z-index: 135 !important; max-height: calc(100svh - 6rem) !important; padding: 1rem 1.05rem 1.15rem !important; border-radius: 1.15rem !important; background: #fbf8f2 !important; box-shadow: 0 24px 60px rgba(10,9,8,.34) !important; overscroll-behavior: contain; -webkit-overflow-scrolling: touch; }
        @media (max-width: 650px) {
          .iv-mobile-menu { top: 4.8rem !important; right: .75rem !important; left: .75rem !important; max-height: calc(100svh - 5.6rem) !important; padding: .95rem 1rem 1.1rem !important; }
        }
        .iv-mobile-lang { margin-bottom: .75rem !important; padding-bottom: .75rem !important; }
        .iv-mobile-lang .iv-lang-btn { padding: .48rem .75rem !important; font-size: .7rem !important; }
        .iv-mobile-menu nav { display: flex !important; flex-direction: column !important; gap: .12rem !important; }
        .iv-mobile-row, .iv-mobile-menu nav > a:not(.iv-mobile-cta):not(.iv-mobile-cta-btn) { width: 100% !important; display: flex !important; align-items: center !important; justify-content: space-between !important; padding: .66rem .35rem !important; border: 0 !important; border-bottom: 1px solid rgba(20,18,15,.1) !important; background: transparent !important; color: #14120f !important; font-family: 'Jost', 'Readex Pro', sans-serif !important; font-size: .82rem !important; font-weight: 600 !important; letter-spacing: .06em !important; line-height: 1.3 !important; text-transform: uppercase !important; text-decoration: none !important; cursor: pointer !important; box-sizing: border-box !important; }
        .iv-mobile-group.is-open .iv-mobile-accordion-btn .iv-caret { transform: rotate(180deg); color: #a69b8b; }
        .iv-mobile-sublist { display: flex; flex-direction: column; gap: .28rem; margin-left: .2rem; padding: .35rem 0 .6rem .6rem; border-left: 2px solid #a69b8b; border-bottom: 1px solid rgba(20,18,15,.1); animation: iv-sublist-in .22s cubic-bezier(.23,1,.32,1) both; }
        [dir="rtl"] .iv-mobile-sublist { margin-left: 0; margin-right: .2rem; padding: .35rem .6rem .6rem 0; border-left: 0; border-right: 2px solid #a69b8b; }
        @keyframes iv-sublist-in { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }
        .iv-mobile-sublink { display: block !important; padding: .5rem .65rem !important; border-radius: .6rem !important; background: #f2ede4 !important; color: #14120f !important; text-decoration: none !important; text-transform: none !important; font-family: 'Jost', 'Tajawal', sans-serif !important; border: 1px solid rgba(20,18,15,.08) !important; }
        .iv-mobile-sublink-top { display: flex; align-items: center; justify-content: space-between; gap: .4rem; margin-bottom: .1rem; }
        .iv-mobile-sublink-top strong { font-family: 'Jost', 'Readex Pro', sans-serif !important; font-size: .8rem !important; font-weight: 600 !important; color: #14120f !important; line-height: 1.22 !important; }
        .iv-mobile-sublink-top em { font-style: normal; padding: .12rem .4rem; border-radius: 999px; background: rgba(20,18,15,.08); color: #55504a; font-size: .45rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase; }
        .iv-mobile-sublink small { display: block; font-size: .7rem !important; color: rgba(20,18,15,.65); line-height: 1.3; font-weight: 400; }
        .iv-mobile-cta-btn, .iv-mobile-menu nav a.iv-mobile-cta { width: 100% !important; margin-top: .7rem !important; padding: .82rem 1rem !important; border: 0 !important; border-radius: 999px !important; background: #14120f !important; color: #f2ede4 !important; font-family: 'Jost', 'Readex Pro', sans-serif !important; font-size: .72rem !important; font-weight: 700 !important; letter-spacing: .1em !important; text-transform: uppercase !important; display: inline-flex !important; align-items: center !important; justify-content: center !important; gap: .45rem !important; text-decoration: none !important; box-sizing: border-box !important; }
        .seo-reveal { opacity: 0; transform: translateY(18px); transition: opacity .58s cubic-bezier(.23,1,.32,1), transform .58s cubic-bezier(.23,1,.32,1); }
        .seo-reveal.is-visible { opacity: 1; transform: translateY(0); }
        [dir="rtl"] .iv-mega-col { padding-right: 0; padding-left: .8rem; border-right: 0; border-left: 1px solid rgba(20,18,15,.1); }
        [dir="rtl"] .iv-mega-col:last-child { padding-left: 0; border-left: 0; }
        [dir="rtl"] .iv-dropdown-link { text-align: right; }
        html[lang^="ar"] body, [dir="rtl"] body, [dir="rtl"] p, [dir="rtl"] li { font-family: 'Tajawal', 'IBM Plex Sans Arabic', sans-serif !important; }
        html[lang^="ar"] h1, html[lang^="ar"] h2, [dir="rtl"] h1, [dir="rtl"] h2 { font-family: 'Noto Kufi Arabic', 'Cairo', sans-serif !important; font-weight: 700 !important; }
        html[lang^="ar"] h1 em, html[lang^="ar"] h2 em, [dir="rtl"] h1 em, [dir="rtl"] h2 em { font-family: 'Amiri', serif !important; font-style: italic !important; font-weight: 700 !important; }
        html[lang^="ar"] h3, html[lang^="ar"] .iv-header, html[lang^="ar"] .eyebrow, html[lang^="ar"] .btn, [dir="rtl"] h3, [dir="rtl"] .iv-header, [dir="rtl"] .eyebrow, [dir="rtl"] .btn { font-family: 'Readex Pro', 'Cairo', sans-serif !important; }
      `;
      document.head.appendChild(style);
    }
  };

  const initHeaderAndFloating = () => {
    ensureFontsAndDropdownStyles();
    renderDesktopNav('fr');
    document.addEventListener('click', () => {
      document.querySelectorAll('.iv-nav-item.has-dropdown.is-open').forEach((item) => {
        item.classList.remove('is-open');
        const btn = item.querySelector('.iv-nav-trigger');
        if (btn) btn.setAttribute('aria-expanded', 'false');
      });
    });

    const header = document.querySelector('.page-header, .iv-header');
    const menuBtn = document.querySelector('.iv-menu-button');
    const mobileMenu = document.querySelector('.iv-mobile-menu');
    let mobileBackdrop = document.querySelector('.iv-mobile-backdrop');
    if (!mobileBackdrop && mobileMenu && mobileMenu.parentNode) {
      mobileBackdrop = document.createElement('div');
      mobileBackdrop.className = 'iv-mobile-backdrop';
      mobileBackdrop.setAttribute('aria-hidden', 'true');
      mobileMenu.parentNode.insertBefore(mobileBackdrop, mobileMenu);
    }

    const updateScroll = () => {
      const scrolled = window.scrollY > 24;
      if (header) {
        header.classList.toggle('is-scrolled', scrolled || Boolean(mobileMenu && mobileMenu.classList.contains('is-open')));
      }
      if (topBtn) {
        topBtn.classList.toggle('is-visible', window.scrollY > 360);
      }
    };

    const setMenuOpen = (open) => {
      if (!menuBtn || !mobileMenu) return;
      menuBtn.classList.toggle('is-open', open);
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      mobileMenu.classList.toggle('is-open', open);
      mobileMenu.hidden = !open;
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      if (mobileBackdrop) {
        mobileBackdrop.classList.toggle('is-open', open);
      }
      document.body.classList.toggle('iv-menu-open', open);
      document.body.style.overflow = open ? 'hidden' : '';
      updateScroll();
    };

    if (menuBtn && mobileMenu) {
      mobileMenu.hidden = true;
      menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('is-open');
        setMenuOpen(!isOpen);
      });
      if (mobileBackdrop) {
        mobileBackdrop.addEventListener('click', () => setMenuOpen(false));
      }
      document.addEventListener('iv-close-mobile-menu', () => setMenuOpen(false));
      mobileMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => setMenuOpen(false));
      });
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
          setMenuOpen(false);
        }
      });
    }

    document.querySelectorAll('[data-lang-switch]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const targetLang = btn.getAttribute('data-lang-switch') || 'fr';
        setLanguage(targetLang);
      });
    });

    const topBtn = document.createElement('button');
    topBtn.type = 'button';
    topBtn.className = 'iv-floating-top';
    topBtn.setAttribute('aria-label', 'Retour en haut');
    topBtn.innerHTML = '↑';
    topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    document.body.appendChild(topBtn);

    const waBtn = document.createElement('a');
    waBtn.href = 'https://wa.me/213563839404';
    waBtn.target = '_blank';
    waBtn.rel = 'noopener noreferrer';
    waBtn.className = 'iv-floating-wa';
    waBtn.setAttribute('aria-label', 'Discuter sur WhatsApp');
    waBtn.innerHTML = '<i aria-hidden="true"></i><span>WhatsApp</span>';
    document.body.appendChild(waBtn);

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    // Animations fluides au scroll sur mobile et desktop pour toutes les pages statiques
    if ('IntersectionObserver' in window) {
      const revealCandidates = document.querySelectorAll(
        '.service-grid article, .project, .steps article, .topic-grid a, .pf-project, .pf-design-card, .pf-reel-card, .pf-formats article'
      );
      const seoObs = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              seoObs.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: '0px 0px -20px 0px' }
      );
      revealCandidates.forEach((el) => {
        el.classList.add('seo-reveal');
        seoObs.observe(el);
      });
    }

    // Interactions Portfolio (filtres, mode Slide / Grille, et Lightbox Diaporama avec boutons Précédent / Suivant + Swipe)
    const filterButtons = document.querySelectorAll('[data-pf-filter]');
    const allPortfolioCards = document.querySelectorAll('[data-pf-cat]');
    const filterStatus = document.getElementById('pf-filter-status');
    if (filterButtons.length && allPortfolioCards.length) {
      filterButtons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const cat = btn.getAttribute('data-pf-filter') || 'all';
          filterButtons.forEach((b) => {
            const active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', active ? 'true' : 'false');
          });
          let visibleCount = 0;
          allPortfolioCards.forEach((card) => {
            const cardCat = card.getAttribute('data-pf-cat');
            const show = cat === 'all' || cardCat === cat;
            card.hidden = !show;
            if (show) visibleCount += 1;
          });
          document.querySelectorAll('.pf-showcase-section').forEach((sec) => {
            const visibleInSec = sec.querySelectorAll('[data-pf-cat]:not([hidden])').length;
            sec.hidden = visibleInSec === 0;
          });
          if (filterStatus) {
            const isAr = document.documentElement.lang === 'ar';
            filterStatus.textContent = isAr
              ? `${visibleCount} إبداعاً معروضاً`
              : `${visibleCount} création${visibleCount > 1 ? 's' : ''} affichée${visibleCount > 1 ? 's' : ''}`;
          }
        });
      });
    }

    // Ensure Lightbox Slider Modal exists on both portfolio pages
    let lightbox = document.getElementById('pf-lightbox');
    if (!lightbox && document.querySelector('.pf-project-zoom')) {
      lightbox = document.createElement('div');
      lightbox.className = 'pf-lightbox';
      lightbox.id = 'pf-lightbox';
      lightbox.hidden = true;
      lightbox.setAttribute('aria-hidden', 'true');
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', "Aperçu agrandi du projet");
      lightbox.innerHTML = `
        <div class="pf-lightbox-dialog">
          <div class="pf-lightbox-top">
            <div class="pf-lightbox-head-meta">
              <span class="pf-lightbox-badge" id="pf-lightbox-badge">SITE WEB</span>
              <strong id="pf-lightbox-title">Aperçu du projet</strong>
            </div>
            <div class="pf-lightbox-actions">
              <a class="pf-lightbox-btn" id="pf-lightbox-open" href="/" target="_blank" rel="noopener noreferrer">Visiter le site ↗</a>
              <button type="button" class="pf-lightbox-btn is-close" id="pf-lightbox-close" aria-label="Fermer l'aperçu">Fermer ✕</button>
            </div>
          </div>
          <div class="pf-lightbox-body" id="pf-lightbox-stage">
            <button type="button" class="pf-lightbox-arrow is-prev" id="pf-lightbox-prev" aria-label="Projet précédent">←</button>
            <div class="pf-lightbox-media">
              <img id="pf-lightbox-img" src="/images/project-dc16.webp" alt="" />
              <div id="pf-lightbox-video-wrap" class="pf-lightbox-video-wrap" hidden></div>
            </div>
            <button type="button" class="pf-lightbox-arrow is-next" id="pf-lightbox-next" aria-label="Projet suivant">→</button>
          </div>
          <div class="pf-lightbox-bottom">
            <button type="button" class="pf-lightbox-nav-btn" id="pf-lightbox-prev-mobile" aria-label="Précédent">
              <span aria-hidden="true">←</span>
              <span data-pf-lb-prev-text>Précédent</span>
            </button>
            <div class="pf-lightbox-status">
              <span class="pf-lightbox-counter" id="pf-lightbox-counter">01 / 08</span>
              <small class="pf-lightbox-hint" id="pf-lightbox-hint">Glissez ou cliquez pour naviguer</small>
            </div>
            <button type="button" class="pf-lightbox-nav-btn is-primary" id="pf-lightbox-next-mobile" aria-label="Suivant">
              <span data-pf-lb-next-text>Suivant</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      `;
      document.body.appendChild(lightbox);
    }

    const lightboxImg = document.getElementById('pf-lightbox-img');
    const lightboxVideoWrap = document.getElementById('pf-lightbox-video-wrap');
    const lightboxBadge = document.getElementById('pf-lightbox-badge');
    const lightboxTitle = document.getElementById('pf-lightbox-title');
    const lightboxOpen = document.getElementById('pf-lightbox-open');
    const lightboxClose = document.getElementById('pf-lightbox-close');
    const lightboxPrev = document.getElementById('pf-lightbox-prev');
    const lightboxNext = document.getElementById('pf-lightbox-next');
    const lightboxPrevMobile = document.getElementById('pf-lightbox-prev-mobile');
    const lightboxNextMobile = document.getElementById('pf-lightbox-next-mobile');
    const lightboxCounter = document.getElementById('pf-lightbox-counter');
    const lightboxStage = document.getElementById('pf-lightbox-stage');

    if (lightbox && lightboxImg) {
      let currentPlaylist = [];
      let currentSlideIndex = 0;

      const buildPortfolioPlaylist = (scopeSelector) => {
        const items = [];
        const root = scopeSelector ? document.querySelector(scopeSelector) || document : document;
        // 1. Social Media Design cards + Video Reel cards in DOM order
        const cards = root.querySelectorAll('.pf-design-card:not([hidden]), .pf-reel-card:not([hidden])');
        if (cards.length > 0) {
          cards.forEach((card) => {
            if (card.classList.contains('pf-design-card')) {
              const thumb = card.querySelector('.pf-design-thumb[data-lightbox-src]');
              const badgeEl = card.querySelector('.pf-card-badge');
              if (thumb) {
                items.push({
                  el: thumb,
                  type: 'image',
                  src: thumb.getAttribute('data-lightbox-src') || '',
                  link: thumb.getAttribute('data-lightbox-link') || '#',
                  title: thumb.getAttribute('data-lightbox-title') || 'Création iVISION',
                  badge: badgeEl ? badgeEl.textContent.trim() : 'DESIGN',
                  openLabel: document.documentElement.lang === 'ar' ? 'الجودة الأصلية ↗' : 'Qualité originale ↗',
                });
              }
            } else if (card.classList.contains('pf-reel-card')) {
              const stage = card.querySelector('.pf-reel-stage[data-drive-video]');
              const titleEl = card.querySelector('h3');
              const badgeEl = card.querySelector('.pf-card-badge');
              const extEl = card.querySelector('.pf-reel-ext');
              if (stage) {
                const videoId = stage.getAttribute('data-drive-video') || '';
                items.push({
                  el: stage,
                  type: 'video',
                  videoId,
                  link: extEl ? extEl.href : `https://drive.google.com/file/d/${videoId}/view`,
                  title: titleEl ? titleEl.textContent.trim() : 'Reel iVISION',
                  badge: badgeEl ? badgeEl.textContent.trim() : 'REEL 9:16',
                  openLabel: document.documentElement.lang === 'ar' ? 'فتح الفيديو ↗' : 'Ouvrir sur Drive ↗',
                });
              }
            }
          });
          return items;
        }

        // 2. Website Portfolio projects (.pf-project)
        const webProjects = root.querySelectorAll('.pf-project');
        webProjects.forEach((proj) => {
          const zoom = proj.querySelector('.pf-project-zoom');
          const titleEl = proj.querySelector('h2');
          const catEl = proj.querySelector('.pf-project-meta span:nth-child(2)');
          const visitLink = proj.querySelector('.pf-project-actions a[href^="http"]');
          if (zoom) {
            items.push({
              el: zoom,
              type: 'image',
              src: zoom.getAttribute('href') || '',
              link: visitLink ? visitLink.href : zoom.getAttribute('href') || '#',
              title: titleEl ? titleEl.textContent.trim() : 'Projet Web iVISION',
              badge: catEl ? catEl.textContent.trim() : 'SITE WEB',
              openLabel: document.documentElement.lang === 'ar' ? 'زيارة الموقع ↗' : 'Visiter le site ↗',
            });
          }
        });
        return items;
      };

      const renderLightboxSlide = (index) => {
        if (!currentPlaylist.length) return;
        const total = currentPlaylist.length;
        currentSlideIndex = ((index % total) + total) % total;
        const item = currentPlaylist[currentSlideIndex];

        if (lightboxBadge) lightboxBadge.textContent = item.badge || 'PORTFOLIO';
        if (lightboxTitle) lightboxTitle.textContent = item.title || 'Création iVISION';
        if (lightboxOpen) {
          lightboxOpen.href = item.link || '#';
          if (item.openLabel) lightboxOpen.textContent = item.openLabel;
        }
        if (lightboxCounter) {
          lightboxCounter.textContent = `${String(currentSlideIndex + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;
        }

        const isAr = document.documentElement.lang === 'ar';
        const prevText = lightbox.querySelector('[data-pf-lb-prev-text]');
        const nextText = lightbox.querySelector('[data-pf-lb-next-text]');
        if (prevText) prevText.textContent = isAr ? 'السابق' : 'Précédent';
        if (nextText) nextText.textContent = isAr ? 'التالي' : 'Suivant';

        if (item.type === 'video' && lightboxVideoWrap) {
          lightboxImg.hidden = true;
          lightboxVideoWrap.hidden = false;
          lightboxVideoWrap.innerHTML = `<iframe src="https://drive.google.com/file/d/${item.videoId}/preview" allow="autoplay; fullscreen" allowfullscreen title="${item.title.replace(/"/g, '&quot;')}"></iframe>`;
        } else {
          if (lightboxVideoWrap) {
            lightboxVideoWrap.hidden = true;
            lightboxVideoWrap.innerHTML = '';
          }
          lightboxImg.hidden = false;
          lightboxImg.src = item.src;
          lightboxImg.alt = item.title;
        }
      };

      const openLightboxWithElement = (triggerEl, scopeSelector) => {
        currentPlaylist = buildPortfolioPlaylist(scopeSelector);
        if (!currentPlaylist.length) {
          currentPlaylist = buildPortfolioPlaylist();
        }
        const foundIdx = currentPlaylist.findIndex((item) => item.el === triggerEl);
        renderLightboxSlide(foundIdx >= 0 ? foundIdx : 0);
        lightbox.hidden = false;
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      };

      const closeLightbox = () => {
        lightbox.hidden = true;
        lightbox.setAttribute('aria-hidden', 'true');
        if (lightboxVideoWrap) {
          lightboxVideoWrap.innerHTML = '';
          lightboxVideoWrap.hidden = true;
        }
        document.body.style.overflow = '';
      };

      const stepSlide = (delta) => {
        if (lightbox.hidden || !currentPlaylist.length) return;
        renderLightboxSlide(currentSlideIndex + delta);
      };

      // Click on Social Media Design visuals
      document.querySelectorAll('.pf-design-thumb[data-lightbox-src]').forEach((thumb) => {
        thumb.addEventListener('click', () => {
          openLightboxWithElement(thumb);
        });
      });

      // Click on Video Reels (opens in Lightbox Slider so user can go to next/prev Reel or photo without exiting!)
      document.querySelectorAll('.pf-reel-stage[data-drive-video]').forEach((stage) => {
        const playBtn = stage.querySelector('.pf-reel-play');
        const target = playBtn || stage;
        target.addEventListener('click', (e) => {
          e.preventDefault();
          openLightboxWithElement(stage);
        });
      });

      // Click on Website Portfolio zoom links
      document.querySelectorAll('.pf-project-zoom').forEach((zoomLink) => {
        zoomLink.addEventListener('click', (e) => {
          e.preventDefault();
          openLightboxWithElement(zoomLink);
        });
      });

      if (lightboxPrev) lightboxPrev.addEventListener('click', () => stepSlide(-1));
      if (lightboxNext) lightboxNext.addEventListener('click', () => stepSlide(1));
      if (lightboxPrevMobile) lightboxPrevMobile.addEventListener('click', () => stepSlide(-1));
      if (lightboxNextMobile) lightboxNextMobile.addEventListener('click', () => stepSlide(1));
      if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
      });

      window.addEventListener('keydown', (e) => {
        if (lightbox.hidden) return;
        if (e.key === 'Escape') closeLightbox();
        else if (e.key === 'ArrowLeft') stepSlide(-1);
        else if (e.key === 'ArrowRight') stepSlide(1);
      });

      // Touch swipe left / right inside Lightbox
      let touchStartX = 0;
      let touchStartY = 0;
      const swipeTarget = lightboxStage || lightbox;
      swipeTarget.addEventListener(
        'touchstart',
        (e) => {
          if (!e.touches || !e.touches[0]) return;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        },
        { passive: true }
      );
      swipeTarget.addEventListener(
        'touchend',
        (e) => {
          if (!e.changedTouches || !e.changedTouches[0]) return;
          const dx = e.changedTouches[0].clientX - touchStartX;
          const dy = e.changedTouches[0].clientY - touchStartY;
          if (Math.abs(dx) > 42 && Math.abs(dx) > Math.abs(dy)) {
            if (dx < 0) stepSlide(1);
            else stepSlide(-1);
          }
        },
        { passive: true }
      );

      // Inject inline section Slider / Grille controls above .pf-design-grid and .pf-reel-grid
      document.querySelectorAll('.pf-design-grid, .pf-reel-grid').forEach((grid) => {
        const section = grid.closest('.pf-showcase-section');
        if (!section || section.querySelector('.pf-section-slider-bar')) return;
        const bar = document.createElement('div');
        bar.className = 'pf-section-slider-bar';
        bar.innerHTML = `
          <div class="pf-section-slider-left">
            <button type="button" class="pf-view-toggle-btn is-active" data-pf-view="grid">Vue Grille</button>
            <button type="button" class="pf-view-toggle-btn" data-pf-view="slider">Mode Slide ↔</button>
            <button type="button" class="pf-open-diaporama-btn" data-pf-open-diaporama>Diaporama plein écran ▶</button>
          </div>
          <div class="pf-section-slider-right">
            <button type="button" class="pf-slide-step-btn" data-pf-scroll="-1" aria-label="Faire défiler vers la gauche">← Précédent</button>
            <button type="button" class="pf-slide-step-btn" data-pf-scroll="1" aria-label="Faire défiler vers la droite">Suivant →</button>
          </div>
        `;
        grid.parentNode.insertBefore(bar, grid);

        const viewBtns = bar.querySelectorAll('[data-pf-view]');
        const setGridMode = (mode) => {
          const isSlider = mode === 'slider';
          grid.classList.toggle('is-slider', isSlider);
          viewBtns.forEach((b) => {
            b.classList.toggle('is-active', b.getAttribute('data-pf-view') === mode);
          });
        };
        viewBtns.forEach((b) => {
          b.addEventListener('click', () => setGridMode(b.getAttribute('data-pf-view') || 'grid'));
        });

        bar.querySelectorAll('[data-pf-scroll]').forEach((scrollBtn) => {
          scrollBtn.addEventListener('click', () => {
            const dir = Number(scrollBtn.getAttribute('data-pf-scroll')) || 1;
            if (!grid.classList.contains('is-slider')) {
              setGridMode('slider');
            }
            const firstVisibleCard = grid.querySelector('[data-pf-cat]:not([hidden])');
            const stepWidth = firstVisibleCard ? firstVisibleCard.getBoundingClientRect().width + 16 : 300;
            grid.scrollBy({ left: dir * stepWidth, behavior: 'smooth' });
          });
        });

        const diaporamaBtn = bar.querySelector('[data-pf-open-diaporama]');
        if (diaporamaBtn) {
          diaporamaBtn.addEventListener('click', () => {
            const firstTrigger = grid.querySelector(
              '.pf-design-card:not([hidden]) .pf-design-thumb[data-lightbox-src], .pf-reel-card:not([hidden]) .pf-reel-stage[data-drive-video]'
            );
            if (firstTrigger) {
              openLightboxWithElement(firstTrigger, `#${section.id}`);
            }
          });
        }
      });
    }

    let saved = 'fr';
    try {
      saved = localStorage.getItem(STORAGE_KEY) || 'fr';
    } catch {
      saved = 'fr';
    }
    if (saved === 'ar') {
      setLanguage('ar');
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeaderAndFloating);
  } else {
    initHeaderAndFloating();
  }
})();
