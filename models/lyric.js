var mongoose = require('mongoose');

var lyricSchema = new mongoose.Schema({
  author: { type: String, default: 'Anonymous' },
  title:  { type: String, required: true },
  chorus: { type: String, required: false },
  verse:  { type: [String], required: false }
});

// validation: chorus can be undefined, or verse can be empty, but not both

module.exports = mongoose.model('Lyric', lyricSchema);
