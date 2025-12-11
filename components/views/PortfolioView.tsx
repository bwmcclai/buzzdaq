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
    <div className="h-full overflow-y-auto bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-blue-950/20 dark:to-purple-950/10 custom-scrollbar">
      <div className="max-w-[1600px] mx-auto p-6 animate-fade-in">
        <div className="mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Portfolio</h2>
          <p className="text-default-500 mt-1">Track your buzzword investments and performance</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="border border-default-200">
            <CardBody className="p-6">
              <p className="text-sm text-default-500 mb-1">Total Value</p>
              <p className="text-3xl font-bold">$10,000.00</p>
              <p className="text-sm text-success mt-2">+0.00% all time</p>
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-6">
              <p className="text-sm text-default-500 mb-1">Available Cash</p>
              <p className="text-3xl font-bold">$10,000.00</p>
              <p className="text-sm text-default-500 mt-2">Ready to invest</p>
            </CardBody>
          </Card>
          
          <Card className="border border-default-200">
            <CardBody className="p-6">
              <p className="text-sm text-default-500 mb-1">Total Positions</p>
              <p className="text-3xl font-bold">0</p>
              <p className="text-sm text-default-500 mt-2">Active holdings</p>
            </CardBody>
          </Card>
        </div>
        
        <Card className="border border-default-200">
          <CardHeader className="px-6 py-4 border-b border-default-200">
            <h3 className="text-xl font-semibold">Your Holdings</h3>
          </CardHeader>
          <CardBody className="p-6">
            <div className="text-center py-16">
              <div className="mb-4 text-6xl">📊</div>
              <p className="text-xl text-default-600 font-medium mb-2">No positions yet</p>
              <p className="text-default-400">Start trading to build your portfolio and track your buzzword investments</p>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
