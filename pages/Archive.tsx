import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { getPostsByCategory, getPostsByTag, searchPosts } from '../services/blogService';
import PostCard from '../components/PostCard';
import { BlogPost } from '../types';

interface ArchiveProps {
  type: 'category' | 'tag' | 'search';
}

const Archive: React.FC<ArchiveProps> = ({ type }) => {
  const { category, tag } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q');
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    let result: BlogPost[] = [];
    let pageTitle = '';

    if (type === 'category' && category) {
      result = getPostsByCategory(category);
      pageTitle = `קטגוריה: ${category}`;
    } else if (type === 'tag' && tag) {
      result = getPostsByTag(tag);
      pageTitle = `תגית: ${tag}`;
    } else if (type === 'search' && searchQuery) {
      result = searchPosts(searchQuery);
      pageTitle = `תוצאות חיפוש עבור: "${searchQuery}"`;
    }

    setPosts(result);
    setTitle(pageTitle);
    document.title = `${pageTitle} | AI Blog IL`;
  }, [type, category, tag, searchQuery]);

  return (
    <div>
      <div className="bg-white border-b border-gray-200 -mt-8 -mx-4 px-4 py-12 mb-12 text-center">
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="text-gray-500 mt-2">{posts.length} מאמרים נמצאו</p>
      </div>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <p className="text-xl text-gray-500">לא נמצאו מאמרים התואמים את החיפוש שלך.</p>
        </div>
      )}
    </div>
  );
};

export default Archive;