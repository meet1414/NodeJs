const mongoose = require("mongoose");
const multer = require("multer");
const path = require('path');


const categorySchema = mongoose.Schema({
    category: {
        type: String
    },
    categoryImage: {
        type: String
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});


categorySchema.statics.uploadImage = multer({storage: storage}).single('categoryImage');

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
