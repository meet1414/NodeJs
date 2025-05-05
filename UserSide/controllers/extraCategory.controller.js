 const Category = require("../models/category.model");
const SubCategory = require("../models/subCategory.model");
const ExtraCategory=require("../models/extraCategory.model")


exports.extraCategoryPage = async (req, res) => {
  try {
    let categories = await Category.find();
    let subCategories = await SubCategory.find();
    return res.render("ExtraCategory/add_extraCategory", {categories, subCategories})
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.addExtraCategory = async (req, res) => {
  try {
    const { categoryId, subCategoryId, extraCategory } = req.body;

    await ExtraCategory.create({
      categoryId,
      subCategoryId,
      extraCategory
    });
    req.flash('success', 'Extra Category added successfully!');
    return res.redirect('/extraCategory/view-extraCategory');
  } catch (error) {
    console.log(error);
    req.flash('error', 'Failed to add Extra Category.');
    return res.redirect('back');
  }
};

exports.viewExtraCategoryPage = async (req, res) => {
  try {
    let extraCategories = await ExtraCategory.find()
      .populate("categoryId")
      .populate("subCategoryId");

    return res.render("ExtraCategory/view_extraCategory", { extraCategories });
  } catch (error) {
    console.log(error);
    req.flash("error", "Something went wrong while loading Extra Categories!");
    return res.redirect("back");
  }
};


exports.deleteExtraCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let extraCategory = await ExtraCategory.findById(id);
    if(extraCategory){
      await ExtraCategory.findByIdAndDelete(id);
      req.flash("success", "Extra Category Delete Success");
      return res.redirect("back");
    }else{
      req.flash("error", "Extra Category not Found");
      return res.redirect("back");
    }
    
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.editExtraCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let extraCategory = await ExtraCategory.findById(id);
    if(extraCategory){
      let categories = await Category.find();
    let subCategories = await SubCategory.find();
      return res.render("ExtraCategory/edit_extraCategory", {extraCategory, categories, subCategories});
    }else{
      req.flash("error", "Extra Category not Found");
      return res.redirect("back");
    }
    
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};

exports.updateExtraCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let extraCategory = await ExtraCategory.findById(id);
    if(extraCategory){
      await ExtraCategory.findByIdAndUpdate(id, req.body, {new: true});
      req.flash("success", "Extra Category Update Success");
      return res.redirect("/extracategory/view-extraCategory");
    }else{
      req.flash("error", "Extra Category not Found");
      return res.redirect("back");
    }
    
  } catch (error) {
    console.log(error);
    req.flash("error", "Somthing Wrong!!!");
    return res.redirect("back");
  }
};