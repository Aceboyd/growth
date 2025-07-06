import React from 'react';
import { Globe, Bitcoin } from 'lucide-react';

const Footer = () => {
  return (
    <>
      {/* Floating Payment Methods */}
      <div className="relative z-10">
        <div className="max-w-2xl mx-auto -mb-12 px-4">
          <div className="bg-white rounded-xl shadow-xl px-6 py-8 flex flex-row flex-wrap justify-center items-center gap-10 text-left">
            {/* Bitcoin */}
            <div className="flex items-center space-x-2">
              <Bitcoin className="h-5 w-5 text-orange-500" />
              <span className="text-gray-500 text-sm font-semibold">bitcoin</span>
            </div>

            {/* Ethereum */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">E</span>
              </div>
              <span className="text-gray-500 text-sm font-semibold">ethereum</span>
            </div>

            {/* Tether */}
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs font-bold">₮</span>
              </div>
              <span className="text-gray-500 text-sm font-semibold">tether</span>
            </div>

            {/* MasterCard */}
            <div className="flex items-center">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png"
                alt="MasterCard"
                className="h-6 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-blue-900 pt-28 pb-12 px-4 lg:px-8 relative z-0">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-4 gap-8 text-left">
            {/* Brand */}
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-lg font-bold text-white">Growth Sphere</span>
              </div>
            </div>

            {/* Links 1 */}
            <div className="space-y-3">
              <a href="#home" className="block text-white/80 hover:text-white text-sm">Home</a>
              <a href="#about" className="block text-white/80 hover:text-white text-sm">About Us</a>
              <a href="#contact" className="block text-white/80 hover:text-white text-sm">Contact Us</a>
              <a href="#privacy" className="block text-white/80 hover:text-white text-sm">Privacy Policy</a>
            </div>

            {/* Links 2 */}
            <div className="space-y-3">
              <a href="#regulation" className="block text-white/80 hover:text-white text-sm">Regulation</a>
              <a href="#terms" className="block text-white/80 hover:text-white text-sm">Terms of Service</a>
              <a href="#reviews" className="block text-white/80 hover:text-white text-sm">Reviews</a>
            </div>

            {/* Contact */}
            <div className="text-white/80 flex flex-col items-start text-sm">
              support@growthshereinvestment.com
            </div>
          </div>

          {/* Bottom Text */}
          <div className="border-t border-white/20 mt-8 pt-8 text-sm text-white/60 text-left">
            © 2020 Growthsphere Investment
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;