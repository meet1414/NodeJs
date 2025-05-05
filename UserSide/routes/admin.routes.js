const express = require("express"); 
const router = express.Router();
const adminController = require("../controllers/admin.controller");
const passport = require("passport");

const isAdminAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/");
};

router.get("/add-admin", isAdminAuthenticated, adminController.getAddAdminPage);
router.post("/add-admin", isAdminAuthenticated, adminController.postAddAdmin);
router.get("/view-admin", isAdminAuthenticated, adminController.getViewAdminPage);
router.get("/edit-admin/:id", isAdminAuthenticated, adminController.getEditAdminPage);
router.post("/update-admin/:id", isAdminAuthenticated, adminController.postUpdateAdmin);
router.get("/delete-admin/:id", isAdminAuthenticated, adminController.deleteAdmin);

router.get('/view-profile', adminController.viewProfile);

module.exports = router;
