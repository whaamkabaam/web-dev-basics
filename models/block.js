const mongoose = require('mongoose');

const blockSchema = new mongoose.Schema({
  time: String,
  activity: String,
  project: String
});

module.exports = mongoose.model('Block', blockSchema);
