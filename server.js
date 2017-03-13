var express = require('express'),
  bodyParser = require('body-parser'),
  log = require('./libs/log')(module),
  path = require('path'), // модуль для парсинга пути
  app = express(),
  config = require('./libs/config');

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  if (req.method === 'OPTIONS') {
    res.end();
  }
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

require('./routes')(app);

app.get('/ErrorExample', function (req, res, next) {
  next(new Error('Random error!'));
});

app.use(function (req, res, next) {
  if (req.method != 'OPTIONS') {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({
      error: 'Not found'
    });
  }
  return;
});

app.use(function (err, req, res, next) {
  if (req.method != 'OPTIONS') {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({
      error: err.message
    });
  }
  return;
});

app.listen(config.get('port'), function () {
  log.info('Express server listening on port ' + config.get('port'));
});
