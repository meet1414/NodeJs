const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index.controller");
const passport = require("passport");

router.use("/user", require("./user.routes"));

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

router.get("/", indexController.getLogin);
router.post("/login", passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
}));

router.get("/logout", indexController.logout);
router.get("/dashboard", isAuthenticated, indexController.getDashboard);
router.get("/view-profile", isAuthenticated, indexController.getViewProfile);
router.get("/forgotpass", indexController.getForgotPasswordPage);
router.post("/forgotpass", indexController.postForgotPassword);
router.post("/otp", indexController.postOtpVerification);
router.get("/newpass", indexController.getNewPasswordPage);
router.post("/newpass", indexController.postNewPassword);
router.get("/change-password", isAuthenticated, indexController.getChangePasswordPage);
router.post("/change-password", isAuthenticated, indexController.postChangePassword);

router.use("/admin", require("./admin.routes"));
router.use("/blogs", require("./blogs.routes"));

router.use("/category", isAuthenticated, require("./category.routes"));
router.use("/subCategory",isAuthenticated, require('./subCategory.routes'));
router.use("/extraCategory", isAuthenticated, require('./extraCategory.routes'));
router.use("/product" , require("./product.routes"));

module.exports = router;
