import React, { useState, lazy, Suspense } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Lazy-load components
const DashboardContent = lazy(() => import('../components/Dash'));
const KYCVerification = lazy(() => import('../components/KYCVerification'));
const DepositWithdraw = lazy(() => import('../components/DepositWithdraw'));
const TransactionHistory = lazy(() => import('../components/TransactionHistory'));
const MarketTrades = lazy(() => import('../components/MarketTrades'));
const UserSettings = lazy(() => import('../components/UserSettings'));
const Accounts = lazy(() => import('../components/Accounts'));

function Dash() {
  const [currentPage, setCurrentPage] = useState('dashboard'); // Updated default
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState({
    id: 'CRY789456',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    kycStatus: 'unverified',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
  });

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardContent user={user} setCurrentPage={setCurrentPage} />;
      case 'kyc':
        return <KYCVerification user={user} setUser={setUser} />;
      case 'deposit-withdraw':
        return <DepositWithdraw />;
      case 'transactions':
        return <TransactionHistory />;
      case 'market':
        return <MarketTrades />;
      case 'accounts':
        return <Accounts />;
      case 'settings':
        return <UserSettings user={user} setUser={setUser} />;
      default:
        return <DashboardContent user={user} setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden">
      <Sidebar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        user={user}
        setUser={setUser}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            {renderCurrentPage()}
          </Suspense>
        </main>
      </div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Dash;