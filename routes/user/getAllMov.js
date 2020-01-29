const dbActor = require('../../model/movieActor/actors')

module.exports = (req,res) => {
    dbActor.find({},(err ,uActor) => {
        if(err){
            res.json({
                success:false,
                msg : "Something went wrong"
            })
        }else{
            let movie
            uActor.forEach(element => {
                if(element.actorId == req.body.actorId){
                    movie = element.movies
                }
            });
            res.json({
                success:true,
                data:movie,
                count:movie.length
            })
        }
    })
}