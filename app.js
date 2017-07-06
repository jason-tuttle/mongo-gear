const express = require('express');
const app = express();
const Gear = require('./models/gear');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient,
  assert = require('assert');


const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const url = "mongodb://localhost/geardb";

mongoose.createConnection('mongodb://localhost:27017/geardb', {useMongoClient: true});

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

app.get('/', function(req, res) {
  const everything = Gear.find().sort('make').sort('model');
  res.render('index', {gear: everything});
});

app.get('/add', function(req, res) {
  res.render('add', {});
});

app.post('/add', function(req, res) {
  console.log(req.body);
  const { make, model, type, purchased, property } = req.body;
  Gear.create({
    make: make,
    model: model,
    type: type,
    purchased: purchased,
    property: property
  }, function(err, thing) {
    if (err) {
      res.send(err);
    } else {
      res.redirect('index');
    }
  });
});

process.on('uncaughtException', function(err) { console.log(err);});

app.listen(3100, function() { console.log('Order 3100 up!'); });



/*
{ make: 'shure',
  model: '58',
  type: 'mic',
  purchased: 'new',
  property: [ 'dynamic', 'vocal' ],
  submit: 'Add This Item' }
*/

// process.on('SIGINT', function() {
//   mongoose.connection.close();
// });

// app.listen(3000, function() { console.log('Order 3000 up!'); });
