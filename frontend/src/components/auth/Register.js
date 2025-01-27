// src/components/auth/Register.js

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/api";
import { useDispatch } from "react-redux";
import { REGISTER_SUCCESS, REGISTER_FAIL } from "../../actions/types";
import { setAlert } from "../../actions/alert";
import setAuthToken from "../../utils/setAuthToken"; // Added import

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", formData);
      const { token } = res.data;
      setAuthToken(token); // Set the token upon registration
      dispatch({
        type: REGISTER_SUCCESS, // Corrected action type
        payload: res.data, // Assuming res.data contains the token and user info
      });
      navigate("/dashboard"); // Navigate to dashboard after registration
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL, // Corrected action type
      });
      // Dispatch alert actions if you have an alert system
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
      } else {
        // Handle other errors
        dispatch(setAlert("Server error", "danger"));
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
        Sign Up
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-6">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="relative">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={onChange}
            required
            className="w-full px-4 py-2 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform duration-300 focus:scale-105"
            placeholder="Enter your username"
          />
        </div>
        <div className="relative">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="email"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            required
            className="w-full px-4 py-2 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform duration-300 focus:scale-105"
            placeholder="Enter your email"
          />
          <small className="block text-gray-600 dark:text-gray-400 mt-2">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="relative">
          <label
            className="block text-gray-700 dark:text-gray-300 mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
            className="w-full px-4 py-2 text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform duration-300 focus:scale-105"
            placeholder="Enter your password"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-gray-600 dark:text-gray-300 mt-4">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default Register;
