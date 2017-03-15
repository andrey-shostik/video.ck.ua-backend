var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var validateEmail = function(email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

module.exports = mongoose.model('User', new Schema({
  username: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true,
    trim: true,
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password:{ type: String, required: true },
  groups: { type: Array }
}));
