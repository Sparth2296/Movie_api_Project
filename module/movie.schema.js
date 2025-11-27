const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  actor: { type: String, required: true },
  movieType: { type: String, required: true },
  shortDetails: { type: String, required: true },
  fullDetails: { type: String, required: true },
  img: { type: String, required: true }, // Cloudinary URL
});

module.exports = mongoose.model("Movie", movieSchema);
