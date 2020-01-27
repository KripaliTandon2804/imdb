const dbUserRegistration = require('../../model/registration/register')
const bcrypt = require('bcrypt')
const saltRounds = 8

module.exports = (req,res) => {
    if(!req.body.name || !req.body.age || !req.body.email || !req.body.password || !req.body.phone){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        dbUserRegistration.findOne({email : req.body.email} , (err,udata) => {
            console.log("##########" , udata)
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong.Please try again later."
                })
            }else if(udata){
                res.json({
                    success:false,
                    msg:"User is already registered."
                })
            }else{
                bcrypt.hash(req.body.password ,saltRounds).then(hash => {
                    console.log("************" , hash)
                    new dbUserRegistration({
                        name : req.body.name,
                        age : req.body.age,
                        email : req.body.email,
                        password : hash,
                        phone : req.body.phone
                    }).save((err , savedRegister) => {
                        console.log("$$$$$$$$$$$" ,savedRegister )
                        if(err){
                            res.json({
                                success : false,
                                msg : "Something went wrong."
                            })
                        }                            
                        else{
                            res.json({
                                success:true,
                                msg:"User registered successfully."
                            })
                        }
                    })
                }).catch(err => {
                    res.json({
                        success:false,
                        msg:"Some error occurred.", 
                        err:err
                    })
                })
            }
        })
        
        
    }
}