const express = require('express');
const app = express();
const cors = require("cors");


require('body-parser');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const authRoutes = require('./server/routes/auth.route');
const taxRoutes = require('./server/routes/taxRoute.js');
app.use(cors({
    origin: ["http://localhost:3001","https://taxwizard-frontend.azurewebsites.net/", "http://localhost:3000"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }));
  

app.get('/', (req, res) => {
    res.status(200).json({message : "TaxWizard"});
});

app.use('/api/auth', authRoutes);
app.use(express.json())


app.use('/api', taxRoutes);


module.exports = app;