import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost } from '../types';
import { blogPosts as initialPosts } from '../data/blogPosts';

interface PostContextType {
  posts: BlogPost[];
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  updatePost: (id: number, post: Partial<BlogPost>) => void;
  deletePost: (id: number) => void;
  getPostById: (id: number) => BlogPost | undefined;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error('usePosts must be used within a PostProvider');
  }
  return context;
};

interface PostProviderProps {
  children: ReactNode;
}

const STORAGE_KEY = 'posts_data';

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    const savedPosts = localStorage.getItem(STORAGE_KEY);
    if (savedPosts) {
      try {
        return JSON.parse(savedPosts);
      } catch (error) {
        console.error('Error parsing saved posts:', error);
        return initialPosts;
      }
    }
    return initialPosts;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }, [posts]);

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[àáạảãâầấậẩẫăằắặẳẵ]/g, 'a')
      .replace(/[èéẹẻẽêềếệểễ]/g, 'e')
      .replace(/[ìíịỉĩ]/g, 'i')
      .replace(/[òóọỏõôồốộổỗơờớợởỡ]/g, 'o')
      .replace(/[ùúụủũưừứựửữ]/g, 'u')
      .replace(/[ỳýỵỷỹ]/g, 'y')
      .replace(/đ/g, 'd')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const addPost = (postData: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
      ...postData,
      id: Math.max(...posts.map(p => p.id)) + 1,
      slug: postData.slug || generateSlug(postData.title),
      date: new Date().toLocaleDateString('vi-VN'),
      seoTitle: postData.seoTitle || postData.title,
      seoDescription: postData.seoDescription || postData.excerpt.substring(0, 160),
      altText: postData.altText || postData.title,
      openGraphTitle: postData.openGraphTitle || postData.seoTitle || postData.title,
      openGraphDescription: postData.openGraphDescription || postData.seoDescription || postData.excerpt.substring(0, 160),
      openGraphImage: postData.openGraphImage || postData.image,
    };
    setPosts(prev => [newPost, ...prev]);
  };

  const updatePost = (id: number, postData: Partial<BlogPost>) => {
    setPosts(prev => 
      prev.map(post => 
        post.id === id ? { ...post, ...postData } : post
      )
    );
  };

  const deletePost = (id: number) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const getPostById = (id: number) => {
    return posts.find(post => post.id === id);
  };

  const value: PostContextType = {
    posts,
    addPost,
    updatePost,
    deletePost,
    getPostById
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
