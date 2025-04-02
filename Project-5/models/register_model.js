const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const movieSchema = new mongoose.Schema({
  moviename: { type: String, required: true },
  language: { type: String, required: true },

  hours: { type: Number, required: true },
  minutes: { type: Number, required: true },

  votes: { type: Number, required: true },
  rating: {
    type: Number,
    min: 0,
    max: 10,
    required: true,
  },
  genre: [
    {
      type: String,
      enum: [
        "Action",
        "Adventure",
        "Comedy",
        "Drama",
        "Horror",
        "Thriller",
        "Mystery",
        "Romance",
        "Science-Fiction",
        "Fantasy",
        "Crime",
        "Historical",
        "War",
        "Documentary",
        "Superhero",
      ],
    },
  ],
  date: { type: Date, required: true },
  about: { type: String, required: true },
  image: { type: String, required: true },
  format: [
    {
      type: String,
      enum: [
        "2D",
        "3D",
        "IMAX 2D",
        "IMAX 3D",
        "4DX",
        "Dolby Cinema",
        "ScreenX",
        "RPX",
        "D-Box",
        "MX4D",
        "UltraAVX",
        "4K",
      ],
    },
  ],
  certificate: {
    type: String,
    enum: ["U", "UA", "A", "S", "UA7", "UA13", "UA16"],
    required: true,
  },
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

movieSchema.statics.uploadImage = multer({ storage: storage }).single("image");

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
