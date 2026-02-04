import React, { createContext, useContext, ReactNode } from 'react';
import { BlogPost } from '../types';
import { getAllCategories, getAllTags } from '../data/blogPosts';
import { getPosts } from '../services/blogService';

interface BlogContextType {
  posts: BlogPost[];
  categories: string[];
  tags: string[];
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogPostProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const posts = getPosts();
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <BlogContext.Provider value={{ posts, categories, tags }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogPostProvider');
  }
  return context;
};