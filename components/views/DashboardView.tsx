'use client';

import { Card, CardHeader, CardBody, CardFooter, Chip, Button, Tabs, Tab } from '@heroui/react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
}

interface DashboardViewProps {
  stocks: Stock[];
}

export default function DashboardView({ stocks }: DashboardViewProps) {
  // Mock news data
  const news = [
    { id: 1, text: 'AI adoption surges in enterprise markets', time: '2 hours ago', impact: 'positive' },
    { id: 2, text: 'Tech sector shows strong momentum', time: '3 hours ago', impact: 'positive' },
    { id: 3, text: 'Market volatility expected to continue', time: '4 hours ago', impact: 'negative' },
    { id: 4, text: 'Buzzword trends shifting rapidly', time: '5 hours ago', impact: 'neutral' },
  ];

  return (
    <div className="h-full overflow-y-auto bg-default-50">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        
        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardBody className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-500">S&P 500</p>
                  <p className="text-2xl font-bold mt-1">5,099.23</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowDownRight className="w-4 h-4 text-danger" />
                    <span className="text-sm text-danger font-medium">-0.40%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-danger/10 rounded-full flex items-center justify-center">
                  <TrendingDown className="w-6 h-6 text-danger" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-500">NASDAQ</p>
                  <p className="text-2xl font-bold mt-1">16,274.94</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+0.56%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-500">Buzzword Index</p>
                  <p className="text-2xl font-bold mt-1">1,245.35</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+1.23%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="py-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-default-500">Active Traders</p>
                  <p className="text-2xl font-bold mt-1">2,845</p>
                  <div className="flex items-center gap-1 mt-2">
                    <ArrowUpRight className="w-4 h-4 text-success" />
                    <span className="text-sm text-success font-medium">+12%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Movers */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-center w-full">
                <h3 className="text-lg font-semibold">Buzzword Stocks</h3>
                <Tabs size="sm" aria-label="Movers tabs" color="primary">
                  <Tab key="all" title="All" />
                  <Tab key="gainers" title="Gainers" />
                  <Tab key="losers" title="Losers" />
                </Tabs>
              </div>
            </CardHeader>
            <CardBody className="px-4">
              <div className="space-y-3">
                {stocks
                  .sort((a, b) => b.changePercent - a.changePercent)
                  .map((stock) => (
                    <div
                      key={stock.symbol}
                      className="flex items-center justify-between p-3 rounded-lg bg-default-100 hover:bg-default-200 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          stock.change >= 0 ? 'bg-success/10' : 'bg-danger/10'
                        }`}>
                          {stock.change >= 0 ? (
                            <TrendingUp className="w-5 h-5 text-success" />
                          ) : (
                            <TrendingDown className="w-5 h-5 text-danger" />
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm">{stock.symbol}</p>
                          <p className="text-xs text-default-500">{stock.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${stock.price.toFixed(2)}</p>
                        <Chip
                          size="sm"
                          color={stock.change >= 0 ? "success" : "danger"}
                          variant="flat"
                        >
                          {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                        </Chip>
                      </div>
                    </div>
                  ))}
              </div>
            </CardBody>
            <CardFooter>
              <Button color="primary" variant="light" className="w-full">
                View All Stocks
              </Button>
            </CardFooter>
          </Card>

          {/* Market News */}
          <Card>
            <CardHeader className="pb-3">
              <h3 className="text-lg font-semibold">Market News</h3>
            </CardHeader>
            <CardBody className="px-4">
              <div className="space-y-4">
                {news.map((item) => (
                  <div
                    key={item.id}
                    className="pb-4 border-b border-default-200 last:border-0 hover:opacity-80 transition-opacity cursor-pointer"
                  >
                    <p className="text-sm text-foreground mb-2 line-clamp-2 leading-relaxed">
                      {item.text}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-default-500">{item.time}</span>
                      {item.impact === 'positive' && (
                        <Chip size="sm" color="success" variant="flat">Bullish</Chip>
                      )}
                      {item.impact === 'negative' && (
                        <Chip size="sm" color="danger" variant="flat">Bearish</Chip>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
            <CardFooter>
              <Button color="primary" variant="light" className="w-full">
                View All News
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Category Performance */}
        <Card>
          <CardHeader className="pb-3">
            <h3 className="text-lg font-semibold">Category Performance</h3>
          </CardHeader>
          <CardBody className="px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Technology', change: 1.45, color: 'success' },
                { name: 'Politics', change: 0.82, color: 'success' },
                { name: 'Business', change: -0.34, color: 'danger' },
                { name: 'Geopolitics', change: -1.12, color: 'danger' },
              ].map((category) => (
                <div
                  key={category.name}
                  className="p-4 rounded-lg bg-default-100 hover:bg-default-200 transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium mb-2">{category.name}</p>
                  <div className="flex items-center gap-2">
                    {category.change >= 0 ? (
                      <ArrowUpRight className="w-4 h-4 text-success" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-danger" />
                    )}
                    <span className={`text-sm font-semibold ${
                      category.change >= 0 ? 'text-success' : 'text-danger'
                    }`}>
                      {category.change >= 0 ? '+' : ''}{category.change.toFixed(2)}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>

      </div>
    </div>
  );
}
