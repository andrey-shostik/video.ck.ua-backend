var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Group', new Schema({
  code: { type: String, required: true, uppercase: true, unique: true },
}));

