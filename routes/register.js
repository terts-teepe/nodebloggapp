const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');


// Render register form
router.get('/', function(req, res) {
	res.render('register')
})

// Create user to database
router.post('/', function(req, res){
	// Check if Username already exists
	db.User.findOne({
		where: { 
			username: req.body.username 
		}
	})
	.then( (user) =>{
		if (user){
			res.redirect('/register?message=' + encodeURIComponent("Username already exists"));
			// Put alert that username already exist
		}
		else {
			var password = req.body.password
			bcrypt.hash(req.body.password, 8, (err, hash)=>{
			db.User.create({
				username: req.body.username,
				password: hash
			})

				.then( (user) => {
					res.redirect('/?message=' + encodeURIComponent("User created"));
					// Alert that user registered worked
				})
			})
		}
	})
});

module.exports = router;