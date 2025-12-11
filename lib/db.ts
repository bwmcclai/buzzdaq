import { sql } from '@vercel/postgres';

export interface Ticker {
  symbol: string;
  keywords: string[];
  category: string;
  base_price: number;
}

export interface Price {
  id: number;
  symbol: string;
  price: number;
  timestamp: Date;
}

/**
 * Initialize the database with required tables
 */
export async function initDatabase() {
  // Create tickers table
  await sql`
    CREATE TABLE IF NOT EXISTS tickers (
      symbol VARCHAR(50) PRIMARY KEY,
      keywords TEXT[] NOT NULL,
      category VARCHAR(100),
      base_price DECIMAL(10, 2) NOT NULL
    );
  `;

  // Create prices table
  await sql`
    CREATE TABLE IF NOT EXISTS prices (
      id SERIAL PRIMARY KEY,
      symbol VARCHAR(50) REFERENCES tickers(symbol),
      price DECIMAL(10, 2) NOT NULL,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Create index for faster queries
  await sql`
    CREATE INDEX IF NOT EXISTS idx_prices_symbol_timestamp 
    ON prices(symbol, timestamp DESC);
  `;
}

/**
 * Seed the database with initial tickers
 */
export async function seedDatabase() {
  const tickers: Ticker[] = [
    {
      symbol: '$AI',
      keywords: ['ai', 'artificial intelligence', 'machine learning', 'neural', 'gpt', 'openai'],
      category: 'Technology',
      base_price: 150.00,
    },
    {
      symbol: '$TRUMP',
      keywords: ['trump', 'donald trump', 'maga', 'republican'],
      category: 'Politics',
      base_price: 120.00,
    },
    {
      symbol: '$ELON',
      keywords: ['elon', 'musk', 'tesla', 'spacex', 'twitter', 'x corp'],
      category: 'Business',
      base_price: 180.00,
    },
    {
      symbol: '$WAR',
      keywords: ['war', 'conflict', 'military', 'ukraine', 'russia', 'gaza'],
      category: 'Geopolitics',
      base_price: 95.00,
    },
  ];

  for (const ticker of tickers) {
    // Convert array to PostgreSQL array format
    const keywordsArray = `{${ticker.keywords.map(k => `"${k}"`).join(',')}}`;
    
    // Insert or update ticker using parameterized query
    await sql.query(
      `INSERT INTO tickers (symbol, keywords, category, base_price)
       VALUES ($1, $2, $3, $4)
       ON CONFLICT (symbol) 
       DO UPDATE SET 
         keywords = $2,
         category = $3,
         base_price = $4`,
      [ticker.symbol, keywordsArray, ticker.category, ticker.base_price]
    );

    // Insert initial price if not exists
    const existingPrices = await sql`
      SELECT COUNT(*) as count FROM prices WHERE symbol = ${ticker.symbol};
    `;

    if (existingPrices.rows[0].count === '0') {
      await sql`
        INSERT INTO prices (symbol, price)
        VALUES (${ticker.symbol}, ${ticker.base_price});
      `;
    }
  }
}

/**
 * Get all tickers
 */
export async function getTickers(): Promise<Ticker[]> {
  const result = await sql`
    SELECT symbol, keywords, category, base_price 
    FROM tickers;
  `;
  return result.rows as Ticker[];
}

/**
 * Get the latest price for each ticker
 */
export async function getLatestPrices() {
  const result = await sql`
    SELECT DISTINCT ON (symbol) 
      symbol, price, timestamp
    FROM prices
    ORDER BY symbol, timestamp DESC;
  `;
  return result.rows;
}

/**
 * Get price history for a specific ticker
 */
export async function getPriceHistory(symbol: string, limit: number = 50) {
  const result = await sql`
    SELECT price, timestamp
    FROM prices
    WHERE symbol = ${symbol}
    ORDER BY timestamp DESC
    LIMIT ${limit};
  `;
  return result.rows;
}

/**
 * Insert a new price for a ticker
 */
export async function insertPrice(symbol: string, price: number) {
  await sql`
    INSERT INTO prices (symbol, price)
    VALUES (${symbol}, ${price});
  `;
}

/**
 * Get the most recent price for a ticker
 */
export async function getLatestPrice(symbol: string) {
  const result = await sql`
    SELECT price, timestamp
    FROM prices
    WHERE symbol = ${symbol}
    ORDER BY timestamp DESC
    LIMIT 1;
  `;
  return result.rows[0];
}
