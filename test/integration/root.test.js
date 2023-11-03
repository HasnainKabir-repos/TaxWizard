const supertest = require('supertest');
const { closeServer} = require('../../server');
const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;
const mongoose = require("mongoose");
const { connectToDatabase, disconnectToDatabase } = require('../../config/database');
require('dotenv').config();
describe('Testing root of project', () =>{
    beforeAll(async() => {
        try{  
            // if (server) {
            //     await server.close();
            //   }
            // server = app.listen(0, () => {
            //     const port = server.address().port;
            //     console.log(`Listening on port ${port}`);
            //   });
              
            await Promise.all(mongoose.connections.map(con => con.close()));
          await connectToDatabase(process.env.MONGO_URI);
    
        }catch(error){
          console.log(error);
        }
          
      }, 25000);
      afterAll(async() => {
        try{
          await disconnectToDatabase();
          //await server.close();
        }catch(error){
          console.log(error);
        }
    }, 5000);
    test("should return a 200 status code" , (done) => {
        supertest(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if(err)
            console.log(err);
            done();
        });
    });
    test("should return a TaxWizard root test response", (done) => {
        supertest(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if (err) console.log(err);

            expect(res.body.message).to.equal("TaxWizard");
            done();
        });
    });
});