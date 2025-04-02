const mongoose = require("mongoose");

const ConnectDB = () => {
  try {
    mongoose
      .connect(
        "mongodb+srv://6968meetbavisha:meetbavisha123@cluster0.ds2ps78.mongodb.net/movies"
      )
      .then(() => console.log(" Mongodb is Connected"));
  } catch (error) {
    console.log(error);
  }
};
module.exports = ConnectDB();
