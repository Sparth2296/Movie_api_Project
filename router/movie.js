const express = require("express");
const movieCnt = require("../controller/moviecontroller");
const upload = require("../config/multer");

const route = express.Router();

route.get("/", movieCnt.homePage);

route.get("/add", movieCnt.addMoviePage);
route.post("/addmovie", upload.single("img"), movieCnt.addMovie);

route.get("/edit/:id", movieCnt.editMoviepage);
route.post("/editmovie/:id", upload.single("img"), movieCnt.editMovie);

route.get("/deletemovie/:id", movieCnt.deleteMovie);

route.get("/favicon.ico", (req, res) => res.status(204).end());


route.get("/:id", movieCnt.movieDetails);

module.exports = route;
