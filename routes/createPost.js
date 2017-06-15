const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// Create Post (GET) 
router.get('/', function (req, res) {
  res.render('createPost')
})

// Submitting a BLOG (POST)
router.post('/', function (req, res) {
    db.Messagesblog.create({
        title: req.body.title,
        author: req.body.author,
        text: req.body.text,
        userId: req.session.user.id
    })
    
    .then(function() {
      console.log("post posted")
      res.redirect('/profile');
    });
})

module.exports = router;