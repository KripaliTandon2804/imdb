const mongoose = require('mongoose')
const Schema = mongoose.Schema

/**
 * Status
 * 0: User registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile updated
 **/

const userLogin = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }, 
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    emailVerify: {
        otp: Number,
        verified: Boolean,
        verifiedAt: Date
    },
    token: String,
    status: Number,
    lastLogin: [Date],
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('userLogin', userLogin)