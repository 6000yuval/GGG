import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Calendar, ChevronLeft } from 'lucide-react';
import { BlogPost } from '../types';

interface PostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const PostCard: React.FC<PostCardProps> = ({ post, featured = false }) => {
  return (
    <article className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full ${featured ? 'md:grid md:grid-cols-2 md:gap-6' : ''}`}>
      <div className={`relative overflow-hidden ${featured ? 'h-64 md:h-full' : 'h-48'}`}>
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-primary/90 text-white text-xs font-bold px-3 py-1 rounded-full">
          {post.category}
        </div>
      </div>
      
      <div className="p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {post.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {post.readTime} דקות קריאה
            </span>
          </div>
          
          <Link to={`/post/${post.slug}`} className="group">
            <h2 className={`font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors ${featured ? 'text-2xl' : 'text-xl'}`}>
              {post.title}
            </h2>
          </Link>
          
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {post.excerpt}
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-50">
          <span className="text-xs font-medium text-gray-900">מאת {post.author}</span>
          <Link to={`/post/${post.slug}`} className="text-primary text-sm font-bold flex items-center gap-1 hover:gap-2 transition-all">
            קרא עוד
            <ChevronLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default PostCard;