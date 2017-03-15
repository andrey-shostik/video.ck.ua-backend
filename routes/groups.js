module.exports = function (app) {
  var log = require('../libs/log')(module);
  var GroupModel = require('../libs/mongoose').GroupModel;

  app.get('/api/groups', function (req, res) {
    return GroupModel.find(function (err, groups) {
      if (!err) {
        return res.send(groups);
      } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({
          error: 'Server error'
        });
      }
    });
  });

  app.post('/api/groups', function (req, res) {
    var group = new GroupModel({
      code: req.body.code
    });

    group.save(function (err) {
      if (!err) {
        log.info("group created");
        return res.send({
          status: 'OK',
          group: group
        });
      } else {
        if (err.name == 'ValidationError') {
          res.statusCode = 400;
          res.send({
            error: 'Validation error'
          });
        } else {
          res.statusCode = 500;
          res.send({
            error: 'Server error'
          });
        }
        log.error('Internal error(%d): %s', res.statusCode, err.message);
      }
    });
  });
};
