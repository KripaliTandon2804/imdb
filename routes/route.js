const express = require('express')
const router = express.Router()
const multer = require('multer')

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null , __dirname + '/user/moviePhotos')
    },
    filename: function (req,file, cb){
        cb(null , 'MOV' + Date.now() + '' + file.originalname)
    }
})
var upload = multer({storage : storage})

var movieUpload = upload.fields([{name : 'photos' ,maxCount :1},{name : 'gallery' , maxCount : 6}])
var profilepic = upload.fields([{name : 'profile' , maxCount : 1},{name : 'gallery' , maxCount :1}])

const userRegistration = require('../routes/user/userRegistration')
router.post('/register',userRegistration)

const userLogin = require('../routes/user/userLogin')
router.post('/login',userLogin)

const addActor = require('../routes/user/addActor')
router.post('/addActor' , profilepic , addActor)

module.exports = router;


