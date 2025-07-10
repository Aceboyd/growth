import React from 'react';
import { Bell, Search, User, Menu, Bitcoin } from 'lucide-react';

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
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Bell icon (only on desktop) */}
          <button className="hidden lg:inline-flex relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Mobile: CryptoTrade logo and name */}
          <div className="flex items-center space-x-2 sm:hidden">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bitcoin className="w-4 h-4 text-white" />
            </div>
            <p className="text-white font-semibold text-sm">Growthsphhere</p>
          </div>

          {/* User info */}
          <div className="flex items-center space-x-3">
            {/* Name + ID visible from sm and up */}
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium text-sm">{user.name}</p>
              <p className="text-gray-400 text-xs">ID: {user.id}</p>
            </div>

            {/* User icon only on desktop */}
            <div className="hidden lg:flex w-10 h-10 rounded-full bg-gray-700/50 items-center justify-center">
              <User className="w-6 h-6 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
