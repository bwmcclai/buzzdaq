export const TickerTape = ({ stocks }) => {
  return (
    <div className="bg-gray-900 border-b-2 border-green-500 overflow-hidden py-2">
      <div className="flex whitespace-nowrap animate-scroll">
        {/* Duplicate the stocks array to create seamless loop */}
        {[...stocks, ...stocks].map((stock, idx) => (
          <div
            key={`${stock.symbol}-${idx}`}
            className="inline-flex items-center mx-6 text-sm"
          >
            <span className="font-bold text-green-400">{stock.symbol}</span>
            <span className="mx-2 text-green-300">${stock.price.toFixed(2)}</span>
            <span
              className={`${
                stock.change >= 0 ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {stock.change >= 0 ? '▲' : '▼'}{' '}
              {Math.abs(stock.changePercent).toFixed(2)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
