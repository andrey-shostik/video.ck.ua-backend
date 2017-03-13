module.exports = function ( app ) {
  require('./movies')(app);
  require('./users')(app);

  app.get('/api', function (req, res) {
    res.send('API is running');
  });
};
