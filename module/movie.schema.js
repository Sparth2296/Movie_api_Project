const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actor: {
    type: String,
    required: true,
  },
  movieType: {
    type: String,
    required: true,
  },
  shortDetails: {
    type: String,
    required: true,
  },
  fullDetails: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: true,
  },
});

// // ✅ Multer config
// const imageStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, path.join(__dirname, "../uploads/MoviePoster"));
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });

// // ✅ Attaching multer to schema
// movieSchema.statics.uploadImg = multer({ storage: imageStorage }).single("img");
// movieSchema.statics.imgPath = "/uploads/MoviePoster";

// // ✅ Export model directly
const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
