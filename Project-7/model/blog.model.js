const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  },
  about: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
  },
  write: {
    type: String,
  },
  visited: {
    type: Number,
    default: 0,
  },
  tags: {
    type: [String],
    default: [],
  },
  date: {
    type: Date,
    get: function (value) {
      if (!value) return null;
      const options = { month: "short", day: "numeric", year: "numeric" };
      return value.toLocaleDateString("en-US", options);
    },
  },
  time: {
    type: String,
  },
  likes: {
    type: Number,
    default: 0,
  },
  category: {
    type: String,
    required: true,
  },
  read: {
    type: Number,
    required: true,
  },
  view: {
    type: String,
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

blogSchema.statics.uploadImage = multer({ storage: storage }).single("image");
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
