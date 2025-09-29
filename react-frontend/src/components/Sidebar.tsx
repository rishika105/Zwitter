// components/Sidebar.tsx
import React, { useState } from 'react';
import CreatePostModal from './CreatePostModal';

interface MenuItem {
  icon: string;
  label: string;
  badge?: number;
}

const Sidebar: React.FC = () => {
  const menuItems: MenuItem[] = [
    { icon: '🏠', label: 'Home' },
    { icon: '🔍', label: 'Explore' },
    { icon: '🔔', label: 'Notifications', badge: 3 },
    { icon: '💬', label: 'Messages' },
    { icon: '🤖', label: 'Chatbot' },
    { icon: '👤', label: 'Profile' },
    // { icon: '🔖', label: 'Bookmarks' },
    // { icon: '📝', label: 'Posts' },
  ];

  const [postModal, setPostModal]  = useState(false);


  return (
    <aside className="w-64 bg-gray-800/60 backdrop-blur-md border-r border-gray-700 min-h-screen sticky top-16">
      <div className="p-6">
        {/* User Profile */}
        <div className="flex items-center space-x-3 mb-8 p-4 rounded-xl bg-gradient-to-r from-gray-700 to-gray-600 border border-gray-600">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            U
          </div>
          <div>
            <h3 className="font-semibold text-white">User Name</h3>
            <p className="text-sm text-gray-300">@username</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-2">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl hover:bg-gray-700/50 hover:text-blue-400 transition-all duration-200 group"
            >
              <span className="text-xl transform group-hover:scale-110 transition-transform duration-200">
                {item.icon}
              </span>
              <span className="font-medium text-gray-200 group-hover:text-blue-400">
                {item.label}
              </span>
              {item.badge && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        <button className='bg-white w-full h-10 rounded-full' 
        onClick={() => setPostModal(true)}
        >
            Create Post
        </button>

        {/* Logout Button */}
        <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-xl hover:bg-red-900/20 hover:text-red-400 transition-all duration-200 group mt-8">
          <span className="text-xl transform group-hover:scale-110 transition-transform duration-200">
            🚪
          </span>
          <span className="font-medium text-gray-200 group-hover:text-red-400">
            Logout
          </span>
        </button>

        {
          postModal ? <CreatePostModal/> : <></>
        }
      </div>
    </aside>
  );
};

export default Sidebar;