import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const MarketSentiment = ({ ticker }) => {
  const [sentiment, setSentiment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!ticker) return;

    const fetchSentiment = async () => {
      setLoading(true);
      setError("");
      try {
        // Mock API Call for Now (Replace with real API later)
        const mockSentiment = Math.random() * 100; // Random sentiment score (0-100)
        setSentiment(mockSentiment);
      } catch (err) {
        setError("Failed to fetch sentiment data.");
      } finally {
        setLoading(false);
      }
    };

    fetchSentiment();
  }, [ticker]);

  return (
    <motion.div
      className="bg-gray-100 dark:bg-white/10 p-6 rounded-md shadow-lg text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Market Sentiment</h2>
      
      {loading ? (
        <p className="text-gray-500">Loading sentiment...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : sentiment !== null ? (
        <div className="mt-4">
          <p className="text-lg font-semibold">
            Sentiment Score: 
            <span className={`ml-2 ${sentiment > 50 ? "text-green-600" : "text-red-600"}`}>
              {sentiment.toFixed(2)}%
            </span>
          </p>

          {/* Sentiment Bar */}
          <div className="w-full bg-gray-300 rounded-full h-4 mt-3 relative">
            <motion.div
              className={`h-full rounded-full ${
                sentiment > 50 ? "bg-green-500" : "bg-red-500"
              }`}
              initial={{ width: 0 }}
              animate={{ width: `${sentiment}%` }}
              transition={{ duration: 1 }}
              style={{ width: `${sentiment}%` }}
            ></motion.div>
          </div>

          <p className="text-gray-500 text-sm mt-2">
            {sentiment > 50 ? "🟢 Positive sentiment" : "🔴 Negative sentiment"}
          </p>
        </div>
      ) : (
        <p className="text-gray-500">No sentiment data available.</p>
      )}
    </motion.div>
  );
};

export default MarketSentiment;