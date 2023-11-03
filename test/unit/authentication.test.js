const jwt = require("jsonwebtoken");
require("dotenv").config();
const chai = require("chai");
const expect = chai.expect;
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const {
  generateAuthToken,
  validateSignUp,
  generateSalt,
  generateHashPassword,
  validateEmailPass
} = require("../../server/controller/authentication.controller");

describe("authentication bcrypt controller", () => {
  it("should generate a salt", async () => {
    const salt = await generateSalt();
    expect(salt).to.be.a("string");
  });

  it("should generate a hashed password", async () => {
    const salt = await generateSalt();
    const req = {
      body: {
        Password: "12345",
      },
    };
    const hashedPassword = await generateHashPassword(req, salt);
    expect(hashedPassword).to.be.a("string");
  });
});

describe("generateAuthToken", () => {
  it("should generate a valid JWT token", () => {
    const user = { _id: "someUserId" };
    const token = generateAuthToken(user);

    expect(token).to.be.a("string");

    const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY);
    expect(decoded).to.have.property("_id", user._id);
  });
});

describe("validateSignUp", () => {
  it("should validate a valid signup data object", () => {
    const validUserData = {
      Name: "John Doe",
      Email: "john.doe@example.com",
      DateOfBirth: "1990-05-15", // A valid ISO date
      Password: "StrongPassword123@", // Meets password complexity criteria
    };

    const { error, value } = validateSignUp(validUserData);
    //console.log(value);
    expect(error).to.be.undefined;
  });

  it("should fail for invalid signup data", () => {
    const invalidUserData = {
      Name: "", // Name is required
      Email: "invalid-email", // Invalid email format
      DateOfBirth: "2024-05-05", // Date is in the future
      Password: "weak", // Fails password complexity criteria
    };

    const validationResult = validateSignUp(invalidUserData);
    expect(validationResult.error).to.exist;
  });
});

describe('Login Input Validation', () => {
    it('should validate a valid email and password', () => {
      const data = {
        Email: 'test@example.com',
        Password: 'password123',
      };
  
      const { error, value } = validateEmailPass(data);
  
      expect(error).to.be.undefined;
      expect(value).to.deep.equal(data);
    });
  
    it('should reject invalid email format', () => {
      const data = {
        Email: 'invalid-email',
        Password: 'password123',
      };
  
      const { error, value } = validateEmailPass(data);
  
      expect(error).to.not.be.null;
      expect(error.details[0].message).to.include('Email');
    });
  
    it('should reject missing email', () => {
      const data = {
        Password: 'password123',
      };
  
      const { error } = validateEmailPass(data);
  
      expect(error).to.not.be.null;
      expect(error.details[0].message).to.include('Email');
    });
  
    it('should reject missing password', () => {
      const data = {
        Email: 'test@example.com',
      };
  
      const { error } = validateEmailPass(data);
  
      expect(error).to.not.be.null;
      expect(error.details[0].message).to.include('Password');
    });
  });
