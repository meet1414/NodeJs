const Admin = require("../model/admin.model");


exports.loginPage = (req, res) => {
   try {
         return res.render("login");
   } catch (error) {
    console.log(error);
    return res.redirect("back");
   }
};


exports.dashboardPage = (req, res) => {
   try {
         return res.render("dashboard");
   }catch (error) {
    console.log(error);
    return res.redirect("back");
   }
};

exports.loginAdmin = async (req, res) => {
   try {
      const {email, password} = req.body;
      let admin = await Admin.findOne({email: email});
      console.log(admin)
      req.flash("success", "Login Success");
      if(admin){
         if(admin.password == password){
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


exports.adminLogout = async (req, res) => {
   req.session.destroy((err) => {
     if (err) {
       return res.redirect("/"); 
     } else {
       res.clearCookie("connect.sid", {
         path: '/', 
       });
       return res.redirect("/");
     }
   });
 }
 
 exports.verifyOtp = async (req, res) => {
   try {
     
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
 
 exports.changePasswordPage = async (req, res) => {
  return res.render('changePassword')
}

exports.changePassword = async (req, res) => {
  try {
      const {newPass, curPass, confPass} = req.body;
      if(curPass == req.user.password){
          if(curPass == newPass){
              console.log("Current and New Password both are Same.");
              return res.redirect("back");
          }else{
              if(newPass == confPass){
                  await Admin.findByIdAndUpdate(req.user._id, {password: newPass}, {new: true});
                  req.flash("success", "User Password Changed Successfully");
                  console.log("Password is Changed...");
                  return res.redirect("/dashboard");
              }else{
                  console.log("New and Confirm Password both are not Same.");
                  return res.redirect("back");
              }
          }
      }else{
          console.log("Current password is not matched");
          return res.redirect("back");
      }
  } catch (error) {
      console.log(error);
      return res.redirect("back");
  }
}
