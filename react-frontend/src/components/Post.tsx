// components/Post.tsx
import React from 'react';

interface PostProps {
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  reposts: number;
}

const Post: React.FC<PostProps> = ({
  username,
  handle,
  content,
  timestamp,
  likes,
  comments,
  reposts,
}) => {
  return (
    <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 mb-4 border border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-center space-x-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
          {username.charAt(0)}
        </div>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h4 className="font-bold text-white">{username}</h4>
            <span className="text-gray-400">@{handle}</span>
            <span className="text-gray-600">·</span>
            <span className="text-gray-400 text-sm">{timestamp}</span>
          </div>
        </div>
      </div>

      {/* Post Content */}
      <div className="mb-4">
        <p className="text-gray-200 leading-relaxed">{content}</p>
      </div>

      {/* Post Actions */}
      <div className="flex justify-between items-center pt-4 border-t border-gray-700">
        <button className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-200 group">
          <div className="p-2 rounded-full group-hover:bg-blue-500/10 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">{comments}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-400 hover:text-green-400 transition-colors duration-200 group">
          <div className="p-2 rounded-full group-hover:bg-green-500/10 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">{reposts}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-400 hover:text-red-400 transition-colors duration-200 group">
          <div className="p-2 rounded-full group-hover:bg-red-500/10 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <span className="text-sm text-gray-300">{likes}</span>
        </button>

        <button className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 group">
          <div className="p-2 rounded-full group-hover:bg-purple-500/10 transition-colors duration-200">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Post;