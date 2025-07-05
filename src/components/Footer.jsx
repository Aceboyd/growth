import React from 'react';
import { Globe } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-blue-500 rounded-full flex items-center justify-center">
                <Globe className="h-6 w-6 text-white" />
              </div>
              <span className="ml-3 text-xl font-bold text-white">Growth Sphere</span>
            </div>
          </div>
          
          <div>
            <div className="space-y-3">
              <a href="#home" className="block text-white/80 hover:text-white transition-colors">Home</a>
              <a href="#about" className="block text-white/80 hover:text-white transition-colors">About Us</a>
              <a href="#contact" className="block text-white/80 hover:text-white transition-colors">Contact Us</a>
              <a href="#privacy" className="block text-white/80 hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
          
          <div>
            <div className="space-y-3">
              <a href="#regulation" className="block text-white/80 hover:text-white transition-colors">Regulation</a>
              <a href="#terms" className="block text-white/80 hover:text-white transition-colors">Terms of Service</a>
              <a href="#reviews" className="block text-white/80 hover:text-white transition-colors">Reviews</a>
            </div>
          </div>
          
          <div>
            <div className="text-white/80">
              support@support@growthshereinvestment.com
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-8">
          <div className="text-white/60 text-sm">
            Copyright © 2020 Growthsphere Investment
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;