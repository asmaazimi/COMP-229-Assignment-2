//<!-- index.js, Balkesa Azimi-301296835  Date: Sunday, June 18, 2023-->

var express = require('express');
var router = express.Router();

let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.displayHomePage);

/* GET home page. */
router.get('/home', indexController.displayHomePage);

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET projects page. */
router.get('/projects', indexController.displayProjectsPage);

/* GET services page. */
router.get('/services', indexController.displayServicesPage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

/* Get Route for displaying the Login Page */
router.get('/auth/login', indexController.displayLoginPage);

/* Post Route for processing the Login Page */
router.post('/auth/login', indexController.processLoginPage);

/* Get Route for displaying the Register Page */
router.get('/auth/register', indexController.displayRegisterPage);

/* Get Route for processing the Register Page */
router.post('/auth/register', indexController.processRegisterPage);

/* Get to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;