const express = require("express");
const router = express.Router();
const register_Controller = require("../controllers/resgister_Controller");
const Movie = require("../models/register_model");

router.get("/", (req, res) => {
  res.render("movie_register");
});

router.post("/add-register", Movie.uploadImage, register_Controller.register);

router.get("/moviehome", register_Controller.movieHome);

router.get("/movie/:id", register_Controller.movieView);

router.get("/movieview/:id", register_Controller.movieView);

router.get("/edit-movie/:id", register_Controller.editMovie);

router.post(
  "/update-movie/:id",
  Movie.uploadImage,
  register_Controller.updateMovie
);

router.get("/delete-movie/:id", register_Controller.deleteMovie);

module.exports = router;
