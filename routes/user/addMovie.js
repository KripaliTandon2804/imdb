const dbMovies = require('../../model/movieActor/movies')


module.exports = (req,res) => {
    if(!req.body.movieName || !req.body.description || !req.body.genre||req.body.releaseDate || req.files.photos){
        res.json({
            success:false,
            msg:"Please provide all the details."
        })
    }else{
        new dbMovies ({
            name:req.body.movieName,
            description:req.body.description,
            genre:req.body.genre,
            releaseDate:req.body.releaseDate,
            photos : req.files.photos[0].fieldname + '.' + req.files.photos[0].mimetype
        }).save(err , savedMovies => {
            if(err){
                res.json({
                    success : false,
                    msg:"Database Error."
                })
            }else{
                res.json({
                    success:true,
                    msg:"Movie added successfully."
                })
            }
        })
    }
}