const express = require('express');
const port = 8002;
const server = express();      
const path = require("path");

server.set("view engine", "ejs");
// server.use(express.urlencoded());  
server.use(express.static(path.join(__dirname, "public")));


server.get("/",  (req, res) => {
    return res.render("dashboard");
})
server.get("/dashboard2",  (req, res) => {
    return res.render("dashboard2");
})
server.get("/dashboard3",  (req, res) => {
    return res.render("dashboard3");
})
server.get("/theme",  (req, res) => {
    return res.render("theme");
})
server.get("/widgets",  (req, res) => {
    return res.render("widgets");
})
server.get("/info",  (req, res) => {
    return res.render("info");
})
server.get("/cards",  (req, res) => {
    return res.render("cards");
})









server.listen(port, () => {
    console.log('Server running at http://localhost:8002');
})