import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Search } from 'lucide-react';
import { BlogPost } from '../types';
import { usePosts } from '../context/PostContext';
import BlogDetailModal from '../components/BlogDetailModal';

const Blog: React.FC = () => {
  const { posts } = usePosts();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [isBlogDetailOpen, setIsBlogDetailOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleBlogClick = (post: BlogPost) => {
    setSelectedPost(post);
    setIsBlogDetailOpen(true);
  };

  const handleBlogDetailClose = () => {
    setIsBlogDetailOpen(false);
    setSelectedPost(null);
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = [...new Set(posts.map(post => post.category))];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Blog & Bài Viết
            </h1>
            <p className="text-xl md:text-2xl max-w-3xl mx-auto">
              Cập nhật xu hướng thiết kế web, hướng dẫn sử dụng và những mẹo hay 
              để tối ưu website của bạn.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-8 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Tìm kiếm bài viết..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <span
                  key={category}
                  className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Bài viết mới nhất
            </h2>
            <p className="text-lg text-gray-600">
              {filteredPosts.length} bài viết được tìm thấy
            </p>
          </div>

          {filteredPosts.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-xl text-gray-500">Không tìm thấy bài viết nào</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden cursor-pointer"
                  onClick={() => handleBlogClick(post)}
                >
                  <div className="relative overflow-hidden bg-gray-100 aspect-video">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <div className="flex items-center mr-4">
                        <User className="h-4 w-4 mr-1" />
                        <span>{post.author}</span>
                      </div>
                      <div className="flex items-center mr-4">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>

                    <button className="text-blue-600 font-semibold flex items-center hover:text-blue-700 transition-colors duration-200">
                      Đọc thêm
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Blog Detail Modal */}
      <BlogDetailModal
        post={selectedPost}
        isOpen={isBlogDetailOpen}
        onClose={handleBlogDetailClose}
      />
    </div>
  );
};

export default Blog;
