import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CheckCircle, AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

const VerifyEmail = () => {
  const { uid, token } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying your email...');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState('');

  useEffect(() => {
    const activateAccount = async () => {
      if (!uid || !token) {
        setMessage('⚠️ Missing activation details in the URL.');
        setIsSuccess(false);
        setIsLoading(false);
        return;
      }

      try {
        await axios.post('https://growthsph.onrender.com/auth/users/activation/', {
          uid,
          token,
        });
        setIsSuccess(true);
        setMessage('🎉 Your account has been activated! Redirecting to sign in...');
        setTimeout(() => navigate('/signin', { state: { verified: true } }), 3000);
      } catch (error) {
        const detail =
          error.response?.data?.detail ||
          Object.values(error.response?.data || {}).flat().join('\n') ||
          '⚠️ Activation failed. The link may be invalid or expired.';
        setIsSuccess(false);
        setMessage(detail);
      } finally {
        setIsLoading(false);
      }
    };

    activateAccount();
  }, [uid, token, navigate]);

  const handleResendEmail = async () => {
    if (!email) {
      setMessage('⚠️ Please provide your email to resend the verification link.');
      return;
    }

    setResendLoading(true);
    setMessage('');
    try {
      await axios.post('https://growthsph.onrender.com/auth/users/resend_activation/', {
        email,
      });
      setMessage('🎉 Verification email resent successfully!');
    } finally {
      setResendLoading(false);
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
            {isSuccess
              ? 'Your email has been verified!'
              : 'Please verify your email to activate your account.'}
          </p>
        </div>

        <div className="bg-gray-50 border border-gray-200 shadow-lg rounded-xl p-8">
          <div className="mb-4 flex justify-center">
            {isLoading ? (
              <Loader2 className="w-12 h-12 text-gray-400 animate-spin" />
            ) : isSuccess ? (
              <CheckCircle className="w-12 h-12 text-emerald-600" />
            ) : (
              <AlertCircle className="w-12 h-12 text-red-500" />
            )}
          </div>

          <p className={`text-sm ${isSuccess ? 'text-emerald-600' : 'text-red-500'}`}>
            {message}
          </p>

          {!isLoading && !isSuccess && (
            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter your email to resend verification
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <button
                type="button"
                onClick={handleResendEmail}
                disabled={resendLoading || !email}
                className={`w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center ${
                  resendLoading || !email ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {resendLoading ? (
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                ) : (
                  <CheckCircle className="w-5 h-5 mr-2" />
                )}
                {resendLoading ? 'Resending...' : 'Resend Verification Email'}
              </button>
              <div className="text-gray-600 text-center">
                <p>
                  Need to start over?{' '}
                  <Link
                    to="/signup"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Sign Up
                  </Link>
                </p>
                <p>
                  Already verified?{' '}
                  <Link
                    to="/signin"
                    className="text-emerald-600 hover:text-emerald-700 font-medium"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;