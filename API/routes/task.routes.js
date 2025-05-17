const express = require('express');
const router = express.Router();
const {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask
} = require('../controllers/task.controller');
const { protect } = require('../middleware/auth');

router.get('/all', protect, getTasks);
router.get('/view/:id', protect, getTask);
router.post('/create', protect, createTask);
router.put('/update/:id', protect, updateTask);
router.delete('/remove/:id', protect, deleteTask);

module.exports = router;
