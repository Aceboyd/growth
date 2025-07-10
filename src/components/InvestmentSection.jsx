import React from 'react';
import { Link } from 'react-router-dom';
import { Bitcoin } from 'lucide-react';

const InvestmentSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Secure your future with responsible investments.
            </h2>
            <Link 
              to="/signup" 
              className="inline-block bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Invest Now
            </Link>
          </div>
          <div className="relative">
            <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl">
              <img 
                src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg" 
                alt="Investment portfolio analysis" 
                className="w-full h-100 object-cover rounded-lg"
              />
              <div className="absolute top-12 left-12 space-y-4">
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center space-x-3">
                  <Bitcoin className="h-6 w-6 text-orange-500" />
                  <span className="font-semibold text-gray-900">Bitcoin</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold text-gray-900">Gold</span>
                </div>
                <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-800 rounded-sm flex items-center justify-center">
                    <span className="text-white text-xs font-bold">A</span>
                  </div>
                  <span className="font-semibold text-gray-900">Apple</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentSection;