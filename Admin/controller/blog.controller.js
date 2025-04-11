const Blog = require("../model/blog.model");
const express = require("express");
const path = require("path");
const app = express();


const dashboard = (req, res) => {
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

const registerForm = (req, res) => {
  res.render("blog_register");
};

const createBlog = async (req, res) => {
  let imagePath = "";
  if (req.file) {
    imagePath = path.join("uploads", req.file.filename);
  } else {
    console.log("show error");
    return res.status(400).send("Image is required");
  }

  req.body.image = imagePath;

  const blog = await Blog.create(req.body);
  return res.redirect("/dashboard")

 
};

const listBlog = async (req, res) => {
  const blog = await Blog.find();
  res.render("blog_list", { blog });
};

const viewBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  res.render("blog_view", { blog });
};


const editBlog = async (req , res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        return res.render("edit_blog", { blog });
    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
}

const updateBlog = async (req, res) => {
    try {
      let id = req.params.id;
      let blog = await Blog.findById(id);
  
      if (!blog) {
        console.log("Blog not found...");
        return res.redirect("back");
      }
  
      // Handle image replacement
      if (req.file) {
        if (blog.image) {
          let oldImagePath = path.join(__dirname, "..", blog.image);
          try {
            fs.unlinkSync(oldImagePath); // Remove old image
          } catch (error) {
            console.log("Old image not found or already deleted.");
          }
        }
  
        // Save new image path
        req.body.image = path.join("uploads", req.file.filename);
      }
  
      // Update the blog document
      await Blog.findByIdAndUpdate(id, req.body, { new: true });
  
      console.log("Blog updated successfully");
      return res.redirect("/blog/blog_list");
  
    } catch (error) {
      console.log(error);
      return res.redirect("back");
    }
  };


  const deleteBlog = async (req, res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        if(blog){

            if(blog.image != ""){
                let imagePath = path.join(__dirname, "..", blog.image);
                try {
                    await fs.unlinkSync(imagePath)
                } catch (error) {
                    console.log("File misssing...");
                }
            }
            await Blog.findByIdAndDelete(id);
            console.log("Blog Deleted Success");
            return res.redirect("/blog/blog_list");

        }else{
            console.log("Blog not Found....");
            return res.redirect("back");
        }

    } catch (error) {
        console.log(error);
        return res.redirect("back");
    }
};


module.exports = {
  dashboard,
  registerForm,
  createBlog,
  listBlog,
  viewBlog,
  editBlog,
  updateBlog,
  deleteBlog
};
