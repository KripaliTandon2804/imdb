const dbActor = require('../../model/movieActor/actors')

// function generateActorId () {
//     return 'ACT' + Math.random().toString(36).substring(2,5)     
// }

module.exports = (req,res) => {    
    if(!req.body.actorName || !req.body.age || !req.files.profile){
        res.json({
            success : false,
            msg:"Please provide all the details."
        })
    }else{        
        new dbActor ({
            name : req.body.actorName,
            age : req.body.age,
            //actorId : generateActorId(),
            picture : req.files.profile[0].fieldname + '.' + req.files.profile[0].mimetype
        }).save((err , savedActor) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Database error."
                })
            }else{  
                res.json({
                    success:true,
                    msg:"Actor added successfully."
                })
            }
        })        
    }
}