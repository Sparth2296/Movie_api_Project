const movie  = require('../module/movie.schema')


module.exports.homePage = async (req ,res)=>{
    try {
        const movies = await movie.find();

        res.render('home', { movies });
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        res.status(500).send('Internal Server Error');
    }
}


module.exports.addMovie = async (req ,res)=>{
    
    try {
        
        const {name , actor , movieType , shortDetails , fullDetails} = req.body
       const moviePoster = req.file.originalname;

        console.log(moviePoster);
        

       const newMovie = new movie({
           name,
           actor,
           movieType,
           shortDetails,
           fullDetails,
           moviePoster
       });

       const savedMovie = await movie.create(newMovie);
       console.log(savedMovie);

       res.status(201).send('Movie added successfully');

       res.redirect('/');
    } catch (error) {

        console.log(error);
        res.status(500).send('Internal Server Error');
    }
    
}