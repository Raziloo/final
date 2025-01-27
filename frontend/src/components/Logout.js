import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LuLogOut } from "react-icons/lu";


const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <LuLogOut 
      onClick={handleLogout} 
      className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white cursor-pointer text-lg mx-3" 
      title="Logout"
    />
  );
};

export default Logout;
