const mongoose = require('mongoose')
const Schema = mongoose.Schema

const actors = new Schema({
    name:String,
    age:Number,
    photo:String,
    movies:[]
})

module.exports = mongoose.model('actors' , actors)