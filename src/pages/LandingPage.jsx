import React, { lazy, Suspense } from 'react';
import Navigation from '../components/Navigation';
import HeroSection from '../components/HeroSection';
import InvestmentSection from '../components/InvestmentSection';
import InvestmentTypes from '../components/InvestmentTypes';

// Lazy-load components below the fold
const ExchangeRateMatrix = lazy(() => import('../components/ExchangeRateMatrix'));
const SecuritySection = lazy(() => import('../components/SecuritySection'));
const HowItWorks = lazy(() => import('../components/HowItWorks'));
const PricingSection = lazy(() => import('../components/PricingSection'));
const AboutUs = lazy(() => import('../components/AboutUs'));
const CertificatesSection = lazy(() => import('../components/CertificatesSection'));
const Testimony = lazy(() => import('../components/Testimony'));
const FAQSection = lazy(() => import('../components/FAQSection'));
const Footer = lazy(() => import('../components/Footer'));
const TestimonialPopup = lazy(() => import('../components/TestimonialPopup'));

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <HeroSection />
      <InvestmentSection />
      <InvestmentTypes />
      <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
        <section id="forex-matrix" className="py-12 px-4">
          <ExchangeRateMatrix />
        </section>
        <SecuritySection />
        <HowItWorks />
        <PricingSection />
        <AboutUs />
        <CertificatesSection />
        <Testimony />
        <FAQSection />
        <Footer />
        <TestimonialPopup />
      </Suspense>
    </div>
  );
};

export default LandingPage;