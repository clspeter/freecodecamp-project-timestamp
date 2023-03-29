// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
require('dotenv').config();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

// API endpoint
app.get("/api/:date?", function(req, res) {
  var date_string = req.params.date;
  console.log(date_string)
  if (date_string === "" || date_string === undefined || date_string === null) {
    res.json({unix: new Date().getTime(), utc: new Date().toUTCString()});
  } else {
    var dateObj = new Date(date_string.toString());
    console.log(dateObj)
    if (dateObj == "Invalid Date") {
      dateObj = new Date(parseInt(date_string));
    }
    console.log(dateObj)
    var unix = dateObj.getTime();
    var utc = dateObj.toUTCString();
    if (unix && utc) {
      res.json({unix: unix, utc: utc});
    } else {
      res.json({error: "Invalid Date"});
    }
  }
});
