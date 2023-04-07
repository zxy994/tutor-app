const User = require('../model/usermodel');
const TutorForm = require('../model/tutormodel');
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


const verifyToken = async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: 'Authentication failed'
        })
    }

    //const tokenWithoutColon = authHeader.replace(':', '');
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const userid = decoded._id;
    console.log('Retrieved user id from decoded: ', userid);
    return userid;
};


const createProfile = async (req, res) => {
    const userid = await verifyToken(req, res);

    const profileExists = await TutorForm.find(
        {
            user: userid,
            courseTitle: req.body.courseTitle
        });

    if (profileExists.length === 0) {
        const newTutorForm = new TutorForm({
            courseTitle: req.body.courseTitle,
            summary: req.body.summary,
            linkedinProfile: req.body.linkedinProfile,
            //passportImage: req.body.passportImage,
            courseSummary: req.body.courseSummary,
            skills: req.body.skills,
            courseStructure: req.body.courseStructure,
            user: userid
        });

        try {
            const savedProfile = await newTutorForm.save();
            console.log('Profile doesnt exist. Creating it');
            res.send(savedProfile);
        }
        catch (err) {
            console.log('doesnt exist but threw ERROR')
            res.status(400).send(err);
        }
    }
    else {
        const update = {
            courseTitle: req.body.courseTitle,
            summary: req.body.summary,
            linkedinProfile: req.body.linkedinProfile,
            courseSummary: req.body.courseSummary,
            skills: req.body.skills,
            courseStructure: req.body.summary,
            user: userid
        };

        try {
            const updateProfile = await TutorForm.updateOne(
                {
                    user: userid,
                    courseTitle: req.body.courseTitle
                },
                update
            )
            console.log('exists so updating');
            res.send(updateProfile);
        }
        catch (err) {
            console.log('exists but still threw error');
            res.status(400).send(err);
        }
    }
}


const displayProfile = async (req, res) => {
    const userid = await verifyToken(req, res);

    //display profile associated with user id
    try {
        const profile = await TutorForm.find({ user: userid });
        res.status(200).send(profile);
    }
    catch (err) {
        res.status(400).send(err);
    }
}


module.exports = { registerUser, authenticateUser, verifyToken, createProfile, displayProfile }
