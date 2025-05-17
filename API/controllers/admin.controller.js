const User = require('../models/user.model');
const Task = require('../models/task.model');
const Category = require('../models/category.model');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({ role: 'user' }).select('-password');
    
    return res.status(200).json({
      
      count: users.length,
      data: users
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        
        message: 'User not found'
      });
    }
    
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

exports.updateUser = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        
        message: 'User not found'
      });
    }
    
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).select('-password');
    
    return res.status(200).json({
      
      message: 'User updated successfully',
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    
    if (!user) {
      return res.status(404).json({
        
        message: 'User not found'
      });
    }
    
    await Task.deleteMany({ user: req.params.id });
    
    await Category.deleteMany({ createdBy: req.params.id });
    
    await user.remove();
    
    return res.status(200).json({
      
      message: 'User and all related data deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('user', 'name email')
      .populate('category', 'name color')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getUserTasks = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    
    if (!user) {
      return res.status(404).json({
        
        message: 'User not found'
      });
    }
    
    const tasks = await Task.find({ user: req.params.userId })
      .populate('category', 'name color')
      .sort({ createdAt: -1 });
    
    return res.status(200).json({
      
      count: tasks.length,
      data: tasks
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id)
      .populate('user', 'name email')
      .populate('category', 'name color');
    
    if (!task) {
      return res.status(404).json({
        
        message: 'Task not found'
      });
    }
    
    return res.status(200).json({
      
      data: task
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.updateTask = async (req, res) => {
  try {
    let task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        
        message: 'Task not found'
      });
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    })
      .populate('user', 'name email')
      .populate('category', 'name color');
    
    return res.status(200).json({
      
      message: 'Task updated successfully',
      data: task
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    // Check if task exists
    const task = await Task.findById(req.params.id);
    
    if (!task) {
      return res.status(404).json({
        
        message: 'Task not found'
      });
    }
    
    await task.remove();
    
    return res.status(200).json({
      
      message: 'Task deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find()
      .populate('createdBy', 'name email')
      .sort('name');
    
    return res.status(200).json({
      
      count: categories.length,
      data: categories
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};
