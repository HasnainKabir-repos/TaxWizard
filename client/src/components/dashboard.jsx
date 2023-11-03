import React, { useState } from 'react';
import Header from './Header';

// const gridContainerStyle = {
//   display: 'grid',
//   gridTemplateColumns: '1fr 1fr',
//   gap: '20px',
//   maxWidth: '1200px',
//   margin: 'auto',
//   padding: '15px',
// };

  
const gridContainerStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr', // Two columns of equal width
    gap: '20px',
    maxWidth: '1200px',
    width: '100%', // Added width property
    margin: 'auto',
    padding: '15px',
  };
  
  const pageWrapperStyle = {
    display: 'grid', // Two columns taking up the whole page
    width: '100vw', // Make it take the full width of the viewport
    height: '100vh', // Make it take the full height of the viewport
    margin: '0', // Remove any margin
    background: '#7CABA1', // Background color
  };
  

const columnStyle = {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
  background: '#7CABA1', // Background colo
};

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ddd',
  borderRadius: '4px',
  width: '100%',
  marginBottom: '15px',
};

const selectStyle = {
  ...inputStyle,
  height: '40px',
};

const incomeInputStyle = {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    width: '96%',
    marginBottom: '15px',
  };
  const h1Style = {
    color: 'white', // Text color
    transition: 'color 0.3s ease-in-out', // Add a color transition
  };

const buttonStyle = {
    padding: '8px 16px', // Adjusted padding
    fontSize: '1.1rem', // Slightly larger font size
    color: 'white',
    backgroundColor: '#0A7B79', // Button color
    border: '2px solid white', // White border
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  };

const taxListStyle = {
  ...columnStyle,
  maxHeight: '300px',
  overflowY: 'auto',
};

const TaxDashboard = () => {
  const [income, setIncome] = useState('');
  const [gender, setGender] = useState('');
  const [calculatedTax, setCalculatedTax] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const calculateTax = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:9000/api/calculateTax', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          income: parseFloat(income),
          gender,
          location: selectedLocation,
        }),
        
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setCalculatedTax(data.tax);
    } catch (error) {
      console.error('There was an error calculating the tax:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div>
        <Header/>
    <div style={pageWrapperStyle}>
    <div style={gridContainerStyle}>
      <div style={columnStyle}>
        <h1>Tax Calculator</h1>
        <form onSubmit={calculateTax}>
          <div>
            <label htmlFor="income">Income:</label>
            <input
              type="number"
              id="income"
              placeholder="Enter your income"
              style={incomeInputStyle}
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              style={selectStyle}
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="">Select Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <select
              id="location"
              style={selectStyle}
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              <option value="Barishal">Barishal</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Dhaka">Dhaka</option>
              <option value="Khulna">Khulna</option>
              <option value="Rajshahi">Rajshahi</option>
              <option value="Rangpur">Rangpur</option>
              <option value="Mymensingh">Mymensingh</option>
              <option value="Sylhet">Sylhet</option>
            </select>
          </div>
          <button type="submit" style={buttonStyle}>
            Calculate Tax
          </button>
        </form>
        {calculatedTax !== null && (
          <h2>Calculated Tax: BDT {calculatedTax.toFixed(2)}</h2>
        )}
      </div>
      <div style={taxListStyle}>
        <h3 style={h1Style}>Calculated Taxes by Year</h3>
        {/* <ul>
          {taxRecords.map((record, index) => (
            <li key={index}>
              Year: {record.year}, Tax: ${record.tax.toFixed(2)}, Location: {record.location}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
</div>
</div>
  );
};

export default TaxDashboard;
