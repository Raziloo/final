// src/components/OurModel.js

import React from "react";
import { motion } from "framer-motion";

const OurModel = () => {
  return (
    <div className="min-h-screen text-gray-900 dark:text-white flex flex-col justify-center items-center p-6">
      {/* Title Animation */}
      <motion.h1
        className="text-4xl md:text-6xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        How Our AI Model Works
      </motion.h1>

      {/* Subtitle Animation */}
      <motion.p
        className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl text-center mb-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        Our AI-powered stock prediction model analyzes market trends, historical data, and real-time news to provide the most accurate buy/sell recommendations. 📈💡
      </motion.p>

      {/* Sections - Model Explanation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {modelSteps.map((step, index) => (
          <motion.div
            key={index}
            className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <div className="text-6xl mb-4">{step.icon}</div>
            <h2 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
              {step.title}
            </h2>
            <p className="text-gray-700 dark:text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Power Statement */}
      <motion.div
        className="mt-12 p-6 bg-blue-600 text-white text-center rounded-lg shadow-lg max-w-2xl"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
      >
        <h2 className="text-3xl font-bold">AI-Powered Market Insights ⚡</h2>
        <p className="mt-2 text-lg">
          Our deep learning model continuously improves by analyzing new data daily, making smarter predictions over time.
        </p>
      </motion.div>

      {/* Call to Action */}
      <motion.a
        href="/"
        className="mt-10 px-8 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-500 transition"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
      >
        Try Our AI Predictions
      </motion.a>
    </div>
  );
};

const modelSteps = [
  {
    icon: "📊",
    title: "Data Collection",
    description:
      "We gather stock prices, technical indicators, news sentiment, and earnings reports from reliable sources in real-time.",
  },
  {
    icon: "🧠",
    title: "AI & Machine Learning",
    description:
      "Our deep learning model uses LSTMs and transformers to identify hidden patterns in stock movements.",
  },
  {
    icon: "📈",
    title: "Buy & Sell Predictions",
    description:
      "Based on its training, the AI recommends whether to buy, sell, or hold, ensuring data-driven investment strategies.",
  },
];

export default OurModel;