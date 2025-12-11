import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export const ChartCard = ({ stock }) => {
  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-4 terminal-border">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-green-400">{stock.symbol}</h3>
        <p className="text-sm text-green-300">{stock.name}</p>
        <div className="mt-2 flex items-baseline gap-3">
          <span className="text-2xl font-bold text-green-400">
            ${stock.price.toFixed(2)}
          </span>
          <span
            className={`text-sm font-semibold ${
              stock.change >= 0 ? 'text-green-400' : 'text-red-400'
            }`}
          >
            {stock.change >= 0 ? '▲' : '▼'} ${Math.abs(stock.change).toFixed(2)} (
            {stock.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={stock.history}>
          <defs>
            <linearGradient id={`gradient-${stock.symbol}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00ff00" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#00ff00" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="time" 
            hide 
          />
          <YAxis 
            domain={['auto', 'auto']} 
            hide
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#000',
              border: '1px solid #0f0',
              borderRadius: '4px',
            }}
            labelStyle={{ color: '#0f0' }}
            itemStyle={{ color: '#0f0' }}
            formatter={(value) => [`$${value.toFixed(2)}`, 'Price']}
            labelFormatter={() => ''}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#00ff00"
            strokeWidth={2}
            fillOpacity={1}
            fill={`url(#gradient-${stock.symbol})`}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
