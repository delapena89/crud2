var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = require('../models/superheros');


router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
