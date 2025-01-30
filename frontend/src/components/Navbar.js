// src/components/Navbar.js

import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { FaBars, FaMoon, FaSignInAlt, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import MobileMenu from "./MobileMenu";
import Logout from "../components/Logout";

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <>
      <nav className="bg-white dark:bg-gray-800 shadow-sm fixed top-0 left-0 w-full z-50 transition-colors duration-500 h-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex justify-between items-center h-full">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Link
                to="/"
                className="text-3xl font-bold text-blue-600 dark:text-blue-400 transition-transform duration-300 hover:scale-105"
              >
                TradeSenseAI
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden sm:flex items-center space-x-6">
              <Link
                to="/dashboard"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-2 py-1 rounded-md text-sm font-medium"
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-2 py-1 rounded-md text-sm font-medium"
              >
                Profile
              </Link>
              <Link
                to="/ourmodel"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-2 py-1 rounded-md text-sm font-medium"
              >
                Our Model
              </Link>
              <Link
                to="/about"
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-2 py-1 rounded-md text-sm font-medium"
              >
                About Us
              </Link>
              {isAuthenticated ? (
                <Logout />
              ) : (
                <Link
                  to="/login"
                  className="flex items-center text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white px-2 py-1 rounded-md text-sm font-medium"
                >
                  <FaSignInAlt className="mr-2" />
                  Login
                </Link>
              )}
              {/* Dark Mode Toggle */}
              <div
                onClick={toggleDarkMode}
                className={`w-14 h-7 flex items-center rounded-full cursor-pointer ${
                  darkMode ? "bg-gray-700" : "bg-gray-300"
                } p-1 transition-all duration-300`}
              >
                <div
                  className={`w-6 h-6 flex items-center justify-center bg-white rounded-full shadow-md transform ${
                    darkMode ? "translate-x-7" : "translate-x-0"
                  } transition-transform duration-300`}
                >
                  {darkMode ? (
                    <FaMoon className="text-gray-700" />
                  ) : (
                    <FaSun className="text-yellow-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="sm:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white focus:outline-none"
              >
                <FaBars size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      </nav>

      {/* Push Content Down to Avoid Overlap */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;