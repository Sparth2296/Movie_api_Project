const Movie = require("../module/movie.schema");

module.exports.homePage = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.render("index", { movies });
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.addMovie = async (req, res) => {
  try {
    const { name, actor, movieType, shortDetails, fullDetails } = req.body;

    const newMovie = new Movie({
      name,
      actor,
      movieType,
      shortDetails,
      fullDetails,
      img: req.file ? req.file.path : null, // cloudinary URL
    });

    await newMovie.save();
    res.redirect("/");
  } catch (error) {
    console.error("Add Movie Error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.addMoviePage = async (req, res) => {
  res.render("add");
};

module.exports.movieDetails = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = await Movie.findById(movieId);

    if (!movieData) return res.status(404).send("Movie not found");

    res.render("moviedetails", { movies: [movieData] });
  } catch (error) {
    console.error("Movie details error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.editMoviepage = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movieData = await Movie.findById(movieId);

    res.render("edit", { movie: movieData });
  } catch (error) {
    console.error("Edit page error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.editMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    const updateData = {
      name: req.body.name,
      actor: req.body.actor,
      movieType: req.body.movieType,
      shortDetails: req.body.shortDetails,
      fullDetails: req.body.fullDetails,
    };

    if (req.file) updateData.img = req.file.path;

    await Movie.findByIdAndUpdate(movieId, updateData);

    res.redirect(`/${movieId}`);
  } catch (error) {
    console.error("Update movie error:", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports.deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.redirect("/");
  } catch (error) {
    console.error("Delete movie error:", error);
    res.status(500).send("Internal Server Error");
  }
};
