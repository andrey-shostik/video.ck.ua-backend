var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Movie = new Schema({
  id: { type: Number, default: 0 },
  img: { type: String },
  name: { type: String },
  originalName: { type: String },
  country: { type: String },
  releaseDate: { type: String },
  during: { type: String }
});

var MovieModel = mongoose.model('Movie', Movie);

var movie = new MovieModel (
  {
    img: 'http://video.koma.tv/img/content/014/014736/e6abf9455bfe3ec517beba9bfe4f719d_155.jpg',
    name: 'Интерстеллар',
    originalName: 'Interstellar',
    country: 'США, Великобритания',
    releaseDate: '2014',
    during: '169 мин.'
  }
).save();

module.exports = MovieModel;
