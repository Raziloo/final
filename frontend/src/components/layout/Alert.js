// src/components/layout/Alert.js

import React from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

const Alert = () => {
  const alerts = useSelector((state) => state.alert);

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col space-y-4">
      <AnimatePresence>
        {alerts !== null &&
          alerts.length > 0 &&
          alerts.map((alert) => (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`flex items-center p-4 max-w-sm shadow-lg rounded-md text-white ${
                alert.alertType === "success"
                  ? "bg-green-500"
                  : alert.alertType === "error"
                  ? "bg-red-500"
                  : alert.alertType === "warning"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            >
              <div className="mr-3">
                {alert.alertType === "success" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
                {alert.alertType === "error" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
                {alert.alertType === "warning" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 16h.01M12 8v4m-4 4v1h8v-1"
                    />
                  </svg>
                )}
                {alert.alertType === "info" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M12 16h.01M12 8v4m-4 4v1h8v-1"
                    />
                  </svg>
                )}
              </div>
              <div className="text-sm font-medium">{alert.msg}</div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
};

export default Alert;