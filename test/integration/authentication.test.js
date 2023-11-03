const chai = require('chai');
const app = require('../../app'); 
const expect = chai.expect;
const mongoose =require('mongoose');
const supertest = require('supertest');
describe('Authentication API Endpoints', () => {
  before((done) =>{
    mongoose.connect(process.env.MONGO_URI);
    done();
  });
  // it('should register a new user', () => {
    
  //     supertest(app)
  //     .post('/api/auth/signup')
  //     .send({
  //       Name: "Test",
  //       Email: 'newuser@gmail.com',
  //       DateOfBirth: "1985-05-15T00:00:00.000Z",
  //       Password: 'Password123@',
  //     }).expect(200)
  //     .end((err, res) => {

  //       expect(res.body).to.have.property('message', 'User registered successfully');
        
  //     });
  // });

  it('should login an existing user', () => {
    
      supertest(app)
      .post('/api/auth/login')
      .send({
        Email: 'newuser@gmail.com', // Use the username created in the previous test case
        Password: 'Password123@',
      }).expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('token');
        
      });
  });

  it('should log out a user', () => {
    
      supertest(app)
      .get('/api/auth/logout')
      .expect(200)
      .end((err, res) => {
        expect(res.body).to.have.property('message', 'Logged out successfully');
        
      });
  });
});

