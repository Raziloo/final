// src/components/Login.js

import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAlert } from "../../actions/alert";

const Login = () => {
  const { isAuthenticated, login } = useAuth(); // Access isAuthenticated and login from AuthContext
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "niv@gmail.com",
    password: "123456",
  });

  const { email, password } = formData;

  // Handle input changes
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validate email format
  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Validate password strength
  const isValidPassword = (password) =>
    password.length >= 6;

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    // Validation checks
    if (!isValidEmail(email)) {
      dispatch(setAlert("Please enter a valid email address.", "danger"));
      return;
    }
    if (!isValidPassword(password)) {
      dispatch(setAlert("Password must be at least 6 characters long.", "danger"));
      return;
    }

    try {
      await login({ email, password });
      dispatch(setAlert("Logged in successfully!", "success"));
    } catch (error) {
      console.error(error);
      dispatch(setAlert("Invalid email or password.", "danger"));
    }
  };

  // Redirect to dashboard if authenticated
  if (isAuthenticated) {
    console.log("User is authenticated. Redirecting to dashboard...");
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Login
      </h2>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-transform duration-300 ease-in-out focus:scale-105"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={onChange}
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-transform duration-300 ease-in-out focus:scale-105"
            placeholder="Enter your password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;