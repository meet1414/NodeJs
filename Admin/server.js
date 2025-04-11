const express = require('express');
const port = 8005;
const app = express();
const path = require('path');
const dbConnect = require("./config/dbConnection");
const cookieParser = require("cookie-parser");


// middlewares
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads",express.static(path.join(__dirname, 'uploads')));



app.use("/", require("./routes/index.routes"));


app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}`);
});