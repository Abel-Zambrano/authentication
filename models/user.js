const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose); // Add packages to user schema

module.exports = mongoose.model('User', UserSchema);