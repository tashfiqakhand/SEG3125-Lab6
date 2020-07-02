var express = require('express');
var surveyController = require('./surveyController');

var app = express();

//set up template engine
app.set('view engine', 'ejs');

//static files
app.use(express.static('./public'));

//fire controllers
surveyController(app);

app.listen(3000);
console.log('Go to site localhost:3000/survey');
