import React, { useState } from "react";
import './LoginForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://invoice-backend-ql8a.onrender.com/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      // 💾 Store token securely for authenticated API requests
      localStorage.setItem('authToken', response.data.token);

      onLogin();
      navigate('/invoice');
    } catch (err) {
      alert("Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="loginFormContainer">
      <form onSubmit={handleLogin} className="loginForm">
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
        <Link to="/register" className="signupButton">Don't have an account? Signup</Link>
      </form>
    </div>
  );
};

export default LoginForm;
