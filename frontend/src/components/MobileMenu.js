// src/components/MobileMenu.js

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaSignInAlt, FaMoon, FaSun } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";
import { ThemeContext } from "../context/ThemeContext";

const MobileMenu = ({ isMenuOpen, toggleMenu }) => {
  const { isAuthenticated } = useAuth();
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-900 shadow-lg transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 z-50`}
    >
      {/* Close Button */}
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
      >
        <FaTimes size={24} />
      </button>

      {/* Menu Items */}
      <div className="flex flex-col space-y-6 mt-16 px-6 text-lg font-medium">
        <Link
          to="/dashboard"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Profile
        </Link>
        <Link
          to="/ourmodel"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          Our Model
        </Link>
        <Link
          to="/about"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition"
        >
          About Us
        </Link>

        {/* Light/Dark Mode Toggle */}
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

        {/* Authentication Section */}
        {isAuthenticated ? (
          <Logout />
        ) : (
          <Link
            to="/login"
            onClick={toggleMenu}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-green-500 dark:hover:text-green-400 transition"
          >
            <FaSignInAlt className="mr-2" />
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileMenu;
