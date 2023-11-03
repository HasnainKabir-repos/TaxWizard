// Import required modules
const jwt = require('jsonwebtoken');

function checkLoggedIn(req, res, next) {
  const token = req.body.token; 

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: User not logged in' });
  }

  jwt.verify(token, process.env.JWTPRIVATEKEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    req.user = decoded; 
    console.log(decoded);
    next();
  });
}

module.exports = checkLoggedIn;
