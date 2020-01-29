const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const config = require('./config/config.json')
const route = require('./routes/route')

const port = process.env.port || config.port

app.use(bodyParser.json({}))
app.use(bodyParser.urlencoded({extended:true}))

app.set('secretKey' , config.secret)

mongoose.connect(config.mongo_uri , {useNewUrlParser : true , useUnifiedTopology: true} , err => {
    if(!err){
        console.log("Database connected")
    }
})

app.use('/api',route)

app.listen(port , () => console.log(`Listening at ${port}`));
