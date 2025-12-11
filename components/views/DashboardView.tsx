'use client';

import { motion } from 'framer-motion';
import { Card, CardHeader, CardBody, CardFooter, Chip, Button, Tabs, Tab } from '@heroui/react';
import { TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight, Flame, Zap, Activity } from 'lucide-react';

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function DashboardView({ stocks }: DashboardViewProps) {
  // Mock news data
  const news = [
    { id: 1, text: 'AI adoption surges in enterprise markets', time: '2 hours ago', impact: 'positive' },
    { id: 2, text: 'Tech sector shows strong momentum', time: '3 hours ago', impact: 'positive' },
    { id: 3, text: 'Market volatility expected to continue', time: '4 hours ago', impact: 'negative' },
    { id: 4, text: 'Buzzword trends shifting rapidly', time: '5 hours ago', impact: 'neutral' },
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        
        {/* Market Overview Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift group h-full">
              <CardBody className="py-6 px-5">
                <div className="flex items-center justify-between h-full">
                  <div className="flex-1">
                    <Chip size="sm" color="danger" variant="flat" className="mb-2 font-semibold">
                      Biggest Loser
                    </Chip>
                    <p className="text-sm text-default-400 mb-1 font-medium">#BIDEN</p>
                    <p className="text-3xl font-bold mb-2">$5,099.23</p>
                    <div className="flex items-center gap-1">
                      <ArrowDownRight className="w-4 h-4 text-danger" />
                      <span className="text-sm text-danger font-semibold">-0.40%</span>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-gradient-danger rounded-2xl flex items-center justify-center shadow-lg shadow-danger/20"
                  >
                    <TrendingDown className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift group h-full">
              <CardBody className="py-6 px-5">
                <div className="flex items-center justify-between h-full">
                  <div className="flex-1">
                    <Chip size="sm" color="success" variant="flat" className="mb-2 font-semibold">
                      Biggest Gainer
                    </Chip>
                    <p className="text-sm text-default-400 mb-1 font-medium">$VENEZUELA</p>
                    <p className="text-3xl font-bold mb-2">$16,274.94</p>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-semibold">+0.56%</span>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: -360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-gradient-success rounded-2xl flex items-center justify-center shadow-lg shadow-success/20"
                  >
                    <TrendingUp className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift group h-full">
              <CardBody className="py-6 px-5">
                <div className="flex items-center justify-between h-full">
                  <div className="flex-1">
                    <div className="h-6 mb-2"></div>
                    <p className="text-sm text-default-400 mb-1 font-medium">Buzzword Index</p>
                    <p className="text-3xl font-bold mb-2">1,245.35</p>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-success" />
                      <span className="text-sm text-success font-semibold">+1.23%</span>
                    </div>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Flame className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift group h-full">
              <CardBody className="py-6 px-5">
                <div className="flex items-center justify-between h-full">
                  <div className="flex-1">
                    <div className="h-6 mb-2"></div>
                    <p className="text-sm text-default-400 mb-1 font-medium">Active Traders</p>
                    <p className="text-3xl font-bold mb-2">2,845</p>
                    <div className="flex items-center gap-1">
                      <ArrowUpRight className="w-4 h-4 text-primary" />
                      <span className="text-sm text-primary font-semibold">+12%</span>
                    </div>
                  </div>
                  <motion.div 
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/20"
                  >
                    <Activity className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Top Movers */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3 px-6 pt-5">
                <div className="flex justify-between items-center w-full">
                  <div className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    <h3 className="text-xl font-bold gradient-text-primary">Buzzword Stocks</h3>
                  </div>
                  <Tabs 
                    size="sm" 
                    aria-label="Movers tabs" 
                    color="primary" 
                    variant="solid"
                    classNames={{
                      tabList: "bg-white/5 backdrop-blur-sm border border-white/10 p-1 rounded-lg",
                      cursor: "bg-gradient-to-r from-primary to-purple-500 shadow-lg shadow-primary/20",
                      tab: "px-4 py-2 font-semibold data-[hover-unselected=true]:opacity-80 transition-all",
                      tabContent: "group-data-[selected=true]:text-white"
                    }}
                  >
                    <Tab key="all" title="All" />
                    <Tab key="gainers" title="Gainers" />
                    <Tab key="losers" title="Losers" />
                  </Tabs>
                </div>
              </CardHeader>
              <CardBody className="px-6">
                <div className="space-y-3">
                  {stocks
                    .sort((a, b) => b.changePercent - a.changePercent)
                    .map((stock, index) => (
                      <motion.div
                        key={stock.symbol}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02, x: 4 }}
                        className="flex items-center justify-between p-4 rounded-xl glass cursor-pointer border border-white/5 hover:border-white/20 transition-all"
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <motion.div 
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                              stock.change >= 0 
                                ? 'bg-gradient-success shadow-lg shadow-success/20' 
                                : 'bg-gradient-danger shadow-lg shadow-danger/20'
                            }`}
                          >
                            {stock.change >= 0 ? (
                              <TrendingUp className="w-6 h-6 text-white" />
                            ) : (
                              <TrendingDown className="w-6 h-6 text-white" />
                            )}
                          </motion.div>
                          <div>
                            <p className="font-bold text-base">{stock.symbol}</p>
                            <p className="text-xs text-default-400">{stock.category}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg mb-1">${stock.price.toFixed(2)}</p>
                          <Chip
                            size="sm"
                            color={stock.change >= 0 ? "success" : "danger"}
                            variant="flat"
                            className="font-semibold"
                          >
                            {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                          </Chip>
                        </div>
                      </motion.div>
                    ))}
                </div>
              </CardBody>
              <CardFooter className="px-6 pt-3 pb-5">
                <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    color="primary" 
                    variant="shadow"
                    size="lg"
                    className="w-full font-semibold bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity rounded-2xl flex items-center justify-center gap-2"
                  >
                    <span>View All Stocks</span>
                    <motion.div 
                      whileHover={{ rotate: -45 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>

          {/* Market News */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="glass-card border-white/10">
              <CardHeader className="pb-3 px-6 pt-5">
                <h3 className="text-xl font-bold gradient-text">Market News</h3>
              </CardHeader>
              <CardBody className="px-6">
                <div className="space-y-4">
                  {news.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="pb-4 border-b border-white/10 last:border-0 cursor-pointer transition-all group"
                    >
                      <p className="text-sm text-foreground mb-2 line-clamp-2 leading-relaxed group-hover:text-primary transition-colors">
                        {item.text}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-default-400">{item.time}</span>
                        {item.impact === 'positive' && (
                          <Chip size="sm" color="success" variant="flat" className="font-semibold">
                            Bullish
                          </Chip>
                        )}
                        {item.impact === 'negative' && (
                          <Chip size="sm" color="danger" variant="flat" className="font-semibold">
                            Bearish
                          </Chip>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardBody>
              <CardFooter className="px-6 pt-3 pb-5">
                <motion.div className="w-full" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button 
                    color="primary" 
                    variant="shadow"
                    size="lg"
                    className="w-full font-semibold bg-gradient-to-r from-primary to-purple-500 hover:opacity-90 transition-opacity rounded-2xl flex items-center justify-center gap-2"
                  >
                    <span>View All News</span>
                    <motion.div 
                      whileHover={{ rotate: -45 }}
                      transition={{ duration: 0.3 }}
                      className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0"
                    >
                      <ArrowUpRight className="w-4 h-4" />
                    </motion.div>
                  </Button>
                </motion.div>
              </CardFooter>
            </Card>
          </motion.div>
        </div>

        {/* Category Performance */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader className="pb-3 px-6 pt-5">
              <h3 className="text-xl font-bold gradient-text">Category Performance</h3>
            </CardHeader>
            <CardBody className="px-6 pb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { name: 'Technology', change: 1.45, color: 'success' },
                  { name: 'Politics', change: 0.82, color: 'success' },
                  { name: 'Business', change: -0.34, color: 'danger' },
                  { name: 'Geopolitics', change: -1.12, color: 'danger' },
                ].map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    className="p-5 rounded-xl glass cursor-pointer border border-white/5 hover:border-white/20 transition-all"
                  >
                    <p className="text-sm font-bold mb-3 text-foreground">{category.name}</p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ 
                          y: category.change >= 0 ? [0, -3, 0] : [0, 3, 0]
                        }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        {category.change >= 0 ? (
                          <ArrowUpRight className="w-5 h-5 text-success" />
                        ) : (
                          <ArrowDownRight className="w-5 h-5 text-danger" />
                        )}
                      </motion.div>
                      <span className={`text-base font-bold ${
                        category.change >= 0 ? 'text-success' : 'text-danger'
                      }`}>
                        {category.change >= 0 ? '+' : ''}{category.change.toFixed(2)}%
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardBody>
          </Card>
        </motion.div>

      </div>
    </div>
  );
}
