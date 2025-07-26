import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const VerifyEmail = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [message, setMessage] = useState('Verifying your email address...');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setMessage('⚠️ Invalid or missing verification token.');
        setIsSuccess(false);
        return;
      }

      try {
        await axios.post(
          'https://growthsphere.onrender.com/api/auth/verify-email/',
          { token }
        );
        setMessage('🎉 Email verified successfully! Redirecting to sign-in...');
        setIsSuccess(true);
        setTimeout(() => navigate('/signin'), 3000);
      } catch (error) {
        const data = error.response?.data;
        const detail =
          typeof data === 'object'
            ? Object.values(data).flat().join('\n')
            : '⚠️ Verification failed. The link may be invalid or expired.';
        setMessage(detail);
        setIsSuccess(false);
      }
    };

    verifyEmail();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/signup" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Sign Up
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Email Verification</h1>
          <p className="text-gray-600">Processing your verification...</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-lg text-center">
          <div className="flex justify-center mb-4">
            {isSuccess ? (
              <CheckCircle className="h-12 w-12 text-emerald-600" />
            ) : (
              <AlertCircle className="h-12 w-12 text-red-500" />
            )}
          </div>
          <p className={`text-sm ${isSuccess ? 'text-emerald-600' : 'text-red-500'}`}>
            {message}
          </p>
          {!isSuccess && (
            <div className="mt-6">
              <p className="text-gray-600">
                Need a new verification link?{' '}
                <Link to="/signup" className="text-emerald-600 hover:text-emerald-700 font-medium">
                  Sign up again
                </Link>
              </p>
            </div>
          )}
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Your information is encrypted and secure</p>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;