var express = require('express'),
    http = require('http'),
    slug = require('slug'),
    path = require('path');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.bodyParser());
});

app.get('/', function(req, res) {
  res.sendfile('index.html');
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
