import React, { useEffect, useRef } from 'react';

const ExchangeRateMatrix = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-forex-cross-rates.js';
    script.async = true;
    script.innerHTML = JSON.stringify({
      width: "100%",
      height: "500",
      currencies: [
        "EUR",
        "USD",
        "JPY",
        "GBP",
        "CHF",
        "AUD",
        "CAD",
        "NZD",
        "CNY"
      ],
      isTransparent: false,
      colorTheme: "light",
      locale: "en"
    });

    // clear previous script
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(script);
    }
  }, []);

  return (
    <div className="tradingview-widget-container" ref={containerRef}></div>
  );
};

export default ExchangeRateMatrix;
