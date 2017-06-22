
var mongoose = require('mongoose'),

Schema = mongoose.Schema,
movieSchema=new Schema({
                 genre:{type:String},
                name:{type:String},
                year:Number,
                }, {collection: 'movies'});

var Movie=mongoose.model('Movie',movieSchema);
//console.log(`required paths: ${movieSchema.requiredPaths()}`);
//console.log(`indexes: ${JSON.stringify(movieSchema.indexes())}`);
//module.exports= Movie;
module.exports=movieSchema;