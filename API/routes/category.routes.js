const express = require('express');
const router = express.Router();
const {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/category.controller');
const { protect } = require('../middleware/auth');

router.get('/all', protect, getCategories);
router.get('/view/:id', protect, getCategory);
router.post('/create', protect, createCategory);
router.put('/update/:id', protect, updateCategory);
router.delete('/remove/:id', protect, deleteCategory);

module.exports = router;
