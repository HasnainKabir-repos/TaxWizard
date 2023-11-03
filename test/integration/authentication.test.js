const chai = require('chai');
const app = require('../../app'); 
const expect = chai.expect;
const mongoose =require('mongoose');
const supertest = require('supertest');
describe('Authentication API Endpoints', () => {
  before(() =>{
   mongoose.connect(process.env.MONGO_URI);
  });
  after((done) => {
    if(mongoose.connection.readyState === 1)
    mongoose.connection.close();
    done();
  });
  it('should login an existing user', () => {
    
      supertest(app)
      .post('/api/auth/login')
      .send({
        Email: 'mamunur@iut-dhaka.edu', // Use the username created in the previous test case
        Password: 'Mamunur1234@',
      }).expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        
      });
  });

});

