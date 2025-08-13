import React from 'react';
import { BookOpen, TrendingUp } from 'lucide-react';
import { BlogPost } from '../types';
import { usePosts } from '../context/PostContext';
import BlogCard from './BlogCard';

interface BlogSectionProps {
  onBlogClick: (post: BlogPost) => void;
}

const BlogSection: React.FC<BlogSectionProps> = ({ onBlogClick }) => {
  const { posts } = usePosts();
  const featuredPosts = posts.slice(0, 6);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <TrendingUp className="h-6 w-6 text-blue-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Bài Viết Nổi Bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cập nhật những xu hướng công nghệ mới nhất, đánh giá sản phẩm chi tiết và hướng dẫn sử dụng từ các chuyên gia
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} onReadMore={onBlogClick} />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-2">
            <BookOpen className="h-5 w-5" />
            <span>Xem tất cả bài viết</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
