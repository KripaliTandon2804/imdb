const dbUserLogin = require('../../model/user/userlogin')
const dbUserRegistration = require('../../model/registration/register')
const jwt = require ('jsonwebtoken')
const bcrypt = require('bcrypt')
const saltRound = 8

module.exports = (req,res) => {
 if(!req.body.email || !req.body.password){
     res.json({
         success:false,
         msg:"Please provide both email and password."
     })
 }else{
    dbUserRegistration.findOne({email : req.body.email} , (err, registerData) => { 
         if(err){
             res.json({
                 success:false,
                 msg:"Something went wrong."
             })
         }else if(!registerData || registerData == null){
             res.json({
                 success : false,
                 msg : "Please register first."
             })
         }else{
                

            //  bcrypt.compare(req.body.password , loginData.password).then((matched) => {
            //      if(matched){
            //          var tokenData = {
            //              email : loginData.email,
            //              phone : loginData.phone
            //          }
            //         var token = jwt.sign(tokenData , req.app.get('secretKey'));
            //         dbUserLogin.findOneAndUpdate({email : req.body.email} , {$push : {lastLogin : new Date()} , $set : {token : token}}).then(loginData => {
            //             res.json({
            //                 success:true,
            //                 msg: "Login Successful.",
            //                 token:token
            //             })
            //         }).catch(err => {
            //             res.json({
            //                 success:false,
            //                 msg:"Error in login.Try again"
            //             })
            //         })
            //      }else{
            //          res.json({
            //              success:false,
            //              msg: "Incorrect Password."
            //          })
            //      }
            //  }).catch(err => {
            //      res.json({
            //          success:false,
            //          msg:"Error in matching password.",
                     
            //      })
            //  })
         }
     })
 }
}