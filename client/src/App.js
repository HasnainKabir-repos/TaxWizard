import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";

import Login from "../src/components/login.jsx";
import Signup from "../src/components/signup.jsx";
import TaxDashboard from "./components/dashboard.jsx";
import About from "../src/components/About.js";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<TaxDashboard/>} />
      </Routes>
      <Routes>
        <Route path="/about" element={<About/>} />
      </Routes> 
    
    </Router>
    


    );
}

export default App;