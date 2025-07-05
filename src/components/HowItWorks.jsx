import React from 'react';

const HowItWorks = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-20">
          <div className="mb-4">
            <span className="text-emerald-500 font-semibold text-lg tracking-wide">HOW IT WORKS</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Get Started In Minutes
          </h2>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Step 1 - Register (Left side) */}
          <div className="flex items-start mb-32">
            <div className="w-1/2 pr-8 text-left">
              <div className="flex items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    01
                  </div>
                  <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                </div>
                <div className="ml-6 mt-0 max-w-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Register</h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    Sign up for an account on Growthsphere Investment by providing your email address, creating a password, and agreeing to the terms and conditions. Registration typically involves filling out a form with basic personal information.
                  </p>
                  <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>

          {/* Step 2 - Verify (Right side) */}
          <div className="flex items-start mb-32">
            <div className="w-1/2"></div>
            <div className="w-1/2 pl-8 text-right">
              <div className="flex items-start justify-end">
                <div className="mr-6 mt-0 max-w-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Verify</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Complete the verification process by providing additional documentation to confirm your identity and comply with regulatory requirements. This step may involve uploading a government-issued ID, proof of address, and in some cases, undergoing a Know Your Customer (KYC) procedure.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    02
                  </div>
                  <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 - Deposit Funds (Left side) */}
          <div className="flex items-start mb-32">
            <div className="w-1/2 pr-8 text-left">
              <div className="flex items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    03
                  </div>
                  <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                </div>
                <div className="ml-6 mt-0 max-w-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Deposit Funds</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    After your account is verified, deposit funds into your trading account using one of the supported payment methods. This usually includes bank transfers, credit/debit cards, or cryptocurrencies. Follow the platform's instructions to initiate the deposit process securely.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>

          {/* Step 4 - Automated Trading (Right side) */}
          <div className="flex items-start mb-32">
            <div className="w-1/2"></div>
            <div className="w-1/2 pl-8 text-right">
              <div className="flex items-start justify-end">
                <div className="mr-6 mt-0 max-w-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Automated Trading</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    Set up your automated trading preferences by configuring parameters such as trading strategies, risk management rules, and allocation of funds. Choose from a range of predefined trading strategies or create your own customized approach. Once configured, the automated trading system will execute trades on your behalf based on the selected criteria.
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    04
                  </div>
                  <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 - Withdrawal (Left side) */}
          <div className="flex items-start">
            <div className="w-1/2 pr-8 text-left">
              <div className="flex items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0">
                    05
                  </div>
                  <div className="w-1 bg-emerald-500 h-24 mt-2"></div>
                </div>
                <div className="ml-6 mt-0 max-w-sm">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">Withdrawal</h3>
                  <p className="text-gray-600 text-base leading-relaxed">
                    When you're ready to withdraw funds from your trading account, navigate to the withdrawal section of the platform and initiate a withdrawal request. Specify the amount you wish to withdraw and select your preferred withdrawal method. Funds are typically transferred back to the original source of deposit or to a linked bank account. Ensure that you comply with any withdrawal limits and processing times specified by the platform.
                  </p>
                </div>
              </div>
            </div>
            <div className="w-1/2"></div>
          </div>
        </div>

        {/* Mobile version */}
        <div className="block lg:hidden">
          <div className="space-y-12">
            {[
              { num: "01", title: "Register", desc: "Sign up for an account on Growthsphere Investment by providing your email address, creating a password, and agreeing to the terms and conditions. Registration typically involves filling out a form with basic personal information.", button: true },
              { num: "02", title: "Verify", desc: "Complete the verification process by providing additional documentation to confirm your identity and comply with regulatory requirements. This step may involve uploading a government-issued ID, proof of address, and in some cases, undergoing a Know Your Customer (KYC) procedure." },
              { num: "03", title: "Deposit Funds", desc: "After your account is verified, deposit funds into your trading account using one of the supported payment methods. This usually includes bank transfers, credit/debit cards, or cryptocurrencies. Follow the platform's instructions to initiate the deposit process securely." },
              { num: "04", title: "Automated Trading", desc: "Set up your automated trading preferences by configuring parameters such as trading strategies, risk management rules, and allocation of funds. Choose from a range of predefined trading strategies or create your own customized approach. Once configured, the automated trading system will execute trades on your behalf based on the selected criteria." },
              { num: "05", title: "Withdrawal", desc: "When you're ready to withdraw funds from your trading account, navigate to the withdrawal section of the platform and initiate a withdrawal request. Specify the amount you wish to withdraw and select your preferred withdrawal method. Funds are typically transferred back to the original source of deposit or to a linked bank account. Ensure that you comply with any withdrawal limits and processing times specified by the platform." }
            ].map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-lg mr-6 flex-shrink-0">
                  {step.num}
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed mb-4">{step.desc}</p>
                  {step.button && (
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300">
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