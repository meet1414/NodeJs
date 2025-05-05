const LocalStrategy = require("passport-local").Strategy;
const Admin = require("../models/admin.model");

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField: 'email'
    }, async (email, password, done) => {
        try {
            const admin = await Admin.findOne({ email });

            if (!admin) {
                return done(null, false, { message: "No user found" });
            }
            if (admin.password !== password) {
                return done(null, false, { message: "Incorrect password" });
            }

            return done(null, admin);
        } catch (error) {
            return done(error);
        }
    }));

    passport.serializeUser((admin, done) => {
        done(null, admin.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const admin = await Admin.findById(id);
            done(null, admin);
        } catch (error) {
            done(error, null);
        }
    });
};


