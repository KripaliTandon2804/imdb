const dbAdminLogin = require('../../model/admin/adminLogin')
const jwt = require('jsonwebtoken')

module.exports = (req,res) => {
    if(!req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        dbAdminLogin.find({email : req.body.email} , (err,loginData) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong.Please try again later."
                })
            }else if(!loginData || loginData == null){
                res.json({
                    success:false,
                    msg:"Login data not found."
                })
            }else if(loginData.password != req.body.password){
                res.json({
                    success:false,
                    msg:"Password mismatch."
                })
            }else{               
                res.json({
                    success:true,
                    msg:"Admin logged in successfully."
                })
            }
        })
    }
}