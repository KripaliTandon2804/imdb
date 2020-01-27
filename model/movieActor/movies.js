const mongoose = require('mongoose')
const Schema = mongoose.Schema


const movies = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    photos: {
        type: String
    },
    description: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    cast: [{
        actorId: {
            type: Schema.Types.ObjectId,
            ref: 'actors'
        },
        name: String
    }],
    releaseDate: {
        type: Date
    },
    comments: [{
        email: String,
        text: {
            type: String,
            require: true
                },
        name: {
            type: String
            },
        date: {
            type: Date,
            default: new Date()
            }
    }],
    ratings: [{
        email: String,
        name: String,
        rating:{
                type: Number,
                enum: [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10]
            },
        date: {
            type: Date,
            default: new Date
            }
    }],
    addedOn: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('movies', movies)