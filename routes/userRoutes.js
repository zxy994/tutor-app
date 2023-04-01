const { registerUser, authenticateUser } = require('../service/services');
const express = require('express')
const app = express();

// Route for user registration
app.post('/register', async (req, res) => {

    // Callback function logic here
    registerUser(req, res);
})

// Route for user login
app.post('/login', async (req, res) => {

    // Callback function logic here
    authenticateUser(req, res);
})

module.exports = app;