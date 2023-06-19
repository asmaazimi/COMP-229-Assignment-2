
//<!-- app.js, Balkesa Azimi-301296835  Date: Sunday, June 18, 2023--

// Installed 3rd party packages
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

let session = require('express-session');
let passport = require('passport');
let passportLocal = require('passport-local');
let localStrategy = passportLocal.Strategy;
let flash = require('connect-flash');

// Database setup
const mongoose = require('mongoose');
const DB = require('./db');

const indexRouter = require('../routes/index');
const usersRouter = require('../routes/users');
const contactRouter = require('../routes/contact');
// Point mongoose to the DB URI
mongoose.connect(DB.URI);

const mongoDB = mongoose.connection;
mongoDB.on('error', console.error.bind(console, 'Connection Error:'));
mongoDB.once('open', () => {
  console.log('Connected to MongoDB...');
});

const app = express();

// Set the views directory
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs'); // express -e

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../node_modules')));


// Setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}));

// Initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

//Create a User Model Instance
let userModel = require('../models/user');
let User = userModel.User;

//Implement User Authentication Strategy
passport.use(User.createStrategy());

//Serialize and deserialize the User Info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Define routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/contacts-list', contactRouter);

//Route handler for handling form submission on the root path
app.post('/', (req, res) => {
  //Redirect the user to the home page
  res.redirect('/');
});

// Error handling middleware
// Catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

// Export the app module
module.exports = app;
