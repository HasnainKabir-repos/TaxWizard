const express = require('express');
const app = express();
const authRoutes = require('./server/routes/auth.route');
require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.status(200).json({message : "TaxWizard"});
});

app.use('/api/auth', authRoutes);

module.exports = app;