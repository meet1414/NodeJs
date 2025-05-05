const Admin = require("../models/admin.model");
const transporter = require("../config/nodemailerConfig");
const passport = require("passport");


exports.getLogin = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect("/dashboard");
    }
    const successMsg = req.flash("success");
    const errorMsg = req.flash("error");

    res.render("AuthPages/login", {
        successMsg,
        errorMsg
    });
};

exports.postLogin = passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/",
});

exports.getDashboard = async (req, res) => {
    if (!req.isAuthenticated()) {
        return res.redirect("/");
    }

    try {
        const admin = req.user;
        res.render("dashboard", { admin });
    } catch (error) {
        res.send("Error loading dashboard");
    }
};




exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            console.log(err);
            return res.send("Error logging out");
        }
        req.session.destroy(() => {
            res.redirect("/");
        });
    });
};

exports.getForgotPasswordPage = (req, res) => {
    res.render("AuthPages/forgotpass");
};

exports.postForgotPassword = async (req, res) => {
    const { email } = req.body;

    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return res.send("Email not found!");
        }

        const otp = Math.floor(100000 + Math.random() * 900000);
        res.cookie("otp", otp, { httpOnly: true });
        res.cookie("resetEmail", email, { httpOnly: true });

        const mailOptions = {
            from: "6968meetbavisha@gmail.com",
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for resetting the password is: ${otp}`
        };

        await transporter.sendMail(mailOptions);

        res.redirect("/otp");
    } catch (error) {
        res.send("Error sending OTP.");
    }
};

exports.postOtpVerification = (req, res) => {
    const { otp } = req.body;

    if (req.cookies.otp == otp) {
        res.clearCookie("otp");
        res.redirect(`/newpass?email=${req.cookies.resetEmail}`);
    } else {
        res.send("Invalid OTP!");
    }
};

exports.getNewPasswordPage = (req, res) => {
    const email = req.query.email || req.cookies.resetEmail;
    if (!email) {
        return res.send("Session expired! Try again.");
    }
    res.render("AuthPages/newpass", { email });
};

exports.postNewPassword = async (req, res) => {
    const { password } = req.body;
    const email = req.cookies.resetEmail;

    if (!email) {
        return res.send("Session expired! Try again.");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await Admin.findOneAndUpdate({ email }, { password: hashedPassword });
        res.clearCookie("resetEmail");
        res.redirect("/");
    } catch (error) {
        res.send("Error resetting password.");
    }
};

exports.getViewProfile = async (req, res) => {
    try {
        if (!req.isAuthenticated()) return res.redirect("/");

        const admin = req.user; 
        res.render("AdminPages/viewProfile", { admin });
    } catch (error) {
        res.status(500).send("Error fetching profile");
    }
};

exports.getChangePasswordPage = (req, res) => {
    res.render("AuthPages/changePassword");
};

exports.postChangePassword = async (req, res) => {
    const { currentPassword, newPassword, confirmPassword } = req.body;
    const adminId = req.user._id;

    try {
        const admin = await Admin.findById(adminId);
        if (!admin) return res.send("User not found!");

        if (admin.password !== currentPassword) {
            return res.send("Current password is incorrect!");
        }

        if (newPassword !== confirmPassword) {
            return res.send("New password and Confirm password do not match!");
        }

        if (currentPassword === newPassword) {
            return res.send("New password must be different from current password!");
        }

        await Admin.findOneAndUpdate({ _id: adminId }, { password: newPassword });

        res.send("Password changed successfully!");
    } catch (error) {
        res.send("Error changing password.");
    }
};
