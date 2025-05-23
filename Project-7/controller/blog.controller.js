const Blog = require("../model/blog.model");
const express = require("express");
const path = require("path");
const app = express();
const fs=require("fs")
const fsPromises = fs.promises;

const dashboard = (req, res) => {
  try {
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
  req.flash("success", "Blog Added Success");
  return res.redirect("/blog/blog_post")

 
};

const listBlog = async (req, res) => {
  const perPage = 3; 
  const page = parseInt(req.query.page) || 1;
  const category = req.query.category || 'all'; 

  try {
    const totalBlogsQuery = category === 'all' 
      ? Blog.countDocuments() 
      : Blog.countDocuments({ category }); 

    const totalBlogs = await totalBlogsQuery;

    const blogQuery = category === 'all' 
      ? Blog.find() 
      : Blog.find({ category }); 

    const blog = await blogQuery
      .skip((page - 1) * perPage)
      .limit(perPage);

    res.render("blog_list", {
      blog,
      current: page,
      pages: Math.ceil(totalBlogs / perPage),
      category, 
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
};

const viewBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  req.flash("success", "New Blog Added Successfully");
  res.render("blog_view", { blog });
};


const editBlog = async (req , res) => {
    try {
        let id = req.params.id;
        let blog = await Blog.findById(id);
        req.flash("success", "Edit Blog Successfully");
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
      req.flash("success", "Blog Updated Successfully");
  
      if (!blog) {
        console.log("Blog not found...");
        return res.redirect("back");
      }
  
    
      if (req.file) {
        if (blog.image) {
          let oldImagePath = path.join(__dirname, "..","uploads", blog.image);
          try {
            fs.unlinkSync(oldImagePath); 
          } catch (error) {
            console.log("Old image not found or already deleted.");
          }
        }
  
      req.body.image = path.join("uploads", req.file.filename);
      }
  
      
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
    const id = req.params.id;
    let blog = await Blog.findById(id);
    req.flash("success", "Blog Deleted Successfully");
    if (blog) {
    if (blog.image && blog.image !== "") {
      let imagePath = path.join(__dirname, "..", blog.image);

      try {
       await fs.unlinkSync(imagePath); 
      } catch (error) {
        console.log("Old image not found or already deleted.");
      }
    }
    await Blog.findByIdAndDelete(id);

  }


    return res.redirect("/blog/blog_list");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send("Internal Server Error");
  }
};

const CategoryBlog=(req,res)=>{
 
} 

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
