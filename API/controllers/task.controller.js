const Task = require('../models/task.model');
const Category = require('../models/category.model');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id })
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
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    }).populate('category', 'name color');
    
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

exports.createTask = async (req, res) => {
  try {
    req.body.user = req.user.id;
    
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({
        
        message: 'Category not found'
      });
    }
    
    const task = await Task.create(req.body);
    
    return res.status(201).json({
      
      message: 'Task created successfully',
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
    let task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
    if (!task) {
      return res.status(404).json({
        
        message: 'Task not found'
      });
    }
    
    task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    }).populate('category', 'name color');
    
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
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id
    });
    
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
