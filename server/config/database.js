const mongoose = require('mongoose');

const connectToDatabase = (MONGO_URI) => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    try{
        mongoose.connect(MONGO_URI, connectionParams);
        console.log('Connected to database')
    }
    catch(error){
        console.log(error);
        console.log('Error connecting to database');
    }   
};

module.exports = connectToDatabase;