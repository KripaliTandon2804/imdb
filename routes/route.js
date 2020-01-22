const express = require('express')
const app = express()
const verify = require('../routes/tokenVerify')

var register = require('../routes/register')
app.post('/register' , register)

var login = require('../routes/login')
app.post('/login' ,login)

