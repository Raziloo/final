import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import setAuthToken from '../utils/setAuthToken'; // Utility to set token in Axios headers
import { useDispatch } from 'react-redux';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';
import { setAlert } from '../actions/alert';
import api from '../utils/api';

// Create Context
export const AuthContext = createContext();

// Helper hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Provider Component
const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();

  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');

    if (token) {
      return {
        token,
        isAuthenticated: true,
        loading: false,
        user: null,
      };
    }

    return {
      token: null,
      isAuthenticated: false,
      loading: true,
      user: null,
    };
  });

  // Load user on initial render
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        setAuthToken(token);

        try {
          // const res = await api.get('/auth/user');
          setAuth({
            token,
            isAuthenticated: true,
            loading: false,
            // user: res.data,
          });
        } catch (err) {
          console.error(err);
          localStorage.removeItem('token');
          setAuth({
            token: null,
            isAuthenticated: false,
            loading: false,
            user: null,
          });
        }
      } else {
        setAuth((prevAuth) => ({
          ...prevAuth,
          loading: false,
        }));
      }
    };

    loadUser();
  }, []);

  // Login function
  const login = async (formData) => {
    try {
      const res = await api.post('/auth/login', formData);
      const { token } = res.data;
  
      // Set token in localStorage and headers
      localStorage.setItem('token', token);
      setAuthToken(token);
  
      // Update auth state
      setAuth({
        token,
        isAuthenticated: true,
        loading: false,
        user: res.data.user, // Assuming your backend sends user details in `res.data.user`
      });
  
      // Dispatch success action
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      console.error(err);
  
      // Extract error message if available
      const errorMessage =
        err.response && err.response.data && err.response.data.message
          ? err.response.data.message
          : 'Login failed. Please try again.';
  
      // Update auth state to reflect failure
      setAuth({
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
      });
  
      // Clear token from localStorage
      localStorage.removeItem('token');
  
      // Dispatch failure action
      dispatch({ type: LOGIN_FAIL });
  
      // Set an alert for the user with the error message
      dispatch(setAlert(errorMessage, 'danger'));
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setAuth({
      token: null,
      isAuthenticated: false,
      loading: false,
      user: null,
    });
    dispatch({ type: LOGOUT });
    dispatch(setAlert('Logged out successfully', 'success'));
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;