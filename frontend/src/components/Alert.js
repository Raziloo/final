import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeAlert } from '../actions/alert'; // Adjust based on your actual action file

const Alert = () => {
  const alerts = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  const handleClose = (id) => {
    dispatch(removeAlert(id));
  };

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className={`fixed bottom-4 left-4 px-4 py-2 rounded-md shadow-lg z-50 animate-alert ${
          alert.alertType === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        } flex items-center justify-between`}
        style={{
          maxWidth: '300px', // Ensure the alert has a manageable size
        }}
      >
        <span>{alert.msg}</span>
        <button
          onClick={() => handleClose(alert.id)}
          className="ml-4 text-white hover:text-gray-300 focus:outline-none"
          aria-label="Close alert"
        >
          ✕
        </button>
      </div>
    ))
  );
};

export default Alert;