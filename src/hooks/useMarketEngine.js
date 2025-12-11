import { useState, useEffect, useCallback } from 'react';

// Mock buzzwords with initial prices
const BUZZWORDS = [
  { symbol: 'AI', name: 'Artificial Intelligence', basePrice: 150 },
  { symbol: 'WEB3', name: 'Web3', basePrice: 75 },
  { symbol: 'SYNERGY', name: 'Synergy', basePrice: 50 },
  { symbol: 'DISRUPT', name: 'Disruptive Innovation', basePrice: 120 },
  { symbol: 'BLOCKCHAIN', name: 'Blockchain', basePrice: 90 },
  { symbol: 'METAVERSE', name: 'Metaverse', basePrice: 65 },
  { symbol: 'CLOUD', name: 'Cloud Native', basePrice: 110 },
  { symbol: 'AGILE', name: 'Agile Methodology', basePrice: 45 },
];

// Generate initial price history
const generateInitialHistory = (basePrice) => {
  const history = [];
  let price = basePrice;
  for (let i = 0; i < 50; i++) {
    const change = (Math.random() - 0.5) * 5;
    price = Math.max(10, price + change);
    history.push({
      time: Date.now() - (50 - i) * 60000,
      price: Number(price.toFixed(2)),
    });
  }
  return history;
};

export const useMarketEngine = () => {
  const [stocks, setStocks] = useState(() =>
    BUZZWORDS.map((bw) => ({
      ...bw,
      price: bw.basePrice,
      previousPrice: bw.basePrice,
      change: 0,
      changePercent: 0,
      history: generateInitialHistory(bw.basePrice),
    }))
  );

  const [portfolio, setPortfolio] = useState({
    cash: 10000,
    holdings: {},
  });

  const [news, setNews] = useState([]);

  // Simulate price changes
  useEffect(() => {
    const interval = setInterval(() => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const volatility = 0.02; // 2% volatility
          const change = (Math.random() - 0.5) * 2 * volatility * stock.price;
          const newPrice = Math.max(1, stock.price + change);
          const priceChange = newPrice - stock.previousPrice;
          const changePercent = (priceChange / stock.previousPrice) * 100;

          return {
            ...stock,
            previousPrice: stock.price,
            price: Number(newPrice.toFixed(2)),
            change: Number(priceChange.toFixed(2)),
            changePercent: Number(changePercent.toFixed(2)),
            history: [
              ...stock.history.slice(-49),
              { time: Date.now(), price: Number(newPrice.toFixed(2)) },
            ],
          };
        })
      );

      // Randomly generate news
      if (Math.random() > 0.7) {
        const newsTemplates = [
          'Breaking: ${symbol} reaches new high!',
          'Analysts say ${name} is the future',
          'Market volatility detected in ${symbol}',
          '${name} adoption surges among enterprises',
          'Investors bullish on ${symbol}',
          'New ${name} framework released',
        ];
        const randomStock = BUZZWORDS[Math.floor(Math.random() * BUZZWORDS.length)];
        const template = newsTemplates[Math.floor(Math.random() * newsTemplates.length)];
        const newsText = template
          .replace('${symbol}', randomStock.symbol)
          .replace('${name}', randomStock.name);

        setNews((prev) => [
          { id: Date.now(), text: newsText, time: new Date().toLocaleTimeString() },
          ...prev.slice(0, 19),
        ]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const executeTrade = useCallback((symbol, action, quantity) => {
    setStocks((prevStocks) => {
      const stock = prevStocks.find((s) => s.symbol === symbol);
      if (!stock) return prevStocks;

      const totalCost = stock.price * quantity;

      setPortfolio((prev) => {
        if (action === 'BUY') {
          if (prev.cash < totalCost) {
            alert('Insufficient funds!');
            return prev;
          }

          return {
            cash: prev.cash - totalCost,
            holdings: {
              ...prev.holdings,
              [symbol]: {
                quantity: (prev.holdings[symbol]?.quantity || 0) + quantity,
                avgPrice: prev.holdings[symbol]
                  ? (prev.holdings[symbol].avgPrice * prev.holdings[symbol].quantity +
                      totalCost) /
                    (prev.holdings[symbol].quantity + quantity)
                  : stock.price,
              },
            },
          };
        } else if (action === 'SHORT') {
          // Simplified short - just add negative quantity
          return {
            cash: prev.cash + totalCost,
            holdings: {
              ...prev.holdings,
              [symbol]: {
                quantity: (prev.holdings[symbol]?.quantity || 0) - quantity,
                avgPrice: stock.price,
              },
            },
          };
        }

        return prev;
      });

      // Add news about the trade
      setNews((prev) => [
        {
          id: Date.now(),
          text: `Trade executed: ${action} ${quantity} ${symbol} @ $${stock.price}`,
          time: new Date().toLocaleTimeString(),
        },
        ...prev.slice(0, 19),
      ]);

      return prevStocks;
    });
  }, []);

  return {
    stocks,
    portfolio,
    news,
    executeTrade,
  };
};
