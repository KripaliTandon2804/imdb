const dbActor = require('../../model/movieActor/actors')
const dbMovie = require('../../model/movieActor/movies')
dbUserRegistration = require('../../model/registration/register')

module.exports = (req,res) => {
    if(!req.body.comment || !req.params.movieId){
        res.json({
            success:false,
            msg:"Please provide complete info."
        })
    }else{
    dbUserRegistration.findOne({email : req.decoded.email} , (err , loginData) => {
        if(err){
            res.json({
                success:false,
                msg:"Please try again later."
            })
        }else if(!loginData || loginData == null){
            res.json({
                success:false,
                msg:"Please register first."
            })
        }else{
            let comment ={
                email : req.decoded.email,
                text : req.body.comment,
                name : req.decoded.name,
            }
            dbMovie.findOne({_id : req.params.movieId} , (err , uData) => {
                if(err){
                    res.json({
                        success:false,
                        msg:"Please try again."
                    })
                }else if(!uData || uData == null){
                    res.json({
                        success:false,
                        msg:"Movie not found."
                    })
                }else{
                    let commentData = uData.comments.map(data => data.email)
                    if(commentData.includes(req.decoded.email)){
                        dbMovie.findOneAndUpdate({_id : req.params.movieId} , {$push : {comments : comment}} , (err , cData) => {
                            if(err){
                                res.json({
                                    success:false,
                                    msg:"Please try again."
                                })
                            }else{
                                res.json({
                                    success:true,
                                    msg:"Comment added successfully."
                                })
                            }
                        })
                    }
                    
                }
            })
            
        }
    })
    }
}