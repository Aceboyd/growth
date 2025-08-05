import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import DashboardLayout from './pages/Dashboard'; // Still importing the same dashboard file
import VerifyEmail from './pages/VerifyEmail';
import VerifyEmailPrompt from './pages/VerifyEmailPrompt';

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937',
              color: '#fff',
            },
          }}
        />

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify-email" element={<VerifyEmailPrompt />} />
          <Route path="/activate/:uid/:token" element={<VerifyEmail />} />

          {/* Dashboard layout with nested routes */}
          <Route path="/dash/*" element={<DashboardLayout />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
