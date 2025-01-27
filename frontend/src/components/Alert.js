import React from 'react';
import { useSelector } from 'react-redux';

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    alerts !== null &&
    alerts.length > 0 &&
    alerts.map((alert) => (
      <div
        key={alert.id}
        className={`fixed top-4 right-4 px-4 py-2 rounded-md shadow-lg ${
          alert.alertType === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}
      >
        {alert.msg}
      </div>
    ))
  );
};

export default Alert;
