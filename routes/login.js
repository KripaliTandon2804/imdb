const dbUserLogin = require('../model/userLogin')
const jwt = require('jsonwebtoken')

var userId = function () {
    return 'US' + Math.random.toString(36).substr(2 , 9);
}

module.exports = (req,res) => {
    if(!req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide email and password."
        })
    }else{
        dbUserLogin.find({email : req.body.email} ,(err, loginData) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Please try again."
                })
            }else if(!loginData || loginData == null){
                res.json({
                    success:false,
                    msg:"User not registered."
                })
            }else if(loginData.password != req.body.password){
                res.json({
                    success:false,
                    msg:"Password does not match"
                })
            }else{               
                tokenData = {
                    _id : loginData._id,
                    name:loginData.name,
                    email:loginData.email
                }
                var token = jwt.sign(tokenData , req.app.get('secretKey'))
                dbUserLogin.findOneAndUpdate({email : req.body.email} , {$push : {userId : userId}},(err ,udata) => {
                    if(err){
                        res.json({
                            success:false,
                            msg:"Database error."
                        })
                    }else if(!udata || udata == null){
                        res.json({
                            success:false,
                            msg:"Data not found."
                        })
                    }else{
                        res.json({
                            success:true,
                            msg:"User logged in successfully.",
                            token:token
                        })
                    }
                })
                
            }
        })
    }
}