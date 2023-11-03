const supertest = require("supertest");
const { closeServer } = require('../../server');
const app = require('../../app');
const { connectToDatabase, disconnectToDatabase } = require('../../config/database');
require('dotenv').config();
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Integration test authentication', () => {
  beforeAll(async () => {
    try {
      // if (server) {
      //   await server.close();
      // }
      // server = app.listen(0, () => {
      //   const port = server.address().port;
      //   console.log(`Listening on port ${port}`);
      // });
      
      await connectToDatabase(process.env.MONGO_URI);
    } catch (error) {
      console.log(error);
    }
  }, 25000);

  afterAll(async () => {
    try {
      //await server.close();
      await disconnectToDatabase();
    } catch (error) {
      console.log(error);
    }
  }, 10000);

  // test('should signup for a user', async () => {
  //   const data = {
  //     Name: "Test",
  //     Email: "Test@gmail.com",
  //     DateOfBirth: "1985-05-15T00:00:00.000Z",
  //     Password: "Testing123@"
  //   };

  //   const response = await supertest(app)
  //     .post('/api/auth/signup')
  //     .send(data)
  //     .expect(201);

  // }, 10000);

  test('should handle existing user during signup', async () => {
    const data = {
      Name: "Test",
      Email: "Test@gmail.com",
      DateOfBirth: "1985-05-15T00:00:00.000Z",
      Password: "Testing123@"
    };

    const response = await supertest(app)
      .post('/api/auth/signup')
      .send(data)
      .expect(400);

    // You can add assertions on the response here if needed.
  }, 10000);

  test('should successfully log in for a user', async () => {
    const data = {
      Email: "Test@gmail.com",
      Password: "Testing123@"
    };

    const response = await supertest(app)
      .post('/api/auth/login')
      .send(data)
      .expect(200);

    // You can add assertions on the response here if needed.
  });

  test('should handle invalid login credentials', async () => {
    const invalidCredentials = {
      Email: "Test@gmail.com",
      Password: "IncorrectPassword"
    };

    const response = await supertest(app)
      .post('/api/auth/login')
      .send(invalidCredentials)
      .expect(400);

    // You can add assertions on the response here if needed.
  });

  test('should set a JWT token cookie on successful login', async () => {
    const userData = {
      Email: 'Test@gmail.com',
      Password: 'Testing123@',
    };

    const response = await supertest(app)
      .post('/api/auth/login')
      .send(userData)
      .expect(200);

    const cookieHeader = response.headers['set-cookie'];
expect(cookieHeader.some(item => item.includes('jwt='))).to.be.true;

  });

  test('should clear the JWT token cookie on successful logout', async () => {
    const response = await supertest(app)
      .get('/api/auth/logout')
      .expect(200);

    const cookieHeader = response.headers['set-cookie'];

  });
});
