// About.js
import React from 'react';
import './About.css'; // Assuming you will create a separate CSS file for styling
import taxWizardImage from '../images/8745329.jpg'; // Replace with path to your image
import Header from './Header';

const About = () => {
  return (
    <div>
    <Header/>
    <div className="about-container">
      <div className="about-content">
        <h1>About TaxWizard</h1>
        <p>TaxWizard is your reliable partner in navigating the complexities of tax planning and compliance. Our user-friendly platform provides personalized tax solutions to ensure you make the most informed decisions for your financial health.</p>
        <p>With TaxWizard, you can calculate your taxes, manage your tax records, and stay up-to-date with the latest tax regulations, all in one convenient place. Our mission is to simplify the tax process and empower individuals and businesses alike to handle their taxes with confidence and ease.</p>
      </div>
      <div className="about-image">
        <img src={taxWizardImage} alt="TaxWizard" />
      </div>
    </div>
    </div>
  );
};

export default About;
