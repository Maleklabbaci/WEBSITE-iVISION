(() => {
  const key = 'ivision-lang-selected';
  const categories = { 'Marketing digital': 'التسويق الرقمي', 'Création de contenu': 'إنشاء المحتوى', 'Publicité digitale': 'الإعلانات الرقمية', 'SEO & site web': 'SEO ومواقع الويب', 'Marketing Digital': 'التسويق الرقمي', 'Design': 'التصميم', 'SEO': 'تحسين محركات البحث', 'Social Media': 'شبكات التواصل', 'E-commerce': 'التجارة الإلكترونية', 'Branding': 'الهوية التجارية', 'Publicite': 'الإعلانات', 'Intelligence Artificielle': 'الذكاء الاصطناعي', 'Performance': 'الأداء' };
  let lang = 'fr';
  try { lang = localStorage.getItem(key) === 'ar' ? 'ar' : 'fr'; } catch (_) { /* French fallback */ }
  const switcher = document.querySelector('.blog-lang-switch');
  switcher?.querySelectorAll('button').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    button.addEventListener('click', () => {
      try { localStorage.setItem(key, button.dataset.lang); } catch (_) { /* storage unavailable */ }
      location.reload();
    });
  });
  if (lang !== 'ar') return;
  fetch('/blog/ar.json').then(response => {
    if (!response.ok) throw new Error('Translations unavailable');
    return response.json();
  }).then(posts => {
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    document.querySelectorAll('header nav > a').forEach(link => {
      const href = link.getAttribute('href');
      const labels = { '/blog/': 'المدونة', '/agence-marketing-digital-algerie.html': 'التسويق الرقمي', '/creation-contenu-algerie.html': 'إنشاء المحتوى', '/#/devis': 'اطلب عرض سعر ↗' };
      if (labels[href]) link.textContent = labels[href];
    });
    const filename = location.pathname.split('/').pop() || '';
    const slug = filename.replace(/\.html$/, '');
    const post = posts[slug];
    if (post) {
      document.title = `${post.title} | iVISION`;
      document.querySelector('main > .wrap > a').textContent = '→ جميع المقالات';
      const label = document.querySelector('main > .wrap > .label');
      if (label) label.textContent = `${categories[label.textContent.split(' · ')[0]] || ''} · ٢٨ أكتوبر ٢٠٢٦`;
      document.querySelector('main h1').textContent = post.title;
      document.querySelector('main .intro').textContent = post.excerpt;
      const image = document.querySelector('.hero-img');
      if (image) image.alt = post.title;
      document.querySelector('.article').innerHTML = post.content;
      document.querySelector('.cta h2').textContent = 'هل لديك مشروع تريد تطويره؟';
      document.querySelector('.cta p').textContent = 'لنتحدث عن أهدافك والخطوات المناسبة لنشاطك.';
      document.querySelector('.cta a').textContent = 'صف مشروعك ←';
      document.querySelector('.related > h2').textContent = 'واصل القراءة';
    } else if (!filename || filename === 'index.html') {
      document.title = 'مدونة التسويق الرقمي وصناعة المحتوى في الجزائر | iVISION';
      document.querySelector('main > .wrap > .label').textContent = 'مجلة آي فيجن';
      document.querySelector('main h1').textContent = 'أفكار تساعد علامتك على التقدم.';
      document.querySelector('main .intro').textContent = 'التسويق الرقمي، صناعة المحتوى، الإعلانات ومواقع الويب: مقالات وأفكار عملية لمشاريعك في الجزائر.';
    }
    document.querySelectorAll('.card').forEach(card => {
      const href = card.getAttribute('href') || '';
      const cardSlug = href.split('/').pop().replace(/\.html$/, '');
      const data = posts[cardSlug];
      if (!data) return;
      const label = card.querySelector('.label');
      if (label) label.textContent = categories[label.textContent] || label.textContent;
      const title = card.querySelector('h2, h3');
      if (title) title.textContent = data.title;
      const excerpt = card.querySelector('p');
      if (excerpt) excerpt.textContent = data.excerpt;
      const image = card.querySelector('img');
      if (image && image.alt) image.alt = data.title;
    });
    document.querySelectorAll('footer a').forEach(link => {
      const labels = { '/': 'الرئيسية', '/blog/': 'المدونة', '/creation-site-web-algerie.html': 'المواقع الإلكترونية', '/publicite-meta-google-ads-algerie.html': 'الإعلانات' };
      if (labels[link.getAttribute('href')]) link.textContent = labels[link.getAttribute('href')];
    });
  }).catch(() => { /* Keep the original French content when translations cannot load. */ });
})();
