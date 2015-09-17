var Lyric = require(__dirname + '/../models/lyric');
var express = require('express');
var jsonParser = require('body-parser').json();

var lyricsRoute = module.exports = exports = express.Router();

lyricsRoute.get('/lyrics/:title', jsonParser, function(req, resp) {
  Lyric.find(req.params, function(err, data) {
    if (err) {
      console.log(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    if ((!data) || (0 === data.length)) {
      return resp.status(404).json({msg: 'title not found'});
    }
    else {
      resp.json(data);
    }
  });
});

lyricsRoute.get('/lyrics', function(req, resp) {
  console.log('GET /lyrics');
  Lyric.find({}, function(err, data) {
    if (err) {
      console.log(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    resp.json(data);
  });
});

lyricsRoute.put('/lyrics/:title', jsonParser, function(req, resp) {
  console.log('PUT /lyrics/:title');
  Lyric.find({ title: req.params.title }, function(err, data) {
    if (err) {
      console.log(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    var newLyric = new Lyric(req.body);
    if (!newLyric.title || (newLyric.title === req.params.title)) {
      console.log('updating ' + req.params.title);
      console.log('  was:' + data.toString());
      console.log('  will be:' + newLyric.toString());
      Lyric.update({ _id: data._id },
        { author: newLyric.author || data.author,
          chorus: newLyric.chorus || data.chorus,
          verse:  (newLyric.verse && newLyric.verse.length)? newLyric.verse : data.verse
        },
        function(err) {
        if (err) {
          console.log(err);
          return resp.status(500).json({msg: 'internal server error'});
        }
        resp.json({msg: 'success'});
      });
    }
  });
});

lyricsRoute.post('/lyrics', jsonParser, function(req, resp) {
  console.log('POST /lyrics');
  var newLyric = new Lyric(req.body);
  newLyric.save(function(err, data) {
    if (err) {
      console.log(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    resp.status(201).json(data);
  });
});
