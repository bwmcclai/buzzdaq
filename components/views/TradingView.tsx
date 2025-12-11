'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader, Chip, Button, Input } from '@heroui/react';
import { TrendingUp, TrendingDown, Search, ShoppingCart, Sparkles, Filter } from 'lucide-react';

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 100,
      damping: 15
    }
  }
};

export default function TradingView({ stocks }: TradingViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = Array.from(new Set(stocks.map(s => s.category)));

  const filteredStocks = stocks.filter(stock => {
    const matchesSearch = stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         stock.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || stock.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="h-full overflow-y-auto custom-scrollbar">
      <div className="max-w-[1600px] mx-auto p-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-bold gradient-text-primary">Trading Floor</h2>
          </div>
          <p className="text-default-400 text-lg">Buy and sell buzzword stocks in real-time</p>
        </motion.div>
        
        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6 glass-card p-4 rounded-2xl border border-white/10"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Search stocks..."
                startContent={<Search className="w-4 h-4 text-default-400" />}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                classNames={{
                  input: "text-sm",
                  inputWrapper: "bg-white/5 border-white/10 hover:bg-white/10"
                }}
                variant="bordered"
                size="lg"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant={!selectedCategory ? "solid" : "bordered"}
                  color={!selectedCategory ? "primary" : "default"}
                  onPress={() => setSelectedCategory(null)}
                  startContent={<Filter className="w-4 h-4" />}
                  className={!selectedCategory ? "glow-primary" : ""}
                >
                  All
                </Button>
              </motion.div>
              {categories.map((category) => (
                <motion.div 
                  key={category}
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={selectedCategory === category ? "solid" : "bordered"}
                    color={selectedCategory === category ? "primary" : "default"}
                    onPress={() => setSelectedCategory(category)}
                    className={selectedCategory === category ? "glow-primary" : ""}
                  >
                    {category}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stock Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredStocks.map((stock) => (
            <motion.div
              key={stock.symbol}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              layout
            >
              <Card 
                isPressable 
                className="glass-card border-white/10 hover:border-white/30 group transition-all duration-300 overflow-hidden relative"
              >
                {/* Animated background gradient */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity"
                  style={{
                    background: stock.change >= 0 
                      ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                      : 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
                  }}
                />
                
                <CardHeader className="pb-2 px-6 pt-6 relative z-10">
                  <div className="flex justify-between items-start w-full">
                    <div className="flex-1">
                      <motion.p 
                        className="font-bold text-2xl mb-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        {stock.symbol}
                      </motion.p>
                      <Chip 
                        size="sm" 
                        variant="flat" 
                        className="mt-1"
                        color="primary"
                      >
                        {stock.category}
                      </Chip>
                    </div>
                    <motion.div 
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className={`p-4 rounded-2xl ${
                        stock.change >= 0 
                          ? 'bg-gradient-success shadow-lg shadow-success/30' 
                          : 'bg-gradient-danger shadow-lg shadow-danger/30'
                      }`}
                    >
                      {stock.change >= 0 ? (
                        <TrendingUp className="w-7 h-7 text-white" />
                      ) : (
                        <TrendingDown className="w-7 h-7 text-white" />
                      )}
                    </motion.div>
                  </div>
                </CardHeader>
                <CardBody className="px-6 pb-6 relative z-10">
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-default-400 mb-2 font-medium">Current Price</p>
                      <motion.p 
                        className="text-4xl font-bold"
                        initial={{ scale: 1 }}
                        whileHover={{ scale: 1.05 }}
                      >
                        ${stock.price.toFixed(2)}
                      </motion.p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-white/10">
                      <span className="text-sm text-default-400 font-medium">24h Change</span>
                      <Chip
                        size="md"
                        color={stock.change >= 0 ? "success" : "danger"}
                        variant="flat"
                        className="font-bold"
                        startContent={
                          stock.change >= 0 ? (
                            <TrendingUp className="w-3 h-3" />
                          ) : (
                            <TrendingDown className="w-3 h-3" />
                          )
                        }
                      >
                        {stock.changePercent >= 0 ? '+' : ''}{stock.changePercent.toFixed(2)}%
                      </Chip>
                    </div>

                    <div className="flex gap-2 pt-2">
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          fullWidth
                          color="success"
                          variant="flat"
                          className="font-semibold"
                          startContent={<ShoppingCart className="w-4 h-4" />}
                        >
                          Buy
                        </Button>
                      </motion.div>
                      <motion.div 
                        className="flex-1"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button
                          fullWidth
                          color="danger"
                          variant="flat"
                          className="font-semibold"
                        >
                          Sell
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredStocks.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="glass-card p-12 rounded-2xl inline-block">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-6xl mb-4"
              >
                🔍
              </motion.div>
              <p className="text-xl text-default-400 font-medium">No stocks found</p>
              <p className="text-sm text-default-500 mt-2">Try adjusting your search or filters</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
