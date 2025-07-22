import React, { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import InvoiceForm from "./components/InvoiceForm";
import SavedInvoices from "./components/SavedInvoices.js";
import RegisterForm from "./components/RegisterForm.js";
import LogoutButton from "./components/LogoutButton.js";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("authToken"));

  // Set login if token exists (persists after page reload)
  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("authToken"));
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token); // Store the JWT
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  return (
    <div>
      <h1>Invoice Generator</h1>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn
                ? <Navigate to="/invoice" />
                : <LoginForm onLogin={handleLoginSuccess} />
            }
          />
          <Route
            path="/invoice"
            element={
              isLoggedIn ? (
                <>
                  <InvoiceForm />
                  <SavedInvoices />
                  <LogoutButton onLogout={handleLogout} />
                </>
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
