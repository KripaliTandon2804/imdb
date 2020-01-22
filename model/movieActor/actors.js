const mongoose = require('mongoose')
const Schema = mongoose.Schema


const actors = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    picture: {
        type: String
    },
    movies: [{
        type: Schema.Types.ObjectId,
        ref: 'movies'
    }],
})

module.exports = mongoose.model('actors', actors)