const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session');
const app = express();
app.set('view engine', 'ejs');
app.set('views', './app/views');
app.use(express.static('./app/public'))
app.use(bodyParser.urlencoded({extended:true}));
app.use(expressValidator());
app.use(expressSession({
    secret: 'fdhi7rfh85hf',
    resave : false ,
    saveUninitialized : false
}));
consign()
    .include('config/db_connection.js')
    .then('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(app);
module.exports = app;