import React from 'react';
import { X, Calendar, Clock, User, Tag, Share2, Heart, BookOpen } from 'lucide-react';
import { BlogPost } from '../types';

interface BlogDetailModalProps {
  post: BlogPost | null;
  isOpen: boolean;
  onClose: () => void;
}

const BlogDetailModal: React.FC<BlogDetailModalProps> = ({ post, isOpen, onClose }) => {
  if (!isOpen || !post) return null;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" onClick={onClose} />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            
            {/* Header Image */}
            <div className="relative h-64 md:h-80 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>

              {/* Category Badge */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium">
                  {post.category}
                </span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">
                  {post.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} phút đọc</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 md:p-8 overflow-y-auto max-h-[calc(90vh-320px)]">
              
              {/* Action Buttons */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <button className="flex items-center space-x-2 px-4 py-2 bg-red-50 text-red-600 rounded-full hover:bg-red-100 transition-colors duration-200">
                    <Heart className="h-4 w-4" />
                    <span>Yêu thích</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors duration-200">
                    <Share2 className="h-4 w-4" />
                    <span>Chia sẻ</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-500">
                  <BookOpen className="h-4 w-4" />
                  <span className="text-sm">{post.readTime} phút đọc</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none">
                <div 
                  className="text-gray-700 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                  style={{
                    lineHeight: '1.8',
                  }}
                />
              </div>

              {/* Tags */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="h-5 w-5 text-gray-500" />
                  <span className="font-medium text-gray-700">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors duration-200 cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="mt-8 p-6 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-lg">
                      {post.author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{post.author}</h4>
                    <p className="text-gray-600 text-sm">
                      Chuyên gia công nghệ với hơn 5 năm kinh nghiệm trong lĩnh vực reviews và đánh giá sản phẩm
                    </p>
                  </div>
                </div>
              </div>

              {/* Related Articles */}
              <div className="mt-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Bài viết liên quan</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      Xu hướng công nghệ 2024: AI và IoT dẫn đầu
                    </h4>
                    <p className="text-gray-600 text-sm">5 phút đọc</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow duration-200 cursor-pointer">
                    <h4 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      So sánh camera smartphone flagship 2024
                    </h4>
                    <p className="text-gray-600 text-sm">8 phút đọc</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailModal;