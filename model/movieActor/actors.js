const mongoose = require('mongoose')
const Schema = mongoose.Schema


const actors = new Schema({
    actorName: {
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
    actorId : String,
    // movies: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'movies'
    // }],
    movies : [String]
})

module.exports = mongoose.model('actors', actors)