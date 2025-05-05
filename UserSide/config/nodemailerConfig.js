const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "meetbavisha14@gmail.com",
        pass: "tjumhgzpajsgudge" 
    }
});

module.exports = transporter;