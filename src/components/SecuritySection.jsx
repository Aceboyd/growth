import React from 'react';
import { BarChart3, Lock, Shield, Eye, Settings } from 'lucide-react';

const SecuritySection = () => {
  return (
    <section id="regulation" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-emerald-500 font-semibold text-lg">SECURITY</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-16">
          Our Commitment to Compliance and Your Protection
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
              <BarChart3 className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Fund Protection</h3>
            <p className="text-gray-600">
              Leveraging industry-leading security practices, we safeguard your assets through offline cold wallet storage. Our comprehensive Triple Fund Protection further bolsters the security framework, ensuring unparalleled peace of mind for a trust-worthy and reliable experience.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-lg mb-4 mx-auto">
              <Lock className="h-6 w-6 text-orange-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Data Privacy & Security</h3>
            <p className="text-gray-600">
              Built with data privacy and security at the core, our products and services prioritize your control over your information. We are transparent about the data we collect, and clearly explain how it is used and shared, empowering you to make informed choices.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 mx-auto">
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">End-to-End Encryption</h3>
            <p className="text-gray-600">
              Your private and personal information remains protected throughout its journey, secured by end-to-end encryption both in transit and at rest. To further safeguard your data, strict authorization controls ensure only you have the keys to access it.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-lg mb-4 mx-auto">
              <Eye className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Live Insights</h3>
            <p className="text-gray-600">
              Growthsphere Investment prioritizes your security with Live Insights, continuously analyzing user behavior to identify potential risks. If suspicious activity is detected, enhanced authentication safeguards your withdrawals for an extra layer of protection.
            </p>
          </div>

          <div className="bg-gray-50 rounded-xl p-8">
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-lg mb-4 mx-auto">
              <Settings className="h-6 w-6 text-gray-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Trustworthy by Design</h3>
            <p className="text-gray-600">
              Built with trust in mind, our system integrates a secure development life cycle, rigorous security testing, and ongoing bug bounty programs, solidifying its reliability and safeguarding your information.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SecuritySection;