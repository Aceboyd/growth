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
import toast from 'react-hot-toast';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://growthsph.onrender.com';

const DepositWithdraw = ({ setCurrentPage, setTransactions }) => {
  const [activeTab, setActiveTab] = useState('deposit');
  const [selectedCurrency, setSelectedCurrency] = useState('BTC');
  const [amount, setAmount] = useState('');
  const [walletAddress, setWalletAddress] = useState('Address not available');
  const [showQR, setShowQR] = useState(false);
  const [depositAddresses, setDepositAddresses] = useState({
    BTC: 'Address not available',
    ETH: 'Address not available',
    USDT: 'Address not available'
  });
  const [error, setError] = useState(null);
  const [isPolling, setIsPolling] = useState(true);

  const cryptocurrencies = [
    { symbol: 'BTC', name: 'Bitcoin', network: 'Bitcoin', minDeposit: 0.001, fee: 0.0005 },
    { symbol: 'ETH', name: 'Ethereum', network: 'Ethereum', minDeposit: 0.01, fee: 0.005 },
    { symbol: 'USDT', name: 'Tether', network: 'TRC20', minDeposit: 10, fee: 1 },
  ];

  // Network mapping to handle API response network values
  const networkMapping = {
    BTC: 'btc',
    ETH: 'eth',
    USDT: 'usdt',
  };

  const fetchDepositAddresses = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found, redirecting to login');
        setError('Please log in to continue');
        setCurrentPage('login');
        setIsPolling(false);
        return;
      }

      console.log('Fetching wallet addresses from:', `${API_BASE_URL}/details/wallet/`);
      const response = await axios.get(`${API_BASE_URL}/details/wallet/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data || {};
      console.log('API response:', data);

      const btcAddress = data.btc || data.BTC || data.wallets?.btc || data.wallets?.BTC || 'Address not available';
      const ethAddress = data.eth || data.ETH || data.wallets?.eth || data.wallets?.ETH || 'Address not available';
      const usdtAddress = data.usdt || data.USDT || data.wallets?.usdt || data.wallets?.USDT || 'Address not available';

      const newAddresses = {
        BTC: btcAddress && typeof btcAddress === 'string' && btcAddress.trim() !== '' ? btcAddress : 'Address not available',
        ETH: ethAddress && typeof ethAddress === 'string' && ethAddress.trim() !== '' ? ethAddress : 'Address not available',
        USDT: usdtAddress && typeof usdtAddress === 'string' && usdtAddress.trim() !== '' ? usdtAddress : 'Address not available',
      };

      console.log('Processed addresses:', newAddresses);

      setDepositAddresses(newAddresses);

      if (
        newAddresses.BTC !== 'Address not available' &&
        newAddresses.ETH !== 'Address not available' &&
        newAddresses.USDT !== 'Address not available'
      ) {
        console.log('Valid addresses received, stopping polling');
        setIsPolling(false);
      }

      setError(null);
    } catch (err) {
      console.error('Failed to fetch deposit addresses:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      let errorMessage = 'Unable to fetch wallet addresses. Please try again later.';
      if (err.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
        setCurrentPage('login');
        setIsPolling(false);
      } else if (err.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
    }
  };

  const fetchWithdrawalAddress = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('No access token found, redirecting to login');
        setError('Please log in to continue');
        setCurrentPage('login');
        return;
      }

      console.log('Fetching withdrawal address from:', `${API_BASE_URL}/details/user/wallet/`);
      const response = await axios.get(`${API_BASE_URL}/details/user/wallet/`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });

      const data = response.data || {};
      console.log('Withdrawal address API response:', data);

      // Handle possible response formats
      let address;
      if (Array.isArray(data)) {
        // Find the address for the selected currency's network
        const expectedNetwork = networkMapping[selectedCurrency]?.toLowerCase();
        const entry = data.find(item => item.network?.toLowerCase() === expectedNetwork);
        address = entry?.address || 'Address not available';
      } else {
        // If response is an object, try currency keys
        address = data[selectedCurrency.toLowerCase()] || 
                 data[selectedCurrency] || 
                 data.wallets?.[selectedCurrency.toLowerCase()] || 
                 data.wallets?.[selectedCurrency] || 
                 'Address not available';
      }

      console.log('Selected address:', address);
      setWalletAddress(address && typeof address === 'string' && address.trim() !== '' ? address : 'Address not available');
      setError(null);
    } catch (err) {
      console.error('Failed to fetch withdrawal address:', {
        message: err.message,
        status: err.response?.status,
        data: err.response?.data,
      });

      let errorMessage = 'Unable to fetch withdrawal address. Please try again later.';
      if (err.response?.status === 401) {
        errorMessage = 'Session expired. Please log in again.';
        setCurrentPage('login');
      } else if (err.response?.status >= 500) {
        errorMessage = 'Server error. Please try again later.';
      } else if (err.code === 'ERR_NETWORK') {
        errorMessage = 'Network error. Please check your connection.';
      }

      setError(errorMessage);
      setWalletAddress('Address not available');
    }
  };

  useEffect(() => {
    fetchDepositAddresses();
    let pollInterval;
    if (isPolling) {
      pollInterval = setInterval(fetchDepositAddresses, 30000);
    }
    return () => clearInterval(pollInterval);
  }, [isPolling]);

  useEffect(() => {
    if (activeTab === 'withdraw') {
      fetchWithdrawalAddress();
    }
  }, [activeTab, selectedCurrency]);

  const selectedCrypto = cryptocurrencies.find(crypto => crypto.symbol === selectedCurrency);

  const handleCopyAddress = (address) => {
    if (address && address !== 'Address not available') {
      navigator.clipboard.writeText(address);
      console.log(`Copied address: ${address}`);
      toast.success('Address copied to clipboard!');
      setError(null);
    } else {
      setError('No valid address to copy');
      toast.error('No valid address to copy');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Transaction submitted:', { activeTab, selectedCurrency, amount, walletAddress, network: selectedCrypto.network });

    if (activeTab === 'withdraw') {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          toast.error('Please log in to withdraw');
          setCurrentPage('login');
          return;
        }

        // Validate wallet address
        if (!walletAddress || walletAddress === 'Address not available') {
          toast.error('No valid withdrawal address available');
          return;
        }

        // Validate amount
        const parsedAmount = parseFloat(amount);
        if (isNaN(parsedAmount) || parsedAmount <= 0) {
          toast.error('Please enter a valid amount');
          return;
        }

        // Send withdrawal request using POST to the new endpoint
        console.log('Sending withdrawal request:', {
          endpoint: `${API_BASE_URL}/details/user/withdraw/`,
          data: {
            network: networkMapping[selectedCurrency],
            amount: parsedAmount.toFixed(8),
            address: walletAddress,
          },
        });
        const response = await axios.post(
          `${API_BASE_URL}/details/user/withdraw/`,
          {
            network: networkMapping[selectedCurrency],
            amount: parsedAmount.toFixed(8),
            address: walletAddress,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          }
        );

        console.log('Withdrawal response:', {
          status: response.status,
          data: response.data,
        });

        // Add transaction to local state if setTransactions is a function
        const newTransaction = {
          id: response.data.transaction_id || `temp-${Date.now()}`,
          type: 'withdrawal',
          amount: parsedAmount,
          wallet_address: walletAddress,
          network: networkMapping[selectedCurrency],
          status: 'pending',
          timestamp: new Date().toISOString(),
        };

        if (typeof setTransactions === 'function') {
          setTransactions((prev) => [newTransaction, ...prev]);
        } else {
          console.warn('setTransactions is not a function, skipping transaction state update');
        }

        // Show success message
        toast.success(`Withdrawal of ${parsedAmount} ${selectedCurrency} to ${walletAddress} (${networkMapping[selectedCurrency]}) initiated successfully!`);

        // Reset form
        setAmount('');
        setWalletAddress('Address not available');
        // Fetch new withdrawal address after submission
        await fetchWithdrawalAddress();
      } catch (err) {
        console.error('Withdrawal error:', {
          message: err.message,
          status: err.response?.status,
          data: err.response?.data,
        });

        let errorMessage = 'Withdrawal request failed. Please try again or contact support.';
        if (err.response?.status === 401) {
          errorMessage = 'Session expired. Please log in again.';
          setCurrentPage('login');
        } else if (err.response?.status === 404) {
          errorMessage = 'Withdrawal endpoint not found. Please contact support.';
        } else if (err.response?.status >= 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (err.code === 'ERR_NETWORK') {
          errorMessage = 'Network error. Please check your connection.';
        } else if (err.response?.data?.message) {
          errorMessage = err.response.data.message;
        }

        toast.error(errorMessage);
      }
    } else {
      // Deposit logic (unchanged)
      toast.error('Deposit functionality not implemented in this version');
    }
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
                    value={depositAddresses[selectedCurrency]}
                    readOnly
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white font-mono text-xs sm:text-sm"
                  />
                  <button
                    onClick={() => handleCopyAddress(depositAddresses[selectedCurrency])}
                    className="p-2 sm:p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                    disabled={depositAddresses[selectedCurrency] === 'Address not available'}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setShowQR(!showQR)}
                    className="p-2 sm:p-3 bg-purple-500 hover:bg-purple-600 rounded-lg text-white transition-colors"
                    disabled={depositAddresses[selectedCurrency] === 'Address not available'}
                  >
                    <QrCode className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {showQR && depositAddresses[selectedCurrency] !== 'Address not available' && (
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
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={walletAddress}
                    readOnly
                    className="flex-1 bg-gray-700/50 border border-gray-600 rounded-lg px-3 py-2 sm:px-4 sm:py-3 text-white font-mono text-xs sm:text-sm cursor-not-allowed"
                    placeholder={`Loading ${selectedCurrency} address...`}
                  />
                  <button
                    onClick={() => handleCopyAddress(walletAddress)}
                    className="p-2 sm:p-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-white transition-colors"
                    disabled={walletAddress === 'Address not available'}
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
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
                disabled={walletAddress === 'Address not available'}
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