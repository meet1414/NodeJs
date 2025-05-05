const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model.js");

exports.viewSubCategory = async (req, res) => {
    try {
      let subCategories = await SubCategory.find().populate("category");
      return res.render("Subcategory/view_subCategory", { subCategories });
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };
  
  exports.addSubCategoryPage = async (req, res) => {
    try {
      let categories = await Category.find();
      return res.render("Subcategory/add_subCategory", { categories });
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };
  
  exports.addSubCategory = async (req, res) => {
    try {
      const subCate = await SubCategory.create(req.body);
      return res.redirect("back");
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };
  
  exports.deleteSubCategory = async (req, res) => {
    try {
      let id = req.params.id;
      let subCategory = await SubCategory.findById(id);
  
      if (subCategory) {
        await SubCategory.findByIdAndDelete(id);
        return res.redirect("back");
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };
  
  exports.editSubCategoryPage = async (req, res) => {
    try {
      let id = req.params.id;
      let subCategory = await SubCategory.findById(id);
      if (subCategory) {
        let categories = await Category.find();
        return res.render("Subcategory/edit_subCategory", { categories, subCategory });
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };
  

  exports.editSubCategory = async (req, res) => {
    try {
      const id = req.params.id;
      const updatedData = {
        category: req.body.category,  
        subCategory: req.body.subCategory  
      };
  
      let subCategory = await SubCategory.findByIdAndUpdate(id, updatedData, { new: true });
      
      if (subCategory) {
        return res.redirect("/subCategory/view-subCategory");  
      } else {
        return res.redirect("back");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };
  