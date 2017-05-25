
const http = require('http'),
      express = require('express'),
      data = require("./json/targil1.json"),
      app = express(),
      bodyParser = require('body-parser'),
      port = process.env.PORT || 8080;

var Marathon = require('./movie_marathon');
var myMarathon=new Marathon();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
 
console.log("port is "+port);

http.createServer(app).listen(port);

console.log("server is running");

console.log('testing marathon');
 myMarathon.test();

app.get('/',
    (req,res)=>{

        myMarathon.getAllData(res);

        });

app.get('/getMoviesByGenre/:genre_id/:year',
    (req,res)=>{

        console.log("getMoviesByGenre start "+JSON.stringify(req.params));
        console.log("genre_id "+req.params.genre_id);
        console.log("year "+req.params.year);
        myMarathon.getMoviesByGenre(res,req.params.genre_id,req.params.year);
    });

app.post('/genres/',
    (req,res)=>{
        myMarathon.getMoviesByGenrePost(res,req.body);
             //res.status(200).json({"err":"genre not found"});
    });
app.all('*',
    (req,res)=>{
        myMarathon.error(res,req.body);
  
    });





