module.exports = function (io) {
  var express = require('express');
  var router = express.Router();
  // could use one line instead: var router = require('express').Router();
  var User = require('../models').User;
  var Tweet = require('../models').Tweet;

  router.get('/', function (req, res) {

    Tweet.findAll({ 
      include: [ User ] }).then(function(tweets) {
        res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true } );        
    });
  });

  router.get('/users/:name', function(req, res) {

    var name = req.params.name;

    User.find({
      where: {name: name}
        }).then(function(user) {

          Tweet.findAll({ 
            where: {userId: user.id},
            include: [ User ] }).then(function(tweets) {
              res.render( 'index', { title: 'Twitter.js - Posts by '+ name, tweets: tweets, showForm: true } );        
            });

    });
  });

  router.get('/users/:name/tweets/:id', function(req, res) {
    
    var tweetId = req.params.id;

    Tweet.findAll({ 
      where: {id: tweetId},
      include: [ User ] }).then(function(tweets) {
        res.render( 'index', { title: 'Twitter.js - Tweet number ' + tweetId , tweets: tweets, showForm: true } );        
      });  
  });

  router.post('/submit', function(req, res) {

    var name = req.body.name;
    var text = req.body.text;
    var newTweet;
    User.find({ where: {name: name} }).then(function(user) {
      if (user === null) {
        User.create({ name: name}).then( function(user) {
          newTweet = Tweet.create({UserId:user.id, tweet:text}).then(function(user) {
            newTweet = newTweet._boundTo.dataValues;
            newTweet.name = name;
            io.sockets.emit('new_tweet', newTweet);
            res.redirect('/');
          });
        });
        
      } else {
        newTweet = Tweet.create({UserId:user.id, tweet:text}).then(function(user) {
            newTweet = newTweet._boundTo.dataValues;
            newTweet.name = name;
            io.sockets.emit('new_tweet', newTweet);
            res.redirect('/');
        });
      }
    });
    
  });

  return router;
};