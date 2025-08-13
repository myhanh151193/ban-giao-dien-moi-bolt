import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BlogPost } from '../types';
import { apiService } from '../services/apiService';

interface PostContextType {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  addPost: (post: Omit<BlogPost, 'id'>) => Promise<void>;
  updatePost: (id: number, post: Partial<BlogPost>) => Promise<void>;
  deletePost: (id: number) => Promise<void>;
  getPostById: (id: number) => BlogPost | undefined;
  refreshPosts: () => Promise<void>;
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

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getBlogPosts();
      setPosts(response.data || response);
    } catch (error: any) {
      console.warn('⚠️ API không khả dụng - chuyển sang dữ liệu offline');
      console.log('📝 Đang tải bài viết từ fallback...');

      // Import fallback data dynamically
      const { blogPosts: fallbackPosts } = await import('../data/blogPosts');
      setPosts(fallbackPosts);
      setError('API không khả dụng - sử dụng dữ liệu offline');

      console.log(`✅ Đã tải ${fallbackPosts.length} bài viết từ dữ liệu offline`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

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

  const addPost = async (postData: Omit<BlogPost, 'id'>) => {
    try {
      setError(null);
      const postToSend = {
        ...postData,
        slug: postData.slug || generateSlug(postData.title),
        date: new Date().toLocaleDateString('vi-VN'),
        seoTitle: postData.seoTitle || postData.title,
        seoDescription: postData.seoDescription || postData.excerpt.substring(0, 160),
        altText: postData.altText || postData.title,
        openGraphTitle: postData.openGraphTitle || postData.seoTitle || postData.title,
        openGraphDescription: postData.openGraphDescription || postData.seoDescription || postData.excerpt.substring(0, 160),
        openGraphImage: postData.openGraphImage || postData.image,
      };
      
      const response = await apiService.createBlogPost(postToSend);
      const newPost = response.data || response;
      setPosts(prev => [newPost, ...prev]);
    } catch (error) {
      console.error('Error adding post:', error);
      setError('Không thể thêm bài viết');
      throw error;
    }
  };

  const updatePost = async (id: number, postData: Partial<BlogPost>) => {
    try {
      setError(null);
      const response = await apiService.updateBlogPost(id.toString(), postData);
      const updatedPost = response.data || response;
      setPosts(prev => 
        prev.map(post => 
          post.id === id ? { ...post, ...updatedPost } : post
        )
      );
    } catch (error) {
      console.error('Error updating post:', error);
      setError('Không thể cập nhật bài viết');
      throw error;
    }
  };

  const deletePost = async (id: number) => {
    try {
      setError(null);
      await apiService.deleteBlogPost(id.toString());
      setPosts(prev => prev.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
      setError('Không thể xóa bài viết');
      throw error;
    }
  };

  const getPostById = (id: number) => {
    return posts.find(post => post.id === id);
  };

  const refreshPosts = async () => {
    await fetchPosts();
  };

  const value: PostContextType = {
    posts,
    loading,
    error,
    addPost,
    updatePost,
    deletePost,
    getPostById,
    refreshPosts
  };

  return (
    <PostContext.Provider value={value}>
      {children}
    </PostContext.Provider>
  );
};
