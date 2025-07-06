import React from 'react';

const steps = [
  {
    num: '01',
    title: 'Register',
    desc: 'Sign up for an account on Growthsphere Investment by providing your email address, creating a password, and agreeing to the terms and conditions. Registration typically involves filling out a form with basic personal information.',
    button: true,
  },
  {
    num: '02',
    title: 'Verify',
    desc: 'Complete the verification process by providing additional documentation to confirm your identity and comply with regulatory requirements. This step may involve uploading a government-issued ID, proof of address, and in some cases, undergoing a Know Your Customer (KYC) procedure.',
  },
  {
    num: '03',
    title: 'Deposit Funds',
    desc: 'After your account is verified, deposit funds into your trading account using one of the supported payment methods. This usually includes bank transfers, credit/debit cards, or cryptocurrencies. Follow the platform’s instructions to initiate the deposit process securely.',
  },
  {
    num: '04',
    title: 'Automated Trading',
    desc: 'Set up your automated trading preferences by configuring parameters such as trading strategies, risk management rules, and allocation of funds. Choose from predefined strategies or create your own. The system will then execute trades on your behalf.',
  },
  {
    num: '05',
    title: 'Withdrawal',
    desc: 'To withdraw funds, go to the withdrawal section, specify an amount, and choose your preferred method. Funds are returned to your original payment source or a linked account, subject to platform limits and processing time.',
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-20">
          <span className="text-emerald-500 font-semibold text-lg tracking-wide mb-2 block">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
            Get Started In Minutes
          </h2>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block relative max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start mb-32 ${
                index % 2 === 0 ? '' : 'flex-row-reverse text-right'
              }`}
            >
              <div className="w-1/2 px-8">
                <div className="flex items-start">
                  {/* Step Circle & Line */}
                  {index % 2 !== 0 && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.num}
                      </div>
                      <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                    </div>
                  )}

                  {/* Step Content */}
                  <div className={`ml-${index % 2 === 0 ? '6' : '0'} mr-${index % 2 !== 0 ? '6' : '0'} max-w-sm`}>
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-base leading-relaxed mb-4">{step.desc}</p>
                    {step.button && (
                      <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
                        Get Started
                      </button>
                    )}
                  </div>

                  {index % 2 === 0 && (
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg">
                        {step.num}
                      </div>
                      <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                    </div>
                  )}
                </div>
              </div>
              <div className="w-1/2"></div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="block lg:hidden">
          <div className="space-y-12">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{step.desc}</p>
                  {step.button && (
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-5 py-2 rounded-md font-semibold text-sm transition-all duration-300">
                      Get Started
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
