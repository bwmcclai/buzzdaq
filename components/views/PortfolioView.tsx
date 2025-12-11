'use client';

import { motion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '@heroui/react';
import { Wallet, TrendingUp, DollarSign, PieChart, Sparkles } from 'lucide-react';

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

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
};

export default function PortfolioView({ stocks }: PortfolioViewProps) {
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
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Wallet className="w-8 h-8 text-primary" />
            </motion.div>
            <h2 className="text-4xl font-bold gradient-text-primary">Portfolio</h2>
          </div>
          <p className="text-default-400 text-lg">Track your buzzword investments and performance</p>
        </motion.div>
        
        {/* Portfolio Summary Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-default-400 mb-1 font-medium">Total Value</p>
                    <motion.p 
                      className="text-4xl font-bold mb-2"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      $10,000.00
                    </motion.p>
                    <p className="text-sm text-success flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      +0.00% all time
                    </p>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <DollarSign className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-default-400 mb-1 font-medium">Available Cash</p>
                    <motion.p 
                      className="text-4xl font-bold mb-2"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                    >
                      $10,000.00
                    </motion.p>
                    <p className="text-sm text-default-400">Ready to invest</p>
                  </div>
                  <motion.div 
                    whileHover={{ scale: 1.15 }}
                    className="w-14 h-14 bg-gradient-success rounded-2xl flex items-center justify-center shadow-lg shadow-success/30"
                  >
                    <Wallet className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
          
          <motion.div variants={itemVariants}>
            <Card className="glass-card border-white/10 hover-lift">
              <CardBody className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <p className="text-sm text-default-400 mb-1 font-medium">Total Positions</p>
                    <motion.p 
                      className="text-4xl font-bold mb-2"
                      initial={{ scale: 1 }}
                      animate={{ scale: [1, 1.02, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                    >
                      0
                    </motion.p>
                    <p className="text-sm text-default-400">Active holdings</p>
                  </div>
                  <motion.div 
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.6 }}
                    className="w-14 h-14 bg-gradient-primary rounded-2xl flex items-center justify-center shadow-lg shadow-primary/30"
                  >
                    <PieChart className="w-7 h-7 text-white" />
                  </motion.div>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        </motion.div>
        
        {/* Holdings Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="glass-card border-white/10">
            <CardHeader className="px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h3 className="text-xl font-bold gradient-text">Your Holdings</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 }}
                className="text-center py-20"
              >
                <motion.div 
                  className="mb-6 inline-block"
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 0.8, 0.5]
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <div className="relative text-8xl">📊</div>
                  </div>
                </motion.div>
                <motion.p 
                  className="text-2xl font-bold mb-3 gradient-text"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  No positions yet
                </motion.p>
                <motion.p 
                  className="text-default-400 text-base max-w-md mx-auto"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  Start trading to build your portfolio and track your buzzword investments
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="mt-8"
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-gradient-primary rounded-xl font-semibold text-white shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-shadow"
                  >
                    Explore Trading Floor
                  </motion.button>
                </motion.div>
              </motion.div>
            </CardBody>
          </Card>
        </motion.div>

        {/* Performance Chart Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-6"
        >
          <Card className="glass-card border-white/10">
            <CardHeader className="px-6 py-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-success" />
                <h3 className="text-xl font-bold gradient-text">Performance</h3>
              </div>
            </CardHeader>
            <CardBody className="p-6">
              <div className="h-64 flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-6xl mb-4"
                  >
                    📈
                  </motion.div>
                  <p className="text-default-400">Performance chart will appear here</p>
                  <p className="text-sm text-default-500 mt-1">Make your first trade to start tracking</p>
                </motion.div>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
