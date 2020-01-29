const dbActor = require('../../model/movieActor/actors')
const dbMovie = require('../../model/movieActor/movies')

function generateActorId () {
    return 'ACT' + Math.random().toString(36).substring(2,5)     
}

module.exports = (req,res) => {
    if(!req.body.actor || !req.body.age || !req.files.profile ){
        res.json({
            success : false,
            msg:"Please provide all the details."
        })
    }else{
        let movieArray = []
        dbMovie.find({cast : req.body.actor} , (err ,uCast) => {
            console.log("********cast" ,uCast)
            if(err){
                res.json({
                    success:false,
                    msg : "Something went wrong."
                })
            }else if(!uCast || uCast == null){
                res.json({
                    success:false,
                    msg:"Movie not found."
                })
            }else{
                uCast.forEach(e => {
                    console.log("##########" , e)
                    movieArray.push(e.movieName)
                })
                dbActor.find({actorName : req.body.actor} , (err , actorData) => {                    
                    if(err){
                        res.json({
                            success:false,
                            msg:"Please try again later."
                        })
                    }else if(!actorData || actorData == null){
                        res.json({
                            success:true,
                            msg: "Actor data not found."
                        })
                    }else{
                        let uActor = actorData.map(data => data.actorName)
                        if(uActor.includes(req.body.actor)){
                            res.json({
                                success:false,
                                msg:"Actor already exists."
                            })
                        }else{
                            new dbActor ({
                                actorName : req.body.actor,
                                age: req.body.age,
                                picture : req.files.profile[0].fieldname + '.' + req.files.profile[0].mimetype,
                                actorId : generateActorId(),
                                movies : movieArray
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
                    
                })

            }
        })

    }
}

