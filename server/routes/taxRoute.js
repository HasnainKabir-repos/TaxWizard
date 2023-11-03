const express = require("express");
const router = express.Router();

router.post("/calculateTax", async (req, res) => {
  try {
    const { income, gender, location } = req.body;

    if (typeof income !== "number" || income < 0) {
      return res.status(400).json({
        error: "Invalid income provided. Income must be a non-negative number.",
      });
    }

    const validGenders = ["male", "female", "senior"];
    if (!validGenders.includes(gender)) {
      return res.status(400).json({
        error: "Invalid gender provided. Gender must be 'male', 'female', or 'senior'.",
      });
    }

    const validLocations = ["Dhaka", "Chattogram", "OtherCity", "NonCity"];
    if (!validLocations.includes(location)) {
      return res.status(400).json({
        error: "Invalid location provided. Location must be 'Dhaka', 'Chattogram', 'OtherCity', or 'NonCity'.",
      });
    }

    
    let taxFreeIncome = (gender === "female" || gender === "senior") ? 400000 : 350000;
    
    let taxableIncome = Math.max(0, income - taxFreeIncome);
   
    let tax = 0;

    if (taxableIncome > 0) {
      const taxRates = [
        { threshold: 100000, rate: 0.05 },
        { threshold: 300000, rate: 0.1 },
        { threshold: 400000, rate: 0.15 },
        { threshold: 500000, rate: 0.2 },
        { threshold: Infinity, rate: 0.25 },
      ];

      let remainingIncome = taxableIncome;

      for (let { threshold, rate } of taxRates) {
        let incomeInSlab = Math.min(remainingIncome, threshold);
        tax += incomeInSlab * rate;
        remainingIncome -= incomeInSlab;
        if (remainingIncome <= 0) break;
      }

      let minimumTax = location === "Dhaka" || location === "Chattogram" ? 5000 :
        location === "OtherCity" ? 4000 : 3000;
      tax = Math.max(tax, minimumTax);
    }

    // Respond with the calculated tax
    res.json({
      message: "Tax calculated successfully.",
      taxAmount: tax,
      taxableIncome: taxableIncome,
    });

  } catch (error) {
    console.error("Server error on /calculateTax:", error);
    res.status(500).json({ error: "An error occurred while calculating the tax." });
  }
});

module.exports = router;
