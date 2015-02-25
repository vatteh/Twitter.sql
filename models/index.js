var Sequelize = require('sequelize'),
    sequelize = new Sequelize('twitterjs', 'root', null, {
      dialect: "mysql",
      port:    3306,
    })

sequelize
  .authenticate()
  .complete(function(err) {
    if (!!err) {
      console.log('Unable to connect to the database:', err)
    } else {
      console.log('Connection has been established successfully.')
    }
  })

var Tweet = require('./tweet.js')(sequelize);
var User = require('./user.js')(sequelize);

User.hasMany(Tweet);
Tweet.belongsTo(User);

module.exports = {
    User: User,
    Tweet: Tweet
};