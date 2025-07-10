import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';
import logo from '../assets/image/icon.jpg'; // 👈 Adjust path as needed

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg backdrop-blur-sm' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className={`w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center transition-all duration-300 ${
              isScrolled ? 'shadow-md' : ''
            }`}>
              <Globe className="h-6 w-6 text-white" />
            </div>

            <img 
              src={logo} 
              alt="Logo" 
              className={`ml-3 h-16 transition-all duration-300 ${
                isScrolled ? 'opacity-100' : 'opacity-90'
              }`} 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
            }`}>Home</a>

            <a href="#about-us" onClick={(e) => handleNavClick(e, 'about-us')} className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
            }`}>About Us</a>

            <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
            }`}>Invest</a>

            <a href="#regulation" onClick={(e) => handleNavClick(e, 'regulation')} className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
            }`}>Security</a>

            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
            }`}>Pricing</a>

            <Link to="/signup" className={`px-4 py-2 rounded-lg transition-all duration-300 border ${
              isScrolled ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300' 
                        : 'bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm'
            }`}>Sign up</Link>

            <Link to="/signin" className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg transition-colors duration-300">Sign in</Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
            isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
          }`}>
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={`md:hidden transition-all duration-500 ease-in-out transform ${
          isScrolled 
            ? 'bg-white shadow-md border-t border-gray-200' 
            : 'bg-black/20 backdrop-blur-md border-t border-white/20'
        }`}>
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a href="#home" onClick={(e) => handleNavClick(e, 'home')} className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
            }`}>Home</a>

            <a href="#about-us" onClick={(e) => handleNavClick(e, 'about-us')} className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
            }`}>About Us</a>

            <a href="#reviews" onClick={(e) => handleNavClick(e, 'reviews')} className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
            }`}>Invest</a>

            <a href="#regulation" onClick={(e) => handleNavClick(e, 'regulation')} className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
            }`}>Security</a>

            <a href="#pricing" onClick={(e) => handleNavClick(e, 'pricing')} className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
            }`}>Pricing</a>

            <Link to="/signup" className={`block px-4 py-3 text-lg font-medium rounded-md mt-3 transition-all duration-300 ${
              isScrolled ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                        : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
            }`}>Sign up</Link>

            <Link to="/signin" className="block px-4 py-3 text-lg font-medium bg-emerald-500 text-white rounded-md mt-3 transition-colors duration-300 hover:bg-emerald-600">Sign in</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
