const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    
    return res.status(200).json({
      
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    
    const updateData = {
      name,
      email
    };
    
    const user = await User.findByIdAndUpdate(req.user.id, updateData, {
      new: true,
      runValidators: true
    });
    
    return res.status(200).json({
      
      message: 'Profile updated successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(req.user.id).select('+password');
    
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        
        message: 'Current password is incorrect'
      });
    }
    
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    await user.save();
    
    return res.status(200).json({
      
      message: 'Password updated successfully'
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        
        message: 'Please upload a file'
      });
    }
    
    const user = await User.findById(req.user.id);
    if (user.profileImage !== 'default-profile.jpg') {
      const oldImagePath = path.join(__dirname, '../uploads/profiles/', user.profileImage);
      if (fs.existsSync(oldImagePath)) {
        fs.unlinkSync(oldImagePath);
      }
    }
    
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: req.file.filename },
      { new: true }
    );
    
    return res.status(200).json({
      
      message: 'Profile image uploaded successfully',
      data: {
        profileImage: updatedUser.profileImage
      }
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};
