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
        Email: 'mamunur@iut-dhaka.edu', 
        Password: 'Mamunur1234@',
      }).expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('data');
        
      });
  });
  it('should not login an invalid user', () => {
    
    supertest(app)
    .post('/api/auth/login')
    .send({
      Email: 'mamunur@iut-dhaka.edu', 
      Password: 'invalidPassword',
    }).expect(400)
    .end((err, res) => {
      
    });
});

});

