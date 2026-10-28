import { useState, useEffect } from 'react';
import { blogPosts, getBlogCategories, type BlogPost } from '../data/blog-posts';
import { updateSEO } from '../lib/seo-utils';
import { getCanonicalUrl } from '../lib/router';
import arabicPosts from '../public/blog/ar.json';

const arPosts: Record<string, { title: string; excerpt: string; content: string }> = arabicPosts;
const arCategories: Record<string, string> = { 'Marketing Digital': 'التسويق الرقمي', Design: 'التصميم', SEO: 'تحسين محركات البحث', 'Social Media': 'شبكات التواصل', 'E-commerce': 'التجارة الإلكترونية', Branding: 'الهوية التجارية', Publicite: 'الإعلانات', 'Intelligence Artificielle': 'الذكاء الاصطناعي', Performance: 'الأداء' }; 

const newGuides = [
  { slug: 'strategie-marketing-digital-algerie', category: 'Marketing Digital', title: 'Stratégie marketing digital en Algérie : construire un plan efficace', excerpt: 'Objectifs, audience, canaux et calcul du coût par demande.', image: '/images/blog-marketing.webp' },
  { slug: 'creation-contenu-reseaux-sociaux-algerie', category: 'Social Media', title: 'Création de contenu pour les réseaux sociaux en Algérie', excerpt: 'Idées de contenu, calendrier éditorial et calcul du taux d’engagement.', image: '/images/blog-contenu.webp' },
  { slug: 'budget-publicite-meta-google-ads-algerie', category: 'Publicite', title: 'Budget Meta Ads et Google Ads en Algérie : calculer et mesurer', excerpt: 'CPC, coût par prospect et ROAS expliqués avec des exemples.', image: '/images/blog-publicite.webp' },
  { slug: 'seo-site-web-algerie-mots-cles', category: 'SEO', title: 'SEO en Algérie : choisir les mots-clés pour son site web', excerpt: 'Une méthode pour organiser vos mots-clés et mesurer votre taux de clic.', image: '/images/blog-seo.webp' },
];

const BlogList = ({ language = 'fr' }: { language?: string }) => {
  const isAr = language === 'ar';
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getBlogCategories();

  useEffect(() => {
    updateSEO({
      title: isAr ? 'مدونة التسويق الرقمي وصناعة المحتوى' : 'Blog marketing digital, contenu et SEO',
      description: isAr ? 'مقالات عملية حول التسويق الرقمي وصناعة المحتوى والإعلانات في الجزائر.' : 'Guides pratiques et archives sur le marketing digital, la création de contenu et la publicité en Algérie.',
      canonical: getCanonicalUrl({ type: 'blog' }),
    });
  }, [isAr]);

  const filteredGuides = newGuides.filter((post) => {
    const query = searchQuery.trim().toLocaleLowerCase('fr');
    return (selectedCategory === 'all' || post.category === selectedCategory) &&
      (!query || `${post.title} ${post.excerpt} ${post.category} ${arPosts[post.slug]?.title || ''} ${arPosts[post.slug]?.excerpt || ''} ${arCategories[post.category] || ''}`.toLocaleLowerCase('fr').includes(query));
  });

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      `${arPosts[post.slug]?.title || ''} ${arPosts[post.slug]?.excerpt || ''} ${arCategories[post.category] || ''}`.includes(searchQuery.trim());
    return matchCategory && matchSearch;
  });

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-14 iv-reveal">
          <div className="iv-section-topline" style={{ padding: '1.5rem 0', marginBottom: '1.8rem' }}><span>{isAr ? 'المدونة' : 'Blog'}</span></div>
          <span className="iv-label">{isAr ? 'مجلة آي فيجن' : 'LE JOURNAL IVISION'}</span>
          <h1 className="text-[clamp(2.6rem,6vw,5.6rem)] font-medium text-navy dark:text-white mb-6 tracking-[-0.02em] leading-[.98]">
            {isAr ? <>أفكار <span className="text-brand-blue">ونصائح</span></> : <>Idées & <span className="text-brand-blue">conseils</span></>}
          </h1>
          <p className="text-brand-gray dark:text-brand-gray/80 text-lg max-w-2xl">
            {isAr ? 'التسويق الرقمي، صناعة المحتوى، الإعلانات ومواقع الويب: اكتشف مقالات تساعدك على تطوير مشروعك.' : 'Marketing digital, création de contenu, publicité et sites web : découvrez nos articles pour faire avancer votre projet.'}
          </p>
        </div>

        <nav aria-label="Pages de services actuelles" className="flex flex-wrap gap-4 border-y border-navy/15 dark:border-white/20 py-6 mb-12 text-navy dark:text-white">
          <a href="/agence-marketing-digital-algerie.html">{isAr ? 'التسويق الرقمي' : 'Marketing digital'} ↗</a>
          <a href="/creation-contenu-algerie.html">{isAr ? 'إنشاء المحتوى' : 'Création de contenu'} ↗</a>
          <a href="/publicite-meta-google-ads-algerie.html">{isAr ? 'إعلانات Meta وGoogle' : 'Meta & Google Ads'} ↗</a>
          <a href="/creation-site-web-algerie.html">{isAr ? 'إنشاء المواقع' : 'Création de sites web'} ↗</a>
        </nav>

        <section className="blog-filters" aria-label={isAr ? 'البحث وتصفية المقالات' : 'Rechercher et filtrer les articles'}>
          <div className="blog-filter-top">
            <label className="blog-search" htmlFor="blog-search">
              <span className="blog-filter-label">{isAr ? 'بحث' : 'RECHERCHER'}</span>
              <span className="blog-search-field">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 4 4" /></svg>
                <input id="blog-search" type="search" placeholder={isAr ? 'موضوع أو كلمة مفتاحية…' : 'Un sujet, un mot-clé…'} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              </span>
            </label>
            <p className="blog-result-count" aria-live="polite">{filteredGuides.length + filteredPosts.length} {isAr ? 'مقال' : `article${filteredGuides.length + filteredPosts.length !== 1 ? 's' : ''}`}</p>
          </div>
          <div className="blog-categories" role="group" aria-label={isAr ? 'تصفية حسب الفئة' : 'Filtrer par catégorie'}>
            <span className="blog-filter-label">{isAr ? 'التصنيفات' : 'CATÉGORIES'}</span>
            <div className="blog-category-list">
              <button type="button" className="blog-category" aria-pressed={selectedCategory === 'all'} onClick={() => setSelectedCategory('all')}>{isAr ? 'الكل' : 'Tous'}</button>
              {categories.map((cat) => (
                <button key={cat} type="button" className="blog-category" aria-pressed={selectedCategory === cat} onClick={() => setSelectedCategory(cat)}>{isAr ? arCategories[cat] || cat : cat === 'Publicite' ? 'Publicité' : cat}</button>
              ))}
            </div>
          </div>
        </section>

        {filteredPosts.length === 0 && filteredGuides.length === 0 ? (
          <div className="text-center py-20"><p className="text-brand-gray text-lg">{isAr ? 'لم يتم العثور على مقالات.' : 'Aucun article trouvé.'}</p></div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredGuides.map((guide) => (
              <a key={guide.slug} href={`/blog/${guide.slug}.html`} className="group block bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-[.55rem] overflow-hidden hover:border-navy/30 transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">
                <div className="h-48 overflow-hidden"><img src={guide.image} alt="" loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" /></div>
                <div className="p-6"><span className="text-xs font-bold uppercase tracking-wider text-brand-gray">{isAr ? arCategories[guide.category] || guide.category : guide.category}</span><h2 className="text-navy dark:text-white text-xl font-medium mt-3 mb-2">{isAr ? arPosts[guide.slug]?.title || guide.title : guide.title}</h2><p className="text-brand-gray text-sm mb-4">{isAr ? arPosts[guide.slug]?.excerpt || guide.excerpt : guide.excerpt}</p><span className="text-navy dark:text-white text-sm font-semibold">{isAr ? 'اقرأ المقال ←' : 'Lire l’article ↗'}</span></div>
              </a>
            ))}
            {filteredPosts.map((post) => <BlogCard key={post.id} post={post} isAr={isAr} />)}
          </div>
        )}
      </div>
    </section>
  );
};

