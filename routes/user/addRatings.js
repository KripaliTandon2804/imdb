const dbUserRegistration = require('../../model/registration/register')
const dbMovie = require('../../model/movieActor/movies')

module.exports = (req,res) => {
    if(!req.body.rating || !req.params.movieId){
        res.json({
            success:false,
            msg:"Please provide all the info."
        })
    }else{
        dbUserRegistration.findOne({email : req.decoded.email} , (err , loginData) => {
            if(err){
                res.json({
                    success:false,
                    msg:"Something went wrong."
                })
            }else if(!loginData || loginData == null){
                res.json({
                    success:false,
                    msg: "Please try again later."
                })
            }else{
                let ratingObj = {
                    email:req.decoded.email,
                    name:req.decoded.name,
                    rating:req.body.rating
                }
                dbMovie.findOne({_id : req.params.movieId} , (err ,sMovie) => {
                    if(err){
                        res.json({
                            success:false,
                            msg: "Try again"
                        })
                    }else if(!sMovie || sMovie == null){
                        res.json({
                            success:false,
                            msg:"Movie not found."
                        })
                    }
                    else{
                        let ratingData = sMovie.ratings.map(data => data.email)
                        if(ratingData.includes(req.decoded.email)){
                            dbMovie.findOneAndUpdate({_id : req.params.movieId} , {$push : {ratings : ratingObj}} , (err ,sRating) => {
                                if(err){
                                    res.json({
                                        success:false,
                                        msg:"Please try again"
                                    })
                                }else{
                                    res.json({
                                        success:true,
                                        msg:"Ratings added successfully."
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