const express = require('express');
const { dashboardPage, loginPage, loginAdmin, logout, verifyOtp, resetPassword } = require('../controller/index.controller');

const routes = express.Router();
const mailController = require("../controller/mail_controller");


routes.get("/", loginPage);

routes.post("/login", loginAdmin);
routes.get("/logout",logout)
routes.get("/dashboard", dashboardPage);

routes.use("/admin", require("./admin.routes"));
routes.use("/blog", require("./blog.routes"));
routes.post("/sendMail",mailController.sendEmail)
routes.post("/verifyOtp",verifyOtp)
routes.post("/verify-Password",resetPassword)



module.exports = routes;