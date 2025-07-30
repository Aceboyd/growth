import React, { useEffect, useState } from 'react';
import { Bell, Search, User, Menu, Bitcoin } from 'lucide-react';
import axios from 'axios';

const Header = ({ setSidebarOpen }) => {
  const [user, setUser] = useState({ first_name: '', last_name: '', id: '' });

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('❌ No access token found in localStorage');
        return;
      }

      try {
        console.log('Fetching user with token:', token); // Debug token
        const res = await axios.get('https://growthsph.onrender.com/auth/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        console.log('API response:', res.data); // Debug response data
        // Since backend returns an array, take the first user (assuming it’s the authenticated user)
        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : {};
        setUser({
          first_name: data.first_name || 'Unknown',
          last_name: data.last_name || 'User',
          id: data.id || 'GS-001',
        });
      } catch (err) {
        if (err.response?.status === 401) {
          console.error('❌ Unauthorized: Invalid or expired token', err.response.data);
          return;
        }
        console.error('❌ Failed to fetch user:', err.message, err.response?.data);
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