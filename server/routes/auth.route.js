const router = require('express').Router();
const {signupUser, loginUser} = require('../controller/authentication.controller');


router.post('/signup', signupUser);
router.post('/login',loginUser);

module.exports = router;