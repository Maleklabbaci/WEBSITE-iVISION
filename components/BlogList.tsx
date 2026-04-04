import { useState, useEffect } from 'react';
import { blogPosts, getBlogCategories, type BlogPost } from '../data/blog-posts';
import { updateSEO } from '../lib/seo-utils';

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getBlogCategories();

  useEffect(() => {
    updateSEO({
      title: 'Blog - Actualités Marketing Digital & Web',
      description: 'Articles, guides et conseils sur le marketing digital, le web design, le SEO et le branding en Algérie.',
      keywords: 'blog marketing digital algérie, conseils web design, guide SEO algérie',
      canonical: 'https://ivision-agency.com/blog',
    });
  }, []);

  const filteredPosts = blogPosts.filter((post) => {
    const matchCategory = selectedCategory === 'all' || post.category === selectedCategory;
    const matchSearch =
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <section className="min-h-screen pt-32 pb-20 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-brand-blue text-sm font-semibold tracking-widest uppercase">
            Notre Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-black text-navy dark:text-white mt-4 mb-6 tracking-tighter">
            Insights & <span className="text-brand-blue">Stratégies</span>
          </h1>
          <p className="text-brand-gray dark:text-brand-gray/80 text-lg max-w-2xl mx-auto">
            Guides pratiques, analyses et conseils pour développer votre business en ligne en Algérie.
          </p>
        </div>

        {/* Search + Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-12">
          <input
            type="text"
            placeholder="Rechercher un article..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-2xl px-5 py-3 text-navy dark:text-white placeholder-brand-gray/50 focus:outline-none focus:border-brand-blue transition"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition ${
                selectedCategory === 'all'
                  ? 'bg-brand-blue text-white'
                  : 'bg-navy/5 dark:bg-white/5 text-brand-gray hover:bg-navy/10 dark:hover:bg-white/10'
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider transition ${
                  selectedCategory === cat
                    ? 'bg-brand-blue text-white'
                    : 'bg-navy/5 dark:bg-white/5 text-brand-gray hover:bg-navy/10 dark:hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-brand-gray text-lg">Aucun article trouvé.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

const BlogCard = ({ post }: { post: BlogPost }) => {
  const categoryColors: Record<string, string> = {
    'Marketing Digital': 'bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400',
    'Design': 'bg-pink-500/10 text-pink-600 dark:bg-pink-500/20 dark:text-pink-400',
    'SEO': 'bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400',
    'Social Media': 'bg-yellow-500/10 text-yellow-600 dark:bg-yellow-500/20 dark:text-yellow-400',
    'E-commerce': 'bg-orange-500/10 text-orange-600 dark:bg-orange-500/20 dark:text-orange-400',
    'Branding': 'bg-purple-500/10 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400',
    'Publicité': 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    'Intelligence Artificielle': 'bg-cyan-500/10 text-cyan-600 dark:bg-cyan-500/20 dark:text-cyan-400',
    'Performance': 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400',
  };

  return (
    <article
      onClick={() => (window.location.hash = `/blog/${post.slug}`)}
      className="group bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-[2rem] overflow-hidden cursor-pointer hover:border-brand-blue/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image placeholder */}
     <div className="h-48 overflow-hidden">
  <img 
    src={post.image} 
    alt={post.title}
    loading="lazy"
    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
  />
</div>
      <div className="p-6">
        {/* Category + Read Time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${categoryColors[post.category] || 'bg-navy/5 dark:bg-white/10 text-brand-gray'}`}>
            {post.category}
          </span>
          <span className="text-brand-gray/60 text-xs">{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-navy dark:text-white font-bold text-lg mb-2 group-hover:text-brand-blue transition line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-brand-gray dark:text-brand-gray/80 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-navy/5 dark:border-white/10">
          <span className="text-brand-gray/60 text-xs">{post.author}</span>
          <span className="text-brand-gray/60 text-xs">
            {new Date(post.date).toLocaleDateString('fr-FR', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </span>
        </div>
      </div>
    </article>
  );
};

export default BlogList;
