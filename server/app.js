const express = require('express');
let cors = require("cors");
var cookieParser = require('cookie-parser');

var routes = require('./routes');

var bodyParser = require( 'body-parser' );
let app = express();

app.use(bodyParser.json({limit:'500mb'}));
app.use(bodyParser.urlencoded({extended:true, limit:'500mb'}));
app.use(bodyParser.raw({limit: '500mb'}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.options("*", cors()); //Enable CORS

app.use('/numbers', routes);

module.exports = app;
