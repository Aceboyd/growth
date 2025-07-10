import React from 'react';
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
  User
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ currentPage, setCurrentPage, user, setUser, sidebarOpen, setSidebarOpen }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'kyc', label: 'KYC Verification', icon: Shield },
    { id: 'deposit-withdraw', label: 'Deposit & Withdraw', icon: ArrowUpDown },
    { id: 'transactions', label: 'Transaction History', icon: History },
    { id: 'market', label: 'Market Trades', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleLogout = () => {
    setUser(null);
    setCurrentPage('dashboard');
    setSidebarOpen(false);
    navigate('/signin');
  };

  const handleMenuClick = (itemId) => {
    setCurrentPage(itemId);
    setSidebarOpen(false);
  };

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

        <nav className="flex-1 py-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`w-full flex items-center space-x-3 px-6 py-3 text-left hover:bg-gray-700/50 transition-colors ${
                  currentPage === item.id
                    ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-r-2 border-blue-500 text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

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
          {/* Logo + Close Button */}
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

          {/* Menu */}
          <nav className="flex-1 py-4">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-700/50 transition-colors ${
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border-r-2 border-blue-500 text-blue-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info + Logout */}
          <div className="p-4 border-t border-gray-700/50">
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 bg-gray-700/60 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-gray-300" />
              </div>
              <div>
                <p className="text-white font-medium text-sm">{user.name}</p>
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
