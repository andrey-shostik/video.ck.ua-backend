var mongoose = require('mongoose');
var log      = require('./log')(module);
var config   = require('./config');
var MovieModel = require('./models/movie');
var UserModel = require('./models/user');
var GroupModel = require('./models/group');
var fixtures = require('node-mongoose-fixtures');

var userFixtures = require('./fixtures/users');
var movieFixtures = require('./fixtures/movies');
var groupFixtures = require('./fixtures/groups');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

db.on('error', function (err) {
  log.error('connection error:', err.message);
});

db.once('open', function callback () {
  log.info("Connected to DB!");
});

fixtures({
  User: userFixtures,
  Movie: movieFixtures,
  Group: groupFixtures
}, function(err, data) {
});

module.exports.UserModel = UserModel;
module.exports.MovieModel = MovieModel;
module.exports.GroupModel = GroupModel;

