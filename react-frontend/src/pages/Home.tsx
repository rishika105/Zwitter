// pages/Home.tsx
import React from 'react';
import Post from '../components/Post';

const Home: React.FC = () => {
  const samplePosts = [
    {
      username: "John Doe",
      handle: "johndoe",
      content: "Just discovered the amazing features of Zwitter! The dark theme is so easy on the eyes! 🎉",
      timestamp: "2h ago",
      likes: 24,
      comments: 5,
      reposts: 3
    },
    {
      username: "Sarah Wilson",
      handle: "sarahw",
      content: "Beautiful night to connect with amazing people on Zwitter. The future of social media is here! ✨",
      timestamp: "4h ago",
      likes: 42,
      comments: 8,
      reposts: 12
    },
    {
      username: "Tech Enthusiast",
      handle: "techlove",
      content: "Exploring the intersection of technology and social connection. Zwitter's dark interface is perfect for late-night browsing!",
      timestamp: "6h ago",
      likes: 15,
      comments: 3,
      reposts: 2
    }
  ];

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Create Post */}
      <div className="bg-gray-800/40 backdrop-blur-sm rounded-2xl p-6 mb-6 border border-gray-700 shadow-lg">
        <div className="flex space-x-4">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
            U
          </div>
          <div className="flex-1">
            <textarea
              placeholder="What's happening in the dark side?"
              className="w-full h-20 p-4 border border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-700/50 text-white placeholder-gray-400"
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex space-x-4 text-blue-400">
                <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors duration-200">
                  📷
                </button>
                <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors duration-200">
                  🎥
                </button>
                <button className="p-2 hover:bg-blue-500/10 rounded-full transition-colors duration-200">
                  📊
                </button>
              </div>
              <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Zweet
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      <div>
        {samplePosts.map((post, index) => (
          <Post key={index} {...post} />
        ))}
      </div>

    </div>
  );
};

export default Home;