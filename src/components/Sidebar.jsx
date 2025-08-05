import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  Shield,
  ArrowUpDown,
  History,
  TrendingUp,
  Settings,
  LogOut,
  Bitcoin,
  X,
  User,
  Wallet,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ first_name: '', last_name: '', id: '' });

  // Fetch user on mount
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        navigate('/signin', { replace: true });
        return;
      }

      try {
        const res = await axios.get('https://growthsph.onrender.com/auth/users/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : {};
        setUser({
          first_name: data.first_name || 'Unknown',
          last_name: data.last_name || 'User',
          id: data.id || 'GS-001',
        });
      } catch (err) {
        if (err.response?.status === 401) {
          return;
        }
        console.error('❌ Failed to fetch user:', err.message);
      }
    };

    fetchUser();
  }, [navigate]);

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/dash', exact: true }, // Added exact: true
    { label: 'KYC Verification', icon: Shield, path: '/dash/kyc' },
    { label: 'Deposit & Withdraw', icon: ArrowUpDown, path: '/dash/deposit-withdraw' },
    { label: 'Transaction History', icon: History, path: '/dash/transactions' },
    { label: 'Market Trades', icon: TrendingUp, path: '/dash/market' },
    { label: 'Accounts', icon: Wallet, path: '/dash/accounts' },
    { label: 'Settings', icon: Settings, path: '/dash/settings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
    navigate('/signin', { replace: true });
  };

  // Shared link component
  const renderMenuLinks = (isMobile = false) =>
    menuItems.map((item) => {
      const Icon = item.icon;
      return (
        <NavLink
          key={item.path}
          to={item.path}
          end={item.exact} // Use end prop for exact matching
          onClick={() => isMobile && setSidebarOpen(false)}
          className={({ isActive }) =>
            `w-full flex items-center space-x-3 px-4 py-3 text-left rounded-md transition-colors ${
              isActive
                ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-r-2 border-blue-500 text-blue-400'
                : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
            }`
          }
        >
          <Icon className="w-5 h-5" />
          <span className="font-medium text-sm">{item.label}</span>
        </NavLink>
      );
    });

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-gray-800/50 backdrop-blur-sm border-r border-gray-700/50 flex-col">
        <div className="p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Bitcoin className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Growthsphere</h1>
              <p className="text-gray-400 text-sm">Professional</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 py-6">{renderMenuLinks()}</nav>
        <div className="p-6 border-t border-gray-700/50">
          <button
            onClick={handleLogout}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800/95 backdrop-blur-sm border-r border-gray-700/50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b border-gray-700/50 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Bitcoin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">Growthsphere</h1>
                <p className="text-gray-400 text-xs">Professional</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-700/50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex-1 py-4">{renderMenuLinks(true)}</nav>

          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gray-700/60 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">
                  {user.first_name} {user.last_name}
                </p>
                <p className="text-gray-400 text-xs">ID: {user.id}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center space-x-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;