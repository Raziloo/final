// src/components/PredictionForm.js

import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { useDispatch } from 'react-redux';
import { setAlert } from '../actions/alert';

const PredictionForm = () => {
  const { auth } = useContext(AuthContext);
  const dispatch = useDispatch();

  const [ticker, setTicker] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!ticker) {
      dispatch(setAlert('Please enter a stock ticker', 'danger'));
      return;
    }
    setLoading(true);
    setPrediction(null);
    try {
      const res = await axios.post(
        '/api/predict',
        { ticker },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setPrediction(res.data.prediction);
      dispatch(setAlert('Prediction successful', 'success'));
    } catch (err) {
      console.error(err.response);
      const errorMsg = err.response?.data?.msg || 'Prediction failed';
      dispatch(setAlert(errorMsg, 'danger'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Get Stock Prediction</h2>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row sm:items-center">
        <input
          type="text"
          name="ticker"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter Stock Ticker (e.g., AAPL)"
          className="w-full sm:w-auto px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 sm:mb-0 sm:mr-4"
          required
        />
        <button
          type="submit"
          className={`w-full sm:w-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200 flex items-center justify-center ${
            loading ? 'cursor-not-allowed opacity-50' : ''
          }`}
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin h-5 w-5 mr-3 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
              Predicting...
            </>
          ) : (
            'Predict'
          )}
        </button>
      </form>
      {prediction && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded">
          <h3 className="text-lg font-semibold text-blue-700">Prediction Result:</h3>
          <p className="text-gray-700">{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;
