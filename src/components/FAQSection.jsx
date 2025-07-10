import React, { useState } from 'react';

const FAQSection = () => {
  // State to track which FAQ is open
  const [openFAQ, setOpenFAQ] = useState(null);

  // Toggle function for opening/closing FAQs
  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  // FAQ data with questions and answers
  const faqs = [
    {
      question: "How does Growthsphere Investment work?",
      answer: "Growthsphere Investment is an automated trading platform that uses advanced algorithms to execute trades based on your configured strategies. Users can deposit funds, set trading preferences, and let the system trade on their behalf in the cryptocurrency market."
    },
    {
      question: "What cryptocurrencies can I trade on Growthsphere Investment?",
      answer: "Growthsphere Investment supports a wide range of cryptocurrencies, including Bitcoin (BTC), Ethereum (ETH), Binance Coin (BNB), and many other major altcoins. Check the platform for a complete list of supported assets."
    },
    {
      question: "Is Growthsphere Investment safe and secure to use?",
      answer: "Growthsphere Investment employs industry-standard security measures, including encryption, two-factor authentication, and secure wallet management to ensure the safety of user funds and data."
    },
    {
      question: "How do I get started with automated trading on Growthsphere Investment?",
      answer: "To get started, simply sign up for an account on the Growthsphere Investment website, deposit funds, configure your trading preferences, and activate your chosen trading strategies."
    },
    {
      question: "Can I customize my trading strategies on Growthsphere Investment?",
      answer: "Yes, Growthsphere Investment allows users to customize trading strategies by setting parameters such as risk levels, trading pairs, and specific market conditions to match their investment goals."
    },
    {
      question: "What fees are associated with using Growthsphere Investment?",
      answer: "Growthsphere Investment charges a competitive fee structure, including trading fees and potential performance-based fees. Detailed fee information is available on the platform’s pricing page."
    },
    {
      question: "Does Growthsphere Investment offer customer support?",
      answer: "Yes, Growthsphere Investment provides 24/7 customer support via email, live chat, and a comprehensive help center to assist users with any issues or questions."
    },
    {
      question: "What is the minimum investment required to use Growthsphere Investment?",
      answer: "The minimum investment required to start trading on Growthsphere Investment varies based on the account type but is typically accessible for most users. Check the platform for specific details."
    },
    {
      question: "Are there any performance metrics or historical data available for the automated trading strategies on Growthsphere Investment?",
      answer: "Yes, Growthsphere Investment provides performance metrics and historical data for its automated trading strategies, allowing users to evaluate their effectiveness before activating them."
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-emerald-500 font-semibold text-lg">FAQ</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-16">
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200">
              <h3 
                className="text-xl font-bold text-gray-900 mb-2 cursor-pointer flex justify-between items-center py-4"
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="text-emerald-500">
                  {openFAQ === index ? '−' : '+'}
                </span>
              </h3>
              <div 
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openFAQ === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="text-gray-600 mt-2 pb-4">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;