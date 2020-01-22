const mongoose = require('mongoose')
const Schema = mongoose.Schema

const moviesData = new Schema({
    movieName: String,
    photos:[],
    description:String,
    genre:String,
    cast:String,
    releaseDate:Date
})

module.exports = mongoose.model('moviesData' , moviesData)