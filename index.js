const express = require('express')
const port = 8000;
const app = express()
const env = require('dotenv').config()
const session = require('express-session')
const passport = require('passport')
require('./passport-google');
// middleware
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}))

app.use(session({
    name: 'random',
    secret: 'anything',
    saveUninitialized: false,//if the user is not logged in then also it tries to save the user data thats'why it is false
    resave: false,// baar data ko save na kare if login ho toh
    maxAge: 20 * 60 * 1000
}))
//custom middlewares
const isLoggedIn = (req, res, next) => {
    if (req.user) {
        next();
    }
    else {
        res.send("Acess Denied")
    }
}
app.use(passport.initialize())
app.use(passport.session())
// routes
app.get('/', (req, res) => {
    res.send("Home Page Of Application")
})
app.get('/failed', (req, res) => {
    res.send("You failed to login in to th system")
})
app.get('/profile', isLoggedIn, (req, res) => {
    res.send("Profile Page of Yours")
})

app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/failed' }),
    function (req, res) {
        // Successful authentication, redirect home.
        res.redirect('/profile');
    });

app.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.send("Logged Out Sucessfully")
    })
})

app.listen(port, (err) => {
    if (err) {
        console.log(`${err}`)
    }

    console.log(`server is running on the ${port}`)
})