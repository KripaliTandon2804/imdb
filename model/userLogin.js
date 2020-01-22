const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userLogin = new Schema({
    userId: String,
    email: String,
    password: String,
    name: String
})

module.exports = mongoose.model('userLogin' , userLogin)