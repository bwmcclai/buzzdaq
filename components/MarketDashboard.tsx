'use client';

import { useState } from 'react';
import useSWR from 'swr';
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
  User as UserIcon
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
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">📈</div>
            <h3 className="text-2xl text-default-500 mb-2">Loading Market Data...</h3>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center h-full">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h3 className="text-2xl text-danger mb-2">Error Loading Data</h3>
            <p className="text-default-400">{error.message}</p>
          </div>
        </div>
      );
    }

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
            <div className="text-center">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-2xl text-default-500 mb-2">
                {activeView.charAt(0).toUpperCase() + activeView.slice(1)}
              </h3>
              <p className="text-default-400">Coming soon...</p>
            </div>
          </div>
        );
      default:
        return <DashboardView stocks={stocks} />;
    }
  };

  // Calculate mock portfolio metrics
  const portfolioCash = 10000;
  const portfolioValue = portfolioCash;
  const portfolioChange = 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Top Navigation Bar */}
      <Navbar 
        isBordered 
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        maxWidth="full"
        classNames={{
          wrapper: "px-6 backdrop-blur-md bg-background/80"
        }}
        className="border-b border-default-200"
      >
        {/* Logo */}
        <NavbarContent justify="start">
          <NavbarBrand className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="font-bold text-xl text-primary">BUZZDAQ</p>
          </NavbarBrand>
        </NavbarContent>

        {/* Main Navigation - Desktop */}
        <NavbarContent className="hidden lg:flex gap-6" justify="center">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavbarItem key={item.id} isActive={activeView === item.id}>
                <Button
                  variant={activeView === item.id ? "flat" : "light"}
                  color={activeView === item.id ? "primary" : "default"}
                  startContent={<Icon className="w-4 h-4" />}
                  onPress={() => setActiveView(item.id)}
                  className={activeView === item.id ? "" : "text-default-500"}
                >
                  {item.label}
                </Button>
              </NavbarItem>
            );
          })}
        </NavbarContent>

        {/* Right Side - Portfolio & User */}
        <NavbarContent justify="end">
          {/* Portfolio Value Chip */}
          <NavbarItem className="hidden md:flex">
            <div className="flex items-center gap-3 px-3 py-1 bg-default-100 rounded-lg">
              <div className="text-right">
                <p className="text-xs text-default-500">Portfolio</p>
                <p className="text-sm font-bold">${portfolioValue.toFixed(2)}</p>
              </div>
              <Chip
                color={portfolioChange >= 0 ? "success" : "danger"}
                variant="flat"
                size="sm"
              >
                {portfolioChange >= 0 ? '+' : ''}{portfolioChange.toFixed(2)}%
              </Chip>
            </div>
          </NavbarItem>

          {/* Notifications */}
          <NavbarItem>
            <Button isIconOnly variant="light" aria-label="Notifications">
              <Badge content="3" color="danger" size="sm">
                <Bell className="w-5 h-5" />
              </Badge>
            </Button>
          </NavbarItem>

          {/* User Menu */}
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="primary"
                  name="User"
                  size="sm"
                  src=""
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User Actions" variant="flat">
                <DropdownItem key="profile" startContent={<UserIcon className="w-4 h-4" />}>
                  Profile
                </DropdownItem>
                <DropdownItem key="settings" startContent={<Settings className="w-4 h-4" />}>
                  Settings
                </DropdownItem>
                <DropdownItem key="logout" color="danger" startContent={<LogOut className="w-4 h-4" />}>
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          {/* Mobile Menu Toggle */}
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
          />
        </NavbarContent>

        {/* Mobile Menu */}
        <NavbarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavbarMenuItem key={item.id}>
                <Button
                  fullWidth
                  variant={activeView === item.id ? "flat" : "light"}
                  color={activeView === item.id ? "primary" : "default"}
                  startContent={<Icon className="w-4 h-4" />}
                  onPress={() => {
                    setActiveView(item.id);
                    setIsMenuOpen(false);
                  }}
                  className="justify-start"
                >
                  {item.label}
                </Button>
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
