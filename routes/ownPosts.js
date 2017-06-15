const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');
const session = require('express-session');

// View profile with the matching blog posts
router.get('/', function(req, res) {
	const userSession = req.session.user
	console.log("test", userSession);
	if(req.session.user){

		db.Messagesblog.findAll({ where: { userId: userSession.id } })
		.then(ownPosts => {
			res.render('ownPosts',
				{blogPosts: ownPosts,
				user: userSession})
		})
	}
	else {
		res.redirect('/')
	}
})

module.exports = router;