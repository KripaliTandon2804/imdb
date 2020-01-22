const multer = require('multer')
const dbUserLogin = require('../model/userLogin')

module.exports = (req,res) => {

    let storage = multer.diskStorage({
        destination : function(req , file , cb){
            cb(null , baseDir + `/routes/uploads`)
        },
        filename : function(req, file , cb){
            cb(null , Date.now() + '-' + file.originalname)
        }
    })

    const upload = multer({
        storage : storage
    })

    var cpUpload = upload.fields([{name : 'image' , maxCount :1}])

    
}