import React, { useState } from 'react';
import TickerInput from './TickerInput';
import TimeRangeButtons from './TimeRangeButtons';
import StockChart from './StockChart';
import { formatDate, getPolygonParams } from '../../utils/utils';

const Dashboard = () => {
  const [ticker, setTicker] = useState('');
  const [timeRange, setTimeRange] = useState('1D');
  const [stockData, setStockData] = useState(null);
  const [error, setError] = useState('');

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
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Trading Dashboard</h1>

      <TickerInput ticker={ticker} setTicker={setTicker} handleAnalyze={() => fetchStockData(timeRange)} />
      <TimeRangeButtons timeRange={timeRange} setTimeRange={setTimeRange} fetchStockData={fetchStockData} />

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {stockData && <StockChart stockData={stockData} ticker={ticker} timeRange={timeRange} />}
    </div>
  );
};

export default Dashboard;
