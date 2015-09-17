'use strict';

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/lyrics_dev');

var lyricsRouter = require(__dirname + '/routes/lyrics_routes');

app.use('/api', lyricsRouter);  // this "mounts" the router at the URL

var port = process.env.PORT || 3000;
app.listen(port, function() {
  console.log('lyrics server listening on ' + port + ' at ' + new Date().toString());
});
