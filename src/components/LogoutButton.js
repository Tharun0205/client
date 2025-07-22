import React from 'react';
import './LogoutButton.css';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Just remove the token
    localStorage.removeItem('authToken');
    onLogout();          // update App.js state
    navigate('/');       // redirect to login
  };

  return (
    <button className="logoutButton" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
