const express = require('express');
const app = express();
const port = 8005;
const dbConnection = require("./config/dbConnection");
const User = require("./model/user.model");
const path =require("path")
const multer = require('multer');
app.use(express.static(path.join(__dirname, 'public')));

app.set("view engine", "ejs");
app.use(express.urlencoded());


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, './public'))
    },
    filename: function (req, file, cb) {
      const name = Date.now() + '-' + file.originalname;
     cb(null,name);
    }
  })
  
  const upload = multer({ storage: storage })


app.get("/", async(req, res) => {
    let users = await User.find();
    // console.log(users);
    return res.render('index', {users});
})

app.post("/add-user", upload.single("image"),async (req , res) => {
    req.body.image = req.file.filename;
    let user = await User.create(req.body);
    if(user){
        return res.redirect("/bookList");
    }else{
        return res.redirect("back");
    }
})

// Book List Route (New Route to Display Users)
app.get("/bookList", async (req, res) => {
    let users = await User.find();
    return res.render('bookList', { users });  // Ensure bookList.ejs exists
});



app.get("/delete-user/:id", async (req, res) => {
    let id = req.params.id;
    // let user = await User.findById(id);
    let user = await User.findByIdAndDelete(id);
    // console.log(user);
    return res.redirect("/bookList");
})

app.get("/edit-user/:id", async (req, res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(user){
        return res.render("editUser", {user});
    }else{
        return res.redirect("back");
    }
    // console.log(user);
})




app.post("/update-user/:id", upload.single("image"), async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        
        if (!user) {
            return res.redirect("back");
        }

        // If a new image is uploaded, update the image field
        if (req.file) {
            req.body.image = req.file.filename;
        } else {
            req.body.image = user.image; // Retain old image if no new one is uploaded
        }

        await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Update Successful");
        return res.redirect("/bookList");
    } catch (error) {
        console.error("Error updating user:", error);
        return res.redirect("back");
    }
});


app.listen(port, () => {
    console.log('Server start at http://localhost:8005')    
} )