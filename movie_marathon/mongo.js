var mongoose = require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://db_usr:dbpass@ds111549.mlab.com:11549/db_ringapp2017a');
var Genre=require('./schema.js');
var movieSchema=require('./schemaMovie.js');

var Movie=mongoose.model('Movie',movieSchema);

//var Movie=require('./schemaMovie');
module.exports = class Mongo {
    constructor(){
        const conn = mongoose.connection;//get default connection
        conn.on('error',
            (err) => {
                console.log(`connection error: ${err}`);
            });
        console.log('Mongo init');
    }


    findAllMovies(){
        
        return Movie.find({})
        .exec(function (err, record) {

                    //handle error
                    if(err){
                        console.log(`query error: ${err}`);
                        //mongoose.disconnect();
                        return;
                    }
                    console.log('in find all movies '+JSON.stringify(record));
                    return record;
                });
    }
    
    findMoviesByGenreGet(genre_id,yearMovie){
        return Genre.find({number:genre_id})
        .populate('movies')
        .exec(function (err, record) {

            //handle error
            if(err){
                console.log(`query error: ${err}`);
                return;
            }
        }).then(function(record){

            console.log(`Genre.find success ${record}`);

            if(!record){
                console.log(`Genre not found`);
                return;            
            }

            var found=record[0];
            if(!found.movies){
                console.log(`No movies in genre ${genre_id}`);
                return;
            }

            var moviesArray=[];
            var allMovies=found.movies;
            console.log(`total movies ${allMovies.length} movies`);
            
            for (var i = allMovies.length - 1; i >= 0; i--) {
                console.log('')
                if(allMovies[i].year==yearMovie){
                    console.log("adding allMovies[i] "+JSON.stringify(allMovies[i]));
                    moviesArray.push(allMovies[i]);
                }
            }

            console.log(`found ${moviesArray.length} movies `+JSON.stringify(moviesArray));
            return moviesArray;

        });
    }

    findMoviesByGenreNumPost(body){

        return Genre.find({number:body.genre})
        .populate('movies')
        .exec(function (err, record) {

            //error
            if(err){
                console.log(`query error: ${err}`);
                //mongoose.disconnect();
                return;
            }

            console.log(`Genre.find success ${record}`);

            if(!record){
                console.log(`Genre not found`);
                //mongoose.disconnect();
                return;            
            }

            var found=record[0];

            if(!found.movies){
                console.log(`No movies in genre`);
                //mongoose.disconnect();
                return;
            }

            console.log(`found movies ${found.movies}`);

            console.log(`closing connection`);
            //mongoose.disconnect();
            return found.movies;
                });//exec   
    }
}