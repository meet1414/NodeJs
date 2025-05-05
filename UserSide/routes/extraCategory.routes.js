const express = require('express');
const { extraCategoryPage, viewExtraCategoryPage, addExtraCategory, deleteExtraCategory, editExtraCategory, updateExtraCategory } = require('../controllers/extraCategory.controller');

const routes = express.Router();

routes.get("/add-extraCategory", extraCategoryPage);
routes.post("/add-extraCategory", addExtraCategory);
routes.get('/view-extraCategory', viewExtraCategoryPage);
routes.get("/delete-extraCategory/:id", deleteExtraCategory);
routes.get("/edit-extraCategory/:id", editExtraCategory);
routes.post("/update-extraCategory/:id", updateExtraCategory);

module.exports = routes;

