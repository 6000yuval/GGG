import { blogPosts } from '../data/blogPosts';
import { BlogPost } from '../types';

export const getPosts = (): BlogPost[] => {
  return blogPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  return getPosts().filter(post => post.category === category);
};

export const getPostsByTag = (tag: string): BlogPost[] => {
  return getPosts().filter(post => post.tags.includes(tag));
};

export const searchPosts = (query: string): BlogPost[] => {
  const lowerQuery = query.toLowerCase();
  return getPosts().filter(post => 
    post.title.toLowerCase().includes(lowerQuery) || 
    post.content.toLowerCase().includes(lowerQuery) ||
    post.excerpt.toLowerCase().includes(lowerQuery)
  );
};

export const getRelatedPosts = (currentPost: BlogPost): BlogPost[] => {
  return getPosts()
    .filter(post => post.id !== currentPost.id)
    .filter(post => post.category === currentPost.category || post.tags.some(tag => currentPost.tags.includes(tag)))
    .slice(0, 3);
};