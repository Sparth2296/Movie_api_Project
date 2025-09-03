const express = require('express')
const movieCnt = require('../controller/moviecontroller')
const movie = require('../module/movie.schema')




const route = express.Router()




route.get('/',  movieCnt.homePage);
route.post('/addmovie', movie.uploadImg , movieCnt.addMovie);


module.exports = route

