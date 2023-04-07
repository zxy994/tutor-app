const { registerUser, authenticateUser, displayProfile, createProfile } = require('../service/services');
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


//Route to create/update profile
app.post('/login/d/:token/profile/create', async (req, res) => {
    //const userid = verifyToken(req, res)
    createProfile(req, res);
})


//Route to display profile
app.get('/login/d/:token/disProfile/p', async (req, res) => {
    displayProfile(req, res);
})


module.exports = app;