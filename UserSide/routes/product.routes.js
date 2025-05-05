const express = require('express');
const { addProductPage, addNewProduct, getAllProducts, getProduct, editProductPage, updateProduct, deleteProduct } = require('../controllers/product.controller');
const Product = require("../models/product.model");

const routes = express.Router();

routes.get("/add-product", addProductPage);
routes.post("/add-product", Product.uploadImage, addNewProduct);
routes.get("/view-product", getAllProducts);
routes.get("/single-product/:id", getProduct);

// Edit and Update
routes.get("/edit/:id", editProductPage);
routes.post("/edit/:id", Product.uploadImage, updateProduct);

// Delete
routes.get("/delete/:id", deleteProduct);

module.exports = routes;