const Admin = require("../model/admin.model");
const LocalStrategy = require("passport-local").Strategy;
const passport = require("passport");


exports.initializingPassport = (passport) => {
    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const user = await Admin.findOne({ email });
                    if (!user) {
                        return done(null, false, { message: "No user with that email" });
                    }
                    if (password !== user.password) {  
                        return done(null, false, { message: "Password incorrect" });
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            }
        )
    );

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Admin.findById(id);
            done(null, user);
        } catch (error) {
            done(error);
        }
    });
}

exports.isAuthenticated = (req, res, next) => {
    if (req.user) {
        return next();
    }
    res.redirect("/");
}

passport.checkAuthenticat = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    } else{
        res.redirect("/");
    }
}

passport.setAuthenticateUser = (req, res, next) => {
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
}
