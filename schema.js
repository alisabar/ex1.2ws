var mongoose = require('mongoose'); 
var movie=require('./schemaMovie.js');
var Schema = mongoose.Schema;


 var genresSchema = new Schema({
        number:Number,
        genre:{type:String},
        movies: [{type:Number,ref:"Movie"}]
        }, {collection: 'genres'});


var Genre=mongoose.model('Genre',genresSchema);

console.log(`required paths: ${genresSchema.requiredPaths()}`);
console.log(`indexes: ${JSON.stringify(genresSchema.indexes())}`);
module.exports= Genre;