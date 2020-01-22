const dbUserLogin = require('../model/userLogin')

module.exports = (req,res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        res.json({
            success : false,
            msg: "Please provide the details."
        })
    }else{
        new dbUserLogin ({
            name : req.body.name,
            email:req.body.email,
            password:req.body.password
        }).save(err , registerData => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong.Please try again later."
                })
            }else if(!registerData || registerData == null){
                res.json({
                    success:false,
                    msg:"Registered data not saved."
                })
            }else{
                res.json({
                    success:true,
                    msg:"User registered"
                })
            }
        })
    }
}