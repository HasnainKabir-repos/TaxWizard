const supertest = require('supertest');
const {server, closeServer} = require('../../server');
const app = require('../../app');
const chai = require('chai');
const expect = chai.expect;

describe('Testing root of project', () =>{
    after( () => {
         closeServer();
    });
    it("should return a 200 status code" , (done) => {
        supertest(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
            if(err)
            console.log(err);
            done();
        });
    });
    it("should return a TaxWizard root test response", (done) => {
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