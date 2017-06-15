const Sequelize = require('sequelize');
const connectionString = ('postgres://terts-teepe:weetikniet@localhost:5432/bullitin');
const db = new Sequelize(connectionString);

// defining elements of table user
const User = db.define('user', {
	username: Sequelize.STRING,
	password: Sequelize.STRING
});

// defining elements of table messagesblog
const Messagesblog = db.define('messagesblog', {
	title: Sequelize.STRING,
	author: Sequelize.STRING, 
	text: Sequelize.STRING
});

// defining elements of table comment
const Comment = db.define('comment', {
	text: Sequelize.STRING
});

//setting relations between tables
User.hasMany(Messagesblog);
Messagesblog.belongsTo(User)
Messagesblog.hasMany(Comment);
Comment.belongsTo(Messagesblog);
User.hasMany(Comment)
Comment.belongsTo(User)

//
db.sync({
	force: true, 
})

.then( yolo => {

	//create test data -- always do this after synchronizing the database, otherwise NodeJS with it's asynchronisity will fuck you up.
	User.create({
		username: 'terts-teepe',
		password: 'weetikniet'
	})
	.catch( e => console.log(e))
	.then(function(user) {	
		Messagesblog.create({
			title: 'firstpost',
			author: 'Ronaldo',
			text: 'I am the best football player in the world',
			userId: user.id
		})
		.then(function(messagesblog) {
			Comment.create({
			username: 'Messi',
			text: 'I am the best!',
			userId: user.id,
			messagesblogId: messagesblog.id
			})
		})
	})
	.catch( e => console.log(e))
})

.catch( e => console.log(e))

module.exports = {
  db: db,
  User: User,
  Messagesblog: Messagesblog,
  Comment: Comment
}
