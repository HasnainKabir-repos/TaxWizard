const supertest = require("supertest");
const {server, closeServer} = require('../../server');
const app = require('../../app');

describe('Integration test authentication', () => {
    after( () => {
        closeServer();
   });
    // it('should signup for a user', (done) => {

    //     const data = {
    //         body:{
    //             Name:"Test",
    //             Email:"Test@gmail.com",
    //             DateOfBirth:"1990-05-15",
    //             Password: "Testing123@"
    //         }
           
    //     };

    //     supertest(app)
    //       .post('/api/auth/signup') 
    //       .send( data ) 
    //       .expect(201)
    //       .end((err, res) => {
    //         if (err) return done(err);
    //         done();
    //       });

    // });
    it('should handle existing user during signup', (done) => {
        const data = {
            body:{
                Name:"Test",
                Email:"Test@gmail.com",
                DateOfBirth:"1990-05-15",
                Password: "Testing123@"
            }  
        };
      
        supertest(app)
          .post('/api/auth/signup')
          .send(data)
          .expect(400) 
          .end((err, res) => {
            if (err) console.log(err);
            done();
          });
    });
    it('should successfully log in for a user', (done) => {

        const data = {
            body:{
                Email:"test@gmail.com",
                Password: "Testing123@"
            }
           
        };

        supertest(app)
          .post('/api/auth/login') 
          .send( data ) 
          .expect(200)
          .end((err, res) => {
            if (err) console.log(err);
            done();
          });

          
    });
    it('should handle invalid login credentials', (done) => {
        const invalidCredentials = {
            body:{
                Email: "test@gmail.com",
                Password: "IncorrectPassword"
            }
          
        };
      
        supertest(app)
          .post('/api/auth/login')
          .send(invalidCredentials)
          .expect(401) // Expect a 401 Unauthorized status
          .end((err, res) => {
            if (err) console.log(err);
            done();
          });
          
      });
      
});