// src/components/Footer.js

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow mt-auto dark:bg-gray-800">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <p className="text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} YourApp. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;