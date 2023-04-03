const User = require('../model/usermodel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function registerUser(req, res) {

    // Check if the email already exists
    const emailExists = await User.findOne({ email: req.body.email });
    if (emailExists) {
        return res.status(400).send('Email already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    });

    try {
        const savedUser = await user.save();
        //res.send(savedUser);
        res.send('User Registered!');
    } catch (err) {
        res.status(400).send(err);
    }
};

async function authenticateUser(req, res) {
    // Check if the email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send('Email is wrong');
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Password is wrong');
    }

    // Create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
};


const verifyToken = async (req, res, next) => {

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({
            message: 'Authentication failed'
        })

    }

    const tokenWithoutColon = authHeader.replace(':', '');
    const decoded = jwt.verify(tokenWithoutColon, process.env.TOKEN_SECRET);
    console.log('Its decoded: ', decoded);
    return res.status(200).json({
        message: 'Verified'
    })
};

module.exports = { registerUser, authenticateUser, verifyToken }
