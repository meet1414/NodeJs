const Category = require("../models/category.model");
const fs = require("fs");
const path = require("path");
const SubCategory = require("../models/subCategory.model");


exports.addCategoryPage = async (req, res) => {
  try {
    return res.render("Category/add_category");
  } catch (error) {
    console.log("Something Went Wrong =>", error);
    return res.redirect("back");
  }
};

exports.addCategory = async (req, res) => {
  try {
    let imagePath = "";
    if (req.file) {
      imagePath = `/uploads/${req.file.filename}`;
    }

    req.body.categoryImage = imagePath;

    const category = await Category.create(req.body);

    if (category) {
      return res.redirect("/category/view-category");
    } else {
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Something went wrong ===> ", error);
    return res.redirect("back");
  }
};

exports.viewCategories = async (req, res) => {
  try {
    let categories = await Category.find({});
    res.render("Category/view_category", { categories });
  } catch (error) {
    console.log("Error => ", error);
    res.redirect("back");
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    
    if (category) {
      if (category.categoryImage !== "") {
        let imagePath = path.join(__dirname, "..", category.categoryImage);
        try {
          await fs.unlinkSync(imagePath);
        } catch (error) {
          console.log("File Missing...");
        }
      }
      
      await Category.findByIdAndDelete(id);
      await SubCategory.deleteMany({ category: id });
      
      return res.redirect('back');
    } else {
      return res.redirect('back');
    }
  } catch (error) {
    console.log("Something went wrong ===> ", error);
    return res.redirect('back');
  }
};



exports.editCategoryPage = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.redirect("back");
    }
    res.render("Category/edit_category", { category });
  } catch (error) {
    console.log("Error loading edit page =>", error);
    return res.redirect("back");
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findById(id);

    if (!category) {
      return res.redirect("back");
    }

    if (req.file) {
      if (category.categoryImage) {
        const oldPath = path.join(__dirname, "..", "public", category.categoryImage);
        try {
          fs.unlinkSync(oldPath);
        } catch (error) {
          console.log("Old image not found or already deleted.");
        }
      }

      req.body.categoryImage = `/uploads/${req.file.filename}`;
    } else {
      req.body.categoryImage = category.categoryImage; 
    }

    await Category.findByIdAndUpdate(id, req.body);
    return res.redirect("/category/view-category");
  } catch (error) {
    console.log("Error updating category =>", error);
    return res.redirect("back");
  }
};

