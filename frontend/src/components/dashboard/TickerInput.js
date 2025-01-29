import React from 'react';

const TickerInput = ({ ticker, setTicker, handleAnalyze }) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
    <input
      type="text"
      placeholder="Enter Ticker (e.g., AAPL)"
      value={ticker}
      onChange={(e) => setTicker(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-200"
    />
  </div>
);

export default TickerInput;
