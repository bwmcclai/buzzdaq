import { useMarketEngine } from './hooks/useMarketEngine';
import { TickerTape } from './components/TickerTape';
import { ChartCard } from './components/ChartCard';
import { OrderTerminal } from './components/OrderTerminal';
import { NewsFeed } from './components/NewsFeed';

function App() {
  const { stocks, portfolio, news, executeTrade } = useMarketEngine();

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="bg-gray-900 border-b-2 border-green-500 p-4">
        <h1 className="text-4xl font-bold text-green-400 text-center terminal-text">
          💹 BUZZDAQ - Stock Market for Buzzwords
        </h1>
        <p className="text-center text-green-600 mt-2 text-sm">
          Trade the hottest corporate buzzwords in real-time
        </p>
      </header>

      {/* Ticker Tape */}
      <TickerTape stocks={stocks} />

      {/* Main Content */}
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stocks.slice(0, 4).map((stock) => (
                <ChartCard key={stock.symbol} stock={stock} />
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {stocks.slice(4).map((stock) => (
                <ChartCard key={stock.symbol} stock={stock} />
              ))}
            </div>
          </div>

          {/* Right Column - Order Terminal & News */}
          <div className="space-y-4">
            <OrderTerminal
              stocks={stocks}
              portfolio={portfolio}
              onTrade={executeTrade}
            />
            <NewsFeed news={news} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t-2 border-green-500 p-4 mt-8">
        <p className="text-center text-green-600 text-sm">
          ⚠️ SATIRICAL PROTOTYPE - Not actual financial advice. All buzzword
          prices are randomly generated.
        </p>
      </footer>
    </div>
  );
}

export default App;
