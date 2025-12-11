# BUZZDAQ - Next.js Full Stack Application

A satirical stock market for buzzwords, built with Next.js 14+, TypeScript, and Vercel Postgres.

## 🚀 Features

- **Real-time Market Data**: Prices update based on RSS news feeds
- **Backend API**: Market data API and automated cron jobs
- **Modern UI**: Built with Hero UI and Tailwind CSS
- **Database**: Vercel Postgres for storing tickers and prices
- **Automated Updates**: Vercel Cron Jobs update market prices every 5 minutes

## 📋 Prerequisites

- Node.js 18+ 
- npm or pnpm
- Vercel account (for deployment and database)

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Create a Vercel Postgres database in your Vercel dashboard and copy the connection strings.

### 3. Environment Variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Required variables:
- `POSTGRES_URL`: Your Vercel Postgres connection string
- `CRON_SECRET`: A random secret string for cron job authentication

### 4. Initialize Database

You'll need to run the initialization script once to set up tables and seed data.

Create a temporary API route or run directly:

```typescript
import { initDatabase, seedDatabase } from '@/lib/db';

await initDatabase();
await seedDatabase();
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
buzzdaq-next/
├── app/
│   ├── api/
│   │   ├── cron/
│   │   │   └── update-market/
│   │   │       └── route.ts       # Cron job for market updates
│   │   └── market/
│   │       └── route.ts           # GET endpoint for market data
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
│   ├── views/
│   │   ├── DashboardView.tsx
│   │   ├── TradingView.tsx
│   │   └── PortfolioView.tsx
│   └── MarketDashboard.tsx
├── lib/
│   └── db.ts                      # Database utilities
├── vercel.json                    # Cron job configuration
└── package.json
```

## 🎯 API Endpoints

### GET /api/market
Returns current prices for all tickers.

**Response:**
```json
{
  "success": true,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "data": [
    {
      "symbol": "$AI",
      "name": "Technology",
      "price": 150.25,
      "change": 2.5,
      "changePercent": 1.69,
      "category": "Technology",
      "keywords": ["ai", "artificial intelligence"],
      "basePrice": 150.00
    }
  ]
}
```

### GET /api/cron/update-market
Triggered by Vercel Cron every 5 minutes. Requires `Authorization: Bearer ${CRON_SECRET}` header.

## 🔒 Security

The cron endpoint is protected by a secret token. Make sure to:
1. Generate a strong random string for `CRON_SECRET`
2. Never commit `.env.local` to version control
3. Add the secret to Vercel environment variables

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Vercel will automatically:
- Set up the cron job based on `vercel.json`
- Connect to your Postgres database
- Build and deploy your application

## 📊 How It Works

### Market Price Updates

1. **Cron Job**: Every 5 minutes, Vercel triggers `/api/cron/update-market`
2. **RSS Scraping**: Fetches news from BBC, NYT, and Reddit
3. **Keyword Matching**: Counts mentions of each ticker's keywords
4. **Price Calculation**: 
   ```
   NewPrice = OldPrice + (MentionCount × 0.5) + RandomNoise + MeanReversion
   ```
5. **Database Update**: Stores new price in the `prices` table

### Frontend Updates

- Uses SWR to poll `/api/market` every 5 seconds
- Real-time UI updates without page refresh
- Hero UI components for modern, responsive design

## 🎨 Buzzword Tickers

- **$AI**: Artificial Intelligence keywords
- **$TRUMP**: Political keywords
- **$ELON**: Elon Musk and companies
- **$WAR**: Geopolitical conflict keywords

## 📝 Database Schema

### tickers
- `symbol` (PK): Ticker symbol
- `keywords`: Array of keywords to track
- `category`: Category name
- `base_price`: Initial/baseline price

### prices
- `id` (PK): Auto-incrementing ID
- `symbol` (FK): Reference to ticker
- `price`: Current price
- `timestamp`: When price was recorded

## 🤝 Contributing

This is a satirical project for educational purposes. Feel free to fork and modify!

## 📄 License

MIT
