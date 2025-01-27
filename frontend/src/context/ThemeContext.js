// src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

// Create Context
export const ThemeContext = createContext();

// Create Provider
const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme !== null) {
      return JSON.parse(savedTheme);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  useEffect(() => {
    const root = window.document.documentElement;

    // Add the transition class for smooth animation
    root.classList.add('theme-transition');
    setTimeout(() => root.classList.remove('theme-transition'), 1500); // Duration of the transition

    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;