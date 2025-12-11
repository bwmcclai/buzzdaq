import { useState } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const OrderTerminal = ({ stocks, portfolio, onTrade }) => {
  const [selectedSymbol, setSelectedSymbol] = useState('AI');
  const [quantity, setQuantity] = useState(1);
  const [orderType, setOrderType] = useState('BUY');

  const selectedStock = stocks.find((s) => s.symbol === selectedSymbol);
  const totalCost = selectedStock ? selectedStock.price * quantity : 0;

  const handleTrade = () => {
    if (quantity > 0 && selectedStock) {
      onTrade(selectedSymbol, orderType, quantity);
      setQuantity(1);
    }
  };

  const portfolioValue = Object.entries(portfolio.holdings).reduce((acc, [symbol, holding]) => {
    const stock = stocks.find((s) => s.symbol === symbol);
    return acc + (stock ? stock.price * holding.quantity : 0);
  }, 0);

  const totalValue = portfolio.cash + portfolioValue;

  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-6 terminal-border">
      <h2 className="text-2xl font-bold text-green-400 mb-6 terminal-text">
        ⚡ ORDER TERMINAL
      </h2>

      {/* Portfolio Summary */}
      <div className="mb-6 p-4 bg-black border border-green-700 rounded">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-green-600">Cash</p>
            <p className="text-green-400 font-bold text-lg">
              ${portfolio.cash.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-green-600">Portfolio Value</p>
            <p className="text-green-400 font-bold text-lg">
              ${portfolioValue.toFixed(2)}
            </p>
          </div>
          <div className="col-span-2">
            <p className="text-green-600">Total Value</p>
            <p className="text-green-400 font-bold text-xl">
              ${totalValue.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Holdings */}
      {Object.keys(portfolio.holdings).length > 0 && (
        <div className="mb-6 p-4 bg-black border border-green-700 rounded">
          <h3 className="text-green-400 font-bold mb-2">Holdings</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(portfolio.holdings).map(([symbol, holding]) => {
              const stock = stocks.find((s) => s.symbol === symbol);
              const currentValue = stock ? stock.price * holding.quantity : 0;
              const pnl = stock ? currentValue - holding.avgPrice * holding.quantity : 0;
              return (
                <div
                  key={symbol}
                  className="flex justify-between items-center text-green-300"
                >
                  <span className="font-bold">{symbol}</span>
                  <span>{holding.quantity} shares</span>
                  <span className={pnl >= 0 ? 'text-green-400' : 'text-red-400'}>
                    {pnl >= 0 ? '+' : ''}${pnl.toFixed(2)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Form */}
      <div className="space-y-4">
        <div>
          <label className="block text-green-400 mb-2 text-sm font-bold">
            Select Buzzword
          </label>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="w-full bg-black border border-green-500 text-green-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
          >
            {stocks.map((stock) => (
              <option key={stock.symbol} value={stock.symbol}>
                {stock.symbol} - ${stock.price.toFixed(2)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-green-400 mb-2 text-sm font-bold">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-full bg-black border border-green-500 text-green-400 p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500 font-mono"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setOrderType('BUY')}
            className={`flex-1 py-3 rounded font-bold transition-all ${
              orderType === 'BUY'
                ? 'bg-green-500 text-black border-2 border-green-400'
                : 'bg-black text-green-400 border border-green-500 hover:bg-green-900'
            }`}
          >
            <TrendingUp className="inline-block mr-2" size={18} />
            BUY
          </button>
          <button
            onClick={() => setOrderType('SHORT')}
            className={`flex-1 py-3 rounded font-bold transition-all ${
              orderType === 'SHORT'
                ? 'bg-red-500 text-black border-2 border-red-400'
                : 'bg-black text-red-400 border border-red-500 hover:bg-red-900'
            }`}
          >
            <TrendingDown className="inline-block mr-2" size={18} />
            SHORT
          </button>
        </div>

        <div className="p-3 bg-black border border-green-700 rounded">
          <div className="flex justify-between text-sm text-green-400">
            <span>Total Cost:</span>
            <span className="font-bold">${totalCost.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleTrade}
          className="w-full bg-green-500 hover:bg-green-600 text-black font-bold py-3 rounded transition-all transform hover:scale-105 active:scale-95"
        >
          EXECUTE ORDER
        </button>
      </div>
    </div>
  );
};
