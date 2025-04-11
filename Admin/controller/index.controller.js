const Admin = require("../model/admin.model");


exports.loginPage = (req, res) => {
   try {
      if(req.cookies && req.cookies.admin && req.cookies.admin._id != undefined){
         return res.redirect("/dashboard");
      }else
         return res.render("login");
   } catch (error) {
    console.log(error);
    return res.redirect("back");
   }
};


exports.dashboardPage = (req, res) => {
   try {
      if(!req.cookies || !req.cookies.admin || req.cookies.admin._id == undefined)
         return res.redirect("/");
      else
         return res.render("dashboard");
   } catch (error) {
    console.log(error);
    return res.redirect("back");
   }
};

exports.loginAdmin = async (req, res) => {
   try {
      const {email, password} = req.body;
      let admin = await Admin.findOne({email: email});
      console.log(admin)
      if(admin){
         if(admin.password == password){
            res.cookie("admin", admin);
            return res.redirect("/dashboard");
         }else{
            console.log("Password Not Match");
            return res.redirect("/");
         }
      }else{
         console.log("Admin Not Found");
         return res.redirect("/");   
      }  
     } catch (error) {
      console.log(error);
      return res.redirect("back");
     }
}




exports.logout=async(req,res)=>{
   res.clearCookie("admin");
   return res.redirect("/");
 }




 exports.verifyOtp = async (req, res) => {
   try {
       // console.log(req.body);
       // console.log(req.cookies);
       if (req.body.otp == req.cookies.otp) {
           return res.render("confirm-password");
       } else {
           console.log("OTP is not matched!!!!!");
           return res.redirect("back");
       }
   } catch (error) {
       console.log(error);
       return res.redirect("back");
   }
};

exports.passwordPage = (req, res) => {
   try {
       return res.render("forgotPassword/newPassword");
   } catch (error) {
       console.log(error);
       return res.redirect("back");
   }
};


exports.resetPassword = async (req, res) => {
   try {
     let { email } = req.cookies;
     if (req.body.password == req.body.cpassword) {
       let admin = await Admin.findOne({ email: email });
       if (admin) {
         await Admin.findByIdAndUpdate(admin._id, { password: req.body.password }, { new: true });
         console.log("Password changed!!!!!");
         res.clearCookie("email");
         res.clearCookie("otp");
         return res.redirect("/");
       } else {
         return res.redirect("/");
       }
     } else {
       console.log("New & Confirm password is not matched...");
       return res.redirect("back");
     }
   } catch (error) {
     console.log(error);
     return res.redirect("back");
   }
 };
 