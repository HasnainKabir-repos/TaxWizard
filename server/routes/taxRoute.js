const express = require("express");
const router = express.Router();
const Tax = require('../models/Tax.model'); 
const User = require('../models/User.model');
const checkLoggedIn = require('../middleware/isAuthenticated');

router.post("/calculateTax", checkLoggedIn, async (req, res) => {
  try {
    const { income, gender, location} = req.body;
    const { userinfo } = req.user;

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

    // Calculate tax-free income based on gender
    let taxFreeIncome = (gender === "female" || gender === "senior") ? 400000 : 350000;
    // Calculate taxable income
    let taxableIncome = Math.max(0, income - taxFreeIncome);
    // Initialize tax
    let tax = 0;

    // Check if the user exists
    const user = await User.findONe({Email: userinfo.Email});
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // If taxable income is more than 0, calculate the tax, else set tax to 0
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

    // Create a new tax record with the calculated values
    const taxRecord = new Tax({
      user: userId, // Linking the tax record to the user
      income,
      gender,
      location,
      taxFreeIncome,
      taxableIncome,
      tax // This is the calculated tax
    });

    // Save the tax record to the database
    await taxRecord.save();

    // Respond with the tax record and a success message
    res.json({
      message: "Tax data saved successfully.",
      taxData: taxRecord
    });

  } catch (error) {
    console.error("Server error on /calculateTax:", error);
    res.status(500).json({ error: "An error occurred while calculating the tax and saving the data." });
  }
});

module.exports = router;
