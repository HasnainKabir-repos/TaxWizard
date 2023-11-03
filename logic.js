const express = require("express");

const app = express();

app.use(cors({
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));

app.use(express.json());

app.post("/calculateTax", (req, res) => {
  try {
    const { income, gender, location } = req.body;

    
    if (typeof income !== 'number' || income < 0) {
      return res.status(400).json({ error: "Invalid income provided. Income must be a non-negative number." });
    }

   
    const validGenders = ['male', 'female', 'senior'];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({ error: "Invalid gender provided. Gender must be 'male', 'female', or 'senior'." });
    }

  
    const validLocations = ['Dhaka', 'Chattogram', 'OtherCity', 'NonCity'];
    if (!validLocations.includes(location)) {
      return res.status(400).json({ error: "Invalid location provided. Location must be 'Dhaka', 'Chattogram', 'OtherCity', or 'NonCity'." });
    }

  
    let taxFreeIncome = gender === "female" || gender === "senior" ? 400000 : 350000;

   
    let taxableIncome = Math.max(0, income - taxFreeIncome);
    
   
    if (taxableIncome === 0) {
      return res.json({ taxableIncome, tax: 0 });
    }

    let tax = 0;
    let remainingIncome = taxableIncome;


    const taxRates = [
      { threshold: 100000, rate: 0.05 },
      { threshold: 300000, rate: 0.1 },
      { threshold: 400000, rate: 0.15 },
      { threshold: 500000, rate: 0.2 },
      { threshold: Infinity, rate: 0.25 },
    ];

  
    taxRates.forEach((slab, index) => {
      if (remainingIncome > 0) {
        let incomeInSlab = remainingIncome - (index === 0 ? 0 : taxRates[index - 1].threshold);
        incomeInSlab = Math.max(incomeInSlab, 0); 
        if (incomeInSlab > 0) {
          tax += incomeInSlab * slab.rate;
        }
        remainingIncome -= slab.threshold;
      }
    });

 
    let minimumTax = location === "Dhaka" || location === "Chattogram" ? 5000 : location === "OtherCity" ? 4000 : 3000;
    tax = Math.max(tax, minimumTax);

 
    res.json({ taxableIncome, tax });

  } catch (error) {
    console.error('Server error on /calculateTax:', error);
    res.status(500).json({ error: "An error occurred while calculating the tax." });
  }
});

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
