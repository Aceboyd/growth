import React, { lazy, Suspense, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';

// Lazy-loaded pages
const DashboardContent = lazy(() => import('../components/Dash'));
const KYCVerification = lazy(() => import('../components/KYCVerification'));
const DepositWithdraw = lazy(() => import('../components/DepositWithdraw'));
const TransactionHistory = lazy(() => import('../components/TransactionHistory'));
const MarketTrades = lazy(() => import('../components/MarketTrades'));
const UserSettings = lazy(() => import('../components/UserSettings'));
const Accounts = lazy(() => import('../components/Accounts'));

function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState({
    id: 'CRY789456',
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    kycStatus: 'unverified',
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=64&h=64&dpr=1',
  });

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 overflow-hidden relative">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full z-50 transition-transform transform lg:relative ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <Sidebar
          user={user}
          setUser={setUser}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} setSidebarOpen={setSidebarOpen} />
        <main className="flex-1 overflow-y-auto p-3 sm:p-4 lg:p-6">
          <Suspense fallback={<div className="text-white">Loading...</div>}>
            <Routes>
              <Route index element={<DashboardContent user={user} />} />
              <Route path="kyc" element={<KYCVerification user={user} setUser={setUser} />} />
              <Route path="deposit-withdraw" element={<DepositWithdraw />} />
              <Route path="transactions" element={<TransactionHistory />} />
              <Route path="market" element={<MarketTrades />} />
              <Route path="accounts" element={<Accounts />} />
              <Route path="settings" element={<UserSettings user={user} setUser={setUser} />} />

              {/* Catch-all redirect to dashboard if unknown path */}
              <Route path="*" element={<Navigate to="/dash" replace />} />
            </Routes>
          </Suspense>
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default DashboardLayout;
