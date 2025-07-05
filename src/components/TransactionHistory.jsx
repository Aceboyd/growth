import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar
} from 'lucide-react';

const TransactionHistory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');

  const transactions = [
    {
      id: 'TXN001',
      type: 'deposit',
      amount: 1.5,
      currency: 'BTC',
      status: 'completed',
      date: '2024-01-15 14:30:25',
      txHash: '0x1234567890abcdef1234567890abcdef12345678',
      fee: 0.0005,
      network: 'Bitcoin'
    },
    {
      id: 'TXN002',
      type: 'withdrawal',
      amount: 500,
      currency: 'USDT',
      status: 'pending',
      date: '2024-01-15 12:15:43',
      txHash: '0xabcdef1234567890abcdef1234567890abcdef12',
      fee: 1.0,
      network: 'TRC20'
    },
    {
      id: 'TXN003',
      type: 'trade',
      amount: 2.5,
      currency: 'ETH',
      status: 'completed',
      date: '2024-01-14 16:45:12',
      txHash: '0x567890abcdef1234567890abcdef1234567890ab',
      fee: 0.005,
      network: 'Ethereum'
    },
    {
      id: 'TXN004',
      type: 'deposit',
      amount: 1000,
      currency: 'ADA',
      status: 'completed',
      date: '2024-01-14 09:20:18',
      txHash: '0xcdef1234567890abcdef1234567890abcdef1234',
      fee: 0.17,
      network: 'Cardano'
    },
    {
      id: 'TXN005',
      type: 'withdrawal',
      amount: 0.25,
      currency: 'BTC',
      status: 'failed',
      date: '2024-01-13 11:30:55',
      txHash: '0xef1234567890abcdef1234567890abcdef123456',
      fee: 0.0005,
      network: 'Bitcoin'
    },
    {
      id: 'TXN006',
      type: 'trade',
      amount: 10,
      currency: 'SOL',
      status: 'completed',
      date: '2024-01-12 13:22:37',
      txHash: '0x234567890abcdef1234567890abcdef1234567890',
      fee: 0.025,
      network: 'Solana'
    },
    {
      id: 'TXN007',
      type: 'deposit',
      amount: 750,
      currency: 'USDT',
      status: 'completed',
      date: '2024-01-11 15:45:29',
      txHash: '0x7890abcdef1234567890abcdef1234567890abcd',
      fee: 1.0,
      network: 'TRC20'
    },
    {
      id: 'TXN008',
      type: 'withdrawal',
      amount: 5.0,
      currency: 'ETH',
      status: 'pending',
      date: '2024-01-10 10:15:44',
      txHash: '0x90abcdef1234567890abcdef1234567890abcdef',
      fee: 0.005,
      network: 'Ethereum'
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowDownLeft className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />;
      case 'trade':
        return <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />;
      default:
        return null;
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />;
      case 'pending':
        return <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />;
      case 'failed':
        return <AlertCircle className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-400';
      case 'failed':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'deposit':
        return 'bg-green-500/20 text-green-400';
      case 'withdrawal':
        return 'bg-red-500/20 text-red-400';
      case 'trade':
        return 'bg-blue-500/20 text-blue-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.currency.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.txHash.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

  const truncateHash = (hash) => {
    return `${hash.slice(0, 6)}...${hash.slice(-6)}`;
  };

  const exportTransactions = () => {
    console.log('Exporting transactions...');
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Transaction History</h2>
            <p className="text-gray-300 text-sm sm:text-base">View and manage all your cryptocurrency transactions</p>
          </div>
          <button
            onClick={exportTransactions}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Search */}
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by ID, currency..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-8 sm:pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            />
          </div>

          {/* Transaction Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="all">All Types</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
            <option value="trade">Trades</option>
          </select>

          {/* Status Filter */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          {/* Date Range Filter */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>

      {/* Mobile Transaction Cards */}
      <div className="lg:hidden space-y-3">
        {filteredTransactions.map((transaction) => (
          <div key={transaction.id} className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {getTypeIcon(transaction.type)}
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(transaction.type)}`}>
                  {transaction.type}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                {getStatusIcon(transaction.status)}
                <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">ID:</span>
                <span className="text-white font-mono text-sm">{transaction.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Amount:</span>
                <span className="text-white font-medium text-sm">{transaction.amount} {transaction.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Date:</span>
                <span className="text-gray-300 text-sm">{transaction.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Hash:</span>
                <button
                  onClick={() => copyToClipboard(transaction.txHash)}
                  className="text-blue-400 hover:text-blue-300 font-mono text-sm"
                >
                  {truncateHash(transaction.txHash)}
                </button>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Fee:</span>
                <span className="text-gray-300 text-sm">{transaction.fee} {transaction.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Network:</span>
                <span className="text-gray-400 text-sm">{transaction.network}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Transaction Table */}
      <div className="hidden lg:block bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-700/50">
              <tr>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Transaction ID</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Type</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Amount</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Status</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Date</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Transaction Hash</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Fee</th>
                <th className="text-left text-gray-300 font-medium p-4 text-sm">Network</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.map((transaction, index) => (
                <tr key={transaction.id} className={`border-t border-gray-700/50 ${index % 2 === 0 ? 'bg-gray-800/25' : ''}`}>
                  <td className="p-4">
                    <div className="font-mono text-white text-sm">{transaction.id}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getTypeIcon(transaction.type)}
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getTypeColor(transaction.type)}`}>
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-white font-medium text-sm">
                      {transaction.amount} {transaction.currency}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(transaction.status)}
                      <span className={`px-2 py-1 text-xs rounded-full capitalize ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300 text-sm">{transaction.date}</div>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => copyToClipboard(transaction.txHash)}
                      className="font-mono text-blue-400 hover:text-blue-300 text-sm hover:bg-blue-500/10 px-2 py-1 rounded transition-colors"
                      title="Click to copy"
                    >
                      {truncateHash(transaction.txHash)}
                    </button>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-300 text-sm">
                      {transaction.fee} {transaction.currency}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="text-gray-400 text-sm">{transaction.network}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No transactions found</div>
            <p className="text-gray-500 text-sm">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredTransactions.length > 0 && (
        <div className="flex items-center justify-between bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
          <div className="text-gray-300 text-xs sm:text-sm">
            Showing {filteredTransactions.length} of {transactions.length} transactions
          </div>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-xs sm:text-sm">
              Previous
            </button>
            <button className="px-2 py-1 sm:px-3 sm:py-1 bg-blue-500 text-white rounded text-xs sm:text-sm">
              1
            </button>
            <button className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-xs sm:text-sm">
              2
            </button>
            <button className="px-2 py-1 sm:px-3 sm:py-1 bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors text-xs sm:text-sm">
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;