import React from 'react';

const TimeRangeButtons = ({ timeRange, setTimeRange, fetchStockData }) => (
  <div className="flex gap-2 mb-8">
    {['1D', '5D', '1M', '1Y', '5Y'].map((range) => (
      <button
        key={range}
        onClick={() => {
          setTimeRange(range);
          fetchStockData(range);
        }}
        className={`px-4 py-2 font-bold rounded-md transition ${
          timeRange === range
            ? 'bg-blue-500 text-white'
            : 'bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-200'
        } hover:bg-blue-400`}
      >
        {range}
      </button>
    ))}
  </div>
);

export default TimeRangeButtons;
