const express = require('express')
var app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const config = require('./config/config.json')

const port = process.env.port || config.port

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended:true}))

app.set('secretKey' , config.secret)

mongoose.connect(config.mongo_uri , {useNewUrlParser : true} , err => {
    if(!err){
        console.log("Database connected")
    }
})


