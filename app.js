var express = require('express'),
    favicon = require('serve-favicon'),
    serveStatic = require('serve-static'),
    bodyParser = require('body-parser'),
    http = require('http'),
    slug = require('slug'),
    path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(serveStatic(path.join(__dirname, 'public')));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/json', function(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.query && req.query.string) {
    if (req.query.separator) {
      var sluged = slug(req.query.string, req.query.separator);
    } else {
      var sluged = slug(req.query.string);
    }
    
    if (req.query.lu === 'l') {
      sluged = sluged.toLowerCase();
    }
    
    if (req.query.lu === 'U') {
      sluged = sluged.toUpperCase();
    }
    
    res.json({slug: sluged});
  } else {
    res.json();
  }
});

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
