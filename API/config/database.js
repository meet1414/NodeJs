const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://5997siddhikhunt:siddhi1234@cluster0.9sgbj.mongodb.net/task-management');
    console.log('MongoDB Connected');
    return conn;
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
  }
};

module.exports = connectDB;
