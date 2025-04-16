const express = require('express');
const passport=require("passport")
const { isAuthenticated } = require("../config/passportConfig");


const { dashboardPage, loginPage, loginAdmin, logout, verifyOtp, resetPassword, adminLogout, changePasswordPage, changePassword } = require('../controller/index.controller');

const routes = express.Router();
const mailController = require("../controller/mail_controller");


routes.get("/", loginPage);

routes.post("/login", passport.authenticate("local", { 
    failureRedirect: "/", 
    failureFlash: true 
}), loginAdmin);

routes.get("/logout",adminLogout)                                                                               
                                                                               
                                                                               
routes.get("/dashboard",isAuthenticated, dashboardPage);                                                                               
                                                                               
routes.use("/admin",isAuthenticated, require("./admin.routes"));                                                                               
routes.use("/blog", isAuthenticated,require("./blog.routes"));                                                                               
routes.post("/sendMail",mailController.sendEmail)                                                                               
routes.post("/verifyOtp",verifyOtp)                                                                               
routes.post("/verify-Password",resetPassword)                                                                               
routes.get("/change-password",isAuthenticated, changePasswordPage);                                                                               
routes.post("/change-password", changePassword);                                                                               
                                                                               
                                                                               
                                                                               
module.exports = routes;                                                                               