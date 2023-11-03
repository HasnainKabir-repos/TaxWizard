import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
 
} from "react-router-dom";

import Login from "../src/components/login.js";
import Signup from "/Users/shadmansakib/Desktop/TaxWizard/client/src/components/signup.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/signup" element={<Signup/>} />
      </Routes>
    </Router>
  );
}
export default App;