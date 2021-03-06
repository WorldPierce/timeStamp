// server.js
// where your node app starts

// init project
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();
app.use(bodyParser.json());
app.use(cors());

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.get("/dateValues/:dateVal", function(req,res){
  // res.send('url found');
  // res.sendStatus(200);
  //console.log('correct url');
  //get req for date
  var dateVal = req.params.dateVal;
  //format the date
  var dateFormat = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  if(isNaN(dateVal)){
    var naturalDate = new Date(dateVal);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
    var unixDate = new Date(dateVal).getTime()/1000;
    console.log(unixDate.toString());
    if(unixDate.toString() == "NaN"){
      console.log("null");
      naturalDate = null;
      unixDate = null;
    }
  }
  else{
    var unixDate = dateVal;
    var naturalDate = new Date(dateVal * 1000);
    naturalDate = naturalDate.toLocaleDateString("en-us", dateFormat);
    if(naturalDate.toString() == "Invalid Date"){
      naturalDate = null;
      unixDate = null;
    }
  }
  res.json({unix: unixDate, natural: naturalDate});
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
  //console.log('correct url');
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

