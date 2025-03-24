const mongoose = require('mongoose');


const dbConnect = () => {
    mongoose.connect("mongodb://localhost:27017/express")
    .then(() => console.log("Database connected"))
    .catch((err) => console.log(err));
    
}



module.exports = dbConnect();