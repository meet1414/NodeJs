const express = require('express');
const router = express.Router();
const {
  getProfile,
  updateProfile,
  updatePassword,
  uploadProfileImage
} = require('../controllers/user.controller');
const { protect } = require('../middleware/auth');
const { uploadProfileImage: uploadImage, handleUploadError } = require('../middleware/upload');

router.get('/profile', protect, getProfile);
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);
router.post('/profile/image', protect, uploadImage, handleUploadError, uploadProfileImage);

module.exports = router;