import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useSelector } from "react-redux"; // Import Redux hook

const Home = () => {
  // Fetch authentication status from Redux store
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-gray-900 dark:text-white p-6">
      {/* Content */}
      <motion.div
        className="relative text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <h1 className="text-5xl font-bold mb-6 text-gray-800 dark:text-gray-100">
          Welcome to AI Stock Assistant
        </h1>
        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our AI-powered platform delivers accurate buy and sell recommendations
          for stocks, leveraging cutting-edge technology and real-time data.
          Maximize your investment potential with ease.
        </p>

        {/* Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-lg flex flex-col items-center text-center transition-transform duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-5xl">{feature.icon}</div>
              <h2 className="text-xl font-bold mt-4 text-gray-800 dark:text-white">
                {feature.title}
              </h2>
              <p className="text-gray-700 dark:text-gray-400 mt-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-10 space-x-4 flex justify-center">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-transform duration-300 hover:scale-105"
              >
                Profile
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-8 py-3 bg-green-600 text-white rounded-lg shadow-lg text-lg font-semibold hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-transform duration-300 hover:scale-105"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const features = [
  {
    icon: "📈",
    title: "AI-Powered Predictions",
    description:
      "Our AI models analyze market trends and generate trade recommendations.",
  },
  {
    icon: "📊",
    title: "Real-Time Data",
    description:
      "Stay updated with the latest stock prices, trends, and fundamental reports.",
  },
  {
    icon: "⚡",
    title: "Smart Alerts",
    description: "Get instant alerts for trade opportunities and risk signals.",
  },
];

export default Home;