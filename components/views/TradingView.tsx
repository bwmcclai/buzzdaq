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
    <div className="h-full overflow-y-auto bg-default-50">
      <div className="max-w-[1600px] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Trading</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {stocks.map((stock) => (
            <Card key={stock.symbol} isPressable>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start w-full">
                  <div>
                    <p className="font-bold text-lg">{stock.symbol}</p>
                    <p className="text-xs text-default-500">{stock.category}</p>
                  </div>
                  <div className={`p-2 rounded-lg ${
                    stock.change >= 0 ? 'bg-success/10' : 'bg-danger/10'
                  }`}>
                    {stock.change >= 0 ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-danger" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardBody>
                <div className="space-y-2">
                  <p className="text-2xl font-bold">${stock.price.toFixed(2)}</p>
                  <Chip
                    size="sm"
                    color={stock.change >= 0 ? "success" : "danger"}
                    variant="flat"
                  >
                    {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                  </Chip>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
