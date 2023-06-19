//users.js, Balkesa Azimi-301296835  Date: Sunday, June 18, 2023

const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;

