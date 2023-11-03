function validateIncome(income) {
    if (Number.isInteger(income) && Number.isFinite(income) && income >= 0) {
      return true; // Valid income
    }
    return false; // Invalid income
  };

module.exports = validateIncome;