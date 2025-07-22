import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './RegisterForm.css';

const RegisterForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'https://invoice-backend-ql8a.onrender.com/api/auth/register',
        {
          username,
          email,
          password
        }
      );
      setSuccess(true);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log("Error occured", err);
    }
  };

  return (
    <div className="registerContainer">
      <form onSubmit={registerUser} className="signupForm">
        <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Set password" onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {success && (
        <div className="dialogBox">
          Registered Sucessfully! Redirecting to Login page...
        </div>
      )}
    </div>
  );
}
export default RegisterForm;
