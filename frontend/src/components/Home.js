// src/pages/Home.js

import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {/* Background Animation */}
      

      {/* Content */}
      <div className="relative text-center">
        <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-gray-100">
          Welcome to AI Stock Assistant
        </h1>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-xl mx-auto">
          Our AI-powered platform delivers accurate buy and sell recommendations
          for stocks, leveraging cutting-edge technology and real-time data.
          Maximize your investment potential with ease.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-transform duration-300 hover:scale-105"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 transition-transform duration-300 hover:scale-105"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
