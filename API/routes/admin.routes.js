const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getAllTasks,
  getUserTasks,
  getTask,
  updateTask,
  deleteTask,
  getAllCategories
} = require('../controllers/admin.controller');
const { protect, authorize } = require('../middleware/auth');

router.use(protect);
router.use(authorize('admin'));

router.get('/users/all', getUsers);
router.get('/users/view/:id', getUser);
router.put('/users/update/:id', updateUser);
router.delete('/users/remove/:id', deleteUser);

router.get('/tasks/all', getAllTasks);
router.get('/users/:userId/tasks/all', getUserTasks);
router.get('/tasks/view/:id', getTask);
router.put('/tasks/update/:id', updateTask);
router.delete('/tasks/remove/:id', deleteTask);

router.get('/categories/all', getAllCategories);

module.exports = router;
