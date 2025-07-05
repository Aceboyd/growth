import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  RefreshCw,
  Star,
  Search,
  Filter
} from 'lucide-react';

const MarketTrades = () => {
  const [activeTab, setActiveTab] = useState('spot');
  const [selectedPair, setSelectedPair] = useState('BTC/USDT');
  const [refreshing, setRefreshing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(['BTC/USDT', 'ETH/USDT']);

  const marketData = [
    { pair: 'BTC/USDT', price: 45230.50, change: 2.34, volume: 1234567890, high: 46800, low: 44100 },
    { pair: 'ETH/USDT', price: 3456.78, change: -1.23, volume: 987654321, high: 3600, low: 3300 },
    { pair: 'ADA/USDT', price: 0.4567, change: 5.67, volume: 456789123, high: 0.48, low: 0.42 },
    { pair: 'SOL/USDT', price: 98.45, change: 3.45, volume: 234567890, high: 102, low: 94 },
    { pair: 'BNB/USDT', price: 234.56, change: -0.89, volume: 345678901, high: 240, low: 230 },
    { pair: 'DOGE/USDT', price: 0.0789, change: 12.34, volume: 678901234, high: 0.085, low: 0.072 },
    { pair: 'AVAX/USDT', price: 23.45, change: 1.56, volume: 123456789, high: 24.5, low: 22.8 },
    { pair: 'DOT/USDT', price: 5.67, change: -2.34, volume: 345678901, high: 6.1, low: 5.5 },
  ];

  const recentTrades = [
    { price: 45230.50, amount: 0.0234, time: '14:30:25', type: 'buy' },
    { price: 45225.75, amount: 0.0156, time: '14:30:20', type: 'sell' },
    { price: 45240.00, amount: 0.0789, time: '14:30:15', type: 'buy' },
    { price: 45220.25, amount: 0.0345, time: '14:30:10', type: 'sell' },
    { price: 45235.50, amount: 0.0567, time: '14:30:05', type: 'buy' },
    { price: 45228.75, amount: 0.0234, time: '14:30:00', type: 'sell' },
    { price: 45245.00, amount: 0.0678, time: '14:29:55', type: 'buy' },
    { price: 45230.25, amount: 0.0123, time: '14:29:50', type: 'sell' },
  ];

  const orderBook = {
    asks: [
      { price: 45235.50, amount: 0.2345, total: 0.2345 },
      { price: 45240.00, amount: 0.1234, total: 0.3579 },
      { price: 45245.50, amount: 0.5678, total: 0.9257 },
      { price: 45250.00, amount: 0.3456, total: 1.2713 },
      { price: 45255.50, amount: 0.1789, total: 1.4502 },
    ],
    bids: [
      { price: 45230.00, amount: 0.3456, total: 0.3456 },
      { price: 45225.50, amount: 0.2345, total: 0.5801 },
      { price: 45220.00, amount: 0.1789, total: 0.7590 },
      { price: 45215.50, amount: 0.4567, total: 1.2157 },
      { price: 45210.00, amount: 0.2890, total: 1.5047 },
    ]
  };

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const toggleFavorite = (pair) => {
    setFavorites(prev => 
      prev.includes(pair) 
        ? prev.filter(p => p !== pair)
        : [...prev, pair]
    );
  };

  const filteredMarketData = marketData.filter(item =>
    item.pair.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedMarket = marketData.find(item => item.pair === selectedPair);

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <div className="flex items-center justify-between flex-col sm:flex-row space-y-3 sm:space-y-0">
          <div className="text-center sm:text-left">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Market Trades</h2>
            <p className="text-gray-300 text-sm sm:text-base">Real-time cryptocurrency trading data</p>
          </div>
          <button
            onClick={handleRefresh}
            className={`flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-lg transition-all text-sm sm:text-base ${
              refreshing ? 'animate-pulse' : ''
            }`}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>
        </div>
      </div>

      {/* Trading Tabs */}
      <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
        <div className="flex space-x-1 mb-4 sm:mb-6 bg-gray-700/50 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('spot')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md transition-colors text-sm sm:text-base ${
              activeTab === 'spot'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Spot Trading
          </button>
          <button
            onClick={() => setActiveTab('futures')}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md transition-colors text-sm sm:text-base ${
              activeTab === 'futures'
                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            Futures Trading
          </button>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2">
              <Activity className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
              <span className="text-gray-400 text-xs sm:text-sm">24h Volume</span>
            </div>
            <p className="text-white text-sm sm:text-lg font-bold">$2.4B</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
              <span className="text-gray-400 text-xs sm:text-sm">Market Cap</span>
            </div>
            <p className="text-white text-sm sm:text-lg font-bold">$1.2T</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2">
              <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4 text-purple-400" />
              <span className="text-gray-400 text-xs sm:text-sm">Active Pairs</span>
            </div>
            <p className="text-white text-sm sm:text-lg font-bold">234</p>
          </div>
          <div className="bg-gray-700/30 rounded-lg p-3 sm:p-4">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingDown className="w-3 h-3 sm:w-4 sm:h-4 text-orange-400" />
              <span className="text-gray-400 text-xs sm:text-sm">BTC Dominance</span>
            </div>
            <p className="text-white text-sm sm:text-lg font-bold">42.3%</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Market List */}
        <div className="lg:col-span-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base sm:text-lg font-bold text-white">Markets</h3>
            <Filter className="w-4 h-4 text-gray-400" />
          </div>
          
          <div className="relative mb-4">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search pairs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-700/50 border border-gray-600 rounded-lg pl-10 pr-4 py-2 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-2 max-h-64 sm:max-h-96 overflow-y-auto">
            {filteredMarketData.map((market) => (
              <button
                key={market.pair}
                onClick={() => setSelectedPair(market.pair)}
                className={`w-full flex items-center justify-between p-2 sm:p-3 rounded-lg transition-colors ${
                  selectedPair === market.pair
                    ? 'bg-blue-500/20 border border-blue-500/50'
                    : 'bg-gray-700/30 hover:bg-gray-700/50'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(market.pair);
                    }}
                    className="text-gray-400 hover:text-yellow-400 transition-colors"
                  >
                    <Star className={`w-3 h-3 ${favorites.includes(market.pair) ? 'fill-yellow-400 text-yellow-400' : ''}`} />
                  </button>
                  <div className="text-left">
                    <p className="text-white font-medium text-xs sm:text-sm">{market.pair}</p>
                    <p className="text-gray-400 text-xs">${market.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-xs sm:text-sm font-medium ${market.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {market.change >= 0 ? '+' : ''}{market.change.toFixed(2)}%
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Trading Chart Area */}
        <div className="lg:col-span-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 sm:mb-6 flex-col sm:flex-row space-y-2 sm:space-y-0">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <h3 className="text-base sm:text-lg font-bold text-white">{selectedPair}</h3>
              {selectedMarket && (
                <div className="flex items-center space-x-2">
                  <span className="text-lg sm:text-2xl font-bold text-white">${selectedMarket.price.toFixed(2)}</span>
                  <span className={`text-xs sm:text-sm font-medium ${selectedMarket.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selectedMarket.change >= 0 ? '+' : ''}{selectedMarket.change.toFixed(2)}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Mock Chart */}
          <div className="bg-gray-700/30 rounded-lg p-4 mb-4 sm:mb-6">
            <div className="h-32 sm:h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <BarChart3 className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-xs sm:text-sm">Trading Chart</p>
                <p className="text-xs text-gray-500">TradingView integration would go here</p>
              </div>
            </div>
          </div>

          {/* Market Stats */}
          {selectedMarket && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              <div className="bg-gray-700/30 rounded-lg p-2 sm:p-3">
                <p className="text-gray-400 text-xs mb-1">24h High</p>
                <p className="text-white font-medium text-sm">${selectedMarket.high.toFixed(2)}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2 sm:p-3">
                <p className="text-gray-400 text-xs mb-1">24h Low</p>
                <p className="text-white font-medium text-sm">${selectedMarket.low.toFixed(2)}</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2 sm:p-3">
                <p className="text-gray-400 text-xs mb-1">24h Volume</p>
                <p className="text-white font-medium text-sm">${(selectedMarket.volume / 1000000).toFixed(1)}M</p>
              </div>
              <div className="bg-gray-700/30 rounded-lg p-2 sm:p-3">
                <p className="text-gray-400 text-xs mb-1">Change</p>
                <p className={`font-medium text-sm ${selectedMarket.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {selectedMarket.change >= 0 ? '+' : ''}{selectedMarket.change.toFixed(2)}%
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Order Book & Recent Trades */}
        <div className="lg:col-span-1 space-y-4 sm:space-y-6">
          {/* Order Book */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">Order Book</h3>
            <div className="space-y-4">
              {/* Asks */}
              <div>
                <h4 className="text-red-400 text-xs sm:text-sm font-medium mb-2">Asks</h4>
                <div className="space-y-1">
                  {orderBook.asks.map((ask, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-red-400">{ask.price.toFixed(2)}</span>
                      <span className="text-gray-400">{ask.amount.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Spread */}
              <div className="text-center py-2 border-t border-b border-gray-700">
                <span className="text-white font-medium text-xs sm:text-sm">Spread: 5.50</span>
              </div>
              
              {/* Bids */}
              <div>
                <h4 className="text-green-400 text-xs sm:text-sm font-medium mb-2">Bids</h4>
                <div className="space-y-1">
                  {orderBook.bids.map((bid, index) => (
                    <div key={index} className="flex justify-between text-xs">
                      <span className="text-green-400">{bid.price.toFixed(2)}</span>
                      <span className="text-gray-400">{bid.amount.toFixed(4)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Trades */}
          <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 sm:p-6">
            <h3 className="text-base sm:text-lg font-bold text-white mb-4">Recent Trades</h3>
            <div className="space-y-2 max-h-48 sm:max-h-64 overflow-y-auto">
              {recentTrades.map((trade, index) => (
                <div key={index} className="flex justify-between items-center text-xs">
                  <span className={`font-medium ${trade.type === 'buy' ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.price.toFixed(2)}
                  </span>
                  <span className="text-gray-400">{trade.amount.toFixed(4)}</span>
                  <span className="text-gray-500">{trade.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketTrades;