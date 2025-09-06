const express = require('express')
const movieCnt = require('../controller/moviecontroller')
const movie = require('../module/movie.schema')
const multer = require('multer')




const route = express.Router()

const filestorage = multer.diskStorage({
    destination: function(req , res , cd){
        cd(null , './uploads/MoviePoster')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({storage: filestorage}).single('img')


route.get('/',  movieCnt.homePage);
route.get('/add', movieCnt.addMoviePage);
route.post('/addmovie', upload , movieCnt.addMovie);
route.get('/:id', movieCnt.movieDetails);
route.get('/edit/:id', movieCnt.editMoviepage);
route.post('/editmovie/:id', upload , movieCnt.editMovie);
route.get('/deletemovie/:id', movieCnt.deleteMovie);

module.exports = route

