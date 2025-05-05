const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://6968meetbavisha:meetbavisha123@cluster0.ds2ps78.mongodb.net/admin-panel');
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

module.exports = connectDB();