import { useEffect, useState } from 'react';
import { getBlogPost, getRelatedPosts, type BlogPost } from '../data/blog-posts';
import { navigate } from '../lib/router';
import { updateSEO, generateBlogSchema } from '../lib/seo-utils';

interface Props {
  slug: string;
}

const BlogPostPage = ({ slug }: Props) => {
  const [post, setPost] = useState<BlogPost | undefined>();
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const foundPost = getBlogPost(slug);
    setPost(foundPost);

    if (foundPost) {
      updateSEO({
        title: foundPost.title,
        description: foundPost.metaDescription,
        keywords: foundPost.tags.join(', '),
        ogType: 'article',
        ogImage: foundPost.image,
        canonical: `https://ivision-agency.com/blog/${foundPost.slug}`,
      });

      // Add schema markup
      const schema = generateBlogSchema(foundPost);
      let scriptTag = document.querySelector('#blog-schema');
      if (!scriptTag) {
        scriptTag = document.createElement('script');
        scriptTag.id = 'blog-schema';
        scriptTag.setAttribute('type', 'application/ld+json');
        document.head.appendChild(scriptTag);
      }
      scriptTag.textContent = JSON.stringify(schema);

      setRelatedPosts(getRelatedPosts(slug, 3));
    }

    window.scrollTo(0, 0);

    return () => {
      const s = document.querySelector('#blog-schema');
      if (s) s.remove();
    };
  }, [slug]);

  if (!post) {
    return (
      <section className="min-h-screen bg-black pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Article non trouvé</h1>
          <p className="text-gray-400 mb-8">Cet article n'existe pas ou a été déplacé.</p>
          <button
            onClick={() => navigate('/blog')}
            className="px-6 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-500 transition"
          >
            ← Retour au blog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-black pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate('/blog')}
          className="text-gray-400 hover:text-white transition mb-8 flex items-center gap-2"
        >
          ← Retour au blog
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime} de lecture</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-gray-400 text-sm">
            <span>Par {post.author}</span>
            <span>•</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
          </div>
        </header>

        {/* Hero Image Placeholder */}
        <div className="w-full h-64 md:h-96 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl mb-12 flex items-center justify-center">
          <span className="text-6xl opacity-30">📖</span>
        </div>

        {/* Content */}
        <article className="prose prose-invert prose-lg max-w-none mb-16">
          <div
            className="
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-12 [&_h1]:mb-6
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-white/10 [&_h2]:pb-3
              [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-gray-300 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:text-gray-300 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc
              [&_ol]:text-gray-300 [&_ol]:space-y-2 [&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal
              [&_li]:leading-relaxed
              [&_strong]:text-white [&_strong]:font-semibold
              [&_a]:text-purple-400 [&_a]:underline [&_a]:hover:text-purple-300
              [&_blockquote]:border-l-4 [&_blockquote]:border-purple-500 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-gray-400
              [&_code]:bg-white/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-purple-300 [&_code]:text-sm
              [&_pre]:bg-white/5 [&_pre]:border [&_pre]:border-white/10 [&_pre]:rounded-xl [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6
              [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_table]:w-full [&_table]:mb-6
              [&_th]:text-left [&_th]:text-white [&_th]:p-3 [&_th]:border-b [&_th]:border-white/20
              [&_td]:text-gray-300 [&_td]:p-3 [&_td]:border-b [&_td]:border-white/10
              [&_hr]:border-white/10 [&_hr]:my-8
            "
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-white/10">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-white/5 text-gray-400 rounded-full text-sm">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-8 text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-3">
            Besoin d'aide pour votre projet ?
          </h3>
          <p className="text-gray-400 mb-6">
            iVISION vous accompagne dans votre stratégie digitale. Audit gratuit de 60 minutes.
          </p>
          <button
            onClick={() => navigate('/quote')}
            className="px-8 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-500 transition"
          >
            Demander un audit gratuit →
          </button>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-bold text-white mb-8">Articles similaires</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <article
                  key={rp.id}
                  onClick={() => navigate(`/blog/${rp.slug}`)}
                  className="bg-white/5 border border-white/10 rounded-xl p-5 cursor-pointer hover:border-purple-500/50 transition group"
                >
                  <span className="text-xs text-purple-400">{rp.category}</span>
                  <h4 className="text-white font-semibold mt-2 group-hover:text-purple-400 transition line-clamp-2">
                    {rp.title}
                  </h4>
                  <p className="text-gray-500 text-sm mt-2">{rp.readTime}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Simple markdown-like renderer (basic)
const renderMarkdown = (content: string): string => {
  return content
    // Headers
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    // Inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // Unordered lists
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    // Ordered lists
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    // Links
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr />')
    // Tables (basic)
    .replace(/\|(.+)\|/g, (match) => {
      const cells = match.split('|').filter(c => c.trim());
      if (cells.every(c => c.trim().match(/^[-:]+$/))) return '';
      const tag = 'td';
      return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    })
    // Paragraphs
    .replace(/\n\n/g, '</p><p>')
    // Line breaks
    .replace(/\n/g, '<br />')
    // Wrap in paragraph
    .replace(/^(.+)$/gm, (match) => {
      if (match.startsWith('<h') || match.startsWith('<pre') || match.startsWith('<li') || match.startsWith('<tr') || match.startsWith('<hr') || match.startsWith('<ul') || match.startsWith('<ol') || match.trim() === '') {
        return match;
      }
      return match;
    });
};

export default BlogPostPage;
