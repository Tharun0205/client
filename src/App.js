import React, {useState} from "react";
import LoginForm from "./components/LoginForm";
import InvoiceForm from "./components/InvoiceForm";
import SavedInvoices from "./components/SavedInvoices.js";
import RegisterForm from "./components/RegisterForm.js";
import LogoutButton from "./components/LogoutButton.js";
import axios from "axios";
import { BrowserRouter as Router,Routes,Route,Navigate } from "react-router-dom";
function App(){
  const [isLoggedIn,setIsLoggedIn]=React.useState(false);
  const handleLoginSuccess=()=>{
    setIsLoggedIn(true);
  }
  const handleLogout=()=>{
    setIsLoggedIn(false);
  }
  return(
    <div>
      <h1>Invoice Generator</h1>
    
   <Router>
    <Routes>
      <Route
      path="/"
      element={isLoggedIn ? <Navigate to="/invoice"/>:<LoginForm onLogin={handleLoginSuccess}></LoginForm>}
      ></Route>
      <Route
      path="/invoice"
      element={isLoggedIn?(
        <>
      <InvoiceForm/>
      <SavedInvoices/>
      <LogoutButton onLogout={handleLogout}/>
      </>
    ):<Navigate to="/"></Navigate>}
      />
      <Route path="/register" element={<RegisterForm/>}></Route>
    </Routes>
   </Router>


    </div>
  )
}
export default App;