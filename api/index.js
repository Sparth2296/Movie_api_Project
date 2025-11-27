const express = require("express");
const app = express();
const path = require("path");
require("dotenv").config();

const db = require("../config/db"); // your DB connection
const router = require("../router/movie");

// Middleware

// Views & static
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));
app.use(express.static(path.join(__dirname, "../assets")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Routes
app.use("/", require('../router/movie'));


// Export for Vercel
module.exports = app;
