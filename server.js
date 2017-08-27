//REQUIRE MODULES
var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var path = require('path');
var ip = require('ip');

//TO EASILY GET THE OPERATING USER OPERATING SYSTEM VALUE
var useragent = require('express-useragent');

//CREATE AN INSTANCE OF EXPRESS FOR OUR APP AND ISNTANTIATE BODYPARSER AND CORS
var app = module.exports = express();
app.use(bodyParser.json());
app.use(cors());
app.use(useragent.express());
app.use("/", express.static(__dirname));

//SEND HTML AND CSS TO THE CLIENT SIDE
app.get('/', function(req, res){
  res.sendFile("index.html", {root: __dirname})
  res.sendFile("style.css", {root: __dirname})
});

//API URL
var api = "/api/whoami/";

//GET REQUIRED INFO ABOUT THE USER
app.get(api, function(req, res){
  var ipAddress = ip.address();
  var language = req.acceptsLanguages();
  var software = req.useragent.platform;  
  var operatingSystem = req.useragent.os;
  var browser = req.useragent.browser;

//SEND USER INFO IN JSON FORMAT
  res.json({'ip Address': ipAddress, 'Language': language[0], 'Platform': software, 'OS': operatingSystem, 'Browser': browser});
})

//LISTEN ON PORT
app.listen(3000, function(){
  console.log('Your Server is Working...');
});

