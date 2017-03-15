module.exports = function ( app ) {
  require('./movies')(app);
  require('./users')(app);
  require('./groups')(app);

  app.get('/api', function (req, res) {
    res.send('API is running');
  });
};
