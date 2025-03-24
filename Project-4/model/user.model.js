const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    bookname: String,
    author: String,
    publicationdate: String,
    price: String,
    description: String,
    quantity: String,
    image: String

});


module.exports = mongoose.model('User', userSchema);