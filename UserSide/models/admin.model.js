const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,
    gender: String, 
    hobbies: Array,
    image: String
});

module.exports = mongoose.model("Admin", AdminSchema);