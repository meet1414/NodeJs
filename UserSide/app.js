const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("passport");
const indexRoutes = require("./routes/index.routes");
const flash = require("connect-flash");
const flashConnect = require("./config/flashConnect");

const PORT = 5005;
const app = express();


app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(flash());



app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(
    session({
        name: "test",
        secret: "admin",
        resave: true,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60, 
        },
    })
);

require("./config/passportStr")(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flashConnect.setFlash);


app.use((req, res, next) => {
    res.locals.admin = req.isAuthenticated() ? req.user : null;
    next();
});

app.use("/", indexRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));