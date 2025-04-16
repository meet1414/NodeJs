const express = require("express");
const route = express.Router();                   
const app = express();                   
const blogController = require("../controller/blog.controller");                                          
const Blog = require("../model/blog.model");                                          
                                                                                                                          
                                                                                                                          
route.get("/dashboard", blogController.dashboard);                                                                                                                          
route.get("/blog_post", blogController.registerForm);                                                                                                                          
                                                                                                                                          
                                                                                                                                          
                                                                                                                                          
                                                                                                                                          
                                                                                                                                          
                                                                                                                                          
                                                                                                                                          
route.post("/blog_post", Blog.uploadImage, blogController.createBlog);                                                                                                                          
route.get("/blog_list", blogController.listBlog);                                                                                                                          
route.get("/blog_view/:id", blogController.viewBlog);                                                                                                                          
route.get("/edit-blog/:id", blogController.editBlog);       
route.post("/delete-blog/:id", blogController.deleteBlog);                                                                                                                          

route.post("/update-blog/:id", Blog.uploadImage, blogController.updateBlog);
                                                                                                                            
module.exports = route;                                                                                                                          
                                                                                                                          