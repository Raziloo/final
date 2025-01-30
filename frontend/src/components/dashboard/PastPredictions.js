import React from "react";
import { motion } from "framer-motion";

const PastPredictions = ({ pastPredictions, onSelectPrediction, range }) => {
  if (pastPredictions.length === 0) return null;

  return (
    <motion.div
            className="bg-gray-100 dark:bg-white/10 p-5 rounded-md shadow-md w-128 max-h-64 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white">Past Predictions</h2>
      <ul className="mt-4 space-y-2">
        {pastPredictions.map((pred, index) => (
          <motion.li
            key={index}
            className="bg-white dark:bg-gray-800 p-3 rounded-md shadow-md flex justify-between cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            onClick={() => onSelectPrediction(range, pred.ticker)}
          >
            <span className="font-semibold text-blue-600 dark:text-blue-300">
              {pred.ticker}
            </span>
            <span className="text-green-600 dark:text-green-400">${pred.predictedPrice}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm">{pred.date}</span>
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default PastPredictions;