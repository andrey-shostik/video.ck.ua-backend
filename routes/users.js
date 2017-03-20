module.exports = function (app) {
  var log = require('../libs/log')(module);
  var jwt = require('jsonwebtoken');
  var bcrypt = require('bcrypt');
  var User = require('../libs/mongoose').UserModel;
  var Group = require('../libs/mongoose').GroupModel;

  function generateToken(user) {
    var u = {
     _id: user._id.toString(),
     username: user.username,
     groups: user.groups
    };
    return token = jwt.sign(u, 'secret', {
       expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
  }

  app.get('/api/users', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else if (req.user.groups.indexOf('ADMIN') === -1) {
      res.statusCode = 401;
        res.send({
        error: 'Access denied'
      });
    } else {
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
    }
  });

  app.post('/api/users/signup', function(req, res) {
    var body = req.body;
    var hash = bcrypt.hashSync(body.password.trim(), 10);
    var user = new User({
      username: body.username.trim(),
      email: body.email.trim(),
      password: hash,
      groups: []
    });

    function saveUser(user) {
      user.save(function(err, user) {
        if (err) { return res.send({ error: err.errmsg }); }
        res.json({
          user: user
        });
      });
    }

    Group.find({ code: 'USER' }, function (err, group) {
      if (err) { return res.send({ error: err.errmsg }); }
      if (!group.length) {
        var group = new Group({
          code: 'USER'
        });

        group.save(function (err, group) {
          if (err) { return res.send({ error: err.errmsg })};
          user.groups.push(group.code);

          saveUser(user);
        })
      } else {
        user.groups.push(group);

        saveUser(user);
      }
    })
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
          res.json({
            user: user,
            token: token
          });
        });
     });
  });


  app.delete('/api/users/:id', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else if (req.user.groups.indexOf('ADMIN') === -1) {
      res.statusCode = 401;
        res.send({
        error: 'Access denied'
      });
    } else {
      return UserModel.findById(req.params.id, function (err, user) {
        if (!user) {
          res.statusCode = 404;
          return res.send({
            error: 'Not found'
          });
        }
        return user.remove(function (err) {
          if (!err) {
            log.info("user removed");
            return res.send({
              status: 'OK'
            });
          } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
              error: 'Server error'
            });
          }
        });
      });
    }
  });
};
