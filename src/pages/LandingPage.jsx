import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import InvestmentSection from '../components/InvestmentSection';
import InvestmentTypes from '../components/InvestmentTypes';
import SecuritySection from '../components/SecuritySection';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import CertificatesSection from '../components/CertificatesSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <InvestmentSection />
      <InvestmentTypes />
      <SecuritySection />
      <HowItWorks />
      <AboutUs />
      <CertificatesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingPage;