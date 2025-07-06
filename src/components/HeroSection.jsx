import React from 'react';
import { Link } from 'react-router-dom';
import { Lock, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image with Overlay - Drops in first */}
      <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg')] bg-cover bg-center animate-drop-in">
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60 animate-pulse-slow"></div>
      </div>
      
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-white/40 rounded-full animate-float-fast"></div>
        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-300/25 rounded-full animate-float-slow"></div>
      </div>
      
      {/* Content - Drops in after background */}
      <div className="relative max-w-7xl mx-auto pt-4 sm:pt-16 animate-drop-in-delayed">
        <div className="max-w-4xl text-left">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            <span className="inline-block animate-text-shimmer bg-gradient-to-r from-white via-emerald-200 to-white bg-clip-text text-transparent bg-[length:200%_auto] animate-shake-intense cursor-pointer select-none">
              Revolutionizing Crypto Trading
            </span>
            <br />
            <span className="text-white/90 animate-shake-hover cursor-pointer select-none">
              And Creating Your Gateway to Global Investment
            </span>
          </h1>
          
          <p className="text-xl text-white/90 mb-8 max-w-3xl leading-relaxed animate-shake-hover cursor-pointer select-none">
            Unleash the power of our comprehensive suite of trading tools and in-depth market analysis to seamlessly implement, scale, and refine your cryptocurrency trading strategies.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-start animate-drop-in-slow">
            <Link 
              to="/signin" 
              className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 flex items-center justify-center border border-white/30 backdrop-blur-sm hover:border-white/50 hover:scale-105 hover:shadow-lg hover:shadow-white/10 transform animate-shake-hover"
            >
              <Lock className="mr-2 h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
              Sign In
              <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
            </Link>
            
            <Link 
              to="/signup" 
              className="group bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/30 transform relative overflow-hidden animate-shake-hover"
            >
              <span className="relative z-10 flex items-center justify-center">
                Create an Account
                <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-emerald-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator - Drops in last */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce animate-drop-in-slow">
        <div className="w-1 h-16 bg-gradient-to-b from-white/60 to-transparent rounded-full"></div>
      </div>
    </section>
  );
};

export default HeroSection;