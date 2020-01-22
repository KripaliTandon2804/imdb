const dbActor = require('../model/actor')

module.exports = (req,res) => {
    if(!req.body.actorName || !req.body.age || !req.body.movie){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        new dbActor({
            actorName : req.body.actorName,
            age : req.body.age,
            movies:req.body.movie
        }).save(err,actorData => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong"
                })
            }else if(!actorData || actorData == null){
                res.json({
                    success:false,
                    msg:"Data not saved."
                })
            }else{
                res.json({
                    success:true,
                    msg:"Actor added"
                })
            }
        }) 
    }
}