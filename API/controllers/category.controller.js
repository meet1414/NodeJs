const Category = require('../models/category.model');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ createdBy: req.user.id }).sort('name');
    
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

exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!category) {
      return res.status(404).json({
        
        message: 'Category not found'
      });
    }
    
    return res.status(200).json({
      
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    req.body.createdBy = req.user.id;
    
    const existingCategory = await Category.findOne({
      name: req.body.name,
      createdBy: req.user.id
    });
    
    if (existingCategory) {
      return res.status(400).json({
        
        message: 'Category with this name already exists'
      });
    }
    
    const category = await Category.create(req.body);
    
    return res.status(201).json({
      
      message: 'Category created successfully',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    let category = await Category.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!category) {
      return res.status(404).json({
        
        message: 'Category not found'
      });
    }
    
    if (req.body.name && req.body.name !== category.name) {
      const existingCategory = await Category.findOne({
        name: req.body.name,
        createdBy: req.user.id,
        _id: { $ne: req.params.id }
      });
      
      if (existingCategory) {
        return res.status(400).json({
          
          message: 'Category with this name already exists'
        });
      }
    }
    
    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    return res.status(200).json({
      
      message: 'Category updated successfully',
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      createdBy: req.user.id
    });
    
    if (!category) {
      return res.status(404).json({
        
        message: 'Category not found'
      });
    }
    await category.remove();
    
    return res.status(200).json({
      
      message: 'Category deleted successfully'
    });
  } catch (error) {
    return res.status(500).json({
      
      message: 'Server error',
      error: error.message
    });
  }
};
