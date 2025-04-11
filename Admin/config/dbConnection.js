const mongoose = require("mongoose");


const dbConnect = () => {
    mongoose.connect('mongodb+srv://6968meetbavisha:meetbavisha123@cluster0.ds2ps78.mongodb.net/admin-panel')
    .then(()=> console.log("DB is Connected"))
    .catch((err) => console.log(err));
}

module.exports = dbConnect();