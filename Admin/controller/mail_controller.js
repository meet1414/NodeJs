const nodemailer = require("nodemailer");
const Admin = require("../model/admin.model");
const sendEmail = async (req, res) => {
    try {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            let otp = Math.floor(Math.random() * 1000000);

            await sendOTPEmail(req.body.email, otp);
            res.cookie("otp", otp);
            res.cookie("email", admin.email);

            return res.render("Otp_Page");
        } else {
            console.log("Admin not found....");
            return res.redirect("back");
        }
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};


const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
        user: "meetbavisha14@gmail.com",
        pass: "tjumhgzpajsgudge",
    },
});

const sendOTPEmail = async (recieverEmail, OTP) => {
    await transporter.sendMail({
        from: 'singhsuraj90810@gmail.com', 
        to: `${recieverEmail}`, 
        subject: "Reset Password", 
        html: `<html>
        <body>
            <h2> Hello User!!!!! </h2>
            <p>Your Node Application Reset Password OTP is: ${OTP}</p>
        </body>
        </html>`,
    });
};
module.exports={sendEmail,sendOTPEmail}