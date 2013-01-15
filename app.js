var express = require('express'),
    http = require('http'),
    slug = require('slug');

var app = express();

var rawBodyParser = function(req, res, next) {
  req.setEncoding('utf8');
  req.rawBody = '';
  req.on('data', function(chunk) {
    req.rawBody += chunk;
  });
  req.on('end', function(){
    next();
  });
}
app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.use(express.favicon(__dirname + '/public/favicon.ico'));
  app.use(express.logger('dev'));

  app.use(rawBodyParser);
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res) {
  res.sendfile('index.html');
});

app.post('/', function(req, res) {
  res.send(slug(req.rawBody));
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
