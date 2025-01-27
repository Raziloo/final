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
    <div 
    onClick={handleLogout} 
    className="flex items-center cursor-pointer hover:text-gray-700 dark:hover:text-white transition-colors duration-300"
    title="Logout"
  >
    <h1 className="mx-1">Logout</h1>
    <LuLogOut className="text-lg" />
  </div>
  );
};

export default Logout;