const BlogCard = ({ post, isAr }: { post: BlogPost; isAr: boolean }) => {
  // Monochrome éditorial : une seule pastille d'encre pour toutes les catégories
  const categoryColors: Record<string, string> = {
    'Marketing Digital': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'Design': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'SEO': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'Social Media': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'E-commerce': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'Branding': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'Publicité': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'Intelligence Artificielle': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
    'Performance': 'bg-navy/5 text-navy/70 dark:bg-white/10 dark:text-white/70',
  };

  return (
    <a
      href={`/#/blog/${post.slug}`}
      className="group block bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-[.55rem] overflow-hidden cursor-pointer hover:border-navy/30 hover:shadow-[0_1rem_2.5rem_rgba(20,18,15,.08)] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image placeholder */}
     <div className="h-48 overflow-hidden">
  <img loading="lazy" decoding="async"
    src={post.image} 
    alt={isAr ? arPosts[post.slug]?.title || post.title : post.title}
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
</div>
      <div className="p-6">
        {/* Category + Read Time */}
        <div className="flex items-center justify-between mb-3">
          <span className="px-2.5 py-1 rounded-none text-[10px] font-bold uppercase tracking-[.14em] border border-navy/10 text-brand-gray">
            {isAr ? arCategories[post.category] || post.category : post.category}
          </span>
          <span className="text-brand-gray/60 text-xs">{isAr ? post.readTime.replace('min', 'دقائق') : post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-navy dark:text-white font-medium text-xl tracking-[-0.01em] mb-2 group-hover:text-brand-blue transition line-clamp-2">
          {isAr ? arPosts[post.slug]?.title || post.title : post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-brand-gray dark:text-brand-gray/80 text-sm mb-4 line-clamp-3">
          {isAr ? arPosts[post.slug]?.excerpt || post.excerpt : post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-navy/5 dark:border-white/10">
          <span className="text-brand-gray/60 text-xs">{isAr ? 'فريق iVISION' : post.author}</span>
          <span className="text-brand-gray/60 text-xs">
            {new Date(post.date).toLocaleDateString(isAr ? 'ar-DZ' : 'fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </a>
  );
};

export default BlogList;
