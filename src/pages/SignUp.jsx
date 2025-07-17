import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, Eye, EyeOff, ArrowLeft, CheckCircle } from 'lucide-react';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    investmentGoal: '',
    riskTolerance: '',
    accountType: '',
    trades: '',
    agreeToTerms: false,
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? e.target.checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    if (!formData.trades) {
      alert('Please choose a trade.');
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
      first_name: formData.firstName,
      last_name: formData.lastName,
      phone_number: formData.phone,
      investment_goal: formData.investmentGoal,
      risk_tolerance: formData.riskTolerance,
      account_type: formData.accountType,
      choose_trades: formData.trades.toLowerCase(),
    };

    try {
      const response = await axios.post(
        'https://growthsphere.onrender.com/api/auth/register/',
        payload
      );
      alert('🎉 Registration successful! Please sign in.');
      navigate('/signin');
    } catch (error) {
      const data = error.response?.data;
      const detail =
        typeof data === 'object'
          ? Object.values(data).flat().join('\n')
          : '⚠️ Registration failed. Please try again.';
      alert(detail);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-emerald-600 hover:text-emerald-700 mb-6">
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
          <div className="flex justify-center mb-4">
            <TrendingUp className="h-12 w-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join GrowthSphere</h1>
          <p className="text-gray-600">Start your investment journey today</p>
        </div>

        <div className="bg-gray-50 rounded-xl p-8 border border-gray-200 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" />
              </div>
            </div>

            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Email Address" />
            <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg" placeholder="Phone Number" />

            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleInputChange} required className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg" placeholder="Password" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} required className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg" placeholder="Confirm Password" />
              <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400">
                {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <select name="investmentGoal" value={formData.investmentGoal} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Select Investment Goal</option>
              <option value="retirement_planning">Retirement Planning</option>
              <option value="wealth_building">Wealth Building</option>
              <option value="education_funding">Education Funding</option>
              <option value="home_purchase">Home Purchase</option>
              <option value="general_investing">General Investing</option>
            </select>

            <select name="riskTolerance" value={formData.riskTolerance} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Select Risk Tolerance</option>
              <option value="conservative_low_risk">Conservative - Low Risk</option>
              <option value="moderate_balanced_risk">Moderate - Balanced Risk</option>
              <option value="aggressive_high_risk">Aggressive - High Risk</option>
            </select>

            <select name="accountType" value={formData.accountType} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Choose Account Type</option>
              <option value="starter_plan">Starter Plan</option>
              <option value="silver_plan">Silver Plan</option>
              <option value="gold_plan">Gold Plan</option>
            </select>

            <select name="trades" value={formData.trades} onChange={handleInputChange} required className="w-full px-4 py-3 border border-gray-300 rounded-lg">
              <option value="">Choose a Trade</option>
              <option value="crypto">Crypto</option>
              <option value="crude">Crude</option>
              <option value="gold">Gold</option>
              <option value="stock">Stock</option>
              <option value="cfd">CFD</option>
              <option value="fx">FX</option>
            </select>

            <div className="flex items-start">
              <input type="checkbox" name="agreeToTerms" checked={formData.agreeToTerms} onChange={handleInputChange} required className="mt-1 h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded" />
              <label className="ml-3 text-sm text-gray-700">
                I agree to the <a href="#" className="text-emerald-600 hover:text-emerald-700">Terms of Service</a> and <a href="#" className="text-emerald-600 hover:text-emerald-700">Privacy Policy</a>.
              </label>
            </div>

            <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              Create Account
            </button>
          </form>

          <div className="text-center mt-6">
            <p className="text-gray-600">
              Already have an account? <Link to="/signin" className="text-emerald-600 hover:text-emerald-700 font-medium">Sign In</Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Your information is encrypted and secure</p>
          <p>SIPC insured up to $500,000</p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
