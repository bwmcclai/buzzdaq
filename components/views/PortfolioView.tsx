'use client';

import { Card, CardBody, CardHeader } from '@heroui/react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
}

interface PortfolioViewProps {
  stocks: Stock[];
}

export default function PortfolioView({ stocks }: PortfolioViewProps) {
  return (
    <div className="h-full overflow-y-auto bg-default-50">
      <div className="max-w-[1600px] mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Portfolio</h2>
        
        <Card>
          <CardHeader>
            <h3 className="text-lg font-semibold">Your Holdings</h3>
          </CardHeader>
          <CardBody>
            <div className="text-center py-12">
              <p className="text-default-500 text-lg mb-2">No positions yet</p>
              <p className="text-default-400 text-sm">Start trading to build your portfolio</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
