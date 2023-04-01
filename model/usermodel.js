const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

userSchema.index({ email: 1 }, { name: 'unique_email' });
const User = model('User', userSchema);

User.createIndexes().then(() => {
    console.log('Indexes created');
}).catch((err) => {
    console.log(err);
});

module.exports = User;