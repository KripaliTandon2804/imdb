const dbMoviesData = require('../model/moviesData')

module.exports = (req,res) => {
    if(!req.body.movieName || req.body.description || req.body.genre || req.body.cast || req.body.date){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        new dbMoviesData ({
            movieName : req.body.movieName,
            description : req.body.description,
            genre : req.body.genre,
            cast : req.body.cast,
            releaseDate : req.body.releaseDate
        }).save(savedData , err => {
            if(err){
                res.json({
                    success:false,
                    msg:"Some error has occurred."
                })
            }else if(!savedData || savedData == null){
                res.json({
                    success:false,
                    msg:"Data cannot be saved."
                })
            }else{
                res.json({
                    success:true,
                    msg:"Movies added."
                })
            }
        })
    }
}