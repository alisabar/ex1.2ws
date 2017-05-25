'use strict';
//var data = require("./json/targil1.json");
var Mongo = require("./mongo.js");
var mongodb=new Mongo(); 
module.exports = class MovieMarathon {
    constructor(){
        console.log('MovieMarathon init');
    }
    
    test(){
        console.log("test from MovieMarathon");
    }
    
    getAllData(res){
         mongodb.findAllMovies()
         .then(function (movies){
             res.status(200).json({"genres":movies});
        }).catch(function(e){
             res.status(500).json({"error":"could not load all data, our highky trained proffesionals are on it!"});
        });
    }

    error(res,body){
        console.log("Wrong url.");
         return res.status(404).set('Error','Wrong Url').json({"err":"wrong url"});
    }

    getMoviesByGenrePost(res,body){
            //console.log('body '+JSON.stringify(body));
            if(!body){
                console.log('no body!');
                res.status(400).json({"err":"genre parameter missing from body!"});
                return;
            }

         mongodb.findMoviesByGenreNumPost(body).then(function(movies){
                if(movies){
                    res.status(200).json({"movies":movies});
                }
                else{
                  res.status(404).json({"err":"genre not found"});
              }
          }).catch(function(err){
            console.log('getMoviesByGenrePost error '+err);
            res.status(500).json({"err":"error on my app, I will fix it soon.email me at support@very-serious-site.org"});
        });
}

getMoviesByGenre(res,genre_id,year){
   mongodb.findMoviesByGenreGet(genre_id,year)
   .then(function(movies){
       console.log('findMoviesByGenreGet result : found movies '+JSON.stringify(movies));
       if(movies) {
         res.status(200).json({"movies":movies});
     }
     else{
         res.status(404).json({"err":"genre not found"});
     }   
 }).catch(function(err){
        console.log('getMoviesByGenre error '+err);
        res.status(500).json({"err":"error on my app, I will fix it soon."});
    
 });

}
}
