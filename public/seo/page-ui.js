(() => {
  const STORAGE_KEY = 'ivision-lang-selected';
  const originalHtml = new WeakMap();
  const originalAttrs = new WeakMap();

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

  const trackedElements = new Set();
  const track = (el) => {
    if (el) trackedElements.add(el);
    return el;
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
    'nav.work': 'أعمال المواقع',
    'nav.social': 'أعمال التواصل',
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
        'حسب نشاطك في الجزائر، يمكننا إعداد خط تحريري بالفرنسية أو بالعربية يتم تحديده في الملخص الأولي، مع توضيح الإنتاج وحقوق الاستخدام والمنصات قبل التنفيذ.',
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
      setHtml(doc, '.pf-kicker', 'iVISION / معرض التواصل الاجتماعي');
      setHtml(doc, '#page-title', 'معرض <em>التواصل الاجتماعي.</em>');
      setHtml(doc, '.pf-hero-copy > p:not(.pf-kicker)', 'هذه الصفحة مخصصة لإبداعات التواصل الاجتماعي التي تختار iVISION عرضها. ستُضاف مشاريع العملاء هنا بعد اعتماد التصاميم وطريقة تقديمها.');
      setAllHtml(doc, '.pf-hero-actions .btn', [
        'حالة المعرض <span aria-hidden="true">↓</span>',
        'اكتشف خدمة المحتوى <span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.pf-hero-art figcaption', 'صورة توضيحية للإنتاج / ليست حملة عميل');

      setHtml(doc, '#selection-title', 'مختارات نبنيها معاً.');
      setHtml(doc, '.pf-awaiting-intro p', 'ستأخذ التصاميم والفيديوهات المعتمدة مكانها هنا. حالياً، لا تعرض هذه الصفحة أي حملة عميل كعمل مكتمل: إنها مساحة معرض قيد التحضير.');
      setHtml(doc, '.pf-awaiting-mark strong', 'قريباً.');
      setHtml(doc, '.pf-awaiting-copy .eyebrow', 'مشاريع قادمة');
      setHtml(doc, '.pf-awaiting-copy h3', 'بدون حالات عملاء وهمية.');
      setHtml(doc, '.pf-awaiting-copy p:not(.eyebrow)', 'ننتظر الأعمال المرخصة لعرض الصور وسياق المشروع والروابط العامة عند توفرها، دون اختلاق أرقام وصول أو مبيعات.');
      setHtml(doc, '.pf-awaiting-copy .pf-project-link', 'تصفح الحسابات الرسمية للوكالة <span aria-hidden="true">↓</span>');

      setHtml(doc, '#formats .eyebrow', 'صيغ ممكنة / ليست مشاريع عملاء');
      setHtml(doc, '#formats-title', 'ما سنتمكن من تصفحه هنا.');
      setAllHtml(doc, '.pf-formats article', [
        '<span>01 / منشورات</span><h3>منشورات وكاروسيل.</h3><p>رسالة واضحة، تسلسل بصري وتصاميم ملائمة لشبكات التواصل.</p>',
        '<span>02 / فيديو قصير</span><h3>ريلز وصيغ عمودية.</h3><p>مقاطع مصممة لسرد قصة، إظهار استخدام أو شرح عرض.</p>',
        '<span>03 / تناسق</span><h3>إخراج بصري.</h3><p>عناصر تربط الحملة والحساب ومختلف صيغ النشر بهوية واحدة.</p>',
      ]);

      setHtml(doc, '#canaux .eyebrow', 'قنوات الوكالة');
      setHtml(doc, '#canaux-title', 'تابع iVISION حيث ننشر.');
      setHtml(doc, '#canaux .pf-public-grid > div:last-child > p', 'تقود هذه الروابط إلى الحسابات العامة للوكالة. سيتم إثراء المعرض بالأعمال المعتمدة تباعاً.');
      setAllHtml(doc, '.pf-cross-grid a', [
        '<small>الخدمة</small><strong>كيف نحضّر محتواك؟</strong><span aria-hidden="true">↗</span>',
        '<small>المعرض الآخر</small><strong>تصفح مواقع الويب المعروضة.</strong><span aria-hidden="true">↗</span>',
      ]);
      setHtml(doc, '.pf-contact .eyebrow', 'مشروعك على شبكات التواصل');
      setHtml(doc, '#contact-title', 'لنتحدث عما تريد روايته.');
      setHtml(doc, '.pf-contact p:not(.eyebrow)', 'اذكر نشاطك وقنواتك وأهدافك. سنحدد الصيغ وإدارة الحسابات معك.');
      setAllHtml(doc, '.pf-contact-actions .btn', [
        'راسل iVISION <span aria-hidden="true">↗</span>',
        'اطلب عرض سعر <span aria-hidden="true">↗</span>',
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

  const initHeaderAndFloating = () => {
    const header = document.querySelector('.page-header, .iv-header');
    const menuBtn = document.querySelector('.iv-menu-button');
    const mobileMenu = document.querySelector('.iv-mobile-menu');

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
      mobileMenu.setAttribute('aria-hidden', open ? 'false' : 'true');
      document.body.style.overflow = open ? 'hidden' : '';
      updateScroll();
    };

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        const isOpen = mobileMenu.classList.contains('is-open');
        setMenuOpen(!isOpen);
      });
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
