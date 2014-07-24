var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/gist_app');
var schema = new mongoose.Schema({
  name: String,
  path: String,
  type: String,
  content: String
});

module.exports = mongoose.model('Gist', schema);
