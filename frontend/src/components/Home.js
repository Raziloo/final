// src/pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-gray-100">
      <h1 className="text-5xl font-bold mb-4">Welcome to YourApp</h1>
      <p className="text-lg text-gray-700 mb-8">YourApp helps you manage your tasks efficiently.</p>
      <div className="space-x-4">
        <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Login
        </Link>
        <Link to="/register" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
          Register
        </Link>
      </div>
    </div>
  );
};

export default Home;
