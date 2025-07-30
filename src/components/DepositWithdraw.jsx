import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ArrowDownLeft, 
  Copy, 
  QrCode, 
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://growthsph.onrender.com';

const DepositWithdraw = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('');
  const [showQR, setShowQR] = useState(false);
  const [depositAddresses, setDepositAddresses] = useState({
    BTC: 'bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh',
    ETH: '0x742c4532a2b2a2b2c2d2e2f2g2h2i2j2k2l2m2n2o2p2',
    USDT: 'TKzxczxvczxvczxvczxvczxvczxvczxvczxvcz'
  });
  const [error, setError] = useState(null);

  const cryptocurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin', minDeposit: 0.001, fee: 0.0005 },
    { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum', minDeposit: 0.01, fee: 0.005 },
    { symbol: 'USDT', name: 'Tether', network: 'TRC20', minDeposit: 10, fee: 1 },
  ];

  const fetchDepositAddresses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found, redirecting to login');
        setError('Please log in to continue');
        setCurrentPage('login');
        return;
      }

      const response = await axios.get(`${API_BASE_URL}/details/wallet/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data || {};
      setDepositAddresses({
        BTC: data.btc || depositAddresses.BTC,
        ETH: data.eth || depositAddresses.ETH,
        USDT: data.usdt || depositAddresses.USDT,
      });
      setError(null);
    } catch (err) {
      if (err.response?.status === 401) {
        console.error('Unauthorized: Invalid or expired token', err.response?.data);
        setError('Session expired. Please log in again.');
        setCurrentPage('login');
      } else {
        console.warn('Failed to fetch deposit addresses:', err.message, err.response?.data);
        setError('Unable to fetch wallet addresses. Using default addresses.');
      }
    }
  };

  useEffect(() => {
    fetchDepositAddresses();
    const pollInterval = setInterval(fetchDepositAddresses, 30000); // Poll every 30 seconds
    return () => clearInterval(pollInterval);
  },);

  const selectedCrypto = cryptocurrencies.find(crypto => crypto.symbol === selectedCurrency);

  const handleCopyAddress = (address) => {
    navigator.clipboard.writeText(address);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', { activeTab, selectedCurrency, amount, walletAddress });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Deposit & Withdraw</h2>
        <p className="text-gray-300 text-sm sm:text-base">Manage your cryptocurrency deposits and withdrawals</p>
        {error && (
          <p className="text-yellow-400 text-sm mt-2">
            {error}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Main Form */}
        <div className="lg:col-span-3 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
          {/* Tabs */}
          <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-700/50 p-1 rounded-lg">
            <button
              onClick={() => setActiveTab('deposit')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md transition-colors ${
                activeTab === 'deposit'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm sm:text-base">Deposit</span>
            </button>
            <button
              onClick={() => setActiveTab('withdraw')}
              className={`flex-1 flex items-center justify-center space-x-2 py-2 sm:py-3 px-2 sm:px-4 rounded-md transition-colors ${
                activeTab === 'withdraw'
                  ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <ArrowDownLeft className="w-4 h-4" />
              <span className="text-sm sm:text-base">Withdraw</span>
            </button>
          </div>

          {/* Currency Selection */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-3">Select Cryptocurrency</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3">
              {cryptocurrencies.map((crypto) => (
                <button
                  key={crypto.symbol}
                  onClick={() => setSelectedCurrency(crypto.symbol)}
                  className={`flex items-center space-x-2 sm:space-x-3 p-2 sm:p-3 rounded-lg border transition-colors ${
                    selectedCurrency === crypto.symbol
                      ? 'border-blue-500 bg-blue-500/20 text-blue-400'
                      : 'border-gray-600 bg-gray-700/30 text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xs">{crypto.symbol.slice(0, 2)}</span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-xs sm:text-sm">{crypto.symbol}</p>
                    <p className="text-xs text-gray-400">{crypto.network}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {activeTab === 'deposit' ? (
            <div className="space-y-4 sm:space-y-6">
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-400 font-medium text-sm sm:text-base">Deposit Information</span>
                </div>
                <p className="text-blue-300 text-xs sm:text-sm">
                  Minimum deposit: {selectedCrypto?.minDeposit} {selectedCurrency}
                </p>
                <p className="text-blue-300 text-xs sm:text-sm">
                  Network: {selectedCrypto?.network}
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Deposit Address</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={depositAddresses[selectedCurrency] || 'Address not available'}
                    readOnly
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white font-mono text-xs sm:text-sm"
                  />
                  <button
                    onClick={() => handleCopyAddress(depositAddresses[selectedCurrency])}
                    className="p-2 sm:p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                    disabled={!depositAddresses[selectedCurrency]}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="p-2 sm:p-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
                    disabled={!depositAddresses[selectedCurrency]}
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {showQR && depositAddresses[selectedCurrency] && (
                <div className="bg-gray-700/50 border border-gray-600 rounded-lg p-4 sm:p-6 text-center">
                  <div className="w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-lg mx-auto mb-4 flex items-center justify-center">
                    <p className="text-gray-600 text-xs sm:text-sm">QR Code Placeholder</p>
                  </div>
                  <p className="text-gray-300 text-xs sm:text-sm">Scan this QR code to get the deposit address</p>
                </div>
              )}

              <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 font-medium text-sm sm:text-base">Important Notice</span>
                </div>
                <ul className="text-yellow-300 text-xs sm:text-sm space-y-1">
                  <li>• Only send {selectedCurrency} to this address</li>
                  <li>• Minimum deposit: {selectedCrypto?.minDeposit} {selectedCurrency}</li>
                  <li>• Deposits require network confirmations</li>
                  <li>• Do not send from exchange accounts</li>
                </ul>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span className="text-red-400 font-medium text-sm sm:text-base">Withdrawal Information</span>
                </div>
                <p className="text-red-300 text-xs sm:text-sm">
                  Network fee: {selectedCrypto?.fee} {selectedCurrency}
                </p>
                <p className="text-red-300 text-xs sm:text-sm">
                  Processing time: 10-30 minutes
                </p>
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Withdrawal Address</label>
                <input
                  type="text"
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                  placeholder={`Enter ${selectedCurrency} address`}
                  required
                />
              </div>

              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">Amount</label>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 pr-12 sm:px-4 sm:py-3 sm:pr-16 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    placeholder="0.00"
                    step="0.00000001"
                    required
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    {selectedCurrency}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-medium py-2 sm:py-3 px-4 sm:px-6 rounded-lg transition-all text-sm sm:text-base"
              >
                Withdraw {selectedCurrency}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepositWithdraw;