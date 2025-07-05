import React from 'react';
import { Bell, Search, User, Menu } from 'lucide-react';

const Header = ({ user, setSidebarOpen }) => {
  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="relative hidden sm:block">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              className="bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 lg:w-80"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Mobile search button */}
          <button className="sm:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
            <Search className="w-5 h-5" />
          </button>
          
          <button className="relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs">ID: {user.id}</p>
            </div>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full overflow-hidden">
              <img
                src={user.avatar}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;