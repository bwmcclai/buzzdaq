import { NextRequest, NextResponse } from 'next/server';
import Parser from 'rss-parser';
import { getTickers, getLatestPrice, insertPrice } from '@/lib/db';

const parser = new Parser();

// RSS feeds to scrape
const RSS_FEEDS = [
  'https://feeds.bbci.co.uk/news/rss.xml',
  'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  'https://www.reddit.com/r/worldnews/.rss',
];

/**
 * Security check: Ensure request is authorized via CRON_SECRET
 */
function isAuthorized(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization');
  const token = authHeader?.replace('Bearer ', '');
  return token === process.env.CRON_SECRET;
}

/**
 * Fetch and parse RSS feeds
 */
async function fetchNews(): Promise<string[]> {
  const allContent: string[] = [];

  for (const feedUrl of RSS_FEEDS) {
    try {
      const feed = await parser.parseURL(feedUrl);
      
      feed.items.forEach((item) => {
        if (item.title) allContent.push(item.title.toLowerCase());
        if (item.contentSnippet) allContent.push(item.contentSnippet.toLowerCase());
        if (item.content) allContent.push(item.content.toLowerCase());
      });
    } catch (error) {
      console.error(`Error fetching feed ${feedUrl}:`, error);
    }
  }

  return allContent;
}

/**
 * Count keyword mentions in news content
 */
function countKeywords(content: string[], keywords: string[]): number {
  let count = 0;
  
  for (const keyword of keywords) {
    const keywordLower = keyword.toLowerCase();
    for (const text of content) {
      // Count occurrences of keyword in text
      const matches = text.match(new RegExp(keywordLower, 'g'));
      if (matches) {
        count += matches.length;
      }
    }
  }
  
  return count;
}

/**
 * Calculate new price based on mentions and volatility
 */
function calculateNewPrice(
  oldPrice: number,
  mentionCount: number,
  basePrice: number
): number {
  // Price impact from mentions (0.5 per mention)
  const mentionImpact = mentionCount * 0.5;
  
  // Random noise for volatility (-0.1 to +0.1)
  const randomNoise = (Math.random() - 0.5) * 0.2;
  
  // Mean reversion factor (slowly pulls price back toward base)
  const meanReversion = (basePrice - oldPrice) * 0.05;
  
  // Calculate new price
  let newPrice = oldPrice + mentionImpact + randomNoise + meanReversion;
  
  // Ensure price doesn't go below $1
  newPrice = Math.max(1, newPrice);
  
  // Round to 2 decimal places
  return Math.round(newPrice * 100) / 100;
}

/**
 * Main cron handler
 */
export async function GET(request: NextRequest) {
  try {
    // Security check
    if (!isAuthorized(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.log('Starting market update cron job...');

    // Fetch all news content
    const newsContent = await fetchNews();
    console.log(`Fetched ${newsContent.length} news items`);

    // Get all tickers
    const tickers = await getTickers();
    console.log(`Processing ${tickers.length} tickers`);

    const updates = [];

    // Process each ticker
    for (const ticker of tickers) {
      // Get current price
      const latestPriceData = await getLatestPrice(ticker.symbol);
      const currentPrice = latestPriceData ? parseFloat(latestPriceData.price) : ticker.base_price;

      // Count keyword mentions
      const mentionCount = countKeywords(newsContent, ticker.keywords);

      // Calculate new price
      const newPrice = calculateNewPrice(
        currentPrice,
        mentionCount,
        ticker.base_price
      );

      // Insert new price
      await insertPrice(ticker.symbol, newPrice);

      updates.push({
        symbol: ticker.symbol,
        oldPrice: currentPrice,
        newPrice: newPrice,
        mentions: mentionCount,
        change: newPrice - currentPrice,
        changePercent: ((newPrice - currentPrice) / currentPrice * 100).toFixed(2) + '%',
      });

      console.log(
        `${ticker.symbol}: $${currentPrice} → $${newPrice} (${mentionCount} mentions)`
      );
    }

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      updates,
    });
  } catch (error) {
    console.error('Error updating market:', error);
    return NextResponse.json(
      { 
        error: 'Failed to update market',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
