import React, { useState } from 'react';
import TickerInput from './TickerInput';
import TimeRangeButtons from './TimeRangeButtons';
import StockChart from './StockChart';
import { getPolygonParams } from '../../utils/utils';

const Dashboard = () => {
  const [ticker, setTicker] = useState('');
  const [timeRange, setTimeRange] = useState('1D');
  const [stockData, setStockData] = useState(null);
  const [currentPrice, setCurrentPrice] = useState(null);
  const [error, setError] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loadingPrediction, setLoadingPrediction] = useState(false); // New state for button loading

  const fetchStockData = async (range) => {
    try {
      setError('');
      setStockData(null);

      const { multiplier, timespan, from, to } = getPolygonParams(range);

      const polygonURL = `https://api.polygon.io/v2/aggs/ticker/${ticker.toUpperCase()}/range/${multiplier}/${timespan}/${from}/${to}?adjusted=true&sort=asc&limit=5000&apiKey=${process.env.REACT_APP_POLYGON_API_KEY}`;

      const response = await fetch(polygonURL);
      if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

      const data = await response.json();
      if (!data.results || !Array.isArray(data.results)) throw new Error('No valid data returned');

      const results = data.results;

      const allLabels = results.map((bar) => {
        const dateObj = new Date(bar.t);
        return range === '1D'
          ? dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          : dateObj.toLocaleDateString();
      });

      const allData = results.map((bar) => bar.o);

      // Extract the current (most recent) price
      const latestPrice = results[results.length - 1].c; // 'c' is the closing price

      setStockData({
        labels: allLabels,
        datasets: [
          {
            label: `${ticker.toUpperCase()} Stock Price (${range})`,
            data: allData,
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            pointRadius: 0,
            fill: false,
          },
        ],
      });

      setCurrentPrice(latestPrice); // Set the current price
    } catch (err) {
      setError(err.message);
    }
  };

  const fetchPrediction = async () => {
    setLoadingPrediction(true); // Set loading state to true
    try {
      setError('');
      setPrediction(null);

      const response = await fetch('http://127.0.0.1:5000/api/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ticker }),
      });

      if (!response.ok) throw new Error(`Prediction request failed with status ${response.status}`);

      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoadingPrediction(false); // Reset loading state
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 to-blue-600 text-white pt-16">
      <div className="max-w-7xl mx-auto p-8 space-y-8">
        {/* Header */}
        <header className="text-center">
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            Your Trading Dashboard
          </h1>
          <p className="mt-2 text-lg text-white/80">
            Analyze stock data and get AI-powered predictions!
          </p>
        </header>

        {/* Input & Controls */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 animate-slide-up">
          <div className="w-full max-w-xs">
            <input
              type="text"
              value={ticker}
              onChange={(e) => setTicker(e.target.value)}
              className="bg-white text-gray-900 rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter Stock Symbol"
            />
          </div>
          <button
            className={`px-6 py-3 rounded shadow-md text-lg font-semibold transition-colors duration-300 ${
              loadingPrediction
                ? 'bg-gray-500 cursor-not-allowed'
                : 'bg-blue-700 hover:bg-blue-500'
            }`}
            onClick={() => {
              setTimeRange('1M'); // Set time range to 1M before fetching data
              fetchStockData('1M'); // Fetch 1M stock data
              fetchPrediction(); // Fetch prediction
            }}
            disabled={loadingPrediction} // Disable button when loading
          >
            {loadingPrediction ? 'Loading...' : 'Get Prediction'} {/* Show loading text */}
          </button>
        </div>

        {/* Time Range Buttons */}
        <div className="flex flex-wrap justify-center items-center gap-4">
          <TimeRangeButtons
            timeRange={timeRange}
            setTimeRange={setTimeRange}
            fetchStockData={fetchStockData}
          />
        </div>

        {/* Error or Labels */}
        {error && (
          <p className="text-red-500 text-center font-semibold animate-fade-in">
            {error}
          </p>
        )}
        {currentPrice && (
          <div className="bg-white/10 p-4 rounded-md shadow-md text-center animate-fade-in">
            <p className="text-lg font-semibold">
              Current price for <span className="text-blue-300">{ticker.toUpperCase()}</span> is{' '}
              <span className="text-green-400">${currentPrice.toFixed(2)}</span>.
            </p>
          </div>
        )}
        {prediction && (
          <div className="bg-white/10 p-4 rounded-md shadow-md text-center animate-fade-in">
            <p className="text-lg font-semibold">
              Predicted price for <span className="text-blue-300">{prediction.stock_symbol}</span> on{' '}
              <span className="text-blue-300">{prediction.date}</span> is{' '}
              <span className="text-green-400">${prediction.predicted_price}</span>.
            </p>
          </div>
        )}

        {/* Stock Chart */}
        {stockData && (
          <div className="bg-white/10 p-6 rounded-md shadow-lg animate-fade-in">
            <StockChart stockData={stockData} ticker={ticker} timeRange={timeRange} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;