export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown content
  author: string;
  date: string; // ISO format YYYY-MM-DD
  readTime: number; // in minutes
  category: string;
  tags: string[];
  imageUrl: string;
}

export interface NavigationItem {
  label: string;
  path: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
}

// Simple simulation of SEO headers since we are Client Side
export interface SEOProps {
  title: string;
  description?: string;
}