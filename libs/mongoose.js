var mongoose = require('mongoose');
var log      = require('./log')(module);
var config   = require('./config');
var MovieModel = require('./models/movie');
var UserModel = require('./models/user');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
  log.error('connection error:', err.message);
});

db.once('open', function callback () {
  log.info("Connected to DB!");
});

module.exports.UserModel = UserModel;
module.exports.MovieModel = MovieModel;
