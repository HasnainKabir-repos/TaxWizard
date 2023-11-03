import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
 
} from "react-router-dom";

import Login from "../src/components/login.jsx";
import Signup from "../src/components/signup.jsx";
import TaxDashboard from "./components/dashboard.jsx";
import About from "../src/components/About.js";


function App() {
  const user = localStorage.getItem("token");

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup/>} />
      
        {user && <Route path="/dashboard" element={<TaxDashboard/>} />}
        {user && <Route path="/about" element={<About/>} />}
        <Route path="/dashboard" element={<Navigate replace to="/" />} />
        <Route path="/about" element={<Navigate replace to="/" />}/>
      </Routes> 
      
    </Router>

    );
}

export default App;