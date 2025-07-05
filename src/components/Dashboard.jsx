import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownLeft,
  Shield,
  Activity,
  Wallet
} from 'lucide-react';

const Dashboard = ({ user }) => {
  const portfolioData = [
    { name: 'Bitcoin', symbol: 'BTC', balance: 0.5847, value: 28435.50, change: 2.34 },
    { name: 'Ethereum', symbol: 'ETH', balance: 12.459, value: 23678.90, change: -1.12 },
    { name: 'Cardano', symbol: 'ADA', balance: 1250.00, value: 875.00, change: 5.67 },
    { name: 'Solana', symbol: 'SOL', balance: 45.67, value: 2834.78, change: 3.45 },
  ];

  const recentTransactions = [
    { id: '1', type: 'deposit', amount: 1000, currency: 'USDT', date: '2024-01-15', status: 'completed' },
    { id: '2', type: 'withdrawal', amount: 0.025, currency: 'BTC', date: '2024-01-14', status: 'completed' },
    { id: '3', type: 'trade', amount: 500, currency: 'ETH', date: '2024-01-13', status: 'completed' },
  ];

  const overviewStats = [
    { title: 'Total Balance', value: '$55,823.18', change: '+2.34%', positive: true, icon: Wallet },
    { title: 'Total Deposits', value: '$48,500.00', change: '+$1,200', positive: true, icon: ArrowUpRight },
    { title: 'Total Withdrawals', value: '$12,350.00', change: '-$450', positive: false, icon: ArrowDownLeft },
    { title: 'Active Trades', value: '7', change: '+2', positive: true, icon: Activity },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
            <p className="text-blue-100">Your portfolio is performing well today</p>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="text-sm font-medium">KYC {user.kycStatus}</span>
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className={`text-sm font-medium ${stat.positive ? 'text-green-400' : 'text-red-400'}`}>
                  {stat.change}
                </span>
              </div>
              <div>
                <p className="text-gray-400 text-sm mb-1">{stat.title}</p>
                <p className="text-white text-2xl font-bold">{stat.value}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Portfolio and Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Portfolio */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-white">Portfolio</h3>
            <div className="flex items-center space-x-2 text-green-400">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+2.34%</span>
            </div>
          </div>
          
          <div className="space-y-4">
            {portfolioData.map((asset, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{asset.symbol.slice(0, 2)}</span>
                  </div>
                  <div>
                    <p className="text-white font-medium">{asset.name}</p>
                    <p className="text-gray-400 text-sm">{asset.balance} {asset.symbol}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">${asset.value.toFixed(2)}</p>
                  <div className={`flex items-center space-x-1 ${asset.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span className="text-sm">{Math.abs(asset.change)}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
          <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all">
              <ArrowUpRight className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Deposit</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-lg hover:from-red-600 hover:to-pink-700 transition-all">
              <ArrowDownLeft className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Withdraw</span>
            </button>
            <button className="w-full flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all">
              <TrendingUp className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Trade</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Transactions</h3>
        <div className="space-y-4">
          {recentTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  transaction.type === 'deposit' ? 'bg-green-500/20 text-green-400' :
                  transaction.type === 'withdrawal' ? 'bg-red-500/20 text-red-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {transaction.type === 'deposit' ? <ArrowUpRight className="w-5 h-5" /> :
                   transaction.type === 'withdrawal' ? <ArrowDownLeft className="w-5 h-5" /> :
                   <TrendingUp className="w-5 h-5" />}
                </div>
                <div>
                  <p className="text-white font-medium capitalize">{transaction.type}</p>
                  <p className="text-gray-400 text-sm">{transaction.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">{transaction.amount} {transaction.currency}</p>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                  {transaction.status}
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