var Lyric = require(__dirname + '/../models/lyric');
var express = require('express');
var jsonParser = require('body-parser').json();

var lyricsRoute = module.exports = exports = express.Router();

lyricsRoute.get('/lyrics/:title', jsonParser, function(req, resp) {
  Lyric.find(req.params, function(err, data) {
    if (err) {
      lyricsLog(err);
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
  Lyric.find({}, function(err, data) {
    if (err) {
      lyricsLog(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    resp.json(data);
  });
});

lyricsRoute.put('/lyrics/:title', jsonParser, function(req, resp) {
  var newLyric = new Lyric(req.body);
  if (!newLyric.title || (newLyric.title === req.params.title)) {
    Lyric.findOne(
      { title: req.params.title },
      function(err, data) {
        if (err) {
          lyricsLog(err);
          return resp.status(500).json({msg: 'internal server error'});
        }
        if (!data) return resp.status(404).json({msg: 'title not found'});
        data.author = req.body.author? newLyric.author : data.author;
        data.chorus = req.body.chorus? newLyric.chorus : data.chorus;
        data.verse = (req.body.verse && req.body.verse.length)?
                     newLyric.verse : data.verse;
        var writeRes = data.save();
        if (writeRes.writeError) {
          lyricsLog(writeRes.writeError);
          return resp.status(500).json({msg: 'database error'});
        }
        else
          return resp.json({msg: 'success'});
      }
    );
  }
  else return resp.status(404).json({msg: 'title not found'});
});

lyricsRoute.post('/lyrics', jsonParser, function(req, resp) {
  var newLyric = new Lyric(req.body);
  newLyric.save(function(err, data) {
    if (err) {
      lyricsLog(err);
      return resp.status(500).json({msg: 'internal server error'});
    }
    resp.status(201).json(data);
  });
});
