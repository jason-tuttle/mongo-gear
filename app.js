const express = require('express');
const app = express();
const Gear = require('./models/gear');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = "mongodb://localhost:27017/geardb";
mongoose.connect(url, {}, function(err) {
  if (err) {
    console.log(err);
  } else {
    app.listen(3000, function() { console.log('Order 3000 up!'); });
  }
});

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/add', function(req, res) {
  res.render('add', {});
});

app.post('/add', function(req, res) {
  console.log(req.body);
});

// process.on('SIGINT', function() {
//   mongoose.connection.close();
// });

// app.listen(3000, function() { console.log('Order 3000 up!'); });
