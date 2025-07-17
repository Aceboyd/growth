import React, { useState, useEffect } from 'react';
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  Eye,
  EyeOff,
  Shield,
  Wallet
} from 'lucide-react';

const Dashboard = ({ setCurrentPage }) => {
  const [showBalance, setShowBalance] = useState(true);
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finances, setFinances] = useState({
    total_balance: '0.00',
    total_deposit: '0.00',
    total_profit: '0.00'
  });
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    kycStatus: '',
    id: ''
  });

  const recentTransactions = [
    { id: '1', type: 'deposit', amount: 1000, currency: 'USDT', date: '2024-01-15', status: 'completed' },
    { id: '2', type: 'withdrawal', amount: 0.025, currency: 'BTC', date: '2024-01-14', status: 'completed' },
    { id: '3', type: 'trade', amount: 500, currency: 'ETH', date: '2024-01-13', status: 'completed' },
  ];

  const overviewStats = [
    {
      title: 'Total Balance',
      value: `$${Number(finances.total_balance).toLocaleString()}`,
      positive: true,
      icon: Wallet
    },
    {
      title: 'Total Deposits',
      value: `$${Number(finances.total_deposit).toLocaleString()}`,
      positive: true,
      icon: ArrowUpRight
    },
    {
      title: 'Total Profit',
      value: `$${Number(finances.total_profit).toLocaleString()}`,
      positive: true,
      icon: ArrowDownLeft
    },
  ];

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,cardano,solana&order=market_cap_desc'
        );
        const data = await res.json();
        setCoins(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
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

        const res = await fetch('https://growthsphere.onrender.com/api/auth/user/finances/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: 'include',
        });

        if (!res.ok) {
          if (res.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            setCurrentPage('login');
          } else if (res.status === 403) {
            console.error('Access forbidden: KYC verification may be required');
            alert('Please complete KYC verification to access your finances.');
            setCurrentPage('kyc-verification');
          }
          throw new Error(`Failed to fetch finances: ${res.status}`);
        }

        const data = await res.json();
        if (data && data.length > 0) {
          setFinances(data[0]);
        } else {
          console.warn('No finance data returned');
        }
      } catch (error) {
        console.error('Error fetching finances:', error.message);
      }
    };

    const fetchUser = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found');
        return;
      }

      try {
        const res = await fetch('https://growthsphere.onrender.com/api/auth/user/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            console.error('Unauthorized: Invalid or expired token');
            setCurrentPage('login');
          }
          throw new Error(`Failed to fetch user: ${res.status}`);
        }

        const data = await res.json();
        setUser({
          first_name: data.first_name || '',
          last_name: data.last_name || '',
          kycStatus: data.kyc_status || 'Not Verified',
          id: data.id || 'GS-001',
        });
      } catch (err) {
        console.error('❌ Failed to fetch user:', err.message);
      }
    };

    fetchCoins();
    fetchFinances();
    fetchUser();
  }, [setCurrentPage]);

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              Welcome back, {user.first_name} {user.last_name}!
            </h2>
            <p className="text-blue-100 text-sm">
              Your portfolio is performing well today
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">KYC {user.kycStatus}</span>
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
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
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

      {/* Recent Transactions */}
      <div className="bg-gray-800/50 border border-gray-700 rounded-xl p-5">
        <h3 className="text-xl font-bold text-white mb-5">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map((tx) => (
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
                  ) : (
                    <TrendingUp className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <p className="text-white font-medium capitalize">{tx.type}</p>
                  <p className="text-gray-400 text-sm">{tx.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{tx.amount} {tx.currency}</p>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;