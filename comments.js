// Create web server
var http = require('http');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var comments = [];
var COMMENTS_FILE = path.join(__dirname, 'comments.json');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname));

app.get('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.setHeader('Cache-Control', 'no-cache');
    res.json(JSON.parse(data));
  });
});

app.post('/comments', function(req, res) {
  fs.readFile(COMMENTS_FILE, function(err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    comments = JSON.parse(data);
    comments.push(req.body);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function(err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    });
    res.setHeader('Cache-Control', 'no-cache');
    res.json(comments);
  });
});

app.listen(app.get('port'), function() {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
