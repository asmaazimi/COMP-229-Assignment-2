//<!-- contact.js, Balkesa Azimi-301296835  Date: Sunday, June 18, 2023-->

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/contact')

//Helper function for guard purposes
function requireAuth(req, res, next)
{
    //Check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// Get Route for the Contact List page - READ Operation
router.get('/', contactController.displayContactList);

// Get Route for the Add page - CREATE Operation
router.get('/add', requireAuth, contactController.displayAddPage);

// Post Route for processing the Add page - CREATE Operation
router.post('/add', requireAuth, contactController.processAddPage);

// Get Route for displaying the Update page - UPDATE Operation
router.get('/update/:id', requireAuth, contactController.displayUpdatePage);

// Post Route for processing the Update page - UPDATE Operation
router.post('/update/:id', requireAuth, contactController.processUpdatePage);

// Get to perform Deletion - Delete Operation
router.get('/delete/:id', requireAuth, contactController.performDelete);

module.exports = router;
