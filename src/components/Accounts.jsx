import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const BankWalletForm = () => {
  const [bankFormData, setBankFormData] = useState({
    account_name: '',
    account_number: '',
    bank_name: '',
    routing_number: '',
  });

  const [walletFormData, setWalletFormData] = useState({
    address: '',
    network: 'btc',
  });

  const [isBankSubmitting, setIsBankSubmitting] = useState(false);
  const [isWalletSubmitting, setIsWalletSubmitting] = useState(false);

  const handleBankInputChange = (e) => {
    const { name, value } = e.target;
    setBankFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleWalletInputChange = (e) => {
    const { name, value } = e.target;
    setWalletFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBankSubmit = async (e) => {
    e.preventDefault();
    setIsBankSubmitting(true);

    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        toast.error('Please log in to add bank account');
        return;
      }

      await axios.post(
        'https://growthsph.onrender.com/details/user/bank/',
        bankFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      toast.success('Bank account added successfully!');
      setBankFormData({
        account_name: '',
        account_number: '',
        bank_name: '',
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
        toast.error('Please log in to add wallet');
        return;
      }

      await axios.post(
        'https://growthsph.onrender.com/details/user/wallet/',
        walletFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      toast.success('Wallet added successfully!');
      setWalletFormData({
        address: '',
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
    <div className="max-w-6xl mx-auto mt-12 px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bank Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8">Add Bank Details</h2>
          <form onSubmit={handleBankSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Account Name
              </label>
              <input
                type="text"
                name="account_name"
                value={bankFormData.account_name}
                onChange={handleBankInputChange}
                className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter account name"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                value={bankFormData.account_number}
                onChange={handleBankInputChange}
                className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter account number"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Routing Number
              </label>
              <input
                type="text"
                name="routing_number"
                value={bankFormData.routing_number}
                onChange={handleBankInputChange}
                className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter routing number"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Bank Name
              </label>
              <input
                type="text"
                name="bank_name"
                value={bankFormData.bank_name}
                onChange={handleBankInputChange}
                className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="Enter bank name"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isBankSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isBankSubmitting ? 'Submitting...' : 'Add Bank Account'}
            </button>
          </form>
        </div>

        {/* Crypto Wallet Form */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl shadow-xl border border-gray-700">
          <h2 className="text-3xl font-bold text-white mb-8">Add Crypto Wallet</h2>
          <form onSubmit={handleWalletSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Wallet Address
              </label>
              <input
                type="text"
                name="address"
                value={walletFormData.address}
                onChange={handleWalletInputChange}
                className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                placeholder="e.g., 0x123...abc"
                required
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-medium text-gray-200">
                Network
              </label>
              <select
                name="network"
                value={walletFormData.network}
                onChange={handleWalletInputChange}
                className="w-full bg-gray-900/50 text-white border border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                required
              >
                <option value="btc">Bitcoin</option>
                <option value="eth">Ethereum</option>
                <option value="usdt">USDT</option>
                <option value="bnb">BNB</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isWalletSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isWalletSubmitting ? 'Submitting...' : 'Add Wallet'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BankWalletForm;