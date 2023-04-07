const mongoose = require('mongoose');

const tutorFormSchema = new mongoose.Schema({
    courseTitle: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    linkedinProfile: {
        type: String,
        required: true
    },
    passportImage: {
        type: String,
        required: false
    },
    courseSummary: {
        type: String,
        required: true
    },
    skills: [{
        type: String,
        required: true
    }],
    courseStructure: [{
        type: String,
        required: true
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const TutorForm = mongoose.model('TutorForm', tutorFormSchema);

module.exports = TutorForm;
