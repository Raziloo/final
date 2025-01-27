// src/components/Analytics.js

import React, { useEffect, useState, useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { ThemeContext } from '../context/ThemeContext'; // Import ThemeContext
import { useDispatch } from 'react-redux';
import { setAlert } from '../actions/alert';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Analytics = () => {
  const { auth } = useContext(AuthContext);
  const { darkMode } = useContext(ThemeContext); // Access darkMode from ThemeContext
  const dispatch = useDispatch();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await axios.get('/api/predict/analytics', {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });
        setAnalyticsData(res.data);
      } catch (err) {
        console.error(err.response);
        const errorMsg = err.response?.data?.msg || 'Failed to fetch analytics data';
        dispatch(setAlert(errorMsg, 'danger'));
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.token]);

  if (loading) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md`}
      >
        <p className="text-gray-600 dark:text-gray-300">Loading analytics...</p>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md`}
      >
        <p className="text-gray-600 dark:text-gray-300">No analytics data available.</p>
      </div>
    );
  }

  // Define chart colors based on dark mode
  const backgroundColor = darkMode
    ? 'rgba(59, 130, 246, 0.6)' // Light blue for dark mode
    : 'rgba(59, 130, 246, 0.6)'; // Default blue

  const borderColor = darkMode
    ? 'rgba(59, 130, 246, 1)' // Dark blue border
    : 'rgba(59, 130, 246, 1)'; // Default border color

  const data = {
    labels: analyticsData.labels, // e.g., ['January', 'February', ...]
    datasets: [
      {
        label: 'Prediction Accuracy (%)',
        data: analyticsData.accuracy, // e.g., [80, 85, ...]
        backgroundColor: backgroundColor,
        borderColor: borderColor,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allows the chart to adjust based on container's size
    plugins: {
      legend: {
        labels: {
          color: darkMode ? '#fff' : '#000', // Adjust legend text color
        },
        position: 'top',
      },
      title: {
        display: true,
        text: 'Your Prediction Accuracy Over Time',
        color: darkMode ? '#fff' : '#000', // Adjust title text color
      },
      tooltip: {
        bodyColor: darkMode ? '#fff' : '#000', // Adjust tooltip text color
        titleColor: darkMode ? '#fff' : '#000', // Adjust tooltip title color
        backgroundColor: darkMode ? '#333' : '#fff', // Adjust tooltip background
        borderColor: darkMode ? '#555' : '#ccc', // Adjust tooltip border
        borderWidth: 1,
      },
    },
    scales: {
      x: {
        ticks: {
          color: darkMode ? '#fff' : '#000', // Adjust x-axis labels color
        },
        grid: {
          color: darkMode ? '#444' : '#e2e8f0', // Adjust x-axis grid lines color
        },
      },
      y: {
        beginAtZero: true,
        max: 100, // Assuming accuracy is a percentage
        ticks: {
          color: darkMode ? '#fff' : '#000', // Adjust y-axis labels color
        },
        grid: {
          color: darkMode ? '#444' : '#e2e8f0', // Adjust y-axis grid lines color
        },
      },
    },
  };

  return (
    <div
      className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md h-96`}
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Analytics</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default Analytics;
