import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// Register the components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const StockChart = ({ stockData, ticker, timeRange }) => {
  const getChartOptions = () => ({
    responsive: true,
    scales: {
      x: {
        type: 'category', // Ensure the x-axis scale is correctly defined
        ticks: {
          autoSkip: true,
          callback: (value) => stockData?.labels[value] || '',
        },
      },
    },
    plugins: {
      legend: { display: true, position: 'top' },
      title: {
        display: true,
        text: `${ticker.toUpperCase()} Stock Price (${timeRange})`,
      },
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-md shadow-md">
      <Line data={stockData} options={getChartOptions()} />
    </div>
  );
};

export default StockChart;
