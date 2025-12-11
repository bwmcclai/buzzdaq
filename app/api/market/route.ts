import { NextResponse } from 'next/server';
import { getTickers, getLatestPrices, getPriceHistory } from '@/lib/db';

export const dynamic = 'force-dynamic';

/**
 * GET /api/market
 * Returns the latest prices for all tickers
 */
export async function GET() {
  try {
    // Get all tickers
    const tickers = await getTickers();
    
    // Get latest prices
    const latestPrices = await getLatestPrices();
    
    // Create a map for quick lookup
    const priceMap = new Map(
      latestPrices.map(p => [p.symbol, { price: parseFloat(p.price), timestamp: p.timestamp }])
    );

    // Combine ticker data with prices
    const marketData = await Promise.all(
      tickers.map(async (ticker) => {
        const priceData = priceMap.get(ticker.symbol);
        const currentPrice = priceData?.price || ticker.base_price;
        
        // Get price history for calculating change
        const history = await getPriceHistory(ticker.symbol, 2);
        let change = 0;
        let changePercent = 0;
        
        if (history.length >= 2) {
          const previousPrice = parseFloat(history[1].price);
          change = currentPrice - previousPrice;
          changePercent = (change / previousPrice) * 100;
        }

        return {
          symbol: ticker.symbol,
          name: ticker.category,
          price: currentPrice,
          change: Math.round(change * 100) / 100,
          changePercent: Math.round(changePercent * 100) / 100,
          category: ticker.category,
          keywords: ticker.keywords,
          basePrice: ticker.base_price,
          timestamp: priceData?.timestamp || new Date(),
        };
      })
    );

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      data: marketData,
    });
  } catch (error) {
    console.error('Error fetching market data:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch market data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
