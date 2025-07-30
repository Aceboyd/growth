import React, { useState, useEffect } from 'react';
import {
  User,
  Shield,
  Bell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Smartphone,
  Save,
  CheckCircle,
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://growthsph.onrender.com';

const UserSettings = ({ user = {}, setUser }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [formData, setFormData] = useState({
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    phone: user.phone || '',
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    tradingAlerts: true,
    marketNews: true,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        setError('Please log in to continue');
        return;
      }

      try {
        console.log('Fetching user with token:', token);
        const res = await axios.get(`${API_BASE_URL}/auth/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        console.log('API response:', res.data);
        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : {};
        const userData = {
          id: data.id || user.id || 'GS-001',
          firstName: data.first_name || user.firstName || 'Unknown',
          lastName: data.last_name || user.lastName || 'User',
          email: data.email || user.email || '',
          phone: data.phone_number || user.phone || '',
          kycStatus: user.kycStatus || 'Not Verified',
        };

        setFormData((prev) => ({
          ...prev,
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phone: userData.phone,
        }));
        setUser(userData);
      } catch (err) {
        if (err.response?.status === 401) {
          console.error('Unauthorized: Invalid or expired token', err.response.data);
          setError('Session expired. Please log in again.');
          return;
        }
        console.error('Failed to fetch user:', err.message, err.response?.data);
        setError('Failed to fetch user data. Please try again later.');
      }
    };

    fetchUser();
  },);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    const token = localStorage.getItem('accessToken');
    if (!token) {
      setError('Please log in to continue');
      setSaving(false);
      return;
    }

    try {
      if (activeTab === 'security') {
        if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
          setError('All password fields are required');
          setSaving(false);
          return;
        }
        if (formData.newPassword !== formData.confirmPassword) {
          setError('New password and confirm password do not match');
          setSaving(false);
          return;
        }
        if (formData.newPassword.length < 8) {
          setError('New password must be at least 8 characters long');
          setSaving(false);
          return;
        }

        await axios.put(`${API_BASE_URL}/auth/change-password/`, {
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
          confirm_password: formData.confirmPassword,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        setFormData((prev) => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: '',
        }));
      } else if (activeTab === 'profile') {
        const res = await axios.put(`${API_BASE_URL}/auth/users/`, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
        }, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        });

        const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : res.data;
        const updatedUser = {
          id: data.id || user.id || 'GS-001',
          firstName: data.first_name || formData.firstName,
          lastName: data.last_name || formData.lastName,
          email: data.email || formData.email,
          phone: data.phone_number || formData.phone,
          kycStatus: user.kycStatus || 'Not Verified',
        };

        setUser(updatedUser);
        setFormData((prev) => ({
          ...prev,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          email: updatedUser.email,
          phone: updatedUser.phone,
        }));
      } else if (activeTab === 'notifications') {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token', err.response.data);
        setError('Session expired. Please log in again.');
      } else {
        console.error('Error saving settings:', err.message, err.response?.data);
        setError(err.response?.data?.message || 'Failed to save settings. Please try again.');
      }
      setSaving(false);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="flex items-center space-x-4 sm:space-x-6 flex-col sm:flex-row">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gray-700/50 flex items-center justify-center">
                  <User className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" />
                </div>
                <button className="absolute bottom-0 right-0 w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-600 transition-colors">
                  <User className="w-3 h-3" />
                </button>
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold text-white">{user.firstName || 'Unknown'} {user.lastName || 'User'}</h3>
                <p className="text-gray-400 text-sm">User ID: {user.id || 'GS-001'}</p>
                <p className="text-green-400 text-sm">KYC {user.kycStatus || 'Not Verified'}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-gray-400 cursor-not-allowed text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                />
              </div>
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">User ID</label>
                <input
                  type="text"
                  value={user.id || 'GS-001'}
                  disabled
                  className="w-full bg-gray-700/30 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-gray-400 cursor-not-allowed text-sm sm:text-base"
                />
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-blue-400 font-medium text-sm sm:text-base">Security Status</span>
              </div>
              <p className="text-blue-300 text-xs sm:text-sm">
                Your account is secured with KYC verification.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 pr-10 sm:px-4 sm:py-2 sm:pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-4 sm:space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Notification Preferences</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">Email Notifications</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Receive notifications via email</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={formData.emailNotifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">Push Notifications</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Receive push notifications in browser</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={formData.pushNotifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium text-sm sm:text-base">SMS Notifications</p>
                      <p className="text-gray-400 text-xs sm:text-sm">Receive notifications via SMS</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="smsNotifications"
                      checked={formData.smsNotifications}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Alert Types</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4">
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">Trading Alerts</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Price alerts and trading notifications</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="tradingAlerts"
                      checked={formData.tradingAlerts}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between bg-gray-700/30 rounded-lg p-3 sm:p-4">
                  <div>
                    <p className="text-white font-medium text-sm sm:text-base">Market News</p>
                    <p className="text-gray-400 text-xs sm:text-sm">Market updates and news</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="marketNews"
                      checked={formData.marketNews}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 sm:w-11 sm:h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 sm:after:h-5 sm:after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Settings</h2>
            <p className="text-gray-300 text-sm sm:text-base">Manage your account preferences and security</p>
          </div>
          {saved && (
            <div className="flex items-center space-x-2 text-green-400">
              <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-xs sm:text-sm">Settings saved successfully</span>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="lg:col-span-1">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
            <nav className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-2 sm:space-x-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg transition-colors text-sm sm:text-base ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-500/20 to-purple-600/20 border border-blue-500/30 text-blue-400'
                        : 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    }`}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
            {renderTabContent()}
            
            <div className="mt-6 sm:mt-8 flex justify-end">
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-2 sm:px-6 sm:py-3 rounded-lg transition-all text-sm sm:text-base"
              >
                {saving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Saving...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;