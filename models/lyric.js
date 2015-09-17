var mongoose = require('mongoose');

var lyricSchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous' },
  title: String,
  chorus: String,
  verse: { type: [String], required: false }
});

module.exports = mongoose.model('Lyric', lyricSchema);
