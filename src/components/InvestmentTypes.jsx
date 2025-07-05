import React from 'react';
import { TrendingUp, Plus, Minus, DollarSign } from 'lucide-react';

const InvestmentTypes = () => {
  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto text-center">
        <div className="mb-4">
          <span className="text-emerald-500 font-semibold text-lg tracking-wide">INVEST</span>
        </div>
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          All investments.
        </h2>
        <h3 className="text-5xl font-bold text-gray-900 mb-16">
          Available on Growthsphere Investment.
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {/* Stocks */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Stocks</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Invest in partial ownership of your preferred companies without the need to purchase an entire share.
            </p>
            <div className="rounded-xl p-6 min-h-[280px] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-[200px]">
                {/* Google */}
                <div className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-center h-20">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">G</span>
                  </div>
                </div>
                {/* Amazon */}
                <div className="bg-gray-900 rounded-xl p-4 shadow-sm flex items-center justify-center h-20">
                  <div className="text-white font-bold text-2xl">a</div>
                  <div className="w-6 h-1 bg-orange-400 rounded-full mt-2 ml-1"></div>
                </div>
                {/* Netflix */}
                <div className="bg-black rounded-xl p-4 shadow-sm flex items-center justify-center h-20">
                  <span className="text-red-600 font-bold text-2xl">N</span>
                </div>
                {/* Tesla */}
                <div className="bg-gray-200 rounded-xl p-4 shadow-sm flex items-center justify-center h-20">
                  <div className="text-red-600 font-bold text-2xl">T</div>
                </div>
              </div>
            </div>
          </div>

          {/* Cryptocurrencies */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Cryptocurrencies</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Buy, sell & swap the cryptocurrencies you want anytime, anywhere.
            </p>
            <div className="rounded-xl p-6 min-h-[280px] flex flex-col items-center justify-center">
              {/* Phone mockup */}
              <div className="bg-gray-900 rounded-3xl p-2 mb-6 shadow-lg">
                <div className="bg-white rounded-2xl p-4 w-48 h-40">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">Bitcoin</span>
                    <div className="w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">₿</span>
                    </div>
                  </div>
                  <div className="text-lg font-bold text-gray-900 mb-2">$6,255.34</div>
                  {/* Chart line */}
                  <div className="h-16 flex items-end space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div 
                        key={i} 
                        className="bg-green-400 w-1 rounded-t"
                        style={{ height: `${Math.random() * 60 + 10}%` }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
              {/* Action buttons */}
              <div className="flex space-x-3">
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center shadow-md hover:bg-green-600 transition-colors cursor-pointer">
                  <Plus className="text-white w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center shadow-md hover:bg-red-600 transition-colors cursor-pointer">
                  <Minus className="text-white w-5 h-5" />
                </div>
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shadow-md hover:bg-blue-600 transition-colors cursor-pointer">
                  <DollarSign className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          </div>

          {/* Crypto Indices */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Crypto Indices</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Auto-invest in the whole crypto market with a single click
            </p>
            <div className="rounded-xl p-6 min-h-[280px] flex items-center justify-center">
              <div className="relative">
                {/* Donut chart representation */}
                <div className="w-48 h-48 relative">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    {/* Bitcoin segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#f59e0b"
                      strokeWidth="12"
                      strokeDasharray="65 35"
                      strokeDashoffset="0"
                    />
                    {/* Ethereum segment */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="12"
                      strokeDasharray="20 80"
                      strokeDashoffset="-65"
                    />
                    {/* Other cryptos */}
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      fill="none"
                      stroke="#6b7280"
                      strokeWidth="12"
                      strokeDasharray="15 85"
                      strokeDashoffset="-85"
                    />
                  </svg>
                </div>
                {/* Legend */}
                <div className="absolute -right-16 top-1/2 transform -translate-y-1/2 space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">BTC</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">ETH</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
                    <span className="text-xs text-gray-600">Others</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Precious Metals */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Precious Metals</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Protect your wealth during uncertain times by investing in tangible assets like gold and silver
            </p>
            <div className="rounded-xl p-6 min-h-[280px] flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4 w-full max-w-[280px]">
                {/* Gold bars */}
                <div className="space-y-2">
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg h-16 shadow-md transform rotate-12"></div>
                  <div className="bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg h-16 shadow-md transform -rotate-6"></div>
                </div>
                {/* Metal list */}
                <div className="space-y-3">
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
                    <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Au</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Gold</div>
                      <div className="text-xs text-gray-500">XAU</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
                    <div className="w-6 h-6 bg-gray-400 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Ag</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Silver</div>
                      <div className="text-xs text-gray-500">XAG</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 bg-white rounded-lg p-2 shadow-sm">
                    <div className="w-6 h-6 bg-gray-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">Pd</span>
                    </div>
                    <div>
                      <div className="text-xs font-semibold">Palladium</div>
                      <div className="text-xs text-gray-500">XPD</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Commodities */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Commodities</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Diversify with commodities to combat inflation
            </p>
            <div className="rounded-xl p-6 min-h-[280px] flex items-center justify-center">
              <div className="grid grid-cols-3 gap-4">
                {/* Coffee beans */}
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  <div className="w-8 h-8 bg-amber-800 rounded-full"></div>
                </div>
                {/* Corn */}
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  <div className="w-8 h-8 bg-yellow-400 rounded-lg"></div>
                </div>
                {/* Tractor */}
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  <div className="w-8 h-6 bg-green-600 rounded-md"></div>
                </div>
                {/* Oil barrel */}
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  <div className="w-6 h-8 bg-red-600 rounded-md"></div>
                </div>
                {/* Coal */}
                <div className="bg-white rounded-full w-16 h-16 flex items-center justify-center shadow-md">
                  <div className="w-8 h-8 bg-gray-800 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* ETFs */}
          <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">ETFs</h3>
            <p className="text-gray-600 mb-8 leading-relaxed">
              Own any amount of your favorite ETFs with fractional shares
            </p>
            <div className="rounded-xl p-6 min-h-[280px] flex items-center justify-center">
              <div className="space-y-4">
                {/* ETF pie charts */}
                <div className="flex space-x-4">
                  <div className="relative">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="70 30" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="15" strokeDasharray="20 80" strokeDashoffset="-70" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#6b7280" strokeWidth="15" strokeDasharray="10 90" strokeDashoffset="-90" />
                    </svg>
                  </div>
                  <div className="relative">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="50 50" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#f97316" strokeWidth="15" strokeDasharray="30 70" strokeDashoffset="-50" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#8b5cf6" strokeWidth="15" strokeDasharray="20 80" strokeDashoffset="-80" />
                    </svg>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <div className="relative">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#6b7280" strokeWidth="15" strokeDasharray="60 40" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#ef4444" strokeWidth="15" strokeDasharray="25 75" strokeDashoffset="-60" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#06b6d4" strokeWidth="15" strokeDasharray="15 85" strokeDashoffset="-85" />
                    </svg>
                  </div>
                  <div className="relative">
                    <svg className="w-20 h-20" viewBox="0 0 100 100">
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="15" strokeDasharray="45 55" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#3b82f6" strokeWidth="15" strokeDasharray="35 65" strokeDashoffset="-45" />
                      <circle cx="50" cy="50" r="35" fill="none" stroke="#10b981" strokeWidth="15" strokeDasharray="20 80" strokeDashoffset="-80" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentTypes;