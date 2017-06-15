const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// Create Post (GET) 
router.get('/', function (req, res) {
  res.render('comment')
})

router.post('/', function (req, res) {
    db.Comment.create({
		text: req.body.text,
		userId: req.session.user.id,
		messagesblogId: req.body.aap
    })
    
    .then(function() {
      console.log("post posted");
      res.redirect('/allPosts');
    });
})

module.exports = router;
