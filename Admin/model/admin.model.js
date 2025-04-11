const mongoose = require("mongoose");

const multer = require("multer");
const path = require("path");


const adminSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    gender: {
        type: String,
        enum: ["Male", "Female"]
    },
    hobbies: {
        type: Array
    },
    mobileNo: {
        type: String
    },
    profileImage: {
        type: String
    }
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "uploads"));
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}`);
    }
})


adminSchema.statics.uploadImage = multer({storage: storage}).single("profileImage")

const Admin = mongoose.model("Admin", adminSchema);
module.exports = Admin;