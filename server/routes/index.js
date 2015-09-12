var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Superhero = require('../models/superheros');


router.get('/', function(req, res, next) {
  res.render('index');
});

// get all superheros
router.get('/superheros', function(req, res, next) {
  Superhero.find(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

// get single superhero
router.get('/superhero/:id', function(req, res, next){
  Superhero.findById(req.params.id,function(err, data){
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

// post all superheros
router.post('/superheros', function(req, res, next) {
  newSuperhero = new Superhero({
    name: req.body.name,
    ability: req.body.ability,
    nemesis: req.body.nemesis
  });
  newSuperhero.save(function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

// put single superhero
router.put('/superhero/:id', function(req, res, next) {
  var update = {
    name: req.body.name,
    ability: req.body.ability,
    nemesis: req.body.nemesis
  };
  Superhero.findByIdAndUpdate(req.params.id, update, function(err, data) {
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

// delete single animal
router.delete('/superhero/:id',function(req, res, next){
  Superhero.findByIdAndRemove(req.params.id, function(err,data){
    if (err) {
      res.json({
        'message': err
      });
    } else {
      res.json(data);
    }
  });
});

module.exports = router;
