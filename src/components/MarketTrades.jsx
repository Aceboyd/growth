// Enhanced MarketTrades with full UI: 20 Coins, Chart, Timeframe Filter, CSV Export, Order Book, Trades, Action Panel, Mobile Responsive
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TradingViewWidget from './TradingViewWidget';
import { Star, Download } from 'lucide-react';

const COINS = [
  'bitcoin', 'ethereum', 'solana', 'cardano', 'dogecoin', 'binancecoin',
  'polkadot', 'litecoin', 'chainlink', 'tron', 'polygon', 'avalanche-2',
  'uniswap', 'cosmos', 'stellar', 'vechain', 'aptos', 'arbitrum',
  'internet-computer', 'maker'
];

const MarketTrades = () => {
  const [marketData, setMarketData] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState('bitcoin');
  const [favorites, setFavorites] = useState(['bitcoin']);
  const [orderBook, setOrderBook] = useState({ bids: [], asks: [] });
  const [recentTrades, setRecentTrades] = useState([]);
  const [timeframe, setTimeframe] = useState('30');

  const fetchMarketData = async () => {
    try {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            ids: COINS.join(','),
            price_change_percentage: '24h',
          },
        }
      );
      setMarketData(data);
    } catch (err) {
      console.error('Failed to fetch market data', err);
    }
  };

  const fetchBinanceData = async (id) => {
    try {
      const selected = marketData.find(c => c.id === id);
      if (!selected) return;

      const symbol = selected.symbol.toUpperCase();
      const binanceSymbol = symbol + 'USDT';

      const [depthRes, tradesRes] = await Promise.all([
        axios.get(`https://api.binance.com/api/v3/depth?symbol=${binanceSymbol}&limit=5`),
        axios.get(`https://api.binance.com/api/v3/trades?symbol=${binanceSymbol}&limit=8`),
      ]);

      setOrderBook({
        bids: depthRes.data.bids.map(([price, qty]) => ({ price: parseFloat(price), qty: parseFloat(qty) })),
        asks: depthRes.data.asks.map(([price, qty]) => ({ price: parseFloat(price), qty: parseFloat(qty) })),
      });

      setRecentTrades(
        tradesRes.data.map((t) => ({
          price: parseFloat(t.price),
          qty: parseFloat(t.qty),
          time: new Date(t.time).toLocaleTimeString(),
          isBuyerMaker: t.isBuyerMaker,
        }))
      );
    } catch (err) {
      console.error('Failed to fetch Binance order book/trades', err);
    }
  };

  const exportToCSV = () => {
    const rows = [['Price', 'Quantity', 'Time']];
    recentTrades.forEach(t => {
      rows.push([t.price, t.qty, t.time]);
    });
    const csvContent = rows.map(r => r.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedCoin}-trades.csv`;
    link.click();
  };

  useEffect(() => {
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchBinanceData(selectedCoin);
  },);

  const toggleFavorite = (id) => {
    setFavorites([id]);
  };

  const selected = marketData.find((coin) => coin.id === selectedCoin);

  return (
    <div className="space-y-6 px-4 sm:px-0">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-bold text-white">Market Trades</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="bg-gray-700 text-white text-sm rounded px-2 py-1"
          >
            <option value="1">1m</option>
            <option value="5">5m</option>
            <option value="15">15m</option>
            <option value="30">30m</option>
            <option value="60">1h</option>
            <option value="240">4h</option>
            <option value="D">1D</option>
            <option value="W">1W</option>
          </select>
          <button onClick={exportToCSV} className="text-white bg-green-600 px-3 py-1 rounded flex items-center gap-1">
            <Download className="w-4 h-4" /> Export
          </button>
        </div>
      </div>

      {/* Portfolio Overview */}
      <div className="bg-gray-800 p-3 rounded-lg text-white text-sm md:flex justify-between items-center hidden">
        <p>📊 Favorites: {favorites.map(f => f.toUpperCase()).join(', ') || 'None'}</p>
        <p>💰 Estimated Value: ${favorites.length * 1000}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Market List */}
        <div className="bg-gray-800 p-4 rounded-lg space-y-4 overflow-auto max-h-[80vh]">
          <h3 className="text-white text-lg">Markets</h3>
          <div className="space-y-2">
            {marketData.map((coin) => (
              <div
                key={coin.id}
                onClick={() => setSelectedCoin(coin.id)}
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer hover:bg-gray-700 ${
                  selectedCoin === coin.id ? 'bg-gray-700' : ''
                }`}
              >
                <div className="flex items-center gap-2">
                  <img src={coin.image} alt="logo" className="w-5 h-5" />
                  <span className="text-white text-sm font-medium">
                    {coin.symbol.toUpperCase()}/USDT
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={(e) => { e.stopPropagation(); toggleFavorite(coin.id); }}>
                    <Star className={`w-4 h-4 ${favorites.includes(coin.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
                  </button>
                  <span className={`text-sm ${coin.price_change_percentage_24h > 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {coin.price_change_percentage_24h?.toFixed(2)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-3 space-y-6">
          {/* Coin Detail */}
          {selected && (
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex flex-wrap justify-between items-center gap-2">
                <div className="flex items-center gap-2">
                  <img src={selected.image} className="w-6 h-6" alt="icon" />
                  <h3 className="text-white text-xl font-bold">{selected.name} ({selected.symbol.toUpperCase()})</h3>
                </div>
                <div className="text-right">
                  <p className="text-white text-2xl font-bold">${selected.current_price?.toLocaleString()}</p>
                  <p className={`text-sm ${selected.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {selected.price_change_percentage_24h >= 0 ? '+' : ''}{selected.price_change_percentage_24h?.toFixed(2)}%</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                <div><p className="text-gray-400 text-sm">High</p><p className="text-white">${selected.high_24h}</p></div>
                <div><p className="text-gray-400 text-sm">Low</p><p className="text-white">${selected.low_24h}</p></div>
                <div><p className="text-gray-400 text-sm">Volume</p><p className="text-white">${(selected.total_volume / 1e6).toFixed(2)}M</p></div>
                <div><p className="text-gray-400 text-sm">Market Cap</p><p className="text-white">${(selected.market_cap / 1e9).toFixed(2)}B</p></div>
              </div>
            </div>
          )}

          {/* TradingView Chart */}
          <div className="bg-gray-800 p-4 rounded-lg">
            <TradingViewWidget symbol={`${selected?.symbol?.toUpperCase()}USDT`} interval={timeframe} />
          </div>

          {/* Buy/Sell UI */}
          <div className="bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-red-600 hover:bg-red-700 text-white rounded-lg p-4 w-full">🔻 Sell Market</button>
            <button className="bg-green-600 hover:bg-green-700 text-white rounded-lg p-4 w-full">🔺 Buy Market</button>
          </div>

          {/* Order Book and Trades */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white mb-2">Order Book</h3>
              <div>
                <h4 className="text-red-400 mb-1 text-sm">Asks</h4>
                {orderBook.asks.map((ask, i) => (
                  <div key={i} className="flex justify-between text-sm text-red-400">
                    <span>${ask.price.toFixed(2)}</span>
                    <span>{ask.qty.toFixed(4)}</span>
                  </div>
                ))}
                <div className="text-center text-white py-2 border-y border-gray-700 my-2 text-sm">Spread</div>
                <h4 className="text-green-400 mb-1 text-sm">Bids</h4>
                {orderBook.bids.map((bid, i) => (
                  <div key={i} className="flex justify-between text-sm text-green-400">
                    <span>${bid.price.toFixed(2)}</span>
                    <span>{bid.qty.toFixed(4)}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="text-white mb-2">Recent Trades</h3>
              {recentTrades.map((t, i) => (
                <div key={i} className="flex justify-between text-sm animate-fadeIn">
                  <span className={t.isBuyerMaker ? 'text-red-400' : 'text-green-400'}>${t.price.toFixed(2)}</span>
                  <span className="text-gray-400">{t.qty.toFixed(4)}</span>
                  <span className="text-gray-500">{t.time}</span>
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
