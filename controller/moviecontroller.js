const movie  = require('../module/movie.schema')
fs = require('fs')
const path = require('path')


module.exports.homePage = async (req ,res)=>{
    try {
        const movies = await movie.find();

        res.render('home', { movies });
    } catch (error) {
        console.error(`Error fetching movies: ${error}`);
        res.status(500).send('Internal Server Error');
    }
}


module.exports.addMovie = async (req, res) => {
  try {
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { name, actor, movieType, shortDetails, fullDetails } = req.body;

    const newMovie = new movie({
      name,
      actor,
      movieType,
      shortDetails,
      fullDetails,
      img: req.file ? req.file.filename : null,  // save filename
    });

    await newMovie.save();

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};


module.exports.addMoviePage = async (req, res) => {
    try {
        return res.render('add');
    } catch (error) {
        console.error(`Error rendering add movie page: ${error}`);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports.movieDetails = async (req, res) => {
    try {
        const movieId = req.params.id;

        console.log('Movie ID:', movieId);
        
        const movieData = await movie.findById(movieId);

        if (!movieData) {
            return res.status(404).send('Movie not found');
        }

        res.render('moviedetails',{movies: [movieData]});

    } catch (error) {

        console.error(`Error fetching movie details: ${error}`);
        res.status(500).send('Internal Server Error');

    }
};

module.exports.editMoviepage = async (req, res)=>{
    try {
        const movieId = req.params.id;
        const movieData = await movie.findById(movieId);

        if (!movieData) {
            return res.status(404).send('Movie not found');
        }

        res.render('edit', { movie: movieData });

    } catch (error) {
        console.error(`Error fetching movie data for edit: ${error}`);
        res.status(500).send('Internal Server Error');
    }
}


module.exports.editMovie = async (req ,res)=>{

    try {
        const movieId = req.params.id;
        const { name, actor, movieType, shortDetails, fullDetails } = req.body;

        const updatedMovie = await movie.findByIdAndUpdate(movieId, {
            name,
            actor,
            movieType,
            shortDetails,
            fullDetails,
            img: req.file ? req.file.filename : null,
        }, { new: true });

        if (!updatedMovie) {
            return res.status(404).send('Movie not found');
        }

        res.redirect(`/${movieId}`);


    } catch (error) {
        console.error(`Error updating movie: ${error}`);
        res.status(500).send('Internal Server Error');
    }
}

module.exports.deleteMovie = async (req ,res)=>{
    try {
        const movieId = req.params.id;
        await movie.findByIdAndDelete(movieId);
        res.redirect("/");
    } catch (error) {
        console.error(`Error deleting movie: ${error}`);
        res.status(500).send('Internal Server Error');
        
    }
}

