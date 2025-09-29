// components/Navbar.tsx
import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800/80 backdrop-blur-md border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Zwitter
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Zwitter..."
                className="w-full px-4 py-2 rounded-full border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700/50 backdrop-blur-sm text-white placeholder-gray-400"
              />
              <div className="absolute right-3 top-2">
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105 shadow-lg">
              Zweet
            </button>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold">
              U
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;