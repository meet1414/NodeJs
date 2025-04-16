const express = require('express');
const port = 8005;
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser");
const { initializingPassport } = require("./config/passportConfig");
const LocalStrategy=require("passport-local").Strategy
const expressSession=require("express-session")
const passport=require("passport")
const dbConnect=require("./config/dbConnection")
const flash = require("connect-flash");



dbConnect();
initializingPassport(passport);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/uploads",express.static(path.join(__dirname, 'uploads')));



app.use(expressSession({
  secret: 'test',
  resave: true,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 2 
  }
}));


app.use(flash());
app.use(passport.initialize())
app.use(passport.session())
app.use((req, res, next) => {
  console.log("Session ID:", req.sessionID);
  console.log("Session Object:", req.session);
  console.log("User:", req.user);
  next();
});
app.use(passport.setAuthenticateUser);

    app.use("/", require("./routes/index.routes"));


app.listen(port, ()=> {
    console.log(`server is running on port http://localhost:${port}`);
});