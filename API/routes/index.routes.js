const express = require('express');
const router = express.Router();
const { 
  register, 
  login, 
  forgotPassword,
  resetPassword,
  logout
} = require('../controllers/index.controller');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/logout', logout);

module.exports = router;