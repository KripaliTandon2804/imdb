const dbUserRegistration = require('../../model/registration/register')

module.exports = (req,res) => {
    if(!req.body.name || !req.body.age || !req.body.email || !req.body.password || !req.body.phone){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        new dbUserRegistration({
            name : req.body.name,
            age : req.body.age,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone
        }).save(err , savedRegister => {
            if(err){
                res.json({
                    success : false,
                    msg : "Something went wrong."
                })
            }else if(!savedRegister || savedRegister == null){
                res.json({
                    success:false,
                    msg:"Data does not save."
                })
            }else{
                res.json({
                    success:true,
                    msg:"User registered successfully."
                })
            }
        })
    }
}