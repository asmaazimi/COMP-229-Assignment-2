//<!-- contact.js, Balkesa Azimi-301296835  Date: Sunday, June 18, 2023-->
let mongoose = require('mongoose');

//Create a model class
let contactModel = mongoose.Schema({
    name: String,
    number: String,
    email: String
},
{

collection: 'contacts'
});


module.exports = mongoose.model('Contact', contactModel);


