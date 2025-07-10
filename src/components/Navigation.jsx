import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Globe } from 'lucide-react';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
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
      isScrolled ? 'bg-white shadow-lg backdrop-blur-sm' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center ${
              isScrolled ? 'shadow-md' : ''
            }`}>
              <Globe className="h-6 w-6 text-white" />
            </div>
            <h1 className="growth-logo text-xl sm:text-2xl md:text-2xl lg:text-3xl">GROWTHSPHERE</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 whitespace-nowrap overflow-x-auto">
            {['home', 'about-us', 'reviews', 'regulation', 'pricing'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`whitespace-nowrap flex-shrink-0 text-sm md:text-base transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                {item.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            ))}

            <Link
              to="/signup"
              className={`whitespace-nowrap px-4 py-2 rounded-lg border text-sm md:text-base transition-all duration-300 ${
                isScrolled
                  ? 'bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-300'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm'
              }`}
            >
              Sign up
            </Link>

            <Link
              to="/signin"
              className="whitespace-nowrap bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm md:text-base transition-colors duration-300"
            >
              Sign in
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/20'
            }`}
          >
            {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className={`md:hidden transition-all duration-500 ease-in-out transform ${
            isScrolled ? 'bg-white shadow-md border-t border-gray-200' : 'bg-black/20 backdrop-blur-md border-t border-white/20'
          }`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {['home', 'about-us', 'reviews', 'regulation', 'pricing'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`block px-4 py-3 text-lg font-medium rounded-md transition-colors duration-300 ${
                  isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/90 hover:bg-white/10'
                }`}
              >
                {item.replace('-', ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
              </a>
            ))}

            <Link
              to="/signup"
              className={`block px-4 py-3 text-lg font-medium rounded-md mt-3 transition-all duration-300 ${
                isScrolled ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm'
              }`}
            >
              Sign up
            </Link>

            <Link
              to="/signin"
              className="block px-4 py-3 text-lg font-medium bg-emerald-500 text-white rounded-md mt-3 transition-colors duration-300 hover:bg-emerald-600"
            >
              Sign in
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
