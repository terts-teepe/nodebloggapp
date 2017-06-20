const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Render index form
router.get('/', function(req, res) {
	res.render('index')
})

router.post('/', bodyParser.urlencoded({extended: true}), function (request, response) {
    if(request.body.username.length === 0) {
        response.redirect('/?message=' + encodeURIComponent("Please fill out your username"));
        return;
    }

    if(request.body.password.length === 0) {
        response.redirect('/?message=' + encodeURIComponent("Please fill out your password."));
        return;
    }

	db.User.findOne({
    	where: {
        username: request.body.username
    	}
	})

	.then(function (user) {
        bcrypt.compare(request.body.password, user.password, function (err, hash) {
            if (hash === true) {
                request.session.user = user;
                response.redirect('/profile');
            }	
            else {
                response.redirect('/?message=' + encodeURIComponent("Invalid email or password."));
            }
	    }) 
    })
})
    

module.exports = router;


