const express = require('express');
const { addAdminPage, addNewAdmin, viewAdminPage, deleteAdmin, editAdmin, updateAdmin, adminProfile, adminLogout } = require('../controller/admin.controller');
const Admin = require("../model/admin.model");
const adminRoutes = express.Router();

adminRoutes.get("/add-admin", addAdminPage);

adminRoutes.post("/add-admin", Admin.uploadImage,  addNewAdmin);

adminRoutes.get("/view-admin", viewAdminPage);
adminRoutes.get("/delete-admin/:id", deleteAdmin);
adminRoutes.get("/edit-admin/:id", editAdmin);

adminRoutes.post("/update-admin/:id", Admin.uploadImage, updateAdmin);
adminRoutes.get("/admin_profile",adminProfile)
module.exports = adminRoutes;