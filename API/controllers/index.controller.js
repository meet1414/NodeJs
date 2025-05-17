const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendOTPEmail } = require('../config/nodemailer');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        
        message: 'Email already registered'
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'task-management', 
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      secure: false 
    });

    user.password = undefined;
    
    return res.status(201).json({
      
      message: 'User registered successfully',
      data: { user, token }
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        
        message: 'Invalid credentials'
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        
        message: 'Invalid credentials'
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      'task-management',
      { expiresIn: '7d' }
    );

    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, 
      secure: false 
    });

    user.password = undefined;
    
    return res.status(200).json({
      
      message: 'Login successful',
      data: { user, token }
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        
        message: 'User not found'
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    user.resetPasswordOTP = otp;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    
    await user.save();

    const emailSent = await sendOTPEmail(user.email, otp);
    
    if (!emailSent) {
      return res.status(500).json({
        
        message: 'Error sending email. Please try again.'
      });
    }

    return res.status(200).json({
      
      message: 'OTP sent to your email'
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordExpire: { $gt: Date.now() }
    }).select('+password');

    if (!user) {
      return res.status(400).json({
        
        message: 'Invalid or expired OTP'
      });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    
    user.resetPasswordOTP = undefined;
    user.resetPasswordExpire = undefined;
    
    await user.save();

    return res.status(200).json({
      
      message: 'Password reset successful'
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  return res.status(200).json({
    
    message: 'Logged out successfully'
  });
};
