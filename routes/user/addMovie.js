const dbMovies = require('../../model/movieActor/movies')
const dbActor = require('../../model/movieActor/actors')
const regex = require('../common/regex')

module.exports = async(req,res) => {
    try{
        let castNameCheck = [];
        for(let i = 0; i<req.body.cast.length;i++){
            castNameCheck.push(regex.regexWordsWithSpace.test(req.body.cast[i]))
        }
        console.log("@@@@@@@@" , castNameCheck)
        if(castNameCheck.includes(false)){
            res.json({
                success:false,
                msg:"Please check the cast format."
            })
        }else{
            let cast = [];
            for(let i=0 ; i<req.body.cast.length ; i++){
                cast.push(req.body.cast[i].toLowerCase().trim())
            }
            console.log("*************" ,cast)
            let movie = await dbMovies.findOne({ movieName: req.body.movieName })
            if (movie || movie != null) {
                res.json({
                    success: false,
                    msg: 'This movie already exists in database.'
                })
            } else {
                await dbActor.updateMany({ actorName: { $in: cast } }, { $push: { movieName: req.body.movieName } })
    
                let newMovie = await new dbMovies({
                    movieName: req.body.movieName,
                    cast: cast,
                    genre: req.body.genre,
                    description: req.body.description,
                    releaseDate: req.body.releaseDate,
                    //trailerLink: req.body.trailerLink
                }).save()
    
                if (!newMovie) {
                    res.json({
                        success: false,
                        msg: "Error while saving data. Please try again after some time."
                    })
                } else {
                    res.json({
                        success: true,
                        msg: 'movie details added successfully.'
                    })
                    console.log(__filename, '------ movie details added successfully ------')
                }
            } 
        }
    }catch(err){
        res.json({
            success:false,
            err:err
        })
    }
    
}