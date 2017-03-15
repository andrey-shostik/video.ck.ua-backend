var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Movie', new Schema({
  img: { type: String, requie: true },
  name: { type: String, requie: true },
  originalName: { type: String, requie: true },
  country: { type: String, requie: true },
  releaseDate: { type: String, requie: true },
  during: { type: String, requie: true }
}));
