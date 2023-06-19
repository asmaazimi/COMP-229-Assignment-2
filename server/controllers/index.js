//<!-- index.js, Balkesa Azimi-301296835  Date: Sunday, June 18, 2023-->

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');


// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', { title: 'Home', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('About', { title: 'About', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('Projects', { title: 'Projects', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('Services', { title: 'Services', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayContactPage = (req, res, next) => {
    res.render('Contact', { title: 'Contact', displayName: req.user ? req.user.displayName : '' });
}

module.exports.displayLoginPage = (req, res, next) => {
    //Check if the user is already logged in
    if(!req.user)
    {
        res.render('auth/login',
        {
            title: "Login",
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        //Server err?
        if(err)
        {
            return next(err);
        }
        //Is there a user login err?
        if(!user){
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            //server err?
            if(err)
            {
                return next(err);
            }
            return res.redirect('/contacts-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    //Check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: "Register",
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    //Initialize an user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        if(err)
        {
            console.log(err);
            console.log("Error: Inserting New User");
            if(err.name == 'UserExistsError')
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!');
            }
            return res.render('auth/register',
            {
                title: "Register",
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            //If registration is success
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/contacts-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout((err) => {
        if (err)
        {
            //Handle error here
            console.log(err);
            return next(err);
        }
        return res.redirect('/');
    });
}

