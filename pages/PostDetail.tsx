import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, Clock, User, Tag, ArrowRight } from 'lucide-react';
import { getPostBySlug, getRelatedPosts } from '../services/blogService';
import MarkdownRenderer from '../components/MarkdownRenderer';
import TableOfContents from '../components/TableOfContents';
import PostCard from '../components/PostCard';
import GeminiSummary from '../components/GeminiSummary';

const PostDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | AI Blog IL`;
      window.scrollTo(0, 0);
    }
  }, [post]);

  if (!post) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">המאמר לא נמצא</h2>
        <Link to="/" className="text-primary hover:underline flex items-center justify-center gap-2">
          <ArrowRight className="w-4 h-4" />
          חזרה לדף הבית
        </Link>
      </div>
    );
  }

  const relatedPosts = getRelatedPosts(post);

  return (
    <article>
      {/* Header */}
      <header className="mb-12 text-center max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="bg-blue-50 text-primary px-3 py-1 rounded-full text-sm font-bold">
            {post.category}
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center justify-center gap-6 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} דקות קריאה</span>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Sidebar (TOC) - Desktop */}
        <aside className="hidden lg:block lg:col-span-3">
          <TableOfContents content={post.content} />
        </aside>

        {/* Content */}
        <div className="lg:col-span-9">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-[400px] object-cover rounded-2xl mb-10 shadow-sm"
          />
          
          <GeminiSummary content={post.content} title={post.title} />

          <MarkdownRenderer content={post.content} />

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-gray-100">
            <h4 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
              <Tag className="w-4 h-4" />
              תגיות:
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link 
                  key={tag} 
                  to={`/tag/${tag}`}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-lg text-sm transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <section className="mt-20 pt-12 border-t border-gray-200">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">מאמרים קשורים</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map(related => (
            <PostCard key={related.id} post={related} />
          ))}
        </div>
      </section>
    </article>
  );
};

export default PostDetail;