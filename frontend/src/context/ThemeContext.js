// src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const ThemeContext = createContext();

// Create Provider
const ThemeProvider = ({ children }) => {
  // Initialize theme state based on localStorage or system preference
  const [darkMode, setDarkMode] = useState(() => {
    // Check if user has a saved preference
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    // If no saved preference, use system preference
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Update HTML class and localStorage whenever darkMode changes
  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // Save user preference to localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
