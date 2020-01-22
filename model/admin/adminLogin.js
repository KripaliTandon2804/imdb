const mongoose = require('mongoose')
const Schema = mongoose.Schema;

/**
 * Status
 * 0: admin registered
 * 1: email verified
 * 2: Profile created
 * 3: Profile updated
 **/


var adminLogin = new Schema({
    email: String,
    password: String,
    name: String
})

module.exports = mongoose.model('adminlogin', adminLogin)