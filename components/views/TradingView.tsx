'use client';

import { Card, CardBody, CardHeader, Chip } from '@heroui/react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
}

interface TradingViewProps {
  stocks: Stock[];
}

export default function TradingView({ stocks }: TradingViewProps) {
  return (
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto p-6 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Trading</h2>
          <p className="text-default-500 mt-1">Buy and sell buzzword stocks in real-time</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stocks.map((stock) => (
            <Card 
              key={stock.symbol} 
              isPressable 
              className="hover-lift border border-default-200 dark:border-default-100"
            >
              <CardHeader className="pb-2 px-5 pt-5">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-bold text-xl">{stock.symbol}</p>
                    <Chip 
                      size="sm" 
                      variant="flat" 
                      className="mt-1"
                      color="primary"
                    >
                      {stock.category}
                    </Chip>
                  </div>
                  <div className={`p-3 rounded-xl ${
                    stock.change >= 0 ? 'bg-success/10' : 'bg-danger/10'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-6 h-6 text-success" />
                    ) : (
                      <TrendingDown className="w-6 h-6 text-danger" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardBody className="px-5 pb-5">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-default-500 mb-1">Current Price</p>
                    <p className="text-3xl font-bold">${stock.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-default-200">
                    <span className="text-sm text-default-500">24h Change</span>
                    <Chip
                      size="sm"
                      color={stock.change >= 0 ? "success" : "danger"}
                      variant="flat"
                      className="font-semibold"
                    >
                      {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                    </Chip>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
