const express = require("express");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");

const app = express();
const todoRoutes = require("./routes/todoRoutes");

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use("/", todoRoutes);

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
