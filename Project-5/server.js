const express = require("express");
const path = require("path");
const app = express();
const ConnectDB = require("./db/ConnectDB");
const mongoose = require("mongoose");
const register_route = require("./routes/route_register");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/", register_route);

app.listen(3000, (req, res) => {
  console.log("Server is running on port http://localhost:3000");
});
