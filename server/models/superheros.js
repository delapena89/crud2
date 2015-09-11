var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Superhero = new Schema(
  {
    name: String,
    ability: String,
    nemesis: String
  }
);

process.env.BD_HOST = 'mongodb://localhost/superheros';

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/superheros');

module.export = mongoose.model('superheros', Superhero);
