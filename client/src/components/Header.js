// Header.jsx
import React from 'react';
import './Header.css'; 

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        {/* Logo or Brand Name */}
        TaxWizard
      </div>
      <nav className="navbar">
        <a href="/dashboard">Dashboard</a>
        <a href="/about">About</a>
        <a href="/profile">Profile</a>
        <a href="/">Logout</a>
      </nav>
    </header>
  );
};

export default Header;
