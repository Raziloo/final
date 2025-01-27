// src/components/Layout.js

import React, { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add('transition-bg');
    setTimeout(() => root.classList.remove('transition-bg'), 10000); // Duration of the animation
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-100 via-purple-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative transition-colors duration-500 ease-in-out">
      {/* Background animations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Animated Shape 1 */}
        <div className="absolute top-16 left-16 w-36 h-36 sm:w-48 sm:h-48 md:w-64 md:h-64 rounded-full opacity-30 animate-pulse bg-blue-400 dark:bg-blue-700 transition-colors duration-500"></div>

        {/* Animated Shape 2 */}
        <div className="absolute bottom-16 right-16 w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full opacity-40 animate-spin-slow bg-purple-400 dark:bg-purple-700 transition-colors duration-500"></div>

        {/* Animated Shape 3 */}
        <div className="absolute bottom-20 left-10 w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-lg opacity-25 animate-ping bg-pink-400 dark:bg-pink-700 transition-colors duration-500"></div>

        {/* Animated Shape 4 */}
        <div className="absolute top-1/3 right-1/3 w-36 h-36 sm:w-44 sm:h-44 md:w-60 md:h-60 rounded-lg opacity-30 animate-bounce bg-green-400 dark:bg-green-700 transition-colors duration-500"></div>

        {/* Animated Shape 5 */}
        <div className="absolute top-1/4 right-10 w-28 h-28 sm:w-40 sm:h-40 md:w-52 md:h-52 rounded-full opacity-30 animate-pulse bg-yellow-400 dark:bg-yellow-700 transition-colors duration-500"></div>
      </div>

      {/* Main content */}
      <Navbar />
      <main className="flex-grow relative z-10">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;