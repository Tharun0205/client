import React, { useState } from "react";
import './LoginForm.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RegisterForm from "./RegisterForm.js";
const LoginForm = ({onLogin}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate=useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://invoice-frontend-beta-neon.vercel.app/api/auth/login',
        { email, password },
        { withCredentials: true }
      );
      //alert("Login successful");
      onLogin();
      navigate('/invoice');
      
    } catch (err) {
      alert("Login failed");
    }
  };
  const enroute=()=>{
    navigate('/register');
  }

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