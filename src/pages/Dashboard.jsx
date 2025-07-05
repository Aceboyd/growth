import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Dashboard from '../components/Dashboard';
import KYCVerification from '../components/KYCVerification';
import DepositWithdraw from '../components/DepositWithdraw';
import TransactionHistory from '../components/TransactionHistory';
import MarketTrades from '../components/MarketTrades';
import UserSettings from '../components/UserSettings';

function Dash() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [user, setUser] = useState({
    id: 'CRY789456',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    kycStatus: 'verified',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1'
  });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard user={user} />;
      case 'kyc':
        return <KYCVerification user={user} setUser={setUser} />;
      case 'deposit-withdraw':
        return <DepositWithdraw />;
      case 'transactions':
        return <TransactionHistory />;
      case 'market':
        return <MarketTrades />;
      case 'settings':
        return <UserSettings user={user} setUser={setUser} />;
      default:
        return <Dashboard user={user} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} user={user} setUser={setUser} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderCurrentPage()}
        </main>
      </div>
    </div>
  );
}

export default Dash;