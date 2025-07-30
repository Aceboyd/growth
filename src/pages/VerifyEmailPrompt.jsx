import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

const VerifyEmailPrompt = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const email = location.state?.email || '';

  const handleResendEmail = async () => {
    if (!email) {
      setMessage('⚠️ No email provided. Please sign up again.');
      return;
    }

    setIsLoading(true);
    setMessage('');
    try {
      await axios.post('https://growthsph.onrender.com/auth/users/resend_activation/', {
        email,
      });
      setMessage('🎉 Verification email resent successfully!');
    } catch (error) {
      setMessage('⚠️ Failed to resend verification email. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-white">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Your Email</h1>
          <p className="text-gray-600">
            {email
              ? `We've sent a verification link to ${email}. Please check your inbox (and spam folder).`
              : 'Please check your inbox (and spam folder) for the verification link.'}
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-8">
          {message && (
            <p className={`text-sm ${message.includes('successfully') ? 'text-emerald-600' : 'text-red-500'}`}>
              {message}
            </p>
          )}
          <button
            type="button"
            onClick={handleResendEmail}
            disabled={isLoading || !email}
            className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center ${
              isLoading || !email ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            ) : (
              <CheckCircle className="w-5 h-5 mr-2" />
            )}
            {isLoading ? 'Resending...' : 'Resend Verification Email'}
          </button>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already verified?{' '}
              <Link to="/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign In
              </Link>
            </p>
            <p className="text-gray-600">
              Need to start over?{' '}
              <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPrompt;