const express = require('express');
const router = express.Router();
const db = require('../models/database.js');
const bodyParser = require('body-parser');

// Render index form
router.get('/', function(req, res) {

		db.Messagesblog.findAll({
			//Include the Comment and User table from the database so that they become accessible in the allPosts pugfile.
			include: [
				{
					model: db.Comment,
					include: [{
						model: db.User
					}]
				}]
		})
	.then( allPosts => {
		res.render('allPosts', {
			blogPosts: allPosts

		})
	})
});

module.exports = router;