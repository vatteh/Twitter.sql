var Sequelize = require('sequelize');

module.exports = function(sequelize) {
    var User = sequelize.define('User', {
      name: Sequelize.STRING,
      pictureUrl: Sequelize.STRING
    }, {
      timestamps: false  // this will deactivate the time columns
    });

    return User;
};