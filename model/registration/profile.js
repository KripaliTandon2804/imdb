const mongoose = require('mongoose')
const Schema = mongoose.Schema


/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile Updated
 **/


const profile = new Schema({
    
    name: String,
    email: String,
    profilePic: String,
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: [Date],
    status: Number
})

module.exports = mongoose.model('profile', profile)