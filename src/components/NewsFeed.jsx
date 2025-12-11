import { motion, AnimatePresence } from 'framer-motion';

export const NewsFeed = ({ news }) => {
  return (
    <div className="bg-gray-900 border border-green-500 rounded-lg p-6 terminal-border h-full overflow-hidden">
      <h2 className="text-2xl font-bold text-green-400 mb-4 terminal-text">
        📰 MARKET NEWS
      </h2>
      <div className="space-y-3 overflow-y-auto h-[calc(100%-3rem)] pr-2">
        <AnimatePresence>
          {news.length === 0 ? (
            <p className="text-green-600 text-sm">Waiting for market news...</p>
          ) : (
            news.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-3 bg-black border border-green-700 rounded"
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="text-xs text-green-600">{item.time}</span>
                </div>
                <p className="text-sm text-green-400">{item.text}</p>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
