const Movie = require("../models/register_model");
const path = require("path");

const register = async (req, res) => {
  req.body.image = req.file ? req.file.filename : null;

  try {
    const movie = await Movie.create(req.body);
    if (movie) {
      console.log("Data Send to DB");
      const movies = await Movie.find();
      res.render("movie_home", { movies });
    } else {
      console.log("Show error on Send data");
    }
  } catch (error) {
    console.log(error);
  }
};

const movieHome = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.render("movie_home", { movies });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies");
  }
};

const editMovie = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.render("movie_edit", { movie });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movies");
  }
};

const fs = require("fs");

const updateMovie = async (req, res) => {
  try {
    let id = req.params.id;
    let movie = await Movie.findById(id);

    if (!movie) {
      req.flash("error", "Movie not found");
      return res.redirect("back");
    }

    if (req.file) {
      if (!req.file.mimetype.startsWith("image/")) {
        req.flash("error", "Only image files are allowed");
        return res.redirect("back");
      }

      if (movie.image) {
        let oldImagePath = path.join(__dirname, "..", "uploads", movie.image);

        try {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
            console.log("Old image deleted:", movie.image);
          }
        } catch (err) {
          console.error("Error deleting old image:", err);
        }
      }

      req.body.image = req.file.filename;
    }

    const updatedMovie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMovie) {
      req.flash("error", "Failed to update movie");
      return res.redirect("back");
    }

    console.log("Movie updated successfully");
    res.redirect(`/movie/${updatedMovie._id}`);
  } catch (error) {
    console.error("Error updating movie:", error);
    req.flash("error", "Internal Server Error");
    res.redirect("back");
  }
};
const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    let movie = await Movie.findById(id);

    if (!movie) {
      return res.redirect("/");
    }

    if (movie.image && movie.image !== "") {
      let imagePath = path.join(__dirname, "..", "uploads", movie.image);

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Movie.findByIdAndDelete(id);

    res.redirect("/moviehome");
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).send("Internal Server Error");
  }
};
const movieView = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).send("Movie not found");
    }
    res.render("movie_view", { movie });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching movie");
  }
};
module.exports = {
  register,
  movieHome,
  movieView,
  editMovie,
  updateMovie,
  deleteMovie,
};
