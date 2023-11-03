import React, { useState } from 'react';

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '20px',
  maxWidth: '1200px',
  margin: 'auto',
  padding: '15px',
};

const columnStyle = {
  border: '1px solid #ddd',
  borderRadius: '4px',
  padding: '20px',
  boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
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

const buttonStyle = {
  padding: '10px 15px',
  fontSize: '16px',
  color: 'white',
  backgroundColor: '#007bff',
  border: 'none',
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
  const [taxRecords, setTaxRecords] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const calculateTax = (event) => {
    event.preventDefault();
    // Placeholder for actual tax calculation logic
    const taxRate = 0.25; // Assume a flat tax rate for simplicity
    const tax = parseFloat(income) * taxRate;
    setCalculatedTax(tax);

    // Add the tax record to the list
    const newRecord = {
      year: new Date().getFullYear(),
      tax: tax,
      location: selectedLocation,
    };
    setTaxRecords([...taxRecords, newRecord]);
  };

  return (
    <div style={gridContainerStyle}>
      <div style={columnStyle}>
        <h1>Tax Calculation Dashboard</h1>
        <form onSubmit={calculateTax}>
          <div>
            <label htmlFor="income">Income:</label>
            <input
              type="number"
              id="income"
              placeholder="Enter your income"
              style={inputStyle}
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
          <h2>Calculated Tax: ${calculatedTax.toFixed(2)}</h2>
        )}
      </div>
      <div style={taxListStyle}>
        <h3>Calculated Taxes by Year</h3>
        <ul>
          {taxRecords.map((record, index) => (
            <li key={index}>
              Year: {record.year}, Tax: ${record.tax.toFixed(2)}, Location: {record.location}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaxDashboard;
