module.exports = function (app) {
  var log = require('../libs/log')(module);
  var MovieModel = require('../libs/mongoose').MovieModel;

  app.get('/api/movies/:id', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else {
      return MovieModel.findById(req.params.id, function (err, movie) {
        if (!movie) {
          res.statusCode = 404;
          return res.send({
            error: 'Not found'
          });
        }
        if (!err) {
          return res.send({
            status: 'OK',
            movie: movie
          });
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

  app.get('/api/movies', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else {
      return MovieModel.find(function (err, movies) {
        if (!err) {
          return res.send(movies);
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

  app.post('/api/movies', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else {
      var movie = new MovieModel({
        img: req.body.img,
        name: req.body.name,
        originalName: req.body.originalName,
        country: req.body.country,
        releaseDate: req.body.releaseDate,
        during: req.body.during
      });

      movie.save(function (err) {
        if (!err) {
          log.info("movie created");
          return res.send({
            status: 'OK',
            movie: movie
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
    }
  });

  app.delete('/api/movies/:id', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else {
      return MovieModel.findById(req.params.id, function (err, movie) {
        if (!movie) {
          res.statusCode = 404;
          return res.send({
            error: 'Not found'
          });
        }
        return movie.remove(function (err) {
          if (!err) {
            log.info("movie removed");
            return res.send({
              status: 'OK',
              id: movie._id
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

  app.put('/api/movies/:id', function (req, res) {
    if (!req.headers.authorization) {
      res.statusCode = 403;
        res.send({
        error: 'Authorization error'
      });
    } else {
      return MovieModel.findById(req.params.id, function (err, movie) {
        if (!movie) {
          res.statusCode = 404;
          return res.send({
            error: 'Not found'
          });
        }

        movie.img = req.body.img,
        movie.name = req.body.name,
        movie.originalName = req.body.originalName,
        movie.country = req.body.country,
        movie.releaseDate = req.body.releaseDate,
        movie.during = req.body.during

        return movie.save(function (err) {
          if (!err) {
            log.info("movie updated");
            return res.send({
              status: 'OK',
              movie: movie
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
    }
  });

};
