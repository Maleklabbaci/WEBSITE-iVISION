import { useState, useEffect } from 'react';
import { blogPosts, getBlogCategories, type BlogPost } from '../data/blog-posts';
import { navigate } from '../lib/router';
import { updateSEO } from '../lib/seo-utils';

const BlogList = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const categories = getBlogCategories();

  useEffect(() => {
    updateSEO({
      title: 'Blog - Actualités Marketing Digital & Web',
      description: 'Articles, guides et conseils sur le marketing digital, le web design, le SEO et le branding en Algérie. Par iVISION Agency.',
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
    <section className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-purple-400 text-sm font-semibold tracking-widest uppercase">
            Notre Blog
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mt-4 mb-6">
            Insights & <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Stratégies</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
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
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-5 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selectedCategory === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              Tous
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
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
            <p className="text-gray-500 text-lg">Aucun article trouvé.</p>
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
    'Marketing Digital': 'bg-blue-500/20 text-blue-400',
    'Design': 'bg-pink-500/20 text-pink-400',
    'SEO': 'bg-green-500/20 text-green-400',
    'Social Media': 'bg-yellow-500/20 text-yellow-400',
    'E-commerce': 'bg-orange-500/20 text-orange-400',
    'Branding': 'bg-purple-500/20 text-purple-400',
    'Publicité': 'bg-red-500/20 text-red-400',
    'Intelligence Artificielle': 'bg-cyan-500/20 text-cyan-400',
    'Performance': 'bg-emerald-500/20 text-emerald-400',
  };

  return (
    <article
      onClick={() => navigate(`/blog/${post.slug}`)}
      className="group bg-white/5 border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:border-purple-500/50 hover:bg-white/[0.07] transition-all duration-300 hover:-translate-y-1"
    >
      {/* Image placeholder */}
      <div className="h-48 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center">
        <span className="text-5xl opacity-50">📝</span>
      </div>

      <div className="p-6">
        {/* Category + Read Time */}
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${categoryColors[post.category] || 'bg-white/10 text-gray-400'}`}>
            {post.category}
          </span>
          <span className="text-gray-500 text-xs">{post.readTime}</span>
        </div>

        {/* Title */}
        <h2 className="text-white font-bold text-lg mb-2 group-hover:text-purple-400 transition line-clamp-2">
          {post.title}
        </h2>

        {/* Excerpt */}
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10">
          <span className="text-gray-500 text-xs">{post.author}</span>
          <span className="text-gray-500 text-xs">
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
