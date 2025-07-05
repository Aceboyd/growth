import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import InvestmentSection from '../components/InvestmentSection';
import InvestmentTypes from '../components/InvestmentTypes';
import SecuritySection from '../components/SecuritySection';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import FAQSection from '../components/FAQSection';
import PaymentMethods from '../components/PaymentMethods';
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
      <FAQSection />
      <PaymentMethods />
      <Footer />
    </div>
  );
};

export default LandingPage;