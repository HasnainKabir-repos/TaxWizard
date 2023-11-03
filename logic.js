const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

app.post('/calculateTax', (req, res) => {
  const { income, gender, location } = req.body;
  
  // Define tax thresholds and rates
  const taxRates = [
    { threshold: 100000, rate: 0.05 },
    { threshold: 300000, rate: 0.10 },
    { threshold: 400000, rate: 0.15 },
    { threshold: 500000, rate: 0.20 },
    { threshold: Infinity, rate: 0.25 }
  ];
  
  // Determine the tax-free income threshold
  let taxFreeIncome = 350000;
  if (gender === 'female' || gender === 'senior') {
    taxFreeIncome = 400000;
  }
  
  // Calculate the taxable income
  let taxableIncome = Math.max(0, income - taxFreeIncome);
  
  // Calculate the tax based on income slabs
  let tax = 0;
  let remainingIncome = taxableIncome;
  
  for (let i = 0; i < taxRates.length && remainingIncome > 0; i++) {
    let incomeInSlab = Math.min(remainingIncome, taxRates[i].threshold);
    tax += incomeInSlab * taxRates[i].rate;
    remainingIncome -= incomeInSlab;
  }
  
  // Apply minimum tax rule based on location
  let minimumTax = 0;
  switch (location) {
    case 'Dhaka':
    case 'Chattogram':
      minimumTax = 5000;
      break;
    case 'OtherCity':
      minimumTax = 4000;
      break;
    default:
      minimumTax = 3000;
  }
  
  tax = Math.max(tax, minimumTax);
  
  // Send the response
  res.json({ taxableIncome, tax });
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
