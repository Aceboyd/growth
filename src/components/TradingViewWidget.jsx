// TradingViewWidget.jsx
import React, { useEffect, useRef } from 'react';

const TradingViewWidget = ({ symbol = 'BTCUSDT', interval = '30' }) => {
  const containerRef = useRef();

  useEffect(() => {
    if (!window.TradingView) return;

    containerRef.current.innerHTML = ''; // clear old widget
    new window.TradingView.widget({
      autosize: true,
      symbol: `BINANCE:${symbol}`,
      interval,
      timezone: 'Etc/UTC',
      theme: 'dark',
      style: '1',
      locale: 'en',
      toolbar_bg: '#000000',
      enable_publishing: false,
      allow_symbol_change: false,
      container_id: containerRef.current.id,
    });
  }, [symbol, interval]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/tv.js';
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return <div id="tradingview_widget" ref={containerRef} className="h-[400px]" />;
};

export default TradingViewWidget;
