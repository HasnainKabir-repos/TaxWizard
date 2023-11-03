const app  = require('./app');
require('dotenv').config({ path: ".env"});

const {connectToDatabase, disconnectToDatabase} = require('./config/database');

const port = process.env.PORT;
const server = app.listen(port, () => console.log(`Listening on port ${port}`));

connectToDatabase(process.env.MONGO_URI);

const closeServer = () => {
    disconnectToDatabase();
    server.close();
};
module.exports = {server, closeServer};