var db = require('../models')
var async = require('async')
var gravatar = require('gravatar')

exports.findUserById = function(_userId, callback) {
  db.User.findOne({
    _id: _userId
  }, callback)
}

exports.findByEmailOrCreate = function(userInfo, callback) {
  db.User.findOne({
    name: userInfo[0]
  }, function(err, user) {
    if (user) {
      callback(null, user)
    } else {
      //http://top.jboyi.com/images/66.png   analyst
      user = new db.User
      user.name = userInfo[0]
      user.email = userInfo[2]
      user.password=userInfo[1]
      user.avatarUrl = "http://top.jboyi.com/images/0.png"
      user.save(callback)
    }
  })
}

exports.online = function(_userId, callback) {
  db.User.findOneAndUpdate({
    _id: _userId
  }, {
    $set: {
      online: true
    }
  }, callback)
}

exports.offline = function(_userId, callback) {
  db.User.findOneAndUpdate({
    _id: _userId
  }, {
    $set: {
      online: false
    }
  }, callback)
}

exports.getOnlineUsers = function(callback) {
  db.User.find({
    online: true
  }, callback)
}

exports.joinRoom = function (join, callback) {
  db.User.findOneAndUpdate({
    _id: join.user._id
  }, {
    $set: {
      online: true,
      _roomId: join.room._id
    }
  }, callback)
}

exports.leaveRoom = function (leave, callback) {
  db.User.findOneAndUpdate({
    _id: leave.user._id
  }, {
    $set: {
      online: true,
      _roomId: null
    }
  }, callback)
}

exports.getById = function(userId,callback) {
     async.parallel([
            function(done) {
              db.User.find({
                belong_analyst: userId,
                online: true
              }, function(err, online_users) {
                done(err, online_users)
              })
            },
            function(done) {
              db.User.find({
                belong_analyst: userId,
                online: false
              }, null,function(err, offline_users) {
                done(err, offline_users)
              })
            }
          ],
          function(err, results) {
            if (err) {
              callback(err)
            } else {
              var user={
                online_user:results[0],
                offline_user:results[1]
              }

              callback(null, user)
            }
          }
      );
    }

exports.getOnlineById= function (userId, callback) {
  db.User.find({
    belong_analyst: userId,
    online: true
  }, callback)
}

exports.getOfflineById= function (userId, callback) {
  db.User.find({
    belong_analyst: userId,
    online: false
  }, callback)
}
