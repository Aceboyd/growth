import React, { useEffect, useState } from 'react';
import { Bell, Search, User, Menu, Bitcoin } from 'lucide-react';

const Header = ({ setSidebarOpen }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '', id: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) return;

      try {
        const res = await fetch('https://growthsphere.onrender.com/api/auth/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Unauthorized');
        }

        const data = await res.json();
        setUser({
          first_name: data.first_name,
          last_name: data.last_name,
          id: data.id || 'GS-001',
        });
      } catch (err) {
        console.error('❌ Failed to fetch user:', err.message);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="bg-gray-800/30 backdrop-blur-sm border-b border-gray-700/50 px-3 sm:px-6 py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 sm:space-x-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Desktop-only bell */}
          <button className="hidden lg:inline-flex relative p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Mobile-only logo */}
          <div className="flex items-center space-x-2 sm:hidden">
            <div className="w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bitcoin className="w-4 h-4 text-white" />
            </div>
            <p className="text-white font-semibold text-sm">Growthsphere</p>
          </div>

          {/* User Info */}
          <div className="flex items-center space-x-3">
            <div className="text-right hidden sm:block">
              <p className="text-white font-medium text-sm">
                {user.first_name} {user.last_name}
              </p>
              <p className="text-gray-400 text-xs">ID: {user.id}</p>
            </div>
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
