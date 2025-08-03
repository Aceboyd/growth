import React, { useState } from 'react';
import { Wallet, Bitcoin } from 'lucide-react';
// import axios from 'axios';
import toast from 'react-hot-toast';

const Accounts = () => {
  const [bankFormData, setBankFormData] = useState({
    account_name: '',
    bank_name: '',
    account_number: '',
    routing_number: '',
  });
  const [walletFormData, setWalletFormData] = useState({
    wallet_address: '',
    network: 'btc',
  });
  const [isBankSubmitting, setIsBankSubmitting] = useState(false);
  const [isWalletSubmitting, setIsWalletSubmitting] = useState(false);

  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleWalletInputChange = (e) => {
    const { name, value } = e.target;
    setWalletFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setIsBankSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Please log in to add a bank account');
        return;
      }

    //   const response = await axios.post(
    //     'https://growthsph.onrender.com/auth/bank-accounts/',
    //     bankFormData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //       withCredentials: true,
    //     }
    //   );

      toast.success('Bank account added successfully!');
      setBankFormData({
        account_name: '',
        bank_name: '',
        account_number: '',
        routing_number: '',
      });
    } catch (err) {
      console.error('Error adding bank account:', err);
      toast.error('Failed to add bank account. Please try again.');
    } finally {
      setIsBankSubmitting(false);
    }
  };

  const handleWalletSubmit = async (e) => {
    e.preventDefault();
    setIsWalletSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Please log in to add a wallet');
        return;
      }

    //   const response = await axios.post(
    //     'https://growthsph.onrender.com/auth/wallets/',
    //     walletFormData,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //         'Content-Type': 'application/json',
    //       },
    //       withCredentials: true,
    //     }
    //   );

      toast.success('Wallet added successfully!');
      setWalletFormData({
        wallet_address: '',
        network: 'btc',
      });
    } catch (err) {
      console.error('Error adding wallet:', err);
      toast.error('Failed to add wallet. Please try again.');
    } finally {
      setIsWalletSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-white flex items-center">
          <Wallet className="w-6 h-6 mr-2" /> Add New Account
        </h1>

        {/* Bank Account Form */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-white flex items-center mb-4">
            <Wallet className="w-5 h-5 mr-2" /> Bank Account
          </h2>
          <form onSubmit={handleBankSubmit} className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Account Name
                </label>
                <input
                  type="text"
                  name="account_name"
                  value={bankFormData.account_name}
                  onChange={handleBankInputChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  name="bank_name"
                  value={bankFormData.bank_name}
                  onChange={handleBankInputChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Chase Bank"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  name="account_number"
                  value={bankFormData.account_number}
                  onChange={handleBankInputChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 1234567890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Routing Number
                </label>
                <input
                  type="text"
                  name="routing_number"
                  value={bankFormData.routing_number}
                  onChange={handleBankInputChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 021000021"
                  required
                />
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isBankSubmitting}
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity ${
                  isBankSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isBankSubmitting ? 'Adding Bank Account...' : 'Add Bank Account'}
              </button>
            </div>
          </form>
        </div>

        {/* Crypto Wallet Form */}
        <div>
          <h2 className="text-lg font-semibold text-white flex items-center mb-4">
            <Bitcoin className="w-5 h-5 mr-2" /> Crypto Wallet
          </h2>
          <form onSubmit={handleWalletSubmit} className="bg-gray-800/50 p-6 rounded-lg shadow-lg border border-gray-700/50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Wallet Address
                </label>
                <input
                  type="text"
                  name="wallet_address"
                  value={walletFormData.wallet_address}
                  onChange={handleWalletInputChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 0x1234...abcd"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Network
                </label>
                <select
                  name="network"
                  value={walletFormData.network}
                  onChange={handleWalletInputChange}
                  className="w-full bg-gray-700/50 text-white border border-gray-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="btc">BTC</option>
                  <option value="eth">ETH</option>
                  <option value="usdt">USDT</option>
                </select>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                disabled={isWalletSubmitting}
                className={`w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium py-3 rounded-lg hover:opacity-90 transition-opacity ${
                  isWalletSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isWalletSubmitting ? 'Adding Wallet...' : 'Add Wallet'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Accounts;