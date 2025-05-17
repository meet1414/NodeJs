const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://6968meetbavisha:meetbavisha123@cluster0.ds2ps78.mongodb.net/admin-panel');
    console.log('MongoDB Connected');
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
