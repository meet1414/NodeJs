const multer = require('multer');
const path = require('path');
const fs = require('fs');

const createDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

createDir(path.join(__dirname, '../uploads/profiles'));

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/profiles'));
  },
  filename: (req, file, cb) => {
    cb(null, `user-${req.user ? req.user._id : 'new'}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

exports.uploadProfileImage = multer({
  storage: profileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
}).single('profileImage');

exports.handleUploadError = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({ 
       
      message: `Upload error: ${err.message}` 
    });
  } else if (err) {
    return res.status(400).json({ 
       
      message: err.message 
    });
  }
  next();
}; 