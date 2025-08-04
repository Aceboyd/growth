import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast'; // ✅ import toaster
import LandingPage from './pages/LandingPage';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import VerifyEmail from './pages/VerifyEmail';
import VerifyEmailPrompt from './pages/VerifyEmailPrompt'; // New component

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#1f2937', // Tailwind gray-800
              color: '#fff',
            },
          }}
        />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/dash" element={<Dashboard />} />
          <Route path="/verify-email" element={<VerifyEmailPrompt />} />
          <Route path="/activate/:uid/:token" element={<VerifyEmail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
