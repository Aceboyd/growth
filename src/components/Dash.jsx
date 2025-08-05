import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Shield,
  Wallet,
  RefreshCw,
} from 'lucide-react';
import axios from 'axios';

const Dashboard = ({ setCurrentPage }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [coins, setCoins] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [kycLoading, setKycLoading] = useState(true);
  const [finances, setFinances] = useState({
    total_balance: '0.00',
    total_deposit: '0.00',
    total_profit: '0.00',
  });
  const [user, setUser] = useState({
    id: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    kycStatus: 'Not Verified',
  });

  const overviewStats = [
    {
      title: 'Total Balance',
      value: `$${Number(finances.total_balance).toLocaleString()}`,
      positive: true,
      icon: Wallet,
    },
    {
      title: 'Total Deposits',
      value: `$${Number(finances.total_deposit).toLocaleString()}`,
      positive: true,
      icon: ArrowUpRight,
    },
    {
      title: 'Total Profit',
      value: `$${Number(finances.total_profit).toLocaleString()}`,
      positive: true,
      icon: ArrowDownLeft,
    },
  ];

  const fetchTransactions = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found, redirecting to login');
        setCurrentPage('login');
        return;
      }

      const res = await axios.get('https://growthsph.onrender.com/details/user/transactions/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (!res.data) {
        throw new Error('No transaction data returned');
      }

      setTransactions(
        res.data.map((tx) => ({
          id: tx.transaction_id || 'N/A',
          type: tx.type || 'unknown',
          amount: tx.amount || 0,
          status: tx.status || 'unknown',
          date: tx.date || 'N/A',
          network: tx.network || 'N/A',
        }))
      );
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token', error.response.data);
        setCurrentPage('login');
      } else if (error.response?.status === 403) {
        console.error('Access forbidden: KYC verification may be required', error.response.data);
        alert('Please complete KYC verification to access your transactions.');
        setCurrentPage('kyc-verification');
      } else {
        console.error('Error fetching transactions:', error.message, error.response?.data);
      }
    }
  };

  const fetchCoins = async () => {
    try {
      const res = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,solana&order=market_cap_desc'
      );
      setCoins(res.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching coins:', error.message, error.response?.data);
    }
  };

  const fetchFinances = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found, redirecting to login');
        setCurrentPage('login');
        return;
      }

      const res = await axios.get('https://growthsph.onrender.com/details/user/finance/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      if (res.data && res.data.length > 0) {
        setFinances(res.data[0]);
      } else {
        console.warn('No finance data returned');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token', error.response.data);
        setCurrentPage('login');
      } else if (error.response?.status === 403) {
        console.error('Access forbidden: KYC verification may be required', error.response.data);
        alert('Please complete KYC verification to access your finances.');
        setCurrentPage('kyc-verification');
      } else {
        console.error('Error fetching finances:', error.message, error.response?.data);
      }
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found, redirecting to login');
        setCurrentPage('login');
        return;
      }

      console.log('Fetching user with token:', token);
      const res = await axios.get('https://growthsph.onrender.com/auth/users/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      console.log('API response:', res.data);
      const data = Array.isArray(res.data) && res.data.length > 0 ? res.data[0] : {};
      setUser({
        id: data.id || 'GS-001',
        firstName: data.first_name || 'Unknown',
        lastName: data.last_name || 'User',
        email: data.email || '',
        phone: data.phone_number || '',
        kycStatus: user.kycStatus || 'Not Verified',
      });
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token', error.response.data);
        setCurrentPage('login');
        return;
      }
      console.error('Failed to fetch user:', error.message, error.response?.data);
      setUser({
        id: 'GS-001',
        firstName: 'Unknown',
        lastName: 'User',
        email: '',
        phone: '',
        kycStatus: 'Not Verified',
      });
    }
  };

  const fetchKYCStatus = async () => {
    setKycLoading(true);
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        setUser((prev) => ({ ...prev, kycStatus: 'Not Verified' }));
        return;
      }

      const res = await axios.get(`https://growthsph.onrender.com/details/kyc-upload/?t=${Date.now()}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (res.data && res.data.kyc_data && res.data.kyc_data.kyc_status) {
        setUser((prev) => ({
          ...prev,
          kycStatus: res.data.kyc_data.kyc_status,
        }));
      } else {
        setUser((prev) => ({ ...prev, kycStatus: 'Not Verified' }));
      }
    } catch (error) {
      if (error.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token', error.response.data);
        setCurrentPage('login');
      } else {
        console.error('Error fetching KYC status:', error.message, error.response?.data);
        setUser((prev) => ({ ...prev, kycStatus: 'Not Verified' }));
      }
    } finally {
      setKycLoading(false);
    }
  };

  useEffect(() => {
    fetchCoins();
    fetchFinances();
    fetchUser();
    fetchKYCStatus();
    fetchTransactions();

    const kycPollInterval = setInterval(fetchKYCStatus, 30000);
    return () => clearInterval(kycPollInterval);
  }, [setCurrentPage]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user.firstName} {user.lastName}!
            </h2>
            <p className="text-blue-100 text-sm">
              Your portfolio is performing well today
            </p>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span
                className={`text-sm font-medium ${
                  kycLoading
                    ? 'text-gray-400'
                    : user.kycStatus.toLowerCase() === 'approved'
                    ? 'text-green-400'
                    : user.kycStatus.toLowerCase() === 'in_review'
                    ? 'text-yellow-400'
                    : user.kycStatus.toLowerCase() === 'rejected'
                    ? 'text-red-400'
                    : 'text-gray-400'
                }`}
              >
                KYC{' '}
                {kycLoading
                  ? 'Loading...'
                  : user.kycStatus.toLowerCase() === 'approved'
                  ? 'Approved'
                  : user.kycStatus.toLowerCase() === 'in_review'
                  ? 'In Review'
                  : user.kycStatus.toLowerCase() === 'rejected'
                  ? 'Rejected'
                  : 'Not Verified'}
              </span>
              <button
                onClick={fetchKYCStatus}
                className="text-gray-300 hover:text-white"
                title="Refresh KYC Status"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
            {(user.kycStatus === 'rejected' || user.kycStatus === 'Not Verified') && !kycLoading && (
              <button
                onClick={() => setCurrentPage('kyc-verification')}
                className="text-blue-300 hover:text-blue-100 text-sm"
              >
                Complete KYC Verification
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-base font-semibold">Overview</h3>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="flex items-center space-x-1 text-gray-300 hover:text-white text-sm"
        >
          {showBalance ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showBalance ? 'Hide' : 'Show'}</span>
        </button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-white text-xl font-bold">
                  {showBalance ? stat.value : '••••••'}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Network Balances */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-xl font-bold text-white">Network Balance</h3>
            {!loading && (
              <div className="flex items-center space-x-2 text-green-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">Live</span>
              </div>
            )}
          </div>

          {loading ? (
            <p className="text-gray-300">Loading balances...</p>
          ) : (
            <div className="space-y-4">
              {coins.map((coin) => (
                <div
                  key={coin.id}
                  className="flex items-center justify-between bg-gray-700/30 p-4 rounded-lg border border-gray-600"
                >
                  <div className="flex items-center space-x-3">
                    <img src={coin.image} alt={coin.name} className="w-8 h-8 rounded-full" />
                    <div>
                      <p className="text-white font-medium">{coin.name}</p>
                      <p className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">${coin.current_price.toLocaleString()}</p>
                    <div
                      className={`flex items-center space-x-1 text-sm ${
                        coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'
                      }`}
                    >
                      {coin.price_change_percentage_24h >= 0 ? (
                        <TrendingUp className="w-3 h-3" />
                      ) : (
                        <TrendingDown className="w-3 h-3" />
                      )}
                      <span>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
          <h3 className="text-xl font-bold text-white mb-5">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={() => setCurrentPage('deposit-withdraw')}
              className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition"
            >
              <ArrowUpRight className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-base">Deposit</span>
            </button>
            <button
              onClick={() => setCurrentPage('deposit-withdraw')}
              className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition"
            >
              <ArrowDownLeft className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-base">Withdraw</span>
            </button>
            <button
              onClick={() => setCurrentPage('market')}
              className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition"
            >
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-medium text-base">Trade</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-xl font-bold text-white mb-5">Recent Transactions</h3>
        <div className="space-y-4">
          {transactions.length === 0 ? (
            <p className="text-gray-400 text-sm">No recent transactions yet.</p>
          ) : (
            transactions.map((tx) => (
              <div
                key={tx.id}
                className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600"
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      tx.type === 'deposit'
                        ? 'bg-green-500/20 text-green-400'
                        : tx.type === 'withdrawal'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-blue-500/20 text-blue-400'
                    }`}
                  >
                    {tx.type === 'deposit' ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : tx.type === 'withdrawal' ? (
                      <ArrowDownLeft className="w-5 h-5" />
                    ) : tx.type === 'mining' ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-white font-medium capitalize">{tx.type}</p>
                    <p className="text-gray-400 text-sm">{tx.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">{tx.amount}</p>
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      tx.status === 'completed'
                        ? 'bg-green-500/20 text-green-400'
                        : tx.status === 'pending'
                        ? 'bg-yellow-500/20 text-yellow-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {tx.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;