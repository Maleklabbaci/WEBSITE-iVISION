import { useEffect, useState } from 'react';
import { getBlogPost, getRelatedPosts, type BlogPost } from '../data/blog-posts';
import { updateSEO, generateBlogSchema } from '../lib/seo-utils';
import { getCanonicalUrl } from '../lib/router';

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
        canonical: getCanonicalUrl({ type: 'blog-post', slug: foundPost.slug }),
      });

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
      <section className="min-h-screen pt-32 pb-20 px-4 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-medium text-navy dark:text-white mb-4">Article non trouvé</h1>
          <p className="text-brand-gray mb-8">Cet article n'existe pas ou a été déplacé.</p>
          <button
            onClick={() => (window.location.hash = '/blog')}
            className="btn-ivision px-6 py-3"
          >
            ← Retour au blog
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => (window.location.hash = '/blog')}
          className="text-brand-gray hover:text-brand-blue transition mb-8 flex items-center gap-2 font-medium"
        >
          ← Retour au blog
        </button>

        {/* Header */}
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-brand-blue/10 text-brand-blue rounded-full text-sm font-bold uppercase tracking-wider">
              {post.category}
            </span>
            <span className="text-brand-gray/60 text-sm">{post.readTime} de lecture</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-medium text-navy dark:text-white mb-6 leading-tight tracking-[-0.02em]">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-brand-gray text-sm">
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
        <div className="w-full h-64 md:h-96 rounded-[.55rem] mb-12 overflow-hidden">
  <img 
    src={post.image} 
    alt={post.title}
    className="w-full h-full object-cover"
  />
</div>

        {/* Content */}
        <article className="mb-16">
          <div
            className="
              [&_h1]:text-3xl [&_h1]:font-medium [&_h1]:text-navy [&_h1]:dark:text-white [&_h1]:mt-12 [&_h1]:mb-6 [&_h1]:tracking-[-0.02em]
              [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:text-navy [&_h2]:dark:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:border-b [&_h2]:border-navy/10 [&_h2]:dark:border-white/10 [&_h2]:pb-3 [&_h2]:tracking-[-0.02em]
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-navy [&_h3]:dark:text-white [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-brand-gray [&_p]:dark:text-brand-gray/80 [&_p]:leading-relaxed [&_p]:mb-4
              [&_ul]:text-brand-gray [&_ul]:dark:text-brand-gray/80 [&_ul]:space-y-2 [&_ul]:mb-4 [&_ul]:ml-5 [&_ul]:list-disc
              [&_ol]:text-brand-gray [&_ol]:dark:text-brand-gray/80 [&_ol]:space-y-2 [&_ol]:mb-4 [&_ol]:ml-5 [&_ol]:list-decimal
              [&_li]:leading-relaxed
              [&_strong]:text-navy [&_strong]:dark:text-white [&_strong]:font-bold
              [&_a]:text-brand-blue [&_a]:underline [&_a]:hover:opacity-80
              [&_blockquote]:border-l-4 [&_blockquote]:border-brand-blue [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-brand-gray
              [&_code]:bg-navy/5 [&_code]:dark:bg-white/10 [&_code]:px-2 [&_code]:py-1 [&_code]:rounded [&_code]:text-brand-blue [&_code]:text-sm
              [&_pre]:bg-navy/5 [&_pre]:dark:bg-white/5 [&_pre]:border [&_pre]:border-navy/10 [&_pre]:dark:border-white/10 [&_pre]:rounded-lg [&_pre]:p-4 [&_pre]:overflow-x-auto [&_pre]:mb-6
              [&_pre_code]:bg-transparent [&_pre_code]:p-0
              [&_table]:w-full [&_table]:mb-6
              [&_th]:text-left [&_th]:text-navy [&_th]:dark:text-white [&_th]:p-3 [&_th]:border-b [&_th]:border-navy/20 [&_th]:dark:border-white/20 [&_th]:font-bold
              [&_td]:text-brand-gray [&_td]:dark:text-brand-gray/80 [&_td]:p-3 [&_td]:border-b [&_td]:border-navy/5 [&_td]:dark:border-white/10
              [&_hr]:border-navy/10 [&_hr]:dark:border-white/10 [&_hr]:my-8
            "
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />
        </article>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-12 pt-8 border-t border-navy/10 dark:border-white/10">
          {post.tags.map((tag) => (
            <span key={tag} className="px-3 py-1 bg-navy/5 dark:bg-white/5 text-brand-gray rounded-full text-sm font-medium">
              #{tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-[.55rem] p-8 md:p-10 mb-16">
          <span className="iv-label">Next step</span>
          <h3 className="text-[clamp(1.6rem,3vw,2.4rem)] font-medium text-navy dark:text-white mb-3 tracking-[-0.02em] leading-[1.05]">
            Besoin d'aide pour votre projet ?
          </h3>
          <p className="text-brand-gray mb-6 max-w-xl">
            iVISION vous accompagne dans votre stratégie digitale. Audit gratuit de 60 minutes, sans engagement.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => (window.location.hash = '/devis')}
              className="btn-ivision px-8 py-3"
            >
              Demander mon audit gratuit
            </button>
            <a
              href="https://wa.me/213563839404"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.12em] text-brand-gray hover:text-navy border-b border-navy/20 pb-1 transition-colors"
            >
              WhatsApp direct
            </a>
          </div>
        </div>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div>
            <h3 className="text-2xl font-medium text-navy dark:text-white mb-8 tracking-[-0.02em]">
              Articles similaires
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((rp) => (
                <article
                  key={rp.id}
                  onClick={() => (window.location.hash = `/blog/${rp.slug}`)}
                  className="bg-white dark:bg-white/5 border border-navy/10 dark:border-white/10 rounded-lg p-5 cursor-pointer hover:border-brand-blue/50 transition group"
                >
                  <span className="text-xs text-brand-blue font-bold uppercase tracking-wider">{rp.category}</span>
                  <h4 className="text-navy dark:text-white font-bold mt-2 group-hover:text-brand-blue transition line-clamp-2">
                    {rp.title}
                  </h4>
                  <p className="text-brand-gray/60 text-sm mt-2">{rp.readTime}</p>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

// Simple markdown renderer
const renderMarkdown = (content: string): string => {
  return content
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    .replace(/^### (.*$)/gm, '<h3>$1</h3>')
    .replace(/^## (.*$)/gm, '<h2>$1</h2>')
    .replace(/^# (.*$)/gm, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/^- (.*$)/gm, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
    .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
    .replace(/^---$/gm, '<hr />')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br />');
};

export default BlogPostPage;
