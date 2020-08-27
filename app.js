const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const passportLocalMongoose = require('passport-local-mongoose');
const User = require('./models/user');

mongoose.connect('mongodb://localhost/auth_demo', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');


// PASSPORT ==================================================================

app.use(require('express-session')({
    secret: '2020',
    resave: false,
    saveUninitialized: false
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser()); // Encoding session
passport.deserializeUser(User.deserializeUser()); // Decoding session

// ROUTES =====================================================================

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) => {
    res.render('secret')
});

app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if(err) {
            console.log(err);
            return res.render('register')
            
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/secret');
            });
        }
    });
});

app.listen(3000, () => {
    console.log('Server is running');
});