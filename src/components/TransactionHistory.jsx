import React, { useState, useEffect } from 'react';
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

const TransactionHistory = ({ setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('all');
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          console.error('No access token found, redirecting to login');
          setCurrentPage('login');
          return;
        }

        const res = await fetch('https://growthsph.onrender.com/details/user/transactions/', {
          method: 'GET',
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
            alert('Please complete KYC verification to access your transactions.');
            setCurrentPage('kyc-verification');
          }
          throw new Error(`Failed to fetch transactions: ${res.status}`);
        }

        const data = await res.json();
        setTransactions(data.map(tx => ({
          id: tx.transaction_id || 'N/A',
          type: tx.type || 'unknown',
          amount: tx.amount || 0,
          currency: tx.currency || 'N/A',
          status: tx.status || 'unknown',
          date: tx.date || 'N/A',
          network: tx.network || 'N/A',
        })));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching transactions:', error.message);
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [setCurrentPage]);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'deposit':
        return <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />;
      case 'withdrawal':
        return <ArrowDownLeft className="w-3 h-3 sm:w-4 sm:h-4 text-red-400" />;
      case 'mining':
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
                         transaction.currency.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || transaction.type === filterType;
    const matchesStatus = filterStatus === 'all' || transaction.status === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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
            <option value="mining">mining</option>
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

      {/* Loading State */}
      {loading ? (
        <div className="text-center py-12 text-gray-300">Loading transactions...</div>
      ) : (
        <>
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
                    <span className="text-gray-400 text-sm">Currency:</span>
                    <span className="text-white font-medium text-sm">{transaction.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">Date:</span>
                    <span className="text-gray-300 text-sm">{transaction.date}</span>
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
                    <th className="text-left text-gray-300 font-medium p-4 text-sm">Currency</th>
                    <th className="text-left text-gray-300 font-medium p-4 text-sm">Status</th>
                    <th className="text-left text-gray-300 font-medium p-4 text-sm">Date</th>
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
                        <div className="text-white font-medium text-sm">{transaction.currency}</div>
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
        </>
      )}
    </div>
  );
};
export default TransactionHistory;