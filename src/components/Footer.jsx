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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Brand and Description */}
            <div className="flex flex-col items-start">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="ml-3 text-lg font-bold text-white"><h1 className="growth-logo">GROWTHSPHERE</h1></span>
              </div>
              <p className="text-white/80 text-sm max-w-md leading-relaxed">
                Growth Sphere is a trusted crypto investment platform that offers automated trading, secure wallets, and unmatched ROI for investors worldwide. We help you grow your wealth through innovation, transparency, and cutting-edge blockchain solutions.
              </p>
            </div>

            {/* Empty Column to balance layout */}
            <div></div>

            {/* Contact Info */}
            <div className="text-white/80 text-sm flex flex-col items-start">
              <span className="mb-2 font-semibold">Contact</span>
              <span>support@growthshere.com</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
