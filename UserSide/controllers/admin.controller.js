const Admin = require("../models/admin.model");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

const upload = multer({ storage }).single("image");

const getAdminData = async (req) => {
    if (!req.cookies.adminAuth) return null;
    return await Admin.findById(req.cookies.adminAuth);
};

exports.getAddAdminPage = async (req, res) => {
    const admin = await getAdminData(req);
    res.render("AdminPages/addAdmin", { admin });
};

exports.getViewAdminPage = async (req, res) => {
    try {
        const admins = await Admin.find();
        const admin = await getAdminData(req);
        res.render("AdminPages/viewAdmin", { admins, admin });
    } catch (error) {
        res.status(500).send("Error fetching admins");
    }
};

exports.postAddAdmin = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).send(err.message);

        try {
            const { firstname, lastname, email, password, gender, hobbies } = req.body;
            const image = req.file ? req.file.filename : null;

            const newAdmin = new Admin({ firstname, lastname, email, password, gender, hobbies, image });
            await newAdmin.save();
            
            res.redirect("/admin/view-admin");
        } catch (error) {
            res.status(500).send("Error adding admin");
        }
    });
};
exports.getEditAdminPage = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        const loggedInAdmin = await getAdminData(req);
        res.render("AdminPages/editAdmin", { admin, loggedInAdmin });
    } catch (error) {
        res.status(500).send("Error fetching admin details");
    }
};

exports.postUpdateAdmin = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) return res.status(400).send(err.message);

        try {
            const { firstname, lastname, email, password, gender, hobbies } = req.body;
            const admin = await Admin.findById(req.params.id);
            if (!admin) return res.status(404).send("Admin not found");

            let newImage = admin.image;
            if (req.file) {
                newImage = req.file.filename;
                if (admin.image && admin.image !== "default-avatar.png") {
                    const oldImagePath = path.join(__dirname, "../uploads/", admin.image);
                    if (fs.existsSync(oldImagePath)) {
                        fs.unlinkSync(oldImagePath);
                    }
                }
            }

            await Admin.findByIdAndUpdate(req.params.id, {
                firstname,
                lastname,
                email,
                password,
                gender,
                hobbies,
                image: newImage
            });

            res.redirect("/admin/view-admin");
        } catch (error) {
            res.status(500).send("Error updating admin");
        }
    });
};

exports.deleteAdmin = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (!admin) return res.status(404).send("Admin not found");

        if (admin.image && admin.image !== "default-avatar.png") {
            const imagePath = path.join(__dirname, "../uploads/", admin.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        await Admin.findByIdAndDelete(req.params.id);
        res.redirect("/admin/view-admin");
    } catch (error) {
        res.status(500).send("Error deleting admin");
    }
};

exports.getDashboard = async (req, res) => {
    try {
        const admin = await Admin.findById(req.cookies.adminAuth);
        res.render("AdminPages/dashboard", { admin });
    } catch (error) {
        res.status(500).send("Error fetching admin data");
    }
};

exports.viewProfile = (req, res) => {
    res.render('view-profile', {
        title: 'Admin Profile',
        admin: {
            name: 'Admin User',
            email: 'admin@example.com'
        }
    });
};
