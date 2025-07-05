import React from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="relative max-w-7xl mx-auto pt-16">
        <div className="max-w-4xl text-center lg:text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Revolutionizing Crypto Trading And Creating Your Gateway to Global Investment
          </h1>
          <p className="text-xl text-white/90 mb-8 max-w-3xl">
            Unleash the power of our comprehensive suite of trading tools and in-depth market analysis to seamlessly implement, scale, and refine your cryptocurrency trading strategies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link 
              to="/signin" 
              className="bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center border border-white/30 backdrop-blur-sm"
            >
              <Lock className="mr-2 h-5 w-5" />
              Sign In
            </Link>
            <Link 
              to="/signup" 
              className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all"
            >
              Create an Account
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;