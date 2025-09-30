const express = require("express");
const path = require("path");
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files (assets, uploads, etc.)
app.use("/assets", express.static(path.join(__dirname, "assets")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routers
const movieRouter = require("./router/movie.router");
app.use("/", movieRouter);

module.exports = app; // ❌ don’t app.listen here
