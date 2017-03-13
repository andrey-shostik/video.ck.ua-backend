module.exports = function (app) {
  var log = require('../libs/log')(module);
  var MovieModel = require('../libs/mongoose').MovieModel;

  app.get('/api/movies', function (req, res) {
    return MovieModel.find(function (err, movies) {
      if (!err) {
        return res.send([movies[0]]);
      } else {
        res.statusCode = 500;
        log.error('Internal error(%d): %s', res.statusCode, err.message);
        return res.send({
          error: 'Server error'
        });
      }
    });
  });
};
