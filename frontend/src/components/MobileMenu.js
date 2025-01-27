// src/components/MobileMenu.js

import React from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaSignInAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import Logout from "./Logout";

const MobileMenu = ({ isMenuOpen, toggleMenu }) => {
  const { isAuthenticated } = useAuth();

  return (
    <div
      className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 shadow-lg transform ${
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-500 z-40`}
    >
      <button
        onClick={toggleMenu}
        className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none"
      >
        <FaTimes size={24} />
      </button>
      <div className="flex flex-col space-y-4 mt-12 px-4">
        <Link
          to="/dashboard"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-md text-lg font-medium"
        >
          Dashboard
        </Link>
        <Link
          to="/profile"
          onClick={toggleMenu}
          className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-md text-lg font-medium"
        >
          Profile
        </Link>
        {isAuthenticated ? (
          <Logout />
        ) : (
          <Link
            to="/login"
            onClick={toggleMenu}
            className="flex items-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-4 py-2 rounded-md text-lg font-medium"
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