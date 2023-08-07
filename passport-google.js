const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy

//tell your passport to use google strategy
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID,
    clientSecret: process.env.SECRET,
    callbackURL: "http://localhost:8000/google/callback"
},
    function (acessToken, refreshToken, profile, done) {
        return done(null, profile);
    }


))

//serilaizeer
passport.serializeUser(function (user, done) {
    done(null, user)
})



//deserializer
passport.deserializeUser