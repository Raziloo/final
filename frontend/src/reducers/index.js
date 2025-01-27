// frontend/src/reducers/index.js

import { combineReducers } from 'redux';
import authReducer from './authReducer';
import alert from './alert';
// Import other reducers

export default combineReducers({
  auth: authReducer, alert
  // Add other reducers here
});
