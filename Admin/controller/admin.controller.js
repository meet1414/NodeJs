const Admin = require("../model/admin.model");
const path = require("path");
const fs = require("fs");

exports.viewAdminPage = async (req, res) => {
    try {
        if(!req.cookies || !req.cookies.admin || req.cookies.admin._id == undefined)
            return res.redirect("/");
         else{
        let admins = await Admin.find({});
        return res.render("view_admin", { admins })}
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}
exports.addAdminPage = async (req, res) => {
    try {
        if(!req.cookies || !req.cookies.admin || req.cookies.admin._id == undefined)
            return res.redirect("/");
         else
        return res.render("add_admin")
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}

exports.addNewAdmin = async (req, res) => {
    try {
        let imagePath = "";
        if (req.file) {
            imagePath = `/uploads/${req.file.filename}`;
        }
        req.body.profileImage = imagePath;
        let admin = await Admin.create(req.body);
        console.log("Admin Added Success");
        return res.redirect("back");
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}

exports.deleteAdmin = async (req, res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);
        if(admin){

            if(admin.profileImage != ""){
                let imagePath = path.join(__dirname, "..", admin.profileImage);
                try {
                    await fs.unlinkSync(imagePath)
                } catch (error) {
                    console.log("File misssing...");
                }
            }
            await Admin.findByIdAndDelete(id);
            console.log("Admin Deleted Success");
            return res.redirect("back");

        }else{
            console.log("Admin not Found....");
            return res.redirect("back");
        }

    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};

exports.editAdmin = async (req , res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);
        return res.render("edit_admin", { admin });
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}

exports.updateAdmin = async (req , res) => {
    try {
        let id = req.params.id;
        let admin = await Admin.findById(id);
        if(admin){
            if(req.file){
                if(admin.profileImage != ""){
                    let imagePath = path.join(__dirname, "..", admin.profileImage);
                    try {
                        await fs.unlinkSync(imagePath)
                    } catch (error) {
                        console.log("File misssing...");
                    }
                }
                let filePath = `/uploads/${req.file.filename}`;
                req.body.profileImage = filePath;
            }
            await Admin.findByIdAndUpdate(id, req.body, {new: true});
            console.log("Admin Updated Success");
            return res.redirect("/admin/view-admin");

        }else{
            console.log("Admin not Found....");
            return res.redirect("back");
        }
        
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}

exports.adminProfile = async (req, res) => {
    try {
      const adminId = req.cookies.admin._id; 
  
      const admin = await Admin.findById(adminId);
  
      return res.render('admin_profile', { admin });
    } catch (error) {
      console.error("Error fetching admin profile:", error);
      return res.redirect('/login');
    }
  };