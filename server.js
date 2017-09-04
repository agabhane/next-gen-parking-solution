var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var router = require('./app/routes');
var databaseConfi = require('./config/database');

mongoose.Promise = global.Promise;
mongoose.connect(databaseConfi.url, {
  useMongoClient: true
}).then(function() {
  console.log('db connected successfully');
}, function(err) {
  console.log(err);
});

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8585;

router(app);

app.listen(port);
console.log('Server is running on port ' + port);