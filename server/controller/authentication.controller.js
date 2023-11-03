const bcrypt = require("bcrypt");
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const passwordComplexity = require('joi-password-complexity');

const generateAuthToken = ( user) => {
    const token = jwt.sign({_id:user._id},process.env.JWTPRIVATEKEY,{expiresIn:"7d"});
    return token;
};

const validateSignUp = (data) => {
        const schema = Joi.object({
            Name:Joi.string().required(),
            Email:Joi.string().email().required(),
            DateOfBirth: Joi.date().iso().max(new Date()).required(),
            Password:passwordComplexity().required(),
        });
    return schema.validate(data);
};

const validateEmailPass = (data) => {
    const schema = Joi.object({
      Email: Joi.string().email().required().label("Email"),
      Password: Joi.string().required().label("Password"),
    });
  
    return schema.validate(data);
  };

  
const findUser = async(req) => {
    const user = await User.findOne({ Email: req.body.Email });
    return user;
};


const loginUser = async(req, res) => {
    try {
        const { error } = validateEmailPass(req.body);
        if (error)
          return res.status(400).send({ message: error.details[0].message });
    
        const user = await findUser(req);
        if (!user) {
          return res.status(400).send({ message: "User not Exists" });
        }
        console.log(req.body.Password);
        console.log(user.Password);
        const validPassword = await bcrypt.compare(
          req.body.Password,
          user.Password
        );
        if (!validPassword) {
          return res.status(400).send({ message: "Invalid Password" });
        }
        const token = generateAuthToken(user);
        res.status(200).send({ data: token, message: "Login Successful" });
      } catch (error) {
        console.log(error); 
        res.status(500).send({ message: "Internal Server Error" });
      }
};

const generateSalt = async() => {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    return salt;
};

const generateHashPassword = async(req, salt) => {
    const hashPassword = await bcrypt.hash(req.body.Password, salt);
    return hashPassword;
};

const createNewUser = async(req, hashPassword) => {
    const newUser = new User({ ...req.body, Password: hashPassword });
    await newUser.save();
};

const signupUser = async (req, res) => {
    try {
        const { error } = validateSignUp(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });

        console.log(User);
        const user = await User.findOne({ Email: req.body.Email });
        if (user)
            return res.status(400).send({ message: "User already registered" });

        const salt = await generateSalt();
        const hashPassword = await generateHashPassword(req, salt);

        await createNewUser(req, hashPassword);
        res.status(201).send({ message: "User registered successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Internal Server Error", error:error });
    }
};

module.exports = {
    generateAuthToken, 
    validateSignUp,
    loginUser,
    generateSalt,
    generateHashPassword,
    signupUser,
    validateEmailPass,
};