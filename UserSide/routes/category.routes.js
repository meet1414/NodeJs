const express = require('express');
const {
  addCategoryPage, addCategory, viewCategories, deleteCategory,editCategoryPage, updateCategory} = require("../controllers/category.controller");
const Category = require("../models/category.model");

const routes = express.Router();

routes.get("/add-category", addCategoryPage);
routes.post("/add-category", Category.uploadImage, addCategory);

routes.get("/view-category", viewCategories);

routes.get("/delete-category/:id", deleteCategory);

routes.get("/edit-category/:id", editCategoryPage);
routes.post("/edit-category/:id", Category.uploadImage, updateCategory);

module.exports = routes;
