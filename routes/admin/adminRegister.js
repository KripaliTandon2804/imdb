const dbAdminRegister = require('../../model/admin/adminLogin')


module.exports = (req,res) => {
    if(!req.body.name || !req.body.email || !req.body.password){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        new dbAdminRegister ({
            name : req.body.name,
            email:req.body.email,
            password : req.body.password
        }).save(err , savedData => {
            if(err){
                res.json({
                    success:false,
                    msg: "Database error"
                })
            }else if(!savedData || savedData == null){
                res.json({
                    success:false,
                    msg:"Registration cannot be saved."
                })
            }else{
                res.json({
                    success:true,
                    msg:"Registration successful."
                })
            }
        })
    }
}