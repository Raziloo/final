// src/components/auth/Register.js

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../../utils/api';
import { useDispatch } from 'react-redux';
import { REGISTER_SUCCESS, REGISTER_FAIL } from '../../actions/types';
import { setAlert } from '../../actions/alert';
import setAuthToken from '../../utils/setAuthToken'; // Added import

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { username, email, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post('/auth/register', formData);
      const { token } = res.data;
      setAuthToken(token); // Set the token upon registration
      dispatch({
        type: REGISTER_SUCCESS, // Corrected action type
        payload: res.data, // Assuming res.data contains the token and user info
      });
      navigate('/dashboard'); // Navigate to dashboard after registration
    } catch (err) {
      dispatch({
        type: REGISTER_FAIL, // Corrected action type
      });
      // Dispatch alert actions if you have an alert system
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      } else {
        // Handle other errors
        dispatch(setAlert('Server error', 'danger'));
      }
    }
  };

  return (
    <div className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={onChange}
            required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            name="password"
            value={password}
            onChange={onChange}
            minLength="6"
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </div>
  );
};

export default Register;
