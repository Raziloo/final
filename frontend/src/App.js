// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Layout from './components/Layout'; // Layout wraps content
import Logout from './components/Logout';

function App() {
  return (
    <Router>
      {/* Include the Alert component */}
      <Alert />
      {/* Wrap everything with Layout to apply background */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* Add other routes here */}
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;