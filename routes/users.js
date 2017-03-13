module.exports = function (app) {
  var log = require('../libs/log')(module);
  var User = require('../libs/mongoose').UserModel;
  var jwt = require('jsonwebtoken');
  var bcrypt = require('bcrypt');

  function generateToken(user) {
    var u = {
     name: user.name,
     username: user.username,
     admin: user.admin,
     _id: user._id.toString(),
     image: user.image
    };
    return token = jwt.sign(u, 'secret', {
       expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
  }

  app.get('/api/users', function (req, res) {
    return User.find(function (err, users) {
      if (!err) {
        return res.send(users);
      } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({
          error: 'Server error'
        });
      }
    });
  });

  app.post('/api/users/signup', function(req, res) {
    console.log(req.body);
     var body = req.body;
     var hash = bcrypt.hashSync(body.password.trim(), 10);
     var user = new User({
      username: body.username.trim(),
      email: body.email.trim(),
      password: hash,
      admin: false,
      moderator: false
     });
     user.save(function(err, user) {
        if (err) throw err;
        var token = generateToken(user);
        res.json({
           user: user,
           token: token
        });
     });
  });

  app.post('/api/users/signin', function(req, res) {
    User
    .findOne({email: req.body.email})
    .exec(function(err, user) {
      if (err) throw err;
      if (!user) {
        return res.status(404).json({
          error: true,
          message: 'Email or Password is Wrong'
        });
      }
      bcrypt.compare(req.body.password, user.password,
        function(err, valid) {
          if (!valid) {
            return res.status(404).json({
              error: true,
              message: 'Email or Password is Wrong'
            });
          }
          var token = generateToken(user);
          // user = getCleanUser(user);
          res.json({
            user: user,
            token: token
          });
        });
     });
  });
};
