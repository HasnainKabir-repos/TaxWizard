const express = require('express');
const app = express();
const authRoutes = require('./server/routes/auth.route');
require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const passport = require("passport");
require("./config/passport");
app.use(passport.initialize());

app.get('/', (req, res) => {
    res.status(200).json({message : "TaxWizard"});
});

app.use('/api/auth', authRoutes);

module.exports = app;