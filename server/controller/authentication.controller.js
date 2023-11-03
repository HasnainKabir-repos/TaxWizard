const bcrypt = require("bcrypt");
const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();
const passwordComplexity = require('joi-password-complexity');
const passport = require("passport");

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

const loginUser = async( req, res) => {
    passport.authenticate('local', { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(401).json({ message: 'Authentication failed.' });
        }
        const token = generateAuthToken(user);
        return res.status(200).json({ token });
    })
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

        const user = await User.exists({ Email: req.body.Email });
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
    signupUser
};