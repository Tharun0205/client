import React from 'react';
import axios from 'axios';
import './LogoutButton.css';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      onLogout();            // update state in App.js
      navigate('/');         // redirect to login
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return <button  className="logoutButton" onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
