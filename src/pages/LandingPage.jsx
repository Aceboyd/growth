import React from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import InvestmentSection from '../components/InvestmentSection';
import InvestmentTypes from '../components/InvestmentTypes';
import ExchangeRateMatrix from '../components/ExchangeRateMatrix';
import SecuritySection from '../components/SecuritySection';
import HowItWorks from '../components/HowItWorks';
import PricingSection from '../components/PricingSection';
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
      <section id="forex-matrix" className="py-12 px-4">
        <ExchangeRateMatrix />
      </section>
      <SecuritySection />
      <HowItWorks />
      <PricingSection />
      <AboutUs />
      <CertificatesSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default LandingPage;