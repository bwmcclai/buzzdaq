'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Badge,
  Chip
} from '@heroui/react';
import { 
  LayoutDashboard, 
  TrendingUp, 
  Wallet, 
  BarChart3,
  Users,
  Globe,
  Bell,
  Settings,
  LogOut,
  User as UserIcon,
  Sparkles
} from 'lucide-react';
import DashboardView from './views/DashboardView';
import TradingView from './views/TradingView';
import PortfolioView from './views/PortfolioView';

// Fetcher function for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface Stock {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  category: string;
  keywords: string[];
  basePrice: number;
  timestamp: Date;
}

interface MarketResponse {
  success: boolean;
  timestamp: string;
  data: Stock[];
}

export default function MarketDashboard() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Fetch market data every 5 seconds
  const { data, error, isLoading } = useSWR<MarketResponse>(
    '/api/market',
    fetcher,
    { 
      refreshInterval: 5000,
      revalidateOnFocus: false 
    }
  );

  const stocks = data?.data || [];

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'trading', icon: TrendingUp, label: 'Trading' },
    { id: 'portfolio', icon: Wallet, label: 'Portfolio' },
    { id: 'markets', icon: BarChart3, label: 'Markets' },
    { id: 'leaderboard', icon: Users, label: 'Leaderboard' },
    { id: 'global', icon: Globe, label: 'Global View' },
  ];

  const renderView = () => {
    if (isLoading) {
      return (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-full"
        >
          <div className="text-center">
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
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
            <motion.h3 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl gradient-text font-bold mb-2"
            >
              Loading Market Data...
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex gap-1 justify-center mt-4"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 bg-primary rounded-full"
                  animate={{ y: [0, -10, 0] }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      );
    }

    if (error) {
      return (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center justify-center h-full"
        >
          <div className="text-center glass-card p-8 rounded-2xl max-w-md">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
              className="text-6xl mb-4"
            >
              ⚠️
            </motion.div>
            <h3 className="text-2xl font-bold text-danger mb-2">Error Loading Data</h3>
            <p className="text-default-400">{error.message}</p>
            <Button 
              color="primary" 
              className="mt-4"
              startContent={<Sparkles className="w-4 h-4" />}
            >
              Retry
            </Button>
          </div>
        </motion.div>
      );
    }

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={activeView}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="h-full"
        >
          {(() => {
            switch (activeView) {
              case 'dashboard':
                return <DashboardView stocks={stocks} />;
              case 'trading':
                return <TradingView stocks={stocks} />;
              case 'portfolio':
                return <PortfolioView stocks={stocks} />;
              case 'markets':
              case 'leaderboard':
              case 'global':
                return (
                  <div className="flex items-center justify-center h-full">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center glass-card p-12 rounded-2xl"
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-6xl mb-4"
                      >
                        🚧
                      </motion.div>
                      <h3 className="text-2xl font-bold gradient-text mb-2">
                        {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
                      </h3>
                      <p className="text-default-400">Coming soon...</p>
                    </motion.div>
                  </div>
                );
              default:
                return <DashboardView stocks={stocks} />;
            }
          })()}
        </motion.div>
      </AnimatePresence>
    );
  };

  // Calculate mock portfolio metrics
  const portfolioCash = 10000;
  const portfolioValue = portfolioCash;
  const portfolioChange = 0;

  return (
    <div className="min-h-screen bg-gradient-dark grid-pattern">
      {/* Top Navigation Bar */}
      <Navbar 
        isBordered 
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        classNames={{
          wrapper: "px-6 glass"
        }}
        className="border-b border-white/10"
      >
        {/* Logo */}
        <NavbarContent justify="start">
          <NavbarBrand className="flex items-center gap-3">
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center glow-primary"
            >
              <TrendingUp className="w-6 h-6 text-white" />
            </motion.div>
            <div className="flex flex-col">
              <motion.p 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="font-bold text-2xl gradient-text-primary"
              >
                BUZZDAQ
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="text-xs text-default-400 font-medium italic"
              >
                Buy the Hype. Sell the Truth.
              </motion.p>
            </div>
          </NavbarBrand>
        </NavbarContent>

        {/* Main Navigation - Desktop */}
        <NavbarContent className="hidden lg:flex gap-2" justify="center">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <NavbarItem key={item.id}>
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    variant={isActive ? "flat" : "light"}
                    color={isActive ? "primary" : "default"}
                    startContent={<Icon className="w-4 h-4" />}
                    onPress={() => setActiveView(item.id)}
                    className={`${isActive ? "glow-primary rounded-xl" : "text-default-500 hover:text-foreground rounded-xl"} transition-all`}
                  >
                    {item.label}
                  </Button>
                </motion.div>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* Right Side - Portfolio & User */}
        <NavbarContent justify="end" className="gap-3">
          {/* Portfolio Value Chip */}
          <NavbarItem className="hidden md:flex">
            <motion.div 
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ scale: 1.05 }}
              className="flex items-center gap-3 px-5 py-2 my-2 glass-card rounded-xl border border-white/10"
            >
              <div className="text-right">
                <p className="text-xs text-default-400 font-medium">Portfolio</p>
                <p className="text-base font-bold">${portfolioValue.toFixed(2)}</p>
              </div>
              <Chip
                color={portfolioChange >= 0 ? "success" : "danger"}
                variant="flat"
                size="sm"
                className="font-semibold"
              >
                {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
              </Chip>
            </motion.div>
          </NavbarItem>

          {/* Notifications */}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    isIconOnly 
                    variant="light" 
                    aria-label="Notifications" 
                    className="relative hover:bg-white/5"
                  >
                    <Badge content="3" color="danger" size="sm" className="animate-pulse">
                      <Bell className="w-5 h-5" />
                    </Badge>
                  </Button>
                </motion.div>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="Notifications" 
                variant="flat" 
                className="glass-card p-0 w-80"
                classNames={{
                  list: "p-0 gap-0"
                }}
              >
                <DropdownItem key="header" className="cursor-default hover:bg-transparent" textValue="Notifications">
                  <div className="px-4 py-3 border-b border-white/10">
                    <h3 className="font-bold text-base">Notifications</h3>
                    <p className="text-xs text-default-400">You have 3 unread messages</p>
                  </div>
                </DropdownItem>
                <DropdownItem key="notif1" textValue="AI stock surge" className="data-[hover=true]:bg-white/5 py-3 px-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">$AI surged 15%!</p>
                      <p className="text-xs text-default-400">Your stock is performing well</p>
                      <p className="text-xs text-default-500 mt-1">2 minutes ago</p>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem key="notif2" textValue="Market alert" className="data-[hover=true]:bg-white/5 py-3 px-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-success rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Market Alert</p>
                      <p className="text-xs text-default-400">Tech sector showing strong momentum</p>
                      <p className="text-xs text-default-500 mt-1">1 hour ago</p>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem key="notif3" textValue="Portfolio update" className="data-[hover=true]:bg-white/5 py-3 px-4">
                  <div className="flex gap-3">
                    <div className="w-2 h-2 bg-warning rounded-full mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-sm">Portfolio Update</p>
                      <p className="text-xs text-default-400">Daily summary is ready to view</p>
                      <p className="text-xs text-default-500 mt-1">3 hours ago</p>
                    </div>
                  </div>
                </DropdownItem>
                <DropdownItem key="view-all" textValue="View all" className="data-[hover=true]:bg-primary/10 border-t border-white/10 py-3">
                  <p className="text-center text-sm font-semibold text-primary">View All Notifications</p>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          {/* User Menu */}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Avatar
                    isBordered
                    as="button"
                    className="transition-transform cursor-pointer"
                    color="primary"
                    name="User"
                    size="sm"
                    src=""
                  />
                </motion.div>
              </DropdownTrigger>
              <DropdownMenu 
                aria-label="User Actions" 
                variant="flat" 
                className="glass-card p-2 min-w-[200px]"
                itemClasses={{
                  base: "rounded-lg data-[hover=true]:bg-white/10 data-[hover=true]:text-foreground py-3 px-3 gap-3 transition-all",
                }}
              >
                <DropdownItem 
                  key="profile" 
                  startContent={<UserIcon className="w-4 h-4" />}
                  className="font-medium"
                >
                  Profile
                </DropdownItem>
                <DropdownItem 
                  key="settings" 
                  startContent={<Settings className="w-4 h-4" />}
                  className="font-medium"
                >
                  Settings
                </DropdownItem>
                <DropdownItem 
                  key="logout" 
                  color="danger" 
                  startContent={<LogOut className="w-4 h-4" />}
                  className="font-medium data-[hover=true]:bg-danger/20"
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          {/* Mobile Menu Toggle */}
          <NavbarItem className="lg:hidden">
            <NavbarMenuToggle
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </NavbarItem>
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu className="glass pt-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <NavbarMenuItem key={item.id}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Button
                    fullWidth
                    variant={isActive ? "flat" : "light"}
                    color={isActive ? "primary" : "default"}
                    startContent={<Icon className="w-4 h-4" />}
                    onPress={() => {
                      setActiveView(item.id);
                      setIsMenuOpen(false);
                    }}
                    className="justify-start"
                  >
                    {item.label}
                  </Button>
                </motion.div>
              </NavbarMenuItem>
            );
          })}
        </NavbarMenu>
      </Navbar>

      {/* Main Content */}
      <main className="h-[calc(100vh-64px)] overflow-hidden">
        {renderView()}
      </main>
    </div>
  );
}
